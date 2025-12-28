const THEME = {
	snake: "#6a4eed",
	food: "#FFFFFF",
	poison: "#ff6b6b",
	bonus: "#fad56a"
};
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const hudCombo = document.getElementById("combo");
const hudLength = document.getElementById("hudLength");
const hudFood = document.getElementById("hudFood");
const hudTime = document.getElementById("hudTime");
const hudScore = document.getElementById("hudScore");
const hudComboCount = document.getElementById("hudCombo");
const comboBar = document.getElementById("combo-bar");
const msgOverlay = document.getElementById("msg-overlay");
const pauseOverlay = document.getElementById("pause");
const startScreen = document.getElementById("start");
const gameOverScreen = document.getElementById("gameOver");
const diffLabel = document.getElementById("diff-label");
const colsInput = document.getElementById("cols-input");
const rowsInput = document.getElementById("rows-input");
const difficultyButtons = document
	.getElementById("difficulty-buttons")
	.querySelectorAll(".sm-btn");
const bestScoreDisplay = document.getElementById("bestScore");
let box = 20;
let cols = 40;
let rows = 25;
let gameLoop;
let baseSpeed = 200;
let currentSpeed = 200;
let isBoosting = false;
let isPaused = false;
let isGameRunning = false;
let snake = [];
let dir = "RIGHT";
let nextDir = "RIGHT";
let foodCollected = 0;
let pendingGrowth = 0;
let startTime = 0;
let pausedTime = 0;
let pauseStart = 0;
let comboCount = 0;
let lastEatTime = 0;
const COMBO_TIME_LIMIT = 3000;
let standardFood = {};
let specialFruits = [];
let specialFruitTimer;
let particles = [];
const gpState = { startPressed: false, aPressed: false };
let latestFinalScore = 0;
document.addEventListener("keydown", (e) => {
	const k = e.key.toLowerCase();
	const c = e.keyCode;
	if (c === 32) {
		togglePause();
		return;
	}
	if (isGameRunning && !isPaused) {
		if ((c === 37 || k === "a") && dir !== "RIGHT") nextDir = "LEFT";
		if ((c === 38 || k === "w") && dir !== "DOWN") nextDir = "UP";
		if ((c === 39 || k === "d") && dir !== "LEFT") nextDir = "RIGHT";
		if ((c === 40 || k === "s") && dir !== "UP") nextDir = "DOWN";
		if (k === "e" && !isBoosting) enableBoost();
	}
});
document.addEventListener("keyup", (e) => {
	if (e.key.toLowerCase() === "e") disableBoost();
});
function gameLoopGamepad() {
	const gps = navigator.getGamepads ? navigator.getGamepads() : [];
	if (gps[0]) handleGamepad(gps[0]);
	requestAnimationFrame(gameLoopGamepad);
}
function handleGamepad(gp) {
	const t = 0.5;
	if (isGameRunning && !isPaused) {
		if ((gp.buttons[12].pressed || gp.axes[1] < -t) && dir !== "DOWN")
			nextDir = "UP";
		if ((gp.buttons[13].pressed || gp.axes[1] > t) && dir !== "UP")
			nextDir = "DOWN";
		if ((gp.buttons[14].pressed || gp.axes[0] < -t) && dir !== "RIGHT")
			nextDir = "LEFT";
		if ((gp.buttons[15].pressed || gp.axes[0] > t) && dir !== "LEFT")
			nextDir = "RIGHT";
	}
	if (gp.buttons[9].pressed) {
		if (!gpState.startPressed) {
			if (!isGameRunning && gameOverScreen.classList.contains("hidden"))
				startGame();
			else if (!gameOverScreen.classList.contains("hidden")) {
				resetGame();
				startGame();
			} else togglePause();
			gpState.startPressed = true;
		}
	} else gpState.startPressed = false;
	if (gp.buttons[0].pressed) {
		if (!gpState.aPressed) {
			if (!isGameRunning) {
				if (!gameOverScreen.classList.contains("hidden")) resetGame();
				startGame();
			}
			gpState.aPressed = true;
		}
		if (isGameRunning && !isPaused) enableBoost();
	} else {
		gpState.aPressed = false;
		disableBoost();
	}
}
window.setDifficulty = function (level) {
	let speed;
	let label;
	let btnId;
	difficultyButtons.forEach((btn) => btn.classList.remove("active"));
	if (level === "easy") {
		speed = 200;
		label = "Easy (0.5X)";
		btnId = "easy-btn";
	} else if (level === "medium") {
		speed = 100;
		label = "Med (1X)";
		btnId = "medium-btn";
	} else if (level === "hard") {
		speed = 50;
		label = "Hard (2x)";
		btnId = "hard-btn";
	}
	baseSpeed = speed;
	currentSpeed = speed;
	diffLabel.innerText = "Mode: " + label + " (" + speed + "ms)";
	document.getElementById(btnId).classList.add("active");
};
window.startGame = function () {
	let reqCols = parseInt(colsInput.value) || 20;
	let reqRows = parseInt(rowsInput.value) || 20;
	const maxWidth = document.getElementById("game-zone").offsetWidth * 0.95;
	const maxHeight = document.getElementById("game-zone").offsetHeight * 0.95;
	const cellW = maxWidth / reqCols;
	const cellH = maxHeight / reqRows;
	box = Math.max(10, Math.floor(Math.min(cellW, cellH)));
	canvas.width = box * reqCols;
	canvas.height = box * reqRows;
	cols = reqCols;
	rows = reqRows;
	startScreen.classList.add("hidden");
	document.getElementById("intro").classList.add("hidden");
	document.getElementById("share").classList.add("hidden");
	gameOverScreen.classList.add("hidden");
	canvas.classList.remove("hidden");
	hudCombo.style.opacity = 1;
	const sx = Math.floor(cols / 2) * box;
	const sy = Math.floor(rows / 2) * box;
	snake = [
		{ x: sx, y: sy },
		{ x: sx - box, y: sy },
		{ x: sx - 2 * box, y: sy }
	];
	dir = "RIGHT";
	nextDir = "RIGHT";
	foodCollected = 0;
	pendingGrowth = 0;
	startTime = Date.now();
	pausedTime = 0;
	isBoosting = false;
	isPaused = false;
	isGameRunning = true;
	specialFruits = [];
	particles = [];
	comboCount = 0;
	lastEatTime = 0;
	updateSpeed(baseSpeed);
	spawnFood();
	startSpecialCycle();
};
function updatePersonalBestDisplay() {
	const personalBest = localStorage.getItem("snakeBestScore");
	bestScoreDisplay.textContent = personalBest ? parseInt(personalBest, 10) : 0;
}
window.resetGame = function () {
	if (gameLoop) clearInterval(gameLoop);
	if (specialFruitTimer) clearTimeout(specialFruitTimer);
	startScreen.classList.remove("hidden");
	document.getElementById("intro").classList.remove("hidden");
	document.getElementById("share").classList.remove("hidden");
	canvas.classList.add("hidden");
	gameOverScreen.classList.add("hidden");
	hudCombo.style.opacity = 0;
	isGameRunning = false;
	pauseOverlay.style.display = "none";
	document.body.classList.remove("shake");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid();
	updatePersonalBestDisplay();
};
function togglePause() {
	if (!isGameRunning) return;
	isPaused = !isPaused;
	if (isPaused) {
		clearInterval(gameLoop);
		clearTimeout(specialFruitTimer);
		pauseStart = Date.now();
		pauseOverlay.style.display = "block";
	} else {
		pausedTime += Date.now() - pauseStart;
		pauseOverlay.style.display = "none";
		updateSpeed(currentSpeed);
		startSpecialCycle();
	}
}
function updateSpeed(sp) {
	currentSpeed = sp;
	if (gameLoop) clearInterval(gameLoop);
	if (!isPaused && isGameRunning) gameLoop = setInterval(draw, currentSpeed);
}
function enableBoost() {
	if (!isBoosting) {
		isBoosting = true;
		updateSpeed(baseSpeed / 2);
	}
}
function disableBoost() {
	if (isBoosting) {
		isBoosting = false;
		updateSpeed(baseSpeed);
	}
}
function spawnFood() {
	standardFood = getRandPos();
	while (
		collision(standardFood, snake) ||
		specialFruits.some((f) => collision(standardFood, [f]))
	)
		standardFood = getRandPos();
}
function startSpecialCycle() {
	if (specialFruitTimer) clearTimeout(specialFruitTimer);
	specialFruitTimer = setTimeout(() => {
		if (!isPaused && isGameRunning) {
			const availablePos1 = getRandPos();
			const availablePos2 = getRandPos();
			specialFruits = [
				{ ...availablePos1, type: "poison" },
				{ ...availablePos2, type: "bonus" }
			].filter((p) => !collision(p, snake) && !collision(p, [standardFood]));
			showMsg("BONUS FRUIT!");
			setTimeout(() => {
				if (!isPaused) specialFruits = [];
			}, 8000);
			startSpecialCycle();
		}
	}, Math.random() * 5000 + 10000);
}
function getRandPos() {
	return {
		x: Math.floor(Math.random() * cols) * box,
		y: Math.floor(Math.random() * rows) * box
	};
}
function collision(p, arr) {
	for (let s of arr) if (p.x === s.x && p.y === s.y) return true;
	return false;
}
function getComboMultiplier() {
	return 1.0 + comboCount * 0.1;
}
function calculateScore(food, length, timeMs, multiplier) {
	const timeSeconds = timeMs / 1000;
	const baseScore = food * 500 + timeSeconds * 10 + length * 10;
	return Math.round(baseScore * multiplier);
}
function showMsg(msg, color = THEME.food) {
	msgOverlay.innerText = msg;
	msgOverlay.style.color = color;
	msgOverlay.style.opacity = 1;
	setTimeout(() => (msgOverlay.style.opacity = 0), 1000);
}
function createParticles(x, y, color) {
	for (let i = 0; i < 10; i++) {
		particles.push({
			x: x + box / 2,
			y: y + box / 2,
			color: color,
			vx: (Math.random() - 0.5) * 5,
			vy: (Math.random() - 0.5) * 5,
			life: 60
		});
	}
}
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	dir = nextDir;
	if (dir === "LEFT") snakeX -= box;
	if (dir === "UP") snakeY -= box;
	if (dir === "RIGHT") snakeX += box;
	if (dir === "DOWN") snakeY += box;
	if (
		snakeX < 0 ||
		snakeX >= canvas.width ||
		snakeY < 0 ||
		snakeY >= canvas.height ||
		collision({ x: snakeX, y: snakeY }, snake)
	) {
		gameOver();
		return;
	}
	const newHead = { x: snakeX, y: snakeY };
	if (snakeX === standardFood.x && snakeY === standardFood.y) {
		foodCollected++;
		pendingGrowth += 2;
		comboCount++;
		lastEatTime = Date.now();
		showMsg("COMBO x" + comboCount);
		createParticles(standardFood.x, standardFood.y, THEME.food);
		spawnFood();
	}
	for (let i = specialFruits.length - 1; i >= 0; i--) {
		const fruit = specialFruits[i];
		if (snakeX === fruit.x && snakeY === fruit.y) {
			if (fruit.type === "poison") {
				document.body.classList.add("shake");
				setTimeout(() => document.body.classList.remove("shake"), 500);
				pendingGrowth = Math.max(0, pendingGrowth - 2);
				const newLength = Math.max(3, snake.length - 2);
				snake.length = newLength;
				comboCount = Math.max(0, comboCount - 3);
				showMsg("-3 COMBO!", THEME.poison);
				createParticles(fruit.x, fruit.y, THEME.poison);
			} else if (fruit.type === "bonus") {
				pendingGrowth += 5;
				comboCount += 5;
				showMsg("+5 GROWTH!", THEME.bonus);
				createParticles(fruit.x, fruit.y, THEME.bonus);
			}
			specialFruits.splice(i, 1);
			break;
		}
	}
	snake.unshift(newHead);
	if (pendingGrowth > 0) {
		pendingGrowth--;
	} else {
		snake.pop();
	}
	if (Date.now() - lastEatTime > COMBO_TIME_LIMIT) {
		comboCount = 0;
	}
	drawGrid();
	ctx.fillStyle = THEME.food;
	ctx.fillRect(standardFood.x, standardFood.y, box, box);
	for (const fruit of specialFruits) {
		ctx.fillStyle = fruit.type === "poison" ? THEME.poison : THEME.bonus;
		ctx.fillRect(fruit.x, fruit.y, box, box);
	}
	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i === 0 ? THEME.snake : "rgba(106,78,237, 0.7)";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
		if (i === 0) {
			ctx.fillStyle = "#FFFFFF";
			ctx.beginPath();
			const eyeSize = box / 8;
			const eyeOffset = box / 4;
			const headX = snake[i].x;
			const headY = snake[i].y;
			if (dir === "UP") {
				ctx.arc(headX + eyeOffset, headY + eyeOffset, eyeSize, 0, Math.PI * 2);
				ctx.arc(
					headX + box - eyeOffset,
					headY + eyeOffset,
					eyeSize,
					0,
					Math.PI * 2
				);
			} else if (dir === "DOWN") {
				ctx.arc(
					headX + eyeOffset,
					headY + box - eyeOffset,
					eyeSize,
					0,
					Math.PI * 2
				);
				ctx.arc(
					headX + box - eyeOffset,
					headY + box - eyeOffset,
					eyeSize,
					0,
					Math.PI * 2
				);
			} else if (dir === "LEFT") {
				ctx.arc(headX + eyeOffset, headY + eyeOffset, eyeSize, 0, Math.PI * 2);
				ctx.arc(
					headX + eyeOffset,
					headY + box - eyeOffset,
					eyeSize,
					0,
					Math.PI * 2
				);
			} else if (dir === "RIGHT") {
				ctx.arc(
					headX + box - eyeOffset,
					headY + eyeOffset,
					eyeSize,
					0,
					Math.PI * 2
				);
				ctx.arc(
					headX + box - eyeOffset,
					headY + box - eyeOffset,
					eyeSize,
					0,
					Math.PI * 2
				);
			}
			ctx.fill();
		}
	}
	for (let i = particles.length - 1; i >= 0; i--) {
		const p = particles[i];
		p.x += p.vx;
		p.y += p.vy;
		p.life--;
		ctx.fillStyle = p.color;
		ctx.globalAlpha = p.life / 60;
		ctx.beginPath();
		ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
		ctx.fill();
		if (p.life <= 0) particles.splice(i, 1);
	}
	ctx.globalAlpha = 1;
	updateHUD();
}
function drawGrid() {
	ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
	for (let i = 0; i <= cols; i++) {
		ctx.beginPath();
		ctx.moveTo(i * box, 0);
		ctx.lineTo(i * box, canvas.height);
		ctx.stroke();
	}
	for (let j = 0; j <= rows; j++) {
		ctx.beginPath();
		ctx.moveTo(0, j * box);
		ctx.lineTo(canvas.width, j * box);
		ctx.stroke();
	}
}
function updateHUD() {
	const currentTime = Date.now();
	const elapsedTime = currentTime - startTime - pausedTime;
	const scoreValue = calculateScore(
		foodCollected,
		snake.length,
		elapsedTime,
		getComboMultiplier()
	);
	const timeSeconds = Math.round(elapsedTime / 1000);
	hudLength.innerText = snake.length;
	hudFood.innerText = foodCollected;
	hudTime.innerText = timeSeconds;
	hudScore.innerText = scoreValue;
	latestFinalScore = scoreValue;
	hudComboCount.innerText = (comboCount > 0 ? comboCount : 1) + "x";
	const comboTimeLeft = Math.max(
		0,
		COMBO_TIME_LIMIT - (currentTime - lastEatTime)
	);
	comboBar.style.width =
		(comboCount > 0 ? (comboTimeLeft / COMBO_TIME_LIMIT) * 100 : 0) + "%";
}
function gameOver() {
	clearInterval(gameLoop);
	clearTimeout(specialFruitTimer);
	isGameRunning = false;
	const finalScore = latestFinalScore;
	const timeSeconds = document.getElementById("hudTime").innerText;
	document.getElementById("endLength").innerText = snake.length;
	document.getElementById("endFood").innerText = foodCollected;
	document.getElementById("endTime").innerText = timeSeconds;
	document.getElementById("endScore").innerText = finalScore;
	const personalBest = parseInt(
		localStorage.getItem("snakeBestScore") || "0",
		10
	);
	if (finalScore > personalBest) {
		localStorage.setItem("snakeBestScore", finalScore);
		bestScoreDisplay.innerText = finalScore;
	} else {
		bestScoreDisplay.innerText = personalBest;
	}
	gameOverScreen.classList.remove("hidden");
	hudCombo.style.opacity = 0;
	document.body.classList.add("shake");
}
window.shareTwitter = function () {
	const score = document.getElementById("endScore").innerText;
	const length = document.getElementById("endLength").innerText;
	const food = document.getElementById("endFood").innerText;
	const time = document.getElementById("endTime").innerText;
	const gameLink = "https://codepen.io/Julibe/full/KwzXdRq";
	const hashtags = "nostalgia,90s,retro,gaming,snake,arcade";
	const text = `I survived ${time} seconds, ate ${food} 🍎, and grew to ${length} 🟩! My Final score in #SnakeChallenge 🐍 was ${score}. Can you beat me? \nPlay here: ${gameLink}`;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
		text
	)}&hashtags=${encodeURIComponent(hashtags)}`;
	window.open(twitterUrl, "_blank");
};
window.onload = function () {
	setDifficulty("easy");
	canvas.width = box * cols;
	canvas.height = box * rows;
	drawGrid();
	resetGame();
	requestAnimationFrame(gameLoopGamepad);
};
