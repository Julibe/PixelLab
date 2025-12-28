/* --- CONFIGURATION & STATE --- */
let baseConfig = { rows: 9, cols: 9, mines: 10 };
let config = { rows: 9, cols: 9, mines: 10 };

let state = {
  grid: [],
  gameOver: false,
  firstClick: true,
  hp: 3,
  maxHp: 3,
  level: 1,
  score: 0,
  flags: 10,
  items: { scan: 1, heal: 0 },
  startTime: 0,
  timerInterval: null,
  chaosInterval: null,
  bombTimers: []
};

const dom = {
  setup: document.getElementById("setup-screen"),
  inpRows: document.getElementById("set-rows"),
  inpCols: document.getElementById("set-cols"),
  inpMines: document.getElementById("set-mines"),
  grid: document.getElementById("grid"),
  flags: document.getElementById("flag-cnt"),
  timer: document.getElementById("timer-disp"),
  face: document.getElementById("face-btn"),
  hp: document.getElementById("hp-val"),
  lvl: document.getElementById("lvl-val"),
  score: document.getElementById("score-val"),
  scanQty: document.getElementById("scan-qty"),
  healQty: document.getElementById("heal-qty"),
  overlay: document.getElementById("overlay"),
  ovTitle: document.getElementById("ov-title"),
  ovMsg: document.getElementById("ov-msg")
};

/* --- SETUP & INIT --- */
function submitSetup() {
  let r = parseInt(dom.inpRows.value) || 9;
  let c = parseInt(dom.inpCols.value) || 9;
  let m = parseInt(dom.inpMines.value) || 10;

  r = Math.max(5, Math.min(30, r));
  c = Math.max(5, Math.min(30, c));
  m = Math.max(1, Math.min(m, Math.floor(r * c * 0.8)));

  baseConfig = { rows: r, cols: c, mines: m };
  dom.setup.style.display = "none";
  restartGame();
}

function restartGame() {
  state.hp = 3;
  state.level = 1;
  state.score = 0;
  state.items = { scan: 1, heal: 0 };
  dom.overlay.style.display = "none";
  startLevel();
}

function startLevel() {
  state.grid = [];
  state.gameOver = false;
  state.firstClick = true;

  state.bombTimers.forEach(clearInterval);
  state.bombTimers = [];
  clearInterval(state.chaosInterval);
  clearInterval(state.timerInterval);

  const sizeMod = Math.floor((state.level - 1) / 2);
  config.rows = baseConfig.rows + sizeMod;
  config.cols = baseConfig.cols + sizeMod;

  const userDensity = baseConfig.mines / (baseConfig.rows * baseConfig.cols);
  const extraMines = (state.level - 1) * 2;
  config.mines =
    Math.floor(config.rows * config.cols * userDensity) + extraMines;
  state.flags = config.mines;

  renderGrid();
  updateHUD();
  dom.face.innerText = "🙂";
  dom.face.style.backgroundColor = "var(--c-yellow)";
  dom.overlay.style.display = "none";

  state.startTime = Date.now();
  state.timerInterval = setInterval(updateTimer, 1000);
  state.chaosInterval = setInterval(chaosEvent, 5000);
}

function renderGrid() {
  dom.grid.style.gridTemplateColumns = `repeat(${config.cols}, 40px)`;
  dom.grid.innerHTML = "";

  for (let r = 0; r < config.rows; r++) {
    let row = [];
    for (let c = 0; c < config.cols; c++) {
      const cell = {
        r,
        c,
        isMine: false,
        revealed: false,
        flagged: false,
        neighbors: 0,
        isTrap: false,
        trapHp: 0,
        isBomb: false,
        bombTime: 0,
        el: document.createElement("div")
      };

      cell.el.className = "tile";
      cell.el.onmouseup = (e) => handleInput(e, cell);
      cell.el.oncontextmenu = (e) => e.preventDefault();

      dom.grid.appendChild(cell.el);
      row.push(cell);
    }
    state.grid.push(row);
  }

  let traps = Math.floor(state.level / 2) + 2;
  while (traps > 0) {
    let r = Math.floor(Math.random() * config.rows);
    let c = Math.floor(Math.random() * config.cols);
    if (!state.grid[r][c].isTrap) {
      state.grid[r][c].isTrap = true;
      state.grid[r][c].trapHp = 3;
      state.grid[r][c].el.classList.add("trap");
      traps--;
    }
  }
}

/* --- GAMEPLAY --- */
function handleInput(e, cell) {
  if (state.gameOver) return;

  if (e.button === 2) {
    toggleFlag(cell);
  } else if (e.button === 0) {
    if (cell.isTrap) {
      hitTrap(cell);
    } else {
      clickTile(cell);
    }
  }
}

function clickTile(cell) {
  if (cell.flagged || cell.revealed) return;

  if (state.firstClick) {
    state.firstClick = false;
    generateMines(cell);
  }

  if (cell.isMine) {
    triggerMine(cell);
  } else {
    reveal(cell);
  }
}

function generateMines(safeCell) {
  let placed = 0;
  while (placed < config.mines) {
    let r = Math.floor(Math.random() * config.rows);
    let c = Math.floor(Math.random() * config.cols);
    let cell = state.grid[r][c];

    if (
      !cell.isMine &&
      !cell.isTrap &&
      !(Math.abs(r - safeCell.r) <= 1 && Math.abs(c - safeCell.c) <= 1)
    ) {
      cell.isMine = true;
      placed++;
    }
  }

  for (let r = 0; r < config.rows; r++) {
    for (let c = 0; c < config.cols; c++) {
      if (!state.grid[r][c].isMine) {
        let n = 0;
        getNeighbors(r, c).forEach((nb) => {
          if (nb.isMine) n++;
        });
        state.grid[r][c].neighbors = n;
      }
    }
  }
}

function reveal(cell) {
  if (cell.revealed || cell.flagged) return;

  cell.revealed = true;
  cell.el.classList.add("revealed");
  cell.el.classList.add(`val-${cell.neighbors}`);

  if (cell.neighbors > 0) {
    cell.el.innerText = cell.neighbors;
  } else {
    getNeighbors(cell.r, cell.c).forEach((n) => {
      if (!n.revealed && !n.isTrap) reveal(n);
    });
  }

  if (Math.random() < 0.02) {
    if (Math.random() > 0.5) {
      state.items.scan++;
      showFloat(cell, "+📡");
    } else {
      state.items.heal++;
      showFloat(cell, "+💊");
    }
    updateHUD();
  }

  checkLevelClear();
}

function toggleFlag(cell) {
  if (cell.revealed) return;
  cell.flagged = !cell.flagged;
  cell.el.classList.toggle("flagged");
  state.flags += cell.flagged ? -1 : 1;

  if (cell.isBomb && cell.flagged && cell.isMine) {
    defuseBomb(cell);
  }
  updateHUD();
}

function hitTrap(cell) {
  cell.trapHp--;
  cell.el.style.transform = "scale(0.9)";
  setTimeout(() => (cell.el.style.transform = "scale(1)"), 100);

  if (cell.trapHp <= 0) {
    cell.isTrap = false;
    cell.el.classList.remove("trap");
    if (!cell.isMine) reveal(cell);
  }
}

function triggerMine(cell) {
  cell.el.classList.add("mine");
  state.hp--;
  dom.face.innerText = "😣";
  dom.face.style.backgroundColor = "var(--c-magenta)";

  document.body.style.transform = "translate(5px, 0)";
  setTimeout(() => (document.body.style.transform = "none"), 50);

  setTimeout(() => {
    if (!state.gameOver) {
      dom.face.innerText = "🙂";
      dom.face.style.backgroundColor = "var(--c-yellow)";
    }
  }, 600);

  updateHUD();
  if (state.hp <= 0) gameOver();
}

function chaosEvent() {
  if (state.gameOver) return;
  if (Math.random() < 0.3) {
    let hiddenMines = [];
    state.grid.forEach((row) =>
      row.forEach((c) => {
        if (c.isMine && !c.revealed && !c.flagged && !c.isBomb)
          hiddenMines.push(c);
      })
    );

    if (hiddenMines.length > 0) {
      let target = hiddenMines[Math.floor(Math.random() * hiddenMines.length)];
      activateBomb(target);
    }
  }
}

function activateBomb(cell) {
  cell.isBomb = true;
  cell.bombTime = 10;
  cell.el.classList.add("time-bomb");
  cell.el.setAttribute("data-timer", "10s");

  let id = setInterval(() => {
    if (state.gameOver || !cell.isBomb) {
      clearInterval(id);
      return;
    }

    cell.bombTime--;
    cell.el.setAttribute("data-timer", cell.bombTime + "s");

    if (cell.bombTime <= 0) {
      clearInterval(id);
      if (!cell.flagged) {
        cell.el.classList.remove("time-bomb");
        triggerMine(cell);
        cell.revealed = true;
        cell.el.classList.add("mine", "revealed");
      }
    }
  }, 1000);
  state.bombTimers.push(id);
}

function defuseBomb(cell) {
  cell.isBomb = false;
  cell.el.classList.remove("time-bomb");
  state.score += 50;
  showFloat(cell, "+50");
  updateHUD();
}

function useItem(type) {
  if (state.items[type] <= 0) return;

  if (type === "heal") {
    if (state.hp < state.maxHp) {
      state.items.heal--;
      state.hp++;
      updateHUD();
    }
  } else if (type === "scan") {
    state.items.scan--;
    let r = Math.floor(Math.random() * (config.rows - 2)) + 1;
    let c = Math.floor(Math.random() * (config.cols - 2)) + 1;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let cell = state.grid[r + i][c + j];
        if (!cell.isMine && !cell.revealed) reveal(cell);
        if (cell.isMine && !cell.flagged) toggleFlag(cell);
      }
    }
    updateHUD();
  }
}

function getNeighbors(r, c) {
  let n = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i == 0 && j == 0) continue;
      if (
        r + i >= 0 &&
        r + i < config.rows &&
        c + j >= 0 &&
        c + j < config.cols
      )
        n.push(state.grid[r + i][c + j]);
    }
  }
  return n;
}

function updateHUD() {
  dom.flags.innerText = state.flags.toString().padStart(3, "0");
  dom.hp.innerText = state.hp + "/" + state.maxHp;
  dom.lvl.innerText = state.level;
  dom.score.innerText = state.score;
  dom.scanQty.innerText = state.items.scan;
  dom.healQty.innerText = state.items.heal;

  document.getElementById("btn-heal").disabled =
    state.items.heal === 0 || state.hp === state.maxHp;
  document.getElementById("btn-scan").disabled = state.items.scan === 0;
}

function updateTimer() {
  let delta = Math.floor((Date.now() - state.startTime) / 1000);
  let m = Math.floor(delta / 60)
    .toString()
    .padStart(2, "0");
  let s = (delta % 60).toString().padStart(2, "0");
  dom.timer.innerText = `${m}:${s}`;
}

function showFloat(cell, text) {
  let el = document.createElement("div");
  el.innerText = text;
  el.style.position = "absolute";
  el.style.color = "var(--c-cyan)";
  el.style.fontWeight = "bold";
  el.style.fontSize = "20px";
  el.style.textShadow = "1px 1px 0 white";
  el.style.pointerEvents = "none";
  el.style.zIndex = 100;

  let rect = cell.el.getBoundingClientRect();
  el.style.left = rect.left + "px";
  el.style.top = rect.top + "px";
  document.body.appendChild(el);

  let y = 0;
  let id = setInterval(() => {
    y -= 2;
    el.style.transform = `translateY(${y}px)`;
    el.style.opacity = 1 + y / 30;
    if (y < -30) {
      clearInterval(id);
      el.remove();
    }
  }, 16);
}

function checkLevelClear() {
  let safe = 0;
  state.grid.forEach((r) =>
    r.forEach((c) => {
      if (!c.isMine && !c.revealed) safe++;
    })
  );

  if (safe === 0) {
    state.score += state.level * 100;
    state.level++;
    dom.ovTitle.innerText = "LEVEL CLEAR!";
    dom.ovTitle.style.color = "var(--c-cyan)";
    dom.ovMsg.innerText = "Moving to next sector...";
    dom.overlay.style.display = "flex";
    setTimeout(startLevel, 1500);
  }
}

function gameOver() {
  state.gameOver = true;
  dom.face.innerText = "😵";
  dom.face.style.backgroundColor = "var(--c-magenta)";

  state.grid.forEach((r) =>
    r.forEach((c) => {
      if (c.isMine) {
        c.el.classList.add("mine");
        c.el.classList.add("revealed");
      }
    })
  );

  clearInterval(state.timerInterval);
  clearInterval(state.chaosInterval);
  state.bombTimers.forEach(clearInterval);

  dom.ovTitle.innerText = "GAME OVER";
  dom.ovTitle.style.color = "var(--c-magenta)";
  dom.ovMsg.innerText = `Level: ${state.level} | Score: ${state.score}`;
  dom.overlay.style.display = "flex";
}
