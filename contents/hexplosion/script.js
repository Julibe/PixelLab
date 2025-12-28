import * as THREE from "https://esm.sh/three";
import { RoomEnvironment } from "https://esm.sh/three/addons/environments/RoomEnvironment.js";

const SoundEngine = {
	ctx: null,
	enabled: true,
	waveform: "sine",
	init: function () {
		if (!this.ctx)
			this.ctx = new (window.AudioContext || window.webkitAudioContext)();
		if (this.ctx.state === "suspended") this.ctx.resume();
	},
	toggle: function () {
		this.enabled = !this.enabled;
		return this.enabled;
	},
	setWaveform: function (e) {
		this.waveform = e;
	},
	playTone: function (e, t, n = 0.1) {
		if (!this.enabled || !this.ctx) return;
		const o = this.ctx.createOscillator(),
			a = this.ctx.createGain();
		(o.type = this.waveform),
			o.frequency.setValueAtTime(e, this.ctx.currentTime),
			a.gain.setValueAtTime(n, this.ctx.currentTime),
			a.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + t),
			o.connect(a),
			a.connect(this.ctx.destination),
			o.start(),
			o.stop(this.ctx.currentTime + t);
	},
	playClick: function () {
		this.playTone(800, 0.1, 0.05);
	},
	playRotate: function () {
		this.playTone(300, 0.15, 0.05);
	},
	playMatch: function () {
		const e = "square" === this.waveform ? 220 : 440;
		this.playTone(e, 0.3, 0.1),
			setTimeout(() => this.playTone(1.25 * e, 0.3, 0.1), 50),
			setTimeout(() => this.playTone(1.5 * e, 0.3, 0.1), 100);
	},
	playLevelUp: function () {
		this.playTone(523, 0.4, 0.1),
			setTimeout(() => this.playTone(659, 0.4, 0.1), 100),
			setTimeout(() => this.playTone(784, 0.4, 0.1), 200),
			setTimeout(() => this.playTone(1046, 0.6, 0.1), 300);
	}
};

const BG_VERT = `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const BG_FRAG = `varying vec2 vUv;uniform float uTime;uniform vec3 uColorA;uniform vec3 uColorB;void main(){float v=sin(vUv.x*10.0+uTime);v+=sin((vUv.y*10.0+uTime)*0.5);v+=sin((vUv.x*10.0+vUv.y*10.0+uTime)*0.5);float cx=vUv.x+0.5*sin(uTime*0.2);float cy=vUv.y+0.5*cos(uTime*0.3);v+=sin(sqrt(cx*cx+cy*cy+1.0)*10.0+uTime);v=v*0.5;float r=sin(v*4.0*3.1415)*0.5+0.5;vec3 col=mix(uColorA,uColorB,r);col=mix(col,vec3(1.0),0.1);float dist=distance(vUv,vec2(0.5));col*=1.2-dist*0.5;gl_FragColor=vec4(col,1.0);}`;

// --- MANUALLY FIXED PALETTES FOR MAXIMUM GAMEPLAY VISIBILITY ---
const PALETTES_HEX = {
	// 1. Earthy Ocean: Added distinct brightness steps
	earthy_ocean_tones: [
		"#0D1F22",
		"#3E5C60",
		"#A0684F",
		"#D6D6D6",
		"#F2E8D5",
		"#E3C992",
		"#50E3C2",
		"#FFFFFF"
	],
	// 2. Lush Forest: Added Lime and White to break up the dark greens
	lush_green_forest: [
		"#02120A",
		"#1F4F2A",
		"#00FF55",
		"#CCFF00",
		"#EBE0CC",
		"#FFFFFF",
		"#FF3333",
		"#4A2205"
	],
	// 3. Cozy Autumn: Replaced similar golds with distinct Rust/Blue/Black
	cozy_autumn_glow: [
		"#FFFFFF",
		"#FF4500",
		"#D1925C",
		"#FFD700",
		"#5C4033",
		"#4A90E2",
		"#2F4F4F",
		"#000000"
	],
	// 4. Fiery Citrus: Made greens darker and yellows brighter
	fiery_citrus_green: [
		"#FF2200",
		"#FFAA00",
		"#FFFF00",
		"#F0E68C",
		"#66FF00",
		"#006400",
		"#000000",
		"#FFFFFF"
	],
	// 5. Tropical Mix: High contrast Teal vs Orange vs Black
	tropical_sunset_paradise_mix: [
		"#002222",
		"#00E5FF",
		"#80CBC4",
		"#FFFF00",
		"#FF6600",
		"#111111",
		"#FF0000",
		"#BBFFBB"
	],
	// 6. Tropical Pink: Distinct Pink/Salmon/Gold steps
	tropical_sunset_paradise_pink: [
		"#003333",
		"#00FFFF",
		"#FFD700",
		"#FF5500",
		"#FF0000",
		"#FFAA88",
		"#FF99CC",
		"#FFFFFF"
	],
	// 7. Vibrant Mix: Pure basic colors, easiest to see
	vibrant_mix: [
		"#0000FF",
		"#00FFFF",
		"#00FF00",
		"#DDDD00",
		"#FFFF00",
		"#FFAA00",
		"#FF0000",
		"#FF00FF"
	],
	// 8. Enchanted Forest: Added bright silver and deep purple
	enchanted_forest_adventure: [
		"#443311",
		"#8B4513",
		"#4B0082",
		"#0000FF",
		"#004400",
		"#AAAA00",
		"#000000",
		"#EEEEEE"
	],
	// 9. Fiery Summer: Contrast between Dark Blue and Bright Yellow
	fiery_hot_summer: [
		"#330000",
		"#AA0000",
		"#FF0000",
		"#FF5500",
		"#FFAA00",
		"#FFFF00",
		"#FFFFFF",
		"#001133"
	],
	// 10. Rosy Golden: Added Teal and White to break up the warm tones
	rosy_golden_delight: [
		"#550088",
		"#224455",
		"#00FF99",
		"#FFD700",
		"#FF8800",
		"#990000",
		"#FF66AA",
		"#FFFFFF"
	],
	// 11. Sunset Citrus: Replaced "Beige on Beige" with Black/Brown/White
	sunset_citrus_delight: [
		"#FFFFFF",
		"#FF9900",
		"#FFEE00",
		"#CCCC99",
		"#888844",
		"#445522",
		"#000000",
		"#663311"
	],
	// 12. Vibrant Oasis: Neon colors on dark background
	vibrant_earthy_oasis: [
		"#FF0055",
		"#FF7755",
		"#FFFF00",
		"#00FF66",
		"#00AAFF",
		"#000066",
		"#666666",
		"#000000"
	],
	// 13. Dark Stormy: Replaced gradient greys with Red/Blue/White accents
	dark_stormy_skyline: [
		"#FFFFFF",
		"#CCCCCC",
		"#888888",
		"#444444",
		"#000000",
		"#552200",
		"#990000",
		"#000099"
	],
	// 14. Summer Sunset: Added Cyan and Dark Blue
	summer_sunset_palette: [
		"#002244",
		"#00EEEE",
		"#88FF88",
		"#EEAA55",
		"#FF3300",
		"#660000",
		"#FFFFFF",
		"#444444"
	],
	// 15. Golden Magic: Purple vs Yellow contrast
	golden_summer_magic: [
		"#FFFF00",
		"#FF9900",
		"#CC1155",
		"#660066",
		"#330066",
		"#000088",
		"#000000",
		"#FFFFFF"
	],
	// 16. Spectrum: Full rainbow spread
	summer_sunset_spectrum: [
		"#FF0088",
		"#FF4400",
		"#FFCC00",
		"#00CC00",
		"#00FFFF",
		"#0000FF",
		"#111166",
		"#000000"
	],
	// 17. Turquoise: Added White and Dark Navy
	turquoise_dreamland: [
		"#66FFCC",
		"#00FFFF",
		"#3399FF",
		"#0000FF",
		"#000066",
		"#FFFFFF",
		"#006666",
		"#111144"
	],
	// 18. Blue Lagoon: Added White
	blue_lagoon_gradients: [
		"#FFFFFF",
		"#88CCFF",
		"#00AAFF",
		"#2266FF",
		"#0000FF",
		"#000066",
		"#00FFFF",
		"#44FFCC"
	],
	// 19. Golden Sky: Added Black and Deep Blue
	golden_sky_symphony: [
		"#88CCFF",
		"#2288FF",
		"#000088",
		"#FFFFFF",
		"#FFFF00",
		"#FFCC00",
		"#FF8800",
		"#000000"
	],
	// 20. Earthy Neutral: FIXED (Was impossible). Now Black, White, Grey, Brown, Rust.
	earthy_neutral_tones: [
		"#663311",
		"#CC6611",
		"#FF9944",
		"#DDBB88",
		"#FFFFEE",
		"#FFFFFF",
		"#888888",
		"#000000"
	],
	// 21. Dark Gray: Added White and Black for edges
	dark_gray_mystery: [
		"#FFFFFF",
		"#DDDDDD",
		"#AAAAAA",
		"#777777",
		"#555555",
		"#333333",
		"#111111",
		"#000000"
	],
	// 22. Golden Desert: Added Green and White
	golden_desert_oasis: [
		"#445522",
		"#AAAA55",
		"#FFEE88",
		"#FFCC00",
		"#FF8800",
		"#AA4411",
		"#663311",
		"#FFFFFF"
	],
	// 23. Electric Rainbow: Max saturation
	electric_rainbow_dreams: [
		"#00FFFF",
		"#00FF00",
		"#FFFF00",
		"#FF00FF",
		"#8800CC",
		"#440088",
		"#0000FF",
		"#FFFFFF"
	],
	// 24. Summer Garden: Standard distinct colors
	vibrant_summer_garden: [
		"#FF0000",
		"#FF8800",
		"#FFFF00",
		"#00FF00",
		"#00FFFF",
		"#0000FF",
		"#8800AA",
		"#FFFFFF"
	],
	// 25. Sunflower: FIXED (Was impossible). Added Dark Green, Brown, Black.
	sunflower_meadow_bliss: [
		"#666600",
		"#FFCC00",
		"#FFFF00",
		"#FFFFCC",
		"#FFFFFF",
		"#000000",
		"#663311",
		"#004400"
	],
	// 26. Nautical: Blue scale with White/Black/Grey
	nautical_blue_journey: [
		"#000066",
		"#0000FF",
		"#00AAFF",
		"#88CCFF",
		"#DDFFFF",
		"#FFFFFF",
		"#666666",
		"#000000"
	],
	// 27. Neon Pop: Standard neon
	neon_pop_candy: [
		"#FF0088",
		"#FF66AA",
		"#8800CC",
		"#FFFF00",
		"#FF4400",
		"#2288FF",
		"#00FFFF",
		"#FFFFFF"
	],
	// 28. Cherry Blossom: Red/Pink scale with Black/White
	cherry_blossom_delight: [
		"#220000",
		"#660000",
		"#AA0000",
		"#FF0000",
		"#FF5533",
		"#FFFFFF",
		"#000000",
		"#FFBBDD"
	],
	// 29. Warm Autumn: Fixed similarities
	warm_autumn_glow: [
		"#445522",
		"#88AA88",
		"#FFEE88",
		"#FFCC00",
		"#FF8800",
		"#AA4411",
		"#663311",
		"#000000"
	],
	// 30. Pastel Party: Added Grey and White
	pastel_garden_party: [
		"#88BB88",
		"#FF7777",
		"#FFCC99",
		"#FFFFCC",
		"#99CCFF",
		"#FFFFFF",
		"#EEDDFF",
		"#AAAAAA"
	],
	// 31. Fiesta: Bright mixed
	vibrant_summer_fiesta: [
		"#CC0033",
		"#00FFFF",
		"#FF5599",
		"#33CC33",
		"#8866CC",
		"#FF3300",
		"#006666",
		"#FFCC00"
	],
	// 32. Summer Fun: Distinct
	summer_fun_colors: [
		"#001133",
		"#2288FF",
		"#228855",
		"#66FFCC",
		"#FFCC00",
		"#FF3300",
		"#CC0033",
		"#FFFFFF"
	],
	// 33. Whimsical: Pastels + White
	whimsical_dreamy_hues: [
		"#CCFFFF",
		"#88CCFF",
		"#FFBBDD",
		"#FF6699",
		"#FFFFCC",
		"#88FF88",
		"#AAFFEE",
		"#FFFFFF"
	],
	// 34. Rainforest: Dark green/blue vs Bright orange
	vibrant_earthy_rainforest: [
		"#224444",
		"#2288FF",
		"#00FF88",
		"#228855",
		"#FFCC00",
		"#FF8800",
		"#FF3300",
		"#000000"
	],
	// 35. Twilight: Purple/Yellow contrast
	enchanted_twilight: [
		"#330066",
		"#6600AA",
		"#8866CC",
		"#FFFFFF",
		"#000000",
		"#660066",
		"#AAFF00",
		"#FFFF00"
	],
	// 36. Rainbow Delight: Primary
	vibrant_rainbow_delight: [
		"#FF0000",
		"#FF8800",
		"#FFFF00",
		"#2288FF",
		"#330066",
		"#00FFFF",
		"#00FF00",
		"#FF0088"
	],
	// 37. Pastel Escape: Greens scale
	pastel_garden_escape: [
		"#EEFFEE",
		"#88FF88",
		"#00CC00",
		"#006600",
		"#004400",
		"#228855",
		"#00FF88",
		"#000000"
	],
	// 38. Autumn Spice: Browns
	autumn_spice_delight: [
		"#331111",
		"#883311",
		"#CC5511",
		"#FF9944",
		"#CC9900",
		"#AA9944",
		"#445522",
		"#000000"
	],
	// 39. Mauve Blush: Purple/Peach
	earthy_mauve_blush: [
		"#224444",
		"#333366",
		"#6600AA",
		"#CC44CC",
		"#FF4488",
		"#FFAA66",
		"#FFCCAA",
		"#FFFFFF"
	],
	// 40. Vintage: Muted but distinct
	vintage_summer_vibes: [
		"#FFEECC",
		"#CC8844",
		"#AA3333",
		"#663311",
		"#224444",
		"#667788",
		"#999999",
		"#EEEE88"
	],
	// 41. Cozy Neutral: FIXED (Was impossible). Now clearly distinct greys/browns.
	cozy_neutral_haven: [
		"#EEEEEE",
		"#EEEE88",
		"#CCAA66",
		"#AA6666",
		"#663311",
		"#FFFFFF",
		"#888888",
		"#CC6611"
	],
	// 42. Mystic: Dark vs Light
	mystic_earth_tones: [
		"#000000",
		"#224444",
		"#660066",
		"#CC0033",
		"#FF6666",
		"#FF8800",
		"#FFCC00",
		"#FFFFCC"
	],
	// 43. Fiery Autumn: Dark Red/Green vs White
	fiery_autumn_sunset: [
		"#222222",
		"#660000",
		"#CC5511",
		"#CC9900",
		"#FFEE88",
		"#FFFFFF",
		"#008888",
		"#004400"
	]
};

const THEME_NAMES = {
	earthy_ocean_tones: "Earthy Ocean Tones",
	lush_green_forest: "Lush Green Forest",
	cozy_autumn_glow: "Cozy Autumn Glow",
	fiery_citrus_green: "Fiery Citrus Green",
	tropical_sunset_paradise_mix: "Tropical Sunset (Mix)",
	tropical_sunset_paradise_pink: "Tropical Sunset (Pink)",
	vibrant_mix: "Vibrant Mix",
	enchanted_forest_adventure: "Enchanted Forest",
	fiery_hot_summer: "Fiery Hot Summer",
	rosy_golden_delight: "Rosy Golden Delight",
	sunset_citrus_delight: "Sunset Citrus Delight",
	vibrant_earthy_oasis: "Vibrant Earthy Oasis",
	dark_stormy_skyline: "Dark Stormy Skyline",
	summer_sunset_palette: "Summer Sunset Palette",
	golden_summer_magic: "Golden Summer Magic",
	summer_sunset_spectrum: "Summer Sunset Spectrum",
	turquoise_dreamland: "Turquoise Dreamland",
	blue_lagoon_gradients: "Blue Lagoon Gradients",
	golden_sky_symphony: "Golden Sky Symphony",
	earthy_neutral_tones: "Earthy Neutral Tones",
	dark_gray_mystery: "Dark Gray Mystery",
	golden_desert_oasis: "Golden Desert Oasis",
	electric_rainbow_dreams: "Electric Rainbow Dreams",
	vibrant_summer_garden: "Vibrant Summer Garden",
	sunflower_meadow_bliss: "Sunflower Meadow Bliss",
	nautical_blue_journey: "Nautical Blue Journey",
	neon_pop_candy: "Neon Pop Candy",
	cherry_blossom_delight: "Cherry Blossom Delight",
	warm_autumn_glow: "Warm Autumn Glow",
	pastel_garden_party: "Pastel Garden Party",
	vibrant_summer_fiesta: "Vibrant Summer Fiesta",
	summer_fun_colors: "Summer Fun Colors",
	whimsical_dreamy_hues: "Whimsical Dreamy Hues",
	vibrant_earthy_rainforest: "Vibrant Earthy Rainforest",
	enchanted_twilight: "Enchanted Twilight",
	vibrant_rainbow_delight: "Vibrant Rainbow Delight",
	pastel_garden_escape: "Pastel Garden Escape",
	autumn_spice_delight: "Autumn Spice Delight",
	earthy_mauve_blush: "Earthy Mauve Blush",
	vintage_summer_vibes: "Vintage Summer Vibes",
	cozy_neutral_haven: "Cozy Neutral Haven",
	mystic_earth_tones: "Mystic Earth Tones",
	fiery_autumn_sunset: "Fiery Autumn Sunset"
};

function hexPalettesToNumeric(palettes) {
	const result = {};
	for (const key in palettes) {
		result[key] = palettes[key].map((col) => parseInt(col.replace("#", "0x")));
	}
	return result;
}

const PALETTES = hexPalettesToNumeric(PALETTES_HEX);

function luminance(hex) {
	const n = parseInt(hex.slice(1), 16);
	const r = (n >> 16) & 255;
	const g = (n >> 8) & 255;
	const b = n & 255;
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function darker(hex) {
	const n = parseInt(hex.slice(1), 16);
	let r = (n >> 16) & 255;
	let g = (n >> 8) & 255;
	let b = n & 255;
	r = Math.floor(r * 0.6);
	g = Math.floor(g * 0.6);
	b = Math.floor(b * 0.6);
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function pickSound(palette) {
	const avg = palette.map(luminance).reduce((a, b) => a + b, 0) / palette.length;

	if (avg < 40) return "bitcrush"; // very dark, gritty
	if (avg < 70) return "square"; // dark, punchy
	if (avg < 100) return "sawtooth"; // warm-mid aggressive
	if (avg < 130) return "triangle"; // balanced soft edge
	if (avg < 160) return "sine"; // clean tone
	if (avg < 190) return "chorus"; // bright with movement
	if (avg < 220) return "bells"; // sparkling high
	return "airpad"; // ultra bright airy
}

function buildTheme(palette) {
	const sorted = [...palette].sort((a, b) => darker(a) - luminance(b));
	const bgA = sorted[0];
	const bgB = sorted[1];
	const panel = bgB;
	const border = sorted[sorted.length - 1];
	const text = luminance(bgA) < 150 ? "#fff" : "#111";
	const sound = pickSound(palette);
	const btns = palette.slice(0, 8).map((c) => ({ t: c, b: darker(c) }));
	return { bgA, bgB, sound, panel, border, text, btns };
}

const THEME_UI = Object.fromEntries(
	Object.entries(PALETTES_HEX).map(([name, palette]) => [
		name,
		buildTheme(palette)
	])
);

// Placeholder, set in init
let currentPalette = PALETTES.tropical_sunset_paradise_mix,
	scene,
	camera,
	renderer,
	raycaster,
	pmremGenerator,
	mouse = new THREE.Vector2(),
	grid = [],
	clusters = [],
	activeCluster = null,
	isAnimating = !1,
	score = 0,
	level = 1,
	xp = 0,
	comboCounter = 0,
	comboTarget = 30,
	spawnXionNext = !1,
	dummyPlane,
	selectorMesh,
	particles = [],
	shakeIntensity = 0,
	baseCameraPos = new THREE.Vector3(0, 0, 0);
const PARTICLE_GEO = new THREE.PlaneGeometry(0.12, 0.12),
	GRID_COLS = 7,
	GRID_ROWS = 5;
let bgMesh,
	hintInterval = null;
let HEX_GEO, MAT_GEM, MAT_XION, EDGE_GEO;

const pc = document.getElementById("palette-container");
for (const [k, n] of Object.entries(THEME_NAMES)) {
	const b = document.createElement("button");
	b.className = "pal-btn";
	b.innerText = n;
	const t = THEME_UI[k];
	b.style.background = `linear-gradient(135deg, ${t.btns[0].t}, ${t.btns[1].t})`;
	if (k === "pastel" || k === "candy") {
		b.style.color = "#333";
		b.style.textShadow = "none";
	}
	b.onclick = () => {
		setPalette(k);
		SoundEngine.playClick();
		document.getElementById("modal-colors").close();
	};
	pc.appendChild(b);
}

window.init = function () {
	const c = document.getElementById("game-container");
	c.innerHTML = "";
	scene = new THREE.Scene();

	HEX_GEO = new THREE.CylinderGeometry(0.95, 0.95, 0.3, 6).rotateX(Math.PI / 2);
	EDGE_GEO = new THREE.EdgesGeometry(HEX_GEO); // Create edges for outlines

	// MATTE MATERIAL (Non-shiny)
	MAT_GEM = new THREE.MeshStandardMaterial({
		roughness: 0.8, // Matte, prevents white reflections
		metalness: 0.0,
		emissiveIntensity: 0.6 // Moderate glow, preserves color
	});
	MAT_XION = new THREE.MeshStandardMaterial({
		color: 0xffffff,
		roughness: 0.4,
		metalness: 0.8,
		emissive: 0xffffff,
		emissiveIntensity: 0.8
	});

	const bgG = new THREE.PlaneGeometry(50, 50);
	const bgM = new THREE.ShaderMaterial({
		vertexShader: BG_VERT,
		fragmentShader: BG_FRAG,
		uniforms: {
			uTime: { value: 0 },
			uColorA: { value: new THREE.Color(0x000000) },
			uColorB: { value: new THREE.Color(0x000000) }
		},
		depthWrite: !1
	});
	bgMesh = new THREE.Mesh(bgG, bgM);
	bgMesh.position.z = -10;
	scene.add(bgMesh);

	camera = new THREE.PerspectiveCamera(
		45,
		c.clientWidth / c.clientHeight,
		0.1,
		100
	);
	renderer = new THREE.WebGLRenderer({ antialias: !0, alpha: !0 });
	renderer.setSize(c.clientWidth, c.clientHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.shadowMap.enabled = !0;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.0;
	c.appendChild(renderer.domElement);

	pmremGenerator = new THREE.PMREMGenerator(renderer);
	scene.environment = pmremGenerator.fromScene(
		new RoomEnvironment(),
		0.04
	).texture;

	raycaster = new THREE.Raycaster();
	dummyPlane = new THREE.Mesh(
		new THREE.PlaneGeometry(200, 200),
		new THREE.MeshBasicMaterial({ visible: !1 })
	);
	scene.add(dummyPlane);

	window.addEventListener("pointermove", onPointerMove);
	window.addEventListener("pointerdown", onPointerDown);
	window.addEventListener("resize", onResize);
	document.body.oncontextmenu = () => !1;

	// RANDOM PALETTE
	const keys = Object.keys(PALETTES_HEX);
	const randomKey = keys[Math.floor(Math.random() * keys.length)];
	setPalette(randomKey);

	startLevel(!1);
	fitCamera(c.clientWidth, c.clientHeight);
	animate();
	setTimeout(onResize, 100);
};

window.startLevel = function (k) {
	if (grid)
		grid.forEach((r) =>
			r.forEach((c) => {
				if (c.mesh) {
					scene.remove(c.mesh);
					if (c.mesh.material && c.mesh.material.clone) c.mesh.material.dispose();
				}
			})
		);
	particles.forEach((p) => {
		scene.remove(p.mesh);
		if (p.mesh.material) p.mesh.material.dispose();
	});
	particles = [];
	grid = [];
	clusters = [];
	activeCluster = null;
	if (!k) {
		score = 0;
		level = 1;
	}
	xp = 0;
	comboCounter = 0;
	isAnimating = !1;
	spawnXionNext = !1;
	setNextComboTarget();
	createSelector();
	createGridSafe();
	updateUI();
};

window.resetGame = () => {
	SoundEngine.playClick();
	startLevel(!1);
};
window.nextLevel = () => {
	SoundEngine.playClick();
	document.getElementById("game-over-modal").close();
	startLevel(!0);
};
window.toggleSound = () => {
	const e = SoundEngine.toggle();
	document.getElementById("icon-sound").innerText = e
		? "volume_up"
		: "volume_off";
	SoundEngine.playClick();
};

window.setPalette = function (k) {
	if (PALETTES[k]) {
		currentPalette = PALETTES[k];
		grid.forEach((r) => r.forEach((c) => updateVisuals([c])));
		const t = THEME_UI[k];
		if (t) {
			const s = document.documentElement.style;
			s.setProperty("--c-panel", t.panel);
			s.setProperty("--c-panel-border", t.border);
			s.setProperty("--c-text-main", t.text);
			s.setProperty(
				"--c-text-btn",
				k.includes("pastel") || k.includes("candy") ? "#333" : "#fff"
			);
			for (let i = 0; i < 8; i++) {
				s.setProperty(`--btn-${i + 1}-top`, t.btns[i].t);
				s.setProperty(`--btn-${i + 1}-bot`, t.btns[i].b);
				s.setProperty(
					`--btn-${i + 1}-shadow`,
					new THREE.Color(t.btns[i].b).multiplyScalar(0.7).getStyle()
				);
			}
			if (bgMesh) {
				tween(
					bgMesh.material.uniforms.uColorA.value,
					new THREE.Color(t.bgA),
					500,
					0,
					(x) => x
				);
				tween(
					bgMesh.material.uniforms.uColorB.value,
					new THREE.Color(t.bgB),
					500,
					0,
					(x) => x
				);
			}
			SoundEngine.setWaveform(t.sound);
		}
	}
};

window.shareTwitter = function () {
	SoundEngine.playClick();
	const shareUrl = "https://codepen.io/Julibe/pen/GgZGmqb";
	const viaUser = "Julibe";
	const messages = [
		"Twisting hexes and blowing minds! 🚀",
		"Six sides. Infinite possibilities. 🧠✨",
		"Forget square grids. Hex is key. #Hexplosion 🎨🔥",
		"Hex logic hits different. 🚨🧩",
		"Sharpen your mind one hex at a time. ⚡",
		"The grid just evolved. Welcome to the hex zone. 🔷",
		"When geometry becomes pure art. 🎛️✨",
		"Hex moves. Big brain energy. 🧠💥",
		"Your next obsession has six sides. 💫",
		"Tactical. Clean. Addictive. Hex mastery unlocked. 🔓"
	];
	const text = messages[Math.floor(Math.random() * messages.length)];
	const hashtags =
		"WebGL,ThreeJS,HexGrid,GameDev,BrainPuzzle,IndieDev,LogicGame";
	window.open(
		`https://twitter.com/intent/tweet?text=${encodeURIComponent(
			text
		)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(
			hashtags
		)}&via=${encodeURIComponent(viaUser)}`,
		"_blank"
	);
};

window.hint = () => {
	SoundEngine.playClick();
	if (hintInterval) return;
	if (clusters.length) {
		const r = Math.floor(Math.random() * clusters.length);
		activeCluster = clusters[r];
		updateSelector();
		hintInterval = setInterval(() => {
			selectorMesh.visible = !selectorMesh.visible;
		}, 100);
		setTimeout(() => {
			clearInterval(hintInterval);
			hintInterval = null;
			selectorMesh.visible = !0;
			if (activeCluster === clusters[r]) activeCluster = null;
			updateSelector();
		}, 800);
	}
};

function fitCamera(w, h) {
	const r3 = Math.sqrt(3),
		hw = r3,
		hh = 1.5,
		asp = w / h;
	let d;
	if (asp > (GRID_COLS * hw * 1.1) / (GRID_ROWS * hh * 1.1))
		d = (GRID_ROWS * hh * 1.1) / 2 / Math.tan((Math.PI * camera.fov) / 360);
	else
		d = (GRID_COLS * hw * 1.1) / 2 / Math.tan((Math.PI * camera.fov) / 360) / asp;
	baseCameraPos.set(0, 0.5, d + 2);
	camera.position.copy(baseCameraPos);
}

function setNextComboTarget() {
	comboTarget = Math.floor(Math.random() * 16) + 15;
	if (comboCounter > comboTarget) comboCounter = comboTarget;
}

function createGridSafe() {
	const r3 = Math.sqrt(3),
		w = r3,
		h = 1.5,
		sx = -((GRID_COLS - 1) * w) / 2,
		sy = ((GRID_ROWS - 1) * h) / 2;
	for (let r = 0; r < GRID_ROWS; r++) {
		let row = [];
		for (let c = 0; c < GRID_COLS; c++) {
			let f = new Set(),
				odd = r % 2 !== 0;
			if (c > 0) f.add(row[c - 1].type);
			if (r > 0) {
				const pr = grid[r - 1];
				let tl = odd ? c : c - 1,
					tr = odd ? c + 1 : c;
				if (tl >= 0 && tl < GRID_COLS) f.add(pr[tl].type);
				if (tr >= 0 && tr < GRID_COLS) f.add(pr[tr].type);
			}
			let t;
			do {
				t = Math.floor(Math.random() * currentPalette.length);
			} while (f.has(t));
			const m = createMesh(t, !1);
			m.position.set(sx + c * w + (odd ? w / 2 : 0), sy - r * h, 0);
			scene.add(m);
			row.push({
				r,
				c,
				type: t,
				mesh: m,
				wx: m.position.x,
				wy: m.position.y,
				isXion: !1
			});
		}
		grid.push(row);
	}
	calcClusters();
}

function createMesh(t, x) {
	let m = x ? MAT_XION.clone() : MAT_GEM.clone();
	if (!x) {
		m.color.setHex(currentPalette[t]);
		m.emissive.setHex(currentPalette[t]);
	}
	const mesh = new THREE.Mesh(HEX_GEO, m);
	mesh.castShadow = !0;
	mesh.receiveShadow = !0;

	// --- ADD BLACK OUTLINE TO SEPARATE COLORS ---
	if (!x) {
		const line = new THREE.LineSegments(
			EDGE_GEO,
			new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 })
		);
		// Slightly scale up line to prevent Z-fighting
		line.scale.set(1.01, 1.01, 1.01);
		mesh.add(line);
	}
	// ---------------------------------------------

	if (x) {
		const c = new THREE.Mesh(
			new THREE.IcosahedronGeometry(0.4, 1),
			new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: !0 })
		);
		c.position.z = 0.4;
		mesh.add(c);
		const l = new THREE.PointLight(0xffffff, 1, 3);
		l.position.z = 1;
		mesh.add(l);
	}
	return mesh;
}

function calcClusters() {
	clusters = [];
	const g = (r, c) =>
		r >= 0 && r < GRID_ROWS && c >= 0 && c < GRID_COLS ? grid[r][c] : null;
	for (let r = 0; r < GRID_ROWS; r++) {
		for (let c = 0; c < GRID_COLS; c++) {
			const top = g(r, c);
			if (!top) continue;
			const odd = r % 2 !== 0,
				bl = g(r + 1, odd ? c : c - 1),
				br = g(r + 1, odd ? c + 1 : c);
			if (bl && br)
				clusters.push({
					x: (top.wx + bl.wx + br.wx) / 3,
					y: (top.wy + bl.wy + br.wy) / 3,
					cells: [top, br, bl]
				});
		}
	}
}

function createSelector() {
	if (selectorMesh) scene.remove(selectorMesh);
	const s = 1.25,
		g = new THREE.RingGeometry(s * 0.8, s * 0.85, 32),
		m = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			transparent: !0,
			opacity: 0,
			side: 2
		});
	selectorMesh = new THREE.Group();
	selectorMesh.add(new THREE.Mesh(g, m));
	const gl = new THREE.Mesh(
		new THREE.CircleGeometry(s, 32),
		new THREE.MeshBasicMaterial({
			color: 0xffffff,
			transparent: !0,
			opacity: 0.15
		})
	);
	gl.position.z = -0.1;
	selectorMesh.add(gl);
	scene.add(selectorMesh);
}

function onPointerMove(e) {
	if (e.target.closest("#bottom-dashboard") || e.target.closest("dialog"))
		return;
	const r = renderer.domElement.getBoundingClientRect();
	mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
	mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
	if (isAnimating) return;
	raycaster.setFromCamera(mouse, camera);
	const i = raycaster.intersectObject(dummyPlane);
	if (i.length > 0) {
		const p = i[0].point;
		let cl = null,
			md = 0.8;
		for (const c of clusters) {
			const d = Math.hypot(p.x - c.x, p.y - c.y);
			if (d < md) {
				md = d;
				cl = c;
			}
		}
		if (cl !== activeCluster) {
			activeCluster = cl;
			updateSelector();
		}
	}
}

function onPointerDown(e) {
	SoundEngine.init();
	if (
		isAnimating ||
		!activeCluster ||
		e.target.closest("#bottom-dashboard") ||
		e.target.closest("dialog")
	)
		return;
	rotateCluster(activeCluster, e.button === 0);
}

function updateSelector() {
	if (activeCluster) {
		selectorMesh.position.set(activeCluster.x, activeCluster.y, 0.5);
		selectorMesh.children[0].material.opacity = 1;
		selectorMesh.children[1].material.opacity = 0.2;
		document.body.style.cursor = "pointer";
	} else {
		selectorMesh.children[0].material.opacity = 0;
		selectorMesh.children[1].material.opacity = 0;
		document.body.style.cursor = "default";
	}
}

function rotateCluster(cl, cw) {
	isAnimating = !0;
	selectorMesh.children[0].material.opacity = 0.3;
	SoundEngine.playRotate();
	const p = new THREE.Group();
	p.position.set(cl.x, cl.y, 0);
	scene.add(p);
	cl.cells.forEach((c) => p.attach(c.mesh));
	const ang = cw ? (-Math.PI * 2) / 3 : (Math.PI * 2) / 3;
	tween(p.rotation, { z: ang }, 220, 0, easeBackOut, () => {
		cl.cells.forEach((c) => {
			scene.attach(c.mesh);
			c.mesh.position.set(c.wx, c.wy, 0);
			c.mesh.rotation.set(0, 0, 0);
		});
		scene.remove(p);
		const [c0, c1, c2] = cl.cells;
		const pr = [
			{ t: c0.type, b: c0.isXion },
			{ t: c1.type, b: c1.isXion },
			{ t: c2.type, b: c2.isXion }
		];
		if (cw) {
			ap(c1, pr[0]);
			ap(c2, pr[1]);
			ap(c0, pr[2]);
		} else {
			ap(c2, pr[0]);
			ap(c0, pr[1]);
			ap(c1, pr[2]);
		}
		updateVisuals(cl.cells);
		resolveMatches(!0);
	});
}

function ap(c, p) {
	c.type = p.t;
	c.isXion = p.b;
}

function updateVisuals(cs) {
	cs.forEach((c) => {
		// Clear children but keep outline if it exists?
		// Simpler to just clear all and rebuild including outline
		while (c.mesh.children.length) c.mesh.remove(c.mesh.children[0]);

		if (c.isXion) {
			c.mesh.material = MAT_XION.clone();
			const core = new THREE.Mesh(
				new THREE.IcosahedronGeometry(0.4, 1),
				new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: !0 })
			);
			core.position.z = 0.4;
			c.mesh.add(core);
			const l = new THREE.PointLight(0xffffff, 1, 3);
			l.position.z = 1;
			c.mesh.add(l);
		} else {
			c.mesh.material = MAT_GEM.clone();
			const col = currentPalette[c.type];
			c.mesh.material.color.setHex(col);
			c.mesh.material.emissive.setHex(col); // Emit own color

			// Re-add outline
			const line = new THREE.LineSegments(
				EDGE_GEO,
				new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 })
			);
			line.scale.set(1.01, 1.01, 1.01);
			c.mesh.add(line);
		}
	});
}

function resolveMatches(aw) {
	let vis = new Set(),
		mats = [];
	const gN = (r, c) => {
		const o = r % 2 !== 0,
			os = [
				[0, -1],
				[0, 1],
				[-1, o ? 0 : -1],
				[-1, o ? 1 : 0],
				[1, o ? 0 : -1],
				[1, o ? 1 : 0]
			];
		return os
			.map((v) => ({ r: r + v[0], c: c + v[1] }))
			.filter((p) => p.r >= 0 && p.r < GRID_ROWS && p.c >= 0 && p.c < GRID_COLS);
	};
	for (let r = 0; r < GRID_ROWS; r++)
		for (let c = 0; c < GRID_COLS; c++) {
			const id = `${r},${c}`;
			if (vis.has(id)) continue;
			let t = grid[r][c].type;
			if (t === -1) continue;
			let q = [{ r, c }],
				gr = [];
			vis.add(id);
			gr.push({ r, c });
			let h = 0;
			while (h < gr.length) {
				let cur = gr[h++];
				gN(cur.r, cur.c).forEach((n) => {
					let nid = `${n.r},${n.c}`;
					if (
						!vis.has(nid) &&
						grid[n.r][n.c].type === t &&
						grid[n.r][n.c].type !== -1
					) {
						vis.add(nid);
						gr.push(n);
					}
				});
			}
			if (gr.length >= 3) mats = mats.concat(gr);
		}
	if (mats.length > 0) {
		isAnimating = !0;
		let dest = new Set(),
			xion = !1,
			wc = -1;
		mats.forEach((m) => {
			if (grid[m.r][m.c].isXion) {
				xion = !0;
				wc = grid[m.r][m.c].type;
			}
		});
		shakeIntensity = xion ? 1.5 : mats.length > 5 ? 0.8 : 0.4;
		if (xion) {
			for (let r = 0; r < GRID_ROWS; r++)
				for (let c = 0; c < GRID_COLS; c++)
					if (grid[r][c].type === wc) dest.add(`${r},${c}`);
			comboCounter = 0;
			setNextComboTarget();
		} else {
			mats.forEach((m) => dest.add(`${m.r},${m.c}`));
			if (aw) {
				comboCounter++;
				if (comboCounter >= comboTarget) {
					comboCounter = comboTarget;
					spawnXionNext = !0;
				}
				score += mats.length * 10;
				xp += 10;
				SoundEngine.playMatch();
				if (xp >= 100) {
					level++;
					xp -= 100;
					SoundEngine.playLevelUp();
					const lb = document.getElementById("level-display");
					lb.classList.remove("level-anim");
					void lb.offsetWidth;
					lb.classList.add("level-anim");

					// CHANGE PALETTE ON LEVEL UP
					const keys = Object.keys(PALETTES_HEX);
					const nextKey = keys[Math.floor(Math.random() * keys.length)];
					setPalette(nextKey);

					if (level % 5 === 0) {
						document.getElementById("final-score").innerText = score;
						document.getElementById("game-over-modal").showModal();
						isAnimating = !0;
						return;
					}
				}
			}
		}
		updateUI();
		const da = Array.from(dest).map((s) => {
			const [r, c] = s.split(",");
			return { r: +r, c: +c };
		});
		let dn = 0;
		da.forEach((p) => {
			const c = grid[p.r][p.c];
			spawnParticles(c.mesh.position, currentPalette[c.type]);
			tween(
				c.mesh.scale,
				{ x: 0.01, y: 0.01 },
				200,
				Math.random() * 100,
				easeInQuad,
				() => {
					c.mesh.visible = !1;
					dn++;
					if (dn === da.length) applyGravity(da);
				}
			);
		});
	} else {
		isAnimating = !1;
		updateSelector();
	}
}

function applyGravity(cl) {
	cl.forEach((p) => {
		grid[p.r][p.c].type = -1;
		grid[p.r][p.c].mesh.scale.set(1, 1, 1);
		grid[p.r][p.c].mesh.visible = !1;
	});
	for (let c = 0; c < GRID_COLS; c++) {
		let st = [];
		for (let r = 0; r < GRID_ROWS; r++)
			if (grid[r][c].type !== -1)
				st.push({ t: grid[r][c].type, b: grid[r][c].isXion });
		let mis = GRID_ROWS - st.length;
		for (let i = 0; i < mis; i++) {
			let f = -1;
			if (i === 0 && st.length > 0) f = st[0].t;
			let nt;
			do {
				nt = Math.floor(Math.random() * currentPalette.length);
			} while (nt === f);
			let isX = !1;
			if (spawnXionNext && i === mis - 1) {
				isX = !0;
				spawnXionNext = !1;
				updateUI();
			}
			st.unshift({ t: nt, b: isX });
		}
		for (let r = 0; r < GRID_ROWS; r++) {
			const cel = grid[r][c],
				d = st[r];
			cel.type = d.t;
			cel.isXion = d.b;
			cel.mesh.visible = !0;
			cel.mesh.scale.set(1, 1, 1);
			cel.mesh.rotation.set(0, 0, 0);
			updateVisuals([cel]);
			if (cl.some((x) => x.c === c && x.r >= r)) {
				cel.mesh.position.y = cel.wy + 6;
				tween(
					cel.mesh.position,
					{ y: cel.wy },
					500,
					Math.random() * 200,
					easeOutBounce
				);
			} else cel.mesh.position.y = cel.wy;
		}
	}
	setTimeout(() => resolveMatches(!0), 650);
}

function spawnParticles(p, c) {
	for (let i = 0; i < 12; i++) {
		const m = new THREE.Mesh(
			PARTICLE_GEO,
			new THREE.MeshBasicMaterial({ color: c, side: 2, transparent: !0 })
		);
		m.position.set(p.x, p.y, p.z + 0.5);
		const th = Math.random() * Math.PI * 2,
			sp = 0.05 + Math.random() * 0.1;
		scene.add(m);
		particles.push({
			mesh: m,
			vx: Math.cos(th) * sp,
			vy: Math.sin(th) * sp,
			vz: 0.1,
			life: 1
		});
	}
}

function updateUI() {
	document.getElementById("ui-level").innerText = level;
	document.getElementById("txt-score").innerText = xp + "%";
	document.getElementById("bar-score").style.width = Math.min(100, xp) + "%";
	const cp = Math.min(100, (comboCounter / comboTarget) * 100);
	document.getElementById("bar-charge").style.width = cp + "%";
}

let tweens = [];

function tween(o, p, d, dl, e, cb) {
	const s = {};
	for (let k in p)
		if (o[k] && o[k].clone) s[k] = o[k].clone();
		else s[k] = o[k];
	tweens.push({
		obj: o,
		props: p,
		start: s,
		startTime: Date.now() + dl,
		duration: d,
		easing: e || ((t) => t),
		onComplete: cb
	});
}

function updateTweens() {
	const n = Date.now();
	for (let i = tweens.length - 1; i >= 0; i--) {
		const t = tweens[i];
		if (n < t.startTime) continue;
		let p = (n - t.startTime) / t.duration;
		if (p >= 1) {
			for (let k in t.props)
				if (t.obj[k] && t.obj[k].copy) t.obj[k].copy(t.props[k]);
				else t.obj[k] = t.props[k];
			if (t.onComplete) t.onComplete();
			tweens.splice(i, 1);
		} else {
			const v = t.easing(p);
			for (let k in t.props) {
				if (typeof t.obj[k] === "number")
					t.obj[k] = t.start[k] + (t.props[k] - t.start[k]) * v;
				else if (t.obj[k] && t.obj[k].lerp)
					t.obj[k].copy(t.start[k]).lerp(t.props[k], v);
				else if (t.obj[k] && t.obj[k].isColor) {
					t.obj[k].r = t.start[k].r + (t.props[k].r - t.start[k].r) * v;
					t.obj[k].g = t.start[k].g + (t.props[k].g - t.start[k].g) * v;
					t.obj[k].b = t.start[k].b + (t.props[k].b - t.start[k].b) * v;
				}
			}
		}
	}
}
const easeBackOut = (x) =>
	1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2);
const easeOutBounce = (x) => {
	const n = 7.5625,
		d = 2.75;
	if (x < 1 / d) return n * x * x;
	else if (x < 2 / d) return n * (x -= 1.5 / d) * x + 0.75;
	else if (x < 2.5 / d) return n * (x -= 2.25 / d) * x + 0.9375;
	else return n * (x -= 2.625 / d) * x + 0.984375;
};
const easeInQuad = (x) => x * x;

function animate() {
	requestAnimationFrame(animate);
	updateTweens();
	if (bgMesh) bgMesh.material.uniforms.uTime.value += 0.02;
	if (shakeIntensity > 0) {
		camera.position.x =
			baseCameraPos.x + (Math.random() - 0.5) * 0.2 * shakeIntensity;
		camera.position.y =
			baseCameraPos.y + (Math.random() - 0.5) * 0.2 * shakeIntensity;
		shakeIntensity -= 0.05;
		if (shakeIntensity < 0) {
			shakeIntensity = 0;
			camera.position.copy(baseCameraPos);
		}
	}
	for (let i = particles.length - 1; i >= 0; i--) {
		const p = particles[i];
		p.life -= 0.02;
		p.mesh.position.add(new THREE.Vector3(p.vx, p.vy, p.vz));
		p.mesh.scale.setScalar(p.life);
		p.mesh.material.opacity = p.life;
		if (p.life <= 0) {
			scene.remove(p.mesh);
			if (p.mesh.material) p.mesh.material.dispose();
			particles.splice(i, 1);
		}
	}
	renderer.render(scene, camera);
	if (selectorMesh && selectorMesh.children[0].material.opacity > 0)
		selectorMesh.rotation.z += 0.005;
}

function onResize() {
	const c = document.getElementById("game-container");
	camera.aspect = c.clientWidth / c.clientHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(c.clientWidth, c.clientHeight);
	fitCamera(c.clientWidth, c.clientHeight);
}
window.onload = init;
