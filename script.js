const STORAGE_KEYS = {
  weights: "treino_weights_v1",
  checks: "treino_checks_v1",
  history: "treino_history_v1",
  activeTab: "treino_active_tab_v1",
};

const state = {
  weights: loadJSON(STORAGE_KEYS.weights, {}),   // { "A-0": 22.5, ... }
  checks: loadJSON(STORAGE_KEYS.checks, {}),     // { "A-0": true, ... }
  history: loadJSON(STORAGE_KEYS.history, []),   // [{date, treino, done, total}]
  activeTab: localStorage.getItem(STORAGE_KEYS.activeTab) || "A",
};

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function exId(tabKey, idx) {
  return `${tabKey}-${idx}`;
}

function getWeight(tabKey, idx, fallback) {
  const id = exId(tabKey, idx);
  return Object.prototype.hasOwnProperty.call(state.weights, id) ? state.weights[id] : fallback;
}

function renderTabs() {
  const tabs = document.getElementById("tabs");
  tabs.innerHTML = "";
  Object.keys(WORKOUTS).forEach((key) => {
    const btn = document.createElement("button");
    btn.className = "tab-plate" + (key === state.activeTab ? " active" : "");
    btn.textContent = key;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", key === state.activeTab ? "true" : "false");
    btn.addEventListener("click", () => {
      state.activeTab = key;
      localStorage.setItem(STORAGE_KEYS.activeTab, key);
      renderTabs();
      renderWorkout();
    });
    tabs.appendChild(btn);
  });
}

function renderStreak() {
  const el = document.getElementById("streak");
  const count = state.history.length;
  el.innerHTML = `<span class="tick">${count}</span> sessões registradas`;
}

function renderWorkout() {
  const view = document.getElementById("workout-view");
  const day = WORKOUTS[state.activeTab];
  view.innerHTML = "";

  const head = document.createElement("div");
  head.className = "workout-head";
  head.innerHTML = `
    <div>
      <h1>${day.label}</h1>
      <div class="foco">${day.foco}</div>
    </div>
    <div class="progress-wrap">
      <div class="progress-track"><div class="progress-fill" id="progress-fill"></div></div>
      <div class="progress-label" id="progress-label"></div>
    </div>
  `;
  view.appendChild(head);

  const list = document.createElement("ul");
  list.className = "exercise-list";

  day.exercicios.forEach((ex, idx) => {
    const id = exId(state.activeTab, idx);
    const isDone = !!state.checks[id];
    const weight = getWeight(state.activeTab, idx, ex.peso);
    const isTodo = ex.series === null;

    const li = document.createElement("li");
    li.className = "exercise" + (isDone ? " done" : "");

    li.innerHTML = `
      <input type="checkbox" class="check" ${isDone ? "checked" : ""} aria-label="Marcar ${ex.nome} como feito" />
      <div class="ex-main">
        <div class="ex-name ${isTodo ? "todo" : ""}">${ex.nome}</div>
        ${ex.obs ? `<div class="ex-obs">${ex.obs}</div>` : ""}
      </div>
      <div class="ex-stats">
        <div class="stat"><b>${ex.series ?? "—"}</b><span>séries</span></div>
        <div class="stat"><b>${ex.reps || "—"}</b><span>reps</span></div>
        <div class="stat">
          <input class="weight-input" type="number" step="0.5" min="0"
                 value="${weight ?? ""}" placeholder="kg" aria-label="Peso de ${ex.nome} em kg" />
          <span>kg</span>
        </div>
      </div>
    `;

    const checkbox = li.querySelector(".check");
    checkbox.addEventListener("change", () => {
      state.checks[id] = checkbox.checked;
      save(STORAGE_KEYS.checks, state.checks);
      li.classList.toggle("done", checkbox.checked);
      updateProgress();
    });

    const weightInput = li.querySelector(".weight-input");
    weightInput.addEventListener("change", () => {
      const val = weightInput.value === "" ? null : parseFloat(weightInput.value);
      state.weights[id] = val;
      save(STORAGE_KEYS.weights, state.weights);
    });

    list.appendChild(li);
  });

  view.appendChild(list);

  const actions = document.createElement("div");
  actions.className = "day-actions";
  actions.innerHTML = `
    <button class="btn btn-primary" id="save-session">salvar sessão de hoje</button>
    <button class="ghost-btn" id="reset-checks">desmarcar tudo</button>
  `;
  view.appendChild(actions);

  document.getElementById("save-session").addEventListener("click", saveSession);
  document.getElementById("reset-checks").addEventListener("click", resetChecks);

  updateProgress();
}

function updateProgress() {
  const day = WORKOUTS[state.activeTab];
  const total = day.exercicios.length;
  const done = day.exercicios.filter((_, idx) => state.checks[exId(state.activeTab, idx)]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const fill = document.getElementById("progress-fill");
  const label = document.getElementById("progress-label");
  if (fill) fill.style.width = pct + "%";
  if (label) label.textContent = `${done}/${total} feitos`;
}

function resetChecks() {
  const day = WORKOUTS[state.activeTab];
  day.exercicios.forEach((_, idx) => {
    delete state.checks[exId(state.activeTab, idx)];
  });
  save(STORAGE_KEYS.checks, state.checks);
  renderWorkout();
}

function saveSession() {
  const day = WORKOUTS[state.activeTab];
  const total = day.exercicios.length;
  const done = day.exercicios.filter((_, idx) => state.checks[exId(state.activeTab, idx)]).length;

  const entry = {
    date: new Date().toLocaleDateString("pt-BR"),
    treino: state.activeTab,
    done,
    total,
  };
  state.history.unshift(entry);
  save(STORAGE_KEYS.history, state.history);
  renderStreak();
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById("history-list");
  list.innerHTML = "";
  if (state.history.length === 0) {
    list.innerHTML = `<li class="history-empty">Nenhuma sessão registrada ainda. Marque os exercícios e clique em "salvar sessão de hoje".</li>`;
    return;
  }
  state.history.forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = `<span><b>Treino ${entry.treino}</b> — ${entry.date}</span><span>${entry.done}/${entry.total}</span>`;
    list.appendChild(li);
  });
}

document.getElementById("clear-history").addEventListener("click", () => {
  if (confirm("Apagar todo o histórico de sessões?")) {
    state.history = [];
    save(STORAGE_KEYS.history, state.history);
    renderStreak();
    renderHistory();
  }
});

renderTabs();
renderWorkout();
renderStreak();
renderHistory();
