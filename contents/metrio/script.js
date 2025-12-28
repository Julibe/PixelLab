const SCALE = 20;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const sfx = {
	play(type) {
		if (audioCtx.state === "suspended") audioCtx.resume();
		const now = audioCtx.currentTime;
		const osc = audioCtx.createOscillator();
		const gain = audioCtx.createGain();
		osc.connect(gain);
		gain.connect(audioCtx.destination);

		if (type === "move") {
			osc.type = "sine";
			osc.frequency.setValueAtTime(400, now);
			osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);
			gain.gain.setValueAtTime(0.05, now);
			gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
			osc.start(now);
			osc.stop(now + 0.05);
		} else if (type === "rotate") {
			osc.type = "triangle";
			osc.frequency.setValueAtTime(200, now);
			osc.frequency.linearRampToValueAtTime(300, now + 0.1);
			gain.gain.setValueAtTime(0.05, now);
			gain.gain.linearRampToValueAtTime(0, now + 0.1);
			osc.start(now);
			osc.stop(now + 0.1);
		} else if (type === "drop") {
			osc.type = "sine";
			osc.frequency.setValueAtTime(100, now);
			osc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
			gain.gain.setValueAtTime(0.1, now);
			gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
			osc.start(now);
			osc.stop(now + 0.2);
		} else if (type === "clear") {
			osc.type = "sine";
			osc.frequency.setValueAtTime(300, now);
			osc.frequency.linearRampToValueAtTime(100, now + 0.3);
			gain.gain.setValueAtTime(0.1, now);
			gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
			osc.start(now);
			osc.stop(now + 0.3);
		} else if (type === "level") {
			osc.type = "sine";
			osc.frequency.setValueAtTime(440, now);
			osc.frequency.linearRampToValueAtTime(880, now + 0.5);
			gain.gain.setValueAtTime(0.1, now);
			gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
			osc.start(now);
			osc.stop(now + 0.5);
		}
	}
};

// --- 40 UNIQUE COLOR PALETTES ---
const PALETTES = [
	{
		1: "#00cec9",
		2: "#e17055",
		3: "#0984e3",
		4: "#fdcb6e",
		5: "#d63031",
		6: "#6c5ce7",
		7: "#e84393",
		8: "#b2bec3",
		9: "#2d3436"
	},
	{
		1: "#48dbfb",
		2: "#ff9f43",
		3: "#2e86de",
		4: "#feca57",
		5: "#ff6b6b",
		6: "#1dd1a1",
		7: "#5f27cd",
		8: "#8395a7",
		9: "#222f3e"
	},
	{
		1: "#0abde3",
		2: "#ee5253",
		3: "#5f27cd",
		4: "#feca57",
		5: "#ff9f43",
		6: "#10ac84",
		7: "#2e86de",
		8: "#c8d6e5",
		9: "#222f3e"
	},
	{
		1: "#7f8fa6",
		2: "#c23616",
		3: "#273c75",
		4: "#e1b12c",
		5: "#e84118",
		6: "#44bd32",
		7: "#8c7ae6",
		8: "#dcdde1",
		9: "#353b48"
	},
	{
		1: "#718093",
		2: "#e1b12c",
		3: "#2f3640",
		4: "#c23616",
		5: "#44bd32",
		6: "#192a56",
		7: "#8c7ae6",
		8: "#7f8fa6",
		9: "#273c75"
	},
	{
		1: "#e1b12c",
		2: "#e17055",
		3: "#fab1a0",
		4: "#ffeaa7",
		5: "#d63031",
		6: "#00b894",
		7: "#a29bfe",
		8: "#636e72",
		9: "#2d3436"
	},
	{
		1: "#00d2d3",
		2: "#ff9f43",
		3: "#54a0ff",
		4: "#f368e0",
		5: "#ff6b6b",
		6: "#1dd1a1",
		7: "#5f27cd",
		8: "#c8d6e5",
		9: "#222f3e"
	},
	{
		1: "#55efc4",
		2: "#e17055",
		3: "#74b9ff",
		4: "#ffeaa7",
		5: "#ff7675",
		6: "#00b894",
		7: "#a29bfe",
		8: "#dfe6e9",
		9: "#2d3436"
	},
	{
		1: "#81ecec",
		2: "#fab1a0",
		3: "#0984e3",
		4: "#fdcb6e",
		5: "#d63031",
		6: "#00cec9",
		7: "#6c5ce7",
		8: "#b2bec3",
		9: "#2d3436"
	},
	{
		1: "#7efff5",
		2: "#ffcccc",
		3: "#18dcff",
		4: "#ff9f43",
		5: "#ff4d4d",
		6: "#3ae374",
		7: "#7d5fff",
		8: "#4b4b4b",
		9: "#3d3d3d"
	},
	{
		1: "#ff9ff3",
		2: "#feca57",
		3: "#54a0ff",
		4: "#ff9f43",
		5: "#ff6b6b",
		6: "#48dbfb",
		7: "#1dd1a1",
		8: "#8395a7",
		9: "#222f3e"
	},
	{
		1: "#fd79a8",
		2: "#e17055",
		3: "#0984e3",
		4: "#fab1a0",
		5: "#d63031",
		6: "#00b894",
		7: "#a29bfe",
		8: "#b2bec3",
		9: "#2d3436"
	},
	{
		1: "#e1b12c",
		2: "#e17055",
		3: "#2d3436",
		4: "#fab1a0",
		5: "#d63031",
		6: "#00cec9",
		7: "#6c5ce7",
		8: "#dfe6e9",
		9: "#636e72"
	},
	{
		1: "#81ecec",
		2: "#fab1a0",
		3: "#74b9ff",
		4: "#ffeaa7",
		5: "#ff7675",
		6: "#55efc4",
		7: "#a29bfe",
		8: "#b2bec3",
		9: "#2d3436"
	},
	{
		1: "#00d2d3",
		2: "#ff9f43",
		3: "#2e86de",
		4: "#feca57",
		5: "#ff6b6b",
		6: "#1dd1a1",
		7: "#5f27cd",
		8: "#c8d6e5",
		9: "#576574"
	},
	{
		1: "#48dbfb",
		2: "#ff9f43",
		3: "#54a0ff",
		4: "#f368e0",
		5: "#ff6b6b",
		6: "#10ac84",
		7: "#5f27cd",
		8: "#8395a7",
		9: "#222f3e"
	},
	{
		1: "#c7ecee",
		2: "#f0932b",
		3: "#686de0",
		4: "#ffbe76",
		5: "#ff7979",
		6: "#badc58",
		7: "#e056fd",
		8: "#95afc0",
		9: "#535c68"
	},
	{
		1: "#7ed6df",
		2: "#e056fd",
		3: "#22a6b3",
		4: "#f0932b",
		5: "#eb4d4b",
		6: "#6ab04c",
		7: "#be2edd",
		8: "#95afc0",
		9: "#130f40"
	},
	{
		1: "#e056fd",
		2: "#ffbe76",
		3: "#686de0",
		4: "#f6e58d",
		5: "#ff7979",
		6: "#badc58",
		7: "#4834d4",
		8: "#dff9fb",
		9: "#130f40"
	},
	{
		1: "#22a6b3",
		2: "#f0932b",
		3: "#4834d4",
		4: "#f9ca24",
		5: "#eb4d4b",
		6: "#6ab04c",
		7: "#be2edd",
		8: "#c7ecee",
		9: "#30336b"
	},
	{
		1: "#81ecec",
		2: "#fab1a0",
		3: "#74b9ff",
		4: "#ffeaa7",
		5: "#ff7675",
		6: "#55efc4",
		7: "#a29bfe",
		8: "#b2bec3",
		9: "#636e72"
	},
	{
		1: "#e1b12c",
		2: "#e17055",
		3: "#2d3436",
		4: "#fab1a0",
		5: "#d63031",
		6: "#00cec9",
		7: "#6c5ce7",
		8: "#dfe6e9",
		9: "#2d3436"
	},
	{
		1: "#00d2d3",
		2: "#ff9f43",
		3: "#54a0ff",
		4: "#feca57",
		5: "#ff6b6b",
		6: "#1dd1a1",
		7: "#5f27cd",
		8: "#c8d6e5",
		9: "#576574"
	},
	{
		1: "#a29bfe",
		2: "#e17055",
		3: "#0984e3",
		4: "#fdcb6e",
		5: "#d63031",
		6: "#00cec9",
		7: "#6c5ce7",
		8: "#b2bec3",
		9: "#2d3436"
	},
	{
		1: "#81ecec",
		2: "#fab1a0",
		3: "#74b9ff",
		4: "#ffeaa7",
		5: "#ff7675",
		6: "#55efc4",
		7: "#a29bfe",
		8: "#dfe6e9",
		9: "#636e72"
	},
	{
		1: "#00d2d3",
		2: "#ff9f43",
		3: "#2e86de",
		4: "#feca57",
		5: "#ff6b6b",
		6: "#1dd1a1",
		7: "#5f27cd",
		8: "#8395a7",
		9: "#222f3e"
	},
	{
		1: "#b2bec3",
		2: "#e17055",
		3: "#2d3436",
		4: "#fab1a0",
		5: "#d63031",
		6: "#00cec9",
		7: "#6c5ce7",
		8: "#dfe6e9",
		9: "#636e72"
	},
	{
		1: "#0abde3",
		2: "#ee5253",
		3: "#5f27cd",
		4: "#feca57",
		5: "#ff9f43",
		6: "#10ac84",
		7: "#2e86de",
		8: "#c8d6e5",
		9: "#222f3e"
	},
	{
		1: "#e1b12c",
		2: "#e17055",
		3: "#2d3436",
		4: "#fab1a0",
		5: "#d63031",
		6: "#00cec9",
		7: "#6c5ce7",
		8: "#b2bec3",
		9: "#2d3436"
	},
	{
		1: "#48dbfb",
		2: "#ff9f43",
		3: "#54a0ff",
		4: "#f368e0",
		5: "#ff6b6b",
		6: "#10ac84",
		7: "#5f27cd",
		8: "#8395a7",
		9: "#576574"
	},
	{
		1: "#b2bec3",
		2: "#e17055",
		3: "#2d3436",
		4: "#fab1a0",
		5: "#d63031",
		6: "#00cec9",
		7: "#6c5ce7",
		8: "#dfe6e9",
		9: "#636e72"
	},
	{
		1: "#636e72",
		2: "#b2bec3",
		3: "#2d3436",
		4: "#dfe6e9",
		5: "#d63031",
		6: "#00cec9",
		7: "#0984e3",
		8: "#b2bec3",
		9: "#000000"
	},
	{
		1: "#00d2d3",
		2: "#ff9f43",
		3: "#54a0ff",
		4: "#feca57",
		5: "#ff6b6b",
		6: "#1dd1a1",
		7: "#5f27cd",
		8: "#c8d6e5",
		9: "#222f3e"
	},
	{
		1: "#0abde3",
		2: "#ee5253",
		3: "#5f27cd",
		4: "#feca57",
		5: "#ff9f43",
		6: "#10ac84",
		7: "#2e86de",
		8: "#8395a7",
		9: "#576574"
	},
	{
		1: "#00d2d3",
		2: "#ff9f43",
		3: "#2e86de",
		4: "#feca57",
		5: "#ff6b6b",
		6: "#1dd1a1",
		7: "#5f27cd",
		8: "#c8d6e5",
		9: "#222f3e"
	},
	{
		1: "#48dbfb",
		2: "#ff9f43",
		3: "#54a0ff",
		4: "#f368e0",
		5: "#ff6b6b",
		6: "#10ac84",
		7: "#5f27cd",
		8: "#8395a7",
		9: "#576574"
	},
	{
		1: "#e17055",
		2: "#d63031",
		3: "#2d3436",
		4: "#fab1a0",
		5: "#ff7675",
		6: "#00cec9",
		7: "#6c5ce7",
		8: "#b2bec3",
		9: "#2d3436"
	},
	{
		1: "#0abde3",
		2: "#ee5253",
		3: "#5f27cd",
		4: "#feca57",
		5: "#ff9f43",
		6: "#10ac84",
		7: "#2e86de",
		8: "#c8d6e5",
		9: "#222f3e"
	},
	{
		1: "#00b894",
		2: "#fab1a0",
		3: "#0984e3",
		4: "#ffeaa7",
		5: "#d63031",
		6: "#55efc4",
		7: "#a29bfe",
		8: "#dfe6e9",
		9: "#636e72"
	},
	{
		1: "#a29bfe",
		2: "#e17055",
		3: "#0984e3",
		4: "#fdcb6e",
		5: "#d63031",
		6: "#00cec9",
		7: "#6c5ce7",
		8: "#b2bec3",
		9: "#2d3436"
	}
];

function getColors(level) {
	const p = PALETTES[(level - 1) % PALETTES.length];
	return [null, p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8], p[9]];
}

function toggleTheme() {
	document.body.classList.toggle("dark-mode");
}
function toggleModal(id) {
	const el = document.getElementById(id);
	if (el.classList.contains("hidden")) {
		document
			.querySelectorAll(".modal-overlay:not(.hidden)")
			.forEach((m) => m.classList.add("hidden"));
		el.classList.remove("hidden");
	} else {
		el.classList.add("hidden");
	}
}

function shareTwitter() {
	const shareUrl = "https://codepen.io/Julibe/full/KwzXdRq";
	const viaUser = "Julibe";

	let score = 0;
	let level = 1;
	let speedSetting = 5;
	let mode = "Solo";

	if (typeof p1 !== "undefined" && p1) {
		score = p1.player.score;
		level = p1.player.level;
		speedSetting = Math.round(1000 / p1.baseSpeed);
	} else {
		const inp = document.getElementById("inp-speed");
		if (inp) speedSetting = parseInt(inp.value) || 5;
	}

	const isDual =
		typeof vsAI !== "undefined"
			? vsAI
			: document.getElementById("chk-ai")
			? document.getElementById("chk-ai").checked
			: false;
	if (isDual) mode = "Versus AI";

	const messages = [
		`I just curated an exquisite piece in METRIO ${mode}. Critics rated it ${score} moving at Speed ${speedSetting} on Level ${level}.`,
		`The tension between order and chaos in METRIO on Level ${level} resulted in a score of ${score}. A ${mode} study at Speed ${speedSetting}.`,
		`At Speed ${speedSetting}, geometry becomes emotion in METRIO. I achieved ${score} in ${mode}, reaching Level ${level} of the exhibit.`,
		`A kinetic performance of ${mode} in METRIO. Level ${level} demanded Speed ${speedSetting}, yielding a critical score of ${score}.`
	];

	const hashtagsList = [
		"Metrio",
		"Minimalism",
		"DigitalArt",
		"Tetris",
		"Julibe"
	];

	const text = messages[Math.floor(Math.random() * messages.length)];
	let selectedTags = hashtagsList.sort(() => 0.5 - Math.random()).slice(0, 4);
	const hashtags = selectedTags.join(",");

	const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
		text
	)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(
		hashtags
	)}&via=${encodeURIComponent(viaUser)}`;
	window.open(twitterUrl, "_blank");
}

function saveConfig() {
	const config = {
		cols: document.getElementById("inp-cols").value,
		rows: document.getElementById("inp-rows").value,
		speed: document.getElementById("inp-speed").value,
		ai: document.getElementById("chk-ai").checked,
		grid: document.getElementById("chk-grid").checked,
		dark: document.getElementById("chk-dark").checked
	};
	localStorage.setItem("metrio_config", JSON.stringify(config));
}

function loadConfig() {
	const cfg = JSON.parse(localStorage.getItem("metrio_config"));
	if (cfg) {
		document.getElementById("inp-cols").value = cfg.cols || 12;
		document.getElementById("inp-rows").value = cfg.rows || 20;

		let savedSpeed = parseInt(cfg.speed);
		// Ensure legacy millisecond values are reset to default 5
		if (savedSpeed > 20 || savedSpeed < 1) savedSpeed = 5;

		document.getElementById("inp-speed").value = savedSpeed;
		document.getElementById("chk-ai").checked = cfg.ai;
		document.getElementById("chk-grid").checked = cfg.grid;
		document.getElementById("chk-dark").checked = cfg.dark;
		if (cfg.dark) document.body.classList.add("dark-mode");
	}
	const hs = localStorage.getItem("metrio_highscore") || 0;
	document.getElementById("high-score-display").innerText = "High Score: " + hs;
}

class TetrisGame {
	constructor(containerId, canvasId, cols, rows, isAI) {
		this.container = document.getElementById(containerId);
		this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext("2d");
		this.isAI = isAI;

		const prefix = isAI ? "p2" : "p1";
		this.uiElements = [
			document.getElementById(prefix + "-stats"),
			document.getElementById(prefix + "-lbl"),
			document.getElementById(prefix + "-hold-lbl"),
			document.getElementById(prefix + "-next-lbl")
		];

		this.cols = cols;
		this.rows = rows;
		this.canvas.width = cols * SCALE;
		this.canvas.height = rows * SCALE;
		this.container.style.width = cols * SCALE + "px";
		this.container.style.height = rows * SCALE + "px";
		this.ctx.scale(SCALE, SCALE);

		this.arena = this.createMatrix(cols, rows);
		this.player = {
			pos: { x: 0, y: 0 },
			matrix: null,
			next: null,
			hold: null,
			canHold: true,
			score: 0,
			level: 1,
			lines: 0
		};

		this.dropCounter = 0;
		this.dropInterval = 1000;
		this.baseSpeed = 1000;
		this.isDead = false;
		this.particles = [];
		this.shockwaves = [];
		this.glitch = 0;
		this.uiTimeout = null;

		this.player.next = this.getRandomPiece();
		this.resetPiece();
	}

	setSpeed(s) {
		this.baseSpeed = s;
		this.dropInterval = s;
	}
	createMatrix(w, h) {
		const m = [];
		while (h--) m.push(new Array(w).fill(0));
		return m;
	}

	createPiece(type) {
		if (type == "I")
			return [
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 0, 0]
			];
		if (type == "L")
			return [
				[0, 2, 0],
				[0, 2, 0],
				[0, 2, 2]
			];
		if (type == "J")
			return [
				[0, 3, 0],
				[0, 3, 0],
				[3, 3, 0]
			];
		if (type == "O")
			return [
				[4, 4],
				[4, 4]
			];
		if (type == "Z")
			return [
				[5, 5, 0],
				[0, 5, 5],
				[0, 0, 0]
			];
		if (type == "S")
			return [
				[0, 6, 6],
				[6, 6, 0],
				[0, 0, 0]
			];
		if (type == "T")
			return [
				[0, 7, 0],
				[7, 7, 7],
				[0, 0, 0]
			];
		if (type == "B")
			return [
				[0, 9, 0],
				[9, 9, 9],
				[0, 9, 0]
			];
		if (type == "G") return [[8]];
	}
	getRandomPiece() {
		return this.createPiece(
			Math.random() < 0.05
				? "B"
				: "ILJOTSZ"[("ILJOTSZ".length * Math.random()) | 0]
		);
	}

	collide(arena, player) {
		const m = player.matrix,
			o = player.pos;
		for (let y = 0; y < m.length; ++y)
			for (let x = 0; x < m[y].length; ++x)
				if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0)
					return true;
		return false;
	}

	merge(arena, player) {
		player.matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0) {
					arena[y + player.pos.y][x + player.pos.x] = value;
					if (!isPaused)
						this.shockwaves.push({
							x: (x + player.pos.x) * SCALE + 10,
							y: (y + player.pos.y) * SCALE + 10,
							r: 1,
							op: 0.5,
							col: "#999"
						});
				}
			});
		});
		if (!this.isAI) sfx.play("drop");
	}

	rotate(m, d) {
		for (let y = 0; y < m.length; ++y)
			for (let x = 0; x < y; ++x) [m[x][y], m[y][x]] = [m[y][x], m[x][y]];
		if (d > 0) m.forEach((r) => r.reverse());
		else m.reverse();
	}
	playerRotate(d) {
		const p = this.player.pos.x;
		let offset = 1;
		this.rotate(this.player.matrix, d);
		while (this.collide(this.arena, this.player)) {
			this.player.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1));
			if (offset > this.player.matrix[0].length) {
				this.rotate(this.player.matrix, -d);
				this.player.pos.x = p;
				return;
			}
		}
		if (!this.isAI) sfx.play("rotate");
	}

	resetPiece() {
		this.player.matrix = this.player.next;
		this.player.next = this.getRandomPiece();
		this.player.pos.y = 0;
		this.player.pos.x =
			((this.cols / 2) | 0) - ((this.player.matrix[0].length / 2) | 0);
		if (this.collide(this.arena, this.player)) this.isDead = true;

		const prefix = this.isAI ? "p2" : "p1";
		const ctx = document.getElementById(prefix + "-next").getContext("2d");
		drawMini(ctx, this.player.next, this.player.level);
	}

	addGarbage(amount) {
		for (let i = 0; i < amount; i++) this.arena.shift();
		for (let i = 0; i < amount; i++) {
			const row = new Array(this.cols).fill(8);
			row[Math.floor(Math.random() * this.cols)] = 0;
			this.arena.push(row);
		}
	}

	sweep() {
		let lines = 0,
			bomb = null;
		outer: for (let y = this.arena.length - 1; y > 0; --y) {
			for (let x = 0; x < this.arena[y].length; ++x) {
				if (this.arena[y][x] === 0) continue outer;
				if (this.arena[y][x] === 9) bomb = { x, y };
			}
			const row = this.arena.splice(y, 1)[0].fill(0);
			this.arena.unshift(row);
			++y;
			lines++;
		}

		for (let x = 0; x < this.cols; x++) {
			let colFull = true;
			for (let y = 0; y < this.rows; y++)
				if (this.arena[y][x] === 0) {
					colFull = false;
					break;
				}
			if (colFull) {
				lines++;
				this.floatText("VERTICAL", 1.2);
				for (let y = 0; y < this.rows; y++) {
					this.arena[y][x] = 0;
					this.particles.push({
						x,
						y,
						vx: Math.random() - 0.5,
						vy: Math.random() - 0.5,
						life: 1,
						col: "#999"
					});
				}
			}
		}

		if (bomb) {
			lines += 3;
			this.glitch = 20;
			this.floatText("ANOMALY", 2);
			for (let by = bomb.y - 2; by <= bomb.y + 2; by++)
				if (this.arena[by])
					for (let bx = bomb.x - 2; bx <= bomb.x + 2; bx++)
						if (this.arena[by][bx] !== undefined) this.arena[by][bx] = 0;
		}

		if (lines > 0) {
			if (!this.isAI) sfx.play("clear");
			let pts = lines === 1 ? 100 : lines === 2 ? 300 : lines === 3 ? 500 : 600;
			this.updateScore(pts);
			this.player.lines += lines;

			if (lines >= 4) {
				this.floatText("METRIO!");
				this.glitch = 10;
			} else if (lines > 0 && !bomb) this.floatText("+" + pts);

			if (vsAI) {
				const enemy = this.isAI ? p1 : p2;
				if (lines > 0 && !enemy.isDead) enemy.addGarbage(lines);
			}

			if (Math.floor(this.player.lines / 5) + 1 > this.player.level) {
				this.player.level++;
				if (!this.isAI) sfx.play("level");
				this.baseSpeed *= 0.9;
				this.floatText("EVOLUTION", 1.5, "#e84393");
				this.triggerUI();
			}
		}
	}

	drop() {
		this.player.pos.y++;
		if (this.collide(this.arena, this.player)) {
			this.player.pos.y--;
			this.merge(this.arena, this.player);
			this.resetPiece();
			this.sweep();
			this.player.canHold = true;
		}
		this.dropCounter = 0;
	}

	updateScore(n) {
		this.player.score += n;
		this.triggerUI();
	}

	triggerUI() {
		const prefix = this.isAI ? "p2" : "p1";
		document.getElementById(prefix + "-score").innerText = this.player.score;
		document.getElementById(prefix + "-lvl").innerText = this.player.level;

		if (showGrid) this.uiElements.forEach((e) => (e.style.opacity = 1));
		else {
			this.uiElements.forEach((e) => (e.style.opacity = 1));
			if (this.uiTimeout) clearTimeout(this.uiTimeout);
			this.uiTimeout = setTimeout(
				() => this.uiElements.forEach((e) => (e.style.opacity = 0)),
				5000
			);
		}
	}

	update(dt) {
		if (this.isDead) return;
		this.dropCounter += dt;
		if (this.dropCounter > this.dropInterval) this.drop();

		if (this.isAI) {
			if (Math.random() < 0.05) this.playerRotate(1);
			if (Math.random() < 0.1) {
				const d = Math.random() < 0.5 ? 1 : -1;
				this.player.pos.x += d;
				if (this.collide(this.arena, this.player)) this.player.pos.x -= d;
			}
			if (Math.random() < 0.03) this.drop();
		}

		this.particles.forEach((p) => {
			p.x += p.vx;
			p.y += p.vy;
			p.life -= 0.05;
		});
		this.particles = this.particles.filter((p) => p.life > 0);
		this.shockwaves.forEach((s) => {
			s.r += 2;
			s.op -= 0.05;
		});
		this.shockwaves = this.shockwaves.filter((s) => s.op > 0);
		if (this.glitch > 0) this.glitch *= 0.9;
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		const colors = getColors(this.player.level);
		let sx = 0,
			sy = 0;
		if (this.glitch > 0.5) {
			sx = (Math.random() - 0.5) * this.glitch;
			sy = (Math.random() - 0.5) * this.glitch;
		}
		this.ctx.save();
		this.ctx.translate(sx, sy);

		if (showGrid) {
			this.ctx.strokeStyle = "rgba(128,128,128,0.2)";
			this.ctx.lineWidth = 0.05;
			this.ctx.beginPath();
			for (let x = 0; x <= this.cols; x++) {
				this.ctx.moveTo(x, 0);
				this.ctx.lineTo(x, this.rows);
			}
			for (let y = 0; y <= this.rows; y++) {
				this.ctx.moveTo(0, y);
				this.ctx.lineTo(this.cols, y);
			}
			this.ctx.stroke();
		}

		const drawM = (m, o, g) => {
			m.forEach((row, y) => {
				row.forEach((v, x) => {
					if (v !== 0) {
						this.ctx.fillStyle = g
							? document.body.classList.contains("dark-mode")
								? "#555"
								: "#bbb"
							: colors[v];
						this.ctx.fillRect(x + o.x, y + o.y, 1, 1);
						if (!g) {
							this.ctx.lineWidth = 0.05;
							this.ctx.strokeStyle = document.body.classList.contains("dark-mode")
								? "#000"
								: "#fff";
							this.ctx.strokeRect(x + o.x, y + o.y, 1, 1);
						}
					}
				});
			});
		};

		drawM(this.arena, { x: 0, y: 0 });
		if (!this.isDead) {
			const gp = { ...this.player.pos };
			while (!this.collide(this.arena, { pos: gp, matrix: this.player.matrix }))
				gp.y++;
			gp.y--;
			this.ctx.globalAlpha = 0.3;
			drawM(this.player.matrix, gp, true);
			this.ctx.globalAlpha = 1;
			drawM(this.player.matrix, this.player.pos);
		}
		this.ctx.restore();

		this.ctx.save();
		this.ctx.scale(SCALE, SCALE);
		this.particles.forEach((p) => {
			this.ctx.fillStyle = p.col;
			this.ctx.globalAlpha = p.life;
			this.ctx.fillRect(p.x, p.y, 0.2, 0.2);
		});
		this.ctx.restore();

		this.shockwaves.forEach((s) => {
			this.ctx.beginPath();
			this.ctx.strokeStyle = s.col;
			this.ctx.globalAlpha = s.op;
			this.ctx.lineWidth = 2;
			const r = s.r;
			this.ctx.rect(s.x - r, s.y - r, r * 2, r * 2);
			this.ctx.stroke();
		});
		this.ctx.globalAlpha = 1;
	}

	floatText(txt, size = 1, col = null) {
		if (!col)
			col = document.body.classList.contains("dark-mode") ? "#fff" : "#333";
		const el = document.createElement("div");
		el.classList.add("float-text");
		el.innerText = txt;
		el.style.fontSize = 1.5 * size + "rem";
		el.style.color = col;
		el.style.left = "50%";
		el.style.top = "40%";
		this.container.appendChild(el);
		setTimeout(() => el.remove(), 1500);
	}
}

let p1, p2;
let lastTime = 0,
	isPaused = true,
	vsAI = false,
	showGrid = false,
	passiveTimer = 0,
	gameRunning = false;
const gpState = {
	a: false,
	b: false,
	x: false,
	y: false,
	start: false,
	moveTimer: 0
};

function drawMini(ctx, matrix, lvl) {
	ctx.clearRect(0, 0, 60, 60);
	if (!matrix) return;
	const cs = getColors(lvl);
	ctx.save();
	ctx.scale(15, 15);
	const ox = (4 - matrix[0].length) / 2;
	const oy = (4 - matrix.length) / 2;
	matrix.forEach((r, y) => {
		r.forEach((v, x) => {
			if (v) {
				ctx.fillStyle = cs[v];
				ctx.fillRect(x + ox, y + oy, 1, 1);
				ctx.lineWidth = 0.05;
				ctx.strokeStyle = document.body.classList.contains("dark-mode")
					? "#000"
					: "#fff";
				ctx.strokeRect(x + ox, y + oy, 1, 1);
			}
		});
	});
	ctx.restore();
}

function togglePause() {
	if (!gameRunning) return;
	if (isPaused) resumeGame();
	else pauseGame();
}
function pauseGame() {
	isPaused = true;
	document.getElementById("pause-menu").classList.remove("hidden");
	document.getElementById("p1-canvas").classList.add("blurred");
	if (vsAI) document.getElementById("p2-canvas").classList.add("blurred");
	document.getElementById("socials").classList.remove("hidden");
}
function resumeGame() {
	isPaused = false;
	document.getElementById("pause-menu").classList.add("hidden");
	document.getElementById("p1-canvas").classList.remove("blurred");
	if (vsAI) document.getElementById("p2-canvas").classList.remove("blurred");
	lastTime = performance.now();
	document.getElementById("socials").classList.add("hidden");
}
function showMenu() {
	gameRunning = false;
	isPaused = true;
	document.getElementById("menu").classList.remove("hidden");
	document.getElementById("game-over").classList.add("hidden");
	document.getElementById("pause-menu").classList.add("hidden");
	document
		.querySelectorAll(".modal-overlay")
		.forEach((m) => m.classList.add("hidden"));
	document.getElementById("pause-btn").style.display = "none";
	document.getElementById("socials").classList.remove("hidden");
	loadConfig();
}

function startGame() {
	if (audioCtx.state === "suspended") audioCtx.resume();
	saveConfig();

	const w = parseInt(document.getElementById("inp-cols").value) || 12;
	const h = parseInt(document.getElementById("inp-rows").value) || 20;

	// Convert 1-20 input to Milliseconds (1 = 1000ms, 20 = 50ms)
	let speedVal = parseInt(document.getElementById("inp-speed").value) || 5;
	if (speedVal < 1) speedVal = 1;
	if (speedVal > 20) speedVal = 20;
	const spd = 1000 / speedVal;

	vsAI = document.getElementById("chk-ai").checked;
	showGrid = document.getElementById("chk-grid").checked;

	document.getElementById("menu").classList.add("hidden");
	document.getElementById("game-over").classList.add("hidden");
	document.getElementById("pause-btn").style.display = "flex";
	document.getElementById("socials").classList.add("hidden");
	document.getElementById("p1-canvas").classList.remove("blurred");
	document.getElementById("p2-canvas").classList.remove("blurred");

	const p2Div = document.getElementById("p2-container");
	p2Div.style.display = vsAI ? "block" : "none";

	p1 = new TetrisGame("p1-container", "p1-canvas", w, h, false);
	p1.setSpeed(spd);
	p2 = vsAI ? new TetrisGame("p2-container", "p2-canvas", w, h, true) : null;
	if (p2) p2.setSpeed(spd);

	const prefix = vsAI ? "p2" : "p1";
	drawMini(document.getElementById(prefix + "-hold").getContext("2d"), null, 1);
	drawMini(document.getElementById("p1-hold").getContext("2d"), null, 1);

	p1.triggerUI();
	isPaused = false;
	gameRunning = true;
	passiveTimer = 0;

	// Hard reset of loop time
	lastTime = performance.now();
	requestAnimationFrame(update);
}

function gameOver(msg) {
	gameRunning = false;
	isPaused = true;
	const currentHS = parseInt(localStorage.getItem("metrio_highscore")) || 0;
	if (p1.player.score > currentHS) {
		localStorage.setItem("metrio_highscore", p1.player.score);
		msg += " (NEW HIGH SCORE!)";
	}
	document.getElementById("game-over").classList.remove("hidden");
	document.getElementById("go-msg").innerText =
		msg + " - Score: " + p1.player.score;
	document.getElementById("socials").classList.remove("hidden");
}

function updateGamepad(dt) {
	const gp = navigator.getGamepads()[0];
	if (!gp) return;
	const deadzone = 0.5;

	if (gp.buttons[9].pressed && !gpState.start) togglePause();
	gpState.start = gp.buttons[9].pressed;

	if (isPaused) return;

	if (gp.buttons[0].pressed) p1.dropInterval = 50;
	else p1.dropInterval = p1.baseSpeed;

	const rot = gp.buttons[1].pressed || gp.buttons[12].pressed;
	if (rot && !gpState.b) p1.playerRotate(1);
	gpState.b = rot;

	if (gp.buttons[3].pressed && !gpState.y) hold();
	gpState.y = gp.buttons[3].pressed;
	if (gp.buttons[2].pressed && !gpState.x) steal();
	gpState.x = gp.buttons[2].pressed;

	gpState.moveTimer += dt;
	if (gpState.moveTimer > 100) {
		if (gp.axes[0] < -deadzone || gp.buttons[14].pressed) {
			p1.player.pos.x--;
			if (p1.collide(p1.arena, p1.player)) p1.player.pos.x++;
			else sfx.play("move");
			gpState.moveTimer = 0;
		} else if (gp.axes[0] > deadzone || gp.buttons[15].pressed) {
			p1.player.pos.x++;
			if (p1.collide(p1.arena, p1.player)) p1.player.pos.x--;
			else sfx.play("move");
			gpState.moveTimer = 0;
		}
	}
}

function update(time = 0) {
	if (isPaused || !gameRunning) return;

	// Clamp DT to prevent giant jumps (max 100ms per frame)
	if (!lastTime) lastTime = time;
	let dt = time - lastTime;
	if (dt > 100) dt = 100;
	lastTime = time;

	updateGamepad(dt);

	passiveTimer += dt;
	if (passiveTimer > 10000) {
		const bonus = 10 + p1.player.level;
		p1.updateScore(bonus);
		p1.floatText("PASSIVE", 1);
		passiveTimer = 0;
	}

	p1.update(dt);
	p1.draw();
	if (vsAI && p2) {
		p2.update(dt);
		p2.draw();
	}

	if (p1.isDead) gameOver("DECONSTRUCTED");
	else if (vsAI && p2.isDead) {
		p1.updateScore(2000);
		gameOver("DOMINANCE");
	}

	requestAnimationFrame(update);
}

function hold() {
	if (!p1.player.canHold) return;
	if (p1.player.hold) {
		[p1.player.matrix, p1.player.hold] = [p1.player.hold, p1.player.matrix];
		p1.player.pos.y = 0;
		p1.player.pos.x =
			((p1.cols / 2) | 0) - ((p1.player.matrix[0].length / 2) | 0);
	} else {
		p1.player.hold = p1.player.matrix;
		p1.resetPiece();
	}
	p1.player.canHold = false;
	drawMini(
		document.getElementById("p1-hold").getContext("2d"),
		p1.player.hold,
		p1.player.level
	);
}

function steal() {
	if (!vsAI || p1.isDead || p2.isDead) return;
	if (p1.player.score >= 200) {
		p1.updateScore(-200);
		const tmp = p1.player.matrix;
		p1.player.matrix = p2.player.matrix;
		p2.player.matrix = tmp;
		p1.player.pos.x =
			((p1.cols / 2) | 0) - ((p1.player.matrix[0].length / 2) | 0);
		p2.player.pos.x =
			((p2.cols / 2) | 0) - ((p2.player.matrix[0].length / 2) | 0);
		p1.floatText("EXCHANGE", 1.5, "#d63031");
		p2.floatText("ERROR", 1.5);
	}
}

document.addEventListener("keydown", (e) => {
	if (!gameRunning) return;
	const k = e.key.toLowerCase(),
		c = e.code;
	if (k === "p" || c === "Escape") {
		togglePause();
		return;
	}
	if (isPaused) return;
	if (c === "ArrowLeft" || k === "a") {
		p1.player.pos.x--;
		if (p1.collide(p1.arena, p1.player)) p1.player.pos.x++;
		else sfx.play("move");
	} else if (c === "ArrowRight" || k === "d") {
		p1.player.pos.x++;
		if (p1.collide(p1.arena, p1.player)) p1.player.pos.x--;
		else sfx.play("move");
	} else if (c === "ArrowUp" || k === "w") p1.playerRotate(1);
	else if (k === "q") hold();
	else if (k === "f") steal();
	else if (c === "Space" || k === "s" || c === "ArrowDown") {
		e.preventDefault();
		p1.dropInterval = 50;
	}
});

document.addEventListener("keyup", (e) => {
	const k = e.key.toLowerCase(),
		c = e.code;
	if (c === "Space" || k === "s" || c === "ArrowDown")
		p1.dropInterval = p1.baseSpeed;
});

// --- ADDED CONNECTION LISTENERS ---
window.addEventListener("gamepadconnected", (e) => {
	console.log(
		"Gamepad connected at index %d: %s. %d buttons, %d axes.",
		e.gamepad.index,
		e.gamepad.id,
		e.gamepad.buttons.length,
		e.gamepad.axes.length
	);
});

document.getElementById("pause-btn").style.display = "none";
showMenu();
