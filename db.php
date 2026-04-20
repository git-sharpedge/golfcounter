<?php

declare(strict_types=1);

function getPdo(): PDO
{
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $config = require __DIR__ . '/config.php';
    $db = $config['db'];

    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=%s',
        $db['host'],
        $db['port'],
        $db['name'],
        $db['charset']
    );

    $pdo = new PDO($dsn, $db['user'], $db['pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    initializeSchema($pdo);

    return $pdo;
}

function initializeSchema(PDO $pdo): void
{
    $pdo->exec(
        <<<SQL
        CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(120) NOT NULL,
            email VARCHAR(191) NOT NULL UNIQUE,
            golf_id VARCHAR(50) DEFAULT '',
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        SQL
    );

    $pdo->exec(
        <<<SQL
        CREATE TABLE IF NOT EXISTS rounds (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            user_id INT UNSIGNED NULL,
            player_name VARCHAR(120) NOT NULL,
            golf_id VARCHAR(50) NOT NULL,
            course_name VARCHAR(180) NOT NULL,
            total_holes TINYINT UNSIGNED NOT NULL,
            started_at DATETIME NOT NULL,
            ended_at DATETIME NULL,
            strokes_json LONGTEXT NOT NULL,
            hole_durations_json LONGTEXT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_rounds_user_id (user_id),
            CONSTRAINT fk_rounds_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        SQL
    );

    $pdo->exec(
        <<<SQL
        CREATE TABLE IF NOT EXISTS round_players (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            round_id INT UNSIGNED NOT NULL,
            player_name VARCHAR(120) NOT NULL,
            golf_id VARCHAR(50) DEFAULT '',
            is_owner TINYINT(1) NOT NULL DEFAULT 0,
            strokes_json LONGTEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_round_players_round_id (round_id),
            CONSTRAINT fk_round_players_round FOREIGN KEY (round_id) REFERENCES rounds(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        SQL
    );

    ensureRoundsUserIdColumn($pdo);
    ensureRoundsHoleDurationsColumn($pdo);
}

function ensureRoundsUserIdColumn(PDO $pdo): void
{
    $stmt = $pdo->query("SHOW COLUMNS FROM rounds LIKE 'user_id'");
    $exists = $stmt->fetch();

    if ($exists) {
        return;
    }

    $pdo->exec('ALTER TABLE rounds ADD COLUMN user_id INT UNSIGNED NULL AFTER id');
    $pdo->exec('ALTER TABLE rounds ADD INDEX idx_rounds_user_id (user_id)');
    $pdo->exec('ALTER TABLE rounds ADD CONSTRAINT fk_rounds_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE');
}

function ensureRoundsHoleDurationsColumn(PDO $pdo): void
{
    $stmt = $pdo->query("SHOW COLUMNS FROM rounds LIKE 'hole_durations_json'");
    $exists = $stmt->fetch();

    if ($exists) {
        return;
    }

    $pdo->exec('ALTER TABLE rounds ADD COLUMN hole_durations_json LONGTEXT NULL AFTER strokes_json');
}
