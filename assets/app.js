const authSection = document.getElementById("authSection");
const appSection = document.getElementById("appSection");
const seoIntroSection = document.getElementById("seoIntroSection");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const accountForm = document.getElementById("accountForm");
const contactForm = document.getElementById("contactForm");
const accountEmail = document.getElementById("accountEmail");
const logoutBtn = document.getElementById("logoutBtn");
const menuLogoutBtn = document.getElementById("menuLogoutBtn");
const menuButtons = Array.from(document.querySelectorAll(".menu-btn"));
const authOnlyMenuButtons = Array.from(document.querySelectorAll(".menu-btn.requires-auth"));
const views = Array.from(document.querySelectorAll(".view"));
const infoDialog = document.getElementById("infoDialog");
const infoOpenBtn = document.getElementById("infoOpenBtn");
const infoCloseBtn = document.getElementById("infoCloseBtn");
const forgotPasswordDialog = document.getElementById("forgotPasswordDialog");
const forgotPasswordOpenBtn = document.getElementById("forgotPasswordOpenBtn");
const forgotPasswordCancelBtn = document.getElementById("forgotPasswordCancelBtn");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");
const forgotPasswordEmailInput = document.getElementById("forgotPasswordEmail");
const forgotPasswordGolfIdInput = document.getElementById("forgotPasswordGolfId");
const forgotPasswordNewPasswordInput = document.getElementById("forgotPasswordNewPassword");
const forgotPasswordConfirmPasswordInput = document.getElementById("forgotPasswordConfirmPassword");
const forgotPasswordConfirmError = document.getElementById("forgotPasswordConfirmError");
const appDialog = document.getElementById("appDialog");
const appDialogTitle = document.getElementById("appDialogTitle");
const appDialogMessage = document.getElementById("appDialogMessage");
const appDialogOkBtn = document.getElementById("appDialogOkBtn");
const appDialogCancelBtn = document.getElementById("appDialogCancelBtn");
const menuToggleBtn = document.getElementById("menuToggleBtn");
const menuDrawer = document.getElementById("menuDrawer");
const appMenu = document.getElementById("appMenu");
const menuDonateLink = document.getElementById("menuDonateLink");
const languageSelect = document.getElementById("languageSelect");
const swishDonateLink = document.getElementById("swishDonateLink");
const donationQrBlock = document.getElementById("donationQrBlock");
const registerEmailInput = document.getElementById("registerEmail");
const registerGolfIdInput = document.getElementById("registerGolfId");
const registerEmailError = document.getElementById("registerEmailError");
const registerCaptchaQuestion = document.getElementById("registerCaptchaQuestion");
const registerCaptchaAnswer = document.getElementById("registerCaptchaAnswer");
const registerCaptchaError = document.getElementById("registerCaptchaError");
const registerCaptchaReloadBtn = document.getElementById("registerCaptchaReloadBtn");
const forgotPasswordCaptchaQuestion = document.getElementById("forgotPasswordCaptchaQuestion");
const forgotPasswordCaptchaAnswer = document.getElementById("forgotPasswordCaptchaAnswer");
const forgotPasswordCaptchaError = document.getElementById("forgotPasswordCaptchaError");
const forgotPasswordCaptchaReloadBtn = document.getElementById("forgotPasswordCaptchaReloadBtn");
const contactCaptchaQuestion = document.getElementById("contactCaptchaQuestion");
const contactCaptchaAnswer = document.getElementById("contactCaptchaAnswer");
const contactCaptchaError = document.getElementById("contactCaptchaError");
const contactCaptchaReloadBtn = document.getElementById("contactCaptchaReloadBtn");

const setupSection = document.getElementById("setupSection");
const noRoundNotice = document.getElementById("noRoundNotice");
const setupForm = document.getElementById("setupForm");
const addTeammateBtn = document.getElementById("addTeammateBtn");
const teammatesList = document.getElementById("teammatesList");
const teammateTemplate = document.getElementById("teammateTemplate");

const roundSection = document.getElementById("roundSection");
const roundMeta = document.getElementById("roundMeta");
const finishRoundBtn = document.getElementById("finishRoundBtn");
const activePlayerButtons = document.getElementById("activePlayerButtons");
const holesList = document.getElementById("holesList");
const currentHoleTitle = document.getElementById("currentHoleTitle");
const currentStrokes = document.getElementById("currentStrokes");
const plusBtn = document.getElementById("plusBtn");
const minusBtn = document.getElementById("minusBtn");
const holeItemTemplate = document.getElementById("holeItemTemplate");

const roundsList = document.getElementById("roundsList");

const STORAGE_KEY = "golfcounter_active_round_v2";
const LANGUAGE_STORAGE_KEY = "golfcounter_language";
const LOGGED_OUT_MENU_VIEW_TTL_MS = 60 * 1000;

const I18N = {
    "sv-SE": {
        appTitle: "Golfcounter",
        showInfoAria: "Visa information",
        menuToggleAria: "Öppna meny",
        languageLabel: "Språk",
        authTitle: "Logga in eller skapa konto",
        loginTitle: "Logga in",
        registerTitle: "Skapa konto",
        nameLabel: "Namn",
        emailLabel: "E-post",
        emailPlaceholder: "name@example.com",
        golfIdLabel: "Golf-ID",
        golfIdPlaceholder: "Golf-ID",
        passwordLabel: "Lösenord",
        forgotPasswordLink: "Glömt lösenord?",
        forgotPasswordTitle: "Återställ lösenord",
        forgotPasswordDescription: "Fyll i e-post och Golf-ID för kontot, och välj ett nytt lösenord.",
        confirmPasswordLabel: "Bekräfta nytt lösenord",
        resetPasswordButton: "Spara nytt lösenord",
        captchaLabel: "Säkerhetsfråga",
        captchaPlaceholder: "Skriv svaret",
        captchaReload: "Ny fråga",
        captchaFailed: "Fel svar på säkerhetsfrågan. Försök igen.",
        registerConsentText: "Jag godkänner att Golfcounter lagrar förnamn, efternamn, golf-ID, namn på golfbana, antal slag och tidpunkt för att tjänsten ska fungera.",
        loginButton: "Logga in",
        registerButton: "Registrera",
        menuNewRound: "Ny rond",
        menuRounds: "Rundor",
        menuAccount: "Konto",
        menuInfo: "Info",
        menuContact: "Kontakt",
        menuDonate: "Donera",
        infoSectionTitle: "Info",
        aboutTitle: "Om Golfcounter",
        aboutIntro: "Golfcounter är främst till för att hjälpa dig räkna och hålla koll på dina slag under pågående hål och under hela rundan.",
        aboutBody1: "När du spelar kan du enkelt registrera slag för dig själv och medspelare, byta hål och se status i realtid så att du alltid vet var ni ligger.",
        aboutBody2: "Efter avslutat hål eller rond fungerar appen som ett praktiskt stöd när du fyller i scorekort, med historik, tider per hål och tydliga sammanställningar.",
        aboutBody3: "Målet är att göra scorehanteringen snabb, tydlig och enkel direkt i mobilen - både under spelet och efteråt.",
        helpTitle: "Hjälp/Guide",
        helpGettingStartedTitle: "Kom igång",
        helpGettingStartedStep1: "Skapa konto och logga in.",
        helpGettingStartedStep2: "Gå till Ny rond och fyll i banans namn.",
        helpGettingStartedStep3: "Välj 9 eller 18 hål och starta ronden.",
        helpSoloTitle: "Spela ensam",
        helpSoloStep1: "Du är automatiskt aktiv spelare.",
        helpSoloStep2: "Använd plus och minus för att registrera slag per hål.",
        helpSoloStep3: "Byt hål i listan och avsluta ronden på sista hålet.",
        helpFriendsTitle: "Spela med vänner",
        helpFriendsStep1: "Lägg till medspelare innan rondstart (max 3 medspelare).",
        helpFriendsStep2: "Växla aktiv spelare med spelarknapparna.",
        helpFriendsStep3: "Registrera slag för varje spelare och hål.",
        helpAfterTitle: "Hantera rundor i efterhand",
        helpAfterStep1: "Öppna Rundor för att visa historik och detaljer.",
        helpAfterStep2: "Pågående rond kan fortsättas eller avslutas.",
        helpAfterStep3: "Avslutade ronder kan redigeras eller tas bort.",
        seoIntroTitle: "Golf scorekort online för 9 och 18 hål",
        seoIntroText: "Golfcounter hjälper dig att registrera slag per hål, följa pågående rond och hantera medspelare direkt i mobilen.",
        seoIntroBullet1: "Registrera slag per hål med tydlig hålöversikt.",
        seoIntroBullet2: "Spela 9 eller 18 hål och fortsätt en pågående rond.",
        seoIntroBullet3: "Se rondhistorik, tider per hål och totalsummeringar.",
        noRoundTitle: "Ingen pågående rond",
        noRoundText: "Starta en ny rond för att börja registrera slag.",
        startRoundTitle: "Starta ny rond",
        courseNameLabel: "Banans namn",
        courseNamePlaceholder: "Min Golfklubb",
        holeCountLegend: "Antal hål",
        holes9: "9 hål",
        holes18: "18 hål",
        teammatesTitle: "Medspelare",
        addTeammateButton: "Lägg till medspelare (max 3)",
        startRoundButton: "Starta rond",
        ongoingRoundTitle: "Pågående rond",
        finishRoundButton: "Avsluta rond",
        activePlayerLabel: "Aktiv spelare",
        strokesSoFar: "Slag hittills",
        allRoundsTitle: "Alla rundor",
        latestFirstText: "Senaste ronden visas högst upp.",
        accountTitle: "Kontohantering",
        contactTitle: "Kontakt",
        contactIntro: "Skicka ett meddelande till oss om du har frågor eller behöver hjälp.",
        contactMessageLabel: "Meddelande",
        contactMessagePlaceholder: "Skriv ditt meddelande här...",
        contactSendButton: "Skicka meddelande",
        currentPasswordLabel: "Nuvarande lösenord (krävs endast vid byte)",
        newPasswordLabel: "Nytt lösenord",
        saveAccountButton: "Spara konto",
        logoutButton: "Logga ut",
        infoTitle: "Om tjänsten",
        infoText: "Hantera rundor, medspelare och slag per hål i samma tjänst.",
        closeButton: "Stäng",
        dialogTitle: "Golfcounter",
        okButton: "OK",
        createdBy: "Created by Sharp Edge AB",
        donationTitle: "Stöd Golfcounter",
        donateWithSwish: "Donera med Swish",
        donateWithKofi: "Donera med Ko-Fi",
        donationQrText: "Skanna QR-koden för att donera via Swish.",
        loginFailed: "Kunde inte logga in: {error}",
        registerFailed: "Kunde inte registrera konto: {error}",
        registerConsentRequired: "Du måste godkänna datalagring för att skapa konto.",
        passwordStrengthRequired: "Lösenord måste vara minst 12 tecken och innehålla minst tre av: stora bokstäver, små bokstäver, siffror eller specialtecken.",
        invalidEmailMessage: "Ange en giltig e-postadress, till exempel namn@example.com.",
        forgotPasswordMismatch: "Nytt lösenord och bekräftelse måste vara identiska.",
        forgotPasswordSuccess: "Lösenordet är uppdaterat. Du kan nu logga in.",
        forgotPasswordFailed: "Kunde inte återställa lösenord: {error}",
        accountUpdated: "Konto uppdaterat.",
        saveAccountFailed: "Kunde inte spara konto: {error}",
        contactSent: "Tack! Ditt meddelande är skickat.",
        contactFailed: "Kunde inte skicka meddelandet: {error}",
        logoutFailed: "Kunde inte logga ut: {error}",
        maxPlayers: "Max 4 spelare per rond (du + 3 medspelare).",
        startRoundFailed: "Kunde inte starta rond: {error}",
        switchHoleFailed: "Kunde inte byta hål: {error}",
        finishConfirm: "Vill du avsluta ronden nu?",
        finishSaved: "Ronden är avslutad och sparad.",
        finishFailed: "Kunde inte avsluta ronden: {error}",
        noRounds: "Inga rundor sparade än.",
        roundsLoadFailed: "Kunde inte läsa rundor: {error}",
        detailsShow: "Visa detaljer",
        detailsHide: "Dölj detaljer",
        detailsFailed: "Kunde inte visa detaljer: {error}",
        continueRoundFailed: "Kunde inte öppna rundan: {error}",
        detailsLoading: "Laddar detaljer...",
        editRound: "Redigera",
        continueRound: "Fortsätt spela",
        saveChanges: "Spara ändringar",
        cancel: "Avbryt",
        deleteRound: "Ta bort",
        deleteConfirm: "Vill du ta bort den här avslutade ronden?",
        deleteFailed: "Kunde inte ta bort ronden: {error}",
        saveEditsFailed: "Kunde inte spara ändringar: {error}",
        invalidStrokes: "Alla slag måste vara heltal 0 eller större.",
        loggedInAs: "Inloggad som {email}",
        youSuffix: " (du)",
        ongoing: "Pågår",
        ended: "Avslutad: {time}",
        startLabel: "Start: {time}",
        holesPlayers: "{holes} hål • {players} spelare",
        holeLabel: "Hål {number}",
        strokesLabel: "{strokes} slag",
        minutesSeconds: "{m}m {s}s",
        holeHeader: "Hål",
        timeHeader: "Tid",
        summaryTitle: "Summering",
        summaryPartHeader: "Del",
        summaryFront9: "Första 9",
        summaryBack9: "Sista 9",
        summaryTotal18: "Totalt 18",
        summaryTotal9: "Totalt 9",
    },
    "en-GB": {
        appTitle: "Golfcounter",
        showInfoAria: "Show information",
        menuToggleAria: "Open menu",
        languageLabel: "Language",
        authTitle: "Sign in or create account",
        loginTitle: "Sign in",
        registerTitle: "Create account",
        nameLabel: "Name",
        emailLabel: "Email",
        emailPlaceholder: "name@example.com",
        golfIdLabel: "Golf ID",
        golfIdPlaceholder: "Golf ID",
        passwordLabel: "Password",
        forgotPasswordLink: "Forgot password?",
        forgotPasswordTitle: "Reset password",
        forgotPasswordDescription: "Enter the account email and Golf ID, then choose a new password.",
        confirmPasswordLabel: "Confirm new password",
        resetPasswordButton: "Save new password",
        captchaLabel: "Security challenge",
        captchaPlaceholder: "Enter the answer",
        captchaReload: "New question",
        captchaFailed: "Incorrect answer to the security challenge. Please try again.",
        registerConsentText: "I consent to Golfcounter storing first name, last name, Golf ID, golf course name, stroke count, and timestamps so the service can function.",
        loginButton: "Sign in",
        registerButton: "Register",
        menuNewRound: "New round",
        menuRounds: "Rounds",
        menuAccount: "Account",
        menuInfo: "Info",
        menuContact: "Contact",
        menuDonate: "Donate",
        infoSectionTitle: "Info",
        aboutTitle: "About Golfcounter",
        aboutIntro: "Golfcounter is primarily designed to help you count and keep track of your strokes during the current hole and throughout the full round.",
        aboutBody1: "While playing, you can quickly register strokes for yourself and your playing partners, switch holes, and see round status in real time.",
        aboutBody2: "After each hole or completed round, the app works as practical support when filling out your scorecard, with history, hole times, and clear summaries.",
        aboutBody3: "The goal is to make score handling fast, clear, and easy on mobile - both during play and afterwards.",
        helpTitle: "Help/Guide",
        helpGettingStartedTitle: "Getting started",
        helpGettingStartedStep1: "Create an account and sign in.",
        helpGettingStartedStep2: "Go to New round and enter the course name.",
        helpGettingStartedStep3: "Choose 9 or 18 holes and start the round.",
        helpSoloTitle: "Playing solo",
        helpSoloStep1: "You are automatically set as the active player.",
        helpSoloStep2: "Use plus and minus to register strokes per hole.",
        helpSoloStep3: "Switch holes in the list and finish the round on the last hole.",
        helpFriendsTitle: "Playing with friends",
        helpFriendsStep1: "Add playing partners before starting the round (max 3 partners).",
        helpFriendsStep2: "Switch active player using the player buttons.",
        helpFriendsStep3: "Register strokes for each player and hole.",
        helpAfterTitle: "Manage rounds afterwards",
        helpAfterStep1: "Open Rounds to view history and details.",
        helpAfterStep2: "An ongoing round can be resumed or finished.",
        helpAfterStep3: "Finished rounds can be edited or deleted.",
        seoIntroTitle: "Golf scorecard online for 9 and 18 holes",
        seoIntroText: "Golfcounter helps you track strokes per hole, follow an ongoing round, and manage playing partners directly on mobile.",
        seoIntroBullet1: "Track strokes per hole with a clear hole overview.",
        seoIntroBullet2: "Play 9 or 18 holes and continue an ongoing round.",
        seoIntroBullet3: "View round history, hole times, and total summaries.",
        noRoundTitle: "No active round",
        noRoundText: "Start a new round to begin tracking strokes.",
        startRoundTitle: "Start new round",
        courseNameLabel: "Course name",
        courseNamePlaceholder: "My Golf Club",
        holeCountLegend: "Number of holes",
        holes9: "9 holes",
        holes18: "18 holes",
        teammatesTitle: "Playing partners",
        addTeammateButton: "Add playing partner (max 3)",
        startRoundButton: "Start round",
        ongoingRoundTitle: "Ongoing round",
        finishRoundButton: "Finish round",
        activePlayerLabel: "Active player",
        strokesSoFar: "Strokes so far",
        allRoundsTitle: "All rounds",
        latestFirstText: "Most recent round appears first.",
        accountTitle: "Account settings",
        contactTitle: "Contact",
        contactIntro: "Send us a message if you have questions or need help.",
        contactMessageLabel: "Message",
        contactMessagePlaceholder: "Write your message here...",
        contactSendButton: "Send message",
        currentPasswordLabel: "Current password (only required for password change)",
        newPasswordLabel: "New password",
        saveAccountButton: "Save account",
        logoutButton: "Sign out",
        infoTitle: "About the service",
        infoText: "Track rounds, partners, and strokes per hole in one service.",
        closeButton: "Close",
        dialogTitle: "Golfcounter",
        okButton: "OK",
        createdBy: "Created by Sharp Edge AB",
        donationTitle: "Support Golfcounter",
        donateWithSwish: "Donate with Swish",
        donateWithKofi: "Donate via Ko-Fi",
        donationQrText: "Scan the QR code to donate via Swish.",
        loginFailed: "Could not sign in: {error}",
        registerFailed: "Could not register account: {error}",
        registerConsentRequired: "You must approve data storage to create an account.",
        passwordStrengthRequired: "Password must be at least 12 characters and include at least three of: uppercase letters, lowercase letters, numbers, or special characters.",
        invalidEmailMessage: "Enter a valid email address, for example name@example.com.",
        forgotPasswordMismatch: "New password and confirmation must match.",
        forgotPasswordSuccess: "Password updated. You can now sign in.",
        forgotPasswordFailed: "Could not reset password: {error}",
        accountUpdated: "Account updated.",
        saveAccountFailed: "Could not save account: {error}",
        contactSent: "Thanks! Your message has been sent.",
        contactFailed: "Could not send the message: {error}",
        logoutFailed: "Could not sign out: {error}",
        maxPlayers: "Maximum 4 players per round (you + 3 partners).",
        startRoundFailed: "Could not start round: {error}",
        switchHoleFailed: "Could not switch hole: {error}",
        finishConfirm: "Do you want to finish the round now?",
        finishSaved: "The round has been completed and saved.",
        finishFailed: "Could not finish round: {error}",
        noRounds: "No rounds saved yet.",
        roundsLoadFailed: "Could not load rounds: {error}",
        detailsShow: "Show details",
        detailsHide: "Hide details",
        detailsFailed: "Could not show details: {error}",
        continueRoundFailed: "Could not open the round: {error}",
        detailsLoading: "Loading details...",
        editRound: "Edit",
        continueRound: "Continue playing",
        saveChanges: "Save changes",
        cancel: "Cancel",
        deleteRound: "Delete",
        deleteConfirm: "Do you want to delete this finished round?",
        deleteFailed: "Could not delete round: {error}",
        saveEditsFailed: "Could not save changes: {error}",
        invalidStrokes: "All strokes must be integers of 0 or more.",
        loggedInAs: "Signed in as {email}",
        youSuffix: " (you)",
        ongoing: "Ongoing",
        ended: "Finished: {time}",
        startLabel: "Start: {time}",
        holesPlayers: "{holes} holes • {players} players",
        holeLabel: "Hole {number}",
        strokesLabel: "{strokes} strokes",
        minutesSeconds: "{m}m {s}s",
        holeHeader: "Hole",
        timeHeader: "Time",
        summaryTitle: "Summary",
        summaryPartHeader: "Section",
        summaryFront9: "Front 9",
        summaryBack9: "Back 9",
        summaryTotal18: "Total 18",
        summaryTotal9: "Total 9",
    },
    "en-US": {}
};

I18N["en-US"] = { ...I18N["en-GB"] };

const state = {
    language: getInitialLanguage(),
    user: null,
    roundId: null,
    courseName: "",
    startedAt: "",
    endedAt: null,
    totalHoles: 0,
    currentHoleIndex: 0,
    activePlayerId: null,
    players: [],
    holeDurationsSeconds: [],
    holeStartedAtMs: null,
    rounds: [],
    expandedRoundId: null,
    editingRoundId: null,
    detailRounds: {},
    lastPublicMenuActivationAt: 0,
    loggedOutContactDraftActive: false,
    captcha: {
        register: null,
        forgot_password: null,
        contact_message: null,
    },
};

let loggedOutViewHideTimer = null;

if (languageSelect) {
    languageSelect.value = state.language;
    languageSelect.addEventListener("change", () => {
        state.language = languageSelect.value;
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, state.language);
        applyStaticTranslations();
        if (state.user) {
            setUser(state.user);
        }
        renderRoundUi();
        renderRoundsList();
    });
}

applyStaticTranslations();
setupDonationUi();
initializeFieldValidation();
void initializeCaptcha();

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const response = await postApi("login", {
            email: document.getElementById("loginEmail").value.trim(),
            password: document.getElementById("loginPassword").value,
        });
        setUser(response.user);
        loginForm.reset();
        await restoreRoundFromLocalStorage();
        await refreshRounds();
    } catch (error) {
        await showAppAlert(t("loginFailed", { error: error.message }));
    }
});

if (forgotPasswordOpenBtn && forgotPasswordDialog) {
    forgotPasswordOpenBtn.addEventListener("click", async () => {
        await refreshCaptcha("forgot_password");
        if (typeof forgotPasswordDialog.showModal === "function") {
            forgotPasswordDialog.showModal();
        }
    });
}

if (forgotPasswordCancelBtn && forgotPasswordDialog) {
    forgotPasswordCancelBtn.addEventListener("click", () => {
        forgotPasswordDialog.close();
    });
}

if (forgotPasswordDialog) {
    forgotPasswordDialog.addEventListener("click", (event) => {
        const bounds = forgotPasswordDialog.getBoundingClientRect();
        const outsideDialog =
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom;
        if (outsideDialog) {
            forgotPasswordDialog.close();
        }
    });
}

if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = forgotPasswordEmailInput.value.trim();
        const golfId = forgotPasswordGolfIdInput.value.trim();
        const newPassword = forgotPasswordNewPasswordInput.value;
        const confirmPassword = forgotPasswordConfirmPasswordInput.value;
        const forgotCaptcha = state.captcha.forgot_password;
        const captchaAnswer = (forgotPasswordCaptchaAnswer?.value || "").trim();

        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isEmailValid) {
            await showAppAlert(t("invalidEmailMessage"));
            return;
        }

        if (!isStrongPassword(newPassword)) {
            await showAppAlert(t("passwordStrengthRequired"));
            return;
        }

        if (newPassword !== confirmPassword) {
            showInputError(
                forgotPasswordConfirmPasswordInput,
                forgotPasswordConfirmError,
                t("forgotPasswordMismatch")
            );
            return;
        }
        clearInputError(forgotPasswordConfirmPasswordInput, forgotPasswordConfirmError);
        if (!forgotCaptcha || captchaAnswer === "") {
            showInputError(forgotPasswordCaptchaAnswer, forgotPasswordCaptchaError, t("captchaFailed"));
            return;
        }
        clearInputError(forgotPasswordCaptchaAnswer, forgotPasswordCaptchaError);

        try {
            await postApi("forgot_password", {
                email,
                golf_id: golfId,
                new_password: newPassword,
                captcha_context: "forgot_password",
                captcha_id: forgotCaptcha.id,
                captcha_answer: captchaAnswer,
            });
            forgotPasswordForm.reset();
            clearInputError(forgotPasswordConfirmPasswordInput, forgotPasswordConfirmError);
            clearInputError(forgotPasswordCaptchaAnswer, forgotPasswordCaptchaError);
            forgotPasswordDialog.close();
            await showAppAlert(t("forgotPasswordSuccess"));
        } catch (error) {
            if (error.message === "captcha_failed") {
                showInputError(forgotPasswordCaptchaAnswer, forgotPasswordCaptchaError, t("captchaFailed"));
                await refreshCaptcha("forgot_password");
                return;
            }
            await showAppAlert(t("forgotPasswordFailed", { error: error.message }));
        }
    });
}

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const consentAccepted = document.getElementById("registerConsent").checked;
    const password = document.getElementById("registerPassword").value;
    const email = registerEmailInput.value.trim();
    const golfId = registerGolfIdInput.value.trim();
    const registerCaptcha = state.captcha.register;
    const captchaAnswer = (registerCaptchaAnswer?.value || "").trim();

    const isEmailValid = validateRegisterEmail(email);
    const hasCaptcha = Boolean(registerCaptcha && captchaAnswer !== "");
    if (!hasCaptcha) {
        showInputError(registerCaptchaAnswer, registerCaptchaError, t("captchaFailed"));
    } else {
        clearInputError(registerCaptchaAnswer, registerCaptchaError);
    }
    if (!isEmailValid || !hasCaptcha) {
        return;
    }
    if (!consentAccepted) {
        await showAppAlert(t("registerConsentRequired"));
        return;
    }
    if (!isStrongPassword(password)) {
        await showAppAlert(t("passwordStrengthRequired"));
        return;
    }

    try {
        const response = await postApi("register", {
            name: document.getElementById("registerName").value.trim(),
            email,
            golf_id: golfId,
            password,
            consent_accepted: consentAccepted,
            language: state.language,
            captcha_context: "register",
            captcha_id: registerCaptcha.id,
            captcha_answer: captchaAnswer,
        });
        setUser(response.user);
        registerForm.reset();
        clearInputError(registerEmailInput, registerEmailError);
        clearInputError(registerCaptchaAnswer, registerCaptchaError);
        await restoreRoundFromLocalStorage();
        await refreshRounds();
    } catch (error) {
        if (error.message === "captcha_failed") {
            showInputError(registerCaptchaAnswer, registerCaptchaError, t("captchaFailed"));
            await refreshCaptcha("register");
            return;
        }
        await showAppAlert(t("registerFailed", { error: error.message }));
    }
});

accountForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const newPassword = document.getElementById("accountNewPassword").value;
    if (newPassword && !isStrongPassword(newPassword)) {
        await showAppAlert(t("passwordStrengthRequired"));
        return;
    }

    try {
        const response = await postApi("update_account", {
            name: document.getElementById("accountName").value.trim(),
            golf_id: document.getElementById("accountGolfId").value.trim(),
            current_password: document.getElementById("accountCurrentPassword").value,
            new_password: newPassword,
        });
        setUser(response.user);
        document.getElementById("accountCurrentPassword").value = "";
        document.getElementById("accountNewPassword").value = "";
        await showAppAlert(t("accountUpdated"));
    } catch (error) {
        await showAppAlert(t("saveAccountFailed", { error: error.message }));
    }
});

if (contactForm) {
    contactForm.addEventListener("input", () => {
        if (state.user) {
            return;
        }
        state.loggedOutContactDraftActive = true;
        clearLoggedOutViewHideTimer();
    });

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const contactCaptcha = state.captcha.contact_message;
        const captchaAnswer = (contactCaptchaAnswer?.value || "").trim();
        if (!contactCaptcha || captchaAnswer === "") {
            showInputError(contactCaptchaAnswer, contactCaptchaError, t("captchaFailed"));
            return;
        }
        clearInputError(contactCaptchaAnswer, contactCaptchaError);
        if (!state.user) {
            state.loggedOutContactDraftActive = false;
            state.lastPublicMenuActivationAt = Date.now();
            scheduleLoggedOutViewHide();
        }
        try {
            await postApi("contact_message", {
                name: document.getElementById("contactName").value.trim(),
                email: document.getElementById("contactEmail").value.trim(),
                message: document.getElementById("contactMessage").value.trim(),
                captcha_context: "contact_message",
                captcha_id: contactCaptcha.id,
                captcha_answer: captchaAnswer,
            });
            contactForm.reset();
            if (contactCaptchaAnswer) {
                contactCaptchaAnswer.value = "";
            }
            clearInputError(contactCaptchaAnswer, contactCaptchaError);
            if (state.user) {
                document.getElementById("contactName").value = state.user.name || "";
                document.getElementById("contactEmail").value = state.user.email || "";
            }
            await showAppAlert(t("contactSent"));
        } catch (error) {
            if (error.message === "captcha_failed") {
                showInputError(contactCaptchaAnswer, contactCaptchaError, t("captchaFailed"));
                await refreshCaptcha("contact_message");
                return;
            }
            await showAppAlert(t("contactFailed", { error: error.message }));
        } finally {
            await refreshCaptcha("contact_message");
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        await handleLogout();
    });
}

if (menuLogoutBtn) {
    menuLogoutBtn.addEventListener("click", async () => {
        await handleLogout();
    });
}

async function handleLogout() {
    try {
        await postApi("logout");
        clearLocalState();
        resetRoundState();
        setUser(null);
        closeMenuDrawer();
    } catch (error) {
        await showAppAlert(t("logoutFailed", { error: error.message }));
    }
}

menuButtons.forEach((button) => {
    button.addEventListener("click", async () => {
        const targetView = button.dataset.view;
        if (!targetView) {
            return;
        }

        if (!state.user) {
            if (button.classList.contains("requires-auth")) {
                return;
            }
            activateLoggedOutMenuView(targetView);
            closeMenuDrawer();
            return;
        }

        showView(targetView);
        closeMenuDrawer();
        if (targetView === "historyView") {
            await refreshRounds();
        }
    });
});

if (menuToggleBtn && menuDrawer) {
    menuToggleBtn.addEventListener("click", () => {
        const shouldOpen = menuDrawer.classList.contains("hidden");
        if (shouldOpen) {
            positionMenuDrawer();
            menuDrawer.classList.remove("hidden");
            return;
        }
        closeMenuDrawer();
    });

    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Node)) {
            return;
        }

        const insideDrawer = menuDrawer.contains(target);
        const insideToggle = menuToggleBtn.contains(target);
        if (!insideDrawer && !insideToggle) {
            closeMenuDrawer();
        }
    });

    window.addEventListener("resize", () => {
        if (!menuDrawer.classList.contains("hidden")) {
            positionMenuDrawer();
        }
    });

    window.addEventListener("scroll", () => {
        if (!menuDrawer.classList.contains("hidden")) {
            positionMenuDrawer();
        }
    }, { passive: true });
}

if (menuDonateLink) {
    menuDonateLink.addEventListener("click", () => {
        closeMenuDrawer();
    });
}

setupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await startRound();
});

addTeammateBtn.addEventListener("click", () => {
    addTeammateRow();
});

if (infoOpenBtn && infoDialog) {
    infoOpenBtn.addEventListener("click", () => {
        if (typeof infoDialog.showModal === "function") {
            infoDialog.showModal();
        }
    });
}

if (infoCloseBtn && infoDialog) {
    infoCloseBtn.addEventListener("click", () => {
        infoDialog.close();
    });
}

if (infoDialog) {
    infoDialog.addEventListener("click", (event) => {
        const bounds = infoDialog.getBoundingClientRect();
        const outsideDialog =
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom;
        if (outsideDialog) {
            infoDialog.close();
        }
    });
}

let appDialogResolver = null;

if (appDialogOkBtn) {
    appDialogOkBtn.addEventListener("click", () => {
        if (appDialogResolver) {
            appDialogResolver(true);
            appDialogResolver = null;
        }
        appDialog.close();
    });
}

if (appDialogCancelBtn) {
    appDialogCancelBtn.addEventListener("click", () => {
        if (appDialogResolver) {
            appDialogResolver(false);
            appDialogResolver = null;
        }
        appDialog.close();
    });
}

if (appDialog) {
    appDialog.addEventListener("cancel", (event) => {
        event.preventDefault();
        if (appDialogResolver) {
            appDialogResolver(false);
            appDialogResolver = null;
        }
        appDialog.close();
    });
}

plusBtn.addEventListener("click", () => {
    const activePlayer = getActivePlayer();
    if (!activePlayer) {
        return;
    }
    const current = Number(activePlayer.strokes[state.currentHoleIndex] ?? 0);
    activePlayer.strokes[state.currentHoleIndex] = current + 1;
    renderCurrentHoleCounter();
    persistLocalState();
});

minusBtn.addEventListener("click", () => {
    const activePlayer = getActivePlayer();
    if (!activePlayer) {
        return;
    }
    const current = Number(activePlayer.strokes[state.currentHoleIndex] ?? 0);
    activePlayer.strokes[state.currentHoleIndex] = Math.max(0, current - 1);
    renderCurrentHoleCounter();
    persistLocalState();
});

finishRoundBtn.addEventListener("click", async () => {
    if (!state.roundId) {
        return;
    }

    const confirmed = await showAppConfirm(t("finishConfirm"));
    if (!confirmed) {
        return;
    }

    try {
        finalizeCurrentHoleTiming();
        await saveCurrentHoleToDatabase();
        persistLocalState();
        await postApi("finish_round", { round_id: state.roundId });
        clearLocalState();
        await showAppAlert(t("finishSaved"));
        resetRoundState();
        await refreshRounds();
        showView("historyView");
    } catch (error) {
        await showAppAlert(t("finishFailed", { error: error.message }));
    }
});

updateTeammateControls();
registerServiceWorker();
void initializeApp();

async function initializeApp() {
    try {
        const response = await postApi("get_session");
        setUser(response.user);
        if (response.user) {
            await restoreRoundFromLocalStorage();
            await refreshRounds();
        }
    } catch (error) {
        setUser(null);
    }
}

function setUser(user) {
    state.user = user;
    appMenu.classList.remove("hidden");
    authOnlyMenuButtons.forEach((button) => {
        button.classList.toggle("hidden", !user);
    });
    if (seoIntroSection) {
        seoIntroSection.classList.add("hidden");
    }

    if (!user) {
        void refreshCaptcha("register");
        void refreshCaptcha("contact_message");
        state.loggedOutContactDraftActive = false;
        clearLoggedOutViewHideTimer();
        authSection.classList.remove("hidden");
        appSection.classList.add("hidden");
        closeMenuDrawer();
        updateScrollLock();
        return;
    }

    clearLoggedOutViewHideTimer();
    authSection.classList.add("hidden");
    appSection.classList.remove("hidden");
    document.getElementById("accountName").value = user.name || "";
    document.getElementById("accountGolfId").value = user.golf_id || "";
    accountEmail.textContent = t("loggedInAs", { email: user.email });
    const contactNameInput = document.getElementById("contactName");
    const contactEmailInput = document.getElementById("contactEmail");
    if (contactNameInput && contactEmailInput) {
        contactNameInput.value = user.name || "";
        contactEmailInput.value = user.email || "";
    }
    updateScrollLock();
}

function showView(viewId) {
    views.forEach((view) => {
        view.classList.toggle("hidden", view.id !== viewId);
    });

    menuButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.view === viewId);
    });

    updateScrollLock();
}

function activateLoggedOutMenuView(viewId) {
    state.lastPublicMenuActivationAt = Date.now();
    appSection.classList.remove("hidden");
    showView(viewId);
    scheduleLoggedOutViewHide();
}

function clearLoggedOutViewHideTimer() {
    if (loggedOutViewHideTimer !== null) {
        window.clearTimeout(loggedOutViewHideTimer);
        loggedOutViewHideTimer = null;
    }
}

function scheduleLoggedOutViewHide() {
    clearLoggedOutViewHideTimer();
    if (state.user) {
        return;
    }

    const elapsed = Date.now() - state.lastPublicMenuActivationAt;
    const remaining = Math.max(0, LOGGED_OUT_MENU_VIEW_TTL_MS - elapsed);
    loggedOutViewHideTimer = window.setTimeout(() => {
        if (state.user) {
            return;
        }
        if (state.loggedOutContactDraftActive) {
            return;
        }
        const stillExpired = Date.now() - state.lastPublicMenuActivationAt >= LOGGED_OUT_MENU_VIEW_TTL_MS;
        if (stillExpired) {
            appSection.classList.add("hidden");
            updateScrollLock();
        }
    }, remaining);
}

function addTeammateRow(player = null) {
    const currentRows = teammatesList.querySelectorAll(".teammate-row").length;
    if (currentRows >= 3) {
        void showAppAlert(t("maxPlayers"));
        return;
    }

    const row = teammateTemplate.content.firstElementChild.cloneNode(true);
    const nameInput = row.querySelector(".teammate-name");
    const golfInput = row.querySelector(".teammate-golfid");
    const removeButton = row.querySelector(".remove-teammate-btn");
    nameInput.placeholder = t("nameLabel");
    golfInput.placeholder = t("golfIdPlaceholder");

    if (player) {
        nameInput.value = player.player_name || "";
        golfInput.value = player.golf_id || "";
    }

    removeButton.addEventListener("click", () => {
        row.remove();
        updateTeammateControls();
    });
    teammatesList.appendChild(row);
    updateTeammateControls();
}

async function startRound() {
    const formData = new FormData(setupForm);
    const teammateRows = Array.from(teammatesList.querySelectorAll(".teammate-row"));
    const teammates = [];

    teammateRows.forEach((row) => {
        const name = row.querySelector(".teammate-name").value.trim();
        const golfInput = row.querySelector(".teammate-golfid");
        const golfId = golfInput.value.trim();

        if (name !== "") {
            teammates.push({
                player_name: name,
                golf_id: golfId,
            });
        }
    });

    if (teammates.length > 3) {
        await showAppAlert(t("maxPlayers"));
        return;
    }

    try {
        const response = await postApi("start_round", {
            course_name: document.getElementById("courseName").value.trim(),
            total_holes: Number(formData.get("holes")),
            players: teammates,
        });

        state.roundId = response.round_id;
        state.courseName = document.getElementById("courseName").value.trim();
        state.startedAt = response.started_at;
        state.endedAt = null;
        state.totalHoles = response.total_holes;
        state.currentHoleIndex = 0;
        state.players = response.players || [];
        state.activePlayerId = state.players[0]?.id ?? null;
        state.holeDurationsSeconds = Array(state.totalHoles).fill(null);
        state.holeStartedAtMs = Date.now();

        persistLocalState();
        renderRoundUi();
        await refreshRounds();
    } catch (error) {
        await showAppAlert(t("startRoundFailed", { error: error.message }));
    }
}

async function changeHole(nextHoleIndex) {
    if (nextHoleIndex === state.currentHoleIndex || nextHoleIndex < 0 || nextHoleIndex >= state.totalHoles) {
        return;
    }

    try {
        finalizeCurrentHoleTiming();
        await saveCurrentHoleToDatabase();
        state.currentHoleIndex = nextHoleIndex;
        state.activePlayerId = getOwnerPlayerId() ?? state.activePlayerId;
        state.holeStartedAtMs = Date.now();
        persistLocalState();
        renderRoundUi();
    } catch (error) {
        await showAppAlert(t("switchHoleFailed", { error: error.message }));
    }
}

async function saveCurrentHoleToDatabase() {
    if (!state.roundId) {
        return;
    }

    const holeNumber = state.currentHoleIndex + 1;
    const payload = state.players.map((player) => ({
        player_id: player.id,
        strokes: Number(player.strokes[state.currentHoleIndex] ?? 0),
    }));

    const response = await postApi("save_hole", {
        round_id: state.roundId,
        hole_number: holeNumber,
        player_strokes: payload,
        hole_duration_seconds: state.holeDurationsSeconds[state.currentHoleIndex],
    });

    state.players = response.players || state.players;
    state.holeDurationsSeconds = normalizeHoleDurations(response.hole_durations_seconds, state.totalHoles);
    if (!state.players.some((player) => player.id === state.activePlayerId)) {
        state.activePlayerId = state.players[0]?.id ?? null;
    }
    persistLocalState();
}

async function restoreRoundFromLocalStorage() {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw || !state.user) {
        return;
    }

    try {
        const saved = JSON.parse(raw);
        if (!saved.roundId || saved.userId !== state.user.id) {
            clearLocalState();
            return;
        }

        const response = await postApi("get_round", { round_id: saved.roundId });
        const round = response.round;
        if (round.ended_at) {
            clearLocalState();
            resetRoundState();
            return;
        }

        state.roundId = round.id;
        state.courseName = round.course_name;
        state.startedAt = round.started_at;
        state.endedAt = round.ended_at;
        state.totalHoles = round.total_holes;
        state.players = round.players || [];
        state.currentHoleIndex = clamp(Number(saved.currentHoleIndex ?? 0), 0, state.totalHoles - 1);
        state.activePlayerId = Number(saved.activePlayerId ?? state.players[0]?.id ?? 0);
        const persistedDurations = normalizeHoleDurations(round.hole_durations_seconds, state.totalHoles);
        const localDurations = normalizeHoleDurations(saved.holeDurationsSeconds, state.totalHoles);
        state.holeDurationsSeconds = persistedDurations.map((value, index) => {
            const localValue = localDurations[index];
            return typeof localValue === "number" ? localValue : value;
        });
        state.holeStartedAtMs = Number(saved.holeStartedAtMs ?? Date.now());
        if (!Number.isFinite(state.holeStartedAtMs) || state.holeStartedAtMs <= 0) {
            state.holeStartedAtMs = Date.now();
        }

        renderRoundUi();
        persistLocalState();
    } catch (error) {
        clearLocalState();
        resetRoundState();
    }
}

function renderRoundUi() {
    if (!state.roundId) {
        noRoundNotice.classList.remove("hidden");
        setupSection.classList.remove("hidden");
        roundSection.classList.add("hidden");
        updateScrollLock();
        return;
    }

    noRoundNotice.classList.add("hidden");
    setupSection.classList.add("hidden");
    roundSection.classList.remove("hidden");

    roundMeta.textContent = `${state.courseName} - ${formatDateTime(state.startedAt)}`;
    currentHoleTitle.textContent = t("holeLabel", { number: state.currentHoleIndex + 1 });
    renderPlayerSelect();
    renderCurrentHoleCounter();
    renderHolesList();
    renderFinishRoundButton();
    updateScrollLock();
}

function renderPlayerSelect() {
    activePlayerButtons.textContent = "";

    if (!state.players.some((player) => player.id === state.activePlayerId)) {
        state.activePlayerId = state.players[0]?.id ?? null;
    }

    state.players.forEach((player) => {
        const button = document.createElement("button");
        button.className = "player-btn";
        button.type = "button";
        button.textContent = player.is_owner
            ? `${player.player_name}${t("youSuffix")}`
            : `${player.player_name}`;
        button.classList.toggle("active", player.id === state.activePlayerId);
        button.addEventListener("click", () => {
            state.activePlayerId = player.id;
            renderRoundUi();
            persistLocalState();
        });
        activePlayerButtons.appendChild(button);
    });
}

function renderCurrentHoleCounter() {
    const activePlayer = getActivePlayer();
    const strokes = Number(activePlayer?.strokes?.[state.currentHoleIndex] ?? 0);
    currentStrokes.textContent = String(strokes);
    minusBtn.disabled = strokes <= 0;
}

function renderHolesList() {
    holesList.textContent = "";
    const activePlayer = getActivePlayer();
    if (!activePlayer) {
        return;
    }

    for (let index = 0; index < state.totalHoles; index += 1) {
        const listItem = holeItemTemplate.content.firstElementChild.cloneNode(true);
        const button = listItem.querySelector(".hole-item");
        const label = listItem.querySelector(".hole-label");
        const strokesLabel = listItem.querySelector(".hole-strokes");

        const holeNumber = index + 1;
        const isCurrent = index === state.currentHoleIndex;
        const isPlayed = !isCurrent && activePlayer.strokes[index] !== null;
        const strokesValue = Number(activePlayer.strokes[index] ?? 0);
        const duration = state.holeDurationsSeconds[index];
        const durationLabel = typeof duration === "number" ? ` • ${formatDuration(duration)}` : "";

        label.textContent = t("holeLabel", { number: holeNumber });
        strokesLabel.textContent = `${t("strokesLabel", { strokes: strokesValue })}${durationLabel}`;
        button.classList.add(isCurrent ? "current" : isPlayed ? "played" : "upcoming");
        button.addEventListener("click", () => {
            void changeHole(index);
        });

        holesList.appendChild(listItem);
    }
}

async function refreshRounds() {
    if (!state.user) {
        return;
    }
    try {
        const response = await postApi("list_rounds");
        state.rounds = response.rounds || [];
        if (state.expandedRoundId !== null && !state.rounds.some((round) => round.id === state.expandedRoundId)) {
            state.expandedRoundId = null;
            state.editingRoundId = null;
        }
        renderRoundsList();
    } catch (error) {
        roundsList.innerHTML = `<p class="muted">${escapeHtml(t("roundsLoadFailed", { error: error.message }))}</p>`;
    }
}

function renderRoundsList() {
    roundsList.textContent = "";
    if (state.rounds.length === 0) {
        roundsList.innerHTML = `<p class="muted">${escapeHtml(t("noRounds"))}</p>`;
        return;
    }

    state.rounds.forEach((round) => {
        const item = document.createElement("article");
        item.className = "round-item";
        const endedLabel = round.ended_at
            ? t("ended", { time: formatDateTime(round.ended_at) })
            : t("ongoing");
        item.innerHTML = `
            <div>
                <strong>${escapeHtml(round.course_name)}</strong>
                <div class="muted">${escapeHtml(t("holesPlayers", { holes: round.total_holes, players: round.players_count }))}</div>
                <div class="muted">${escapeHtml(t("startLabel", { time: formatDateTime(round.started_at) }))}</div>
                <div class="muted">${escapeHtml(endedLabel)}</div>
            </div>
        `;

        const actions = document.createElement("div");
        actions.className = "round-details-actions";

        const detailsButton = document.createElement("button");
        detailsButton.className = "ghost-btn";
        detailsButton.type = "button";
        detailsButton.innerHTML = state.expandedRoundId === round.id
            ? `<i class="fa-solid fa-eye-slash"></i> ${escapeHtml(t("detailsHide"))}`
            : `<i class="fa-solid fa-eye"></i> ${escapeHtml(t("detailsShow"))}`;
        detailsButton.addEventListener("click", () => {
            void toggleRoundDetails(round.id);
        });
        actions.appendChild(detailsButton);

        if (round.ended_at) {
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "danger-btn";
            deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i> ${escapeHtml(t("deleteRound"))}`;
            deleteButton.addEventListener("click", () => {
                void deleteRound(round.id);
            });
            actions.appendChild(deleteButton);
        } else {
            const continueButton = document.createElement("button");
            continueButton.type = "button";
            continueButton.className = "ghost-btn";
            continueButton.innerHTML = `<i class="fa-solid fa-pen"></i> ${escapeHtml(t("continueRound"))}`;
            continueButton.addEventListener("click", () => {
                void continueRound(round.id);
            });
            actions.appendChild(continueButton);

            const finishButton = document.createElement("button");
            finishButton.type = "button";
            finishButton.className = "danger-btn";
            finishButton.innerHTML = `<i class="fa-solid fa-circle-stop"></i> ${escapeHtml(t("finishRoundButton"))}`;
            finishButton.addEventListener("click", () => {
                void finishRoundFromHistory(round.id);
            });
            actions.appendChild(finishButton);
        }

        item.appendChild(actions);

        if (state.expandedRoundId === round.id) {
            const detailsWrap = document.createElement("div");
            detailsWrap.className = "round-inline-details";
            detailsWrap.innerHTML = buildInlineRoundDetails(round.id);
            detailsWrap.querySelectorAll("[data-inline-action]").forEach((button) => {
                button.addEventListener("click", () => {
                    const action = button.getAttribute("data-inline-action");
                    if (action === "edit") {
                        state.editingRoundId = round.id;
                        renderRoundsList();
                    } else if (action === "cancel") {
                        state.editingRoundId = null;
                        renderRoundsList();
                    } else if (action === "save") {
                        void saveRoundEdits(round.id, detailsWrap);
                    }
                });
            });
            item.appendChild(detailsWrap);
        }

        roundsList.appendChild(item);
    });
}

async function toggleRoundDetails(roundId) {
    if (state.expandedRoundId === roundId) {
        state.expandedRoundId = null;
        state.editingRoundId = null;
        renderRoundsList();
        return;
    }

    if (!state.detailRounds[roundId]) {
        try {
            const response = await postApi("get_round", { round_id: roundId });
            state.detailRounds[roundId] = response.round;
        } catch (error) {
            await showAppAlert(t("detailsFailed", { error: error.message }));
            return;
        }
    }

    state.expandedRoundId = roundId;
    state.editingRoundId = null;
    renderRoundsList();
}

function buildInlineRoundDetails(roundId) {
    const round = state.detailRounds[roundId];
    if (!round) {
        return `<p class="muted">${escapeHtml(t("detailsLoading"))}</p>`;
    }

    const actions = [];
    if (state.editingRoundId === roundId) {
        actions.push(`<button type="button" class="primary-btn" data-inline-action="save"><i class="fa-solid fa-floppy-disk"></i> ${escapeHtml(t("saveChanges"))}</button>`);
        actions.push(`<button type="button" class="ghost-btn" data-inline-action="cancel"><i class="fa-solid fa-xmark"></i> ${escapeHtml(t("cancel"))}</button>`);
    } else {
        actions.push(`<button type="button" class="ghost-btn" data-inline-action="edit"><i class="fa-solid fa-pen"></i> ${escapeHtml(t("editRound"))}</button>`);
    }

    const table = state.editingRoundId === roundId
        ? buildEditableRoundDetailsTable(round)
        : buildRoundDetailsTable(round);

    return `
        <div class="round-details-actions">
            ${actions.join("")}
        </div>
        <div class="round-inline-table-wrap">${table}</div>
    `;
}

function buildRoundDetailsTable(round) {
    const players = round.players || [];
    const holeDurations = normalizeHoleDurations(round.hole_durations_seconds, Number(round.total_holes ?? 0));
    let html = `<table class="details-table"><thead><tr><th>${escapeHtml(t("holeHeader"))}</th><th>${escapeHtml(t("timeHeader"))}</th>`;
    players.forEach((player) => {
        html += `<th>${escapeHtml(player.player_name)}</th>`;
    });
    html += "</tr></thead><tbody>";

    for (let holeIndex = 0; holeIndex < round.total_holes; holeIndex += 1) {
        const duration = holeDurations[holeIndex];
        const durationLabel = typeof duration === "number" ? formatDuration(duration) : "-";
        html += `<tr><td>${holeIndex + 1}</td><td>${escapeHtml(durationLabel)}</td>`;
        players.forEach((player) => {
            const strokes = Number(player.strokes?.[holeIndex] ?? 0);
            html += `<td>${strokes}</td>`;
        });
        html += "</tr>";
    }

    html += "</tbody></table>";
    if (round.ended_at) {
        html += buildRoundSummary(round);
    }

    return html;
}

function buildEditableRoundDetailsTable(round) {
    const players = round.players || [];
    const holeDurations = normalizeHoleDurations(round.hole_durations_seconds, Number(round.total_holes ?? 0));
    let html = `<table class="details-table"><thead><tr><th>${escapeHtml(t("holeHeader"))}</th><th>${escapeHtml(t("timeHeader"))}</th>`;
    players.forEach((player) => {
        html += `<th>${escapeHtml(player.player_name)}</th>`;
    });
    html += "</tr></thead><tbody>";

    for (let holeIndex = 0; holeIndex < round.total_holes; holeIndex += 1) {
        const duration = holeDurations[holeIndex];
        const durationLabel = typeof duration === "number" ? formatDuration(duration) : "-";
        html += `<tr><td>${holeIndex + 1}</td><td>${escapeHtml(durationLabel)}</td>`;
        players.forEach((player) => {
            const strokes = Number(player.strokes?.[holeIndex] ?? 0);
            html += `<td><input class="score-input" type="number" min="0" step="1" data-player-id="${player.id}" data-hole-index="${holeIndex}" value="${strokes}"></td>`;
        });
        html += "</tr>";
    }

    html += "</tbody></table>";
    return html;
}

async function saveRoundEdits(roundId, detailsWrapElement) {
    const detailRound = state.detailRounds[roundId];
    if (!detailRound) {
        return;
    }

    const totalHoles = Number(detailRound.total_holes ?? 0);
    const players = detailRound.players || [];
    const playerMap = new Map();
    players.forEach((player) => {
        playerMap.set(player.id, Array(totalHoles).fill(0));
    });

    const inputs = Array.from(detailsWrapElement.querySelectorAll(".score-input"));
    for (const input of inputs) {
        const playerId = Number(input.getAttribute("data-player-id"));
        const holeIndex = Number(input.getAttribute("data-hole-index"));
        const strokes = Number(input.value);

        if (!Number.isInteger(strokes) || strokes < 0) {
            await showAppAlert(t("invalidStrokes"));
            return;
        }

        const playerStrokes = playerMap.get(playerId);
        if (!playerStrokes || holeIndex < 0 || holeIndex >= totalHoles) {
            continue;
        }
        playerStrokes[holeIndex] = strokes;
    }

    const payload = Array.from(playerMap.entries()).map(([playerId, strokes]) => ({
        player_id: playerId,
        strokes,
    }));

    try {
        const response = await postApi("update_finished_round", {
            round_id: roundId,
            players: payload,
        });
        state.detailRounds[roundId] = response.round;
        state.editingRoundId = null;
        state.expandedRoundId = roundId;
        renderRoundsList();
        await refreshRounds();
    } catch (error) {
        await showAppAlert(t("saveEditsFailed", { error: error.message }));
    }
}

async function continueRound(roundId) {
    try {
        const response = await postApi("get_round", { round_id: roundId });
        const round = response.round;
        if (round.ended_at) {
            await refreshRounds();
            return;
        }

        state.roundId = round.id;
        state.courseName = round.course_name;
        state.startedAt = round.started_at;
        state.endedAt = round.ended_at;
        state.totalHoles = round.total_holes;
        state.players = round.players || [];
        state.currentHoleIndex = getNextHoleIndexForRound(round);
        state.activePlayerId = getOwnerPlayerId() ?? state.players[0]?.id ?? null;
        state.holeDurationsSeconds = normalizeHoleDurations(round.hole_durations_seconds, state.totalHoles);
        state.holeStartedAtMs = Date.now();

        persistLocalState();
        showView("playView");
        renderRoundUi();
    } catch (error) {
        await showAppAlert(t("continueRoundFailed", { error: error.message }));
    }
}

async function finishRoundFromHistory(roundId) {
    const confirmed = await showAppConfirm(t("finishConfirm"));
    if (!confirmed) {
        return;
    }

    try {
        if (state.roundId === roundId) {
            finalizeCurrentHoleTiming();
            await saveCurrentHoleToDatabase();
        }

        await postApi("finish_round", { round_id: roundId });

        if (state.roundId === roundId) {
            clearLocalState();
            resetRoundState();
        }

        if (state.detailRounds[roundId]) {
            const refreshed = await postApi("get_round", { round_id: roundId });
            state.detailRounds[roundId] = refreshed.round;
        }

        await refreshRounds();
        await showAppAlert(t("finishSaved"));
    } catch (error) {
        await showAppAlert(t("finishFailed", { error: error.message }));
    }
}

async function deleteRound(roundId) {
    const confirmed = await showAppConfirm(t("deleteConfirm"));
    if (!confirmed) {
        return;
    }

    try {
        await postApi("delete_finished_round", { round_id: roundId });
        delete state.detailRounds[roundId];
        if (state.expandedRoundId === roundId) {
            state.expandedRoundId = null;
        }
        if (state.editingRoundId === roundId) {
            state.editingRoundId = null;
        }
        renderRoundsList();
        await refreshRounds();
    } catch (error) {
        await showAppAlert(t("deleteFailed", { error: error.message }));
    }
}

function buildRoundSummary(round) {
    const players = round.players || [];
    const totalHoles = Number(round.total_holes ?? 0);

    if (players.length === 0 || ![9, 18].includes(totalHoles)) {
        return "";
    }

    const summaryRows = totalHoles === 18
        ? [
            { label: t("summaryFront9"), start: 0, end: 9 },
            { label: t("summaryBack9"), start: 9, end: 18 },
            { label: t("summaryTotal18"), start: 0, end: 18 },
        ]
        : [
            { label: t("summaryTotal9"), start: 0, end: 9 },
        ];

    let html = `<section class="details-summary"><h4>${escapeHtml(t("summaryTitle"))}</h4><table class="details-summary-table"><thead><tr><th>${escapeHtml(t("summaryPartHeader"))}</th>`;
    players.forEach((player) => {
        html += `<th>${escapeHtml(player.player_name)}</th>`;
    });
    html += "</tr></thead><tbody>";

    summaryRows.forEach((row) => {
        html += `<tr><td>${escapeHtml(row.label)}</td>`;
        players.forEach((player) => {
            const sum = sumStrokes(player.strokes, row.start, row.end);
            html += `<td>${sum}</td>`;
        });
        html += "</tr>";
    });

    html += "</tbody></table></section>";
    return html;
}

function sumStrokes(strokes, start, end) {
    const holeStrokes = Array.isArray(strokes) ? strokes : [];
    let sum = 0;

    for (let index = start; index < end; index += 1) {
        sum += Number(holeStrokes[index] ?? 0);
    }

    return sum;
}

function getNextHoleIndexForRound(round) {
    const totalHoles = Number(round?.total_holes ?? 0);
    if (totalHoles <= 0) {
        return 0;
    }

    const players = Array.isArray(round?.players) ? round.players : [];
    const owner = players.find((player) => player.is_owner) || players[0];
    const ownerStrokes = Array.isArray(owner?.strokes) ? owner.strokes : [];
    const firstIncomplete = ownerStrokes.findIndex((stroke) => stroke === null || stroke === undefined);

    if (firstIncomplete === -1) {
        return totalHoles - 1;
    }

    return clamp(firstIncomplete, 0, totalHoles - 1);
}

function resetRoundState() {
    state.roundId = null;
    state.courseName = "";
    state.startedAt = "";
    state.endedAt = null;
    state.totalHoles = 0;
    state.currentHoleIndex = 0;
    state.activePlayerId = null;
    state.players = [];
    state.holeDurationsSeconds = [];
    state.holeStartedAtMs = null;
    setupForm.reset();
    teammatesList.textContent = "";
    updateTeammateControls();
    renderRoundUi();
}

function persistLocalState() {
    if (!state.roundId || !state.user) {
        return;
    }

    const payload = {
        userId: state.user.id,
        roundId: state.roundId,
        currentHoleIndex: state.currentHoleIndex,
        activePlayerId: state.activePlayerId,
        holeDurationsSeconds: state.holeDurationsSeconds,
        holeStartedAtMs: state.holeStartedAtMs,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function clearLocalState() {
    window.localStorage.removeItem(STORAGE_KEY);
}

function getActivePlayer() {
    return state.players.find((player) => player.id === state.activePlayerId) ?? null;
}

function getOwnerPlayerId() {
    return state.players.find((player) => player.is_owner)?.id ?? null;
}

function renderFinishRoundButton() {
    const shouldShow =
        Boolean(state.roundId) &&
        state.totalHoles > 0 &&
        state.currentHoleIndex === state.totalHoles - 1;
    finishRoundBtn.classList.toggle("hidden", !shouldShow);
}

function finalizeCurrentHoleTiming() {
    if (!state.roundId || state.currentHoleIndex < 0 || state.currentHoleIndex >= state.totalHoles) {
        return;
    }

    if (!Number.isFinite(state.holeStartedAtMs) || state.holeStartedAtMs <= 0) {
        state.holeStartedAtMs = Date.now();
        return;
    }

    const elapsedSeconds = Math.max(0, Math.round((Date.now() - state.holeStartedAtMs) / 1000));
    const existing = state.holeDurationsSeconds[state.currentHoleIndex];
    const nextValue = typeof existing === "number" ? existing + elapsedSeconds : elapsedSeconds;
    state.holeDurationsSeconds[state.currentHoleIndex] = nextValue;
}

function normalizeHoleDurations(values, totalHoles) {
    const normalized = Array(totalHoles).fill(null);
    if (!Array.isArray(values)) {
        return normalized;
    }

    for (let index = 0; index < totalHoles; index += 1) {
        const value = values[index];
        normalized[index] = typeof value === "number" && Number.isFinite(value) && value >= 0
            ? Math.round(value)
            : null;
    }

    return normalized;
}

function formatDuration(totalSeconds) {
    const seconds = Math.max(0, Math.round(Number(totalSeconds) || 0));
    const minutes = Math.floor(seconds / 60);
    const restSeconds = seconds % 60;
    return t("minutesSeconds", { m: minutes, s: restSeconds });
}

function updateTeammateControls() {
    const count = teammatesList.querySelectorAll(".teammate-row").length;
    addTeammateBtn.disabled = count >= 3;
}

function closeMenuDrawer() {
    menuDrawer.classList.add("hidden");
}

function positionMenuDrawer() {
    if (!menuDrawer || !menuToggleBtn) {
        return;
    }

    if (window.matchMedia("(max-width: 699px)").matches) {
        menuDrawer.style.top = "";
        menuDrawer.style.right = "";
        return;
    }

    const buttonRect = menuToggleBtn.getBoundingClientRect();
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const top = Math.max(8, buttonRect.bottom + 8);
    const right = Math.max(8, viewportWidth - buttonRect.right);

    menuDrawer.style.top = `${Math.round(top)}px`;
    menuDrawer.style.right = `${Math.round(right)}px`;
}

function updateScrollLock() {
    const playView = document.getElementById("playView");
    const shouldLock = Boolean(
        state.user &&
        state.roundId &&
        playView &&
        !playView.classList.contains("hidden")
    );
    document.body.classList.toggle("lock-scroll", shouldLock);
}

function getInitialLanguage() {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved && I18N[saved]) {
        return saved;
    }

    const preferred = Array.isArray(navigator.languages) && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language || "sv-SE"];

    for (const candidate of preferred) {
        const mapped = mapLanguageCode(candidate);
        if (mapped) {
            return mapped;
        }
    }

    return "sv-SE";
}

function mapLanguageCode(code) {
    if (!code) {
        return null;
    }

    const normalized = String(code).toLowerCase();
    if (normalized.startsWith("sv")) {
        return "sv-SE";
    }
    if (normalized === "en-gb" || normalized.startsWith("en-gb")) {
        return "en-GB";
    }
    if (normalized.startsWith("en-us")) {
        return "en-US";
    }
    if (normalized.startsWith("en")) {
        return "en-US";
    }

    return null;
}

function initializeFieldValidation() {
    if (registerEmailInput) {
        registerEmailInput.addEventListener("input", () => {
            validateRegisterEmail(registerEmailInput.value.trim());
        });
        registerEmailInput.addEventListener("blur", () => {
            validateRegisterEmail(registerEmailInput.value.trim());
        });
    }

    if (forgotPasswordConfirmPasswordInput && forgotPasswordNewPasswordInput) {
        forgotPasswordConfirmPasswordInput.addEventListener("input", () => {
            if (forgotPasswordConfirmPasswordInput.value === forgotPasswordNewPasswordInput.value) {
                clearInputError(forgotPasswordConfirmPasswordInput, forgotPasswordConfirmError);
            }
        });
    }

    if (forgotPasswordNewPasswordInput && forgotPasswordConfirmPasswordInput) {
        forgotPasswordNewPasswordInput.addEventListener("input", () => {
            if (forgotPasswordConfirmPasswordInput.value === forgotPasswordNewPasswordInput.value) {
                clearInputError(forgotPasswordConfirmPasswordInput, forgotPasswordConfirmError);
            }
        });
    }
}

function validateRegisterEmail(value) {
    if (value === "") {
        showInputError(registerEmailInput, registerEmailError, t("invalidEmailMessage"));
        return false;
    }

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isValid) {
        showInputError(registerEmailInput, registerEmailError, t("invalidEmailMessage"));
        return false;
    }

    clearInputError(registerEmailInput, registerEmailError);
    return true;
}

function showInputError(inputElement, errorElement, message) {
    if (errorElement) {
        errorElement.textContent = message;
    }
    if (inputElement) {
        inputElement.classList.add("input-invalid");
        inputElement.setAttribute("aria-invalid", "true");
    }
}

function clearInputError(inputElement, errorElement) {
    if (errorElement) {
        errorElement.textContent = "";
    }
    if (inputElement) {
        inputElement.classList.remove("input-invalid");
        inputElement.removeAttribute("aria-invalid");
    }
}

function isStrongPassword(password) {
    if (typeof password !== "string" || password.length < 12) {
        return false;
    }

    let matched = 0;
    matched += /[A-Z]/.test(password) ? 1 : 0;
    matched += /[a-z]/.test(password) ? 1 : 0;
    matched += /\d/.test(password) ? 1 : 0;
    matched += /[^A-Za-z0-9]/.test(password) ? 1 : 0;
    return matched >= 3;
}

async function initializeCaptcha() {
    if (registerCaptchaReloadBtn) {
        registerCaptchaReloadBtn.addEventListener("click", () => {
            void refreshCaptcha("register");
        });
    }
    if (forgotPasswordCaptchaReloadBtn) {
        forgotPasswordCaptchaReloadBtn.addEventListener("click", () => {
            void refreshCaptcha("forgot_password");
        });
    }
    if (contactCaptchaReloadBtn) {
        contactCaptchaReloadBtn.addEventListener("click", () => {
            void refreshCaptcha("contact_message");
        });
    }

    await Promise.all([
        refreshCaptcha("register"),
        refreshCaptcha("contact_message"),
    ]);
}

async function refreshCaptcha(context) {
    try {
        const response = await postApi("get_captcha", { context });
        state.captcha[context] = {
            id: response.captcha_id,
            question: response.question,
        };
        renderCaptcha(context);
    } catch (error) {
        state.captcha[context] = null;
        renderCaptcha(context);
    }
}

function renderCaptcha(context) {
    const captchaData = state.captcha[context];
    const question = captchaData?.question || "...";
    if (context === "register") {
        if (registerCaptchaQuestion) {
            registerCaptchaQuestion.textContent = question;
        }
        if (registerCaptchaAnswer) {
            registerCaptchaAnswer.value = "";
        }
        clearInputError(registerCaptchaAnswer, registerCaptchaError);
        return;
    }
    if (context === "forgot_password") {
        if (forgotPasswordCaptchaQuestion) {
            forgotPasswordCaptchaQuestion.textContent = question;
        }
        if (forgotPasswordCaptchaAnswer) {
            forgotPasswordCaptchaAnswer.value = "";
        }
        clearInputError(forgotPasswordCaptchaAnswer, forgotPasswordCaptchaError);
        return;
    }
    if (context === "contact_message") {
        if (contactCaptchaQuestion) {
            contactCaptchaQuestion.textContent = question;
        }
        if (contactCaptchaAnswer) {
            contactCaptchaAnswer.value = "";
        }
        clearInputError(contactCaptchaAnswer, contactCaptchaError);
    }
}

function t(key, params = {}) {
    const dictionary = I18N[state.language] || I18N["sv-SE"];
    let value = dictionary[key] ?? I18N["sv-SE"][key] ?? key;
    Object.entries(params).forEach(([name, data]) => {
        value = value.replaceAll(`{${name}}`, String(data));
    });
    return value;
}

function applyStaticTranslations() {
    document.documentElement.lang = state.language.startsWith("sv") ? "sv" : "en";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (key) {
            element.textContent = t(key);
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        const key = element.getAttribute("data-i18n-placeholder");
        if (key && "placeholder" in element) {
            element.placeholder = t(key);
        }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
        const key = element.getAttribute("data-i18n-aria-label");
        if (key) {
            element.setAttribute("aria-label", t(key));
        }
    });

    if (appDialogTitle) {
        appDialogTitle.textContent = t("dialogTitle");
    }
}

async function showAppAlert(message) {
    await showAppDialog(String(message), false);
}

async function showAppConfirm(message) {
    return showAppDialog(String(message), true);
}

function showAppDialog(message, isConfirm) {
    if (!appDialog || !appDialogMessage || !appDialogOkBtn || !appDialogCancelBtn) {
        return showFallbackDialog(message, isConfirm);
    }

    appDialogMessage.textContent = message;
    appDialogCancelBtn.classList.toggle("hidden", !isConfirm);
    if (appDialogTitle) {
        appDialogTitle.textContent = t("dialogTitle");
    }

    return new Promise((resolve) => {
        appDialogResolver = resolve;
        if (typeof appDialog.showModal === "function") {
            appDialog.showModal();
        } else {
            void showFallbackDialog(message, isConfirm).then(resolve);
        }
    });
}

function showFallbackDialog(message, isConfirm) {
    return new Promise((resolve) => {
        const overlay = document.createElement("div");
        overlay.className = "fallback-dialog-overlay";

        const panel = document.createElement("div");
        panel.className = "fallback-dialog-panel";

        const title = document.createElement("h2");
        title.textContent = t("dialogTitle");
        panel.appendChild(title);

        const text = document.createElement("p");
        text.textContent = String(message);
        panel.appendChild(text);

        const actions = document.createElement("div");
        actions.className = "dialog-actions";

        if (isConfirm) {
            const cancelButton = document.createElement("button");
            cancelButton.type = "button";
            cancelButton.className = "ghost-btn";
            cancelButton.textContent = t("cancel");
            cancelButton.addEventListener("click", () => {
                overlay.remove();
                resolve(false);
            });
            actions.appendChild(cancelButton);
        }

        const okButton = document.createElement("button");
        okButton.type = "button";
        okButton.className = "primary-btn";
        okButton.textContent = t("okButton");
        okButton.addEventListener("click", () => {
            overlay.remove();
            resolve(true);
        });
        actions.appendChild(okButton);

        panel.appendChild(actions);
        overlay.appendChild(panel);
        document.body.appendChild(overlay);
    });
}

function setupDonationUi() {
    if (!swishDonateLink || !donationQrBlock) {
        return;
    }

    const swishPayload = {
        version: 1,
        payee: {
            value: "0730746793",
        },
        amount: {
            value: 20,
        },
        message: {
            value: "Donation: GolfCounter",
        },
    };
    const swishUrl = `swish://payment?data=${encodeURIComponent(JSON.stringify(swishPayload))}`;
    swishDonateLink.href = swishUrl;

    const isMobile = isMobileDevice();
    swishDonateLink.classList.toggle("hidden", !isMobile);
    donationQrBlock.classList.toggle("hidden", isMobile);
}

function isMobileDevice() {
    const ua = navigator.userAgent || "";
    const uaMatch = /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(ua);
    const touchMatch = window.matchMedia("(pointer: coarse)").matches;
    return uaMatch || touchMatch;
}

function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
        return;
    }

    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
            .then((registration) => {
                registration.update();
            })
            .catch(() => {
                // Ignore registration errors to avoid blocking app usage.
            });
    });
}

async function postApi(action, payload = {}) {
    const response = await fetch("./api.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ action, ...payload }),
    });

    const json = await response.json();
    if (!response.ok || json.error) {
        throw new Error(json.error || "Okänt fel från servern.");
    }

    return json;
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function formatDateTime(value) {
    if (!value) {
        return "-";
    }
    const date = new Date(value.replace(" ", "T"));
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleString(state.language);
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#039;");
}
