const authSection = document.getElementById("authSection");
const appSection = document.getElementById("appSection");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const accountForm = document.getElementById("accountForm");
const accountEmail = document.getElementById("accountEmail");
const logoutBtn = document.getElementById("logoutBtn");
const menuButtons = Array.from(document.querySelectorAll(".menu-btn"));
const views = Array.from(document.querySelectorAll(".view"));
const infoDialog = document.getElementById("infoDialog");
const infoOpenBtn = document.getElementById("infoOpenBtn");
const infoCloseBtn = document.getElementById("infoCloseBtn");

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

const state = {
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
};

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
        window.alert(`Kunde inte logga in: ${error.message}`);
    }
});

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const response = await postApi("register", {
            name: document.getElementById("registerName").value.trim(),
            email: document.getElementById("registerEmail").value.trim(),
            golf_id: document.getElementById("registerGolfId").value.trim(),
            password: document.getElementById("registerPassword").value,
        });
        setUser(response.user);
        registerForm.reset();
        await restoreRoundFromLocalStorage();
        await refreshRounds();
    } catch (error) {
        window.alert(`Kunde inte registrera konto: ${error.message}`);
    }
});

accountForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const response = await postApi("update_account", {
            name: document.getElementById("accountName").value.trim(),
            golf_id: document.getElementById("accountGolfId").value.trim(),
            current_password: document.getElementById("accountCurrentPassword").value,
            new_password: document.getElementById("accountNewPassword").value,
        });
        setUser(response.user);
        document.getElementById("accountCurrentPassword").value = "";
        document.getElementById("accountNewPassword").value = "";
        window.alert("Konto uppdaterat.");
    } catch (error) {
        window.alert(`Kunde inte spara konto: ${error.message}`);
    }
});

logoutBtn.addEventListener("click", async () => {
    try {
        await postApi("logout");
        clearLocalState();
        resetRoundState();
        setUser(null);
    } catch (error) {
        window.alert(`Kunde inte logga ut: ${error.message}`);
    }
});

menuButtons.forEach((button) => {
    button.addEventListener("click", async () => {
        showView(button.dataset.view);
        if (button.dataset.view === "historyView") {
            await refreshRounds();
        }
    });
});

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

    const confirmed = window.confirm("Vill du avsluta ronden nu?");
    if (!confirmed) {
        return;
    }

    try {
        finalizeCurrentHoleTiming();
        await saveCurrentHoleToDatabase();
        persistLocalState();
        await postApi("finish_round", { round_id: state.roundId });
        clearLocalState();
        window.alert("Ronden är avslutad och sparad.");
        resetRoundState();
        await refreshRounds();
        showView("historyView");
    } catch (error) {
        window.alert(`Kunde inte avsluta ronden: ${error.message}`);
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

    if (!user) {
        authSection.classList.remove("hidden");
        appSection.classList.add("hidden");
        return;
    }

    authSection.classList.add("hidden");
    appSection.classList.remove("hidden");
    document.getElementById("accountName").value = user.name || "";
    document.getElementById("accountGolfId").value = user.golf_id || "";
    accountEmail.textContent = `Inloggad som ${user.email}`;
}

function showView(viewId) {
    views.forEach((view) => {
        view.classList.toggle("hidden", view.id !== viewId);
    });

    menuButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.view === viewId);
    });
}

function addTeammateRow(player = null) {
    const currentRows = teammatesList.querySelectorAll(".teammate-row").length;
    if (currentRows >= 3) {
        window.alert("Max 4 spelare per rond (du + 3 medspelare).");
        return;
    }

    const row = teammateTemplate.content.firstElementChild.cloneNode(true);
    const nameInput = row.querySelector(".teammate-name");
    const golfInput = row.querySelector(".teammate-golfid");
    const removeButton = row.querySelector(".remove-teammate-btn");

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
    const teammates = Array.from(teammatesList.querySelectorAll(".teammate-row"))
        .map((row) => ({
            player_name: row.querySelector(".teammate-name").value.trim(),
            golf_id: row.querySelector(".teammate-golfid").value.trim(),
        }))
        .filter((player) => player.player_name !== "");

    if (teammates.length > 3) {
        window.alert("Max 4 spelare per rond (du + 3 medspelare).");
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
        window.alert(`Kunde inte starta rond: ${error.message}`);
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
        window.alert(`Kunde inte byta hål: ${error.message}`);
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
        return;
    }

    noRoundNotice.classList.add("hidden");
    setupSection.classList.add("hidden");
    roundSection.classList.remove("hidden");

    roundMeta.textContent = `${state.courseName} - ${formatDateTime(state.startedAt)}`;
    currentHoleTitle.textContent = `Hål ${state.currentHoleIndex + 1}`;
    renderPlayerSelect();
    renderCurrentHoleCounter();
    renderHolesList();
    renderFinishRoundButton();
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
            ? `${player.player_name} (du)`
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

        label.textContent = `Hål ${holeNumber}`;
        strokesLabel.textContent = `${strokesValue} slag${durationLabel}`;
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
        roundsList.innerHTML = `<p class="muted">Kunde inte läsa rundor: ${escapeHtml(error.message)}</p>`;
    }
}

function renderRoundsList() {
    roundsList.textContent = "";
    if (state.rounds.length === 0) {
        roundsList.innerHTML = "<p class=\"muted\">Inga rundor sparade ännu.</p>";
        return;
    }

    state.rounds.forEach((round) => {
        const item = document.createElement("article");
        item.className = "round-item";
        const endedLabel = round.ended_at ? `Avslutad: ${formatDateTime(round.ended_at)}` : "Pågår";
        item.innerHTML = `
            <div>
                <strong>${escapeHtml(round.course_name)}</strong>
                <div class="muted">${round.total_holes} hål • ${round.players_count} spelare</div>
                <div class="muted">Start: ${escapeHtml(formatDateTime(round.started_at))}</div>
                <div class="muted">${escapeHtml(endedLabel)}</div>
            </div>
        `;

        const actions = document.createElement("div");
        actions.className = "round-details-actions";

        const detailsButton = document.createElement("button");
        detailsButton.className = "ghost-btn";
        detailsButton.type = "button";
        detailsButton.innerHTML = state.expandedRoundId === round.id
            ? "<i class=\"fa-solid fa-eye-slash\"></i> Dölj detaljer"
            : "<i class=\"fa-solid fa-eye\"></i> Visa detaljer";
        detailsButton.addEventListener("click", () => {
            void toggleRoundDetails(round.id);
        });
        actions.appendChild(detailsButton);

        if (round.ended_at) {
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "danger-btn";
            deleteButton.innerHTML = "<i class=\"fa-solid fa-trash\"></i> Ta bort";
            deleteButton.addEventListener("click", () => {
                void deleteRound(round.id);
            });
            actions.appendChild(deleteButton);
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
            window.alert(`Kunde inte visa detaljer: ${error.message}`);
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
        return "<p class=\"muted\">Laddar detaljer...</p>";
    }

    const actions = [];
    if (round.ended_at) {
        if (state.editingRoundId === roundId) {
            actions.push("<button type=\"button\" class=\"primary-btn\" data-inline-action=\"save\"><i class=\"fa-solid fa-floppy-disk\"></i> Spara ändringar</button>");
            actions.push("<button type=\"button\" class=\"ghost-btn\" data-inline-action=\"cancel\"><i class=\"fa-solid fa-xmark\"></i> Avbryt</button>");
        } else {
            actions.push("<button type=\"button\" class=\"ghost-btn\" data-inline-action=\"edit\"><i class=\"fa-solid fa-pen\"></i> Redigera</button>");
        }
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
    let html = "<table class=\"details-table\"><thead><tr><th>Hål</th><th>Tid</th>";
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
    let html = "<table class=\"details-table\"><thead><tr><th>Hål</th><th>Tid</th>";
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
            window.alert("Alla slag måste vara heltal 0 eller större.");
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
        window.alert(`Kunde inte spara ändringar: ${error.message}`);
    }
}

async function deleteRound(roundId) {
    const confirmed = window.confirm("Vill du ta bort den här avslutade ronden?");
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
        window.alert(`Kunde inte ta bort ronden: ${error.message}`);
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
            { label: "Första 9", start: 0, end: 9 },
            { label: "Sista 9", start: 9, end: 18 },
            { label: "Totalt 18", start: 0, end: 18 },
        ]
        : [
            { label: "Totalt 9", start: 0, end: 9 },
        ];

    let html = "<section class=\"details-summary\"><h4>Summering</h4><table class=\"details-summary-table\"><thead><tr><th>Del</th>";
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
    return `${minutes}m ${restSeconds}s`;
}

function updateTeammateControls() {
    const count = teammatesList.querySelectorAll(".teammate-row").length;
    addTeammateBtn.disabled = count >= 3;
}

function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
        return;
    }

    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js").catch(() => {
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
    return date.toLocaleString("sv-SE");
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#039;");
}
