const IMG_IDLE = document.getElementById("asset-idle").src;
const IMG_WALK = document.getElementById("asset-walk").src;
const IMG_RUN = document.getElementById("asset-run").src;

const TEXT_DATA = {
	easy: [
		["sun", "warm", "leaf", "play", "calm"],
		["wind!", "sounds", "birds?", "rumble!", "scared"],
		["ROCK", "on", "sky!", "GLOW", "Run"],
		["FIRE!", "HEAT", "FAST!", "Burn", "HOT!"],
		["JUMP!", "RUN!", "To Cave", "Hide", "FLEE!"],
		["LAVA!", "LOUD!", "DOOM", "Bang!", "END."],
		["RUN!!!", "FAST!", "FIRE", "NOW!", "ZERO"],
		["SAFE!", "Green", "LOVE", "HOME", "Life"]
	],
	medium: [
		["sun is warm", "eat green leaves", "river flows by", "safe and calm"],
		["wind is fast", "clouds are dark", "birds fly away", "i feel scared"],
		["Sky is orange", "Rocks fall down", "Ground shakes", "Keep moving on"],
		["Big rock falls", "Trees on fire", "Run very fast", "Do not stop"],
		["Dodge the fire", "Ash falls down", "See the cave", "Jump the log"],
		["Ground cracks", "Lava flows fast", "Noise is loud", "Stay brave now"],
		["Ten seconds left", "Sky falls down", "Run for life", "Almost there"],
		["The air is cool", "I see trees", "We are safe", "My family is here"]
	],
	hard: [
		[
			"the morning sun is very warm",
			"a gentle breeze blows by me",
			"I eat the tasty green leaves,",
			"The river flows slowly today",
			"It is a beautiful quiet day."
		],
		[
			"The birds stopped singing?",
			"The wind is moving faster!",
			"I see strange dark clouds.",
			"A deep rumble comes from far,",
			"The other animals look scared!"
		],
		[
			"The sky is turning orange!!!",
			"Small rocks fall from the sky?",
			"I must keep moving forward...",
			"The ground is SHAKING hard!",
			"A bright light is above us."
		],
		[
			"A GIANT rock is falling down!",
			"The forest is catching fire?!",
			"I have to run very fast now.",
			"The air is getting too HOT!",
			"Do not look back! Don't look at the FIRE."
		],
		[
			"RUN away from the flames!",
			"JUMP over the burning trees.",
			"The ash is FALLING like snow...",
			"I can see the SAFE CAVE ahead!",
			"Do not stop for anything!!!"
		],
		[
			"THE GROUND IS BREAKING APART.",
			"LAVA IS FLOWING BEHIND ME.",
			"THE NOISE IS VERY LOUD NOW.",
			"I MUST BE BRAVE TO SURVIVE.",
			"THE END IS COMING CLOSER."
		],
		[
			"IMPACT IN 10 SECONDS!",
			"10, 9, 8...",
			"THE SKY IS FALLING DOWN",
			"7, 6",
			"RUN FASTER THAN EVER!",
			"Five",
			"ALMOST THERE!",
			"Four, THREE",
			"DONT_LET_THE_FIRE_CATCH_YOU!",
			"TWO!",
			"ONE..."
		],
		[
			"The smoke clears away.",
			"I see a green valley ahead!",
			"My friends are waiting for me.",
			"We made it! We are safe."
		]
	]
};

const PARADISE_PALETTE = {
	skyTop: "#00c6ff",
	skyBot: "#0072ff",
	ground: "#2d6a4f",
	grass: "#40916c",
	sun: "#ffaa00",
	meteors: 0
};

const LEVELS = [
	{
		palette: {
			skyTop: "#4facfe",
			skyBot: "#00f2fe",
			ground: "#2d6a4f",
			grass: "#40916c",
			sun: "#ffd700",
			meteors: 0
		},
		sentences: []
	},
	{
		palette: {
			skyTop: "#4facfe",
			skyBot: "#f6d365",
			ground: "#556b2f",
			grass: "#6b8e23",
			sun: "#ffcc33",
			meteors: 0
		},
		sentences: []
	},
	{
		palette: {
			skyTop: "#f6d365",
			skyBot: "#fda085",
			ground: "#8b4513",
			grass: "#a0522d",
			sun: "#ffaa00",
			meteors: 1
		},
		sentences: []
	},
	{
		palette: {
			skyTop: "#fcb045",
			skyBot: "#fd1d1d",
			ground: "#654321",
			grass: "#8b0000",
			sun: "#ff4500",
			meteors: 3
		},
		sentences: []
	},
	{
		palette: {
			skyTop: "#833ab4",
			skyBot: "#fd1d1d",
			ground: "#3e2723",
			grass: "#4e342e",
			sun: "#ff0000",
			meteors: 5
		},
		sentences: []
	},
	{
		palette: {
			skyTop: "#330000",
			skyBot: "#aa0000",
			ground: "#1a0505",
			grass: "#220a0a",
			sun: "#880000",
			meteors: 8
		},
		sentences: []
	},
	{
		palette: {
			skyTop: "#220000",
			skyBot: "#550000",
			ground: "#000000",
			grass: "#331100",
			sun: "#440000",
			meteors: 15
		},
		sentences: []
	},
	{
		palette: {
			skyTop: "#000000",
			skyBot: "#ff0000",
			ground: "#110000",
			grass: "#ff4500",
			sun: "#000000",
			meteors: 30
		},
		sentences: []
	}
];

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const heroImg = document.getElementById("hero-dino");
const dinoAsset = document.getElementById("asset-idle");

let state = {
	active: false,
	won: false,
	levelIdx: 0,
	text: "",
	sentenceIdx: 0,
	charIdx: 0,
	bgOffset: 0,
	danger: 0,
	mode: "idle",
	lastInputTime: 0,
	stopTimer: null,
	meteors: [],
	particles: [],
	score: 0,
	errors: 0,
	correct: 0,
	combo: 0,
	multiplier: 1,
	gameStartTime: 0,
	totalStrokes: 0,
	lastComboTime: 0,
	comboTimeout: 3000
};

function spawnMeteor() {
	if (state.won) return;
	const levelData = LEVELS[state.levelIdx] || LEVELS[0];
	if (state.meteors.length < levelData.palette.meteors) {
		state.meteors.push({
			x: Math.random() * 800 + 200,
			y: -100,
			size: Math.random() * 10 + 5,
			speedX: -2 - Math.random() * 4,
			speedY: 4 + Math.random() * 6
		});
	}
}

function spawnParticles() {
	if (state.won) return;
	if (state.levelIdx < 3) return;
	const density = state.levelIdx - 2;
	if (state.particles.length < density * 30) {
		state.particles.push({
			x: Math.random() * 800,
			y: -10,
			speedY: Math.random() * 2 + 1,
			speedX: (Math.random() - 0.5) * 2,
			size: Math.random() * 3 + 1,
			type: Math.random() > 0.7 ? "ember" : "ash",
			life: 1.0
		});
	}
}

function draw() {
	let pal = LEVELS[state.levelIdx]
		? LEVELS[state.levelIdx].palette
		: LEVELS[0].palette;

	if (state.won) {
		pal = PARADISE_PALETTE;
	}
	ctx.save();

	if (!state.won && (state.danger > 80 || state.levelIdx >= 5)) {
		const shakeIntensity =
			(state.danger > 80 ? (state.danger - 80) * 0.2 : 0) +
			(state.levelIdx >= 5 ? 2 : 0);
		const dx = (Math.random() - 0.5) * shakeIntensity;
		const dy = (Math.random() - 0.5) * shakeIntensity;
		ctx.translate(dx, dy);
	}

	let grad = ctx.createLinearGradient(0, 0, 0, 500);
	grad.addColorStop(0, pal.skyTop);
	grad.addColorStop(1, pal.skyBot);
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, 800, 500);

	ctx.fillStyle = pal.sun;
	ctx.beginPath();
	let sunX = 600 - state.levelIdx * 40;
	let sunY = 100 + state.levelIdx * 30;

	if (state.won) {
		sunX = 600;
		sunY = 100;
	}
	ctx.arc(sunX, sunY, 60, 0, Math.PI * 2);
	ctx.fill();

	ctx.fillStyle = "rgba(0,0,0,0.3)";
	for (let i = 0; i < 3; i++) {
		let mx = (i * 300 - state.bgOffset * 0.1) % 1000;
		if (mx < -200) mx += 1000;
		ctx.beginPath();
		ctx.moveTo(mx, 500);
		ctx.lineTo(mx + 150, 250);
		ctx.lineTo(mx + 300, 500);
		ctx.fill();
	}

	if (state.active && !state.won) {
		spawnMeteor();
		for (let i = state.meteors.length - 1; i >= 0; i--) {
			let m = state.meteors[i];
			m.x += m.speedX;
			m.y += m.speedY;
			ctx.fillStyle = `rgba(255, ${255 - state.levelIdx * 30}, 0, 0.6)`;
			ctx.beginPath();
			ctx.moveTo(m.x, m.y);
			ctx.lineTo(m.x - m.speedX * 10, m.y - m.speedY * 10);
			ctx.lineTo(m.x + m.size, m.y);
			ctx.fill();
			ctx.fillStyle = "#fff";
			ctx.fillRect(m.x, m.y, m.size, m.size);
			if (m.y > 550) state.meteors.splice(i, 1);
		}
	}

	ctx.fillStyle = pal.ground;
	ctx.fillRect(0, 420, 800, 80);

	ctx.fillStyle = pal.grass;
	for (let i = 0; i < 15; i++) {
		let tx = (i * 100 - state.bgOffset) % 900;
		if (tx < -50) tx += 900;
		if (state.won || state.levelIdx < 4) {
			ctx.beginPath();
			ctx.arc(tx, 420, 20, 0, Math.PI * 2);
			ctx.fill();
		} else {
			ctx.fillRect(tx, 400, 5, 20);
			if (state.levelIdx > 6 && !state.won) {
				ctx.fillStyle = "orange";
				ctx.fillRect(tx, 395, 5, 5);
				ctx.fillStyle = pal.grass;
			}
		}
	}

	if (state.won) {
		ctx.drawImage(dinoAsset, 300, 340, 150, 150);
		ctx.drawImage(dinoAsset, 440, 390, 80, 80);
		ctx.drawImage(dinoAsset, 550, 360, 130, 130);
	}

	if (!state.won) {
		let dangerX = state.danger * 6 - 300;
		if (state.danger > 0 || state.levelIdx > 5) {
			let fogGrad = ctx.createLinearGradient(dangerX, 0, dangerX + 300, 0);
			fogGrad.addColorStop(0, "rgba(0,0,0,0.95)");
			fogGrad.addColorStop(0.5, "rgba(255,50,0,0.6)");
			fogGrad.addColorStop(1, "rgba(0,0,0,0)");
			ctx.fillStyle = fogGrad;
			ctx.fillRect(0, 0, dangerX + 300, 500);
		}
	}

	if (state.active && !state.won) {
		spawnParticles();
		for (let i = state.particles.length - 1; i >= 0; i--) {
			let p = state.particles[i];
			p.x += p.speedX;
			p.y += p.speedY;
			p.life -= 0.005;
			if (p.type === "ash") ctx.fillStyle = `rgba(100, 100, 100, ${p.life})`;
			else ctx.fillStyle = `rgba(255, 100, 0, ${p.life})`;
			ctx.fillRect(p.x, p.y, p.size, p.size);
			if (p.y > 500 || p.life <= 0) state.particles.splice(i, 1);
		}
	}

	if (!state.won && state.danger > 85) {
		ctx.fillStyle = `rgba(255, 0, 0, ${(Math.sin(Date.now() / 100) + 1) * 0.1})`;
		ctx.fillRect(0, 0, 800, 500);
	}
	ctx.restore();
	if (state.active) requestAnimationFrame(loop);
}

function loop() {
	if (!state.active) return;
	let passiveDanger = 0.05 + state.levelIdx * 0.04;

	if (state.won) {
		state.danger = 0;
	} else {
		if (state.mode === "idle") {
			state.danger += passiveDanger;
		} else if (state.mode === "walk") {
			state.danger -= 0.1;
			state.bgOffset += 4;
		} else if (state.mode === "run") {
			state.danger -= 0.5;
			state.bgOffset += 10;
		}
		state.danger = Math.max(0, Math.min(100, state.danger));
	}
	document.getElementById("danger-fill").style.width = state.danger + "%";

	if (state.gameStartTime > 0) {
		let elapsedSec = (Date.now() - state.gameStartTime) / 1000;
		let kps = state.totalStrokes / (elapsedSec || 1);
		document.getElementById("speed-val").innerText = kps.toFixed(1);
	}

	if (!state.won && state.combo > 0) {
		let timeSinceLast = Date.now() - state.lastComboTime;
		let remaining = Math.max(0, state.comboTimeout - timeSinceLast);
		let barPct = (remaining / state.comboTimeout) * 100;
		const bar = document.getElementById("combo-timer-bar");
		bar.style.width = barPct + "%";
		if (state.multiplier >= 3) bar.style.backgroundColor = "#ff00ff";
		else if (state.multiplier >= 2) bar.style.backgroundColor = "#00ffff";
		else bar.style.backgroundColor = "#fff";
		if (timeSinceLast >= state.comboTimeout) {
			state.combo = 0;
			state.multiplier = 1;
			updateStatsUI();
		}
	} else {
		document.getElementById("combo-timer-bar").style.width = "0%";
	}
	if (state.danger >= 100) {
		endGame(false);
		return;
	}
	draw();
}

function setMode(mode) {
	if (state.mode === mode) return;
	state.mode = mode;
	if (mode === "idle") heroImg.src = IMG_IDLE;
	if (mode === "walk") heroImg.src = IMG_WALK;
	if (mode === "run") heroImg.src = IMG_RUN;
}

function updateStatsUI() {
	document.getElementById("score-val").innerText = state.score;
	document.getElementById(
		"combo-display"
	).innerHTML = `${state.combo} <span id="multi-val" style="font-size:8px">(${state.multiplier}x)</span>`;
	document.getElementById("error-val").innerText = state.errors;
	const comboVal = document.getElementById("combo-display");
	const comboBox = document.getElementById("combo-box");
	comboVal.className = "stat-value";
	if (state.multiplier >= 4) {
		comboVal.classList.add("combo-god");
		comboBox.style.borderColor = "#ff00ff";
	} else if (state.multiplier >= 3) {
		comboVal.classList.add("combo-high");
		comboBox.style.borderColor = "#00ffff";
	} else if (state.multiplier >= 2) {
		comboVal.classList.add("combo-med");
		comboBox.style.borderColor = "#ffff00";
	} else {
		comboVal.classList.add("combo-low");
		comboBox.style.borderColor = "#555";
	}
}

function renderSentence() {
	let html = "";
	for (let i = 0; i < state.text.length; i++) {
		let char = state.text[i];
		let className = "pending";
		if (i < state.charIdx) className = "typed";
		else if (i === state.charIdx) className = "current";
		html += `<span class="${className}">${char === " " ? "&nbsp;" : char}</span>`;
	}
	document.getElementById("sentence-display").innerHTML = html;
}

function nextSentence() {
	state.sentenceIdx++;
	if (state.sentenceIdx >= LEVELS[state.levelIdx].sentences.length) {
		state.score += 50;
		state.levelIdx++;
		if (state.levelIdx >= LEVELS.length) {
			state.won = true;
			endGame(true);
			return;
		}
		document.getElementById("level-badge").innerText = state.levelIdx + 1;
		state.sentenceIdx = 0;
		state.danger = Math.max(0, state.danger - 30);
	}
	state.text = LEVELS[state.levelIdx].sentences[state.sentenceIdx];
	state.charIdx = 0;
	setMode("idle");
	renderSentence();
	updateStatsUI();
}

document.addEventListener("keydown", (e) => {
	if (!state.active || state.won) return;
	if (e.key.length > 1 && e.key !== "Backspace") return;
	let target = state.text[state.charIdx];
	let input = e.key;
	let isMatch = false;
	if (state.levelIdx < 4) {
		if (target.toLowerCase() === input.toLowerCase()) {
			isMatch = true;
		}
	} else {
		if (target === input) {
			isMatch = true;
		}
	}
	state.totalStrokes++;
	if (isMatch) {
		state.charIdx++;
		state.correct++;
		state.combo++;
		state.lastComboTime = Date.now();
		state.multiplier = 1 + Math.floor(state.combo / 5);
		state.score += 10 * state.multiplier;
		state.danger -= 1;
		const now = Date.now();
		if (now - state.lastInputTime < 300) setMode("run");
		else setMode("walk");
		state.lastInputTime = now;
		if (state.stopTimer) clearTimeout(state.stopTimer);
		state.stopTimer = setTimeout(() => {
			if (state.active) setMode("idle");
		}, 500);
		if (state.charIdx >= state.text.length) {
			nextSentence();
		} else {
			renderSentence();
		}
	} else {
		if (e.key.length === 1) {
			state.errors++;
			state.score = Math.max(0, state.score - 20);
			state.combo = 0;
			state.multiplier = 1;
			state.danger += 5;
			let el = document.getElementById("sentence-display");
			el.classList.add("wrong");
			setTimeout(() => el.classList.remove("wrong"), 100);
		}
	}
	updateStatsUI();
});

function showScreen(id) {
	document.querySelectorAll(".screen").forEach((s) => s.classList.add("hidden"));
	const el = document.getElementById(id);
	if (el) el.classList.remove("hidden");
}

function startGame(difficulty) {
	if (state.stopTimer) clearTimeout(state.stopTimer);
	let selectedSentences = TEXT_DATA[difficulty];
	for (let i = 0; i < LEVELS.length; i++) {
		LEVELS[i].sentences = selectedSentences[i] || selectedSentences[0];
	}
	state.active = true;
	state.won = false;
	state.levelIdx = 0;
	state.sentenceIdx = 0;
	state.danger = 0;
	state.bgOffset = 0;
	state.meteors = [];
	state.particles = [];
	state.text = LEVELS[0].sentences[0];
	state.charIdx = 0;
	state.score = 0;
	state.errors = 0;
	state.correct = 0;
	state.combo = 0;
	state.multiplier = 1;
	state.totalStrokes = 0;
	state.gameStartTime = Date.now();
	state.lastComboTime = Date.now();
	document.getElementById("level-badge").innerText = "1";
	showScreen("none");
	setMode("idle");
	renderSentence();
	updateStatsUI();
	loop();
}

function endGame(win) {
	if (state.stopTimer) clearTimeout(state.stopTimer);
	if (win) {
		document.getElementById("sentence-display").innerHTML = "";
		showScreen("win-screen");
	} else {
		state.active = false;
		setMode("idle");
		let elapsedSec = (Date.now() - state.gameStartTime) / 1000;
		let finalKPS = (state.totalStrokes / elapsedSec).toFixed(1);
		let statsHtml = `
                    <p>SCORE: ${state.score}</p>
                    <p>SPEED: ${finalKPS} KPS</p>
                    <p>ERRORS: ${state.errors}</p>
                `;
		document.getElementById("end-stats-loss").innerHTML = statsHtml;
		showScreen("game-over-screen");
	}
	draw();
}
draw();
