const THEMES = [
	{
		bg: "linear-gradient(180deg, #fdfbfd 0%, #f9f4ff 100%)",
		board: "linear-gradient(180deg, #a18cd1 0%, #fbc2eb 100%)",
		accent: "#c471ed"
	},
	{
		bg: "linear-gradient(180deg, #fff5f5 0%, #ffe6e6 100%)",
		board: "linear-gradient(180deg, #ff9a9e 0%, #fecfef 100%)",
		accent: "#ff9a9e"
	},
	{
		bg: "linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%)",
		board: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
		accent: "#84fab0"
	},
	{
		bg: "linear-gradient(135deg, #fffaf0 0%, #fff5f5 100%)",
		board: "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)",
		accent: "#d57eeb"
	},
	{
		bg: "linear-gradient(135deg, #f3f0ff 0%, #ebf8ff 100%)",
		board: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
		accent: "#e0c3fc"
	},
	{
		bg: "linear-gradient(135deg, #f0ffff 0%, #fff0f5 100%)",
		board: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
		accent: "#a8edea"
	}
];

let currentThemeColor = "#c471ed";
const SYMBOLS_POOL = [
	"close",
	"radio_button_unchecked",
	"change_history",
	"crop_square",
	"diamond",
	"star_border",
	"hexagon",
	"bolt",
	"spa",
	"ac_unit",
	"filter_drama",
	"brightness_7"
];
const NAMES = [
	"The Weaver of Mist",
	"The Silent Mender",
	"The Void Sage",
	"The Drifting Echo",
	"The Observer of Time",
	"The Pale Guardian",
	"The Lunar Mystic",
	"The Hollow Voice",
	"Mistborne Custodian",
	"Echo of the Last Lantern",
	"Silent Veilwalker",
	"Keeper of Waning Runes",
	"Ashen-Seer of the Vale",
	"Warden of Quiet Horizons",
	"Oracle of Pale Tides",
	"Driftbound Pilgrim",
	"Shoreless Wanderer",
	"Sage of the Faint Pulse",
	"Celestial Threadbinder",
	"Watcher of the Fallow Sky",
	"Mender of Lost Whispers",
	"Horizon Shaper",
	"Seeker of Hollow Roads",
	"Voice Beneath the Stillwater",
	"Nomad of the Dim Path",
	"Gloomlight Scribe",
	"Whisperborne Herald",
	"Cartographer of Unseen Trails",
	"Keeper of the Last Ember",
	"Frostlit Observer",
	"Warden of Sleeping Fields",
	"Spirit of the Soft Quiet",
	"Moonwither Oracle",
	"Emberbound Listener",
	"Traveler of the Fading Crossroads",
	"Harvester of Silent Echoes",
	"Astral Thread Seeker",
	"Murmur of the Forgotten Well"
];

const DEFAULT_NAMES = NAMES;

const QUOTES = {
	WIN: [
		"The stars align in your favor.",
		"A perfect resonance is found.",
		"The dream stabilizes into form.",
		"Order emerges from the mist.",
		"The pattern reveals its hidden symmetry.",
		"Light gathers at your footsteps.",
		"Your intent shapes the current.",
		"The veil parts in quiet acceptance.",
		"All threads converge with grace.",
		"The echo sings in harmony with you.",
		"Even the void nods in approval.",
		"The tide bends around your will.",
		"A silent bloom unfolds within the moment.",
		"Clarity settles like falling snow.",
		"The unseen paths open to greet you.",
		"Balance leans gently toward your side.",
		"A soft radiance follows your choice.",
		"The horizon brightens for an instant.",
		"You rise through still air.",
		"The hum of creation steadies around you.",
		"Your step resonates with quiet strength.",
		"The drifting veil glimmers with promise.",
		"The world exhales in calm alignment.",
		"The lattice of fate responds in kind.",
		"A distant voice whispers approval.",
		"Your presence steadies the trembling fabric.",
		"The silence offers you a small smile.",
		"The wandering tide bows to your motion.",
		"The moment crowns you with subtle light.",
		"The hidden truth reflects your victory.",
		"Even the faintest echoes brighten.",
		"The void holds its breath in respect.",
		"A calm spark ignites within the ether.",
		"The mist folds itself around your triumph."
	],

	LOSE: [
		"The fracture widens.",
		"The echo drowns the signal.",
		"Chaos claims this moment.",
		"A lesson written in echoes.",
		"The ground trembles beneath misaligned fate.",
		"The mist recoils from your grasp.",
		"A quiet discord hums in the distance.",
		"The path slips from beneath your feet.",
		"A hollow chill lingers in the air.",
		"The tide abandons its rhythm.",
		"Your echo fades before it finds shape.",
		"The moment frays at the edges.",
		"A dull ache spreads through the pattern.",
		"Shadows reclaim their territory.",
		"Your step falls out of harmony.",
		"The world turns its face away for now.",
		"The lattice rejects your touch.",
		"The wind carries a muted warning.",
		"Clarity slips through your grasp.",
		"The horizon dims without hesitation.",
		"A faint crack disrupts the foundation.",
		"The whisper you reach for dissolves.",
		"The signal weakens into static.",
		"The air tightens with misfortune.",
		"The void answers with indifference.",
		"Your thread drifts into uncertainty.",
		"Stillness becomes uneasy around you.",
		"The current twists out of alignment.",
		"A silent tremor marks the moment.",
		"The unseen paths close their eyes.",
		"The echo returns without recognition.",
		"The moment folds against your intent.",
		"The mask of fate reveals cold neutrality.",
		"The dream rejects your footprint."
	],

	CHAOS: [
		"Reality ripples like water...",
		"A sudden shift in the wind.",
		"The laws of the void bend.",
		"Patterns unravel without warning.",
		"Time loops around your thoughts.",
		"Stillness trembles at the edges.",
		"The air flickers as if dreaming.",
		"Possibility multiplies in all directions.",
		"The mist rearranges itself in confusion.",
		"Nothing stands where it once did.",
		"The ground hums in strange resonance.",
		"A spark leaps between unseen points.",
		"Your senses blur into one another.",
		"The sky tilts for a heartbeat.",
		"Fate hesitates, then splits in two.",
		"The void laughs softly to itself.",
		"The horizon jumps forward a step.",
		"Uncertainty blossoms like wildfire.",
		"A ringing note echoes from nowhere.",
		"The moment twists into an impossible shape.",
		"Order loosens its grip on reality.",
		"Colors shift in unpredictable waves.",
		"The dream shivers awake.",
		"Shadows forget where they belong.",
		"The world blinks out, then in again.",
		"Heat and cold trade places.",
		"The edges of everything melt.",
		"A whisper becomes a roar, then silence.",
		"Crossroads multiply under your feet.",
		"The unseen stirs without intention.",
		"Gravity hums in a foreign scale.",
		"A familiar shape turns unfamiliar.",
		"Meaning unravels then reforms."
	],

	// TIMER
	TIMER: [
		"Time dissolves into mist.",
		"Hold fast to your essence.",
		"The moment slips away.",
		"Seconds unwind like loose thread.",
		"The clock hesitates in mid pulse.",
		"A soft chime echoes from nowhere.",
		"Your breath floats between stillness and hurry.",
		"Each instant grows thin around the edges.",
		"The world pauses in contemplative quiet.",
		"The next moment peers at you expectantly.",
		"You feel the weight of passing minutes.",
		"The present stretches, fragile and bright.",
		"Every heartbeat counts more than the last.",
		"The horizon blurs with fleeting light.",
		"The tick behind your ear slows.",
		"The future leans closer with curiosity.",
		"Moments begin to drip like water.",
		"Your shadow shortens in anticipation.",
		"Silence grows warm with waiting.",
		"Time coils gently at your feet.",
		"The pace of the world sidesteps you.",
		"Your focus sharpens despite the tide.",
		"Night and day blur at the seams.",
		"A faint ringing marks the transition.",
		"The next heartbeat pulls you forward.",
		"Stillness holds you for a breath.",
		"Your thoughts move faster than time.",
		"The minute hand stirs impatiently.",
		"The present exhales a thin sigh.",
		"The tempo around you fluctuates.",
		"Moments crumble like dried petals.",
		"The now becomes a fleeting spark.",
		"Your awareness glows in the pause."
	]
};

const EVENT_DEFS = [
	{
		id: "gravity",
		name: "Tide",
		desc: "The heavy pull of the tide moves all marks."
	},
	{
		id: "scramble",
		name: "Ripple",
		desc: "A disturbance scatters the pattern."
	},
	{
		id: "vertigo",
		name: "Tilt",
		desc: "The world turns on its unseen axis."
	},
	{
		id: "doppel",
		name: "Mirage",
		desc: "A deceptive shape manifests from nothing."
	},
	{
		id: "fog",
		name: "Veil",
		desc: "A thick mist obscures the truth."
	},
	{
		id: "intruder",
		name: "Artifact",
		desc: "Ancient debris clutters the void."
	},
	{
		id: "vacuum",
		name: "Hollow",
		desc: "Existence is consumed by a sudden void."
	},
	{
		id: "frost",
		name: "Silence",
		desc: "A cold stillness freezes time in a cell."
	},
	{
		id: "crosswind",
		name: "Bloom",
		desc: "A mark expands into its neighbors."
	},
	{
		id: "gust",
		name: "Lapse",
		desc: "A memory fades into nothingness."
	},
	{
		id: "expand",
		name: "Horizon",
		desc: "The boundaries of the dream stretch further."
	},
	{
		id: "new_player",
		name: "Presence",
		desc: "Another soul enters the drift."
	}
];

let CONFIG = {
	size: 6,
	win: 3,
	enemies: 2,
	baseTime: 3000,
	difficulty: 1,
	startLives: 3
};

function applyRandomTheme() {
	const t = THEMES[Math.floor(Math.random() * THEMES.length)];
	document.body.style.background = t.bg;
	document.documentElement.style.setProperty("--board-grad", t.board);
	document.documentElement.style.setProperty("--accent", t.accent);
	currentThemeColor = t.accent;
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const masterGain = audioCtx.createGain();
masterGain.connect(audioCtx.destination);
masterGain.gain.value = 0.3;
let isMuted = false;

class AmbientMusic {
	constructor() {
		this.playing = false;
		this.timer = null;
		this.notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];
	}
	playNote() {
		if (!this.playing || audioCtx.state === "suspended") return;
		const freq = this.notes[Math.floor(Math.random() * this.notes.length)];
		const osc = audioCtx.createOscillator();
		const gain = audioCtx.createGain();
		const filter = audioCtx.createBiquadFilter();
		osc.type = "sine";
		osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
		filter.type = "lowpass";
		filter.frequency.setValueAtTime(800, audioCtx.currentTime);
		const now = audioCtx.currentTime;
		const dur = 4 + Math.random() * 2;
		gain.gain.setValueAtTime(0, now);
		gain.gain.linearRampToValueAtTime(0.08, now + 2);
		gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
		osc.connect(filter);
		filter.connect(gain);
		gain.connect(masterGain);
		osc.start();
		osc.stop(now + dur + 1);
		this.timer = setTimeout(() => this.playNote(), Math.random() * 2000 + 1500);
	}
	start() {
		if (this.playing) return;
		this.playing = true;
		if (audioCtx.state === "suspended") audioCtx.resume();
		this.playNote();
	}
	stop() {
		this.playing = false;
		clearTimeout(this.timer);
	}
}

const MUSIC = new AmbientMusic();

const SOUNDS = {
	play: (freq, type, dur, vol = 0.05) => {
		if (audioCtx.state === "suspended") audioCtx.resume();
		const o = audioCtx.createOscillator();
		const g = audioCtx.createGain();
		o.type = type;
		o.frequency.setValueAtTime(freq, audioCtx.currentTime);
		g.gain.setValueAtTime(0, audioCtx.currentTime);
		g.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + 0.05);
		g.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
		o.connect(g);
		g.connect(masterGain);
		o.start();
		o.stop(audioCtx.currentTime + dur);
	},
	move: () => SOUNDS.play(600, "sine", 0.2, 0.08),
	winRound: () => {
		SOUNDS.play(523, "sine", 0.4);
		setTimeout(() => SOUNDS.play(659, "sine", 0.4), 100);
		setTimeout(() => SOUNDS.play(783, "sine", 0.6), 200);
	},
	loseRound: () => {
		SOUNDS.play(400, "sine", 0.4);
		setTimeout(() => SOUNDS.play(300, "sine", 0.6), 200);
	},
	newRival: () => {
		SOUNDS.play(200, "sine", 0.8, 0.1);
		setTimeout(() => SOUNDS.play(150, "sine", 0.8, 0.1), 200);
	}
};

class BackgroundAnim {
	constructor() {
		this.canvas = document.getElementById("bg-canvas");
		this.ctx = this.canvas.getContext("2d");
		this.items = [];
		this.symbols = SYMBOLS_POOL;
		this.resize();
		window.addEventListener("resize", () => this.resize());
		this.mouseX = -1000;
		this.mouseY = -1000;
		window.addEventListener("mousemove", (e) => {
			this.mouseX = e.clientX;
			this.mouseY = e.clientY;
		});
		this.initItems();
		this.loop();
	}
	resize() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}
	initItems() {
		for (let i = 0; i < 16; i++) {
			this.items.push({
				x: Math.random() * this.canvas.width,
				y: Math.random() * this.canvas.height,
				size: Math.random() * 40 + 20,
				symbol: this.symbols[Math.floor(Math.random() * this.symbols.length)],
				vx: (Math.random() - 0.5) * 0.4,
				vy: (Math.random() - 0.5) * 0.4,
				rotation: Math.random() * Math.PI * 2,
				vRot: (Math.random() - 0.5) * 0.01
			});
		}
	}
	loop() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.items.forEach((o) => {
			let dx = o.x - this.mouseX;
			let dy = o.y - this.mouseY;
			let dist = Math.sqrt(dx * dx + dy * dy);
			if (dist < 150) {
				let force = (150 - dist) / 150;
				o.vx += (dx / dist) * force * 0.05;
				o.vy += (dy / dist) * force * 0.05;
			}
			o.x += o.vx;
			o.y += o.vy;
			o.rotation += o.vRot;
			o.vx *= 0.99;
			o.vy *= 0.99;
			if (o.x < -100) o.x = this.canvas.width + 100;
			if (o.x > this.canvas.width + 100) o.x = -100;
			if (o.y < -100) o.y = this.canvas.height + 100;
			if (o.y > this.canvas.height + 100) o.y = -100;
			this.ctx.save();
			this.ctx.translate(o.x, o.y);
			this.ctx.rotate(o.rotation);
			this.ctx.font = `${o.size}px 'Material Icons'`;
			this.ctx.textAlign = "center";
			this.ctx.textBaseline = "middle";
			this.ctx.fillStyle = currentThemeColor;
			this.ctx.globalAlpha = 0.15;
			this.ctx.fillText(o.symbol, 0, 0);
			this.ctx.restore();
		});
		requestAnimationFrame(() => this.loop());
	}
}

new BackgroundAnim();

function getQuote(type) {
	return QUOTES[type][Math.floor(Math.random() * QUOTES[type].length)];
}

function toast(msg, type = "normal", icon = "info") {
	const c = document.getElementById("toast-container");
	c.innerHTML = "";
	const el = document.createElement("div");
	el.className = `toast ${type}`;
	el.innerHTML = `${msg} <i class="material-icons">${icon}</i>`;
	c.appendChild(el);
	setTimeout(() => {
		if (el.parentNode) el.parentNode.removeChild(el);
	}, 4000);
}

let selectedPlayerSymbol = "close";
let ACTIVE_EVENTS = {};
EVENT_DEFS.forEach((e) => (ACTIVE_EVENTS[e.id] = true));

const STATE = {
	grid: [],
	turn: 0,
	players: [],
	active: false,
	paused: false,
	startTime: 0,
	timeLimit: 0,
	fog: null,
	lives: 3,
	roundsWon: 0,
	roundStreak: 0,
	floatingTexts: [],
	chaosBag: [],
	cpuTimerId: null,
	winningLine: null,
	ripples: [],
	mouse: {
		x: -1000,
		y: -1000
	}
};

class Player {
	constructor(id, symbol, customName) {
		this.id = id;
		this.isHuman = id === 0;
		this.name = this.isHuman ? customName || "You" : NAMES[id % NAMES.length];
		this.symbol = symbol;
		this.score = 0;
		this.lives = 3;
	}
}

class Cell {
	constructor(r, c) {
		this.r = r;
		this.c = c;
		this.owner = null;
		this.visualOwner = null;
		this.frozen = false;
		this.alpha = 0;
		this.highlight = false;
	}
	set(owner) {
		this.owner = owner;
		this.visualOwner = owner;
		this.alpha = 0;
		spawnParticles(this.c, this.r, 8);
		addRipple(this.c, this.r);
		SOUNDS.move();
	}
	update() {
		if (this.alpha < 1) this.alpha += 0.05;
	}
}

let particles = [];
class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		const a = Math.random() * 6.28,
			s = Math.random() * 1.0;
		this.vx = Math.cos(a) * s;
		this.vy = Math.sin(a) * s;
		this.life = 1.0;
		this.decay = Math.random() * 0.02 + 0.01;
	}
	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.life -= this.decay;
	}
	draw(ctx) {
		ctx.globalAlpha = this.life * 0.5;
		ctx.fillStyle = "#fff";
		ctx.beginPath();
		ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalAlpha = 1;
	}
}

class Ripple {
	constructor(x, y, cs) {
		this.x = x;
		this.y = y;
		this.r = 0;
		this.maxR = cs * 0.8;
		this.alpha = 1;
		this.lw = 3;
	}
	update() {
		this.r += 2;
		this.alpha -= 0.04;
		this.lw -= 0.1;
	}
	draw(ctx) {
		if (this.alpha <= 0) return;
		ctx.save();
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.strokeStyle = `rgba(255,255,255,${this.alpha})`;
		ctx.lineWidth = Math.max(0.1, this.lw);
		ctx.stroke();
		ctx.restore();
	}
}

class FloatingText {
	constructor(x, y, text) {
		this.x = x;
		this.y = y;
		this.text = text;
		this.life = 1.0;
		this.vy = -1.5;
	}
	update() {
		this.y += this.vy;
		this.life -= 0.02;
	}
	draw(ctx) {
		ctx.save();
		ctx.globalAlpha = Math.max(0, this.life);
		ctx.fillStyle = "var(--accent)";
		ctx.font = "bold 20px 'Helvetica Neue', Arial, sans-serif";
		ctx.textAlign = "center";
		ctx.shadowColor = "rgba(255,255,255,0.8)";
		ctx.shadowBlur = 4;
		ctx.fillText(this.text, this.x, this.y);
		ctx.restore();
	}
}

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const uiStats = {
	lives: document.getElementById("disp-lives"),
	score: document.getElementById("disp-score"),
	turn: document.getElementById("turn-text"),
	timer: document.getElementById("timer-bar"),
	board: document.getElementById("canvas-wrap")
};

function resizeCanvas() {
	const rect = canvas.parentElement.getBoundingClientRect();
	canvas.width = rect.width;
	canvas.height = rect.height;
}
window.addEventListener("resize", resizeCanvas);
window.addEventListener("blur", () => {
	if (STATE.active && !STATE.paused) togglePause();
});

document.getElementById("music-ctrl").addEventListener("click", (e) => {
	isMuted = !isMuted;
	if (isMuted) {
		masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
		e.currentTarget.innerHTML = '<i class="material-icons">volume_off</i>';
		e.currentTarget.style.color = "#bbb";
	} else {
		if (audioCtx.state === "suspended") audioCtx.resume();
		masterGain.gain.setValueAtTime(1, audioCtx.currentTime);
		e.currentTarget.innerHTML = '<i class="material-icons">volume_up</i>';
		e.currentTarget.style.color = "var(--accent)";
		if (!MUSIC.playing) MUSIC.start();
	}
});

canvas.addEventListener("mousemove", (e) => {
	const r = canvas.getBoundingClientRect();
	STATE.mouse.x = e.clientX - r.left;
	STATE.mouse.y = e.clientY - r.top;
});
canvas.addEventListener("mouseleave", () => {
	STATE.mouse.x = -1000;
	STATE.mouse.y = -1000;
});
canvas.addEventListener("mousedown", (e) =>
	handleInteraction(e.clientX, e.clientY)
);
canvas.addEventListener(
	"touchstart",
	(e) => {
		e.preventDefault();
		handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
	},
	{
		passive: false
	}
);

function handleInteraction(cx, cy) {
	if (STATE.paused || !STATE.active || STATE.turn !== 0) return;
	const r = canvas.getBoundingClientRect();
	const cs = canvas.width / CONFIG.size;
	const c = Math.floor((cx - r.left) / cs);
	const row = Math.floor((cy - r.top) / cs);
	if (row >= 0 && row < CONFIG.size && c >= 0 && c < CONFIG.size) {
		if (STATE.grid[row][c].owner === null && !STATE.grid[row][c].frozen) {
			STATE.active = false;
			STATE.grid[row][c].set(0);
			addScore(10, cx - r.left, cy - r.top);
			checkRoundEnd(0);
		}
	}
}

document.getElementById("inp-name").value =
	DEFAULT_NAMES[Math.floor(Math.random() * DEFAULT_NAMES.length)];
const symContainer = document.getElementById("sym-select-row");
SYMBOLS_POOL.forEach((sym) => {
	const btn = document.createElement("div");
	btn.className = "sym-btn";
	if (sym === selectedPlayerSymbol) btn.classList.add("selected");
	btn.innerHTML = `<i class="material-icons">${sym}</i>`;
	btn.addEventListener("click", () => {
		document
			.querySelectorAll(".sym-btn")
			.forEach((b) => b.classList.remove("selected"));
		btn.classList.add("selected");
		selectedPlayerSymbol = sym;
	});
	symContainer.appendChild(btn);
});

const listContainer = document.getElementById("events-list-container");
EVENT_DEFS.forEach((ev) => {
	const div = document.createElement("div");
	div.className = "event-item";
	div.innerHTML = `
            <div class="event-head">
                <input type="checkbox" id="chk-${ev.id}" checked>
                <span>${ev.name}</span>
            </div>
            <div class="event-desc">${ev.desc}</div>`;
	listContainer.appendChild(div);
	div.querySelector("input").addEventListener("change", (e) => {
		ACTIVE_EVENTS[ev.id] = e.target.checked;
	});
});

document.getElementById("btn-events").addEventListener("click", () => {
	document.getElementById("modal-events").style.display = "flex";
});
document.getElementById("btn-close-events").addEventListener("click", () => {
	document.getElementById("modal-events").style.display = "none";
});

document.querySelectorAll(".btn-close-overlay").forEach((btn) => {
	btn.addEventListener("click", () => {
		document
			.querySelectorAll(".overlay")
			.forEach((o) => (o.style.display = "none"));
	});
});

document.getElementById("btn-open-intro").addEventListener("click", () => {
	document.getElementById("modal-intro").style.display = "flex";
});
document.getElementById("btn-open-theory").addEventListener("click", () => {
	document.getElementById("modal-theory").style.display = "flex";
});
document.getElementById("btn-open-rules").addEventListener("click", () => {
	document.getElementById("modal-rules").style.display = "flex";
});
document.getElementById("btn-open-about").addEventListener("click", () => {
	document.getElementById("modal-about").style.display = "flex";
});

document.getElementById("btn-start").addEventListener("click", initGame);
document.getElementById("btn-pause").addEventListener("click", togglePause);
document.getElementById("btn-resume").addEventListener("click", togglePause);
document.getElementById("btn-quit").addEventListener("click", toMenu);
document.getElementById("btn-menu-back").addEventListener("click", toMenu);
document.getElementById("btn-replay").addEventListener("click", () => {
	document.getElementById("modal-over").style.display = "none";
	initGame();
});

function toMenu() {
	STATE.active = false;
	document
		.querySelectorAll(".overlay")
		.forEach((o) => (o.style.display = "none"));
	document.getElementById("game-view").style.display = "none";
	document.getElementById("menu").style.display = "flex";
	document.getElementById("top-socials").classList.remove("hidden");
	document.getElementById("toast-container").innerHTML = "";
	MUSIC.stop();
}

function getUniqueSymbol(existingPlayers) {
	const used = existingPlayers.map((p) => p.symbol);
	const available = SYMBOLS_POOL.filter((s) => !used.includes(s));
	return available.length > 0
		? available[Math.floor(Math.random() * available.length)]
		: "help_outline";
}

function initGame() {
	document.getElementById("menu").style.display = "none";
	document.getElementById("top-socials").classList.add("hidden");

	document.getElementById("game-view").style.display = "flex";
	resizeCanvas();
	applyRandomTheme();
	if (audioCtx.state === "suspended") audioCtx.resume();
	MUSIC.start();
	if (!isMuted) {
		document.getElementById("music-ctrl").style.color = "var(--accent)";
		document.getElementById("music-ctrl").innerHTML =
			'<i class="material-icons">volume_up</i>';
	}
	CONFIG.size = parseInt(document.getElementById("inp-size").value);
	CONFIG.win = parseInt(document.getElementById("inp-win").value);
	CONFIG.enemies = parseInt(document.getElementById("inp-enemies").value);
	CONFIG.difficulty = parseInt(document.getElementById("inp-diff").value);
	CONFIG.startLives = parseInt(document.getElementById("inp-lives").value);
	CONFIG.baseTime = parseFloat(document.getElementById("inp-time").value) * 1000;
	STATE.roundsWon = 0;
	STATE.roundStreak = 0;
	STATE.timeLimit = CONFIG.baseTime;
	STATE.chaosBag = [];
	const pName = document.getElementById("inp-name").value || "Player";
	STATE.players = [new Player(0, selectedPlayerSymbol, pName)];
	STATE.players[0].lives = CONFIG.startLives;
	let availableNames = [...NAMES];
	availableNames.sort(() => Math.random() - 0.5);
	for (let i = 1; i <= CONFIG.enemies; i++) {
		let sym = getUniqueSymbol(STATE.players);
		let p = new Player(i, sym);
		p.lives = 3;
		if (i <= availableNames.length) p.name = availableNames[i - 1];
		STATE.players.push(p);
	}
	startNewRound();
	gameLoop();
}

function startNewRound() {
	STATE.grid = Array(CONFIG.size)
		.fill(null)
		.map((_, r) =>
			Array(CONFIG.size)
				.fill(null)
				.map((_, c) => new Cell(r, c))
		);
	STATE.floatingTexts = [];
	STATE.fog = null;
	if (STATE.roundsWon > 0) applyRandomTheme();
	particles = [];
	STATE.winningLine = null;
	STATE.ripples = [];
	STATE.turn = Math.floor(Math.random() * STATE.players.length);
	STATE.active = true;
	STATE.paused = false;
	STATE.startTime = Date.now();
	updateHUD();
	toast(`Cycle ${STATE.roundsWon + 1} awakens.`, "normal", "autorenew");
	processTurn();
}

function drawFluidLine(x1, y1, x2, y2, segments) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	const dx = (x2 - x1) / segments;
	const dy = (y2 - y1) / segments;
	const time = Date.now() * 0.002;
	for (let i = 1; i < segments; i++) {
		let px = x1 + dx * i;
		let py = y1 + dy * i;
		const dist = Math.hypot(px - STATE.mouse.x, py - STATE.mouse.y);
		const maxDist = 120;
		let offset = Math.sin(time + i * 0.5) * 1.5;
		if (dist < maxDist) {
			const power = (1 - dist / maxDist) * 15;
			const angle = Math.atan2(py - STATE.mouse.y, px - STATE.mouse.x);
			px += Math.cos(angle) * power;
			py += Math.sin(angle) * power;
		}
		if (Math.abs(x2 - x1) < 1) px += offset;
		else py += offset;
		ctx.lineTo(px, py);
	}
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function gameLoop() {
	requestAnimationFrame(gameLoop);
	if (STATE.paused) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const cs = canvas.width / CONFIG.size;
	const pulse = 0.4 + Math.sin(Date.now() * 0.002) * 0.2;
	ctx.strokeStyle = `rgba(255,255,255,${pulse})`;
	ctx.lineWidth = 2;
	for (let i = 1; i < CONFIG.size; i++)
		drawFluidLine(i * cs, 0, i * cs, canvas.height, 20);
	for (let i = 1; i < CONFIG.size; i++)
		drawFluidLine(0, i * cs, canvas.width, i * cs, 20);
	if (STATE.active && STATE.turn === 0 && STATE.mouse.x > 0) {
		const hC = Math.floor(STATE.mouse.x / cs);
		const hR = Math.floor(STATE.mouse.y / cs);
		if (hR >= 0 && hR < CONFIG.size && hC >= 0 && hC < CONFIG.size) {
			ctx.save();
			ctx.strokeStyle = "rgba(255,255,255, 0.8)";
			ctx.lineWidth = 4;
			ctx.shadowBlur = 15;
			ctx.shadowColor = "white";
			ctx.strokeRect(hC * cs + 4, hR * cs + 4, cs - 8, cs - 8);
			ctx.restore();
			if (STATE.grid[hR][hC].owner === null) {
				ctx.save();
				ctx.globalAlpha = 0.4;
				ctx.fillStyle = "#fff";
				ctx.font = `${cs * 0.5}px 'Material Icons'`;
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillText(STATE.players[0].symbol, hC * cs + cs / 2, hR * cs + cs / 2);
				ctx.restore();
			}
		}
	}
	for (let i = STATE.ripples.length - 1; i >= 0; i--) {
		let r = STATE.ripples[i];
		r.update();
		r.draw(ctx);
		if (r.alpha <= 0) STATE.ripples.splice(i, 1);
	}
	for (let r = 0; r < CONFIG.size; r++) {
		for (let c = 0; c < CONFIG.size; c++) {
			const cell = STATE.grid[r][c];
			cell.update();
			const cx = c * cs + cs / 2,
				cy = r * cs + cs / 2;
			if (STATE.fog) {
				let hidden = false;
				if (STATE.fog.type === "row" && r === STATE.fog.val) hidden = true;
				if (STATE.fog.type === "col" && c === STATE.fog.val) hidden = true;
				if (STATE.fog.type === "diag" && r === c && STATE.fog.val === 0)
					hidden = true;
				if (
					STATE.fog.type === "diag" &&
					r + c === CONFIG.size - 1 &&
					STATE.fog.val === 1
				)
					hidden = true;
				if (hidden) {
					ctx.fillStyle = `rgba(255,255,255,${0.2 + Math.random() * 0.1})`;
					ctx.fillRect(c * cs, r * cs, cs, cs);
					continue;
				}
			}
			if (cell.frozen) {
				ctx.fillStyle = "rgba(200,230,255,0.3)";
				ctx.fillRect(c * cs, r * cs, cs, cs);
			}
			if (cell.visualOwner !== null) {
				ctx.globalAlpha = cell.alpha;
				if (cell.visualOwner === 999) {
					ctx.fillStyle = "#888";
					ctx.beginPath();
					ctx.arc(cx, cy, cs / 4, 0, Math.PI * 2);
					ctx.fill();
				} else {
					if (cell.highlight) {
						ctx.fillStyle = "rgba(255,255,255,0.3)";
						ctx.fillRect(c * cs, r * cs, cs, cs);
						ctx.shadowBlur = 20;
						ctx.shadowColor = "#fff";
					}
					let owner = STATE.players.find((p) => p.id === cell.visualOwner);
					let sym = owner ? owner.symbol : "help_outline";
					ctx.fillStyle = "#fff";
					ctx.font = `${cs * 0.5}px 'Material Icons'`;
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.fillText(sym, cx, cy);
					ctx.shadowBlur = 0;
				}
				ctx.globalAlpha = 1;
			}
		}
	}
	if (STATE.winningLine && STATE.winningLine.length > 0) {
		const start = STATE.winningLine[0];
		const end = STATE.winningLine[STATE.winningLine.length - 1];
		ctx.strokeStyle = "#fff";
		ctx.lineWidth = 6;
		ctx.lineCap = "round";
		ctx.shadowBlur = 15;
		ctx.shadowColor = "#fff";
		ctx.beginPath();
		ctx.moveTo(start.c * cs + cs / 2, start.r * cs + cs / 2);
		ctx.lineTo(end.c * cs + cs / 2, end.r * cs + cs / 2);
		ctx.stroke();
		ctx.lineWidth = 1;
		ctx.shadowBlur = 0;
	}
	for (let i = particles.length - 1; i >= 0; i--) {
		let p = particles[i];
		p.update();
		p.draw(ctx);
		if (p.life <= 0) particles.splice(i, 1);
	}
	for (let i = STATE.floatingTexts.length - 1; i >= 0; i--) {
		let ft = STATE.floatingTexts[i];
		ft.update();
		ft.draw(ctx);
		if (ft.life <= 0) STATE.floatingTexts.splice(i, 1);
	}
	if (STATE.active) {
		const elapsed = Date.now() - STATE.startTime;
		const remaining = Math.max(0, STATE.timeLimit - elapsed);
		uiStats.timer.style.transform = `scaleX(${remaining / STATE.timeLimit})`;
		if (remaining <= 0) {
			STATE.startTime = Date.now();
			triggerPulse();
		}
	}
}

function spawnParticles(c, r, num) {
	const cs = canvas.width / CONFIG.size;
	for (let i = 0; i < num; i++)
		particles.push(new Particle(c * cs + cs / 2, r * cs + cs / 2));
}

function addRipple(c, r) {
	const cs = canvas.width / CONFIG.size;
	STATE.ripples.push(new Ripple(c * cs + cs / 2, r * cs + cs / 2, cs));
}

function addScore(pts, x, y) {
	STATE.players[0].score += pts;
	if (x && y) STATE.floatingTexts.push(new FloatingText(x, y, `+${pts}`));
	updateHUD();
}

function updateHUD() {
	let hearts = "";
	for (let k = 0; k < STATE.players[0].lives; k++)
		hearts += '<i class="material-icons">favorite</i>';
	uiStats.lives.innerHTML = hearts;
	uiStats.score.innerText = STATE.players[0].score;
	let base = [0.0, 0.25, 0.5, 0.75, 0.95, 1.0][CONFIG.difficulty];
	let current = Math.floor((base + STATE.roundsWon * 0.05) * 100);
	document.getElementById(
		"presence-header"
	).innerHTML = `Presences <span style="font-size:0.6em; opacity:0.7; margin-left:5px;">(AI: ${current}%)</span>`;
	const list = document.getElementById("player-list");
	list.innerHTML = "";
	STATE.players.forEach((p, idx) => {
		const card = document.createElement("div");
		card.className = `player-card ${
			STATE.turn === idx ? (p.isHuman ? "active" : "active-cpu") : ""
		}`;
		let pHearts = "";
		for (let h = 0; h < p.lives; h++)
			pHearts +=
				'<i class="material-icons" style="font-size:10px; color:var(--accent)">favorite</i>';
		card.innerHTML = `
                <div class="p-symbol"><i class="material-icons">${p.symbol}</i></div>
                <div class="p-info">
                    <div class="p-name">${p.name}</div>
                    <div class="p-details">
                        <span>${pHearts}</span>
                        <span>Score: ${p.score}</span>
                    </div>
                </div>
            `;
		list.appendChild(card);
	});
}

function processTurn() {
	if (!STATE.active) return;
	STATE.startTime = Date.now();
	if (STATE.cpuTimerId) clearTimeout(STATE.cpuTimerId);
	const currentPlayer = STATE.players[STATE.turn];
	uiStats.turn.innerText = currentPlayer.isHuman
		? "Your Moment"
		: `${currentPlayer.name} Reflecting...`;
	if (currentPlayer.isHuman) {
		uiStats.timer.style.backgroundColor = "var(--accent)";
		uiStats.board.classList.remove("desaturated");
	} else {
		uiStats.timer.style.backgroundColor = "#aaa";
		uiStats.board.classList.add("desaturated");
	}
	updateHUD();
	if (!currentPlayer.isHuman) {
		const pct = 0.2 + Math.random() * 0.4;
		const delay = STATE.timeLimit * pct;
		STATE.cpuTimerId = setTimeout(() => {
			if (STATE.active && !STATE.paused) cpuMove(currentPlayer.id);
		}, delay);
	}
}

function cpuMove(pid) {
	const size = CONFIG.size;
	const empties = [];
	for (let r = 0; r < size; r++) {
		for (let c = 0; c < size; c++) {
			if (STATE.grid[r][c].owner === null && !STATE.grid[r][c].frozen)
				empties.push({
					r,
					c
				});
		}
	}
	if (empties.length === 0) return;
	let baseChance = [0.0, 0.25, 0.5, 0.75, 0.95, 1.0][CONFIG.difficulty];
	let smartChance = baseChance + STATE.roundsWon * 0.05;
	if (smartChance > 1.0) smartChance = 1.0;
	let move = null;
	if (Math.random() < smartChance) {
		for (let e of empties) {
			STATE.grid[e.r][e.c].owner = pid;
			if (checkWin(pid)) {
				move = e;
				STATE.grid[e.r][e.c].owner = null;
				break;
			}
			STATE.grid[e.r][e.c].owner = null;
		}
		if (!move) {
			for (let e of empties) {
				for (let otherP of STATE.players) {
					if (otherP.id !== pid) {
						STATE.grid[e.r][e.c].owner = otherP.id;
						if (checkWin(otherP.id)) {
							move = e;
							STATE.grid[e.r][e.c].owner = null;
							break;
						}
						STATE.grid[e.r][e.c].owner = null;
					}
				}
				if (move) break;
			}
		}
	}
	if (!move) move = empties[Math.floor(Math.random() * empties.length)];
	if (move) {
		STATE.grid[move.r][move.c].set(pid);
		checkRoundEnd(pid);
	}
}

function checkWin(pid) {
	const N = CONFIG.size,
		K = CONFIG.win;
	const check = (r, c, dr, dc) => {
		for (let i = 0; i < K; i++) {
			let nr = r + i * dr,
				nc = c + i * dc;
			if (
				nr < 0 ||
				nr >= N ||
				nc < 0 ||
				nc >= N ||
				STATE.grid[nr][nc].owner !== pid
			)
				return false;
		}
		return true;
	};
	for (let r = 0; r < N; r++)
		for (let c = 0; c < N; c++) {
			if (STATE.grid[r][c].owner !== pid) continue;
			if (
				check(r, c, 0, 1) ||
				check(r, c, 1, 0) ||
				check(r, c, 1, 1) ||
				check(r, c, 1, -1)
			)
				return true;
		}
	return false;
}

function getWinningLine(pid) {
	const N = CONFIG.size,
		K = CONFIG.win;
	const check = (r, c, dr, dc) => {
		let line = [];
		for (let i = 0; i < K; i++) {
			let nr = r + i * dr,
				nc = c + i * dc;
			if (
				nr < 0 ||
				nr >= N ||
				nc < 0 ||
				nc >= N ||
				STATE.grid[nr][nc].owner !== pid
			)
				return null;
			line.push({
				r: nr,
				c: nc
			});
		}
		return line;
	};
	for (let r = 0; r < N; r++)
		for (let c = 0; c < N; c++) {
			if (STATE.grid[r][c].owner !== pid) continue;
			let l =
				check(r, c, 0, 1) ||
				check(r, c, 1, 0) ||
				check(r, c, 1, 1) ||
				check(r, c, 1, -1);
			if (l) return l;
		}
	return null;
}

function checkRoundEnd(pid) {
	if (pid !== 99 && checkWin(pid)) {
		STATE.active = false;
		const line = getWinningLine(pid);
		handleRoundOver(pid, line);
		return;
	}
	let full = true;
	for (let r = 0; r < CONFIG.size; r++)
		if (STATE.grid[r].some((c) => c.owner === null)) full = false;
	if (full) {
		STATE.active = false;
		handleRoundOver(-1);
		return;
	}
	STATE.fog = null;
	STATE.turn = (STATE.turn + 1) % STATE.players.length;
	STATE.active = true;
	processTurn();
}

function triggerShake() {
	const stage = document.getElementById("stage-area");
	stage.classList.remove("shake");
	void stage.offsetWidth;
	stage.classList.add("shake");
}

function handleRoundOver(winnerId, winningLine) {
	if (winningLine) {
		STATE.winningLine = winningLine;
		winningLine.forEach((pos) => {
			STATE.grid[pos.r][pos.c].highlight = true;
			spawnParticles(pos.c, pos.r, 20);
		});
	}
	setTimeout(() => {
		if (winnerId === STATE.players[0].id) {
			SOUNDS.winRound();
			STATE.roundsWon++;
			STATE.roundStreak++;
			STATE.players[0].score += 500;
			STATE.players.forEach((p) => {
				if (!p.isHuman) p.lives--;
			});
			toast(
				`Harmony restored by ${STATE.players[0].name}. ${getQuote("WIN")}`,
				"gain",
				"emoji_events"
			);
			checkRivalDeaths();
			if (STATE.roundStreak % 3 === 0) {
				STATE.players[0].lives++;
				toast("The spirit mends.", "gain", "favorite");
			}
			setTimeout(() => startNewRound(), 2500);
		} else if (winnerId === -1) {
			STATE.players.forEach((p) => {
				if (!p.isHuman) p.lives--;
			});
			toast("The dream halts. Silence reigns.", "gain", "remove_circle_outline");
			checkRivalDeaths();
			setTimeout(() => startNewRound(), 2000);
		} else {
			let winner = STATE.players.find((p) => p.id === winnerId);
			if (winner) {
				winner.score += 500;
				toast(
					`Aligned by ${winner.name}. ${getQuote("LOSE")}`,
					"chaos",
					winner.symbol
				);
			}
			SOUNDS.loseRound();
			STATE.players[0].lives--;
			STATE.roundStreak = 0;
			updateHUD();
			triggerShake();
			if (STATE.players[0].lives <= 0) {
				STATE.active = false;
				document.getElementById("modal-over").style.display = "flex";
				document.getElementById("final-score").innerText = STATE.players[0].score;
				MUSIC.stop();
			} else {
				toast("The spirit fractures.", "chaos", "broken_image");
				setTimeout(() => startNewRound(), 2500);
			}
		}
	}, 1500);
}

function checkRivalDeaths() {
	const initialCount = STATE.players.length;
	STATE.players = STATE.players.filter((p) => p.isHuman || p.lives > 0);
	if (STATE.players.length < initialCount) spawnNewRival();
}

function spawnNewRival() {
	SOUNDS.newRival();
	if (CONFIG.difficulty === 5)
		STATE.timeLimit = Math.max(500, STATE.timeLimit * 0.9);
	let newId = 99 + Math.floor(Math.random() * 100);
	let sym = getUniqueSymbol(STATE.players);
	let p = new Player(newId, sym);
	p.lives = 3;
	p.name = "Echo";
	STATE.players.push(p);
	toast("A Deepening Shape Arrives...", "chaos", "visibility");
}

function togglePause() {
	if (!STATE.active) return;
	STATE.paused = !STATE.paused;
	document.getElementById("modal-pause").style.display = STATE.paused
		? "flex"
		: "none";
	if (STATE.paused) toast("Time holds its breath.", "gain", "hourglass_empty");
}

function triggerPulse() {
	if (STATE.cpuTimerId) clearTimeout(STATE.cpuTimerId);
	triggerShake();
	const culprit = STATE.players[STATE.turn];
	culprit.lives--;
	updateHUD();
	if (culprit.isHuman) {
		toast(getQuote("TIMER"), "chaos", "timer_off");
		if (culprit.lives <= 0) {
			SOUNDS.loseRound();
			STATE.active = false;
			document.getElementById("modal-over").style.display = "flex";
			document.getElementById("final-score").innerText = STATE.players[0].score;
			MUSIC.stop();
			return;
		}
	} else {
		toast(`${culprit.name} faded into silence`, "gain", "timer_off");
		if (culprit.lives <= 0) checkRivalDeaths();
	}
	let available = Object.keys(ACTIVE_EVENTS).filter((k) => ACTIVE_EVENTS[k]);
	if (available.length > 0) {
		if (STATE.chaosBag.length === 0) {
			STATE.chaosBag = [...available];
			STATE.chaosBag.sort(() => Math.random() - 0.5);
		}
		let eventId = STATE.chaosBag.pop();
		while (eventId && !ACTIVE_EVENTS[eventId]) {
			if (STATE.chaosBag.length === 0) break;
			eventId = STATE.chaosBag.pop();
		}
		if (eventId) {
			const evDef = EVENT_DEFS.find((e) => e.id === eventId);
			const name = evDef ? evDef.name : "Pulse";
			toast(`${name}: ${getQuote("CHAOS")}`, "chaos", "flash_on");
			spawnParticles(CONFIG.size * 20, CONFIG.size * 20, 20);
			applyEventEffect(eventId);
		}
	}
	if (STATE.active) checkRoundEnd(99);
}

function applyEventEffect(eventId) {
	const refreshGrid = (newSize) => {
		const s = newSize || CONFIG.size;
		return Array(s)
			.fill(null)
			.map((_, r) =>
				Array(s)
					.fill(null)
					.map((_, c) => new Cell(r, c))
			);
	};
	if (eventId === "expand") {
		if (CONFIG.size < 8) {
			const oldSize = CONFIG.size;
			CONFIG.size++;
			const newGrid = refreshGrid(CONFIG.size);
			for (let r = 0; r < oldSize; r++) {
				for (let c = 0; c < oldSize; c++) {
					const old = STATE.grid[r][c];
					newGrid[r][c].owner = old.owner;
					newGrid[r][c].visualOwner = old.visualOwner;
					newGrid[r][c].frozen = old.frozen;
					newGrid[r][c].alpha = 1;
				}
			}
			STATE.grid = newGrid;
			resizeCanvas();
		}
	} else if (eventId === "new_player") spawnNewRival();
	else if (eventId === "fog") {
		const r = Math.floor(Math.random() * 3);
		STATE.fog = {
			type: ["row", "col", "diag"][r],
			val: Math.floor(Math.random() * (r === 2 ? 2 : CONFIG.size))
		};
	} else if (eventId === "gravity") {
		for (let c = 0; c < CONFIG.size; c++) {
			let stack = [];
			for (let r = 0; r < CONFIG.size; r++)
				if (STATE.grid[r][c].owner !== null) stack.push(STATE.grid[r][c].owner);
			for (let r = CONFIG.size - 1; r >= 0; r--) {
				STATE.grid[r][c].owner = stack.length > 0 ? stack.pop() : null;
				STATE.grid[r][c].visualOwner = STATE.grid[r][c].owner;
			}
		}
	} else if (eventId === "scramble") {
		let pieces = [];
		for (let r = 0; r < CONFIG.size; r++)
			for (let c = 0; c < CONFIG.size; c++)
				if (STATE.grid[r][c].owner !== null) pieces.push(STATE.grid[r][c].owner);
		pieces.sort(() => Math.random() - 0.5);
		let slots = [];
		for (let r = 0; r < CONFIG.size; r++)
			for (let c = 0; c < CONFIG.size; c++)
				slots.push({
					r,
					c
				});
		slots.sort(() => Math.random() - 0.5);
		for (let r = 0; r < CONFIG.size; r++)
			for (let c = 0; c < CONFIG.size; c++) {
				STATE.grid[r][c].owner = null;
				STATE.grid[r][c].visualOwner = null;
			}
		for (let i = 0; i < pieces.length; i++) {
			let s = slots[i];
			STATE.grid[s.r][s.c].owner = pieces[i];
			STATE.grid[s.r][s.c].visualOwner = pieces[i];
		}
	} else if (eventId === "vertigo") {
		let newGrid = refreshGrid();
		for (let r = 0; r < CONFIG.size; r++) {
			for (let c = 0; c < CONFIG.size; c++) {
				let old = STATE.grid[r][c];
				let newR = c;
				let newC = CONFIG.size - 1 - r;
				newGrid[newR][newC].owner = old.owner;
				newGrid[newR][newC].visualOwner = old.visualOwner;
			}
		}
		STATE.grid = newGrid;
	} else if (eventId === "doppel") {
		let empties = [];
		for (let r = 0; r < CONFIG.size; r++)
			for (let c = 0; c < CONFIG.size; c++)
				if (STATE.grid[r][c].owner === null)
					empties.push({
						r,
						c
					});
		if (empties.length > 0) {
			let e = empties[Math.floor(Math.random() * empties.length)];
			STATE.grid[e.r][e.c].visualOwner = STATE.players[STATE.turn].id;
		}
	} else if (eventId === "frost") {
		let r = Math.floor(Math.random() * CONFIG.size);
		let c = Math.floor(Math.random() * CONFIG.size);
		STATE.grid[r][c].frozen = true;
	} else if (eventId === "vacuum") {
		let r = Math.floor(Math.random() * (CONFIG.size - 1));
		let c = Math.floor(Math.random() * (CONFIG.size - 1));
		STATE.grid[r][c].owner = null;
		STATE.grid[r][c].visualOwner = null;
		STATE.grid[r + 1][c].owner = null;
		STATE.grid[r + 1][c].visualOwner = null;
		STATE.grid[r][c + 1].owner = null;
		STATE.grid[r][c + 1].visualOwner = null;
		STATE.grid[r + 1][c + 1].owner = null;
		STATE.grid[r + 1][c + 1].visualOwner = null;
	} else if (eventId === "intruder") {
		let empties = [];
		for (let r = 0; r < CONFIG.size; r++)
			for (let c = 0; c < CONFIG.size; c++)
				if (STATE.grid[r][c].owner === null)
					empties.push({
						r,
						c
					});
		if (empties.length > 0) {
			let e = empties[Math.floor(Math.random() * empties.length)];
			STATE.grid[e.r][e.c].owner = 999;
			STATE.grid[e.r][e.c].visualOwner = 999;
		}
	} else if (eventId === "gust") {
		let pieces = [];
		for (let r = 0; r < CONFIG.size; r++)
			for (let c = 0; c < CONFIG.size; c++)
				if (STATE.grid[r][c].owner !== null)
					pieces.push({
						r,
						c
					});
		if (pieces.length > 0) {
			let p = pieces[Math.floor(Math.random() * pieces.length)];
			STATE.grid[p.r][p.c].owner = null;
			STATE.grid[p.r][p.c].visualOwner = null;
		}
	} else if (eventId === "crosswind") {
		let pieces = [];
		for (let r = 0; r < CONFIG.size; r++)
			for (let c = 0; c < CONFIG.size; c++)
				if (STATE.grid[r][c].owner !== null && STATE.grid[r][c].owner !== 999)
					pieces.push({
						r,
						c,
						o: STATE.grid[r][c].owner
					});
		if (pieces.length > 0) {
			let p = pieces[Math.floor(Math.random() * pieces.length)];
			let neighbors = [
				{
					r: p.r + 1,
					c: p.c
				},
				{
					r: p.r - 1,
					c: p.c
				},
				{
					r: p.r,
					c: p.c + 1
				},
				{
					r: p.r,
					c: p.c - 1
				}
			].filter(
				(n) =>
					n.r >= 0 &&
					n.r < CONFIG.size &&
					n.c >= 0 &&
					n.c < CONFIG.size &&
					STATE.grid[n.r][n.c].owner === null
			);
			if (neighbors.length > 0) {
				let n = neighbors[Math.floor(Math.random() * neighbors.length)];
				STATE.grid[n.r][n.c].set(p.o);
			}
		}
	}
}

function shareTwitter() {
	const shareUrl = "https://julibe.com/";
	const viaUser = "Julibe";

	const messages = [
		"Just wandered through the mists of E•the•real. A drifting strategy of silence and chaos.",
		"Aligned my thoughts against the entropy. E•the•real turns the grid into a dream.",
		"The pulse shifts, the grid turns. A beautiful, meditative puzzle experience by @Julibe.",
		"Drift, align, survive. Found harmony in the void of E•the•real.",
		"Lost in the echo. A serene yet challenging reimagining of strategy."
	];

	const hashtagsList = [
		"Dev",
		"CreativeCoding",
		"GenerativeArt",
		"WebGame",
		"Canvas",
		"Ambient",
		"PuzzleGame",
		"Strategy",
		"Relaxing",
		"Javascript",
		"FrontEnd"
	];

	const text = messages[Math.floor(Math.random() * messages.length)];

	let selectedTags = hashtagsList
		.sort(() => 0.5 - Math.random())
		.slice(0, 4)
		.map((tag) => tag.replace(/\s+/g, ""));

	const urlLength = 23;
	const viaLength = 6 + viaUser.length;
	const maxChars = 280;

	while (selectedTags.length > 0) {
		const tagsLength = selectedTags.reduce((acc, tag) => acc + tag.length + 2, 0);
		const totalLength = text.length + urlLength + viaLength + tagsLength;

		if (totalLength <= maxChars) break;
		selectedTags.pop();
	}

	const hashtags = selectedTags.join(",");

	const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
		text
	)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(
		hashtags
	)}&via=${encodeURIComponent(viaUser)}`;

	window.open(twitterUrl, "_blank");
}
