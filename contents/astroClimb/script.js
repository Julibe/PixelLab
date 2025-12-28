const base_config = {
	gravity_val: 0.25,
	thrust_force: -7.5,
	turbo_thrust: -10.0,
	dash_force: 15,
	move_speed: 6,
	lane_height: 200,
	friction_val: 0.94,
	max_fall_speed: 12,
	bullet_speed: 15,
	drop_chance: 0.5,
	pixel_size: 4,
	score_kill: 500,
	score_time_factor: 0.5,
	control_mode: "turbo",
	magnet_pull_force: 0.5,
	magnet_range_step: 150,
	colors: {
		black: "#000000",
		white: "#ffffff",
		gray: "#777777",
		green: "#00e436",
		orange: "#ff9d00",
		red: "#ff004d",
		cyan: "#29adff",
		purple: "#7e2553",
		blue: "#1d2b53"
	}
};

// Mode Configuration
const mode_presets = {
	easy: {
		lives_start: 10,
		spawn_rate_min: 60,
		spawn_rate_max: 120,
		enemy_bullet_speed: 4,
		drop_table: {
			ammo: 30,
			health: 10,
			shield: 10,
			spread: 10,
			rapid: 10,
			wingman: 10,
			turbo: 5,
			warp: 5,
			nuke: 5,
			magnet: 5
		},
		unlimited_ammo: false
	},
	normal: {
		lives_start: 5,
		spawn_rate_min: 30,
		spawn_rate_max: 90,
		enemy_bullet_speed: 6,
		drop_table: {
			ammo: 25,
			health: 5,
			shield: 5,
			spread: 10,
			rapid: 10,
			wingman: 8,
			turbo: 8,
			warp: 4,
			nuke: 2,
			magnet: 5
		},
		unlimited_ammo: false
	},
	hard: {
		lives_start: 3,
		spawn_rate_min: 20,
		spawn_rate_max: 60,
		enemy_bullet_speed: 9,
		drop_table: {
			ammo: 25,
			health: 2,
			shield: 5,
			spread: 10,
			rapid: 10,
			wingman: 8,
			turbo: 8,
			warp: 4,
			nuke: 2,
			magnet: 5
		},
		unlimited_ammo: false
	},
	infinity: {
		lives_start: 999,
		spawn_rate_min: 30,
		spawn_rate_max: 90,
		enemy_bullet_speed: 6,
		drop_table: {
			ammo: 40,
			spread: 10,
			rapid: 10,
			wingman: 10,
			turbo: 10,
			warp: 10,
			nuke: 5,
			magnet: 5
		},
		unlimited_ammo: true
	},
	hardcore: {
		lives_start: 1,
		spawn_rate_min: 15,
		spawn_rate_max: 50,
		enemy_bullet_speed: 10,
		drop_table: {
			ammo: 80,
			health: 2,
			shield: 0,
			spread: 0,
			rapid: 0,
			wingman: 0,
			turbo: 0,
			warp: 0,
			nuke: 0,
			magnet: 0
		},
		unlimited_ammo: false
	}
};

// Audio Engine
const sfx_engine = {
	audio_ctx: null,
	music_interval: null,
	music_step: 0,
	initAudio: function () {
		if (!this.audio_ctx) {
			this.audio_ctx = new (window.AudioContext || window.webkitAudioContext)();
		}
		if (this.audio_ctx.state === "suspended") {
			this.audio_ctx.resume();
		}
	},
	playTone: function (freq, type, dur, vol = 0.1) {
		if (!this.audio_ctx) return;
		const osc = this.audio_ctx.createOscillator();
		const gain = this.audio_ctx.createGain();
		osc.type = type;
		osc.frequency.setValueAtTime(freq, this.audio_ctx.currentTime);
		gain.gain.setValueAtTime(vol, this.audio_ctx.currentTime);
		gain.gain.exponentialRampToValueAtTime(
			0.01,
			this.audio_ctx.currentTime + dur
		);
		osc.connect(gain);
		gain.connect(this.audio_ctx.destination);
		osc.start();
		osc.stop(this.audio_ctx.currentTime + dur);
	},
	playShoot: function () {
		this.playTone(400, "triangle", 0.1, 0.1);
		this.playTone(300, "square", 0.1, 0.05);
	},
	playExplode: function () {
		if (!this.audio_ctx) return;
		const osc = this.audio_ctx.createOscillator();
		const gain = this.audio_ctx.createGain();
		osc.type = "sawtooth";
		osc.frequency.setValueAtTime(100, this.audio_ctx.currentTime);
		osc.frequency.exponentialRampToValueAtTime(
			10,
			this.audio_ctx.currentTime + 0.3
		);
		gain.gain.setValueAtTime(0.2, this.audio_ctx.currentTime);
		gain.gain.exponentialRampToValueAtTime(
			0.01,
			this.audio_ctx.currentTime + 0.3
		);
		osc.connect(gain);
		gain.connect(this.audio_ctx.destination);
		osc.start();
		osc.stop(this.audio_ctx.currentTime + 0.3);
	},
	playPowerup: function () {
		this.playTone(600, "sine", 0.1, 0.1);
		setTimeout(() => this.playTone(900, "sine", 0.2, 0.1), 100);
	},
	startMusic: function () {
		if (this.music_interval) return;
		this.music_step = 0;
		const melody_data = [
			0,
			7,
			12,
			7,
			0,
			7,
			12,
			7,
			2,
			9,
			14,
			9,
			2,
			9,
			14,
			9,
			3,
			10,
			15,
			10,
			3,
			10,
			15,
			10,
			5,
			12,
			17,
			12,
			5,
			12,
			17,
			12,
			-2,
			5,
			10,
			5,
			-2,
			5,
			10,
			5,
			0,
			7,
			12,
			7,
			0,
			7,
			12,
			7,
			-5,
			2,
			7,
			2,
			-5,
			2,
			7,
			2,
			-7,
			0,
			5,
			0,
			-7,
			0,
			5,
			0
		];
		this.music_interval = setInterval(() => {
			if (game_active && !game_paused) {
				const note_val = melody_data[this.music_step % melody_data.length];
				const freq_val = 110 * Math.pow(2, note_val / 12);
				const vol_val = this.music_step % 4 === 0 ? 0.03 : 0.015;
				this.playTone(freq_val, "square", 0.2, vol_val);
				this.music_step++;
			}
		}, 150);
	},
	stopMusic: function () {
		if (this.music_interval) clearInterval(this.music_interval);
		this.music_interval = null;
	}
};

// Game Variables
let active_config = { ...base_config };
let current_mode = "normal";
const game_canvas = document.getElementById("gameCanvas");
const game_ctx = game_canvas.getContext("2d");
let animation_id = null;
let game_active = false;
let game_paused = false;
let game_over = false;
let altitude_count = 0;
let kills_count = 0;
let start_timestamp = 0;
let time_alive = 0;
let total_score = 0;
let next_ammo_milestone = 250;
let camera_y = 0;
let global_tick = 0;
let floor_level = 0;
let nuke_flash = 0;
let gamepad_connected = false;
let ui_selected_index = 0;
let ui_cooldown = 0;

let player_obj = {
	x: 0,
	y: 0,
	w: 32,
	h: 48,
	vx: 0,
	vy: 0,
	rotation: 0,
	ammo: 25,
	lives: 3,
	cooldown: 0,
	invuln: 0,
	shield_timer: 0,
	has_spread: false,
	has_rapid: false,
	has_turbo: false,
	wingman_count: 0,
	dash_cooldown: 0,
	magnet_count: 0
};
let keys_state = {
	left: false,
	right: false,
	thrust: false,
	thrust_pressed: false,
	shoot: false,
	shoot_pressed: false,
	dash: false,
	dash_pressed: false
};
let game_lanes = [],
	game_particles = [],
	game_stars = [],
	game_bullets = [],
	enemy_bullets = [],
	game_items = [],
	game_popups = [];

// --- Social & UI Logic ---
function shareTwitter() {
	const shareUrl = "https://codepen.io/Julibe/full/MYeYrZB";
	const viaUser = "Julibe";
	let scoreToShare =
		game_over || game_paused
			? total_score
			: localStorage.getItem("astro_climb_hs_" + current_mode) || 0;
	let modeName = current_mode.toUpperCase();
	const messages = [
		`I just reached ${scoreToShare} points in ${modeName} mode on Astro Climb!`,
		`Can you beat my high score of ${scoreToShare} points in ${modeName} mode on Astro Climb?`,
		`Surviving the void in Astro Climb. Altitude record: ${scoreToShare} points in ${modeName} mode.`,
		`Lost in space, still climbing. ${scoreToShare} points achieved in ${modeName} mode on Astro Climb.`,
		`Gravity tried to stop me. ${scoreToShare} points in ${modeName} mode on Astro Climb!`,
		`Another climb, another record. ${scoreToShare} points in Astro Climb (${modeName}).`,
		`Pushing higher into the unknown. ${scoreToShare} points reached in ${modeName} mode on Astro Climb.`,
		`The stars watched me climb. Final score: ${scoreToShare} points in ${modeName} mode on Astro Climb.`,
		`Defying the void with ${scoreToShare} points in ${modeName} mode on Astro Climb.`,
		`How far can you go? I reached ${scoreToShare} points in ${modeName} mode on Astro Climb!`,
		`One more climb toward home. ${scoreToShare} points secured in ${modeName} mode on Astro Climb.`
	];

	const hashtagsList = [
		"AstroClimb",
		"IndieDev",
		"RetroGaming",
		"Arcade",
		"PixelArt"
	];
	const text = messages[Math.floor(Math.random() * messages.length)];
	const hashtags = hashtagsList.slice(0, 3).join(",");
	const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
		text
	)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(
		hashtags
	)}&via=${encodeURIComponent(viaUser)}`;
	window.open(twitterUrl, "_blank");
}

function openInfo(sectionId) {
	const about_modal = document.getElementById("aboutModal");
	if (about_modal) {
		about_modal.classList.add("visible");
		const sections = about_modal.querySelectorAll(".info-section");
		sections.forEach((sec) => sec.classList.remove("active"));
		const target = document.getElementById(sectionId);
		if (target) target.classList.add("active");
	}
	ui_selected_index = 0;
	if (game_active && !game_paused) {
		togglePause();
	}
}

function closeInfo() {
	const about_modal = document.getElementById("aboutModal");
	if (about_modal) about_modal.classList.remove("visible");
}

function snapPos(val) {
	return Math.floor(val / active_config.pixel_size) * active_config.pixel_size;
}

function initStars() {
	game_stars = [];
	for (let i = 0; i < 150; i++) {
		const star_colors = [
			active_config.colors.white,
			active_config.colors.gray,
			active_config.colors.purple,
			active_config.colors.cyan
		];
		game_stars.push({
			x: snapPos(Math.random() * game_canvas.width),
			y: snapPos(Math.random() * game_canvas.height),
			size:
				Math.random() > 0.9
					? active_config.pixel_size * 2
					: active_config.pixel_size,
			color: star_colors[Math.floor(Math.random() * star_colors.length)],
			blink: Math.random() > 0.8,
			depth: Math.random() * 0.4 + 0.2
		});
	}
}

function setControlStyle(style_id) {
	active_config.control_mode = style_id;
	const style_turbo = document.getElementById("styleTurbo");
	const style_flappy = document.getElementById("styleFlappy");
	if (style_turbo) style_turbo.classList.toggle("active", style_id === "turbo");
	if (style_flappy)
		style_flappy.classList.toggle("active", style_id === "flappy");
}

function toggleInstructions(show_bool) {
	const instr_modal = document.getElementById("instructionsModal");
	if (instr_modal) instr_modal.classList.toggle("visible", show_bool);
	ui_selected_index = 0;
}

function showHighScores() {
	const mode_keys = ["easy", "normal", "hard", "infinity", "hardcore"];
	let hs_html = "";
	mode_keys.forEach((m) => {
		let score_val = localStorage.getItem("astro_climb_hs_" + m) || 0;
		hs_html += `<div class="score-row"><span>${m.toUpperCase()}</span><span>${score_val}</span></div>`;
	});
	const hs_list = document.getElementById("hsList");
	const hs_modal = document.getElementById("highScoreModal");
	if (hs_list) hs_list.innerHTML = hs_html;
	if (hs_modal) hs_modal.classList.add("visible");
	ui_selected_index = 0;
}

function closeHighScores() {
	const hs_modal = document.getElementById("highScoreModal");
	if (hs_modal) hs_modal.classList.remove("visible");
	ui_selected_index = 0;
}

function handleResize() {
	game_canvas.width = window.innerWidth;
	game_canvas.height = window.innerHeight;
	if (!game_active) floor_level = game_canvas.height - 50;
	initStars();
}

function togglePause() {
	if (!game_active) return;
	game_paused = !game_paused;
	const pause_panel = document.getElementById("pauseMenu");
	if (game_paused) {
		if (pause_panel) pause_panel.classList.add("visible");
		sfx_engine.stopMusic();
		ui_selected_index = 0;
	} else {
		if (pause_panel) pause_panel.classList.remove("visible");
		const about_modal = document.getElementById("aboutModal");
		if (about_modal) about_modal.classList.remove("visible");
		sfx_engine.startMusic();
	}
}

function showMainMenu() {
	game_active = false;
	game_paused = false;
	game_over = false;
	sfx_engine.stopMusic();
	const go_panel = document.getElementById("gameOverPanel");
	const pause_panel = document.getElementById("pauseMenu");
	const main_menu = document.getElementById("mainMenu");
	if (go_panel) go_panel.classList.remove("visible");
	if (pause_panel) pause_panel.classList.remove("visible");
	if (main_menu) main_menu.classList.add("visible");
	ui_selected_index = 0;
}

function selectMode(mode_id) {
	sfx_engine.initAudio();
	current_mode = mode_id;
	active_config = { ...base_config, ...mode_presets[mode_id] };
	active_config.score_time_factor =
		active_config.control_mode === "flappy" ? 1.0 : 0.5;
	resetGame();
}

// --- GAMEPLAY FUNCTIONS ---

function resetGame() {
	floor_level = game_canvas.height - 50;
	player_obj.x = game_canvas.width / 2 - 16;
	player_obj.y = floor_level - 48;
	player_obj.vx = 0;
	player_obj.vy = 0;
	player_obj.rotation = 0;
	player_obj.lives = active_config.lives_start;
	player_obj.ammo = current_mode === "hardcore" ? 25 : 20;
	player_obj.cooldown = 0;
	player_obj.invuln = 0;
	player_obj.shield_timer = 0;
	player_obj.has_spread = false;
	player_obj.has_rapid = false;
	player_obj.has_turbo = false;
	player_obj.wingman_count = 0;
	player_obj.magnet_count = 0;
	camera_y = 0;
	altitude_count = 0;
	kills_count = 0;
	start_timestamp = Date.now();
	total_score = 0;
	next_ammo_milestone = 250;
	game_active = true;
	game_paused = false;
	game_over = false;
	game_lanes = [];
	game_particles = [];
	game_bullets = [];
	enemy_bullets = [];
	game_items = [];
	game_popups = [];
	nuke_flash = 0;
	for (let i = 0; i < 6; i++) {
		createLane(floor_level - 250 - i * active_config.lane_height, true);
	}

	document.getElementById("mainMenu").classList.remove("visible");
	document.getElementById("gameOverPanel").classList.remove("visible");
	document.getElementById("pauseMenu").classList.remove("visible");

	sfx_engine.startMusic();
	updateHUD(); // Critical Call
}

function createLane(y_pos, prepop_bool = false) {
	const speed_mult = 1 + altitude_count / 2500;
	const roll_val = Math.random();
	let type_str = "asteroid";
	let seeker_threshold = current_mode === "hardcore" ? 0.7 : 0.8;

	if (roll_val < 0.15 && altitude_count > 2) {
		type_str = "forcefield";
	} else if (altitude_count > 100 && roll_val > 0.98) type_str = "colossus";
	else if (altitude_count > 80 && roll_val > 0.96) type_str = "tank";
	else if (altitude_count > 60 && roll_val > 0.95) type_str = "splitter";
	else if (altitude_count > 50 && roll_val > 0.94) type_str = "ghost";
	else if (altitude_count > 40 && roll_val > 0.92) type_str = "turret";
	else if (altitude_count > 30 && roll_val > 0.9) type_str = "ufo";
	else if (altitude_count > 25 && roll_val > 0.88) type_str = "orbiter";
	else if (altitude_count > 20 && roll_val > 0.85) type_str = "stealth";
	else if (altitude_count > 15 && roll_val > 0.82) type_str = "kamikaze";
	else if (altitude_count > 12 && roll_val > 0.8) type_str = "sniper";
	else if (altitude_count > 10 && roll_val > 0.75) type_str = "bomber";
	else if (altitude_count > 8 && roll_val > 0.7) type_str = "alien";
	else if (altitude_count > 20 && roll_val > seeker_threshold)
		type_str = "seeker";
	else if (roll_val > 0.5) {
		const swarm_types = [
			"drone",
			"swarm",
			"miner",
			"zigzag",
			"bouncer",
			"charger",
			"barrier_rot"
		];
		type_str = swarm_types[Math.floor(Math.random() * swarm_types.length)];
	}

	const dir_val = Math.random() > 0.5 ? 1 : -1;
	const lane_obj = {
		y: y_pos,
		height: active_config.lane_height,
		speed: (3 + Math.random() * 3) * speed_mult,
		direction: dir_val,
		type: type_str,
		obstacles: [],
		timer: Math.random() * 60
	};

	if (type_str === "forcefield") {
		lane_obj.speed = 0;
		const gap_w = 140 - Math.min(altitude_count, 60);
		const gap_x = Math.random() * (game_canvas.width - gap_w - 100) + 50;
		lane_obj.field_data = {
			type: Math.random() > 0.5 ? "red" : "blue",
			gap_x: gap_x,
			gap_w: gap_w,
			moving: altitude_count > 40,
			offset: Math.random() * 100,
			active: true,
			hp: 8
		};
	} else if (prepop_bool) {
		let safe_x =
			y_pos > floor_level - 600
				? Math.random() > 0.5
					? Math.random() * (game_canvas.width * 0.3)
					: game_canvas.width * 0.7 + Math.random() * 0.3
				: Math.random() * game_canvas.width;
		addObstacle(lane_obj, safe_x);
	}
	game_lanes.push(lane_obj);
}

function addObstacle(lane_ref, x_pos) {
	let w_val = 40 + Math.random() * 40;
	let h_val = 40;
	let hp_val = 1;
	if (lane_ref.type === "ufo") {
		w_val = 60;
		h_val = 30;
		hp_val = 3;
	}
	if (lane_ref.type === "alien") {
		w_val = 48;
		h_val = 48;
		hp_val = 1;
	}
	if (lane_ref.type === "seeker") {
		w_val = 36;
		h_val = 36;
		hp_val = 1;
	}
	if (lane_ref.type === "drone") {
		w_val = 24;
		h_val = 24;
		hp_val = 1;
	}
	if (lane_ref.type === "swarm") {
		w_val = 20;
		h_val = 20;
		hp_val = 1;
	}
	if (lane_ref.type === "miner") {
		w_val = 32;
		h_val = 32;
		hp_val = 1;
	}
	if (lane_ref.type === "zigzag") {
		w_val = 40;
		h_val = 20;
		hp_val = 1;
	}
	if (lane_ref.type === "bouncer") {
		w_val = 30;
		h_val = 30;
		hp_val = 1;
	}
	if (lane_ref.type === "charger") {
		w_val = 50;
		h_val = 30;
		hp_val = 2;
	}
	if (lane_ref.type === "sniper") {
		w_val = 20;
		h_val = 50;
		hp_val = 2;
	}
	if (lane_ref.type === "bomber") {
		w_val = 44;
		h_val = 40;
		hp_val = 3;
	}
	if (lane_ref.type === "kamikaze") {
		w_val = 30;
		h_val = 30;
		hp_val = 1;
	}
	if (lane_ref.type === "orbiter") {
		w_val = 30;
		h_val = 30;
		hp_val = 2;
	}
	if (lane_ref.type === "turret") {
		w_val = 40;
		h_val = 40;
		hp_val = 4;
	}
	if (lane_ref.type === "ghost") {
		w_val = 32;
		h_val = 40;
		hp_val = 2;
	}
	if (lane_ref.type === "stealth") {
		w_val = 40;
		h_val = 15;
		hp_val = 1;
	}
	if (lane_ref.type === "tank") {
		w_val = 70;
		h_val = 50;
		hp_val = 8;
	}
	if (lane_ref.type === "splitter") {
		w_val = 50;
		h_val = 50;
		hp_val = 3;
	}
	if (lane_ref.type === "colossus") {
		w_val = 120;
		h_val = 80;
		hp_val = 25;
	}
	if (lane_ref.type === "blocker") {
		w_val = 80;
		h_val = 100;
		hp_val = 10;
	}
	if (lane_ref.type === "barrier_rot") {
		w_val = 20;
		h_val = 120;
		hp_val = 5;
	}

	lane_ref.obstacles.push({
		x:
			x_pos !== undefined
				? x_pos
				: lane_ref.direction === 1
				? -150
				: game_canvas.width + 150,
		start_x:
			x_pos !== undefined
				? x_pos
				: lane_ref.direction === 1
				? -150
				: game_canvas.width + 150,
		y_offset: 0,
		width: w_val,
		height: h_val,
		angle: Math.random() * Math.PI,
		hp: hp_val,
		shoot_timer: Math.random() * 200,
		seek_timer: 180,
		state_timer: 0,
		alpha: 1
	});
}

function dropLoot(x_pos, y_pos) {
	if (Math.random() > active_config.drop_chance) return;
	const roll_val = Math.random() * 100;
	let type_key = "ammo";
	let sum_val = 0;
	for (const [key_id, val_num] of Object.entries(active_config.drop_table)) {
		if (roll_val < (sum_val += val_num)) {
			type_key = key_id;
			break;
		}
	}
	game_items.push({
		x: x_pos,
		y: y_pos,
		vx: (Math.random() - 0.5) * 2,
		vy: -2,
		type: type_key,
		width: 28,
		height: 28
	});
}

function applyPowerup(item_type) {
	sfx_engine.playPowerup();
	if (item_type === "ammo") {
		player_obj.ammo += 15;
		addPopup(player_obj.x, player_obj.y, "+15 AMMO");
	}
	if (item_type === "health") {
		player_obj.lives++;
		addPopup(player_obj.x, player_obj.y, "1UP");
	}
	if (item_type === "shield") {
		player_obj.shield_timer = 300;
		addPopup(player_obj.x, player_obj.y, "SHIELD");
	}
	if (item_type === "nuke") triggerNuke();
	if (item_type === "spread") {
		player_obj.has_spread = true;
		addPopup(player_obj.x, player_obj.y, "SPREAD!");
	}
	if (item_type === "rapid") {
		player_obj.has_rapid = true;
		addPopup(player_obj.x, player_obj.y, "RAPID!");
	}
	if (item_type === "turbo") {
		player_obj.has_turbo = true;
		addPopup(player_obj.x, player_obj.y, "TURBO!");
	}
	if (item_type === "wingman") {
		player_obj.wingman_count++;
		addPopup(player_obj.x, player_obj.y, "DRONE!");
	}
	if (item_type === "magnet") {
		player_obj.magnet_count++;
		addPopup(player_obj.x, player_obj.y, "ATTRACT!");
	}
	if (item_type === "warp") {
		player_obj.y -= 3000;
		player_obj.vy = -5;
		addPopup(player_obj.x, player_obj.y, "WARP!");
		spawnExplosion(player_obj.x, player_obj.y + 100, "player");
	}
	updateHUD();
}

function triggerNuke() {
	nuke_flash = 10;
	sfx_engine.playExplode();
	game_lanes.forEach((lane_ref) => {
		if (lane_ref.y > camera_y && lane_ref.y < camera_y + game_canvas.height) {
			if (lane_ref.field_data) lane_ref.field_data.active = false;
			lane_ref.obstacles = [];
		}
	});
	enemy_bullets = [];
	addPopup(player_obj.x, player_obj.y - 40, "NUKE!");
}

function handleDamage() {
	if (player_obj.invuln > 0 || player_obj.shield_timer > 0) return;
	sfx_engine.playExplode();
	if (current_mode === "infinity") {
		player_obj.invuln = 60;
		spawnExplosion(player_obj.x, player_obj.y, "player");
		addPopup(player_obj.x, player_obj.y - 30, "OUCH!");
		return;
	}
	player_obj.lives--;
	player_obj.invuln = 120;
	player_obj.has_spread = player_obj.has_rapid = player_obj.has_turbo = false;
	player_obj.wingman_count = player_obj.magnet_count = 0;
	spawnExplosion(player_obj.x, player_obj.y, "player");
	updateHUD();
	if (player_obj.lives <= 0) triggerGameOver();
	else addPopup(player_obj.x, player_obj.y - 30, "SYSTEM FAIL!");
}

function fireBullet(x_pos, y_pos, angle_off) {
	const angle_val = player_obj.rotation + angle_off;
	game_bullets.push({
		x: x_pos,
		y: y_pos,
		vx: Math.sin(angle_val) * active_config.bullet_speed,
		vy: -Math.cos(angle_val) * active_config.bullet_speed,
		active: true
	});
}

function fireShoot() {
	const can_fire = active_config.unlimited_ammo || player_obj.ammo > 0;
	if (can_fire && player_obj.cooldown <= 0) {
		if (!active_config.unlimited_ammo) player_obj.ammo--;
		player_obj.cooldown = player_obj.has_rapid ? 6 : 15;
		sfx_engine.playShoot();
		const cx_pos = player_obj.x + player_obj.w / 2 - 3;
		fireBullet(cx_pos, player_obj.y, 0);
		if (player_obj.has_spread) {
			fireBullet(cx_pos, player_obj.y, -0.2);
			fireBullet(cx_pos, player_obj.y, 0.2);
		}
		for (let i = 0; i < player_obj.wingman_count; i++) {
			const side_val = i % 2 === 0 ? -1 : 1;
			const off_idx = Math.floor(i / 2) + 1;
			let wx_pos =
				side_val === -1
					? player_obj.x - 20 * off_idx
					: player_obj.x + player_obj.w + 20 * off_idx - 10;
			game_bullets.push({
				x: wx_pos,
				y: player_obj.y + 10,
				vx: 0,
				vy: -active_config.bullet_speed,
				active: true
			});
		}
		player_obj.vy += 0.5;
		spawnParticle(player_obj.x + player_obj.w / 2, player_obj.y, "spark");
		updateHUD();
	}
}

function updateObjects() {
	const px_pos = player_obj.x + player_obj.w / 2;
	const py_pos = player_obj.y + player_obj.h / 2;
	const mag_range = player_obj.magnet_count * active_config.magnet_range_step;

	game_items.forEach((item_ref, idx) => {
		if (player_obj.magnet_count > 0) {
			const dx_val = px_pos - item_ref.x;
			const dy_val = py_pos - item_ref.y;
			const dist_val = Math.sqrt(dx_val * dx_val + dy_val * dy_val);
			if (dist_val < mag_range) {
				item_ref.vx += (dx_val / dist_val) * active_config.magnet_pull_force;
				item_ref.vy += (dy_val / dist_val) * active_config.magnet_pull_force;
			}
		}
		item_ref.x += item_ref.vx;
		item_ref.y += item_ref.vy;
		item_ref.vy += 0.05;
		item_ref.vx *= 0.98;
		item_ref.vy *= 0.98;
		if (
			rectIntersect(
				player_obj.x,
				player_obj.y,
				player_obj.w,
				player_obj.h,
				item_ref.x,
				item_ref.y,
				item_ref.width,
				item_ref.height
			)
		) {
			applyPowerup(item_ref.type);
			game_items.splice(idx, 1);
		}
	});

	game_bullets.forEach((b) => {
		b.x += b.vx;
		b.y += b.vy;
		if (b.y < camera_y - 100) b.active = false;
	});
	game_bullets = game_bullets.filter((b) => b.active);

	enemy_bullets.forEach((b) => {
		b.x += b.vx;
		b.y += b.vy;
		if (b.y > camera_y + game_canvas.height + 100) b.active = false;
		if (
			rectIntersect(
				player_obj.x + 8,
				player_obj.y + 8,
				player_obj.w - 16,
				player_obj.h - 16,
				b.x - 4,
				b.y - 4,
				8,
				8
			)
		) {
			handleDamage();
			b.active = false;
		}
	});
	enemy_bullets = enemy_bullets.filter((b) => b.active);
}

function pollGamepadGame() {
	const gamepads_list = navigator.getGamepads ? navigator.getGamepads() : [];
	let gp_ref = null;
	for (let i = 0; i < gamepads_list.length; i++) {
		if (gamepads_list[i] && gamepads_list[i].connected) {
			gp_ref = gamepads_list[i];
			break;
		}
	}
	if (gp_ref) {
		if (!gamepad_connected) {
			gamepad_connected = true;
			const detect_ui = document.getElementById("gp-detect");
			if (detect_ui) {
				detect_ui.innerText = "GAMEPAD CONNECTED!";
				detect_ui.style.color = active_config.colors.green;
			}
		}
		if (gp_ref.axes[0] < -0.3) keys_state.left = true;
		else if (keys_state.left && gp_ref.axes[0] >= -0.3) keys_state.left = false;
		if (gp_ref.axes[0] > 0.3) keys_state.right = true;
		else if (keys_state.right && gp_ref.axes[0] <= 0.3) keys_state.right = false;
		if (gp_ref.buttons[0].pressed || gp_ref.buttons[6].pressed)
			keys_state.thrust = true;
		if (
			gp_ref.buttons[1].pressed ||
			gp_ref.buttons[2].pressed ||
			gp_ref.buttons[7].pressed
		)
			keys_state.shoot = true;
		if (gp_ref.buttons[4].pressed || gp_ref.buttons[5].pressed)
			keys_state.dash = true;
		if (gp_ref.buttons[9].pressed && global_tick % 20 === 0) togglePause();
	}
}

function pollGamepadUI() {
	const gamepads_list = navigator.getGamepads ? navigator.getGamepads() : [];
	let gp_ref = null;
	for (let i = 0; i < gamepads_list.length; i++) {
		if (gamepads_list[i] && gamepads_list[i].connected) {
			gp_ref = gamepads_list[i];
			break;
		}
	}
	if (gp_ref) {
		if (ui_cooldown > 0) {
			ui_cooldown--;
			return;
		}
		const active_panel = document.querySelector(".panel.visible, .modal.visible");
		if (!active_panel) return;
		const btns_list = active_panel.querySelectorAll("button");
		if (btns_list.length === 0) return;
		if (ui_selected_index >= btns_list.length) ui_selected_index = 0;
		btns_list.forEach((b) => b.classList.remove("selected"));
		btns_list[ui_selected_index].classList.add("selected");
		const nav_up = gp_ref.axes[1] < -0.5 || gp_ref.buttons[12]?.pressed;
		const nav_down = gp_ref.axes[1] > 0.5 || gp_ref.buttons[13]?.pressed;
		if (nav_down) {
			ui_selected_index = (ui_selected_index + 1) % btns_list.length;
			ui_cooldown = 10;
			sfx_engine.playShoot();
		} else if (nav_up) {
			ui_selected_index =
				(ui_selected_index - 1 + btns_list.length) % btns_list.length;
			ui_cooldown = 10;
			sfx_engine.playShoot();
		}
		if (gp_ref.buttons[0].pressed) {
			btns_list[ui_selected_index].click();
			ui_cooldown = 20;
		}
	}
}

function updatePlayer() {
	pollGamepadGame();
	if (keys_state.left) player_obj.vx -= 0.5;
	if (keys_state.right) player_obj.vx += 0.5;
	if (
		keys_state.dash &&
		!keys_state.dash_pressed &&
		player_obj.dash_cooldown <= 0
	) {
		keys_state.dash_pressed = true;
		player_obj.dash_cooldown = 45;
		let dash_dir = keys_state.left
			? -1
			: keys_state.right
			? 1
			: player_obj.vx < 0
			? -1
			: 1;
		player_obj.vx = dash_dir * active_config.dash_force;
		spawnExplosion(player_obj.x, player_obj.y + 20, "spark");
		addPopup(player_obj.x, player_obj.y, "DASH");
	}
	if (!keys_state.dash) keys_state.dash_pressed = false;
	if (player_obj.dash_cooldown > 0) player_obj.dash_cooldown--;
	player_obj.vx *= active_config.friction_val;
	player_obj.x += player_obj.vx;
	if (player_obj.x < -player_obj.w) player_obj.x = game_canvas.width;
	if (player_obj.x > game_canvas.width) player_obj.x = -player_obj.w;
	let use_thrust = false;
	if (active_config.control_mode === "flappy") {
		if (keys_state.thrust && !keys_state.thrust_pressed) {
			keys_state.thrust_pressed = true;
			use_thrust = true;
		}
	} else {
		if (keys_state.thrust) use_thrust = true;
	}
	if (use_thrust) {
		player_obj.vy = player_obj.has_turbo
			? active_config.turbo_thrust
			: active_config.thrust_force;
		for (let i = 0; i < 3; i++)
			spawnParticle(
				player_obj.x + player_obj.w / 2,
				player_obj.y + player_obj.h,
				"thrust"
			);
	}
	if (use_thrust && global_tick % 4 === 0)
		spawnParticle(
			player_obj.x + player_obj.w / 2,
			player_obj.y + player_obj.h,
			"thrust"
		);
	if (player_obj.cooldown > 0) player_obj.cooldown--;
	if (player_obj.invuln > 0) player_obj.invuln--;
	if (player_obj.shield_timer > 0) player_obj.shield_timer--;
	let use_shoot = false;
	if (player_obj.has_rapid) {
		if (keys_state.shoot) use_shoot = true;
	} else {
		if (keys_state.shoot && !keys_state.shoot_pressed) {
			keys_state.shoot_pressed = true;
			use_shoot = true;
		}
		if (!keys_state.shoot) keys_state.shoot_pressed = false;
	}
	if (use_shoot) fireShoot();
	player_obj.vy += active_config.gravity_val;
	if (player_obj.vy > active_config.max_fall_speed)
		player_obj.vy = active_config.max_fall_speed;
	player_obj.y += player_obj.vy;
	player_obj.rotation = player_obj.vx * 0.15;
	if (player_obj.y + player_obj.h > floor_level) {
		player_obj.y = floor_level - player_obj.h;
		player_obj.vy = 0;
		player_obj.vx *= 0.8;
		player_obj.rotation = 0;
	}
	const cam_target = player_obj.y - game_canvas.height * 0.6;
	if (cam_target < camera_y) camera_y += (cam_target - camera_y) * 0.1;
	else camera_y += (cam_target - camera_y) * 0.02;
	if (camera_y > 0) camera_y = 0;
	const alt_val = Math.floor((-player_obj.y + (floor_level - 20)) / 10);
	if (alt_val > altitude_count && alt_val > 0) {
		altitude_count = alt_val;
		if (altitude_count >= next_ammo_milestone) {
			player_obj.ammo += 10;
			next_ammo_milestone += 250;
			addPopup(player_obj.x, player_obj.y - 40, "RELOAD!");
			sfx_engine.playPowerup();
			updateHUD();
		}
	}
	time_alive = Math.floor((Date.now() - start_timestamp) / 1000);
	total_score = Math.floor(
		altitude_count +
			kills_count * active_config.score_kill +
			time_alive * active_config.score_time_factor
	);
	updateHUD();
	if (player_obj.y > camera_y + game_canvas.height + 100) handleDamage();
	if (player_obj.y > camera_y + game_canvas.height + 300) {
		player_obj.lives = 0;
		triggerGameOver();
	}
}

function updateLanes() {
	game_lanes = game_lanes.filter(
		(l) => l.y < camera_y + game_canvas.height + 400
	);
	let top_y = game_lanes.reduce((min_y, l) => Math.min(min_y, l.y), Infinity);
	if (top_y === Infinity) top_y = floor_level - 100;
	if (top_y > camera_y - 200) createLane(top_y - active_config.lane_height);

	game_lanes.forEach((lane_ref) => {
		if (lane_ref.type === "forcefield") {
			if (!lane_ref.field_data.active) return;
			const field_y = Math.floor(lane_ref.y + lane_ref.height / 2);
			if (lane_ref.field_data.type === "red") {
				game_bullets.forEach((b) => {
					if (!b.active) return;
					if (b.y > field_y - 15 && b.y < field_y + 15) {
						if (
							b.x < lane_ref.field_data.gap_x ||
							b.x > lane_ref.field_data.gap_x + lane_ref.field_data.gap_w
						) {
							b.active = false;
							lane_ref.field_data.hp--;
							spawnParticle(b.x, field_y, "spark");
							if (lane_ref.field_data.hp <= 0) {
								lane_ref.field_data.active = false;
								kills_count++;
								sfx_engine.playExplode();
								spawnExplosion(b.x, field_y, "forcefield_red");
							}
						}
					}
				});
			}
			if (
				player_obj.y + player_obj.h > field_y - 10 &&
				player_obj.y < field_y + 10
			) {
				if (
					player_obj.x + 5 < lane_ref.field_data.gap_x ||
					player_obj.x + player_obj.w - 5 >
						lane_ref.field_data.gap_x + lane_ref.field_data.gap_w
				) {
					if (lane_ref.field_data.type === "red") {
						handleDamage();
						player_obj.vy = 8;
					} else {
						if (player_obj.vy > 0 && player_obj.y + player_obj.h < field_y + 10) {
							player_obj.y = field_y - player_obj.h - 10;
							player_obj.vy = 0;
						} else if (player_obj.vy < 0 && player_obj.y > field_y - 10) {
							player_obj.y = field_y + 10;
							player_obj.vy = 0;
						}
					}
				}
			}
			return;
		}
		lane_ref.timer++;
		let spawn_div =
			lane_ref.type === "swarm" || lane_ref.type === "drone" ? 0.4 : 1;
		const spawn_threshold =
			(active_config.spawn_rate_max * spawn_div) / (1 + altitude_count / 3000);
		if (lane_ref.timer > spawn_threshold) {
			lane_ref.timer = 0;
			if (lane_ref.type === "swarm") {
				for (let i = 0; i < 3; i++)
					setTimeout(() => addObstacle(lane_ref), i * 200);
			} else {
				if (Math.random() > 0.15) addObstacle(lane_ref);
			}
		}
		lane_ref.obstacles.forEach((obs_ref, idx) => {
			obs_ref.state_timer++;
			if (lane_ref.type === "seeker" || lane_ref.type === "kamikaze") {
				if (obs_ref.seek_timer > 0) {
					obs_ref.seek_timer--;
					const dx_val = player_obj.x - obs_ref.x;
					let speed_val = lane_ref.type === "kamikaze" ? 4 : 2;
					if (Math.abs(dx_val) > 5) obs_ref.x += Math.sign(dx_val) * speed_val;
				}
				if (lane_ref.type === "kamikaze" && obs_ref.seek_timer < 50)
					obs_ref.y_offset += 3;
				obs_ref.x += lane_ref.speed * lane_ref.direction * 0.5;
			} else if (lane_ref.type === "zigzag") {
				obs_ref.x += lane_ref.speed * lane_ref.direction;
				obs_ref.y_offset = Math.sin(obs_ref.state_timer * 0.1) * 50;
			} else if (lane_ref.type === "bouncer") {
				obs_ref.x += lane_ref.speed * lane_ref.direction;
				obs_ref.y_offset = Math.abs(Math.sin(obs_ref.state_timer * 0.05)) * -100;
			} else if (lane_ref.type === "charger") {
				if (obs_ref.state_timer % 100 < 60)
					obs_ref.x += lane_ref.speed * lane_ref.direction * 0.5;
				else obs_ref.x += lane_ref.speed * lane_ref.direction * 3;
			} else if (lane_ref.type === "orbiter") {
				obs_ref.start_x += lane_ref.speed * lane_ref.direction;
				obs_ref.x = obs_ref.start_x + Math.cos(obs_ref.state_timer * 0.1) * 40;
				obs_ref.y_offset = Math.sin(obs_ref.state_timer * 0.1) * 40;
			} else if (lane_ref.type === "ghost") {
				obs_ref.x += lane_ref.speed * lane_ref.direction;
				obs_ref.alpha = 0.5 + Math.sin(obs_ref.state_timer * 0.05) * 0.5;
			} else if (lane_ref.type === "stealth") {
				obs_ref.x += lane_ref.speed * lane_ref.direction * 1.5;
				if (
					Math.abs(player_obj.x - obs_ref.x) < 100 &&
					Math.abs(player_obj.y - (lane_ref.y + obs_ref.y_offset)) < 100
				)
					obs_ref.alpha = 1;
				else obs_ref.alpha = 0.1;
			} else if (lane_ref.type === "barrier_rot") {
				obs_ref.x += lane_ref.speed * lane_ref.direction * 0.5;
				obs_ref.angle += 0.05;
			} else obs_ref.x += lane_ref.speed * lane_ref.direction;

			if (
				["alien", "sniper", "turret", "tank", "bomber", "colossus"].includes(
					lane_ref.type
				)
			) {
				obs_ref.shoot_timer--;
				if (obs_ref.shoot_timer <= 0) {
					if (lane_ref.type === "sniper") obs_ref.shoot_timer = 200;
					else if (lane_ref.type === "turret") obs_ref.shoot_timer = 60;
					else obs_ref.shoot_timer = 150 + Math.random() * 100;
					const dx_val =
						player_obj.x + player_obj.w / 2 - (obs_ref.x + obs_ref.width / 2);
					const dy_val =
						player_obj.y + player_obj.h / 2 - (lane_ref.y + lane_ref.height / 2);
					const angle_val = Math.atan2(dy_val, dx_val);
					let spd_val = active_config.enemy_bullet_speed;
					if (lane_ref.type === "sniper") spd_val *= 2;
					let vx_val = Math.cos(angle_val) * spd_val;
					let vy_val = Math.sin(angle_val) * spd_val;
					if (lane_ref.type === "bomber") {
						vx_val = 0;
						vy_val = 5;
					}
					enemy_bullets.push({
						x: obs_ref.x + obs_ref.width / 2,
						y: lane_ref.y + lane_ref.height / 2,
						vx: vx_val,
						vy: vy_val,
						active: true
					});
				}
			}
			if (lane_ref.type === "ufo")
				obs_ref.y_offset = Math.sin(global_tick * 0.05 + obs_ref.x * 0.05) * 20;
			game_bullets.forEach((b) => {
				if (!b.active) return;
				const cur_obs_y =
					lane_ref.y + (lane_ref.height - obs_ref.height) / 2 + obs_ref.y_offset;
				if (lane_ref.type === "ghost" && obs_ref.alpha < 0.3) return;
				if (
					rectIntersect(
						b.x,
						b.y,
						6,
						12,
						obs_ref.x,
						cur_obs_y,
						obs_ref.width,
						obs_ref.height
					)
				) {
					b.active = false;
					obs_ref.hp--;
					spawnParticle(b.x, b.y, "spark");
					if (obs_ref.hp <= 0) {
						lane_ref.obstacles.splice(idx, 1);
						kills_count++;
						sfx_engine.playExplode();
						spawnExplosion(
							obs_ref.x + obs_ref.width / 2,
							cur_obs_y + obs_ref.height / 2,
							lane_ref.type
						);
						dropLoot(obs_ref.x + obs_ref.width / 2, cur_obs_y + obs_ref.height / 2);
						if (lane_ref.type === "splitter") {
							for (let k = 0; k < 2; k++) {
								enemy_bullets.push({
									x: obs_ref.x + obs_ref.width / 2,
									y: cur_obs_y + obs_ref.height / 2,
									vx: (Math.random() - 0.5) * 5,
									vy: (Math.random() - 0.5) * 5,
									active: true
								});
							}
						}
					}
				}
			});
			const cur_obs_y =
				lane_ref.y + (lane_ref.height - obs_ref.height) / 2 + obs_ref.y_offset;
			if (
				rectIntersect(
					player_obj.x + 8,
					player_obj.y + 8,
					player_obj.w - 16,
					player_obj.h - 16,
					obs_ref.x,
					cur_obs_y,
					obs_ref.width,
					obs_ref.height
				)
			) {
				handleDamage();
				lane_ref.obstacles.splice(idx, 1);
				spawnExplosion(obs_ref.x, cur_obs_y, lane_ref.type);
			}
		});
		lane_ref.obstacles = lane_ref.obstacles.filter(
			(o) => o.x > -150 && o.x < game_canvas.width + 150
		);
	});
}

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
	return x2 < x1 + w1 && x2 + w2 > x1 && y2 < y1 + h1 && y2 + h2 > y1;
}
function addPopup(x_pos, y_pos, text_str) {
	game_popups.push({ x: x_pos, y: y_pos, text: text_str, life: 60 });
}

function updateHUD() {
	const score_ui = document.getElementById("scoreDisplay");
	const alt_ui = document.getElementById("altDisplay");
	const kills_ui = document.getElementById("killsDisplay");
	const time_ui = document.getElementById("timeDisplay");
	const ammo_ui = document.getElementById("ammoDisplay");
	const mag_ui = document.getElementById("magDisplay");
	const lives_ui = document.getElementById("livesDisplay");
	const weapon_ui = document.getElementById("weaponDisplay");

	if (score_ui) score_ui.innerText = total_score;
	if (alt_ui) alt_ui.innerText = altitude_count;
	if (kills_ui) kills_ui.innerText = kills_count;
	if (time_ui) time_ui.innerText = time_alive + "s";
	if (ammo_ui)
		ammo_ui.innerText = active_config.unlimited_ammo ? "INF" : player_obj.ammo;
	if (mag_ui) mag_ui.innerText = player_obj.magnet_count;

	if (lives_ui) {
		const roman_nums = [
			"",
			"I",
			"II",
			"III",
			"IV",
			"V",
			"VI",
			"VII",
			"VIII",
			"IX",
			"X"
		];
		lives_ui.innerText =
			player_obj.lives > 10 || current_mode === "infinity"
				? current_mode === "infinity"
					? "INF"
					: player_obj.lives
				: roman_nums[player_obj.lives];
		lives_ui.style.color =
			player_obj.lives === 1
				? active_config.colors.red
				: active_config.colors.white;
	}
	if (weapon_ui) {
		let status_str = "STD";
		if (player_obj.has_spread) status_str = "SPD";
		if (player_obj.has_rapid) status_str = "RPD";
		if (player_obj.has_spread && player_obj.has_rapid) status_str = "MAX";
		weapon_ui.innerText = status_str;
	}
}

function spawnExplosion(x_pos, y_pos, type_id) {
	let count_val = 25;
	let color_val = active_config.colors.orange;
	if (type_id === "player") {
		count_val = 60;
		color_val = active_config.colors.white;
	} else if (type_id === "alien") color_val = active_config.colors.purple;
	else if (type_id === "forcefield_red") {
		count_val = 40;
		color_val = active_config.colors.red;
	} else if (type_id === "seeker") color_val = active_config.colors.red;
	else if (type_id === "ufo") color_val = active_config.colors.cyan;
	for (let i = 0; i < count_val; i++) {
		game_particles.push({
			x: x_pos,
			y: y_pos,
			vx: Math.round((Math.random() - 0.5) * 14),
			vy: Math.round((Math.random() - 0.5) * 14),
			life: 1.0,
			color: color_val,
			size: (Math.random() > 0.5 ? 2 : 1) * active_config.pixel_size
		});
	}
}

function spawnParticle(x_pos, y_pos, type_id) {
	let color_val = active_config.colors.white;
	let life_val = 0.5;
	let size_val = active_config.pixel_size;
	let vx_val = Math.round((Math.random() - 0.5) * 4);
	let vy_val = Math.round((Math.random() - 0.5) * 4);
	if (type_id === "thrust") {
		color_val = active_config.colors.orange;
		vx_val = Math.round((Math.random() - 0.5) * 2);
		vy_val = 4 + Math.random() * 4;
		life_val = 0.4;
		size_val = active_config.pixel_size * 2;
	} else if (type_id === "spark") {
		color_val = active_config.colors.white;
		life_val = 0.2;
	}
	game_particles.push({
		x: x_pos,
		y: y_pos,
		vx: vx_val,
		vy: vy_val,
		life: life_val,
		color: color_val,
		size: size_val
	});
}

function drawRect(
	x_pos,
	y_pos,
	w_val,
	h_val,
	color_str,
	fill_bool = true,
	stroke_w = 2
) {
	const sx = snapPos(x_pos);
	const sy = snapPos(y_pos);
	const sw = snapPos(w_val);
	const sh = snapPos(h_val);
	game_ctx.fillStyle = color_str;
	game_ctx.strokeStyle = color_str;
	game_ctx.lineWidth = stroke_w;
	if (fill_bool) game_ctx.fillRect(sx, sy, sw, sh);
	else game_ctx.strokeRect(sx, sy, sw, sh);
}

function drawPlayer() {
	if (player_obj.invuln % 8 < 4) {
		const w_val = player_obj.w;
		const h_val = player_obj.h;
		game_ctx.save();
		game_ctx.translate(player_obj.x + w_val / 2, player_obj.y + h_val / 2);
		game_ctx.rotate(player_obj.rotation);
		const lx_pos = -w_val / 2;
		const ly_pos = -h_val / 2;
		if (player_obj.magnet_count > 0 && global_tick % 10 < 5) {
			game_ctx.strokeStyle = active_config.colors.cyan;
			game_ctx.lineWidth = 2;
			game_ctx.strokeRect(lx_pos - 10, ly_pos - 10, w_val + 20, h_val + 20);
		}
		for (let i = 0; i < player_obj.wingman_count; i++) {
			game_ctx.fillStyle = active_config.colors.green;
			const side_val = i % 2 === 0 ? -1 : 1;
			const off_idx = Math.floor(i / 2) + 1;
			let dx_pos =
				side_val === -1
					? lx_pos - 20 * off_idx
					: lx_pos + w_val + 20 * off_idx - 10;
			game_ctx.fillRect(dx_pos, ly_pos + 10, 12, 12);
		}
		game_ctx.fillStyle = active_config.colors.white;
		game_ctx.fillRect(lx_pos + w_val / 4, ly_pos, w_val / 2, h_val);
		game_ctx.fillStyle = active_config.colors.blue;
		game_ctx.fillRect(lx_pos, ly_pos + h_val / 2, w_val / 4, h_val / 2);
		game_ctx.fillRect(
			lx_pos + w_val * 0.75,
			ly_pos + h_val / 2,
			w_val / 4,
			h_val / 2
		);
		game_ctx.fillStyle = player_obj.has_turbo
			? active_config.colors.red
			: active_config.colors.cyan;
		game_ctx.fillRect(lx_pos + w_val / 2 - 4, ly_pos + 12, 8, 8);
		if (player_obj.shield_timer > 0 && Math.floor(global_tick / 4) % 2 === 0) {
			game_ctx.strokeStyle = active_config.colors.cyan;
			game_ctx.lineWidth = 4;
			game_ctx.strokeRect(lx_pos - 4, ly_pos - 4, w_val + 8, h_val + 8);
		}
		game_ctx.restore();
	}
}

function drawEnemy(obs_ref, type_str) {
	const ex = obs_ref.x;
	const ey = obs_ref.y;
	const ew = obs_ref.width;
	const eh = obs_ref.height;
	if (type_str === "ghost" || type_str === "stealth")
		game_ctx.globalAlpha = obs_ref.alpha !== undefined ? obs_ref.alpha : 1;
	if (type_str === "barrier_rot") {
		game_ctx.save();
		game_ctx.translate(ex + ew / 2, ey + eh / 2);
		game_ctx.rotate(obs_ref.angle || 0);
		drawRect(-ew / 2, -eh / 2, ew, eh, active_config.colors.red, true);
		game_ctx.restore();
		return;
	}
	if (type_str === "asteroid") {
		drawRect(ex + ew * 0.1, ey, ew * 0.8, eh, active_config.colors.gray, true);
		drawRect(ex, ey + eh * 0.2, ew, eh * 0.6, active_config.colors.gray, true);
		drawRect(
			ex + ew * 0.3,
			ey + eh * 0.3,
			ew * 0.2,
			eh * 0.2,
			active_config.colors.black,
			true
		);
	} else if (type_str === "alien") {
		drawRect(ex, ey, ew, eh, active_config.colors.purple, true);
		drawRect(
			ex + ew * 0.2,
			ey + eh * 0.3,
			ew * 0.2,
			eh * 0.2,
			active_config.colors.green,
			true
		);
		drawRect(
			ex + ew * 0.6,
			ey + eh * 0.3,
			ew * 0.2,
			eh * 0.2,
			active_config.colors.green,
			true
		);
	} else if (type_str === "ufo") {
		drawRect(ex, ey + eh / 2, ew, eh / 2, active_config.colors.blue, true);
		drawRect(
			ex + ew * 0.25,
			ey,
			ew * 0.5,
			eh / 2,
			active_config.colors.cyan,
			true
		);
	} else if (type_str === "seeker") {
		drawRect(ex, ey, ew, eh / 3, active_config.colors.red, true);
		drawRect(
			ex + ew * 0.2,
			ey + eh / 3,
			ew * 0.6,
			eh / 3,
			active_config.colors.red,
			true
		);
		drawRect(
			ex + ew * 0.4,
			ey + eh * 0.66,
			ew * 0.2,
			eh / 3,
			active_config.colors.red,
			true
		);
		drawRect(
			ex + ew * 0.4,
			ey,
			ew * 0.2,
			eh / 3,
			active_config.colors.white,
			true
		);
	} else if (type_str === "drone" || type_str === "swarm") {
		drawRect(ex, ey, ew, eh, active_config.colors.green, true);
		drawRect(ex + 4, ey + 4, ew - 8, eh - 8, active_config.colors.black, true);
	} else if (type_str === "miner") {
		drawRect(ex, ey, ew, eh, active_config.colors.orange, true);
		if (Math.floor(global_tick / 10) % 2 === 0)
			drawRect(ex + 8, ey + 8, ew - 16, eh - 16, active_config.colors.red, true);
	} else if (type_str === "zigzag") {
		drawRect(ex, ey, ew, eh, active_config.colors.cyan, true);
		drawRect(ex, ey + eh / 2, ew, 2, active_config.colors.white, true);
	} else if (type_str === "sniper") {
		drawRect(ex, ey, ew, eh, active_config.colors.gray, true);
		drawRect(ex + ew / 2 - 2, ey + 10, 4, 10, active_config.colors.red, true);
	} else if (type_str === "tank" || type_str === "colossus") {
		drawRect(ex, ey, ew, eh, active_config.colors.green, true);
		drawRect(ex, ey + eh - 10, ew, 10, active_config.colors.black, true);
		drawRect(ex + ew / 2 - 4, ey + 10, 8, 20, active_config.colors.black, true);
	} else if (type_str === "bomber") {
		drawRect(ex, ey, ew, eh / 2, active_config.colors.orange, true);
		drawRect(
			ex + 10,
			ey + eh / 2,
			ew - 20,
			eh / 2,
			active_config.colors.gray,
			true
		);
	} else if (type_str === "ghost") {
		drawRect(ex, ey, ew, eh, active_config.colors.white, true);
		drawRect(ex + 5, ey + 10, 5, 5, active_config.colors.black, true);
		drawRect(ex + 20, ey + 10, 5, 5, active_config.colors.black, true);
	} else if (type_str === "turret") {
		drawRect(ex, ey, ew, eh, active_config.colors.purple, true);
		const dx_val = player_obj.x + 16 - (ex + ew / 2);
		const dy_val = player_obj.y + 24 - (ey + eh / 2);
		const angle_val = Math.atan2(dy_val, dx_val);
		const lx_val = ex + ew / 2 + Math.cos(angle_val) * 15;
		const ly_val = ey + eh / 2 + Math.sin(angle_val) * 15;
		drawRect(lx_val - 2, ly_val - 2, 4, 4, active_config.colors.red, true);
	} else if (type_str === "stealth") {
		drawRect(ex, ey, ew, eh, active_config.colors.gray, false, 2);
	} else if (type_str === "orbiter") {
		drawRect(ex, ey, ew, eh, active_config.colors.blue, true);
		drawRect(
			ex + ew / 4,
			ey + eh / 4,
			ew / 2,
			eh / 2,
			active_config.colors.white,
			true
		);
	} else if (type_str === "blocker") {
		drawRect(ex, ey, ew, eh, active_config.colors.gray, true);
		drawRect(ex + 4, ey + 4, ew - 8, eh - 8, active_config.colors.black, true);
	} else {
		drawRect(ex, ey, ew, eh, active_config.colors.red, true);
	}
	game_ctx.globalAlpha = 1;
}

function drawScene() {
	if (nuke_flash > 0) {
		game_ctx.fillStyle = active_config.colors.white;
		game_ctx.fillRect(0, 0, game_canvas.width, game_canvas.height);
		nuke_flash--;
		return;
	}
	game_ctx.fillStyle = active_config.colors.black;
	game_ctx.fillRect(0, 0, game_canvas.width, game_canvas.height);
	game_ctx.save();
	const cam_off = -camera_y;
	const canv_h = game_canvas.height;
	game_stars.forEach((s) => {
		game_ctx.fillStyle = s.color;
		game_ctx.fillRect(s.x, (s.y + cam_off * s.depth) % canv_h, s.size, s.size);
	});
	game_ctx.restore();
	game_ctx.save();
	game_ctx.translate(0, Math.floor(-camera_y));
	drawRect(
		0,
		floor_level,
		game_canvas.width,
		100,
		active_config.colors.gray,
		true
	);
	game_ctx.fillStyle = active_config.colors.white;
	game_ctx.font = '24px "Press Start 2P"';
	game_ctx.fillText("LAUNCHPAD", game_canvas.width / 2 - 100, floor_level + 60);
	game_items.forEach((item_ref) => {
		let char_val = "?";
		let color_val = active_config.colors.white;
		if (item_ref.type === "ammo") {
			char_val = "A";
			color_val = active_config.colors.cyan;
		}
		if (item_ref.type === "health") {
			char_val = "♥";
			color_val = active_config.colors.red;
		}
		if (item_ref.type === "shield") {
			char_val = "S";
			color_val = active_config.colors.cyan;
		}
		if (item_ref.type === "nuke") {
			char_val = "☢";
			color_val = active_config.colors.orange;
		}
		if (item_ref.type === "spread") {
			char_val = "S";
			color_val = active_config.colors.orange;
		}
		if (item_ref.type === "rapid") {
			char_val = "R";
			color_val = active_config.colors.red;
		}
		if (item_ref.type === "wingman") {
			char_val = "O";
			color_val = active_config.colors.green;
		}
		if (item_ref.type === "turbo") {
			char_val = "T";
			color_val = active_config.colors.red;
		}
		if (item_ref.type === "warp") {
			char_val = "W";
			color_val = active_config.colors.purple;
		}
		if (item_ref.type === "magnet") {
			char_val = "M";
			color_val = active_config.colors.cyan;
		}
		game_ctx.fillStyle = color_val;
		game_ctx.font = '20px "Press Start 2P"';
		game_ctx.fillText(char_val, item_ref.x + 6, item_ref.y + 22);
		drawRect(
			item_ref.x,
			item_ref.y,
			item_ref.width,
			item_ref.height,
			color_val,
			false,
			4
		);
	});
	game_lanes.forEach((lane_ref) => {
		if (lane_ref.type === "forcefield") {
			if (!lane_ref.field_data.active) return;
			const fy_pos = Math.floor(lane_ref.y + lane_ref.height / 2);
			if (lane_ref.field_data.type === "red") {
				game_ctx.fillStyle = active_config.colors.red;
				for (let k = 0; k < game_canvas.width; k += 12) {
					if (
						k < lane_ref.field_data.gap_x ||
						k > lane_ref.field_data.gap_x + lane_ref.field_data.gap_w
					)
						game_ctx.fillRect(k, fy_pos, 8, 12);
				}
			} else {
				game_ctx.fillStyle = active_config.colors.cyan;
				game_ctx.fillRect(0, fy_pos, lane_ref.field_data.gap_x, 8);
				game_ctx.fillRect(
					lane_ref.field_data.gap_x + lane_ref.field_data.gap_w,
					fy_pos,
					game_canvas.width,
					8
				);
			}
			drawRect(
				lane_ref.field_data.gap_x - 8,
				fy_pos - 16,
				8,
				32,
				active_config.colors.white,
				true
			);
			drawRect(
				lane_ref.field_data.gap_x + lane_ref.field_data.gap_w,
				fy_pos - 16,
				8,
				32,
				active_config.colors.white,
				true
			);
			return;
		}
		lane_ref.obstacles.forEach((obs_ref) => {
			const old_y = obs_ref.y;
			obs_ref.y =
				lane_ref.y + (lane_ref.height - obs_ref.height) / 2 + obs_ref.y_offset;
			drawEnemy(obs_ref, lane_ref.type);
			obs_ref.y = old_y;
		});
	});
	if (!game_over) drawPlayer();
	game_bullets.forEach((b) =>
		drawRect(b.x, b.y, 8, 16, active_config.colors.cyan, true)
	);
	enemy_bullets.forEach((b) =>
		drawRect(b.x, b.y, 12, 12, active_config.colors.red, true)
	);
	game_particles.forEach((p) => {
		drawRect(p.x, p.y, p.size, p.size, p.color, true);
		p.life -= 0.05;
		p.x += p.vx;
		p.y += p.vy;
	});
	game_particles = game_particles.filter((p) => p.life > 0);
	game_popups.forEach((p) => {
		game_ctx.fillStyle = active_config.colors.white;
		game_ctx.font = '16px "Press Start 2P"';
		game_ctx.fillText(p.text, p.x, p.y);
		p.y -= 0.5;
		p.life--;
	});
	game_popups = game_popups.filter((p) => p.life > 0);
	game_ctx.restore();
}

function gameLoop() {
	if (!game_active) {
		pollGamepadUI();
	} else if (game_paused) {
		pollGamepadUI();
	} else {
		global_tick++;
		updatePlayer();
		updateObjects();
		updateLanes();
	}
	drawScene();
	animation_id = requestAnimationFrame(gameLoop);
}

window.addEventListener("resize", handleResize);
window.addEventListener("keydown", (e) => {
	if (e.code === "KeyP" || e.code === "Escape") {
		togglePause();
		return;
	}
	if (!game_active || game_paused) return;
	if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW")
		keys_state.thrust = true;
	if (e.code === "ArrowLeft" || e.code === "KeyA") keys_state.left = true;
	if (e.code === "ArrowRight" || e.code === "KeyD") keys_state.right = true;
	if (e.code === "KeyF" || e.code === "Enter") keys_state.shoot = true;
	if (e.code === "ShiftLeft" || e.code === "ShiftRight" || e.code === "KeyZ")
		keys_state.dash = true;
});
window.addEventListener("keyup", (e) => {
	if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
		keys_state.thrust = false;
		keys_state.thrust_pressed = false;
	}
	if (e.code === "ArrowLeft" || e.code === "KeyA") keys_state.left = false;
	if (e.code === "ArrowRight" || e.code === "KeyD") keys_state.right = false;
	if (e.code === "KeyF" || e.code === "Enter") {
		keys_state.shoot = false;
		keys_state.shoot_pressed = false;
	}
	if (e.code === "ShiftLeft" || e.code === "ShiftRight" || e.code === "KeyZ") {
		keys_state.dash = false;
		keys_state.dash_pressed = false;
	}
});
window.addEventListener("mousedown", () => (keys_state.shoot = true));
window.addEventListener("mouseup", () => {
	keys_state.shoot = false;
	keys_state.shoot_pressed = false;
});

handleResize();
gameLoop();
