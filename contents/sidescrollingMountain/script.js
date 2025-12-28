const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
	const targetHeight = 270;
	const aspectRatio = window.innerWidth / window.innerHeight;
	canvas.height = targetHeight;
	canvas.width = targetHeight * aspectRatio;
	ctx.imageSmoothingEnabled = false;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const C = {
	sky: "#10002b",
	bgMtn: "#240046",
	midHill: "#3c096c",
	plat: "#5a189a",
	platTop: "#7b2cbf",
	player: "#ff9e00",
	fgTree: "#10002b",
	sun: "#e85d04",
	spike: "#ff0055"
};

const GRAVITY = 0.3;
const ACCEL = 0.5;
const FRICTION = 0.85;
const MAX_SPEED = 4;
const JUMP_FORCE = 7;
const IDLE_TIMEOUT = 5000;

let isRunning = false;
let score = 0;
let cameraX = 0;
let generationX = 0;
let animationId;
let menuAnimationId;
let frames = 0;
let lastInputTime = Date.now();

let startTime = 0;
let elapsedTime = 0;
let currentDist = 0;
let finalCalculatedScore = 0;

const keys = { left: false, right: false, up: false };
const kb = { left: false, right: false };
let gpJumpReady = true;
let gpStartReady = true;
let gpShareReady = true;

const uiContainer = document.getElementById("ui-container");
const scoreEl = document.getElementById("scoreText");
const distEl = document.getElementById("distText");
const timeEl = document.getElementById("timeText");
const liveScoreEl = document.getElementById("liveScoreText");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const endDistEl = document.getElementById("endDist");
const endBitsEl = document.getElementById("endBits");
const endTimeEl = document.getElementById("endTime");
const endTotalEl = document.getElementById("endTotal");

function handleInput() {
	lastInputTime = Date.now();
	if (isRunning) uiContainer.classList.add("faded");
}

function pollGamepad() {
	const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
	const gp = gamepads[0];

	keys.left = kb.left;
	keys.right = kb.right;

	if (!gp) return;

	if (Math.abs(gp.axes[0]) > 0.2 || gp.buttons.some((b) => b.pressed)) {
		handleInput();
	}

	if (gp.buttons[14]?.pressed || gp.axes[0] < -0.5) keys.left = true;
	if (gp.buttons[15]?.pressed || gp.axes[0] > 0.5) keys.right = true;

	const btnA = gp.buttons[0]?.pressed;
	const btnY = gp.buttons[3]?.pressed;
	const btnStart = gp.buttons[9]?.pressed;

	if (isRunning) {
		if ((btnA || btnY) && gpJumpReady) {
			if (!keys.up) player.jump();
			keys.up = true;
			gpJumpReady = false;
		} else if (!btnA && !btnY) {
			gpJumpReady = true;
			keys.up = false;
		}
	}

	if (!isRunning && !gameOverScreen.classList.contains("hidden")) {
		if (btnY && gpShareReady) {
			shareTwitter();
			gpShareReady = false;
		} else if (!btnY) {
			gpShareReady = true;
		}
	}

	const menuAction =
		btnStart || (btnA && startScreen.classList.contains("hidden") === false);

	if (menuAction && gpStartReady) {
		if (!isRunning) {
			if (!startScreen.classList.contains("hidden")) startGame();
			else if (!gameOverScreen.classList.contains("hidden")) resetGame();
		}
		gpStartReady = false;
	} else if (!menuAction) {
		gpStartReady = true;
	}
}

function menuLoop() {
	if (!isRunning) {
		pollGamepad();
		menuAnimationId = requestAnimationFrame(menuLoop);
	}
}

window.addEventListener("keydown", (e) => {
	handleInput();
	const c = e.code;

	if (
		["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(c) &&
		isRunning
	) {
		e.preventDefault();
	}

	if (c === "ArrowRight" || c === "KeyD") kb.right = true;
	if (c === "ArrowLeft" || c === "KeyA") kb.left = true;

	if (c === "Space" || c === "ArrowUp" || c === "KeyW") {
		if (!keys.up && isRunning) player.jump();
		keys.up = true;
	}

	if (!isRunning) {
		if (
			(c === "Space" || c === "KeyW" || c === "ArrowUp" || c === "Enter") &&
			!startScreen.classList.contains("hidden")
		) {
			startGame();
		} else if (
			(c === "Space" || c === "KeyW" || c === "ArrowUp" || c === "Enter") &&
			!gameOverScreen.classList.contains("hidden")
		) {
			resetGame();
		}
	}
});

window.addEventListener("keyup", (e) => {
	handleInput();
	const c = e.code;
	if (c === "ArrowRight" || c === "KeyD") kb.right = false;
	if (c === "ArrowLeft" || c === "KeyA") kb.left = false;
	if (c === "Space" || c === "ArrowUp" || c === "KeyW") keys.up = false;
});

class Player {
	constructor() {
		this.w = 12;
		this.h = 12;
		this.x = 100;
		this.y = 100;
		this.vx = 0;
		this.vy = 0;
		this.grounded = false;
	}
	jump() {
		if (this.grounded) {
			this.vy = -JUMP_FORCE;
			this.grounded = false;
			createParticles(this.x + 6, this.y + 12, "#e0aaff", 6);
		}
	}
	update() {
		if (keys.right) this.vx += ACCEL;
		if (keys.left) this.vx -= ACCEL;

		this.vx *= FRICTION;
		this.vx = Math.max(Math.min(this.vx, MAX_SPEED), -MAX_SPEED);
		this.vy += GRAVITY;
		this.x += this.vx;
		this.y += this.vy;

		if (this.y > canvas.height + 50) gameOver();

		this.grounded = false;
		platforms.forEach((p) => {
			if (
				this.x < p.x + p.w &&
				this.x + this.w > p.x &&
				this.y + this.h > p.y &&
				this.y < p.y + p.h
			) {
				if (this.vy > 0 && this.y + this.h - this.vy <= p.y + 4) {
					this.grounded = true;
					this.vy = 0;
					this.y = p.y - this.h;
				}
			}
		});
	}
	draw(camX) {
		let dx = Math.floor(this.x - camX);
		ctx.fillStyle = C.player;
		ctx.fillRect(dx, Math.floor(this.y), this.w, this.h);
		ctx.fillStyle = "#240046";
		let faceDir = this.vx >= 0 ? 8 : 2;
		ctx.fillRect(dx + faceDir, Math.floor(this.y) + 3, 2, 2);
	}
}

class Platform {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	draw(camX) {
		let dx = Math.floor(this.x - camX);
		if (dx + this.w < -10 || dx > canvas.width + 10) return;
		ctx.fillStyle = C.plat;
		ctx.fillRect(dx, this.y, this.w, this.h);
		ctx.fillStyle = C.platTop;
		ctx.fillRect(dx, this.y, this.w, 3);
	}
}

class Spike {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.w = 12;
		this.h = 12;
	}
	draw(camX) {
		let dx = Math.floor(this.x - camX);
		if (dx + this.w < -10 || dx > canvas.width + 10) return;
		ctx.fillStyle = C.spike;
		ctx.beginPath();
		ctx.moveTo(dx, this.y + this.h);
		ctx.lineTo(dx + this.w / 2, this.y);
		ctx.lineTo(dx + this.w, this.y + this.h);
		ctx.fill();
	}
}

class Prop {
	constructor(x, type) {
		this.x = x;
		this.type = type;
		if (type === 0) {
			this.w = 100 + Math.random() * 150;
			this.h = 80 + Math.random() * 100;
			this.y = canvas.height;
			this.speed = 0.1;
			this.color = C.bgMtn;
		} else if (type === 1) {
			this.w = 60 + Math.random() * 80;
			this.h = 40 + Math.random() * 60;
			this.y = canvas.height;
			this.speed = 0.4;
			this.color = C.midHill;
		} else if (type === 2) {
			this.w = 20 + Math.random() * 20;
			this.h = 100 + Math.random() * 100;
			this.y = canvas.height;
			this.speed = 1.2;
			this.color = C.fgTree;
		}
	}
	draw(camX) {
		let drawX = this.x - camX * this.speed;
		if (this.type === 2) {
			if (drawX < -100) return;
		} else {
			let totalW = 2000;
			drawX = (((drawX % totalW) + totalW) % totalW) - 200;
		}
		if (drawX > canvas.width || drawX + this.w < 0) return;
		ctx.fillStyle = this.color;
		if (this.type === 2) {
			ctx.beginPath();
			ctx.moveTo(drawX + this.w / 2, this.y - this.h);
			ctx.lineTo(drawX, this.y);
			ctx.lineTo(drawX + this.w, this.y);
			ctx.fill();
		} else {
			ctx.beginPath();
			ctx.moveTo(drawX, this.y);
			ctx.lineTo(drawX + this.w / 2, this.y - this.h);
			ctx.lineTo(drawX + this.w, this.y);
			ctx.fill();
		}
	}
}

class Coin {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.w = 8;
		this.h = 8;
		this.taken = false;
		this.bob = Math.random() * 10;
	}
	draw(camX) {
		if (this.taken) return;
		let dx = Math.floor(this.x - camX);
		let dy = Math.floor(this.y + Math.sin(frames / 20 + this.bob) * 3);
		if (dx < -10 || dx > canvas.width) return;
		ctx.fillStyle = "#ffc300";
		ctx.fillRect(dx, dy, this.w, this.h);
		ctx.fillStyle = "#fff";
		ctx.fillRect(dx + 2, dy + 2, 2, 2);
	}
}

class Particle {
	constructor(x, y, c) {
		this.x = x;
		this.y = y;
		this.c = c;
		this.life = 1.0;
		this.vx = Math.random() * 2 - 1;
		this.vy = Math.random() * 2 - 1;
	}
	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.life -= 0.05;
	}
	draw(camX) {
		if (this.life <= 0) return;
		ctx.fillStyle = this.c;
		ctx.globalAlpha = this.life;
		ctx.fillRect(this.x - camX, this.y, 2, 2);
		ctx.globalAlpha = 1;
	}
}

let player, platforms, coins, spikes, particles, props;

function init() {
	player = new Player();
	platforms = [];
	coins = [];
	spikes = [];
	particles = [];
	props = [];
	score = 0;
	cameraX = 0;
	generationX = 0;
	frames = 0;
	startTime = Date.now();
	elapsedTime = 0;
	currentDist = 0;
	finalCalculatedScore = 0;

	scoreEl.innerText = "BITS: 0";
	timeEl.innerText = "0s";
	distEl.innerText = "0m";
	liveScoreEl.innerText = "SCORE: 0";

	lastInputTime = Date.now();
	uiContainer.classList.remove("faded");

	for (let i = 0; i < 15; i++) props.push(new Prop(i * 150, 0));
	for (let i = 0; i < 20; i++) props.push(new Prop(i * 100, 1));

	generateChunk(0, 400, true);
}

function createParticles(x, y, c, n) {
	for (let i = 0; i < n; i++) particles.push(new Particle(x, y, c));
}

function generateChunk(startX, width, safe) {
	if (safe) {
		platforms.push(new Platform(startX, canvas.height - 40, width, 40));
	} else {
		let cx = startX;
		while (cx < startX + width) {
			let gap = 30 + Math.random() * 50;
			let pw = 50 + Math.random() * 80;
			let ph = canvas.height - 50 - Math.random() * 60;
			platforms.push(new Platform(cx + gap, ph, pw, canvas.height));

			if (Math.random() < 0.4) {
				let sx = cx + gap + 10 + Math.random() * (pw - 30);
				spikes.push(new Spike(sx, ph - 12));
			}
			if (Math.random() < 0.5) {
				coins.push(new Coin(cx + gap + pw / 2 - 4, ph - 30));
			}
			cx += gap + pw;
		}
	}
	generationX = startX + width;
}

function spawnForeground() {
	let spawnX = cameraX * 1.2 + canvas.width + 50;
	props.push(new Prop(spawnX, 2));
}

function loop() {
	if (!isRunning) return;
	pollGamepad();

	frames++;

	if (Date.now() - lastInputTime > IDLE_TIMEOUT)
		uiContainer.classList.remove("faded");

	elapsedTime = Math.floor((Date.now() - startTime) / 1000);
	timeEl.innerText = elapsedTime + "s";

	player.update();

	let target = player.x - canvas.width * 0.3;
	cameraX += (target - cameraX) * 0.1;
	if (cameraX < 0) cameraX = 0;

	if (cameraX + canvas.width > generationX - 100)
		generateChunk(generationX, 400, false);
	if (frames % 100 === 0) spawnForeground();

	if (platforms.length && platforms[0].x + platforms[0].w < cameraX - 100)
		platforms.shift();
	if (coins.length && coins[0].x < cameraX - 100) coins.shift();
	if (spikes.length && spikes[0].x < cameraX - 100) spikes.shift();
	for (let i = props.length - 1; i >= 0; i--) {
		if (props[i].type === 2) {
			let drawX = props[i].x - cameraX * props[i].speed;
			if (drawX < -100) props.splice(i, 1);
		}
	}

	spikes.forEach((s) => {
		if (
			player.x < s.x + s.w - 4 &&
			player.x + player.w > s.x + 4 &&
			player.y < s.y + s.h &&
			player.y + player.h > s.y + 4
		)
			gameOver();
	});

	coins.forEach((c) => {
		if (!c.taken) {
			let dx = player.x + player.w / 2 - (c.x + 2),
				dy = player.y + player.h / 2 - (c.y + 2);
			if (Math.sqrt(dx * dx + dy * dy) < 15) {
				c.taken = true;
				score++;
				scoreEl.innerText = "BIT: " + score;
				createParticles(c.x, c.y, "#ffc300", 5);
			}
		}
	});

	particles.forEach((p, i) => {
		p.update();
		if (p.life <= 0) particles.splice(i, 1);
	});

	currentDist = Math.floor(player.x / 10);
	distEl.innerText = currentDist + "m";

	let currentLiveScore = Math.floor(
		score * (currentDist / 10) + elapsedTime / 60
	);
	if (isNaN(currentLiveScore)) currentLiveScore = 0;
	liveScoreEl.innerText = "SCORE: " + currentLiveScore;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	let grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
	grad.addColorStop(0, C.sky);
	grad.addColorStop(1, "#240046");
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = C.sun;
	let sunX = canvas.width - 100 - cameraX * 0.02;
	ctx.beginPath();
	ctx.arc(sunX, 60, 30, 0, Math.PI * 2);
	ctx.fill();

	props.filter((p) => p.type === 0).forEach((p) => p.draw(cameraX));
	props.filter((p) => p.type === 1).forEach((p) => p.draw(cameraX));
	platforms.forEach((p) => p.draw(cameraX));
	spikes.forEach((s) => s.draw(cameraX));
	coins.forEach((c) => c.draw(cameraX));
	player.draw(cameraX);
	particles.forEach((p) => p.draw(cameraX));
	ctx.save();
	props.filter((p) => p.type === 2).forEach((p) => p.draw(cameraX));
	ctx.restore();

	animationId = requestAnimationFrame(loop);
}

function startGame() {
	cancelAnimationFrame(menuAnimationId);
	startScreen.classList.add("hidden");
	gameOverScreen.classList.add("hidden");
	init();
	isRunning = true;
	loop();
}

function gameOver() {
	isRunning = false;
	cancelAnimationFrame(animationId);

	finalCalculatedScore = Math.floor(
		score * (currentDist / 10) + elapsedTime / 60
	);

	endDistEl.innerText = currentDist + "m";
	endBitsEl.innerText = score;
	endTimeEl.innerText = elapsedTime + "s";
	endTotalEl.innerText = finalCalculatedScore;

	gameOverScreen.classList.remove("hidden");
	uiContainer.classList.remove("faded");

	menuLoop();
}

function shareTwitter() {
	const text = `I scored ${finalCalculatedScore} pts in Dreamy Pixelscapes! 🏔️✨ (Distance: ${currentDist}m | Bits: ${score} | Time: ${elapsedTime}s) Can you beat me? `;
	const url = "https://codepen.io/Julibe/full/PoLWRVa";
	const hashtags = "nostalgia,90s,retro,gaming,8bit";
	const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
		text
	)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
	window.open(twitterUrl, "_blank");
}

function resetGame() {
	startGame();
}

init();
let grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
grad.addColorStop(0, C.sky);
grad.addColorStop(1, "#240046");
ctx.fillStyle = grad;
ctx.fillRect(0, 0, canvas.width, canvas.height);
props.filter((p) => p.type <= 1).forEach((p) => p.draw(0));

menuLoop();
