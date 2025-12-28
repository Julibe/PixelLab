/** GLOBAL GAME CONFIGURATION */
const GameConfig = {
	MinPlayers: 2,
	MaxPlayers: 25,
	KeyboardSpeed: 0.03,
	BotSpeed: 0.012,
	Score: {
		Hit: 10,
		Assist: 100,
		Kill: 500,
		Win: 3000,
		Resurrect: 100,
		SurvivalBase: 50,
		SurvivalMult: 0.25
	},
	ResurrectWindow: 1000,
	SurvivalTick: 10000,
	PortalCooldown: 60,
	Audio: {
		EchoDelay: 0.25,
		EchoFeedback: 0.3
	}
};

// --- SHARE FUNCTION ---
function shareTwitter() {
	const viaUser = "Julibe";

	const user = Game.players.find((p) => p.isUser);
	const score = user ? user.score : 0;
	const timeText = document.getElementById("uiTime").innerText;
	const enemies = Game.numPlayers - 1;

	// Integrated "Luminora" into the messages naturally
	const messages = [
		`I just scored ${score} in Luminora! Survived ${timeText} against ${enemies} bots.`,
		`Geometric supremacy achieved in Luminora: ${score} PTS vs ${enemies} enemies in ${timeText}.`,
		`The Phoenix Protocol works. My Luminora run: ${score} Score | ${timeText} Time | ${enemies} Bots.`,
		`Just dominated the Luminora Cyber Arena: ${score} PTS, ${enemies} enemies, ${timeText} duration.`,
		`I outlasted ${enemies} vectors in Luminora for ${timeText}. Final Efficiency: ${score}.`,
		`Chaos theory proved wrong in Luminora. I hit ${score} points in ${timeText} vs ${enemies} targets.`,
		`New High Score in Luminora: ${score} PTS! Took down ${enemies} opponents in ${timeText}.`,
		`System hacked in Luminora. ${enemies} firewalls breached in ${timeText}. Score: ${score}.`,
		`Entered the flow state against ${enemies} bots in Luminora. ${timeText} of pure focus. Score: ${score}.`
	];

	const hashtagsList = [
		"Luminora",
		"IndieDev",
		"HTML5",
		"Cyber",
		"Punk",
		"Game",
		"WebDev",
		"Pong",
		"GameDev",
		"Neon"
	];

	// Select a random message directly
	const text = messages[Math.floor(Math.random() * messages.length)];

	let selectedTags = hashtagsList
		.sort(() => 0.5 - Math.random())
		.slice(0, 4)
		.map((tag) => tag.replace(/\s+/g, ""));

	const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
		text
	)}&url=${encodeURIComponent(
		"https://codepen.io/Julibe/pen/qEboyag"
	)}&hashtags=${encodeURIComponent(
		selectedTags.join(",")
	)}&via=${encodeURIComponent(viaUser)}`;

	window.open(url, "_blank");
}

// --- INPUT SYSTEM ---
const InputSys = {
	keys: {
		left: false,
		right: false,
		shoot: false
	},
	gamepadIndex: null,
	init() {
		window.addEventListener("keydown", (e) => this.onKey(e, true));
		window.addEventListener("keyup", (e) => this.onKey(e, false));
		window.addEventListener("gamepadconnected", (e) => {
			this.gamepadIndex = e.gamepad.index;
		});
		window.addEventListener("gamepaddisconnected", () => {
			this.gamepadIndex = null;
		});
		// Global Pause Handlers
		window.addEventListener("keydown", (e) => {
			if (
				e.code === "Space" ||
				e.code === "Escape" ||
				e.key.toLowerCase() === "p"
			) {
				e.preventDefault();
				Game.togglePause();
			}
		});
		window.addEventListener("contextmenu", (e) => {
			e.preventDefault();
			Game.togglePause();
		});
	},
	onKey(e, isDown) {
		if (e.code === "ArrowLeft" || e.code === "KeyA") this.keys.left = isDown;
		if (e.code === "ArrowRight" || e.code === "KeyD") this.keys.right = isDown;
		// Remapped Shoot to ENTER or SHIFT to keep SPACE for PAUSE
		if (e.code === "Enter" || e.code === "ShiftLeft" || e.code === "ShiftRight")
			this.keys.shoot = isDown;
	},
	getMovement() {
		let move = 0;
		if (this.keys.left) move -= 1;
		if (this.keys.right) move += 1;
		if (this.gamepadIndex !== null) {
			const gp = navigator.getGamepads()[this.gamepadIndex];
			if (gp) {
				if (Math.abs(gp.axes[0]) > 0.1) move = gp.axes[0];
				if (gp.buttons[14].pressed) move = -1;
				if (gp.buttons[15].pressed) move = 1;
			}
		}
		return move;
	},
	getShoot() {
		if (this.keys.shoot) {
			this.keys.shoot = false;
			return true;
		}
		if (this.gamepadIndex !== null) {
			const gp = navigator.getGamepads()[this.gamepadIndex];
			// Gamepad Button 0 (A/X)
			if (gp && gp.buttons[0].pressed) return true;
		}
		return false;
	}
};

const AudioSys = {
	ctx: null,
	master: null,
	delay: null,
	feedback: null,
	musicNextTime: 0,
	beatCount: 0,
	musicPlaying: false,
	init() {
		if (!this.ctx) {
			this.ctx = new (window.AudioContext || window.webkitAudioContext)();
			this.master = this.ctx.createGain();
			this.master.gain.value = 0.3;
			this.delay = this.ctx.createDelay();
			this.delay.delayTime.value = GameConfig.Audio.EchoDelay;
			this.feedback = this.ctx.createGain();
			this.feedback.gain.value = GameConfig.Audio.EchoFeedback;
			this.delay.connect(this.feedback);
			this.feedback.connect(this.delay);
			this.feedback.connect(this.master);
			this.master.connect(this.ctx.destination);
		}
		if (this.ctx.state === "suspended") this.ctx.resume();
	},
	startMusic() {
		if (!this.ctx || this.musicPlaying) return;
		this.musicPlaying = true;
		this.musicNextTime = this.ctx.currentTime + 0.1;
		this.scheduleMusic();
	},
	stopMusic() {
		this.musicPlaying = false;
	},
	scheduleMusic() {
		if (!this.musicPlaying) return;
		const secondsPerBeat = 0.15;
		const lookahead = 0.1;
		while (this.musicNextTime < this.ctx.currentTime + lookahead) {
			this.playBeat(this.musicNextTime, this.beatCount);
			this.musicNextTime += secondsPerBeat;
			this.beatCount++;
		}
		setTimeout(() => this.scheduleMusic(), 25);
	},
	playBeat(time, beat) {
		const g = this.ctx.createGain();
		g.connect(this.master);
		g.gain.setValueAtTime(0.4, time);
		g.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
		if (beat % 4 === 0) {
			const osc = this.ctx.createOscillator();
			osc.frequency.setValueAtTime(120, time);
			osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.3);
			osc.connect(g);
			osc.start(time);
			osc.stop(time + 0.3);
		}
		if (beat % 2 !== 0) {
			const osc = this.ctx.createOscillator();
			osc.type = "sawtooth";
			const notes = [73.42, 87.31, 98.0, 110.0];
			const note = notes[Math.floor((beat / 16) % 4)];
			osc.frequency.setValueAtTime(note, time);
			const lp = this.ctx.createBiquadFilter();
			lp.type = "lowpass";
			lp.frequency.setValueAtTime(400, time);
			lp.frequency.linearRampToValueAtTime(100, time + 0.2);
			osc.connect(lp);
			lp.connect(g);
			osc.start(time);
			osc.stop(time + 0.2);
		}
	},
	play(type, intensity = 1.0) {
		if (!this.ctx) return;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const g = this.ctx.createGain();
		osc.connect(g);
		g.connect(this.master);
		g.connect(this.delay);
		if (type === "hit") {
			osc.type = "sine";
			const freq = 300 + intensity * 400;
			osc.frequency.setValueAtTime(freq, t);
			osc.frequency.linearRampToValueAtTime(freq * 0.5, t + 0.1);
			g.gain.setValueAtTime(0.3 + intensity * 0.4, t);
			g.gain.linearRampToValueAtTime(0, t + 0.1);
			osc.start(t);
			osc.stop(t + 0.1);
		} else if (type === "shoot") {
			osc.type = "square";
			osc.frequency.setValueAtTime(300, t);
			osc.frequency.exponentialRampToValueAtTime(50, t + 0.2);
			g.gain.setValueAtTime(0.3, t);
			g.gain.linearRampToValueAtTime(0, t + 0.2);
			osc.start(t);
			osc.stop(t + 0.2);
		} else if (type === "die") {
			osc.type = "sawtooth";
			osc.frequency.setValueAtTime(150, t);
			osc.frequency.exponentialRampToValueAtTime(10, t + 1.0);
			g.gain.setValueAtTime(0.5, t);
			g.gain.linearRampToValueAtTime(0, t + 1.0);
			osc.start(t);
			osc.stop(t + 1.0);
		} else if (type === "event") {
			osc.type = "triangle";
			osc.frequency.setValueAtTime(200, t);
			osc.frequency.linearRampToValueAtTime(600, t + 0.5);
			g.gain.setValueAtTime(0.3, t);
			g.gain.linearRampToValueAtTime(0, t + 0.5);
			osc.start(t);
			osc.stop(t + 0.5);
		} else if (type === "resurrect") {
			osc.type = "sine";
			osc.frequency.setValueAtTime(200, t);
			osc.frequency.linearRampToValueAtTime(800, t + 0.6);
			g.gain.setValueAtTime(0.5, t);
			g.gain.linearRampToValueAtTime(0, t + 0.6);
			osc.start(t);
			osc.stop(t + 0.6);
		} else if (type === "portal") {
			osc.type = "sine";
			osc.frequency.setValueAtTime(800, t);
			osc.frequency.exponentialRampToValueAtTime(100, t + 0.3);
			g.gain.setValueAtTime(0.4, t);
			g.gain.linearRampToValueAtTime(0, t + 0.3);
			osc.start(t);
			osc.stop(t + 0.3);
		}
	}
};

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const uiScore = document.getElementById("uiScore");
const uiTime = document.getElementById("uiTime");

const BotNames = [
	"NEON",
	"CANDY",
	"VORTEX",
	"FIZZ",
	"POP",
	"ZAP",
	"GUMMY",
	"ACID",
	"BASE",
	"FLUX",
	"SPARK",
	"GLOW",
	"CYBER",
	"TRON",
	"DATA",
	"BIT"
];
const ChaosTypes = [
	"WORMHOLE",
	"MULTI-BALL",
	"CHAOS",
	"CURVEBALL",
	"ZIGZAG",
	"FLUX",
	"SHRINK",
	"GROW",
	"REVERSE",
	"SPIN",
	"SURGE"
];

const Game = {
	active: false,
	paused: false,
	over: false,
	loopId: null,
	width: 0,
	height: 0,
	centerX: 0,
	centerY: 0,
	radius: 0,
	frame: 0,
	mouseX: 0,
	mouseY: 0,
	numPlayers: 4,
	difficulty: 1.0,
	startLives: 3,
	userColor: "#ff00ff",
	activeEvent: null,
	eventTimer: 0,
	respawning: false,
	shrinkMode: false,
	growMode: false,
	rotation: 0,
	targetRotation: 0,
	warmingUp: false,
	spectatorMode: false,
	timeAccumulator: 0,
	currentBgRGB: {
		r: 10,
		g: 10,
		b: 10
	},
	targetBgRGB: {
		r: 10,
		g: 10,
		b: 10
	},
	walls: [],
	players: [],
	balls: [],
	particles: [],
	shockwaves: [],
	portals: [],
	challengeTimer: null,
	bgGridOffset: 0,
	startTime: 0,
	lastSurvivalCheck: 0,
	enabledEvents: [...ChaosTypes],
	eventFrequency: 1.0,

	initMenu() {
		const footerHTML = document.getElementById("socialTemplate").innerHTML;
		document
			.querySelectorAll(".menu-footer")
			.forEach((el) => (el.innerHTML = footerHTML));

		const container = document.getElementById("chaosList");
		container.innerHTML = "";
		ChaosTypes.forEach((type) => {
			const div = document.createElement("div");
			div.className = "chaos-toggle active";
			div.innerHTML = `<span class="toggle-name uppercase">${type}</span><div class="toggle-indicator"></div>`;
			div.onclick = () => {
				div.classList.toggle("active");
				if (div.classList.contains("active")) {
					if (!this.enabledEvents.includes(type)) this.enabledEvents.push(type);
				} else {
					this.enabledEvents = this.enabledEvents.filter((e) => e !== type);
				}
			};
			container.appendChild(div);
		});
	},

	// --- THIS IS THE FUNCTION THAT WAS MISSING ---
	switchTab(tabId, btn) {
		document
			.querySelectorAll(".tab-content")
			.forEach((el) => el.classList.remove("active"));
		document
			.querySelectorAll(".tab-btn")
			.forEach((el) => el.classList.remove("active"));
		document.getElementById(tabId).classList.add("active");
		btn.classList.add("active");
	},
	// ---------------------------------------------

	updateFreqLabel(val) {
		const labels = ["Disabled", "Normal", "High", "Hyper"];
		document.getElementById("freqLabel").innerText = labels[val];
		this.eventFrequency = parseInt(val);
	},

	showChaos() {
		document.getElementById("mainMenu").classList.remove("active");
		document.getElementById("chaosMenu").classList.add("active");
	},
	hideChaos() {
		document.getElementById("chaosMenu").classList.remove("active");
		document.getElementById("mainMenu").classList.add("active");
	},
	showInfo() {
		document.getElementById("mainMenu").classList.remove("active");
		document.getElementById("infoMenu").classList.add("active");
	},
	hideInfo() {
		document.getElementById("infoMenu").classList.remove("active");
		document.getElementById("mainMenu").classList.add("active");
	},

	togglePause() {
		if (!this.active || this.over || this.warmingUp) return;
		if (this.paused) this.resume();
		else this.pause();
	},

	init() {
		InputSys.init();
		if (this.challengeTimer) clearTimeout(this.challengeTimer);
		AudioSys.init();
		AudioSys.startMusic();

		this.numPlayers = parseInt(document.getElementById("optPlayers").value);
		if (this.numPlayers < GameConfig.MinPlayers)
			this.numPlayers = GameConfig.MinPlayers;
		if (this.numPlayers > GameConfig.MaxPlayers)
			this.numPlayers = GameConfig.MaxPlayers;
		this.difficulty = parseFloat(document.getElementById("optDiff").value);
		this.startLives = parseInt(document.getElementById("optLives").value);
		this.userColor = document.getElementById("optColor").value;

		document
			.querySelectorAll(".menu-container")
			.forEach((el) => el.classList.remove("active"));

		this.active = true;
		this.paused = false;
		this.over = false;
		this.spectatorMode = false;
		this.activeEvent = null;
		this.shrinkMode = false;
		this.growMode = false;
		this.respawning = false;
		this.rotation = 0;
		this.targetRotation = 0;
		this.currentBgRGB = {
			r: 5,
			g: 5,
			b: 5
		};
		this.warmingUp = true;
		this.timeAccumulator = 0;
		this.startTime = Date.now();
		this.lastSurvivalCheck = Date.now();

		this.resize();
		this.createArena();
		this.balls = [];
		this.portals = [];
		this.shockwaves = [];

		this.positionStartOverlay();
		if (this.loopId) cancelAnimationFrame(this.loopId);
		this.loop();

		setTimeout(() => {
			if (!this.active) return;
			this.warmingUp = false;
			document.getElementById("startIndicator").classList.remove("visible");
			this.spawnBall();
			AudioSys.play("event");
			this.scheduleEvent();
			this.startTime = Date.now();
			this.lastSurvivalCheck = Date.now();
		}, 2000);
	},

	positionStartOverlay() {
		const user = this.players.find((p) => p.isUser);
		if (!user) return;
		const w = this.walls[user.id];
		const midX = (w.p1.x + w.p2.x) / 2;
		const midY = (w.p1.y + w.p2.y) / 2;
		const dx = this.centerX - midX;
		const dy = this.centerY - midY;
		const dist = 70;
		const len = Math.sqrt(dx * dx + dy * dy);
		const nx = dx / len;
		const ny = dy / len;
		const offX = nx * dist;
		const offY = ny * dist;

		const overlay = document.getElementById("startIndicator");
		overlay.style.left = midX + offX - 25 + "px";
		overlay.style.top = midY + offY - 40 + "px";

		let angle = Math.atan2(-ny, -nx);
		let deg = angle * (180 / Math.PI) - 90;
		overlay.style.transform = `rotate(${deg}deg)`;
		overlay.classList.add("visible");
	},

	resume() {
		this.paused = false;
		document.getElementById("pauseMenu").classList.remove("active");
	},
	pause() {
		if (this.over || !this.active) return;
		this.paused = true;
		document.getElementById("pauseMenu").classList.add("active");
	},
	restart() {
		this.init();
	},
	toMainMenu() {
		this.active = false;
		this.paused = false;
		AudioSys.stopMusic();
		if (this.challengeTimer) clearTimeout(this.challengeTimer);
		document
			.querySelectorAll(".menu-container")
			.forEach((el) => el.classList.remove("active"));
		document.getElementById("mainMenu").classList.add("active");
		document.getElementById("startIndicator").classList.remove("visible");
	},

	gameOver(winnerId) {
		this.over = true;
		this.paused = true;
		AudioSys.stopMusic();
		const winner = this.players[winnerId];
		const user = this.players.find((p) => p.isUser);
		let title = "Terminated";
		let sub = `Survivor: ${winner ? winner.name : "Unknown"}`;
		if (winner && winner.isUser) {
			title = "Victory";
			sub = "System Conquered";
			this.addScore(winner.id, GameConfig.Score.Win);
		}
		document.getElementById("goTitle").innerText = title;
		document.getElementById("goSubtitle").innerText = sub;
		document.getElementById("goScore").innerText = user ? user.score : 0;
		document.getElementById("pauseMenu").classList.remove("active");
		document.getElementById("gameOverMenu").classList.add("active");
	},

	colorStringToRGB(str) {
		let div = document.createElement("div");
		div.style.color = str;
		document.body.appendChild(div);
		let rgb = window.getComputedStyle(div).color;
		document.body.removeChild(div);
		let match = rgb.match(/(\d+),\s*(\d+),\s*(\d+)/);
		if (match)
			return {
				r: parseInt(match[1]),
				g: parseInt(match[2]),
				b: parseInt(match[3])
			};
		return {
			r: 0,
			g: 0,
			b: 0
		};
	},

	createArena() {
		this.walls = [];
		this.players = [];
		const N = this.numPlayers;
		const R = this.radius;
		const cx = this.centerX;
		const cy = this.centerY;
		let availableNames = [...BotNames].sort(() => Math.random() - 0.5);
		let vertices = [];
		if (N === 2) {
			const w = R * 1.5;
			const h = R * 2.2;
			vertices.push({
				x: cx - w / 2,
				y: cy - h / 2
			});
			vertices.push({
				x: cx + w / 2,
				y: cy - h / 2
			});
			vertices.push({
				x: cx + w / 2,
				y: cy + h / 2
			});
			vertices.push({
				x: cx - w / 2,
				y: cy + h / 2
			});
			for (let i = 0; i < 4; i++) {
				let p1 = vertices[i];
				let p2 = vertices[(i + 1) % 4];
				let active = i === 0 || i === 2;
				let isUser = i === 0;
				let color = isUser
					? this.userColor
					: `hsl(${Math.random() * 360},100%,50%)`;
				if (!active) color = "#333";
				const dx = p2.x - p1.x;
				const dy = p2.y - p1.y;
				const len = Math.sqrt(dx * dx + dy * dy);
				this.walls.push({
					p1,
					p2,
					nx: -dy / len,
					ny: dx / len,
					len,
					id: i
				});
				let name = isUser ? "YOU" : availableNames.pop();
				this.players.push({
					id: i,
					lives: active ? this.startLives : 0,
					pos: 0.5,
					color: color,
					rgb: this.colorStringToRGB(color),
					isUser: isUser,
					dead: !active,
					isWall: !active,
					shots: 0,
					score: 0,
					name: name
				});
			}
		} else {
			let angleOffset =
				N === 4
					? Math.PI / 4
					: N === 6
					? 0
					: N % 2 !== 0
					? Math.PI / 2
					: Math.PI / 2;
			for (let i = 0; i < N; i++) {
				const t = (i / N) * Math.PI * 2 + angleOffset;
				vertices.push({
					x: cx + R * Math.cos(t),
					y: cy + R * Math.sin(t)
				});
			}
			for (let i = 0; i < N; i++) {
				let p1 = vertices[i];
				let p2 = vertices[(i + 1) % N];
				const dx = p2.x - p1.x;
				const dy = p2.y - p1.y;
				const len = Math.sqrt(dx * dx + dy * dy);
				let isUser = i === Math.floor(N / 2);
				let color = isUser ? this.userColor : `hsl(${(i / N) * 360}, 100%, 50%)`;
				if (!isUser && color === this.userColor) color = "#ffffff";
				this.walls.push({
					p1,
					p2,
					nx: -dy / len,
					ny: dx / len,
					len,
					id: i
				});
				let name = isUser ? "YOU" : availableNames.pop();
				this.players.push({
					id: i,
					lives: this.startLives,
					pos: 0.5,
					color: color,
					rgb: this.colorStringToRGB(color),
					isUser: isUser,
					dead: false,
					isWall: false,
					shots: 0,
					score: 0,
					name: name
				});
			}
		}
	},

	spawnBall(x, y, vx, vy, ownerId = null) {
		if (this.balls.length >= this.numPlayers + 3) return;
		if (x === undefined) {
			const a = Math.random() * Math.PI * 2;
			const s = 4 * this.difficulty;
			x = this.centerX;
			y = this.centerY;
			vx = Math.cos(a) * s;
			vy = Math.sin(a) * s;
		}
		this.balls.push({
			x: x,
			y: y,
			vx: vx,
			vy: vy,
			curveDir: Math.random() < 0.5 ? 1 : -1,
			trail: [],
			ownerId: ownerId,
			spawnTime: Date.now(),
			lastTouchId: null,
			portalCooldown: 0
		});
	},

	shootFromDead(player) {
		if (
			!player.dead ||
			player.shots <= 0 ||
			!this.active ||
			this.paused ||
			this.warmingUp
		)
			return;
		player.shots--;
		const w = this.walls[player.id];
		const centerT = player.pos;
		const startX = w.p1.x + (w.p2.x - w.p1.x) * centerT;
		const startY = w.p1.y + (w.p2.y - w.p1.y) * centerT;
		const angle = Math.atan2(this.centerY - startY, this.centerX - startX);
		const spd = 6 * this.difficulty;
		this.spawnBall(
			startX + Math.cos(angle) * 10,
			startY + Math.sin(angle) * 10,
			Math.cos(angle) * spd,
			Math.sin(angle) * spd,
			player.id
		);
		AudioSys.play("shoot");
	},

	addScore(playerId, points) {
		const p = this.players[playerId];
		if (p) {
			p.score += points;
		}
	},

	spawnPortals() {
		this.portals = [];
		for (let i = 0; i < 2; i++) {
			const a = Math.random() * Math.PI * 2;
			const r = Math.random() * (this.radius * 0.7);
			this.portals.push({
				x: this.centerX + Math.cos(a) * r,
				y: this.centerY + Math.sin(a) * r,
				color: i === 0 ? "#0ff" : "#f90"
			});
		}
		this.triggerActiveEvent("WORMHOLE", 500);
	},

	update() {
		if (this.paused) return;
		const user = this.players.find((p) => p.isUser);
		if (user && !this.warmingUp) {
			const move = InputSys.getMovement();
			if (move !== 0) {
				user.pos += move * GameConfig.KeyboardSpeed;
				user.pos = Math.max(0.1, Math.min(0.9, user.pos));
			}
			// KEYBOARD SHOOT is now ENTER or SHIFT
			if (user.dead && InputSys.getShoot()) {
				this.shootFromDead(user);
			}
		}

		const now = Date.now();
		if (now - this.lastSurvivalCheck >= GameConfig.SurvivalTick) {
			const aliveCount = this.players.filter((p) => !p.dead && !p.isWall).length;
			const survivalPoints = Math.floor(
				GameConfig.Score.SurvivalBase * (aliveCount * GameConfig.Score.SurvivalMult)
			);
			this.players.forEach((p) => {
				if (!p.dead && !p.isWall) this.addScore(p.id, survivalPoints);
			});
			this.lastSurvivalCheck = now;
		}
		if (user) uiScore.innerText = user.score;
		let elapsed = Math.floor((now - this.startTime) / 1000);
		let m = Math.floor(elapsed / 60)
			.toString()
			.padStart(2, "0");
		let s = (elapsed % 60).toString().padStart(2, "0");
		uiTime.innerText = `${m}:${s}`;

		const alivePlayers = this.players.filter((p) => !p.dead && !p.isWall);
		if (alivePlayers.length <= 1 && this.numPlayers > 1) {
			this.gameOver(alivePlayers.length === 1 ? alivePlayers[0].id : null);
			return;
		}
		if (user && user.dead && !this.spectatorMode) this.spectatorMode = true;

		if (this.activeEvent) {
			this.eventTimer--;
			if (this.eventTimer <= 0) {
				this.activeEvent = null;
				this.shrinkMode = false;
				this.growMode = false;
				this.portals = [];
			}
		}

		let leader = null;
		let maxLives = -1;
		this.players.forEach((p) => {
			if (!p.dead && !p.isWall && p.lives > maxLives) {
				maxLives = p.lives;
				leader = p;
			}
		});

		this.players.forEach((p) => {
			if (p.isUser || p.isWall) return;
			if (!p.dead) {
				let target = 0.5;
				let closestDist = 99999;
				this.balls.forEach((b) => {
					const w = this.walls[p.id];
					const distSq = (b.x - w.p1.x) ** 2 + (b.y - w.p1.y) ** 2;
					if (distSq < closestDist) {
						closestDist = distSq;
						const proj =
							(b.x - w.p1.x) * ((w.p2.x - w.p1.x) / w.len) +
							(b.y - w.p1.y) * ((w.p2.y - w.p1.y) / w.len);
						target = proj / w.len;
					}
				});
				const spd =
					GameConfig.BotSpeed * this.difficulty * (this.spectatorMode ? 1.5 : 1);
				if (p.pos < target - 0.05) p.pos += spd;
				if (p.pos > target + 0.05) p.pos -= spd;
				p.pos = Math.max(0.1, Math.min(0.9, p.pos));
			} else if (p.dead && p.shots > 0) {
				let targetPlayer =
					leader || this.players.find((pl) => !pl.dead && !pl.isWall);
				if (targetPlayer) {
					if (Math.random() < 0.05) p.targetPos = Math.random();
					if (!p.targetPos) p.targetPos = 0.5;
					const spd = 0.02 * this.difficulty;
					if (p.pos < p.targetPos) p.pos += spd;
					if (p.pos > p.targetPos) p.pos -= spd;
					p.pos = Math.max(0.1, Math.min(0.9, p.pos));
					if (Math.random() < 0.005) {
						this.shootFromDead(p);
					}
				}
			}
		});

		for (let i = this.balls.length - 1; i >= 0; i--) {
			let b = this.balls[i];
			if (b.portalCooldown > 0) b.portalCooldown--;
			if (this.portals.length === 2 && b.portalCooldown <= 0) {
				for (let k = 0; k < 2; k++) {
					let p = this.portals[k];
					let d = Math.hypot(b.x - p.x, b.y - p.y);
					if (d < 25) {
						let other = this.portals[(k + 1) % 2];
						b.x = other.x;
						b.y = other.y;
						b.portalCooldown = GameConfig.PortalCooldown;
						AudioSys.play("portal");
						this.boom(p.x, p.y, p.color, 10);
						this.boom(other.x, other.y, other.color, 10);
						break;
					}
				}
			}
			if (this.activeEvent === "CURVE") {
				let tS = 0.003 * this.difficulty;
				let oX = b.vx;
				b.vx -= b.vy * tS * b.curveDir;
				b.vy += oX * tS * b.curveDir;
			} else if (this.activeEvent === "ZIGZAG" && this.frame % 20 === 0) {
				const a = Math.atan2(b.vy, b.vx);
				const s = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
				b.vx = Math.cos(a + (Math.random() - 0.5)) * s;
				b.vy = Math.sin(a + (Math.random() - 0.5)) * s;
			} else if (this.activeEvent === "FLUX" && Math.random() < 0.02) {
				let sc = 0.8 + Math.random() * 0.4;
				b.vx *= sc;
				b.vy *= sc;
			} else if (this.activeEvent === "CHAOS" && Math.random() < 0.01) {
				const a = Math.random() * Math.PI * 2;
				const s = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
				b.vx = Math.cos(a) * s;
				b.vy = Math.sin(a) * s;
			} else if (this.activeEvent === "REVERSE" && Math.random() < 0.005) {
				b.vx *= -1;
				b.vy *= -1;
				AudioSys.play("event");
				this.boom(b.x, b.y, "#fff", 5);
			}

			b.x += b.vx;
			b.y += b.vy;
			b.trail.push({
				x: b.x,
				y: b.y
			});
			if (b.trail.length > 15) b.trail.shift();

			if (
				(b.x - this.centerX) ** 2 + (b.y - this.centerY) ** 2 >
				(this.radius * 2.5) ** 2
			) {
				this.balls.splice(i, 1);
				continue;
			}

			for (let j = 0; j < this.walls.length; j++) {
				const w = this.walls[j];
				const p = this.players[w.id];
				const wx = b.x - w.p1.x;
				const wy = b.y - w.p1.y;
				const dist = wx * w.nx + wy * w.ny;
				const vDotN = b.vx * w.nx + b.vy * w.ny;
				if (dist < 10 && dist > -15 && vDotN < 0) {
					const proj =
						wx * ((w.p2.x - w.p1.x) / w.len) + wy * ((w.p2.y - w.p1.y) / w.len);
					const t = proj / w.len;
					if (t >= 0 && t <= 1) {
						let paddleW = this.shrinkMode ? 0.08 : this.growMode ? 0.25 : 0.15;
						if (!p.dead && !p.isWall && Math.abs(t - p.pos) < paddleW / 2) {
							let impact = Math.min(1.0, Math.abs(vDotN) / 15);
							AudioSys.play("hit", impact);
							this.boom(b.x, b.y, p.color, 15);
							b.vx -= 2 * vDotN * w.nx;
							b.vy -= 2 * vDotN * w.ny;
							const offset = (t - p.pos) * 2;
							b.vx += -w.ny * offset * 2;
							b.vy += w.nx * offset * 2;
							b.x += w.nx * 5;
							b.y += w.ny * 5;
							b.vx *= 1.05;
							b.vy *= 1.05;
							b.curveDir *= -1;
							b.lastTouchId = p.id;
							this.addScore(p.id, GameConfig.Score.Hit);
						} else if (p.dead || p.isWall) {
							AudioSys.play("wall");
							b.vx -= 2 * vDotN * w.nx;
							b.vy -= 2 * vDotN * w.ny;
							b.x += w.nx * 5;
							b.y += w.ny * 5;
							this.boom(b.x, b.y, "#555", 5);
							b.curveDir *= -1;
							b.lastTouchId = null;
						} else {
							this.loseLife(p, i);
							j = this.walls.length;
						}
					}
				}
			}
		}

		for (let i = this.shockwaves.length - 1; i >= 0; i--) {
			let sw = this.shockwaves[i];
			sw.r += 5;
			sw.op -= 0.02;
			if (sw.op <= 0) this.shockwaves.splice(i, 1);
		}

		if (
			this.balls.length === 0 &&
			!this.respawning &&
			!this.warmingUp &&
			!this.over
		) {
			this.respawning = true;
			setTimeout(() => {
				if (this.active) {
					this.spawnBall();
					this.respawning = false;
				}
			}, 1000);
		}
	},

	loseLife(player, ballIdx) {
		const b = this.balls[ballIdx];
		const w = this.walls[player.id];
		const mx = (w.p1.x + w.p2.x) / 2;
		const my = (w.p1.y + w.p2.y) / 2;
		this.shockwaves.push({
			x: mx,
			y: my,
			r: 10,
			op: 1,
			color: player.color
		});

		if (b && b.lastTouchId !== null && b.lastTouchId !== player.id) {
			this.addScore(b.lastTouchId, GameConfig.Score.Assist);
			if (player.lives <= 1) this.addScore(b.lastTouchId, GameConfig.Score.Kill);
		}

		if (b && b.ownerId !== null) {
			const killer = this.players[b.ownerId];
			if (
				killer &&
				killer.dead &&
				Date.now() - b.spawnTime < GameConfig.ResurrectWindow
			) {
				this.resurrectPlayer(killer);
			}
		}

		if (b) {
			this.boom(b.x, b.y, "#fff", 40);
			this.balls.splice(ballIdx, 1);
		}
		AudioSys.play("die");

		player.lives--;
		if (player.lives <= 0) {
			player.dead = true;
			player.shots = this.numPlayers;
			if (player.isUser) this.showAlert("REVENGE MODE");
		}
	},

	resurrectPlayer(player) {
		player.dead = false;
		player.lives = 1;
		player.shots = 0;
		this.addScore(player.id, GameConfig.Score.Resurrect);
		this.showAlert("RESURRECTED!");
		AudioSys.play("resurrect");
		if (player.isUser) this.spectatorMode = false;
		const w = this.walls[player.id];
		const mx = (w.p1.x + w.p2.x) / 2;
		const my = (w.p1.y + w.p2.y) / 2;
		this.boom(mx, my, "#00ff00", 50);
	},

	boom(x, y, color, count) {
		for (let i = 0; i < count; i++) {
			const angle = Math.random() * Math.PI * 2;
			const speed = Math.random() * 5 + 2;
			this.particles.push({
				x: x,
				y: y,
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed,
				color: color,
				life: 1.0,
				size: Math.random() * 4 + 1
			});
		}
	},

	draw() {
		let leader = null;
		let maxLives = -1;
		this.players.forEach((p) => {
			if (!p.dead && !p.isWall && p.lives > maxLives) {
				maxLives = p.lives;
				leader = p;
			}
		});
		this.targetBgRGB = leader
			? leader.rgb
			: {
					r: 10,
					g: 10,
					b: 10
			  };
		["r", "g", "b"].forEach(
			(c) =>
				(this.currentBgRGB[c] +=
					(this.targetBgRGB[c] - this.currentBgRGB[c]) * 0.05)
		);

		let r = Math.floor(this.currentBgRGB.r),
			g = Math.floor(this.currentBgRGB.g),
			b = Math.floor(this.currentBgRGB.b);

		ctx.fillStyle = `rgb(${r * 0.1},${g * 0.1},${b * 0.1})`;
		ctx.fillRect(0, 0, this.width, this.height);
		ctx.lineWidth = 1;
		ctx.strokeStyle = `rgba(${r},${g},${b},0.2)`;
		const gap = 60;
		const off = this.bgGridOffset;
		const getPoint = (x, y) => {
			const d = Math.hypot(x - this.mouseX, y - this.mouseY);
			if (d < 250) {
				const f = (250 - d) / 250;
				const a = Math.atan2(y - this.mouseY, x - this.mouseX);
				return {
					x: x + Math.cos(a) * f * 40,
					y: y + Math.sin(a) * f * 40
				};
			}
			return {
				x,
				y
			};
		};

		for (let x = off; x < this.width; x += gap) {
			ctx.beginPath();
			for (let y = 0; y < this.height; y += 30) {
				let p = getPoint(x, y);
				y === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
			}
			ctx.stroke();
		}
		for (let y = off; y < this.height; y += gap) {
			ctx.beginPath();
			for (let x = 0; x < this.width; x += 30) {
				let p = getPoint(x, y);
				x === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
			}
			ctx.stroke();
		}

		const gr = ctx.createRadialGradient(
			this.centerX,
			this.centerY,
			this.radius,
			this.centerX,
			this.centerY,
			this.radius * 2.5
		);
		gr.addColorStop(0, "rgba(0,0,0,0)");
		gr.addColorStop(1, `rgba(0,0,0,0.8)`);
		ctx.fillStyle = gr;
		ctx.fillRect(0, 0, this.width, this.height);

		ctx.save();
		ctx.translate(this.centerX, this.centerY);
		ctx.rotate(this.rotation);
		ctx.translate(-this.centerX, -this.centerY);

		this.shockwaves.forEach((sw) => {
			ctx.strokeStyle = sw.color;
			ctx.lineWidth = 15;
			ctx.globalAlpha = sw.op;
			ctx.beginPath();
			ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
			ctx.stroke();
		});
		ctx.globalAlpha = 1;

		this.portals.forEach((p) => {
			ctx.fillStyle = p.color;
			ctx.shadowColor = p.color;
			ctx.shadowBlur = 20;
			ctx.beginPath();
			ctx.arc(p.x, p.y, 25, 0, Math.PI * 2);
			ctx.fill();
			ctx.strokeStyle = "#fff";
			ctx.lineWidth = 2;
			ctx.beginPath();
			for (let i = 0; i < 3; i++) {
				let a = this.frame * 0.1 + i * 2;
				ctx.moveTo(p.x, p.y);
				ctx.lineTo(p.x + Math.cos(a) * 25, p.y + Math.sin(a) * 25);
			}
			ctx.stroke();
			ctx.shadowBlur = 0;
		});

		if (this.activeEvent === "CURVE") ctx.strokeStyle = "#a0a";
		else if (this.activeEvent === "ZIGZAG") ctx.strokeStyle = "#aa0";
		else if (this.activeEvent === "FLUX" || this.activeEvent === "CHAOS")
			ctx.strokeStyle = "#0aa";
		else if (this.activeEvent === "REVERSE") ctx.strokeStyle = "#fff";
		else if (this.shrinkMode) ctx.strokeStyle = "#f00";
		else if (this.growMode) ctx.strokeStyle = "#0f0";
		else ctx.strokeStyle = "#444";
		ctx.lineWidth = 3;

		// Draw Walls & HUD
		this.walls.forEach((w) => {
			const p = this.players[w.id];
			ctx.beginPath();
			ctx.moveTo(w.p1.x, w.p1.y);
			ctx.lineTo(w.p2.x, w.p2.y);
			ctx.stroke();

			if (!p.isWall) {
				const midX = (w.p1.x + w.p2.x) / 2;
				const midY = (w.p1.y + w.p2.y) / 2;
				const dx = midX - this.centerX;
				const dy = midY - this.centerY;
				const distFromCenter = Math.sqrt(dx * dx + dy * dy);
				const unitX = dx / distFromCenter;
				const unitY = dy / distFromCenter;
				const hudDist = 60 + this.difficulty * 10;
				const tx = midX + unitX * hudDist;
				const ty = midY + unitY * hudDist;

				ctx.save();
				ctx.translate(tx, ty);
				const angle = Math.atan2(w.ny, w.nx);
				let textRot = angle + Math.PI / 2;
				ctx.rotate(textRot);
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillStyle = p.color;
				ctx.font = "bold 12px Orbitron";
				ctx.fillText(p.name, 0, -15);
				ctx.fillStyle = "#fff";
				ctx.font = "bold 20px Orbitron";
				if (p.dead) {
					ctx.fillStyle = "#555";
					ctx.fillText("DEAD", 0, 5);
					if (p.shots > 0) {
						ctx.fillStyle = "#fff";
						for (let k = 0; k < p.shots; k++) {
							ctx.beginPath();
							ctx.arc((k - (p.shots - 1) / 2) * 8, 20, 2, 0, Math.PI * 2);
							ctx.fill();
						}
					}
				} else {
					ctx.fillText(p.lives, 0, 5);
					ctx.font = "10px Orbitron";
					ctx.fillStyle = "rgba(255,255,255,0.7)";
					ctx.fillText(p.score, 0, 20);
				}
				ctx.restore();
			}
			if (p.isUser && p.dead && p.shots > 0) {
				const midX = (w.p1.x + w.p2.x) / 2;
				const midY = (w.p1.y + w.p2.y) / 2;
				ctx.fillStyle = "#fff";
				ctx.shadowColor = "#fff";
				ctx.shadowBlur = 10;
				ctx.beginPath();
				ctx.arc(midX, midY, 6, 0, Math.PI * 2);
				ctx.fill();
				ctx.shadowBlur = 0;
			}
		});

		let pWidth = this.shrinkMode ? 0.08 : this.growMode ? 0.25 : 0.15;
		this.walls.forEach((w) => {
			const p = this.players[w.id];
			if (p.isWall) return;
			const sT = p.pos - pWidth / 2;
			const eT = p.pos + pWidth / 2;
			const sX = w.p1.x + (w.p2.x - w.p1.x) * sT;
			const sY = w.p1.y + (w.p2.y - w.p1.y) * sT;
			const eX = w.p1.x + (w.p2.x - w.p1.x) * eT;
			const eY = w.p1.y + (w.p2.y - w.p1.y) * eT;
			ctx.lineWidth = 8;
			ctx.lineCap = "round";
			if (p.dead) {
				ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
				ctx.setLineDash([5, 10]);
			} else {
				ctx.strokeStyle = p.color;
				ctx.shadowColor = p.color;
				ctx.shadowBlur = 15;
				ctx.setLineDash([]);
			}
			ctx.beginPath();
			ctx.moveTo(sX, sY);
			ctx.lineTo(eX, eY);
			ctx.stroke();
			ctx.shadowBlur = 0;
			ctx.lineCap = "butt";
			ctx.setLineDash([]);
		});

		ctx.fillStyle = "#fff";
		this.balls.forEach((b) => {
			if (b.ownerId !== null) {
				ctx.fillStyle = "#ff5555";
				ctx.shadowColor = "#f00";
			} else {
				ctx.fillStyle = "#fff";
				ctx.shadowColor = "#fff";
			}
			ctx.shadowBlur = 10;
			ctx.beginPath();
			ctx.arc(b.x, b.y, 6, 0, Math.PI * 2);
			ctx.fill();
			ctx.shadowBlur = 0;
			ctx.strokeStyle = "rgba(255,255,255,0.3)";
			ctx.lineWidth = 2;
			ctx.beginPath();
			b.trail.forEach((t, i) => {
				i === 0 ? ctx.moveTo(t.x, t.y) : ctx.lineTo(t.x, t.y);
			});
			ctx.stroke();
		});

		ctx.globalCompositeOperation = "lighter";
		this.particles.forEach((p) => {
			ctx.fillStyle = p.color;
			ctx.globalAlpha = p.life;
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
			ctx.fill();
		});
		ctx.globalAlpha = 1.0;
		ctx.globalCompositeOperation = "source-over";
		ctx.restore();
	},

	loop() {
		if (!this.warmingUp && !this.paused && !this.over) {
			let speedMultiplier = 1.0;
			if (this.spectatorMode) {
				const aliveCount = this.players.filter((p) => !p.dead && !p.isWall).length;
				speedMultiplier = 1.0 + 1.0 / Math.max(1, aliveCount);
			}
			this.timeAccumulator += speedMultiplier;
			while (this.timeAccumulator >= 1) {
				this.update();
				this.frame++;
				this.rotation += (this.targetRotation - this.rotation) * 0.05;
				this.timeAccumulator -= 1;
			}
			this.bgGridOffset = (this.bgGridOffset + 0.5 * speedMultiplier) % 60;
			for (let i = this.particles.length - 1; i >= 0; i--) {
				let p = this.particles[i];
				p.x += p.vx;
				p.y += p.vy;
				p.life -= 0.02;
				if (p.life <= 0) this.particles.splice(i, 1);
			}
		}
		this.draw();
		this.loopId = requestAnimationFrame(() => this.loop());
	},

	resize() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		canvas.width = this.width;
		canvas.height = this.height;
		this.centerX = this.width / 2;
		this.centerY = this.height / 2;
		let radScale = this.numPlayers > 10 ? 0.45 : 0.4;
		this.radius = Math.min(this.width, this.height) * radScale;
		if (!this.active) return;
		this.createArena();
	},

	scheduleEvent() {
		if (!this.active) return;
		if (this.challengeTimer) clearTimeout(this.challengeTimer);
		if (this.eventFrequency === 0 || this.enabledEvents.length === 0) return;
		let speedMult = 1.0;
		if (this.spectatorMode) {
			const aliveCount = this.players.filter((p) => !p.dead && !p.isWall).length;
			speedMult = 1.0 + 1.0 / Math.max(1, aliveCount);
		}
		let baseDelay = 7000 - this.eventFrequency * 1500;
		let delay = (baseDelay + Math.random() * 4000) / speedMult;

		this.challengeTimer = setTimeout(() => {
			if (!this.active || this.paused || this.warmingUp || this.over) {
				this.scheduleEvent();
				return;
			}
			const type = this.enabledEvents[
				Math.floor(Math.random() * this.enabledEvents.length)
			];
			const maxBalls = this.numPlayers === 2 ? 3 : this.numPlayers + 1;
			if (type === "MULTI-BALL") {
				if (this.balls.length < maxBalls) {
					this.spawnBall();
					if (this.balls.length < maxBalls && Math.random() > 0.5) this.spawnBall();
					this.showAlert("MULTI-BALL");
					AudioSys.play("event");
				} else this.triggerActiveEvent("GROW", 400);
			} else if (type === "SPIN") {
				this.targetRotation += (Math.random() - 0.5) * Math.PI;
				this.showAlert("SPIN");
				AudioSys.play("event");
			} else if (type === "SURGE") {
				this.balls.forEach((b) => {
					b.vx *= 1.3;
					b.vy *= 1.3;
				});
				this.showAlert("SURGE");
				AudioSys.play("event");
			} else if (type === "SHRINK") {
				this.shrinkMode = true;
				this.triggerActiveEvent("SHRINK", 400);
			} else if (type === "GROW") {
				this.growMode = true;
				this.triggerActiveEvent("GROW", 400);
			} else if (type === "WORMHOLE") {
				this.spawnPortals();
				this.showAlert("WORMHOLE");
				AudioSys.play("event");
			} else
				this.triggerActiveEvent(
					type,
					type === "ZIGZAG" || type === "FLUX" ? 300 : 400
				);
			this.scheduleEvent();
		}, delay);
	},

	triggerActiveEvent(name, duration) {
		this.activeEvent = name.replace("BALL", "");
		this.eventTimer = duration;
		this.showAlert(name);
		AudioSys.play("event");
	},
	showAlert(text) {
		const a = document.getElementById("alertBanner");
		a.innerText = text;
		a.classList.add("visible");
		setTimeout(() => a.classList.remove("visible"), 2500);
	},

	handleInput(x, y) {
		this.mouseX = x;
		this.mouseY = y;
		if (this.paused || !this.active || this.warmingUp) return;
		const user = this.players.find((p) => p.isUser);
		if (!user) return;

		// Mouse Angle
		const dx = x - this.centerX;
		const dy = y - this.centerY;
		const cos = Math.cos(-this.rotation);
		const sin = Math.sin(-this.rotation);
		const rx = dx * cos - dy * sin;
		const ry = dx * sin + dy * cos;
		const wx = rx + this.centerX;
		const wy = ry + this.centerY;

		const w = this.walls[user.id];
		const dxW = wx - w.p1.x;
		const dyW = wy - w.p1.y;
		const wallVecX = w.p2.x - w.p1.x;
		const wallVecY = w.p2.y - w.p1.y;
		const lenSq = w.len * w.len;

		let t = (dxW * wallVecX + dyW * wallVecY) / lenSq;
		t = Math.max(0.1, Math.min(0.9, t));
		user.pos = t;
	}
};

window.addEventListener("resize", () => Game.resize());
window.addEventListener("load", () => {
	Game.initMenu();
	Game.resize();
});
window.addEventListener("mousemove", (e) =>
	Game.handleInput(e.clientX, e.clientY)
);
window.addEventListener(
	"touchmove",
	(e) => {
		e.preventDefault();
		Game.handleInput(e.touches[0].clientX, e.touches[0].clientY);
	},
	{
		passive: false
	}
);

// Mouse Shooting
window.addEventListener("mousedown", () => {
	const user = Game.players.find((p) => p.isUser);
	if (user && user.dead) Game.shootFromDead(user);
});
window.addEventListener("touchstart", () => {
	const user = Game.players.find((p) => p.isUser);
	if (user && user.dead) Game.shootFromDead(user);
});
