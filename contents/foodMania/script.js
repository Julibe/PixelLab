const FOOD_NAMES = {
	"🥬": "KALE",
	"🥦": "BROCCOLI",
	"🥕": "CARROT",
	"🥔": "POTATO",
	"🍠": "YAM",
	"🫚": "GINGER",
	"🍅": "TOMATO",
	"🍆": "EGGPLANT",
	"🫑": "PEPPER",
	"🥒": "CUCUMBER",
	"🫛": "PEAS",
	"🌽": "CORN",
	"🧄": "GARLIC",
	"🧅": "ONION",
	"🍄": "MUSHROOM",
	"🍏": "APPLE",
	"🍎": "APPLE",
	"🍐": "PEAR",
	"🍊": "ORANGE",
	"🍋": "LEMON",
	"🥭": "MANGO",
	"🍍": "PINEAPPLE",
	"🥥": "COCONUT",
	"🥝": "KIWI",
	"🍌": "BANANA",
	"🍉": "MELON",
	"🍈": "MELON",
	"🍓": "BERRY",
	"🫐": "BERRY",
	"🍇": "GRAPES",
	"🍒": "CHERRY",
	"🍑": "PEACH",
	"🥩": "STEAK",
	"🍖": "MEAT",
	"🥓": "BACON",
	"🍗": "CHICKEN",
	"🥚": "EGG",
	"🧀": "CHEESE",
	"🐟": "FISH",
	"🐠": "FISH",
	"🐡": "PUFFER",
	"🦐": "SHRIMP",
	"🍤": "TEMPURA",
	"🦀": "CRAB",
	"🦞": "LOBSTER",
	"🦪": "OYSTER",
	"🦑": "SQUID",
	"🍞": "BREAD",
	"🥖": "BAGUETTE",
	"🥐": "CROISSANT",
	"🥯": "BAGEL",
	"🥞": "PANCAKE",
	"🧇": "WAFFLE",
	"🧈": "BUTTER",
	"🫓": "AREPA",
	"🥪": "SANDWICH",
	"🍔": "BURGER",
	"🍕": "PIZZA",
	"🌭": "HOTDOG",
	"🌮": "TACO",
	"🌯": "BURRITO",
	"🍟": "FRIES",
	"🍿": "POPCORN",
	"🥤": "SODA",
	"🍣": "SUSHI",
	"🍱": "BENTO",
	"🍜": "NOODLE",
	"🥟": "DUMPLING",
	"🍚": "RICE",
	"🍙": "ONIGIRI",
	"🍘": "CRACKER",
	"🍛": "CURRY",
	"🍢": "ODEN",
	"🥠": "COOKIE",
	"🥡": "TAKEOUT",
	"🍡": "DANGO",
	"🍩": "DONUT",
	"🍦": "ICECREAM",
	"🍰": "CAKE",
	"🎂": "CAKE",
	"🍪": "COOKIE",
	"🍫": "CHOCO",
	"🍬": "CANDY",
	"🍭": "LOLLIPOP",
	"🧁": "CUPCAKE",
	"🥧": "PIE",
	"🍮": "FLAN",
	"🍺": "BEER",
	"🍻": "CHEERS",
	"🥂": "CHEERS",
	"🍾": "CHAMPAGNE",
	"🍷": "WINE",
	"🥃": "WHISKY",
	"🍸": "MARTINI",
	"🍹": "DRINK",
	"🍶": "SAKE",
	"☕": "COFFEE",
	"🧋": "BOBA",
	"🧉": "MATE"
};
const COLOR_MAP = {
	red: [
		"🍎",
		"🍓",
		"🍒",
		"🍉",
		"🍅",
		"🌶️",
		"🥩",
		"🥓",
		"🥊",
		"🍷",
		"🥤",
		"🥫",
		"🍣",
		"🐙",
		"🦞",
		"🦀"
	],
	orange: [
		"🍊",
		"🥭",
		"🥕",
		"🎃",
		"🍤",
		"🍑",
		"🌭",
		"🍔",
		"🍕",
		"🍝",
		"🥐",
		"🍞",
		"🥖",
		"🥨",
		"🥞",
		"🧇",
		"🍟",
		"🥣",
		"🍌",
		"🍋",
		"🧀",
		"🌽",
		"🍍",
		"🍺",
		"🍻",
		"🧈",
		"🍯",
		"🌮",
		"🍘",
		"🥔"
	],
	cyan: [
		"🥬",
		"🥦",
		"🥒",
		"🍏",
		"🥝",
		"🍐",
		"🫛",
		"🍈",
		"🍵",
		"🥑",
		"🫑",
		"🥗",
		"🤢",
		"🐢",
		"🐛"
	],
	blue: ["🍇", "🫐", "🍆", "🦑", "🍩", "🔮", "🧿", "🌀", "🥣", "🧊"],
	purple: [
		"🍠",
		"🥥",
		"🍖",
		"🍗",
		"🥚",
		"🥯",
		"🌰",
		"🍪",
		"🍫",
		"🧋",
		"🍱",
		"🍛",
		"🍙",
		"🍚",
		"🥟",
		"🥡",
		"🍄",
		"🥜",
		"🥪",
		"🥙",
		"🧆"
	],
	white: [
		"🍙",
		"🍚",
		"🥛",
		"🧂",
		"🥡",
		"🥢",
		"🍽️",
		"☁️",
		"🏐",
		"👻",
		"🦷",
		"🦴",
		"🦢"
	],
	pink: ["🍥", "🍦", "🍧", "🍡", "🐖", "🐽"]
};

function getFoodColor(symbol) {
	if (symbol === "💣") return "#ff0055";
	for (const [color, emojis] of Object.entries(COLOR_MAP)) {
		if (emojis.includes(symbol)) {
			switch (color) {
				case "red":
					return "#ff0055";
				case "orange":
					return "#ff5e00";
				case "cyan":
					return "#00f3ff";
				case "blue":
					return "#0044ff";
				case "purple":
					return "#bc13fe";
				case "white":
					return "#ffffff";
				case "pink":
					return "#ff00ff";
			}
		}
	}
	return "#ffffff";
}
const gameSettings = {
	lives: 3,
	bombs: "LOW",
	speed: "NORM"
};
document.querySelectorAll(".toggle-group").forEach((group) => {
	group.addEventListener("click", (e) => {
		if (e.target.classList.contains("toggle-btn")) {
			group
				.querySelectorAll(".toggle-btn")
				.forEach((btn) => btn.classList.remove("active"));
			e.target.classList.add("active");
			const val = e.target.getAttribute("data-val");
			const id = group.id;
			if (id === "opt-lives") {
				if (val === "INF") gameSettings.lives = Infinity;
				else gameSettings.lives = parseInt(val);
			}
			if (id === "opt-bombs") gameSettings.bombs = val;
			if (id === "opt-speed") gameSettings.speed = val;
		}
	});
});
const LiquidBackground = {
	canvas: document.getElementById("bgCanvas"),
	ctx: null,
	time: 0,
	currentColors: [
		{
			h: 0,
			s: 0,
			l: 0
		},
		{
			h: 0,
			s: 0,
			l: 0
		},
		{
			h: 0,
			s: 0,
			l: 0
		},
		{
			h: 0,
			s: 0,
			l: 0
		}
	],
	targetColors: [
		{
			h: 0,
			s: 0,
			l: 0
		},
		{
			h: 0,
			s: 0,
			l: 0
		},
		{
			h: 0,
			s: 0,
			l: 0
		},
		{
			h: 0,
			s: 0,
			l: 0
		}
	],
	init: function () {
		this.ctx = this.canvas.getContext("2d");
		this.resize();
		window.addEventListener("resize", () => this.resize());
		this.resetToMenu();
		this.loop();
	},
	resetToMenu: function () {
		const menuPalette = [
			{
				h: 270,
				s: 100,
				l: 30
			},
			{
				h: 190,
				s: 100,
				l: 40
			},
			{
				h: 320,
				s: 100,
				l: 40
			},
			{
				h: 240,
				s: 100,
				l: 20
			}
		];
		this.setPalette(menuPalette);
		this.currentColors = JSON.parse(JSON.stringify(menuPalette));
	},
	setPalette: function (colors) {
		this.targetColors = JSON.parse(JSON.stringify(colors));
	},
	resize: function () {
		this.canvas.width = window.innerWidth / 4;
		this.canvas.height = window.innerHeight / 4;
	},
	lerp: function (start, end, amt) {
		return (1 - amt) * start + amt * end;
	},
	loop: function () {
		this.time += 0.005;
		for (let i = 0; i < 4; i++) {
			this.currentColors[i].h = this.lerp(
				this.currentColors[i].h,
				this.targetColors[i].h,
				0.02
			);
			this.currentColors[i].s = this.lerp(
				this.currentColors[i].s,
				this.targetColors[i].s,
				0.02
			);
			this.currentColors[i].l = this.lerp(
				this.currentColors[i].l,
				this.targetColors[i].l,
				0.02
			);
		}
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.globalCompositeOperation = "screen";
		const w = this.canvas.width;
		const h = this.canvas.height;
		const blobOffsets = [0, 2, 4, 1];
		const speeds = [1, 1.2, 0.8, 1.1];
		for (let i = 0; i < 4; i++) {
			const t = this.time * speeds[i];
			const x = (Math.sin(t + blobOffsets[i]) * 0.4 + 0.5) * w;
			const y = (Math.cos(t * 1.5 + blobOffsets[i]) * 0.4 + 0.5) * h;
			const radius = w * 0.7;
			const c = this.currentColors[i];
			const grad = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
			grad.addColorStop(0, `hsla(${c.h}, ${c.s}%, ${c.l}%, 0.8)`);
			grad.addColorStop(1, `hsla(${c.h}, ${c.s}%, 0%, 0)`);
			this.ctx.fillStyle = grad;
			this.ctx.beginPath();
			this.ctx.arc(x, y, radius, 0, Math.PI * 2);
			this.ctx.fill();
		}
		requestAnimationFrame(() => this.loop());
	}
};
const SoundSystem = {
	ctx: null,
	pitchMultiplier: 1.0,
	init: function () {
		if (!this.ctx)
			this.ctx = new (window.AudioContext || window.webkitAudioContext)();
		if (this.ctx.state === "suspended") this.ctx.resume();
	},
	setLevel: function (levelIdx) {
		this.pitchMultiplier = 1.0 + levelIdx * 0.05;
	},
	play: function (type) {
		if (!this.ctx) return;
		try {
			const osc = this.ctx.createOscillator();
			const gain = this.ctx.createGain();
			osc.connect(gain);
			gain.connect(this.ctx.destination);
			const now = this.ctx.currentTime;
			const p = this.pitchMultiplier;
			if (type === "slice") {
				osc.type = "sawtooth";
				osc.frequency.setValueAtTime(800 * p, now);
				osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
				gain.gain.setValueAtTime(0.05, now);
				gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
				osc.start(now);
				osc.stop(now + 0.1);
			} else if (type === "combo") {
				osc.type = "sine";
				osc.frequency.setValueAtTime(800 * p, now);
				osc.frequency.linearRampToValueAtTime(1200 * p, now + 0.1);
				gain.gain.setValueAtTime(0.1, now);
				gain.gain.linearRampToValueAtTime(0, now + 0.3);
				osc.start(now);
				osc.stop(now + 0.3);
			} else if (type === "bomb") {
				osc.type = "sawtooth";
				osc.frequency.setValueAtTime(100, now);
				osc.frequency.exponentialRampToValueAtTime(10, now + 0.5);
				gain.gain.setValueAtTime(0.2, now);
				gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
				osc.start(now);
				osc.stop(now + 0.5);
			} else if (type === "levelup") {
				osc.type = "triangle";
				osc.frequency.setValueAtTime(300, now);
				osc.frequency.linearRampToValueAtTime(600, now + 0.2);
				osc.frequency.linearRampToValueAtTime(1200, now + 0.5);
				gain.gain.setValueAtTime(0.1, now);
				gain.gain.linearRampToValueAtTime(0, now + 0.8);
				osc.start(now);
				osc.stop(now + 0.8);
			}
		} catch (e) {}
	}
};
const LEVEL_DATA = [
	{
		name: "VEGGIE DIET",
		threshold: 0,
		gravity: 0.12,
		bg: [
			{
				h: 180,
				s: 100,
				l: 30
			},
			{
				h: 220,
				s: 100,
				l: 30
			},
			{
				h: 200,
				s: 100,
				l: 20
			},
			{
				h: 240,
				s: 100,
				l: 30
			}
		],
		items: [
			"🥬",
			"🥦",
			"🥕",
			"🥔",
			"🍠",
			"🫚",
			"🍅",
			"🍆",
			"🫑",
			"🥒",
			"🫛",
			"🌽",
			"🧄",
			"🧅",
			"🍄"
		]
	},
	{
		name: "FRUIT SALAD",
		threshold: 500,
		gravity: 0.14,
		bg: [
			{
				h: 300,
				s: 100,
				l: 40
			},
			{
				h: 340,
				s: 100,
				l: 40
			},
			{
				h: 280,
				s: 100,
				l: 30
			},
			{
				h: 320,
				s: 100,
				l: 30
			}
		],
		items: [
			"🍏",
			"🍎",
			"🍐",
			"🍊",
			"🍋",
			"🥭",
			"🍍",
			"🥥",
			"🥝",
			"🍌",
			"🍉",
			"🍈",
			"🍓",
			"🫐",
			"🍇",
			"🍒",
			"🍑"
		]
	},
	{
		name: "MEAT BUTCHER",
		threshold: 1200,
		gravity: 0.16,
		bg: [
			{
				h: 0,
				s: 100,
				l: 30
			},
			{
				h: 350,
				s: 100,
				l: 20
			},
			{
				h: 10,
				s: 80,
				l: 30
			},
			{
				h: 340,
				s: 90,
				l: 20
			}
		],
		items: ["🥩", "🍖", "🥓", "🍗", "🥚", "🧀"]
	},
	{
		name: "SEA SALT",
		threshold: 2000,
		gravity: 0.18,
		bg: [
			{
				h: 220,
				s: 100,
				l: 40
			},
			{
				h: 190,
				s: 100,
				l: 30
			},
			{
				h: 240,
				s: 100,
				l: 20
			},
			{
				h: 200,
				s: 100,
				l: 40
			}
		],
		items: ["🐟", "🐠", "🐡", "🦐", "🍤", "🦀", "🦞", "🦪", "🦑"]
	},
	{
		name: "BAKE GOODIES",
		threshold: 3000,
		gravity: 0.2,
		bg: [
			{
				h: 270,
				s: 80,
				l: 30
			},
			{
				h: 290,
				s: 80,
				l: 30
			},
			{
				h: 250,
				s: 80,
				l: 20
			},
			{
				h: 300,
				s: 80,
				l: 30
			}
		],
		items: ["🍞", "🥖", "🥐", "🥯", "🥞", "🧇", "🧈", "🫓", "🥪"]
	},
	{
		name: "FAST LANE",
		threshold: 4200,
		gravity: 0.22,
		bg: [
			{
				h: 10,
				s: 100,
				l: 40
			},
			{
				h: 40,
				s: 100,
				l: 40
			},
			{
				h: 0,
				s: 100,
				l: 30
			},
			{
				h: 20,
				s: 100,
				l: 30
			}
		],
		items: ["🍔", "🍕", "🌭", "🌮", "🌯", "🍟", "🍿", "🥤"]
	},
	{
		name: "KONICHIWA!",
		threshold: 5600,
		gravity: 0.24,
		bg: [
			{
				h: 330,
				s: 100,
				l: 30
			},
			{
				h: 200,
				s: 100,
				l: 20
			},
			{
				h: 300,
				s: 100,
				l: 30
			},
			{
				h: 180,
				s: 100,
				l: 20
			}
		],
		items: [
			"🍣",
			"🍱",
			"🍜",
			"🥟",
			"🍚",
			"🍙",
			"🍘",
			"🍛",
			"🍢",
			"🥠",
			"🥡",
			"🍡"
		]
	},
	{
		name: "SUGAR RUSH",
		threshold: 7200,
		gravity: 0.26,
		bg: [
			{
				h: 300,
				s: 100,
				l: 50
			},
			{
				h: 260,
				s: 100,
				l: 50
			},
			{
				h: 320,
				s: 100,
				l: 40
			},
			{
				h: 280,
				s: 100,
				l: 40
			}
		],
		items: ["🍩", "🍦", "🍰", "🎂", "🍪", "🍫", "🍬", "🍭", "🧁", "🥧", "🍮"]
	},
	{
		name: "HAPPY HOUR",
		threshold: 9000,
		gravity: 0.28,
		bg: [
			{
				h: 240,
				s: 100,
				l: 20
			},
			{
				h: 270,
				s: 100,
				l: 30
			},
			{
				h: 220,
				s: 100,
				l: 20
			},
			{
				h: 290,
				s: 100,
				l: 20
			}
		],
		items: ["🍺", "🍻", "🥂", "🍾", "🍷", "🥃", "🍸", "🍹", "🍶", "☕", "🧋", "🧉"]
	},
	{
		name: "THE BANQUET",
		threshold: 12000,
		gravity: 0.3,
		bg: [
			{
				h: 0,
				s: 100,
				l: 40
			},
			{
				h: 180,
				s: 100,
				l: 40
			},
			{
				h: 300,
				s: 100,
				l: 40
			},
			{
				h: 60,
				s: 100,
				l: 40
			}
		],
		items: []
	}
];
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const comboEl = document.getElementById("combo-container");
const comboNumEl = document.getElementById("combo-num");
const comboLabelEl = document.getElementById("combo-label");
const comboBarEl = document.getElementById("combo-bar-fill");
let gameState = "MENU";
let score = 0;
let highScore = localStorage.getItem("foodManiaHigh") || 0;
let lives = 5;
let entities = [];
let particles = [];
let scorePopups = [];
let spawnTimer = 0;
let mousePath = [];
let isMouseDown = false;
let comboCount = 0;
let comboTimer = 0;
let currentComboLabel = "COMBO";
const MAX_COMBO_TIME = 300;
let currentLevelIdx = 0;
let currentGravity = 0.2;
const TRAIL_LENGTH = 0.025;
const SPAWN_RATE_BASE = 50;
let bladeColor = "#ffffff";
let currentSpeedMultiplier = 1.0;
let animationFrameId;
let gameSeconds = 0;
let timerInterval;
class Entity {
	constructor(symbol, gravity) {
		this.symbol = symbol;
		this.x = Math.random() * (canvas.width - 100) + 50;
		this.y = canvas.height + 80;
		let baseForce = Math.random() * 3 + 12;
		if (currentSpeedMultiplier > 1.1) baseForce *= 1.3;
		if (currentSpeedMultiplier < 0.9) baseForce *= 0.8;
		const dir = this.x < canvas.width / 2 ? 1 : -1;
		this.vx = (Math.random() * 2 + 0.5) * dir;
		this.vy = -baseForce;
		this.rotation = 0;
		this.rotationSpeed = (Math.random() - 0.5) * 0.1;
		this.sliced = false;
		this.active = true;
		this.radius = 45;
		this.gravity = gravity * currentSpeedMultiplier;
		this.isBomb = symbol === "💣";
	}
	update() {
		if (!this.active) return;
		this.x += this.vx;
		this.y += this.vy;
		this.vy += this.gravity;
		this.rotation += this.rotationSpeed;
		if (this.y > canvas.height + 100 && !this.sliced) {
			this.active = false;
			if (!this.isBomb && lives !== Infinity) loseLife();
		}
	}
	draw() {
		if (!this.active || this.sliced) return;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation);
		ctx.font = "80px serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.shadowBlur = 0;
		ctx.shadowColor = "transparent";
		ctx.fillText(this.symbol, 0, 10);
		ctx.restore();
	}
}
class Particle {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.vx = (Math.random() - 0.5) * 10;
		this.vy = (Math.random() - 0.5) * 10;
		this.life = 1.0;
		this.size = Math.random() * 12 + 8;
	}
	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.vy += 0.3;
		this.life -= 0.02;
	}
	draw() {
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.shadowBlur = 0;
		if (this.life < 0.3) ctx.fillStyle = "#fff";
		const currentSize = this.size * this.life;
		ctx.fillRect(this.x, this.y, currentSize, currentSize);
		ctx.restore();
	}
}
class FloatingText {
	constructor(x, y, text, color) {
		this.x = x;
		this.y = y;
		this.text = text;
		this.color = color;
		this.life = 1.0;
		this.vy = -2;
	}
	update() {
		this.y += this.vy;
		this.life -= 0.015;
	}
	draw() {
		if (this.life <= 0) return;
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.font = "bold 40px monospace";
		ctx.fillText(this.text, this.x, this.y);
		ctx.restore();
	}
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();
LiquidBackground.init();

function formatTime(secs) {
	const m = Math.floor(secs / 60)
		.toString()
		.padStart(2, "0");
	const s = (secs % 60).toString().padStart(2, "0");
	return `${m}:${s}`;
}

function startTimer() {
	clearInterval(timerInterval);
	gameSeconds = 0;
	document.getElementById("timeVal").innerText = "00:00";
	timerInterval = setInterval(() => {
		if (gameState === "PLAYING") {
			gameSeconds++;
			document.getElementById("timeVal").innerText = formatTime(gameSeconds);
		}
	}, 1000);
}

function showMenu() {
	gameState = "MENU";
	clearInterval(timerInterval);
	document.getElementById("game-over-screen").classList.add("hidden");
	document.getElementById("pause-screen").classList.add("hidden");
	document.getElementById("start-screen").classList.remove("hidden");
	document.getElementById("hud-content").classList.add("hidden");
	document.getElementById("menu-header").classList.remove("hidden");
	document.getElementById("social-floating").classList.remove("hidden");
	LiquidBackground.resetToMenu();
	ensureLoopRunning();
}

function togglePause() {
	if (gameState === "PLAYING") {
		gameState = "PAUSED";
		document.getElementById("pause-screen").classList.remove("hidden");
		document.getElementById("social-floating").classList.remove("hidden");
	} else if (gameState === "PAUSED") {
		gameState = "PLAYING";
		document.getElementById("pause-screen").classList.add("hidden");
		document.getElementById("social-floating").classList.add("hidden");
		ensureLoopRunning();
	}
}

function initGame() {
	SoundSystem.init();
	score = 0;
	entities = [];
	particles = [];
	scorePopups = [];
	spawnTimer = 0;
	currentLevelIdx = 0;
	comboCount = 0;
	bladeColor = "#ffffff";
	lives = gameSettings.lives;
	if (gameSettings.speed === "SLOW") currentSpeedMultiplier = 0.7;
	else if (gameSettings.speed === "FAST") currentSpeedMultiplier = 1.3;
	else currentSpeedMultiplier = 1.0;
	const lvl = LEVEL_DATA[0];
	currentGravity = lvl.gravity;
	LiquidBackground.setPalette(lvl.bg);
	SoundSystem.setLevel(0);
	SoundSystem.play("levelup");
	updateUI();
	updateComboUI();
	startTimer();
	gameState = "PLAYING";
	document.getElementById("start-screen").classList.add("hidden");
	document.getElementById("game-over-screen").classList.add("hidden");
	document.getElementById("pause-screen").classList.add("hidden");
	document.getElementById("hud-content").classList.remove("hidden");
	document.getElementById("menu-header").classList.add("hidden");
	document.getElementById("social-floating").classList.add("hidden");
	ensureLoopRunning();
}

function gameOver() {
	gameState = "GAMEOVER";
	clearInterval(timerInterval);
	if (score > highScore) {
		highScore = score;
		localStorage.setItem("foodManiaHigh", highScore);
	}
	document.getElementById("final-score").innerText = score;
	document.getElementById("final-highscore").innerText = highScore;
	document.getElementById("final-time").innerText = formatTime(gameSeconds);
	document.getElementById("game-over-screen").classList.remove("hidden");
	document.getElementById("hud-content").classList.add("hidden");
	document.getElementById("social-floating").classList.remove("hidden");
	comboEl.style.opacity = "0";
}

function loseLife() {
	if (lives === Infinity) return;
	lives--;
	updateUI();
	SoundSystem.play("bomb");
	document.body.style.transform = "translate(15px, 15px)";
	setTimeout(
		() => (document.body.style.transform = "translate(-15px,-15px)"),
		50
	);
	setTimeout(() => (document.body.style.transform = "translate(0,0)"), 100);
	if (lives <= 0) gameOver();
}

function addScore(val, x, y, isCombo) {
	score += val;
	let text = "+" + val;
	let color = "#fff";
	if (isCombo) {
		text = "COMBO!";
		color = "#ffff00";
		SoundSystem.play("combo");
	} else {
		SoundSystem.play("slice");
	}
	scorePopups.push(new FloatingText(x, y, text, color));
	checkLevelUp();
	updateUI();
}

function checkLevelUp() {
	if (currentLevelIdx >= LEVEL_DATA.length - 1) return;
	const nextLevel = LEVEL_DATA[currentLevelIdx + 1];
	if (score >= nextLevel.threshold) {
		currentLevelIdx++;
		const lvlData = LEVEL_DATA[currentLevelIdx];
		currentGravity = lvlData.gravity;
		LiquidBackground.setPalette(lvlData.bg);
		SoundSystem.setLevel(currentLevelIdx);
		SoundSystem.play("levelup");
		const ind = document.getElementById("level-indicator");
		if (ind) {
			ind.style.transform = "scale(1.5)";
			ind.style.color = "#fff";
			setTimeout(() => {
				ind.style.transform = "scale(1)";
				ind.style.color = "var(--neon-yellow)";
			}, 500);
		}
	}
}

function updateUI() {
	document.getElementById("scoreVal").innerText = score;
	document.getElementById("highScoreVal").innerText = highScore;
	const levelInd = document.getElementById("level-indicator");
	if (levelInd) {
		levelInd.innerText = LEVEL_DATA[currentLevelIdx].name;
	}
	const heartContainer = document.getElementById("livesVal");
	if (lives === Infinity) {
		heartContainer.innerHTML =
			'<span style="color:var(--neon-cyan); font-size:24px;">Ꝏ</span>';
	} else {
		let hearts = "";
		for (let i = 0; i < lives; i++) hearts += "❤️";
		heartContainer.innerHTML = hearts;
	}
}

function updateComboUI(foodName) {
	if (foodName) currentComboLabel = foodName;
	if (comboCount > 1) {
		comboEl.style.opacity = "1";
		comboNumEl.innerText = comboCount + "x";
		comboLabelEl.innerText = currentComboLabel;
		const pct = (comboTimer / MAX_COMBO_TIME) * 100;
		comboBarEl.style.width = pct + "%";
		if (pct > 60) comboBarEl.style.background = "#00ff00";
		else if (pct > 30) comboBarEl.style.background = "#ffff00";
		else comboBarEl.style.background = "#ff0000";
		comboNumEl.classList.remove("animate-pop");
		void comboNumEl.offsetWidth;
		comboNumEl.classList.add("animate-pop");
	} else {
		comboEl.style.opacity = "0";
	}
}

function spawnEntity() {
	let rate = SPAWN_RATE_BASE - currentLevelIdx * 2;
	if (currentSpeedMultiplier > 1.2) rate *= 0.7;
	if (rate < 15) rate = 15;
	if (spawnTimer < rate) return;
	spawnTimer = 0;
	const r = Math.random();
	const lvlData = LEVEL_DATA[currentLevelIdx];
	let bombChance = 0.05 + currentLevelIdx * 0.02;
	if (gameSettings.bombs === "NONE") bombChance = 0;
	if (gameSettings.bombs === "LOW") bombChance *= 0.5;
	if (gameSettings.bombs === "HIGH") bombChance = Math.max(0.2, bombChance * 2);
	const shouldSpawnBomb = r < bombChance;
	if (shouldSpawnBomb) {
		entities.push(new Entity("💣", currentGravity));
	} else {
		let items = lvlData.items;
		if (items.length === 0) {
			const rndLvl = Math.floor(Math.random() * (LEVEL_DATA.length - 1));
			items = LEVEL_DATA[rndLvl].items;
		}
		const item = items[Math.floor(Math.random() * items.length)];
		entities.push(new Entity(item, currentGravity));
	}
}

function createExplosion(x, y, color, count = 15) {
	for (let i = 0; i < count; i++) {
		particles.push(new Particle(x, y, color));
	}
}

function distanceToLine(px, py, x1, y1, x2, y2) {
	const A = px - x1;
	const B = py - y1;
	const C = x2 - x1;
	const D = y2 - y1;
	const dot = A * C + B * D;
	const len_sq = C * C + D * D;
	let param = -1;
	if (len_sq != 0) param = dot / len_sq;
	let xx, yy;
	if (param < 0) {
		xx = x1;
		yy = y1;
	} else if (param > 1) {
		xx = x2;
		yy = y2;
	} else {
		xx = x1 + param * C;
		yy = y1 + param * D;
	}
	const dx = px - xx;
	const dy = py - yy;
	return Math.sqrt(dx * dx + dy * dy);
}

function checkSlices() {
	if (mousePath.length < 2) return;
	const p1 = mousePath[mousePath.length - 2];
	const p2 = mousePath[mousePath.length - 1];
	entities.forEach((ent) => {
		if (!ent.active || ent.sliced) return;
		const dist = distanceToLine(ent.x, ent.y, p1.x, p1.y, p2.x, p2.y);
		if (dist < ent.radius) {
			ent.sliced = true;
			ent.active = false;
			if (ent.isBomb) {
				createExplosion(ent.x, ent.y, "#ff0055", 30);
				bladeColor = "#ff0055";
				loseLife();
				comboCount = 0;
				updateComboUI("OOPS!");
			} else {
				const foodColor = getFoodColor(ent.symbol);
				createExplosion(ent.x, ent.y, foodColor, 15);
				bladeColor = foodColor;
				comboCount++;
				comboTimer = MAX_COMBO_TIME;
				let displayName = FOOD_NAMES[ent.symbol] || "TASTY!";
				updateComboUI(displayName);
				let points = 10;
				let isCombo = false;
				if (comboCount >= 3) {
					points += comboCount * 5;
					isCombo = true;
				}
				addScore(points, ent.x, ent.y, isCombo);
			}
		}
	});
}

function loop() {
	if (gameState === "PAUSED") return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (gameState === "GAMEOVER") {
		particles.forEach((p, i) => {
			p.update();
			p.draw();
			if (p.life <= 0) particles.splice(i, 1);
		});
		if (Math.random() < 0.1) {
			const x = Math.random() * canvas.width;
			const y = Math.random() * canvas.height;
			const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
			createExplosion(x, y, color, 20);
		}
		animationFrameId = requestAnimationFrame(loop);
		return;
	}
	if (gameState === "PLAYING") {
		spawnTimer++;
		spawnEntity();
		if (comboTimer > 0) {
			comboTimer--;
			if (comboCount > 1) updateComboUI();
		} else {
			if (comboCount > 0) {
				comboCount = 0;
				updateComboUI();
			}
		}
		entities.forEach((ent) => {
			ent.update();
			ent.draw();
		});
		particles.forEach((p, i) => {
			p.update();
			p.draw();
			if (p.life <= 0) particles.splice(i, 1);
		});
		scorePopups.forEach((p, i) => {
			p.update();
			p.draw();
			if (p.life <= 0) scorePopups.splice(i, 1);
		});
		entities = entities.filter((e) => e.active);
		if (mousePath.length > 1) {
			for (let i = 0; i < mousePath.length - 1; i++) {
				const p1 = mousePath[i];
				const p2 = mousePath[i + 1];
				const speed = p2.speed || 0;
				const width = Math.min(25, Math.max(4, speed * 0.5));
				ctx.beginPath();
				ctx.strokeStyle = bladeColor;
				ctx.shadowBlur = 0;
				ctx.shadowColor = "transparent";
				ctx.lineWidth = width;
				ctx.lineCap = "round";
				ctx.lineJoin = "round";
				ctx.moveTo(p1.x, p1.y);
				ctx.lineTo(p2.x, p2.y);
				ctx.stroke();
			}
			if (mousePath.length > TRAIL_LENGTH) mousePath.shift();
			if (!isMouseDown && mousePath.length > 0) mousePath.shift();
		}
	}
	animationFrameId = requestAnimationFrame(loop);
	if (mousePath.length >= 3) {
		mousePath.length = 3;
	}
}

function ensureLoopRunning() {
	if (animationFrameId) cancelAnimationFrame(animationFrameId);
	loop();
}

function addPoint(x, y) {
	let speed = 0;
	if (mousePath.length > 0) {
		const last = mousePath[mousePath.length - 1];
		const dx = x - last.x;
		const dy = y - last.y;
		speed = Math.sqrt(dx * dx + dy * dy);
	}
	mousePath.push({
		x,
		y,
		speed
	});
	if (gameState === "PLAYING") checkSlices();
}
window.addEventListener("mousedown", (e) => {
	if (gameState !== "PLAYING") return;
	isMouseDown = true;
	mousePath = [];
	addPoint(e.clientX, e.clientY);
	SoundSystem.init();
	SoundSystem.play("slice");
});
window.addEventListener("mousemove", (e) => {
	if (isMouseDown) addPoint(e.clientX, e.clientY);
});
window.addEventListener("mouseup", () => {
	isMouseDown = false;
	mousePath = [];
});
window.addEventListener(
	"touchstart",
	(e) => {
		if (gameState !== "PLAYING") return;
		isMouseDown = true;
		mousePath = [];
		addPoint(e.touches[0].clientX, e.touches[0].clientY);
		SoundSystem.init();
		SoundSystem.play("slice");
	},
	{
		passive: false
	}
);
window.addEventListener(
	"touchmove",
	(e) => {
		e.preventDefault();
		if (isMouseDown) addPoint(e.touches[0].clientX, e.touches[0].clientY);
	},
	{
		passive: false
	}
);
window.addEventListener("touchend", () => {
	isMouseDown = false;
	mousePath = [];
});
window.addEventListener("blur", () => {
	if (gameState === "PLAYING") togglePause();
});
window.addEventListener("contextmenu", (e) => {
	e.preventDefault();
	if (gameState === "PLAYING") togglePause();
});
document
	.getElementById("start-btn")
	.addEventListener("click", () => initGame());
document
	.getElementById("restart-btn")
	.addEventListener("click", () => initGame());
document.getElementById("menu-btn").addEventListener("click", showMenu);
window.openModal = function (id) {
	document.getElementById("modal-overlay").classList.remove("hidden");
	document
		.querySelectorAll(".modal-box")
		.forEach((el) => el.classList.add("hidden"));
	document.getElementById(id).classList.remove("hidden");
};
window.closeAllModals = function () {
	document.getElementById("modal-overlay").classList.add("hidden");
};
window.shareTwitter = function () {
	const timeStr = formatTime(gameSeconds);
	const livesStr = gameSettings.lives === Infinity ? "Ꝏ" : gameSettings.lives;
	const text = `I sliced for ${timeStr} and scored ${score} pts in Food Mania! ${gameSettings.speed} mode, ${gameSettings.bombs} bombs, ${livesStr} lives. 🍎🔪 Can you beat me?`;
	const url = "https://codepen.io/Julibe/pen/wBGjpyL";
	const hashtags = "FoodMania,Arcade,Gaming,Highscore";
	const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
		text
	)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
	window.open(twitterUrl, "_blank");
};
document.getElementById("highScoreVal").innerText = highScore;
ensureLoopRunning();
