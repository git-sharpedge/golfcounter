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
            <h1><i class="fa-solid fa-golf-ball-tee"></i> <span data-i18n="appTitle">SE Golfcounter</span></h1>
            <div class="hero-actions">
                <button id="infoOpenBtn" type="button" class="icon-btn" data-i18n-aria-label="showInfoAria" aria-label="Visa information">
                <i class="fa-solid fa-circle-info"></i>
                </button>
                <button id="menuToggleBtn" type="button" class="icon-btn" data-i18n-aria-label="menuToggleAria" aria-label="Öppna meny">
                    <i class="fa-solid fa-bars"></i>
                </button>
            </div>
        </div>
    </section>

    <section id="menuDrawer" class="menu-drawer hidden">
        <div class="menu-drawer-card">
            <label class="language-select-wrap" for="languageSelect">
                <span class="visually-hidden" data-i18n="languageLabel">Språk</span>
                <i class="fa-solid fa-language language-icon" aria-hidden="true"></i>
                <select id="languageSelect" class="language-select">
                    <option value="sv-SE">🇸🇪 Svenska</option>
                    <option value="en-GB">🇬🇧 English (UK)</option>
                    <option value="en-US">🇺🇸 English (US)</option>
                </select>
            </label>

            <nav id="appMenu" class="menu hidden">
                <button class="menu-btn active" data-view="playView">
                    <i class="fa-solid fa-flag-checkered"></i> <span data-i18n="menuNewRound">Ny rond</span>
                </button>
                <button class="menu-btn" data-view="historyView">
                    <i class="fa-solid fa-clock-rotate-left"></i> <span data-i18n="menuRounds">Rundor</span>
                </button>
                <button class="menu-btn" data-view="accountView">
                    <i class="fa-solid fa-user-gear"></i> <span data-i18n="menuAccount">Konto</span>
                </button>
            </nav>
        </div>
    </section>

    <section id="authSection" class="card">
        <h2><i class="fa-solid fa-user-lock"></i> <span data-i18n="authTitle">Logga in eller skapa konto</span></h2>
        <div class="auth-grid">
            <form id="loginForm">
                <h3 data-i18n="loginTitle">Logga in</h3>
                <label>
                    <span data-i18n="emailLabel">E-post</span>
                    <input type="email" id="loginEmail" data-i18n-placeholder="emailPlaceholder" placeholder="name@example.com" required>
                </label>
                <label>
                    <span data-i18n="passwordLabel">Losenord</span>
                    <input type="password" id="loginPassword" required minlength="6">
                </label>
                <button type="submit" class="primary-btn">
                    <i class="fa-solid fa-right-to-bracket"></i> <span data-i18n="loginButton">Logga in</span>
                </button>
            </form>

            <form id="registerForm">
                <h3 data-i18n="registerTitle">Skapa konto</h3>
                <label>
                    <span data-i18n="nameLabel">Namn</span>
                    <input type="text" id="registerName" required maxlength="120">
                </label>
                <label>
                    <span data-i18n="emailLabel">E-post</span>
                    <input type="email" id="registerEmail" data-i18n-placeholder="emailPlaceholder" placeholder="name@example.com" required>
                </label>
                <label>
                    <span data-i18n="golfIdLabel">Golf-ID</span>
                    <input type="text" id="registerGolfId" maxlength="50" placeholder="SE-123456">
                </label>
                <label>
                    <span data-i18n="passwordLabel">Losenord</span>
                    <input type="password" id="registerPassword" required minlength="6">
                </label>
                <button type="submit" class="primary-btn">
                    <i class="fa-solid fa-user-plus"></i> <span data-i18n="registerButton">Registrera</span>
                </button>
            </form>
        </div>
    </section>

    <section id="appSection" class="hidden">
        <section id="playView" class="view">
            <section id="noRoundNotice" class="card">
                <h2><i class="fa-regular fa-circle-pause"></i> <span data-i18n="noRoundTitle">Ingen pågående rond</span></h2>
                <p class="muted" data-i18n="noRoundText">Starta en ny rond för att börja registrera slag.</p>
            </section>

            <section id="setupSection" class="card">
                <h2><i class="fa-solid fa-flag-checkered"></i> <span data-i18n="startRoundTitle">Starta ny rond</span></h2>
                <form id="setupForm">
                    <label>
                        <span data-i18n="courseNameLabel">Banans namn</span>
                        <input type="text" id="courseName" required maxlength="180" data-i18n-placeholder="courseNamePlaceholder" placeholder="Min Golfklubb">
                    </label>
                    <fieldset>
                        <legend data-i18n="holeCountLegend">Antal hål</legend>
                        <label class="inline-option">
                            <input type="radio" name="holes" value="9" checked>
                            <span data-i18n="holes9">9 hål</span>
                        </label>
                        <label class="inline-option">
                            <input type="radio" name="holes" value="18">
                            <span data-i18n="holes18">18 hål</span>
                        </label>
                    </fieldset>

                    <div class="teammates">
                        <div class="teammates-header">
                            <h3><i class="fa-solid fa-users"></i> <span data-i18n="teammatesTitle">Medspelare</span></h3>
                            <button id="addTeammateBtn" type="button" class="ghost-btn">
                                <i class="fa-solid fa-user-plus"></i> <span data-i18n="addTeammateButton">Lägg till medspelare (max 3)</span>
                            </button>
                        </div>
                        <div id="teammatesList" class="teammates-list"></div>
                    </div>

                    <button type="submit" class="primary-btn">
                        <i class="fa-solid fa-play"></i> <span data-i18n="startRoundButton">Starta rond</span>
                    </button>
                </form>
            </section>

            <section id="roundSection" class="card hidden">
                <div class="round-sticky-panel">
                    <div class="round-header">
                        <div>
                            <h2><i class="fa-solid fa-list-check"></i> <span data-i18n="ongoingRoundTitle">Pagande rond</span></h2>
                            <p id="roundMeta"></p>
                        </div>
                        <button id="finishRoundBtn" class="danger-btn">
                            <i class="fa-solid fa-circle-stop"></i> <span data-i18n="finishRoundButton">Avsluta rond</span>
                        </button>
                    </div>

                    <div class="player-picker">
                        <label data-i18n="activePlayerLabel">Aktiv spelare</label>
                        <div id="activePlayerButtons" class="player-buttons"></div>
                    </div>

                    <div class="current-hole">
                        <h3 id="currentHoleTitle">Hål 1</h3>
                        <p data-i18n="strokesSoFar">Slag hittills</p>
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
                <h2><i class="fa-solid fa-trophy"></i> <span data-i18n="allRoundsTitle">Alla rundor</span></h2>
                <p class="muted" data-i18n="latestFirstText">Senaste ronden visas högst upp.</p>
                <div id="roundsList" class="rounds-list"></div>
            </section>
        </section>

        <section id="accountView" class="view hidden">
            <section class="card">
                <h2><i class="fa-solid fa-user-gear"></i> <span data-i18n="accountTitle">Kontohantering</span></h2>
                <p id="accountEmail" class="muted"></p>
                <form id="accountForm">
                    <label>
                        <span data-i18n="nameLabel">Namn</span>
                        <input type="text" id="accountName" required maxlength="120">
                    </label>
                    <label>
                        <span data-i18n="golfIdLabel">Golf-ID</span>
                        <input type="text" id="accountGolfId" maxlength="50">
                    </label>
                    <label>
                        <span data-i18n="currentPasswordLabel">Nuvarande lösenord (krävs endast vid byte)</span>
                        <input type="password" id="accountCurrentPassword">
                    </label>
                    <label>
                        <span data-i18n="newPasswordLabel">Nytt lösenord</span>
                        <input type="password" id="accountNewPassword" minlength="6">
                    </label>
                    <button type="submit" class="primary-btn">
                        <i class="fa-solid fa-floppy-disk"></i> <span data-i18n="saveAccountButton">Spara konto</span>
                    </button>
                </form>
                <button id="logoutBtn" class="danger-btn top-gap">
                    <i class="fa-solid fa-right-from-bracket"></i> <span data-i18n="logoutButton">Logga ut</span>
                </button>
            </section>
        </section>
    </section>
</main>

<footer class="site-credit">
    <p data-i18n="createdBy">Created by Sharp Edge AB</p>
    <section class="donation-section">
        <p class="donation-title" data-i18n="donationTitle">Support Golfcounter</p>
        <a id="swishDonateLink" class="primary-btn hidden" target="_blank" rel="noopener noreferrer">
            <i class="fa-solid fa-heart"></i> <span data-i18n="donateWithSwish">Donera med Swish</span>
        </a>
        <div id="donationQrBlock" class="donation-qr hidden">
            <p class="muted" data-i18n="donationQrText">Skanna QR-koden för att donera via Swish.</p>
            <img src="./assets/icons/swish.png" alt="Swish QR-kod">
        </div>
    </section>
</footer>

<dialog id="infoDialog" class="info-dialog">
    <article>
        <h2><i class="fa-solid fa-circle-info"></i> <span data-i18n="infoTitle">Om tjänsten</span></h2>
        <p data-i18n="infoText">Hantera rundor, medspelare och slag per hål i samma tjänst.</p>
        <button id="infoCloseBtn" type="button" class="primary-btn" data-i18n="closeButton">Stäng</button>
    </article>
</dialog>

<dialog id="appDialog" class="info-dialog">
    <article>
        <h2 id="appDialogTitle">Golfcounter</h2>
        <p id="appDialogMessage"></p>
        <div class="dialog-actions">
            <button id="appDialogCancelBtn" type="button" class="ghost-btn hidden" data-i18n="cancel">Avbryt</button>
            <button id="appDialogOkBtn" type="button" class="primary-btn" data-i18n="okButton">OK</button>
        </div>
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
