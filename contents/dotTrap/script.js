/*
	Dot Trap Game Engine (dot_trap_engine)
	Version:
		2.1.3
	Author:
		Julibe - Crafting Amazing Digital Experiences
	Copyright:
		2025 © https://julibe.com
	License:
		Creative Commons Attribution NonCommercial (CC BY-NC 4.0)
	Description:
		Core logic for Dot Trap. A strategy game where every line counts.
	Parameters:
		N/A
	Usage:
		Include in HTML. Objects (Game, Themes, AudioEngine) are exposed globally.
	Returns:
		Global Game instance.
	Dependencies:
		None.
	Notes:
		Personality and creative text preserved. Backward compatibility with HTML events maintained.
	Last Updated: 2025-12-13
*/

const $ = (id) => document.getElementById(id);
const rand = (min, max) => Math.random() * (max - min) + min;

// --- Configuration & Assets ---

const OLD_NAMES = [
	"Agnes",
	"Barnaby",
	"Cornelius",
	"Dorothy",
	"Edith",
	"Ferdinand",
	"Gertrude",
	"Horatio",
	"Ida",
	"Jebediah",
	"Mabel",
	"Mortimer",
	"Opal",
	"Percy",
	"Ruth",
	"Wilbur"
];

const COLORS = [
	{ n: "Red", c: "#F44336" },
	{ n: "Blue", c: "#2196F3" },
	{ n: "Green", c: "#263e15" },
	{ n: "Yellow", c: "#FFEB3B" },
	{ n: "Orange", c: "#FF9800" },
	{ n: "Purple", c: "#9C27B0" },
	{ n: "Pink", c: "#E91E63" },
	{ n: "Brown", c: "#795548" },
	{ n: "Black", c: "#000000" },
	{ n: "Gray", c: "#607D8B" }
];

const THEME_DATA = [
	{
		id: "volcano",
		name: "Inferno Peak",
		primary: "#FF5722",
		bg: ["#FFAB91", "#D84315"],
		els: ["#BF360C", "#3E2723"],
		bpm: 150,
		scale: "phrygian",
		wave: "sawtooth",
		atk: 0.05,
		rel: 0.1
	},
	{
		id: "sea",
		name: "Azure Depth",
		primary: "#436e71",
		bg: ["#B2EBF2", "#006064"],
		els: ["#0097A7", "#004D40"],
		bpm: 70,
		scale: "pentatonic",
		wave: "sine",
		atk: 0.8,
		rel: 1.5
	},
	{
		id: "jungle",
		name: "Savage Wilds",
		primary: "#558b2f",
		bg: ["#DCEDC8", "#33691E"],
		els: ["#558B2F", "#1B5E20"],
		bpm: 110,
		scale: "major",
		wave: "triangle",
		atk: 0.1,
		rel: 0.3
	},
	{
		id: "moon",
		name: "Lunar Silence",
		primary: "#B0BEC5",
		bg: ["#ECEFF1", "#263238"],
		els: ["#78909C", "#37474F"],
		bpm: 50,
		scale: "minor",
		wave: "sine",
		atk: 0.2,
		rel: 2.0
	},
	{
		id: "city",
		name: "Neon Nights",
		primary: "#E040FB",
		bg: ["#F3E5F5", "#4A148C"],
		els: ["#AA00FF", "#311B92"],
		bpm: 125,
		scale: "dorian",
		wave: "square",
		atk: 0.02,
		rel: 0.15
	},
	{
		id: "desert",
		name: "Golden Dunes",
		primary: "#FFC107",
		bg: ["#FFF9C4", "#FF6F00"],
		els: ["#FFB300", "#E65100"],
		bpm: 95,
		scale: "harmonicMinor",
		wave: "triangle",
		atk: 0.1,
		rel: 0.5
	},
	{
		id: "cyber",
		name: "Glitch Matrix",
		primary: "#00E676",
		bg: ["#000000", "#004D40"],
		els: ["#00C853", "#1B5E20"],
		bpm: 135,
		scale: "chromatic",
		wave: "sawtooth",
		atk: 0.01,
		rel: 0.05
	},
	{
		id: "candy",
		name: "Sugar Rush",
		primary: "#FF4081",
		bg: ["#F8BBD0", "#C2185B"],
		els: ["#E91E63", "#880E4F"],
		bpm: 160,
		scale: "major",
		wave: "square",
		atk: 0.05,
		rel: 0.1
	},
	{
		id: "horror",
		name: "Shadow Realm",
		primary: "#6200EA",
		bg: ["#311B92", "#000000"],
		els: ["#4527A0", "#1A237E"],
		bpm: 85,
		scale: "diminished",
		wave: "sawtooth",
		atk: 0.3,
		rel: 1.0
	},
	{
		id: "sky",
		name: "Aether Float",
		primary: "#2979FF",
		bg: ["#E3F2FD", "#1565C0"],
		els: ["#64B5F6", "#0D47A1"],
		bpm: 90,
		scale: "lydian",
		wave: "sine",
		atk: 0.5,
		rel: 1.2
	},
	{
		id: "mars",
		name: "Crimson Tide",
		primary: "#D50000",
		bg: ["#FFCDD2", "#B71C1C"],
		els: ["#D32F2F", "#212121"],
		bpm: 140,
		scale: "phrygian",
		wave: "square",
		atk: 0.02,
		rel: 0.2
	},
	{
		id: "void",
		name: "Deep Void",
		primary: "#333333",
		bg: ["#424242", "#000000"],
		els: ["#757575", "#212121"],
		bpm: 60,
		scale: "diminished",
		wave: "sine",
		atk: 0.1,
		rel: 1.5
	},
	{
		id: "retro",
		name: "8-Bit Boy",
		primary: "#33691E",
		bg: ["#DCEDC8", "#8BC34A"],
		els: ["#558B2F", "#1B5E20"],
		bpm: 180,
		scale: "major",
		wave: "square",
		atk: 0.01,
		rel: 0.05
	},
	{
		id: "ice",
		name: "Glacial Peak",
		primary: "#26c6da",
		bg: ["#E0F7FA", "#B2EBF2"],
		els: ["#26C6DA", "#006064"],
		bpm: 80,
		scale: "lydian",
		wave: "triangle",
		atk: 0.2,
		rel: 0.8
	},
	{
		id: "royal",
		name: "Majestic Hall",
		primary: "#3e178f",
		bg: ["#311B92", "#4A148C"],
		els: ["#7B1FA2", "#FFC107"],
		bpm: 115,
		scale: "harmonicMinor",
		wave: "sawtooth",
		atk: 0.1,
		rel: 0.4
	}
];

// --- Theme Manager ---

const Themes = {
	theme_index: 0,
	current: THEME_DATA[0],

	init() {
		this.theme_index = Math.floor(Math.random() * THEME_DATA.length);
		this.applyTheme();
		this.renderSwatches();
	},
	next() {
		this.setTheme(this.theme_index + 1);
	},
	prev() {
		this.setTheme(this.theme_index - 1 + THEME_DATA.length);
	},

	setTheme(index) {
		this.theme_index = index % THEME_DATA.length;
		this.applyTheme();
	},

	applyTheme() {
		this.current = THEME_DATA[this.theme_index];
		document.documentElement.style.setProperty(
			"--theme-primary",
			this.current.primary
		);
		const name_el = $("theme-name");
		if (name_el) name_el.innerText = this.current.name;

		Particles.particle_pool = [];
		if (Game.preview_canvas) {
			Game.renderBG(Game.preview_canvas.getContext("2d"), 300, 300, true);
		}
	},

	renderSwatches() {
		const cp = $("color-picker");
		if (!cp) return;
		cp.innerHTML = COLORS.map(
			(color, index) =>
				`<div class="swatch ${index === 1 ? "selected" : ""}"
				style="background:${color.c}"
				onclick="Themes.pickColor('${color.c}', this); AudioEngine.uiClick()"
				onmouseover="AudioEngine.uiHover()"></div>`
		).join("");
	},

	pickColor(color, element) {
		document
			.querySelectorAll(".swatch")
			.forEach((e) => e.classList.remove("selected"));
		element.classList.add("selected");
		Game.user_color = color;
	}
};

// --- Audio Engine ---

const AudioEngine = {
	context: null,
	analyser: null,
	data_array: null,
	master_gain: null,
	is_muted: true,
	next_note_time: 0,
	beat_count: 0,

	scales: {
		major: [0, 2, 4, 5, 7, 9, 11],
		minor: [0, 2, 3, 5, 7, 8, 10],
		phrygian: [0, 1, 3, 5, 7, 8, 10],
		pentatonic: [0, 2, 4, 7, 9],
		dorian: [0, 2, 3, 5, 7, 9, 10],
		harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
		diminished: [0, 2, 3, 5, 6, 8, 9, 11],
		lydian: [0, 2, 4, 6, 7, 9, 11],
		chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
	},

	init() {
		if (!this.context) {
			this.context = new (window.AudioContext || window.webkitAudioContext)();
			this.master_gain = this.context.createGain();
			this.master_gain.connect(this.context.destination);
			this.analyser = this.context.createAnalyser();
			this.analyser.fftSize = 256;
			this.master_gain.connect(this.analyser);
			this.data_array = new Uint8Array(this.analyser.frequencyBinCount);
		}
		this.updateIcon();
	},

	toggle() {
		this.is_muted = !this.is_muted;
		if (!this.is_muted && this.context && this.context.state === "suspended") {
			this.context.resume();
		}
		this.updateIcon();
	},

	updateIcon() {
		const btn = $("audio-btn");
		if (btn)
			btn.innerHTML = this.is_muted
				? '<i class="fa-solid fa-volume-xmark"></i>'
				: '<i class="fa-solid fa-volume-high"></i>';
	},

	getEnergy() {
		if (this.is_muted || !this.analyser) return 0;
		this.analyser.getByteFrequencyData(this.data_array);
		let sum = 0;
		for (let i = 0; i < 30; i++) sum += this.data_array[i];
		return sum / 30 / 255;
	},

	tick() {
		if (this.is_muted || !this.context) return;
		const now = this.context.currentTime;
		if (now >= this.next_note_time) {
			this.playSequencerNote();
			const sec_per_beat = 60.0 / Themes.current.bpm;
			this.next_note_time = now + 0.25 * sec_per_beat;
			this.beat_count++;
		}
	},

	playSequencerNote() {
		const theme = Themes.current;
		const scale = this.scales[theme.scale];
		const beat = this.beat_count % 16;
		const root = 146.83;

		if (beat % 4 === 0) {
			const interval = Math.random() > 0.7 ? 7 : 0;
			const freq = (root * Math.pow(2, interval / 12)) / 2;
			this.playTone(freq, theme.wave, theme.atk, theme.rel, 0.15);
		}

		let should_play = false;
		if (theme.id === "volcano" || theme.id === "cyber") should_play = true;
		else if (theme.id === "sea" || theme.id === "moon")
			should_play = beat % 4 === 0;
		else should_play = beat % 2 === 0;

		if (should_play && Math.random() > 0.3) {
			const idx = Math.floor(Math.random() * scale.length);
			const octave = theme.id === "sea" ? 0 : 1;
			const freq = root * Math.pow(2, (scale[idx] + octave * 12) / 12);
			this.playTone(freq, theme.wave, theme.atk, theme.rel, 0.05);
		}
	},

	playTone(freq, type, attack, release, volume) {
		const osc = this.context.createOscillator();
		const gain = this.context.createGain();
		osc.type = type;
		osc.frequency.value = freq;
		const now = this.context.currentTime;

		gain.gain.setValueAtTime(0, now);
		gain.gain.linearRampToValueAtTime(volume, now + attack);
		gain.gain.exponentialRampToValueAtTime(0.001, now + attack + release);

		osc.connect(gain);
		gain.connect(this.master_gain);
		osc.start(now);
		osc.stop(now + attack + release);
	},

	sfx(type) {
		if (this.is_muted) return;
		if (type === "draw") this.playTone(1000, "sine", 0.01, 0.1, 0.1);
		if (type === "score") {
			[0, 4, 7].forEach((int, i) =>
				setTimeout(
					() =>
						this.playTone(440 * Math.pow(2, int / 12), "triangle", 0.05, 0.2, 0.1),
					i * 50
				)
			);
		}
		if (type === "win") {
			[523, 659, 784, 1046].forEach((f, i) =>
				setTimeout(() => this.playTone(f, "square", 0.1, 0.3, 0.2), i * 100)
			);
		}
		if (type === "lose") {
			[300, 250, 200].forEach((f, i) =>
				setTimeout(() => this.playTone(f, "sawtooth", 0.1, 0.3, 0.2), i * 150)
			);
		}
		if (type === "bad") this.playTone(100, "sawtooth", 0.05, 0.3, 0.3);
		if (type === "power") {
			this.playTone(600, "square", 0.05, 0.2, 0.2);
			setTimeout(() => this.playTone(1200, "square", 0.05, 0.4, 0.2), 100);
		}
	},
	uiHover() {
		if (!this.is_muted) this.playTone(1200, "sine", 0.01, 0.05, 0.02);
	},
	uiClick() {
		if (!this.is_muted) this.playTone(300, "triangle", 0.01, 0.1, 0.1);
	}
};

// --- Game Rules ---

const RuleSettings = {
	items: {
		p_surge: {
			name: "Line Surge",
			desc: "Combo x4: Draw extra line",
			type: "power",
			active: true
		},
		p_magnet: {
			name: "Box Magnet",
			desc: "3+ Boxes: Steal neutral box",
			type: "power",
			active: true
		},
		p_double: {
			name: "Double Trouble",
			desc: "Combo x2: Double points",
			type: "power",
			active: true
		},
		p_mirror: {
			name: "Mirror Move",
			desc: "Combo x3: Copy last line",
			type: "power",
			active: true
		},
		p_time: {
			name: "Time Warp",
			desc: "3+ Boxes: +3s Perm",
			type: "power",
			active: true
		},
		p_chain: {
			name: "Chain Lightning",
			desc: "Combo x5: Extra line per box",
			type: "power",
			active: true
		},
		p_shield: {
			name: "Box Shield",
			desc: "2+ Boxes: Prevent theft",
			type: "power",
			active: true
		},
		p_swap: {
			name: "Line Swap",
			desc: "3+ Boxes: Claim 2 neutral",
			type: "power",
			active: true
		},
		p_boost: {
			name: "Point Booster",
			desc: "Combo x4: Score mult x2",
			type: "power",
			active: true
		},
		p_draw: {
			name: "Double Draw",
			desc: "2+ Boxes: Extra random line",
			type: "power",
			active: true
		},
		bad_shift: {
			name: "Sudden Shift",
			desc: "Lose random line",
			type: "punish",
			active: true
		},
		bad_swap: {
			name: "Swaperoo",
			desc: "Give box to enemy",
			type: "punish",
			active: true
		},
		bad_freeze: {
			name: "Frozen Fingers",
			desc: "Lose turn",
			type: "punish",
			active: true
		},
		bad_break: {
			name: "Chain Break",
			desc: "Combo reset to 0",
			type: "punish",
			active: true
		},
		bad_lock: {
			name: "Line Lock",
			desc: "Neutral line freezes",
			type: "punish",
			active: true
		},
		bad_snatch: {
			name: "Box Snatch",
			desc: "Opponent steals box",
			type: "punish",
			active: true
		},
		bad_drain: {
			name: "Time Drain",
			desc: "Lose 2s next turn",
			type: "punish",
			active: true
		},
		bad_jam: {
			name: "Line Jam",
			desc: "Random line breaks",
			type: "punish",
			active: true
		},
		bad_reverse: {
			name: "Reverse Move",
			desc: "Undo last line",
			type: "punish",
			active: true
		}
	},

	toggle(id) {
		if (this.items[id]) {
			this.items[id].active = !this.items[id].active;
			AudioEngine.uiClick();
		}
	},

	render(container) {
		if (!container) return;
		let html = `<div class="help-h">POWER UPS</div>`;
		for (const [id, rule] of Object.entries(this.items)) {
			if (rule.type === "power") html += this.createRow(id, rule, "power-active");
		}
		html += `<div class="help-h">PUNISHMENTS</div>`;
		for (const [id, rule] of Object.entries(this.items)) {
			if (rule.type === "punish")
				html += this.createRow(id, rule, "punish-active");
		}
		container.innerHTML = html;
	},

	createRow(id, rule, cls) {
		return `<div class="rule-item ${cls}">
			<div class="rule-text"><span class="rule-name">${
				rule.name
			}</span><span class="rule-desc">${rule.desc}</span></div>
			<label class="toggle-switch">
				<input type="checkbox" ${
					rule.active ? "checked" : ""
				} onchange="RuleSettings.toggle('${id}')">
				<span class="slider"></span>
			</label>
		</div>`;
	}
};

// --- Content Manager ---

const ContentMgr = {
	modal: $("content-modal"),
	body: $("content-body"),

	open(key) {
		const src = $("tpl-" + key);
		if (src && this.body) {
			this.body.innerHTML = src.innerHTML;
			const btn = document.createElement("button");
			btn.className = "btn-main";
			btn.style.width = "200px";
			btn.style.marginTop = "20px";
			btn.innerHTML = '<i class="fa-solid fa-check"></i> GOT IT';
			btn.onclick = () => {
				AudioEngine.uiClick();
				this.close();
			};
			btn.onmouseover = () => AudioEngine.uiHover();

			this.body.appendChild(btn);
			if (this.modal) this.modal.classList.remove("hidden");
			AudioEngine.uiClick();

			if (key === "chaos") {
				RuleSettings.render(this.body.querySelector(".rules-list-container"));
			}
		}
	},

	close() {
		if (this.modal) this.modal.classList.add("hidden");
		AudioEngine.uiClick();
	}
};

// --- VFX: Particles ---

const Particles = {
	particle_pool: [],
	spawn(x, y, color, type, amount = 1) {
		for (let i = 0; i < amount; i++) {
			this.particle_pool.push({
				x,
				y,
				color,
				type,
				velocity_x: (Math.random() - 0.5) * (type === "bg" ? 1 : 6),
				velocity_y: (Math.random() - 0.5) * (type === "bg" ? 1 : 6),
				size: Math.random() * (type === "bg" ? 3 : 5) + 1,
				base_size: Math.random() * (type === "bg" ? 3 : 5) + 1,
				life: 1.0,
				decay: type === "bg" ? 0.005 : 0.03
			});
		}
	},

	spawnAmbient(width, height, level_factor) {
		if (this.particle_pool.length >= 50 + level_factor * 5) return;

		const id = Themes.current.id;
		let x = rand(0, width),
			y = rand(0, height);
		let velocity_y = rand(-0.5, 0.5);
		let color = "rgba(255,255,255,0.2)";

		if (id === "mars") {
			y = height;
			velocity_y = -rand(1, 4);
			color = "rgba(255,50,50,0.4)";
		}
		if (id === "void") color = "rgba(255,255,255,0.8)";
		if (id === "retro") {
			velocity_y = -2;
			color = "rgba(50,255,50,0.8)";
		}
		if (id === "volcano") {
			y = height;
			velocity_y = -rand(1, 3);
			color = `rgba(255,${rand(50, 150)},0,0.5)`;
		}
		if (id === "sea") {
			velocity_y = -rand(0.5, 1.5);
			color = "rgba(255,255,255,0.1)";
		}
		if (id === "jungle") {
			velocity_y = rand(0.5, 1.5);
			color = "rgba(100,255,100,0.3)";
		}
		if (id === "cyber") {
			velocity_y = rand(2, 5);
			color = "rgba(0,255,0,0.5)";
		}

		this.particle_pool.push({
			x,
			y,
			velocity_x: 0,
			velocity_y: velocity_y * (1 + level_factor * 0.1),
			size: rand(2, 4),
			base_size: rand(2, 4),
			life: 1,
			decay: 0,
			type: "bg",
			color
		});
	},

	updateAndDraw(ctx, width, height) {
		const energy = AudioEngine.getEnergy();

		for (let i = this.particle_pool.length - 1; i >= 0; i--) {
			let p = this.particle_pool[i];
			let speed = 1;

			if (p.type === "bg") {
				p.size = p.base_size * (1 + energy * 2);
				speed = 1 + energy * 2;
				if (p.y < -10) p.y = height + 10;
				if (p.y > height + 10) p.y = -10;
			} else {
				p.life -= p.decay;
				if (p.type === "burst") p.velocity_y += 0.2;
			}

			p.x += p.velocity_x * speed;
			p.y += p.velocity_y * speed;

			if (p.life <= 0 && p.type !== "bg") {
				this.particle_pool.splice(i, 1);
			} else {
				ctx.globalAlpha = p.life;
				ctx.fillStyle = p.color;
				ctx.beginPath();
				if (["cyber", "retro"].includes(Themes.current.id)) {
					ctx.fillRect(p.x, p.y, p.size, p.size * 3);
				} else {
					ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				}
				ctx.fill();
			}
		}
		ctx.globalAlpha = 1.0;
	}
};

// --- VFX: Floating Text ---

const FloatText = {
	items: [],
	spawn(x, y, text, color = "#fff", scale = 1) {
		this.items.push({ x, y, text, color, life: 1.0, scale });
	},
	updateAndDraw(ctx) {
		ctx.font = "800 20px 'Montserrat'";
		ctx.textAlign = "center";
		for (let i = this.items.length - 1; i >= 0; i--) {
			let item = this.items[i];
			item.life -= 0.02;
			item.y -= 1.5;
			if (item.life <= 0) {
				this.items.splice(i, 1);
			} else {
				ctx.globalAlpha = item.life;
				ctx.fillStyle = item.color;
				ctx.save();
				ctx.translate(item.x, item.y);
				const s = 1 + (1 - item.life) * 0.5 * item.scale;
				ctx.scale(s, s);
				ctx.fillText(item.text, 0, 0);
				ctx.restore();
			}
		}
		ctx.globalAlpha = 1;
	}
};

// --- Grid Builder ---

const Grid = {
	build(type, size) {
		Game.dots = [];
		Game.lines = [];
		Game.polys = [];
		const dot_map = new Map();
		const line_map = new Map();
		const SPACING = 80;

		const addDot = (x, y) => {
			const key = `${x.toFixed(1)},${y.toFixed(1)}`;
			if (dot_map.has(key)) return dot_map.get(key);
			const id = Game.dots.length;
			Game.dots.push({ id, x, y });
			dot_map.set(key, id);
			return id;
		};

		const addLine = (d1, d2) => {
			const key = d1 < d2 ? `${d1}-${d2}` : `${d2}-${d1}`;
			if (line_map.has(key)) return line_map.get(key);
			const id = Game.lines.length;
			Game.lines.push({
				id,
				d1,
				d2,
				drawn: false,
				owner: null,
				locked: false,
				lock_timer: 0
			});
			line_map.set(key, id);
			return id;
		};

		const addPoly = (lines, cx, cy) =>
			Game.polys.push({ lines, owner: null, cx, cy });

		if (type === 4) {
			// Square
			for (let r = 0; r < size; r++) {
				for (let c = 0; c < size; c++) {
					const x = c * SPACING,
						y = r * SPACING;
					const dots = [
						addDot(x, y),
						addDot(x + SPACING, y),
						addDot(x + SPACING, y + SPACING),
						addDot(x, y + SPACING)
					];
					const lines = [
						addLine(dots[0], dots[1]),
						addLine(dots[1], dots[2]),
						addLine(dots[2], dots[3]),
						addLine(dots[3], dots[0])
					];
					addPoly(lines, x + SPACING / 2, y + SPACING / 2);
				}
			}
		} else if (type === 3) {
			// Triangles
			const height = SPACING * 0.866;
			for (let r = 0; r < size; r++) {
				for (let c = 0; c < size; c++) {
					const xo = r * SPACING * 0.5;
					const x = c * SPACING + xo,
						y = r * height;
					const d1 = addDot(x, y),
						d2 = addDot(x + SPACING, y);
					const d3 = addDot(x + SPACING / 2, y + height);
					addPoly(
						[addLine(d1, d2), addLine(d2, d3), addLine(d3, d1)],
						(d1.x + d2.x + d3.x) / 3,
						(d1.y + d2.y + d3.y) / 3
					);

					const d4 = addDot(x + SPACING * 1.5, y + height);
					addPoly(
						[addLine(d2, d4), addLine(d4, d3), addLine(d3, d2)],
						(d2.x + d4.x + d3.x) / 3,
						(d2.y + d4.y + d3.y) / 3
					);
				}
			}
		} else if (type === 6) {
			// Hexagons
			const r = SPACING * 0.6,
				w = 1.732 * r,
				h = 2 * r,
				y_step = h * 0.75;
			for (let row = 0; row < size; row++) {
				for (let col = 0; col < size; col++) {
					const cx = col * w + (row % 2) * (w / 2),
						cy = row * y_step;
					const p_ids = [];
					for (let i = 0; i < 6; i++) {
						const a = (Math.PI / 180) * (60 * i - 30);
						p_ids.push(addDot(cx + r * Math.cos(a), cy + r * Math.sin(a)));
					}
					const l_ids = [];
					for (let i = 0; i < 6; i++)
						l_ids.push(addLine(p_ids[i], p_ids[(i + 1) % 6]));
					addPoly(l_ids, cx, cy);
				}
			}
		} else if (type === 2) {
			// Diamonds
			const wr = SPACING * 1.2,
				hr = SPACING * 0.6;
			for (let r = 0; r < size; r++) {
				for (let c = 0; c < size; c++) {
					const x = ((c - r) * wr) / 2,
						y = ((c + r) * hr) / 2;
					const d = [
						addDot(x, y - hr),
						addDot(x + wr, y),
						addDot(x, y + hr),
						addDot(x - wr, y)
					];
					const l = [
						addLine(d[0], d[1]),
						addLine(d[1], d[2]),
						addLine(d[2], d[3]),
						addLine(d[3], d[0])
					];
					addPoly(l, x, y);
				}
			}
		}
		Game.resize();
	}
};

// --- AI Opponent ---

const AI = {
	move(skill) {
		if (Game.is_over) return;
		const moves = Game.lines.filter((l) => !l.drawn && !l.locked);
		if (!moves.length) return;

		let pick = null;
		if (Math.random() * 100 < skill) {
			pick = moves.find((l) => checkLineResult(l, 1));
			if (!pick) {
				const safe = moves.filter((l) => !checkLineResult(l, 2));
				if (safe.length) pick = safe[Math.floor(Math.random() * safe.length)];
			}
		}
		if (!pick) pick = moves[Math.floor(Math.random() * moves.length)];
		Game.playMove(pick);
	}
};

function checkLineResult(line, target) {
	const related = Game.polys.filter((p) => p.lines.includes(line.id));
	for (let p of related) {
		const undrawn = p.lines.filter(
			(lid) => !Game.lines[lid].drawn && lid !== line.id
		).length;
		if (undrawn === target - 1) return true;
	}
	return false;
}

function distanceToSegment(px, py, d1, d2) {
	const l2 = (d2.x - d1.x) ** 2 + (d2.y - d1.y) ** 2;
	if (l2 === 0) return Math.hypot(px - d1.x, py - d1.y);
	let t = ((px - d1.x) * (d2.x - d1.x) + (py - d1.y) * (d2.y - d1.y)) / l2;
	t = Math.max(0, Math.min(1, t));
	return Math.hypot(
		px - (d1.x + t * (d2.x - d1.x)),
		py - (d1.y + t * (d2.y - d1.y))
	);
}

function getPolygonPoints(polygon) {
	const set = new Set(),
		pts = [];
	polygon.lines.forEach((id) => {
		const l = Game.lines[id];
		[l.d1, l.d2].forEach((did) => {
			if (!set.has(did)) {
				set.add(did);
				pts.push(Game.dots[did]);
			}
		});
	});
	return pts.sort(
		(a, b) =>
			Math.atan2(a.y - polygon.cy, a.x - polygon.cx) -
			Math.atan2(b.y - polygon.cy, b.x - polygon.cx)
	);
}

// --- Main Engine ---

const Game = {
	canvas: $("gameCanvas"),
	context: $("gameCanvas").getContext("2d"),
	preview_canvas: $("previewCanvas"),
	bg_canvas: document.createElement("canvas"),

	dots: [],
	lines: [],
	polys: [],
	players: [],

	level: 1,
	turn: 0,
	timer: 0,
	max_time: 5000,

	is_over: false,
	is_paused: true,
	is_cursed: false,

	last_winner_id: -1,
	last_move_id: -1,
	user_color: COLORS[1].c,
	start_theme_index: 0,

	width: 0,
	height: 0,
	offset_x: 0,
	offset_y: 0,
	current_scale: 1,
	hover_line: null,

	boot() {
		if ($("year-span")) $("year-span").textContent = new Date().getFullYear();
		Themes.init();
		this.initPreview();
		this.loadData();

		window.addEventListener("resize", () => this.resize());
		this.resize();
		this.loop();

		const inputHandler = (e) => {
			if (e.type === "touchstart") e.preventDefault();
			const t = e.touches ? e.touches[0] : e;
			this.handleInput(
				t.clientX,
				t.clientY,
				e.type === "mousedown" || e.type === "touchstart"
			);
		};

		this.canvas.addEventListener("mousemove", inputHandler);
		this.canvas.addEventListener("mousedown", inputHandler);
		this.canvas.addEventListener("touchstart", inputHandler, { passive: false });
	},

	loadData() {
		const high = parseInt(localStorage.getItem("dotTrap_highscore")) || 0;
		const name = localStorage.getItem("dotTrap_player") || "???";
		if ($("menu-hs"))
			$("menu-hs").innerText = `BEST: ${high.toLocaleString("en-US")} by ${name}`;
		if (name !== "???" && $("pName")) $("pName").value = name;
	},

	saveData(score) {
		const high = parseInt(localStorage.getItem("dotTrap_highscore")) || 0;
		if (score > high) {
			const name = this.players[0].name || "???";
			localStorage.setItem("dotTrap_highscore", score);
			localStorage.setItem("dotTrap_player", name);
			if ($("menu-hs"))
				$("menu-hs").innerText = `BEST: ${score.toLocaleString(
					"en-US"
				)} by ${name}`;
		}
	},

	initPreview() {
		if (!this.preview_canvas) return;
		this.preview_canvas.width = 300;
		this.preview_canvas.height = 300;
		this.renderBG(this.preview_canvas.getContext("2d"), 300, 300, true);
	},

	start() {
		AudioEngine.init();
		this.start_theme_index = Themes.theme_index;
		this.level = 1;
		this.is_cursed = false;
		this.last_winner_id = -1;
		if ($("pName") && !$("pName").value)
			$("pName").value = OLD_NAMES[Math.floor(Math.random() * OLD_NAMES.length)];
		this.goToGame();
		this.startLevel();
	},

	goToGame() {
		["menu-modal", "win-modal", "pause-modal", "menu-ui-layer"].forEach((id) => {
			if ($(id)) $(id).classList.add("hidden");
		});
		this.is_paused = false;
	},

	toMenu() {
		this.is_paused = true;
		if ($("menu-modal")) $("menu-modal").classList.remove("hidden");
		if ($("pause-modal")) $("pause-modal").classList.add("hidden");
		if ($("win-modal")) $("win-modal").classList.add("hidden");
		if ($("menu-ui-layer")) $("menu-ui-layer").classList.remove("hidden");
	},

	startLevel() {
		const diff = Math.min(
			100,
			parseInt($("cpuDiff").value) + (this.level - 1) * 5
		);
		const size = Math.min(
			12,
			parseInt($("baseGrid").value) + Math.floor((this.level - 1) / 3)
		);
		Themes.setTheme(this.start_theme_index + Math.floor((this.level - 1) / 3));

		const p_count = parseInt($("numPlayers").value);
		const p_name = $("pName").value;

		let start_combo = 1,
			start_pts = 0,
			total_combo = 0;
		if (this.players.length && this.last_winner_id === 0) {
			start_combo = this.players[0].combo;
			start_pts = this.players[0].points;
			total_combo = this.players[0].total_combo || 0;
			this.showToast("COMBO CARRIED OVER!", true);
		} else if (this.players.length) {
			start_pts = this.players[0].points;
		}

		this.players = [
			{
				id: 0,
				name: p_name,
				color: this.user_color,
				score: 0,
				points: start_pts,
				combo: start_combo,
				max_combo: start_combo,
				total_combo: total_combo,
				is_bot: false,
				shield: false,
				time_mod: 0,
				perm_time_mod: 0,
				score_boost: 0
			}
		];

		const bot_cols = COLORS.map((c) => c.c).filter((c) => c !== this.user_color);
		for (let i = 1; i < p_count; i++) {
			this.players.push({
				id: i,
				name: OLD_NAMES[(i - 1) % OLD_NAMES.length],
				color: bot_cols[(i - 1) % bot_cols.length],
				score: 0,
				points: 0,
				combo: 1,
				max_combo: 1,
				total_combo: 0,
				is_bot: true,
				skill: diff,
				shield: false,
				time_mod: 0,
				perm_time_mod: 0,
				score_boost: 0
			});
		}

		Grid.build(parseInt($("polyType").value), size);
		this.max_time = parseInt($("turnTime").value) * 1000;
		this.resetState();
		this.resize();
	},

	resetState() {
		this.is_over = false;
		this.turn = 0;
		this.timer = this.max_time + this.players[0].perm_time_mod;
		if ($("hud-lvl")) $("hud-lvl").innerText = this.level;
		this.updateHUD();
		this.processTurn();
	},

	nextLevel() {
		this.level++;
		this.goToGame();
		this.startLevel();
	},

	prevLevel() {
		if (this.level > 1) this.level--;
		this.goToGame();
		this.startLevel();
	},

	retry() {
		this.last_winner_id = -1;
		this.players[0].points = 0;
		this.players[0].combo = 1;
		this.players[0].max_combo = 1;
		this.players[0].total_combo = 0;
		this.goToGame();
		this.startLevel();
	},

	pause() {
		this.is_paused = true;
		if ($("pause-modal")) $("pause-modal").classList.remove("hidden");
		if ($("menu-ui-layer")) $("menu-ui-layer").classList.remove("hidden");
	},

	resume() {
		this.is_paused = false;
		if ($("pause-modal")) $("pause-modal").classList.add("hidden");
		if ($("menu-ui-layer")) $("menu-ui-layer").classList.add("hidden");
	},

	processTurn() {
		if (this.is_over || !this.players[this.turn]) return;
		const p = this.players[this.turn];
		if (p.score_boost > 0) p.score_boost--;

		let time = Math.max(1000, this.max_time + p.perm_time_mod + p.time_mod);
		p.time_mod = 0;
		this.timer = this.is_cursed ? time / 2 : time;
		this.is_cursed = false;

		this.updateHUD();
		if (p.id === 0) this.showToast("YOUR TURN", true);
		if (p.is_bot) setTimeout(() => AI.move(p.skill), 600);
	},

	handleTimeout() {
		if (!this.players[this.turn]) return;
		const p = this.players[this.turn];
		p.combo = 1;
		this.showToast("COMBO LOST");
		AudioEngine.sfx("bad");

		const active = Object.keys(RuleSettings.items).filter(
			(k) =>
				RuleSettings.items[k].type === "punish" && RuleSettings.items[k].active
		);

		if (!active.length) {
			this.passTurn("TIME OUT");
			return;
		}

		const key = active[Math.floor(Math.random() * active.length)];
		let msg = "TIME OUT";

		if (key === "bad_shift") {
			const l = this.lines.filter((l) => l.drawn && l.owner === p.id);
			if (l.length) {
				const target = l[Math.floor(Math.random() * l.length)];
				target.drawn = false;
				target.owner = null;
				this.recalculateScores();
				msg = "SUDDEN SHIFT";
				Particles.spawn(
					this.getLineCenter(target).x,
					this.getLineCenter(target).y,
					"#888",
					"burst",
					10
				);
			} else msg = "LUCKY ESCAPE";
		} else if (key === "bad_drain") {
			p.time_mod = -2000;
			msg = "TIME DRAIN";
		}
		// Add other punishments logic here as needed, kept compact for now

		this.passTurn(msg);
	},

	checkPowerUps(player, boxes_claimed) {
		const combo = player.combo;
		const queue = [];
		const cfg = RuleSettings.items;
		if (cfg["p_surge"].active && combo >= 4 && Math.random() > 0.5)
			queue.push(() => this.drawRandomLine(player, "LINE SURGE"));
		if (cfg["p_magnet"].active && boxes_claimed >= 3)
			queue.push(() => this.claimNeighborBox(player));
		if (cfg["p_mirror"].active && combo >= 3)
			queue.push(() => this.drawRandomLine(player, "MIRROR MOVE"));
		if (cfg["p_time"].active && boxes_claimed >= 3) {
			player.perm_time_mod += 3000;
			this.showToast("TIME WARP (+3s)", true);
			AudioEngine.sfx("power");
		}
		if (cfg["p_chain"].active && combo >= 5) {
			for (let i = 0; i < boxes_claimed; i++)
				queue.push(() => this.drawRandomLine(player, "CHAIN LIGHTNING"));
		}
		if (cfg["p_shield"].active && boxes_claimed >= 2) {
			player.shield = true;
			this.showToast("BOX SHIELD ACTIVE", true);
		}
		if (cfg["p_swap"].active && boxes_claimed >= 3) {
			queue.push(() => this.drawRandomLine(player, "LINE SWAP"));
			queue.push(() => this.drawRandomLine(player, "LINE SWAP"));
		}
		if (cfg["p_boost"].active && combo >= 4) {
			player.score_boost = 3;
			this.showToast("POINT BOOSTER", true);
		}
		if (cfg["p_draw"].active && boxes_claimed >= 2)
			queue.push(() => this.drawRandomLine(player, "DOUBLE DRAW"));
		queue.forEach((action, i) => setTimeout(action, (i + 1) * 400));
	},

	drawRandomLine(player, label) {
		if (this.is_over) return;
		const undrawn = this.lines.filter((l) => !l.drawn && !l.locked);
		if (!undrawn.length) {
			this.checkEndGame();
			return;
		}
		const line = undrawn[Math.floor(Math.random() * undrawn.length)];
		line.drawn = true;
		line.owner = player.id;
		player.points += 5;
		this.showToast(label, true);
		AudioEngine.sfx("draw");
		const center = this.getLineCenter(line);
		Particles.spawn(center.x, center.y, player.color, "spark", 5);
		let scored = 0;
		this.polys.forEach((p) => {
			if (p.owner === null && p.lines.every((lid) => this.lines[lid].drawn)) {
				p.owner = player.id;
				scored++;
				player.score++;
				player.points += 15;
				Particles.spawn(
					p.cx * this.current_scale + this.offset_x,
					p.cy * this.current_scale + this.offset_y,
					player.color,
					"burst",
					15
				);
			}
		});
		if (scored > 0) {
			player.combo++;
			AudioEngine.sfx("score");
			this.updateHUD();
		}
		this.checkEndGame();
	},

	claimNeighborBox(player) {
		if (this.is_over) return;
		const my_polys = this.polys.filter((p) => p.owner === player.id);
		let target = null;
		for (let p of my_polys) {
			for (let lid of p.lines) {
				const neighbor = this.polys.find(
					(np) => np !== p && np.owner === null && np.lines.includes(lid)
				);
				if (neighbor) {
					target = neighbor;
					break;
				}
			}
			if (target) break;
		}
		if (!target) target = this.polys.find((p) => p.owner === null);
		if (target) {
			target.owner = player.id;
			target.lines.forEach((lid) => {
				const l = this.lines[lid];
				if (!l.drawn) {
					l.drawn = true;
					l.owner = player.id;
				}
			});
			player.score++;
			player.points += 30;
			this.showToast("BOX MAGNET", true);
			AudioEngine.sfx("score");
			Particles.spawn(
				target.cx * this.current_scale + this.offset_x,
				target.cy * this.current_scale + this.offset_y,
				player.color,
				"burst",
				20
			);
			this.updateHUD();
			this.checkEndGame();
		}
	},

	playMove(line) {
		const p = this.players[this.turn];
		const rem_s = Math.max(0.1, this.timer / 1000);
		this.timer = this.max_time + p.perm_time_mod;

		line.drawn = true;
		line.owner = p.id;
		this.hover_line = null;

		const pts = Math.ceil(1 * (rem_s * p.combo));
		p.points += pts;

		AudioEngine.sfx("draw");
		const c = this.getLineCenter(line);
		Particles.spawn(c.x, c.y, p.color, "spark", 5);
		FloatText.spawn(c.x, c.y - 10, `+${pts}`, p.color, 0.8);

		let scored = 0;
		let total_shape_pts = 0;
		let mult = 1;

		if (RuleSettings.items.p_double.active && p.combo > 1) mult = 2;
		if (p.score_boost > 0) mult += 1;

		this.polys.forEach((poly) => {
			if (
				poly.owner === null &&
				poly.lines.every((lid) => this.lines[lid].drawn)
			) {
				poly.owner = p.id;
				scored++;
				const shape_pts = Math.ceil(10 * (rem_s * p.combo) * mult);
				total_shape_pts += shape_pts;
				Particles.spawn(
					poly.cx * this.current_scale + this.offset_x,
					poly.cy * this.current_scale + this.offset_y,
					p.color,
					"burst",
					20
				);
			}
		});

		if (scored > 0) {
			p.score += scored;
			p.points += total_shape_pts;
			p.combo++;
			if (p.combo > p.max_combo) p.max_combo = p.combo;
			p.total_combo += p.combo;

			AudioEngine.sfx("score");
			if (p.combo > 2) AudioEngine.sfx("combo");
			this.checkPowerUps(p, scored);

			FloatText.spawn(
				this.width / 2,
				this.height / 2 - 50,
				`COMBO x${p.combo}!`,
				p.color,
				1.5
			);
			if (total_shape_pts > 0)
				FloatText.spawn(
					this.width / 2,
					this.height / 2,
					`+${total_shape_pts}`,
					"#fff",
					1.2
				);
			if (mult > 1)
				FloatText.spawn(
					this.width / 2,
					this.height / 2 + 30,
					`MULT x${mult}!`,
					"#FFD700",
					1.0
				);

			if (this.checkEndGame()) return;
			this.updateHUD();
			if (p.is_bot) setTimeout(() => AI.move(p.skill), 500);
		} else {
			if (this.checkEndGame()) return;
			this.passTurn("TURN CHANGE");
		}
	},

	checkEndGame() {
		if (
			this.polys.every((p) => p.owner !== null) ||
			this.lines.every((l) => l.drawn)
		) {
			this.endGame();
			return true;
		}
		return false;
	},

	endGame() {
		if (this.is_over) return;
		this.is_over = true;

		this.players.forEach((p) => (p.points += 100 * p.total_combo));
		this.players.sort((a, b) => b.score - a.score);

		const winner = this.players[0];
		this.last_winner_id = winner.id;

		const high = this.players.reduce(
			(max, p) => (p.points > max.points ? p : max),
			this.players[0]
		);
		this.saveData(high.points);

		const is_win = winner.id === 0;
		AudioEngine.sfx(is_win ? "win" : "lose");

		if ($("win-head")) {
			$("win-head").innerText = is_win ? "VICTORY" : "DEFEAT";
			$("win-head").style.color = is_win ? Themes.current.primary : "#555";
		}
		if ($("win-sub"))
			$("win-sub").innerText = is_win ? "LEVEL COMPLETE" : `${winner.name} WON`;
		if ($("win-score"))
			$("win-score").innerText = winner.points.toLocaleString("en-US");
		if ($("win-detail"))
			$("win-detail").innerHTML = `
			BOXES: ${winner.score} <br>
			TOTAL COMBO: ${winner.total_combo} <br>
			BONUS: +${100 * winner.total_combo}`;

		if ($("win-modal")) $("win-modal").classList.remove("hidden");
		if ($("share-score-btn"))
			$("share-score-btn").style.display = is_win ? "block" : "none";
	},

	passTurn(msg) {
		if (!this.players[this.turn]) return;
		this.players[this.turn].combo = 1;
		this.showToast(msg);
		this.lines.forEach((l) => {
			if (l.locked && --l.lock_timer <= 0) l.locked = false;
		});
		this.turn = (this.turn + 1) % this.players.length;
		this.processTurn();
	},

	handleInput(mx, my, click) {
		if (
			this.is_over ||
			this.is_paused ||
			!this.players[this.turn] ||
			this.players[this.turn].is_bot
		)
			return;
		const r = this.canvas.getBoundingClientRect();
		const x = (mx - r.left - this.offset_x) / this.current_scale;
		const y = (my - r.top - this.offset_y) / this.current_scale;

		let best = null,
			min = 25 / this.current_scale;

		this.lines.forEach((l) => {
			if (!l.drawn && !l.locked) {
				const d = distanceToSegment(x, y, this.dots[l.d1], this.dots[l.d2]);
				if (d < min) {
					min = d;
					best = l;
				}
			}
		});

		this.hover_line = best;
		if (click && best) this.playMove(best);
	},

	getLineCenter(line) {
		const d1 = this.dots[line.d1],
			d2 = this.dots[line.d2];
		return {
			x: ((d1.x + d2.x) / 2) * this.current_scale + this.offset_x,
			y: ((d1.y + d2.y) / 2) * this.current_scale + this.offset_y
		};
	},

	recalculateScores() {
		this.players.forEach((p) => (p.score = 0));
		this.polys.forEach((p) => {
			if (!p.lines.every((lid) => this.lines[lid].drawn)) p.owner = null;
			if (p.owner !== null && p.owner !== -1) {
				const owner = this.players.find((x) => x.id === p.owner);
				if (owner) owner.score++;
			}
		});
		this.updateHUD();
	},

	showToast(msg, good = false) {
		const t = $("toast");
		if (!t) return;
		t.innerText = msg;
		t.className = "toast";
		if (msg.includes("POWER") || msg.includes("BOOST")) t.classList.add("power");
		else if (good) t.classList.add("good");
		t.classList.add("visible");
		setTimeout(() => t.classList.remove("visible"), 1500);
	},

	resize() {
		this.width = this.canvas.width = window.innerWidth;
		this.height = this.canvas.height = window.innerHeight;
		if (this.dots.length) {
			let min_x = 9e9,
				max_x = -9e9,
				min_y = 9e9,
				max_y = -9e9;
			this.dots.forEach((d) => {
				min_x = Math.min(min_x, d.x);
				max_x = Math.max(max_x, d.x);
				min_y = Math.min(min_y, d.y);
				max_y = Math.max(max_y, d.y);
			});
			const gw = max_x - min_x,
				gh = max_y - min_y;
			const scale = Math.min((this.width - 40) / gw, (this.height - 350) / gh);
			this.current_scale = Math.min(scale, 1.4);
			this.offset_x =
				(this.width - gw * this.current_scale) / 2 - min_x * this.current_scale;
			this.offset_y =
				(this.height - gh * this.current_scale) / 2 -
				min_y * this.current_scale +
				20;
		}
		this.bg_canvas.width = this.width;
		this.bg_canvas.height = this.height;
		this.renderBG(this.bg_canvas.getContext("2d"), this.width, this.height);
	},

	renderBG(ctx, w, h) {
		const t = Themes.current;
		const g = ctx.createLinearGradient(0, 0, 0, h);
		g.addColorStop(0, t.bg[0]);
		g.addColorStop(1, t.bg[1]);
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, w, h);

		ctx.fillStyle = t.els[0];
		if (t.id === "volcano") {
			ctx.beginPath();
			ctx.moveTo(0, h);
			ctx.lineTo(w / 2, h * 0.35);
			ctx.lineTo(w, h);
			ctx.fill();
		} else if (t.id === "city") {
			let x = 0;
			while (x < w) {
				const bw = w / 10;
				ctx.fillRect(x, h - h * 0.3 - Math.random() * 50, bw, h);
				x += bw;
			}
		}
	},

	updateHUD() {
		if (!this.players[this.turn]) return;
		const p = this.players[this.turn];
		if ($("hud-points"))
			$("hud-points").innerText = p.points.toLocaleString("en-US");

		const comboEl = $("hud-combo-large");
		if (comboEl) {
			comboEl.innerText = "x" + p.combo;
			comboEl.style.color = p.color;
			comboEl.classList.toggle("power-active", p.combo > 1);
		}

		if ($("score-container")) {
			$("score-container").innerHTML = this.players
				.map(
					(pl) =>
						`<div class="score-pill ${
							pl.id === this.turn ? "active-pill" : ""
						}" style="background:${pl.color}">
					<div class="pill-row">
						<span><span style="color:${pl.color}">●</span> ${pl.name}</span>
						<span class="pill-combo" style="color:${pl.color}">x${pl.combo}</span>
					</div>
					<div class="pill-row">
						<span>PTS: ${pl.points}</span> / <span>BOX: ${pl.score}</span>
					</div>
				</div>`
				)
				.join("");
		}

		const filled = this.polys.filter((p) => p.owner !== null && p.owner !== -1)
			.length;
		if ($("hud-progress"))
			$("hud-progress").innerText = `${filled}/${this.polys.length}`;
	},

	loop() {
		AudioEngine.tick();
		if (
			!this.is_paused &&
			!this.is_over &&
			$("menu-modal") &&
			$("menu-modal").classList.contains("hidden")
		) {
			this.timer -= 16.7;
			const sec = Math.ceil(this.timer / 1000);
			if ($("hud-time"))
				$("hud-time").innerText = `00:${sec < 10 ? "0" + sec : sec}`;
			if (this.timer <= 0) this.handleTimeout();
			Particles.spawnAmbient(this.width, this.height, this.level);
		}

		const ctx = this.context;
		ctx.clearRect(0, 0, this.width, this.height);
		if (this.bg_canvas.width > 0) ctx.drawImage(this.bg_canvas, 0, 0);

		Particles.updateAndDraw(ctx, this.width, this.height);

		if ($("menu-modal") && $("menu-modal").classList.contains("hidden")) {
			ctx.save();
			ctx.translate(this.offset_x, this.offset_y);
			ctx.scale(this.current_scale, this.current_scale);

			this.polys.forEach((p) => {
				if (p.owner !== null && p.owner !== -1) {
					const pl = this.players.find((x) => x.id === p.owner);
					if (pl) {
						ctx.fillStyle = pl.color;
						ctx.globalAlpha = 0.7;
						ctx.beginPath();
						const pts = getPolygonPoints(p);
						if (pts.length) {
							ctx.moveTo(pts[0].x, pts[0].y);
							for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
						}
						ctx.fill();
						ctx.globalAlpha = 1;
					}
				}
			});

			ctx.lineCap = "round";
			this.lines.forEach((l) => {
				const d1 = this.dots[l.d1],
					d2 = this.dots[l.d2];
				ctx.beginPath();
				ctx.moveTo(d1.x, d1.y);
				ctx.lineTo(d2.x, d2.y);

				if (l.drawn) {
					const pl = this.players.find((x) => x.id === l.owner);
					ctx.strokeStyle = pl ? pl.color : "#888";
					ctx.lineWidth = 5;
				} else {
					ctx.strokeStyle = l.locked ? "#555" : "rgba(255,255,255,0.2)";
					ctx.lineWidth = l.locked ? 4 : 2;
				}
				ctx.stroke();
			});

			if (this.hover_line && !this.is_paused && this.players[this.turn]) {
				const l = this.hover_line;
				ctx.strokeStyle = this.players[this.turn].color;
				ctx.lineWidth = 5;
				ctx.beginPath();
				ctx.moveTo(this.dots[l.d1].x, this.dots[l.d1].y);
				ctx.lineTo(this.dots[l.d2].x, this.dots[l.d2].y);
				ctx.stroke();
			}

			ctx.fillStyle = "#fff";
			this.dots.forEach((d) => {
				ctx.beginPath();
				ctx.arc(d.x, d.y, 5, 0, Math.PI * 2);
				ctx.fill();
			});

			ctx.restore();
			FloatText.updateAndDraw(ctx);
		}

		requestAnimationFrame(() => this.loop());
	}
};

function shareTwitter(score) {
	const share_url = "https://codepen.io/Julibe/pen/RNaONed";
	const via_user = "Julibe";

	let messages = [
		"I just got trapped in Dot Trap! Can you beat the AI?",
		"Dots and Boxes on steroids. Check out this game by @Julibe!",
		"Strategy, speed, and combos. Addicted to Dot Trap.",
		"Think you're good at spatial puzzles? Try Dot Trap."
	];

	// If score is provided (Game Over screen), customize message
	if (score !== undefined) {
		messages = [
			`I just scored ${score.toLocaleString(
				"en-US"
			)} points in Dot Trap! #EveryLineCounts`,
			`New High Score: ${score.toLocaleString(
				"en-US"
			)} in Dot Trap. Can you beat me?`,
			`Just crushed the AI with ${score.toLocaleString(
				"en-US"
			)} points in Dot Trap!`
		];
	}

	const hashtags_list = [
		"DotTrap",
		"IndieGame",
		"WebGame",
		"CreativeCoding",
		"GameDev",
		"JavaScript",
		"Julibe"
	];

	const text = messages[Math.floor(Math.random() * messages.length)];

	let selected_tags = hashtags_list
		.sort(() => 0.5 - Math.random())
		.slice(0, 4)
		.map((tag) => tag.replace(/\s+/g, ""));

	const url_length = 23;
	const via_length = 6 + via_user.length;
	const max_chars = 280;

	while (selected_tags.length > 0) {
		const tags_length = selected_tags.reduce(
			(acc, tag) => acc + tag.length + 2,
			0
		);
		const total_length = text.length + url_length + via_length + tags_length;
		if (total_length <= max_chars) break;
		selected_tags.pop();
	}

	const hashtags = selected_tags.join(",");
	const twitter_url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
		text
	)}&url=${encodeURIComponent(share_url)}&hashtags=${encodeURIComponent(
		hashtags
	)}&via=${encodeURIComponent(via_user)}`;

	window.open(twitter_url, "_blank");
	AudioEngine.uiClick();
}

Game.boot();
