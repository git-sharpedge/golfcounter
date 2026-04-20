<?php
declare(strict_types=1);
?>
<!doctype html>
<html lang="sv">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#1b5e20">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Golfcounter">
    <title>SE Golfcounter</title>
    <link rel="manifest" href="./manifest.webmanifest">
    <link rel="icon" href="./assets/icons/icon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="./assets/icons/icon.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">
    <link rel="stylesheet" href="./assets/style.css">
</head>
<body>
<main class="app">
    <section class="hero">
        <div class="hero-top">
            <h1><i class="fa-solid fa-golf-ball-tee"></i> SE Golfcounter</h1>
            <button id="infoOpenBtn" type="button" class="icon-btn" aria-label="Visa information">
                <i class="fa-solid fa-circle-info"></i>
            </button>
        </div>
    </section>

    <section id="authSection" class="card">
        <h2><i class="fa-solid fa-user-lock"></i> Logga in eller skapa konto</h2>
        <div class="auth-grid">
            <form id="loginForm">
                <h3>Logga in</h3>
                <label>
                    E-post
                    <input type="email" id="loginEmail" required>
                </label>
                <label>
                    Lösenord
                    <input type="password" id="loginPassword" required minlength="6">
                </label>
                <button type="submit" class="primary-btn">
                    <i class="fa-solid fa-right-to-bracket"></i> Logga in
                </button>
            </form>

            <form id="registerForm">
                <h3>Skapa konto</h3>
                <label>
                    Namn
                    <input type="text" id="registerName" required maxlength="120">
                </label>
                <label>
                    E-post
                    <input type="email" id="registerEmail" required>
                </label>
                <label>
                    Golf-ID
                    <input type="text" id="registerGolfId" maxlength="50" placeholder="SE-123456">
                </label>
                <label>
                    Lösenord
                    <input type="password" id="registerPassword" required minlength="6">
                </label>
                <button type="submit" class="primary-btn">
                    <i class="fa-solid fa-user-plus"></i> Registrera
                </button>
            </form>
        </div>
    </section>

    <section id="appSection" class="hidden">
        <nav class="menu card">
            <button class="menu-btn active" data-view="playView">
                <i class="fa-solid fa-flag-checkered"></i> Ny rond
            </button>
            <button class="menu-btn" data-view="historyView">
                <i class="fa-solid fa-clock-rotate-left"></i> Rundor
            </button>
            <button class="menu-btn" data-view="accountView">
                <i class="fa-solid fa-user-gear"></i> Konto
            </button>
        </nav>

        <section id="playView" class="view">
            <section id="noRoundNotice" class="card">
                <h2><i class="fa-regular fa-circle-pause"></i> Ingen pågående rond</h2>
                <p class="muted">Starta en ny rond för att börja registrera slag.</p>
            </section>

            <section id="setupSection" class="card">
                <h2><i class="fa-solid fa-flag-checkered"></i> Starta ny rond</h2>
                <form id="setupForm">
                    <label>
                        Banans namn
                        <input type="text" id="courseName" required maxlength="180" placeholder="Min Golfklubb">
                    </label>
                    <fieldset>
                        <legend>Antal hål</legend>
                        <label class="inline-option">
                            <input type="radio" name="holes" value="9" checked>
                            9 hål
                        </label>
                        <label class="inline-option">
                            <input type="radio" name="holes" value="18">
                            18 hål
                        </label>
                    </fieldset>

                    <div class="teammates">
                        <div class="teammates-header">
                            <h3><i class="fa-solid fa-users"></i> Medspelare</h3>
                            <button id="addTeammateBtn" type="button" class="ghost-btn">
                                <i class="fa-solid fa-user-plus"></i> Lägg till medspelare (max 3)
                            </button>
                        </div>
                        <div id="teammatesList" class="teammates-list"></div>
                    </div>

                    <button type="submit" class="primary-btn">
                        <i class="fa-solid fa-play"></i> Starta rond
                    </button>
                </form>
            </section>

            <section id="roundSection" class="card hidden">
                <div class="round-sticky-panel">
                    <div class="round-header">
                        <div>
                            <h2><i class="fa-solid fa-list-check"></i> Pågående rond</h2>
                            <p id="roundMeta"></p>
                        </div>
                        <button id="finishRoundBtn" class="danger-btn">
                            <i class="fa-solid fa-circle-stop"></i> Avsluta rond
                        </button>
                    </div>

                    <div class="player-picker">
                        <label>Aktiv spelare</label>
                        <div id="activePlayerButtons" class="player-buttons"></div>
                    </div>

                    <div class="current-hole">
                        <h3 id="currentHoleTitle">Hål 1</h3>
                        <p>Slag hittills</p>
                        <div class="counter-row">
                            <button id="minusBtn" class="counter-btn" type="button" aria-label="Minska slag">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <output id="currentStrokes" class="stroke-value">0</output>
                            <button id="plusBtn" class="counter-btn" type="button" aria-label="Öka slag">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <ul id="holesList" class="holes-list"></ul>
            </section>
        </section>

        <section id="historyView" class="view hidden">
            <section class="card">
                <h2><i class="fa-solid fa-trophy"></i> Alla rundor</h2>
                <p class="muted">Senaste ronden visas högst upp.</p>
                <div id="roundsList" class="rounds-list"></div>
            </section>
        </section>

        <section id="accountView" class="view hidden">
            <section class="card">
                <h2><i class="fa-solid fa-user-gear"></i> Kontohantering</h2>
                <p id="accountEmail" class="muted"></p>
                <form id="accountForm">
                    <label>
                        Namn
                        <input type="text" id="accountName" required maxlength="120">
                    </label>
                    <label>
                        Golf-ID
                        <input type="text" id="accountGolfId" maxlength="50">
                    </label>
                    <label>
                        Nuvarande lösenord (krävs endast vid byte)
                        <input type="password" id="accountCurrentPassword">
                    </label>
                    <label>
                        Nytt lösenord
                        <input type="password" id="accountNewPassword" minlength="6">
                    </label>
                    <button type="submit" class="primary-btn">
                        <i class="fa-solid fa-floppy-disk"></i> Spara konto
                    </button>
                </form>
                <button id="logoutBtn" class="danger-btn top-gap">
                    <i class="fa-solid fa-right-from-bracket"></i> Logga ut
                </button>
            </section>
        </section>
    </section>
</main>

<dialog id="infoDialog" class="info-dialog">
    <article>
        <h2><i class="fa-solid fa-circle-info"></i> Om tjänsten</h2>
        <p>Hantera rundor, medspelare och slag per hål i samma tjänst.</p>
        <button id="infoCloseBtn" type="button" class="primary-btn">Stäng</button>
    </article>
</dialog>

<template id="holeItemTemplate">
    <li>
        <button class="hole-item" type="button">
            <span class="hole-label"></span>
            <span class="hole-strokes"></span>
        </button>
    </li>
</template>

<template id="teammateTemplate">
    <div class="teammate-row">
        <input type="text" class="teammate-name" placeholder="Namn" maxlength="120">
        <input type="text" class="teammate-golfid" placeholder="Golf-ID" maxlength="50">
        <button type="button" class="ghost-btn remove-teammate-btn">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>
</template>

<script src="./assets/app.js" defer></script>
</body>
</html>
