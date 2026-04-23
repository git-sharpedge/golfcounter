<?php

declare(strict_types=1);

require __DIR__ . '/db.php';

session_start();

header('Content-Type: application/json; charset=utf-8');

try {
    $rawInput = file_get_contents('php://input');
    $input = $rawInput ? json_decode($rawInput, true, 512, JSON_THROW_ON_ERROR) : [];
    if (!is_array($input)) {
        $input = [];
    }

    $action = trim((string) ($input['action'] ?? ''));
    enforceRateLimit($action);

    switch ($action) {
        case 'get_captcha':
            getCaptcha($input);
            break;
        case 'register':
            registerUser(getPdo(), $input);
            break;
        case 'login':
            loginUser(getPdo(), $input);
            break;
        case 'forgot_password':
            forgotPassword(getPdo(), $input);
            break;
        case 'contact_message':
            sendContactMessage($input);
            break;
        case 'logout':
            logoutUser();
            break;
        case 'get_session':
            getSession(getPdo());
            break;
        case 'update_account':
            updateAccount(getPdo(), $input);
            break;
        case 'start_round':
            startRound(getPdo(), $input);
            break;
        case 'save_hole':
            saveHole(getPdo(), $input);
            break;
        case 'finish_round':
            finishRound(getPdo(), $input);
            break;
        case 'get_round':
            getRound(getPdo(), $input);
            break;
        case 'list_rounds':
            listRounds(getPdo());
            break;
        case 'update_finished_round':
            updateFinishedRound(getPdo(), $input);
            break;
        case 'delete_finished_round':
            deleteFinishedRound(getPdo(), $input);
            break;
        default:
            sendJson(['error' => 'Invalid action'], 400);
    }
} catch (Throwable $e) {
    sendJson(['error' => $e->getMessage()], 500);
}

function registerUser(PDO $pdo, array $input): void
{
    verifyCaptcha($input, 'register');

    $name = trim((string) ($input['name'] ?? ''));
    $email = strtolower(trim((string) ($input['email'] ?? '')));
    $golfId = trim((string) ($input['golf_id'] ?? ''));
    $password = (string) ($input['password'] ?? '');
    $language = strtolower(trim((string) ($input['language'] ?? 'sv-se')));
    $consentAccepted = filter_var($input['consent_accepted'] ?? false, FILTER_VALIDATE_BOOL);
    $consentText = 'Jag godkänner lagring av förnamn, efternamn, golf-ID, golfbana, slag och tidpunkt för ronder.';

    if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJson(['error' => 'Ogiltig registrering.'], 422);
    }
    if (!isStrongPassword($password)) {
        sendJson(['error' => 'Lösenord måste vara minst 12 tecken och innehålla minst tre av: stora bokstäver, små bokstäver, siffror eller specialtecken.'], 422);
    }
    if (!$consentAccepted) {
        sendJson(['error' => 'Du måste godkänna datalagring för att skapa konto.'], 422);
    }

    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = :email LIMIT 1');
    $stmt->execute(['email' => $email]);
    if ($stmt->fetch()) {
        sendJson(['error' => 'E-postadressen används redan.'], 409);
    }

    $insert = $pdo->prepare(
        'INSERT INTO users (name, email, golf_id, password_hash, consent_accepted_at, consent_text)
         VALUES (:name, :email, :golf_id, :password_hash, :consent_accepted_at, :consent_text)'
    );
    $insert->execute([
        'name' => $name,
        'email' => $email,
        'golf_id' => $golfId,
        'password_hash' => password_hash($password, PASSWORD_DEFAULT),
        'consent_accepted_at' => (new DateTimeImmutable('now'))->format('Y-m-d H:i:s'),
        'consent_text' => $consentText,
    ]);

    $userId = (int) $pdo->lastInsertId();
    $_SESSION['user_id'] = $userId;
    sendWelcomeEmail($name, $email, $password, $language);

    sendJson([
        'ok' => true,
        'user' => [
            'id' => $userId,
            'name' => $name,
            'email' => $email,
            'golf_id' => $golfId,
        ],
    ]);
}

function loginUser(PDO $pdo, array $input): void
{
    $email = strtolower(trim((string) ($input['email'] ?? '')));
    $password = (string) ($input['password'] ?? '');

    $stmt = $pdo->prepare('SELECT id, name, email, golf_id, password_hash FROM users WHERE email = :email LIMIT 1');
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        sendJson(['error' => 'Fel e-post eller lösenord.'], 401);
    }

    $_SESSION['user_id'] = (int) $user['id'];
    sendJson([
        'ok' => true,
        'user' => [
            'id' => (int) $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'golf_id' => $user['golf_id'],
        ],
    ]);
}

function forgotPassword(PDO $pdo, array $input): void
{
    verifyCaptcha($input, 'forgot_password');

    $email = strtolower(trim((string) ($input['email'] ?? '')));
    $golfId = trim((string) ($input['golf_id'] ?? ''));
    $newPassword = (string) ($input['new_password'] ?? '');

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJson(['error' => 'Ogiltig e-postadress.'], 422);
    }
    if (!isStrongPassword($newPassword)) {
        sendJson(['error' => 'Nytt lösenord måste vara minst 12 tecken och innehålla minst tre av: stora bokstäver, små bokstäver, siffror eller specialtecken.'], 422);
    }

    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = :email AND golf_id = :golf_id LIMIT 1');
    $stmt->execute([
        'email' => $email,
        'golf_id' => $golfId,
    ]);
    $user = $stmt->fetch();

    if (!$user) {
        sendJson(['error' => 'Ingen användare hittades med angiven e-post och Golf-ID.'], 404);
    }

    $update = $pdo->prepare('UPDATE users SET password_hash = :password_hash WHERE id = :id');
    $update->execute([
        'password_hash' => password_hash($newPassword, PASSWORD_DEFAULT),
        'id' => (int) $user['id'],
    ]);

    sendJson(['ok' => true]);
}

function sendContactMessage(array $input): void
{
    verifyCaptcha($input, 'contact_message');

    $name = trim((string) ($input['name'] ?? ''));
    $email = strtolower(trim((string) ($input['email'] ?? '')));
    $message = trim((string) ($input['message'] ?? ''));

    if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
        sendJson(['error' => 'Fyll i namn, giltig e-post och meddelande.'], 422);
    }
    if (strlen($message) > 4000) {
        sendJson(['error' => 'Meddelandet är för långt.'], 422);
    }

    $safeName = str_replace(["\r", "\n"], '', $name);
    $safeEmail = str_replace(["\r", "\n"], '', $email);
    $to = 'golfcounter@sharpedge.se';
    $subject = 'Golfcounter kontaktformulär';
    $body = "Nytt meddelande från kontaktformulär:\n\n"
        . "Namn: {$safeName}\n"
        . "E-post: {$safeEmail}\n\n"
        . "Meddelande:\n{$message}\n";

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'From: Golfcounter <golfcounter@sharpedge.se>',
        "Reply-To: {$safeEmail}",
    ];

    $sent = mail($to, $subject, $body, implode("\r\n", $headers));
    if (!$sent) {
        sendJson(['error' => 'E-post kunde inte skickas just nu.'], 500);
    }

    sendJson(['ok' => true]);
}

function sendWelcomeEmail(string $name, string $email, string $password, string $language): void
{
    $safeName = str_replace(["\r", "\n"], '', trim($name));
    $safeEmail = str_replace(["\r", "\n"], '', strtolower(trim($email)));
    $to = $safeEmail;
    $isEnglish = str_starts_with($language, 'en');
    $subject = $isEnglish ? 'Welcome to Golfcounter' : 'Välkommen till Golfcounter';
    $serviceUrl = 'https://golfcounter.sharpedge.se/';
    $donationUrl = 'https://golfcounter.sharpedge.se/#donationSection';
    $kofiUrl = 'https://ko-fi.com/G2G81Y932T';
    $swishQrUrl = 'https://golfcounter.sharpedge.se/assets/icons/swish.png';
    $safePassword = htmlspecialchars($password, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $safeNameHtml = htmlspecialchars($safeName, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $safeEmailHtml = htmlspecialchars($safeEmail, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

    $headline = $isEnglish ? 'Welcome to Golfcounter' : 'Välkommen till Golfcounter';
    $subline = $isEnglish
        ? 'Your digital companion for round and hole stroke tracking'
        : 'Din digitala följeslagare för slagregistrering under rundan';
    $greeting = $isEnglish ? "Hi {$safeNameHtml}," : "Hej {$safeNameHtml},";
    $intro = $isEnglish
        ? 'Thank you for signing up! In Golfcounter, you can quickly and smoothly log strokes per hole and round, for yourself and your playing partners.'
        : 'Tack för att du registrerat dig! I Golfcounter kan du enkelt och smidigt logga slag per hål och rond, både för dig själv och medspelare.';
    $credentialsTitle = $isEnglish ? 'Sign-in credentials' : 'Inloggningsuppgifter';
    $usernameLabel = $isEnglish ? 'Username' : 'Användarnamn';
    $passwordLabel = $isEnglish ? 'Password' : 'Lösenord';
    $gettingStartedTitle = $isEnglish ? 'Get started' : 'Kom igång';
    $loginText = $isEnglish ? 'Sign in here:' : 'Logga in här:';
    $supportTitle = $isEnglish ? 'Support the service' : 'Stöd tjänsten';
    $supportText = $isEnglish
        ? 'Golfcounter is provided for free, and we are grateful for any donation to help keep the service running.'
        : 'Golfcounter tillhandahålls gratis, men vi tar tacksamt emot valfri donation för att kunna hålla tjänsten igång.';
    $donationText = $isEnglish ? 'Donate here:' : 'Donera här:';
    $kofiText = $isEnglish ? 'Donate via Ko-Fi:' : 'Donera via Ko-Fi:';
    $qrText = $isEnglish ? 'Swish QR:' : 'Swish QR:';
    $closing = $isEnglish ? 'Kind regards,' : 'Vänliga hälsningar,';
    $teamText = $isEnglish ? 'The Golfcounter team' : 'Teamet på Golfcounter';

    $body = "<html><body style=\"margin:0;padding:0;background:#f3f8f3;font-family:Arial,sans-serif;color:#102214;line-height:1.55;\">"
        . "<table role=\"presentation\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"padding:24px 12px;\">"
        . "<tr><td align=\"center\">"
        . "<table role=\"presentation\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"max-width:620px;background:#ffffff;border:1px solid #d9e8da;border-radius:14px;overflow:hidden;\">"
        . "<tr><td style=\"background:#1b5e20;color:#ffffff;padding:18px 20px;\">"
        . "<h1 style=\"margin:0;font-size:22px;line-height:1.2;\">{$headline}</h1>"
        . "<p style=\"margin:8px 0 0;font-size:14px;opacity:0.95;\">{$subline}</p>"
        . "</td></tr>"
        . "<tr><td style=\"padding:20px;\">"
        . "<p style=\"margin:0 0 14px;\">{$greeting}</p>"
        . "<p style=\"margin:0 0 18px;\">{$intro}</p>"
        . "<h2 style=\"margin:0 0 8px;font-size:16px;color:#1b5e20;\">{$credentialsTitle}</h2>"
        . "<table role=\"presentation\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"border:1px solid #d6e1d7;border-radius:10px;background:#f7fbf7;margin-bottom:18px;\">"
        . "<tr><td style=\"padding:12px 14px;\"><strong>{$usernameLabel}:</strong> {$safeEmailHtml}<br><strong>{$passwordLabel}:</strong> {$safePassword}</td></tr>"
        . "</table>"
        . "<h2 style=\"margin:0 0 8px;font-size:16px;color:#1b5e20;\">{$gettingStartedTitle}</h2>"
        . "<p style=\"margin:0 0 18px;\">{$loginText} <a href=\"{$serviceUrl}\" style=\"color:#1b5e20;font-weight:700;\">{$serviceUrl}</a></p>"
        . "<h2 style=\"margin:0 0 8px;font-size:16px;color:#1b5e20;\">{$supportTitle}</h2>"
        . "<p style=\"margin:0 0 10px;\">{$supportText}</p>"
        . "<p style=\"margin:0 0 10px;\">{$donationText} <a href=\"{$donationUrl}\" style=\"color:#1b5e20;font-weight:700;\">{$donationUrl}</a></p>"
        . "<p style=\"margin:0 0 10px;\">{$kofiText} <a href=\"{$kofiUrl}\" style=\"color:#1b5e20;font-weight:700;\">{$kofiUrl}</a></p>"
        . "<p style=\"margin:0 0 8px;\">{$qrText}</p>"
        . "<p style=\"margin:0 0 18px;\"><img src=\"{$swishQrUrl}\" alt=\"Swish QR för donation\" style=\"max-width:220px;height:auto;border:1px solid #d6dfd7;border-radius:8px;background:#fff;\"></p>"
        . "<p style=\"margin:0;\">{$closing}<br><strong>{$teamText}</strong></p>"
        . "</td></tr>"
        . "</table>"
        . "</td></tr>"
        . "</table>"
        . "</body></html>";

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: Golfcounter <golfcounter@sharpedge.se>',
        'Reply-To: golfcounter@sharpedge.se',
    ];

    // Registration should not fail if email delivery is unavailable.
    @mail($to, $subject, $body, implode("\r\n", $headers));
}

function logoutUser(): void
{
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], (bool) $params['secure'], (bool) $params['httponly']);
    }
    session_destroy();

    sendJson(['ok' => true]);
}

function getSession(PDO $pdo): void
{
    $userId = getAuthenticatedUserId();
    if ($userId === null) {
        sendJson(['user' => null]);
    }

    $user = fetchUserById($pdo, $userId);
    sendJson(['user' => $user]);
}

function updateAccount(PDO $pdo, array $input): void
{
    $userId = requireAuthenticatedUserId();
    $user = fetchUserById($pdo, $userId, true);

    $name = trim((string) ($input['name'] ?? $user['name']));
    $golfId = trim((string) ($input['golf_id'] ?? $user['golf_id']));
    $newPassword = (string) ($input['new_password'] ?? '');
    $currentPassword = (string) ($input['current_password'] ?? '');

    if ($name === '') {
        sendJson(['error' => 'Namn kan inte vara tomt.'], 422);
    }

    if ($newPassword !== '') {
        if (!password_verify($currentPassword, $user['password_hash'])) {
            sendJson(['error' => 'Nuvarande lösenord är fel.'], 401);
        }
        if (!isStrongPassword($newPassword)) {
            sendJson(['error' => 'Nytt lösenord måste vara minst 12 tecken och innehålla minst tre av: stora bokstäver, små bokstäver, siffror eller specialtecken.'], 422);
        }
    }

    $passwordHash = $newPassword !== '' ? password_hash($newPassword, PASSWORD_DEFAULT) : $user['password_hash'];

    $stmt = $pdo->prepare(
        'UPDATE users
         SET name = :name, golf_id = :golf_id, password_hash = :password_hash
         WHERE id = :id'
    );
    $stmt->execute([
        'name' => $name,
        'golf_id' => $golfId,
        'password_hash' => $passwordHash,
        'id' => $userId,
    ]);

    sendJson([
        'ok' => true,
        'user' => [
            'id' => $userId,
            'name' => $name,
            'email' => $user['email'],
            'golf_id' => $golfId,
        ],
    ]);
}

function startRound(PDO $pdo, array $input): void
{
    $userId = requireAuthenticatedUserId();
    $user = fetchUserById($pdo, $userId);
    $courseName = trim((string) ($input['course_name'] ?? ''));
    $totalHoles = (int) ($input['total_holes'] ?? 0);
    $extraPlayers = $input['players'] ?? [];

    if ($courseName === '' || !in_array($totalHoles, [9, 18], true) || !is_array($extraPlayers)) {
        sendJson(['error' => 'Ogiltig indata.'], 422);
    }

    $validExtraPlayers = [];
    foreach ($extraPlayers as $extraPlayer) {
        if (!is_array($extraPlayer)) {
            continue;
        }
        $name = trim((string) ($extraPlayer['player_name'] ?? ''));
        $golfId = trim((string) ($extraPlayer['golf_id'] ?? ''));
        if ($name === '') {
            continue;
        }
        $validExtraPlayers[] = [
            'name' => $name,
            'golf_id' => $golfId,
        ];
    }

    if (count($validExtraPlayers) > 3) {
        sendJson(['error' => 'Max 4 spelare per rond (du + 3 medspelare).'], 422);
    }

    $strokes = array_fill(0, $totalHoles, null);
    $holeDurations = array_fill(0, $totalHoles, null);
    $startedAt = (new DateTimeImmutable('now'))->format('Y-m-d H:i:s');

    $pdo->beginTransaction();
    try {
        $stmt = $pdo->prepare(
            'INSERT INTO rounds (user_id, player_name, golf_id, course_name, total_holes, started_at, strokes_json, hole_durations_json)
             VALUES (:user_id, :player_name, :golf_id, :course_name, :total_holes, :started_at, :strokes_json, :hole_durations_json)'
        );
        $stmt->execute([
            'user_id' => $userId,
            'player_name' => $user['name'],
            'golf_id' => $user['golf_id'],
            'course_name' => $courseName,
            'total_holes' => $totalHoles,
            'started_at' => $startedAt,
            'strokes_json' => json_encode($strokes, JSON_THROW_ON_ERROR),
            'hole_durations_json' => json_encode($holeDurations, JSON_THROW_ON_ERROR),
        ]);

        $roundId = (int) $pdo->lastInsertId();
        insertRoundPlayer($pdo, $roundId, $user['name'], $user['golf_id'], true, $strokes);

        foreach ($validExtraPlayers as $extraPlayer) {
            insertRoundPlayer($pdo, $roundId, $extraPlayer['name'], $extraPlayer['golf_id'], false, $strokes);
        }

        $pdo->commit();
    } catch (Throwable $e) {
        $pdo->rollBack();
        throw $e;
    }

    sendJson([
        'round_id' => $roundId,
        'started_at' => $startedAt,
        'total_holes' => $totalHoles,
        'players' => fetchRoundPlayers($pdo, $roundId),
    ]);
}

function saveHole(PDO $pdo, array $input): void
{
    $userId = requireAuthenticatedUserId();
    $roundId = (int) ($input['round_id'] ?? 0);
    $holeNumber = (int) ($input['hole_number'] ?? 0);
    $playerStrokes = $input['player_strokes'] ?? [];
    $holeDurationSeconds = isset($input['hole_duration_seconds']) ? (int) $input['hole_duration_seconds'] : null;

    if ($roundId <= 0 || $holeNumber <= 0 || !is_array($playerStrokes)) {
        sendJson(['error' => 'Ogiltig indata för hålsparning.'], 422);
    }
    if ($holeDurationSeconds !== null && $holeDurationSeconds < 0) {
        sendJson(['error' => 'Ogiltig tid för hålet.'], 422);
    }

    $round = fetchRoundRow($pdo, $roundId, $userId);
    $totalHoles = (int) $round['total_holes'];

    if ($holeNumber > $totalHoles) {
        sendJson(['error' => 'Hålet finns inte i denna rond.'], 422);
    }

    $players = fetchRoundPlayers($pdo, $roundId, true);
    $playersById = [];
    foreach ($players as $player) {
        $playersById[(int) $player['id']] = $player;
    }

    foreach ($playerStrokes as $row) {
        if (!is_array($row)) {
            continue;
        }

        $playerId = (int) ($row['player_id'] ?? 0);
        $strokes = (int) ($row['strokes'] ?? -1);
        if ($playerId <= 0 || $strokes < 0 || !isset($playersById[$playerId])) {
            continue;
        }

        $savedStrokes = json_decode($playersById[$playerId]['strokes_json'], true, 512, JSON_THROW_ON_ERROR);
        $savedStrokes[$holeNumber - 1] = $strokes;

        $stmt = $pdo->prepare('UPDATE round_players SET strokes_json = :strokes_json WHERE id = :id');
        $stmt->execute([
            'strokes_json' => json_encode($savedStrokes, JSON_THROW_ON_ERROR),
            'id' => $playerId,
        ]);
    }

    $ownerStrokes = fetchOwnerStrokes($pdo, $roundId);
    $holeDurations = json_decode((string) ($round['hole_durations_json'] ?? ''), true);
    if (!is_array($holeDurations) || count($holeDurations) !== $totalHoles) {
        $holeDurations = array_fill(0, $totalHoles, null);
    }
    if ($holeDurationSeconds !== null) {
        $holeDurations[$holeNumber - 1] = $holeDurationSeconds;
    }

    $stmt = $pdo->prepare('UPDATE rounds SET strokes_json = :strokes_json, hole_durations_json = :hole_durations_json WHERE id = :id');
    $stmt->execute([
        'strokes_json' => json_encode($ownerStrokes, JSON_THROW_ON_ERROR),
        'hole_durations_json' => json_encode($holeDurations, JSON_THROW_ON_ERROR),
        'id' => $roundId,
    ]);

    sendJson([
        'ok' => true,
        'players' => fetchRoundPlayers($pdo, $roundId),
        'hole_durations_seconds' => $holeDurations,
    ]);
}

function finishRound(PDO $pdo, array $input): void
{
    $userId = requireAuthenticatedUserId();
    $roundId = (int) ($input['round_id'] ?? 0);
    if ($roundId <= 0) {
        sendJson(['error' => 'Ogiltigt rond-id.'], 422);
    }

    fetchRoundRow($pdo, $roundId, $userId);

    $endedAt = (new DateTimeImmutable('now'))->format('Y-m-d H:i:s');
    $stmt = $pdo->prepare('UPDATE rounds SET ended_at = :ended_at WHERE id = :id');
    $stmt->execute([
        'ended_at' => $endedAt,
        'id' => $roundId,
    ]);

    sendJson(['ok' => true, 'ended_at' => $endedAt]);
}

function getRound(PDO $pdo, array $input): void
{
    $userId = requireAuthenticatedUserId();
    $roundId = (int) ($input['round_id'] ?? 0);
    if ($roundId <= 0) {
        sendJson(['error' => 'Ogiltigt rond-id.'], 422);
    }

    $round = fetchRoundRow($pdo, $roundId, $userId);
    $round['id'] = (int) $round['id'];
    $round['total_holes'] = (int) $round['total_holes'];
    $round['user_id'] = (int) ($round['user_id'] ?? 0);
    $round['players'] = fetchRoundPlayers($pdo, $roundId);
    $round['hole_durations_seconds'] = json_decode((string) ($round['hole_durations_json'] ?? ''), true);
    if (!is_array($round['hole_durations_seconds'])) {
        $round['hole_durations_seconds'] = [];
    }
    unset($round['strokes_json']);
    unset($round['hole_durations_json']);

    sendJson(['round' => $round]);
}

function listRounds(PDO $pdo): void
{
    $userId = requireAuthenticatedUserId();

    $stmt = $pdo->prepare(
        'SELECT r.id, r.course_name, r.total_holes, r.started_at, r.ended_at, r.created_at,
                COUNT(rp.id) AS players_count
         FROM rounds r
         LEFT JOIN round_players rp ON rp.round_id = r.id
         WHERE r.user_id = :user_id
         GROUP BY r.id
         ORDER BY r.started_at DESC, r.id DESC'
    );
    $stmt->execute(['user_id' => $userId]);
    $rows = $stmt->fetchAll();

    foreach ($rows as &$row) {
        $row['id'] = (int) $row['id'];
        $row['total_holes'] = (int) $row['total_holes'];
        $row['players_count'] = (int) $row['players_count'];
    }

    sendJson(['rounds' => $rows]);
}

function updateFinishedRound(PDO $pdo, array $input): void
{
    $userId = requireAuthenticatedUserId();
    $roundId = (int) ($input['round_id'] ?? 0);
    $playersInput = $input['players'] ?? [];

    if ($roundId <= 0 || !is_array($playersInput)) {
        sendJson(['error' => 'Ogiltig indata för redigering av rond.'], 422);
    }

    $round = fetchRoundRow($pdo, $roundId, $userId);

    $totalHoles = (int) $round['total_holes'];
    $existingPlayers = fetchRoundPlayers($pdo, $roundId, true);
    $existingById = [];
    foreach ($existingPlayers as $player) {
        $existingById[(int) $player['id']] = $player;
    }

    $pdo->beginTransaction();
    try {
        foreach ($playersInput as $playerInput) {
            if (!is_array($playerInput)) {
                continue;
            }

            $playerId = (int) ($playerInput['player_id'] ?? 0);
            $strokesInput = $playerInput['strokes'] ?? null;
            if ($playerId <= 0 || !isset($existingById[$playerId]) || !is_array($strokesInput)) {
                continue;
            }

            if (count($strokesInput) !== $totalHoles) {
                sendJson(['error' => 'Fel antal hål i redigeringsdata.'], 422);
            }

            $validatedStrokes = [];
            foreach ($strokesInput as $stroke) {
                $value = (int) $stroke;
                if ($value < 0) {
                    sendJson(['error' => 'Slag kan inte vara negativa.'], 422);
                }
                $validatedStrokes[] = $value;
            }

            $stmt = $pdo->prepare('UPDATE round_players SET strokes_json = :strokes_json WHERE id = :id');
            $stmt->execute([
                'strokes_json' => json_encode($validatedStrokes, JSON_THROW_ON_ERROR),
                'id' => $playerId,
            ]);
        }

        $ownerStrokes = fetchOwnerStrokes($pdo, $roundId);
        $stmt = $pdo->prepare('UPDATE rounds SET strokes_json = :strokes_json WHERE id = :id');
        $stmt->execute([
            'strokes_json' => json_encode($ownerStrokes, JSON_THROW_ON_ERROR),
            'id' => $roundId,
        ]);

        $pdo->commit();
    } catch (Throwable $e) {
        $pdo->rollBack();
        throw $e;
    }

    $updatedRound = fetchRoundRow($pdo, $roundId, $userId);
    $updatedRound['id'] = (int) $updatedRound['id'];
    $updatedRound['total_holes'] = (int) $updatedRound['total_holes'];
    $updatedRound['user_id'] = (int) ($updatedRound['user_id'] ?? 0);
    $updatedRound['players'] = fetchRoundPlayers($pdo, $roundId);
    unset($updatedRound['strokes_json']);

    sendJson([
        'ok' => true,
        'round' => $updatedRound,
    ]);
}

function deleteFinishedRound(PDO $pdo, array $input): void
{
    $userId = requireAuthenticatedUserId();
    $roundId = (int) ($input['round_id'] ?? 0);
    if ($roundId <= 0) {
        sendJson(['error' => 'Ogiltigt rond-id.'], 422);
    }

    $round = fetchRoundRow($pdo, $roundId, $userId);
    if (empty($round['ended_at'])) {
        sendJson(['error' => 'Bara avslutade ronder kan tas bort.'], 422);
    }

    $stmt = $pdo->prepare('DELETE FROM rounds WHERE id = :id');
    $stmt->execute(['id' => $roundId]);

    sendJson(['ok' => true]);
}

function fetchRoundRow(PDO $pdo, int $roundId, ?int $userId = null): array
{
    if ($userId === null) {
        $stmt = $pdo->prepare('SELECT * FROM rounds WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $roundId]);
    } else {
        $stmt = $pdo->prepare('SELECT * FROM rounds WHERE id = :id AND user_id = :user_id LIMIT 1');
        $stmt->execute([
            'id' => $roundId,
            'user_id' => $userId,
        ]);
    }

    $round = $stmt->fetch();

    if (!$round) {
        sendJson(['error' => 'Ronden hittades inte.'], 404);
    }

    return $round;
}

function fetchRoundPlayers(PDO $pdo, int $roundId, bool $withRaw = false): array
{
    $stmt = $pdo->prepare(
        'SELECT id, player_name, golf_id, is_owner, strokes_json
         FROM round_players
         WHERE round_id = :round_id
         ORDER BY is_owner DESC, id ASC'
    );
    $stmt->execute(['round_id' => $roundId]);
    $players = $stmt->fetchAll();

    foreach ($players as &$player) {
        $player['id'] = (int) $player['id'];
        $player['is_owner'] = (bool) $player['is_owner'];
        if (!$withRaw) {
            $player['strokes'] = json_decode($player['strokes_json'], true, 512, JSON_THROW_ON_ERROR);
            unset($player['strokes_json']);
        }
    }

    return $players;
}

function fetchOwnerStrokes(PDO $pdo, int $roundId): array
{
    $stmt = $pdo->prepare(
        'SELECT strokes_json
         FROM round_players
         WHERE round_id = :round_id AND is_owner = 1
         ORDER BY id ASC
         LIMIT 1'
    );
    $stmt->execute(['round_id' => $roundId]);
    $row = $stmt->fetch();

    if (!$row) {
        return [];
    }

    return json_decode($row['strokes_json'], true, 512, JSON_THROW_ON_ERROR);
}

function insertRoundPlayer(
    PDO $pdo,
    int $roundId,
    string $name,
    string $golfId,
    bool $isOwner,
    array $strokes
): void {
    $stmt = $pdo->prepare(
        'INSERT INTO round_players (round_id, player_name, golf_id, is_owner, strokes_json)
         VALUES (:round_id, :player_name, :golf_id, :is_owner, :strokes_json)'
    );
    $stmt->execute([
        'round_id' => $roundId,
        'player_name' => $name,
        'golf_id' => $golfId,
        'is_owner' => $isOwner ? 1 : 0,
        'strokes_json' => json_encode($strokes, JSON_THROW_ON_ERROR),
    ]);
}

function getAuthenticatedUserId(): ?int
{
    $userId = $_SESSION['user_id'] ?? null;
    if (!is_int($userId) && !is_numeric($userId)) {
        return null;
    }

    $id = (int) $userId;
    return $id > 0 ? $id : null;
}

function requireAuthenticatedUserId(): int
{
    $userId = getAuthenticatedUserId();
    if ($userId === null) {
        sendJson(['error' => 'Du måste logga in.'], 401);
    }

    return $userId;
}

function fetchUserById(PDO $pdo, int $userId, bool $withPassword = false): array
{
    $fields = $withPassword
        ? 'id, name, email, golf_id, password_hash'
        : 'id, name, email, golf_id';

    $stmt = $pdo->prepare("SELECT {$fields} FROM users WHERE id = :id LIMIT 1");
    $stmt->execute(['id' => $userId]);
    $user = $stmt->fetch();

    if (!$user) {
        sendJson(['error' => 'Användaren hittades inte.'], 404);
    }

    $user['id'] = (int) $user['id'];
    return $user;
}

function getCaptcha(array $input): void
{
    $context = trim((string) ($input['context'] ?? ''));
    if (!in_array($context, ['register', 'forgot_password', 'contact_message'], true)) {
        sendJson(['error' => 'Invalid captcha context.'], 422);
    }

    $left = random_int(1, 9);
    $right = random_int(1, 9);
    $operator = random_int(0, 1) === 0 ? '+' : '-';

    if ($operator === '+' || $left >= $right) {
        $answer = $operator === '+' ? $left + $right : $left - $right;
    } else {
        $answer = $right - $left;
        [$left, $right] = [$right, $left];
    }

    $captchaId = bin2hex(random_bytes(16));
    $question = "{$left} {$operator} {$right} = ?";
    $expiresAt = time() + 10 * 60;

    if (!isset($_SESSION['captchas']) || !is_array($_SESSION['captchas'])) {
        $_SESSION['captchas'] = [];
    }
    cleanupExpiredCaptchas();
    $_SESSION['captchas'][$captchaId] = [
        'context' => $context,
        'answer' => (string) $answer,
        'expires_at' => $expiresAt,
    ];

    sendJson([
        'ok' => true,
        'captcha_id' => $captchaId,
        'question' => $question,
    ]);
}

function verifyCaptcha(array $input, string $expectedContext): void
{
    $context = trim((string) ($input['captcha_context'] ?? ''));
    $captchaId = trim((string) ($input['captcha_id'] ?? ''));
    $captchaAnswer = trim((string) ($input['captcha_answer'] ?? ''));
    cleanupExpiredCaptchas();

    if (
        $context === '' ||
        $captchaId === '' ||
        $captchaAnswer === '' ||
        !isset($_SESSION['captchas'][$captchaId]) ||
        !is_array($_SESSION['captchas'][$captchaId])
    ) {
        sendJson(['error' => 'captcha_failed'], 422);
    }

    $captcha = $_SESSION['captchas'][$captchaId];
    unset($_SESSION['captchas'][$captchaId]);

    $isContextValid = ($context === $expectedContext) && (($captcha['context'] ?? '') === $expectedContext);
    $isFresh = ((int) ($captcha['expires_at'] ?? 0)) >= time();
    $isAnswerValid = hash_equals((string) ($captcha['answer'] ?? ''), $captchaAnswer);

    if (!$isContextValid || !$isFresh || !$isAnswerValid) {
        sendJson(['error' => 'captcha_failed'], 422);
    }
}

function cleanupExpiredCaptchas(): void
{
    if (!isset($_SESSION['captchas']) || !is_array($_SESSION['captchas'])) {
        $_SESSION['captchas'] = [];
        return;
    }

    $now = time();
    foreach ($_SESSION['captchas'] as $id => $captcha) {
        if (!is_array($captcha) || ((int) ($captcha['expires_at'] ?? 0)) < $now) {
            unset($_SESSION['captchas'][$id]);
        }
    }
}

function enforceRateLimit(string $action): void
{
    $rules = [
        '__global__' => ['limit' => 240, 'window' => 60],
        'get_captcha' => ['limit' => 60, 'window' => 60],
        'login' => ['limit' => 25, 'window' => 300],
        'register' => ['limit' => 8, 'window' => 600],
        'forgot_password' => ['limit' => 8, 'window' => 600],
        'contact_message' => ['limit' => 12, 'window' => 600],
        'start_round' => ['limit' => 30, 'window' => 300],
        'save_hole' => ['limit' => 160, 'window' => 60],
        'default' => ['limit' => 120, 'window' => 60],
    ];

    $globalRule = $rules['__global__'];
    applyRateLimitRule('__global__', $globalRule['limit'], $globalRule['window']);

    $rule = $rules[$action] ?? $rules['default'];
    applyRateLimitRule($action, $rule['limit'], $rule['window']);
}

function applyRateLimitRule(string $action, int $limit, int $windowSeconds): void
{
    $ip = getClientIpAddress();
    $key = sha1("{$action}|{$ip}");
    $directory = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'golfcounter-rate-limit';
    if (!is_dir($directory) && !@mkdir($directory, 0777, true) && !is_dir($directory)) {
        // If storage cannot be created, avoid taking the service down.
        return;
    }

    $filePath = $directory . DIRECTORY_SEPARATOR . $key . '.json';
    $handle = @fopen($filePath, 'c+');
    if ($handle === false) {
        return;
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            return;
        }

        rewind($handle);
        $raw = stream_get_contents($handle);
        $payload = is_string($raw) && $raw !== '' ? json_decode($raw, true) : [];
        $timestamps = [];
        if (is_array($payload) && isset($payload['hits']) && is_array($payload['hits'])) {
            $timestamps = array_map('intval', $payload['hits']);
        }

        $now = time();
        $cutoff = $now - $windowSeconds;
        $timestamps = array_values(array_filter($timestamps, static fn (int $ts): bool => $ts >= $cutoff));

        if (count($timestamps) >= $limit) {
            sendJson(['error' => 'För många förfrågningar. Försök igen om en stund.'], 429);
        }

        $timestamps[] = $now;
        $nextPayload = json_encode(['hits' => $timestamps], JSON_THROW_ON_ERROR);

        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, $nextPayload);
        fflush($handle);
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

function getClientIpAddress(): string
{
    $candidates = [
        $_SERVER['HTTP_CF_CONNECTING_IP'] ?? null,
        $_SERVER['HTTP_X_FORWARDED_FOR'] ?? null,
        $_SERVER['REMOTE_ADDR'] ?? null,
    ];

    foreach ($candidates as $candidate) {
        if (!is_string($candidate) || trim($candidate) === '') {
            continue;
        }

        $ip = trim(explode(',', $candidate)[0]);
        if (filter_var($ip, FILTER_VALIDATE_IP)) {
            return $ip;
        }
    }

    return '0.0.0.0';
}

function isStrongPassword(string $password): bool
{
    if (strlen($password) < 12) {
        return false;
    }

    $rulesMatched = 0;
    $rulesMatched += preg_match('/[A-Z]/', $password) ? 1 : 0;
    $rulesMatched += preg_match('/[a-z]/', $password) ? 1 : 0;
    $rulesMatched += preg_match('/\d/', $password) ? 1 : 0;
    $rulesMatched += preg_match('/[^A-Za-z0-9]/', $password) ? 1 : 0;

    return $rulesMatched >= 3;
}

function sendJson(array $payload, int $statusCode = 200): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
