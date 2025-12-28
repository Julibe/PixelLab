const TILE_SIZE = 50;
const COLS = 17;
const ROWS = 13;
const WIDTH = COLS * TILE_SIZE;
const HEIGHT = ROWS * TILE_SIZE;
const C_BG = "#f0eee4";
const C_WALL_HARD = "#2c2c2c";
const C_WALL_SOFT = "#3d3d3d";
const C_ACCENT = "#ff4422";
const C_PLAYER = "#111";
const C_BOT = "#551111";
const C_GHOST = "#ff4422";
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = WIDTH;
canvas.height = HEIGHT;
let gameRunning = false;
let frame = 0;
let floorLevel = 1;
let map = [];
let entities = [];
let particles = [];
let shakeIntensity = 0;
const keys = { w: false, a: false, s: false, d: false, space: false, e: false };
class Entity {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.w = 34;
    this.h = 34;
    this.type = type;
    this.vx = 0;
    this.vy = 0;
    this.speed = 3;
    this.dead = false;
    this.color = "#000";
  }
  update() {
    let nextX = this.x + this.vx;
    if (!checkCollision(nextX, this.y, this.w, this.h)) this.x = nextX;
    let nextY = this.y + this.vy;
    if (!checkCollision(this.x, nextY, this.w, this.h)) this.y = nextY;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  getCenter() {
    return { x: this.x + this.w / 2, y: this.y + this.h / 2 };
  }
}
class Player extends Entity {
  constructor(x, y) {
    super(x, y, "player");
    this.maxBombs = 1;
    this.bombRange = 2;
    this.activeBombs = 0;
    this.dashCooldown = 0;
    this.dashing = false;
    this.dashTime = 0;
    this.invincible = 0;
    this.prevBombInput = false;
    this.prevDashInput = false;
  }
  update() {
    if (this.dead) return;
    this.vx = 0;
    this.vy = 0;
    let gp = navigator.getGamepads ? navigator.getGamepads()[0] : null;
    let dz = 0.3;
    let iUp = keys.w || (gp && (gp.axes[1] < -dz || gp.buttons[12].pressed));
    let iDown = keys.s || (gp && (gp.axes[1] > dz || gp.buttons[13].pressed));
    let iLeft = keys.a || (gp && (gp.axes[0] < -dz || gp.buttons[14].pressed));
    let iRight = keys.d || (gp && (gp.axes[0] > dz || gp.buttons[15].pressed));
    let iBomb =
      keys.space || (gp && (gp.buttons[0].pressed || gp.buttons[3].pressed));
    let iDash =
      keys.e || (gp && (gp.buttons[1].pressed || gp.buttons[2].pressed));
    let spd = this.speed;
    if (this.dashing) {
      spd = 12;
      this.dashTime--;
      createParticle(this.x + this.w / 2, this.y + this.h / 2, C_ACCENT, 2);
      if (this.dashTime <= 0) this.dashing = false;
    } else {
      if (this.dashCooldown > 0) this.dashCooldown--;
    }
    if (iUp) this.vy = -spd;
    if (iDown) this.vy = spd;
    if (iLeft) this.vx = -spd;
    if (iRight) this.vx = spd;
    if (
      iDash &&
      !this.prevDashInput &&
      this.dashCooldown <= 0 &&
      (this.vx !== 0 || this.vy !== 0)
    ) {
      this.dashing = true;
      this.dashTime = 10;
      this.dashCooldown = 120;
      screenShake(5);
    }
    super.update();
    if (iBomb && !this.prevBombInput && !this.dashing) {
      if (this.activeBombs < this.maxBombs) {
        if (placeBomb(this)) {
          this.activeBombs++;
        }
      }
    }
    this.prevBombInput = iBomb;
    this.prevDashInput = iDash;
    checkItemPickup(this);
    const dashText =
      this.dashCooldown > 0
        ? `Wait ${Math.ceil(this.dashCooldown / 60)}`
        : "READY";
    document.getElementById(
      "stats"
    ).innerText = `BOMBS: ${this.maxBombs} | RANGE: ${this.bombRange} | DASH: ${dashText}`;
  }
  draw() {
    if (this.dead) return;
    if (this.dashing) {
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = C_ACCENT;
      ctx.fillRect(this.x - this.vx, this.y - this.vy, this.w, this.h);
      ctx.globalAlpha = 1.0;
    }
    ctx.fillStyle = C_PLAYER;
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.w, this.h, 8);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x + 8, this.y + 10, 6, 6);
    ctx.fillRect(this.x + 20, this.y + 10, 6, 6);
  }
  die() {
    if (this.invincible > 0 || this.dead) return;
    this.dead = true;
    createExplosionEffect(
      this.x + this.w / 2,
      this.y + this.h / 2,
      20,
      C_PLAYER
    );
    setTimeout(gameOver, 1000);
  }
}
class Bot extends Entity {
  constructor(x, y) {
    super(x, y, "bot");
    this.color = C_BOT;
    this.speed = 2.5;
    this.moveTimer = 0;
    this.bombCooldown = 0;
  }
  update() {
    if (this.dead) return;
    const p = entities.find((e) => e.type === "player");
    if (!p || p.dead) return;
    const center = this.getCenter();
    const tileX = Math.floor(center.x / TILE_SIZE);
    const tileY = Math.floor(center.y / TILE_SIZE);
    if (isDanger(tileX, tileY)) {
      this.speed = 4;
    } else {
      this.speed = 2.5;
      if (this.moveTimer-- <= 0) {
        this.moveTimer = 15;
        const dx = p.x - this.x;
        const dy = p.y - this.y;
        if (Math.abs(dx) > Math.abs(dy)) {
          this.vx = dx > 0 ? this.speed : -this.speed;
          this.vy = 0;
        } else {
          this.vx = 0;
          this.vy = dy > 0 ? this.speed : -this.speed;
        }
        const dist = Math.hypot(dx, dy);
        if (dist < TILE_SIZE * 3 && this.bombCooldown <= 0) {
          placeBomb(this);
          this.bombCooldown = 150;
          this.vx = -this.vx;
          this.vy = -this.vy;
        }
      }
    }
    if (this.bombCooldown > 0) this.bombCooldown--;
    let nextX = this.x + this.vx;
    if (checkCollision(nextX, this.y, this.w, this.h)) {
      this.vx = 0;
      this.vy = Math.random() > 0.5 ? this.speed : -this.speed;
    } else {
      this.x = nextX;
    }
    let nextY = this.y + this.vy;
    if (checkCollision(this.x, nextY, this.w, this.h)) {
      this.vy = 0;
      this.vx = Math.random() > 0.5 ? this.speed : -this.speed;
    } else {
      this.y = nextY;
    }
  }
  draw() {
    if (this.dead) return;
    ctx.fillStyle = "#444";
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.w, this.h, 5);
    ctx.fill();
    ctx.fillStyle = "red";
    ctx.fillRect(this.x + 5, this.y + 12, 24, 6);
  }
}
class Ghost extends Entity {
  constructor(x, y) {
    super(x, y, "ghost");
    this.color = C_GHOST;
    this.speed = 1.5 + floorLevel * 0.2;
    this.dir = Math.floor(Math.random() * 4);
    this.changeDirTimer = 0;
  }
  update() {
    if (this.dead) return;
    if (this.changeDirTimer-- <= 0) {
      this.dir = Math.floor(Math.random() * 4);
      this.changeDirTimer = 60;
    }
    this.vx = 0;
    this.vy = 0;
    if (this.dir === 0) this.vy = -this.speed;
    if (this.dir === 1) this.vx = this.speed;
    if (this.dir === 2) this.vy = this.speed;
    if (this.dir === 3) this.vx = -this.speed;
    let nextX = this.x + this.vx;
    let nextY = this.y + this.vy;
    if (checkCollision(nextX, this.y, this.w, this.h)) {
      this.x = Math.round(this.x);
      this.dir = Math.floor(Math.random() * 4);
    } else {
      this.x = nextX;
    }
    if (checkCollision(this.x, nextY, this.w, this.h)) {
      this.y = Math.round(this.y);
      this.dir = Math.floor(Math.random() * 4);
    } else {
      this.y = nextY;
    }
    const p = entities.find((e) => e.type === "player");
    if (
      p &&
      !p.dead &&
      rectIntersect(this.x, this.y, this.w, this.h, p.x, p.y, p.w, p.h)
    ) {
      p.die();
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.h);
    ctx.lineTo(this.x, this.y + 10);
    ctx.arc(this.x + this.w / 2, this.y + 10, this.w / 2, Math.PI, 0);
    ctx.lineTo(this.x + this.w, this.y + this.h);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x + 8, this.y + 12, 8, 8);
    ctx.fillRect(this.x + 20, this.y + 12, 8, 8);
    ctx.fillStyle = "#000";
    ctx.fillRect(this.x + 10, this.y + 14, 4, 4);
    ctx.fillRect(this.x + 22, this.y + 14, 4, 4);
  }
}
class Bomb {
  constructor(gx, gy, owner) {
    this.gx = gx;
    this.gy = gy;
    this.timer = 180;
    this.owner = owner;
    this.range = owner.type === "player" ? owner.bombRange : 2;
    this.exploded = false;
  }
  update() {
    this.timer--;
    if (this.timer % 20 === 0) {
      createParticle(
        this.gx * TILE_SIZE + 25,
        this.gy * TILE_SIZE + 25,
        "#fff",
        1
      );
    }
    if (this.timer <= 0 && !this.exploded) {
      this.explode();
    }
  }
  explode() {
    this.exploded = true;
    if (this.owner.type === "player") this.owner.activeBombs--;
    screenShake(5);
    createExplosion(this.gx, this.gy, this.range);
  }
  draw() {
    const x = this.gx * TILE_SIZE + TILE_SIZE / 2;
    const y = this.gy * TILE_SIZE + TILE_SIZE / 2;
    ctx.fillStyle = "#333";
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
    const intensity = Math.floor(((180 - this.timer) / 180) * 255);
    ctx.fillStyle = `rgb(255, ${255 - intensity}, 0)`;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}
function generateLevel() {
  map = [];
  entities = [];
  particles = [];
  for (let r = 0; r < ROWS; r++) {
    let row = [];
    for (let c = 0; c < COLS; c++) {
      if (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) {
        row.push(1);
      } else if (r % 2 === 0 && c % 2 === 0) {
        row.push(1);
      } else {
        let density = 0.3 + floorLevel * 0.02;
        if (density > 0.5) density = 0.5;
        if (Math.random() < density) {
          row.push(2);
        } else {
          row.push(0);
        }
      }
    }
    map.push(row);
  }
  map[1][1] = 0;
  map[1][2] = 0;
  map[2][1] = 0;
  entities.push(new Player(TILE_SIZE + 8, TILE_SIZE + 8));
  let placedExit = false;
  while (!placedExit) {
    let r = Math.floor(Math.random() * (ROWS - 2)) + 1;
    let c = Math.floor(Math.random() * (COLS - 2)) + 1;
    if ((r > ROWS / 2 || c > COLS / 2) && map[r][c] === 2) {
      map[r][c] = 5;
      placedExit = true;
    }
  }
  let numGhosts = 2 + Math.floor(floorLevel / 2);
  for (let i = 0; i < numGhosts; i++) {
    findSafeSpawn("ghost");
  }
  if (floorLevel >= 2) {
    findSafeSpawn("bot");
  }
  document.getElementById("score").innerText = "FLOOR: " + floorLevel;
}
function findSafeSpawn(type) {
  let safe = false;
  while (!safe) {
    let r = Math.floor(Math.random() * (ROWS - 2)) + 1;
    let c = Math.floor(Math.random() * (COLS - 2)) + 1;
    if (map[r][c] === 0 && (r > 4 || c > 4)) {
      const x = c * TILE_SIZE + 8;
      const y = r * TILE_SIZE + 8;
      if (type === "ghost") entities.push(new Ghost(x, y));
      if (type === "bot") entities.push(new Bot(x, y));
      safe = true;
    }
  }
}
function placeBomb(entity) {
  const cx = Math.floor((entity.x + entity.w / 2) / TILE_SIZE);
  const cy = Math.floor((entity.y + entity.h / 2) / TILE_SIZE);
  const existing = entities.find(
    (e) => e instanceof Bomb && e.gx === cx && e.gy === cy
  );
  if (!existing && map[cy][cx] !== 1) {
    entities.push(new Bomb(cx, cy, entity));
    return true;
  }
  return false;
}
function createExplosion(cx, cy, range) {
  const dirs = [
    [0, 0],
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0]
  ];
  fire(cx, cy);
  dirs.slice(1).forEach((d) => {
    for (let i = 1; i <= range; i++) {
      let tx = cx + d[0] * i;
      let ty = cy + d[1] * i;
      if (map[ty][tx] === 1) break;
      fire(tx, ty);
      if (map[ty][tx] === 2 || map[ty][tx] === 5) {
        if (map[ty][tx] === 5) {
          map[ty][tx] = 9;
        } else {
          const rand = Math.random();
          if (rand < 0.15) map[ty][tx] = 6;
          else if (rand < 0.3) map[ty][tx] = 7;
          else map[ty][tx] = 0;
        }
        createExplosionEffect(
          tx * TILE_SIZE + 25,
          ty * TILE_SIZE + 25,
          10,
          "#aaa"
        );
        break;
      }
    }
  });
}
function fire(gx, gy) {
  particles.push({
    x: gx * TILE_SIZE,
    y: gy * TILE_SIZE,
    w: TILE_SIZE,
    h: TILE_SIZE,
    life: 15,
    type: "fire"
  });
  entities.forEach((e) => {
    if (e.dead || e instanceof Bomb) return;
    const center = e.getCenter();
    const tileX = Math.floor(center.x / TILE_SIZE);
    const tileY = Math.floor(center.y / TILE_SIZE);
    if (tileX === gx && tileY === gy) {
      if (e.type === "player") e.die();
      else {
        e.dead = true;
        createExplosionEffect(e.x + e.w / 2, e.y + e.h / 2, 15, e.color);
      }
    }
  });
  entities.forEach((e) => {
    if (e instanceof Bomb && !e.exploded && e.gx === gx && e.gy === gy) {
      e.timer = 1;
    }
  });
}
function isDanger(gx, gy) {
  for (let e of entities) {
    if (e instanceof Bomb && !e.exploded) {
      const dx = Math.abs(e.gx - gx);
      const dy = Math.abs(e.gy - gy);
      if (dy === 0 && dx <= e.range) return true;
      if (dx === 0 && dy <= e.range) return true;
    }
  }
  return false;
}
function checkCollision(x, y, w, h) {
  const points = [
    { cx: x, cy: y },
    { cx: x + w, cy: y },
    { cx: x, cy: y + h },
    { cx: x + w, cy: y + h }
  ];
  for (let p of points) {
    const col = Math.floor(p.cx / TILE_SIZE);
    const row = Math.floor(p.cy / TILE_SIZE);
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return true;
    const tile = map[row][col];
    if (tile === 1 || tile === 2 || tile === 5) return true;
  }
  return false;
}
function checkItemPickup(player) {
  const cx = Math.floor((player.x + player.w / 2) / TILE_SIZE);
  const cy = Math.floor((player.y + player.h / 2) / TILE_SIZE);
  const tile = map[cy][cx];
  if (tile === 9) {
    nextLevel();
  } else if (tile === 6) {
    player.maxBombs++;
    map[cy][cx] = 0;
    createFloatingText("BOMBS++", player.x, player.y);
  } else if (tile === 7) {
    player.bombRange++;
    map[cy][cx] = 0;
    createFloatingText("FIRE++", player.x, player.y);
  }
}
function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x2 < x1 + w1 && x2 + w2 > x1 && y2 < y1 + h1 && y2 + h2 > y1;
}
function createParticle(x, y, color, speed) {
  const ang = Math.random() * Math.PI * 2;
  particles.push({
    x: x,
    y: y,
    vx: Math.cos(ang) * speed,
    vy: Math.sin(ang) * speed,
    life: 30 + Math.random() * 20,
    color: color,
    type: "part"
  });
}
function createExplosionEffect(x, y, count, color) {
  for (let i = 0; i < count; i++)
    createParticle(x, y, color, Math.random() * 3);
}
function createFloatingText(text, x, y) {
  particles.push({
    x: x,
    y: y,
    vx: 0,
    vy: -1,
    life: 60,
    text: text,
    type: "text"
  });
}
function screenShake(intensity) {
  shakeIntensity = intensity;
}
function update() {
  if (!gameRunning) return;
  if (shakeIntensity > 0) shakeIntensity *= 0.9;
  if (shakeIntensity < 0.5) shakeIntensity = 0;
  entities.forEach((e) => e.update());
  entities = entities.filter((e) => !e.dead && !e.exploded);
  particles.forEach((p) => {
    if (p.type === "fire") p.life--;
    else if (p.type === "part" || p.type === "text") {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
    }
  });
  particles = particles.filter((p) => p.life > 0);
}
function draw() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = C_BG;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  const sx = (Math.random() - 0.5) * shakeIntensity;
  const sy = (Math.random() - 0.5) * shakeIntensity;
  ctx.translate(sx, sy);
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = c * TILE_SIZE;
      const y = r * TILE_SIZE;
      const tile = map[r][c];
      if (tile === 1) {
        ctx.fillStyle = C_WALL_HARD;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = "#444";
        ctx.fillRect(x + 5, y + 5, TILE_SIZE - 10, TILE_SIZE - 10);
      } else if (tile === 2 || tile === 5) {
        ctx.fillStyle = C_WALL_SOFT;
        ctx.fillRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);
        ctx.fillStyle = "#222";
        ctx.beginPath();
        ctx.arc(x + 15, y + 15, 4, 0, Math.PI * 2);
        ctx.arc(x + 35, y + 35, 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (tile === 9) {
        ctx.strokeStyle = C_ACCENT;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x + TILE_SIZE / 2, y + 10);
        ctx.lineTo(x + TILE_SIZE - 10, y + TILE_SIZE / 2);
        ctx.lineTo(x + TILE_SIZE / 2, y + TILE_SIZE - 10);
        ctx.lineTo(x + 10, y + TILE_SIZE / 2);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = `rgba(255, 68, 34, ${
          0.2 + Math.sin(frame / 10) * 0.2
        })`;
        ctx.fill();
      } else if (tile === 6) {
        ctx.fillStyle = "#333";
        ctx.beginPath();
        ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.fillText("B", x + 18, y + 32);
      } else if (tile === 7) {
        ctx.fillStyle = C_ACCENT;
        ctx.beginPath();
        ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.fillText("F", x + 18, y + 32);
      }
    }
  }
  entities.filter((e) => e instanceof Bomb).forEach((e) => e.draw());
  particles
    .filter((p) => p.type === "fire")
    .forEach((p) => {
      ctx.fillStyle = `rgba(255, 68, 34, ${p.life / 15})`;
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(p.x + p.w / 2, p.y + p.h / 2, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  entities.filter((e) => !(e instanceof Bomb)).forEach((e) => e.draw());
  particles
    .filter((p) => p.type !== "fire")
    .forEach((p) => {
      if (p.type === "text") {
        ctx.fillStyle = "#333";
        ctx.font = "bold 16px Courier New";
        ctx.fillText(p.text, p.x, p.y);
      } else {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 30;
        ctx.fillRect(p.x, p.y, 4, 4);
        ctx.globalAlpha = 1.0;
      }
    });
  frame++;
  requestAnimationFrame(loop);
}
function loop() {
  update();
  draw();
}
function startGame() {
  document.getElementById("overlay").classList.add("hidden");
  gameRunning = true;
  floorLevel = 1;
  generateLevel();
  loop();
}
function nextLevel() {
  gameRunning = false;
  floorLevel++;
  const oldPlayer = entities.find((e) => e.type === "player");
  setTimeout(() => {
    generateLevel();
    const newPlayer = entities.find((e) => e.type === "player");
    newPlayer.maxBombs = oldPlayer.maxBombs;
    newPlayer.bombRange = oldPlayer.bombRange;
    gameRunning = true;
    loop();
  }, 500);
}
function gameOver() {
  gameRunning = false;
  document.getElementById("overlay").classList.remove("hidden");
  document.querySelector("#overlay h1").innerText = "TERMINATED";
  document.querySelector(
    "#overlay p"
  ).innerText = `You reached Floor ${floorLevel}.`;
  document.getElementById("startBtn").innerText = "RETRY";
}
window.addEventListener("keydown", (e) => {
  if (e.key === "w" || e.key === "ArrowUp") keys.w = true;
  if (e.key === "s" || e.key === "ArrowDown") keys.s = true;
  if (e.key === "a" || e.key === "ArrowLeft") keys.a = true;
  if (e.key === "d" || e.key === "ArrowRight") keys.d = true;
  if (e.key === " ") keys.space = true;
  if (e.key === "e" || e.key === "E") keys.e = true;
});
window.addEventListener("keyup", (e) => {
  if (e.key === "w" || e.key === "ArrowUp") keys.w = false;
  if (e.key === "s" || e.key === "ArrowDown") keys.s = false;
  if (e.key === "a" || e.key === "ArrowLeft") keys.a = false;
  if (e.key === "d" || e.key === "ArrowRight") keys.d = false;
  if (e.key === " ") keys.space = false;
  if (e.key === "e" || e.key === "E") keys.e = false;
});
document.getElementById("startBtn").addEventListener("click", startGame);
