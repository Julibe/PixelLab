const debug = true;
console.clear();

const DOG_BASE_URL =
	"https://raw.githubusercontent.com/Julibe/Guau/master/public/images/dogs";

const dog_images = [
	`${DOG_BASE_URL}/akita.webp`,
	`${DOG_BASE_URL}/akita_black.webp`,
	`${DOG_BASE_URL}/alaskan_malamute.webp`,
	`${DOG_BASE_URL}/australian_shepherd.webp`,
	`${DOG_BASE_URL}/basenji.webp`,
	`${DOG_BASE_URL}/belgian_malinois.webp`,
	`${DOG_BASE_URL}/bernese_mountain.webp`,
	`${DOG_BASE_URL}/border_collie.webp`,
	`${DOG_BASE_URL}/border_collieup.webp`,
	`${DOG_BASE_URL}/brittany_spaniel.webp`,
	`${DOG_BASE_URL}/bullmastiff.webp`,
	`${DOG_BASE_URL}/chinese_crested.webp`,
	`${DOG_BASE_URL}/dante.webp`,
	`${DOG_BASE_URL}/french_bulldog.webp`,
	`${DOG_BASE_URL}/german_shepherd.webp`,
	`${DOG_BASE_URL}/greyhound.webp`,
	`${DOG_BASE_URL}/ibizan_hound.webp`,
	`${DOG_BASE_URL}/kelpie.webp`,
	`${DOG_BASE_URL}/labrador_retriever.webp`,
	`${DOG_BASE_URL}/lupe.webp`,
	`${DOG_BASE_URL}/norfolk_terrier.webp`,
	`${DOG_BASE_URL}/pekingese.webp`,
	`${DOG_BASE_URL}/pembroke_welsh_corgi.webp`,
	`${DOG_BASE_URL}/pomeranian.webp`,
	`${DOG_BASE_URL}/russell_terrier.webp`,
	`${DOG_BASE_URL}/sheepdog.webp`,
	`${DOG_BASE_URL}/wet_corgi.webp`,
	`${DOG_BASE_URL}/white_swiss_shepherd.webp`
];

/* Title: Theme Applier */
function applyTheme(color, text_color) {
	if (debug)
		console.log(`%c Theme Updated: ${color} | ${text_color}`, `color: ${color}`);
	document.documentElement.style.setProperty("--ui-theme", color);
	document.documentElement.style.setProperty("--ui-text", text_color);
}

/* Title: Custom Cursor initialization */
function initCursor() {
	if (debug) console.log("%c Init Cursor", "color: orange;");
	const cursor_dot = document.getElementById("cursor-dot");
	const cursor_outline = document.getElementById("cursor-outline");

	window.addEventListener("mousemove", (e) => {
		const pos_x = e.clientX;
		const pos_y = e.clientY;
		cursor_dot.style.left = `${pos_x}px`;
		cursor_dot.style.top = `${pos_y}px`;
		cursor_outline.animate(
			{
				left: `${pos_x}px`,
				top: `${pos_y}px`
			},
			{
				duration: 500,
				fill: "forwards"
			}
		);
	});

	document.querySelectorAll("a, button, .interactable").forEach((el) => {
		el.addEventListener("mouseenter", () =>
			document.body.classList.add("hovering")
		);
		el.addEventListener("mouseleave", () =>
			document.body.classList.remove("hovering")
		);
	});
}

/* Title: Background Particle Logic */
function initPawParticles() {
	if (debug) console.log("%c Init Particles", "color: lightblue;");
	const canvas = document.getElementById("bg-canvas");
	const ctx = canvas.getContext("2d");
	let w, h;
	const particles = [];
	const mouse = { x: -1000, y: -1000 };

	function resize() {
		w = window.innerWidth;
		h = window.innerHeight;
		canvas.width = w;
		canvas.height = h;
	}
	window.addEventListener("resize", resize);
	resize();
	window.addEventListener("mousemove", (e) => {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});

	const paw_path = new Path2D(
		"M39.041 36.843c2.054 3.234 3.022 4.951 3.022 6.742 0 3.537-2.627 5.252-6.166 5.252-1.56 0-2.567-.002-5.112-1.326 0 0-1.649-1.509-5.508-1.354-3.895-.154-5.545 1.373-5.545 1.373-2.545 1.323-3.516 1.309-5.074 1.309-3.539 0-6.168-1.713-6.168-5.252 0-1.791.971-3.506 3.024-6.742 0 0 3.881-6.445 7.244-9.477 2.43-2.188 5.973-2.18 5.973-2.18h1.093v-.001s3.698-.009 5.976 2.181c3.259 3.142 7.241 9.476 7.241 9.475zm-22.41-15.965c3.7 0 6.699-4.674 6.699-10.439S20.331 0 16.631 0 9.932 4.674 9.932 10.439s2.999 10.439 6.699 10.439zm-6.42 10.11c2.727-1.259 3.349-5.723 1.388-9.971s-5.761-6.672-8.488-5.414-3.348 5.723-1.388 9.971c1.961 4.248 5.761 6.671 8.488 5.414zm21.995-10.11c3.7 0 6.7-4.674 6.7-10.439S35.906 0 32.206 0s-6.699 4.674-6.699 10.439 2.999 10.439 6.699 10.439zm13.521-5.276c-2.728-1.259-6.527 1.165-8.488 5.414s-1.339 8.713 1.389 9.972c2.728 1.258 6.527-1.166 8.488-5.414s1.339-8.713-1.389-9.972z"
	);

	class P {
		constructor() {
			this.reset();
		}
		reset() {
			this.x = Math.random() * w;
			this.y = Math.random() * h;
			this.vx = (Math.random() - 0.5) * 1.5;
			this.vy = (Math.random() - 0.5) * 1.5;
			this.size = 0.8 + Math.random() * 1.0;
			this.opacity = 0.08 + Math.random() * 0.1;
		}
		update() {
			const dx = this.x - mouse.x;
			const dy = this.y - mouse.y;
			const dist = Math.sqrt(dx * dx + dy * dy);
			if (dist < 200) {
				const f = (200 - dist) / 200;
				const a = Math.atan2(dy, dx);
				this.vx += Math.cos(a) * f * 1.2;
				this.vy += Math.sin(a) * f * 1.2;
			}
			this.x += this.vx;
			this.y += this.vy;
			this.vx *= 0.99;
			this.vy *= 0.99;
			if (this.x < 0 || this.x > w) this.vx *= -1;
			if (this.y < 0 || this.y > h) this.vy *= -1;
		}
		draw() {
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.scale(this.size, this.size);
			ctx.globalAlpha = this.opacity;
			ctx.fillStyle = getComputedStyle(document.body).color;
			ctx.translate(-24, -24);
			ctx.fill(paw_path);
			ctx.restore();
		}
	}
	for (let i = 0; i < 15; i++) particles.push(new P());
	function loop() {
		ctx.clearRect(0, 0, w, h);
		particles.forEach((p) => {
			p.update();
			p.draw();
		});
		requestAnimationFrame(loop);
	}
	loop();
}

/* Title: Infinite Home Grid logic */
function initIntroGrid() {
	if (debug) console.log("%c Init Grid Marquee", "color: lightgreen;");
	const container = document.getElementById("grid-container");
	if (!container) return;
	container.innerHTML = "";
	const rows = 6;
	const cols = 120;
	for (let r = 0; r < rows; r++) {
		const line = document.createElement("div");
		line.className = "line";
		let last_rand_index = -1;
		for (let c = 0; c < cols; c++) {
			const item = document.createElement("div");
			item.className = "item";
			const img = document.createElement("img");

			/* Avoid consecutive identical images */
			let current_rand_index = Math.floor(Math.random() * dog_images.length);
			while (current_rand_index === last_rand_index) {
				current_rand_index = Math.floor(Math.random() * dog_images.length);
			}
			last_rand_index = current_rand_index;

			img.src = dog_images[current_rand_index];
			item.appendChild(img);
			line.appendChild(item);
		}
		container.appendChild(line);
	}
	const lines = container.querySelectorAll(".line");
	lines.forEach((line, i) => {
		const dir = i % 2 === 0 ? 1 : -1;
		gsap.set(line, { x: 0 });
		gsap.to(line, {
			x: () => dir * (line.scrollWidth / 3),
			duration: 145 + Math.random() * 150,
			ease: "none",
			repeat: -1
		});
	});
}

/* Title: Navigation system */
function initNavigation() {
	if (debug) console.log("%c Init Navigation System", "color: pink;");
	const vertical_slides = document.querySelectorAll("#main_scroll > section");

	// Vertical Nav Container
	const v_nav = document.createElement("div");
	v_nav.className = "vertical-nav";
	document.body.appendChild(v_nav);

	// 1. Setup Vertical Dots (Changed to Buttons)
	vertical_slides.forEach((s, i) => {
		const dot = document.createElement("button"); // Changed from div to button
		dot.className = "dot interactable magnetic-btn";
		dot.setAttribute("aria-label", `Scroll to section ${i + 1}`);
		dot.onclick = () => {
			if (debug) console.log(`Vertical nav click: ${i}`);
			s.scrollIntoView({ behavior: "smooth" });
		};
		v_nav.appendChild(dot);
	});

	// 2. Setup Horizontal Wrappers
	document.querySelectorAll(".horizontal-wrapper").forEach((wrapper) => {
		const slides = wrapper.querySelectorAll(".horizontal-slide");
		const container = wrapper.querySelector(".horizontal-scroll-snap");

		/* --- Changed: Use <nav> instead of <div> --- */
		const h_nav = document.createElement("nav");
		h_nav.className = "horizontal-nav";

		/* ------------------------------------------------ */
		/* --- 1. Create Previous Arrow (Start of Nav) --- */
		/* ------------------------------------------------ */
		const prevBtn = document.createElement("button");
		prevBtn.className = "nav-arrow prev interactable";
		prevBtn.innerHTML = "&#10094;";
		prevBtn.title = "Dig up the previous bone";
		prevBtn.setAttribute("aria-label", "Go to previous slide");
		prevBtn.onclick = () => {
			container.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
		};

		h_nav.appendChild(prevBtn);

		/* ------------------------------------------------ */
		/* --- 2. Create Dots (Middle of Nav)           --- */
		/* ------------------------------------------------ */
		slides.forEach((s, i) => {
			const dot = document.createElement("button"); // Changed from div to button
			dot.className = "dot interactable";
			dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
			dot.onclick = () => {
				if (debug) console.log(`Horizontal nav click: ${i}`);
				container.scrollTo({ left: i * window.innerWidth, behavior: "smooth" });
			};
			h_nav.appendChild(dot);
		});

		/* ------------------------------------------------ */
		/* --- 3. Create Next Arrow (End of Nav)        --- */
		/* ------------------------------------------------ */
		const nextBtn = document.createElement("button");
		nextBtn.className = "nav-arrow next interactable";
		nextBtn.innerHTML = "&#10095;";
		nextBtn.title = "Fetch the next item!";
		nextBtn.setAttribute("aria-label", "Go to next slide");
		nextBtn.onclick = () => {
			container.scrollBy({ left: window.innerWidth, behavior: "smooth" });
		};

		h_nav.appendChild(nextBtn);

		/* ------------------------------------------------ */
		/* --- 4. Append Nav & Visibility Logic         --- */
		/* ------------------------------------------------ */
		wrapper.appendChild(h_nav);

		const checkArrowVisibility = () => {
			if (!prevBtn || !nextBtn) return;
			const tolerance = 5;
			const currentScroll = container.scrollLeft;
			const maxScroll = container.scrollWidth - container.clientWidth;

			if (currentScroll <= tolerance) {
				prevBtn.style.opacity = "0";
				prevBtn.style.pointerEvents = "none";
			} else {
				prevBtn.style.opacity = "1";
				prevBtn.style.pointerEvents = "all";
			}

			if (currentScroll >= maxScroll - tolerance) {
				nextBtn.style.opacity = "0";
				nextBtn.style.pointerEvents = "none";
			} else {
				nextBtn.style.opacity = "1";
				nextBtn.style.pointerEvents = "all";
			}
		};

		checkArrowVisibility();

		container.addEventListener("scroll", () => {
			checkArrowVisibility();

			const idx = Math.round(container.scrollLeft / window.innerWidth);
			const current_slide = slides[idx];
			if (current_slide) {
				const color = current_slide.dataset.uiColor;
				const text = current_slide.dataset.uiTextColor;
				if (color && text) applyTheme(color, text);
			}
			h_nav
				.querySelectorAll(".dot")
				.forEach((d, i) => d.classList.toggle("active", i === idx));
		});
	});

	// 3. Intersection Observer
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					const target = e.target;
					let color, text;

					if (target.classList.contains("horizontal-wrapper")) {
						const container = target.querySelector(".horizontal-scroll-snap");
						const idx = Math.round(container.scrollLeft / window.innerWidth);
						const slides = target.querySelectorAll(".horizontal-slide");
						color = slides[idx]?.dataset.uiColor || target.dataset.uiColor;
						text = slides[idx]?.dataset.uiTextColor || target.dataset.uiTextColor;
					} else {
						color = target.dataset.uiColor;
						text = target.dataset.uiTextColor;
					}

					if (color && text) applyTheme(color, text);

					const idx = Array.from(vertical_slides).indexOf(target);
					if (idx !== -1)
						v_nav
							.querySelectorAll(".dot")
							.forEach((d, i) => d.classList.toggle("active", i === idx));

					gsap.to(
						target.querySelectorAll(
							"h1, p, .category-label, .excerpt, img, video, .pill-container"
						),
						{
							opacity: 1,
							y: 0,
							duration: 0.8,
							stagger: 0.1
						}
					);
				}
			});
		},
		{ threshold: 0.5 }
	);
	vertical_slides.forEach((s) => observer.observe(s));
}

/* Title: Magnetic Button effect */
function initMagneticButtons() {
	if (debug) console.log("%c Init Magnetic Buttons", "color: gold;");
	const magnetic_elements = document.querySelectorAll(".magnetic-btn");
	magnetic_elements.forEach((el) => {
		el.addEventListener("mousemove", (e) => {
			const rect = el.getBoundingClientRect();
			const pos_x = e.clientX - rect.left - rect.width / 2;
			const pos_y = e.clientY - rect.top - rect.height / 2;
			gsap.to(el, {
				x: pos_x * 0.4,
				y: pos_y * 0.4,
				duration: 0.3,
				ease: "power2.out"
			});
		});
		el.addEventListener("mouseleave", () => {
			gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
		});
	});
}

/* Title: Tilt Effect for emojis */
function initTiltEffect() {
	if (debug) console.log("%c Init Emoji Tilt Effect", "color: cyan;");
	const tilt_elements = document.querySelectorAll(".tilt-emoji");
	tilt_elements.forEach((el) => {
		el.addEventListener("mousemove", (e) => {
			const rect = el.getBoundingClientRect();
			const pos_x = e.clientX - rect.left;
			const pos_y = e.clientY - rect.top;
			const center_x = rect.width / 2;
			const center_y = rect.height / 2;
			const rotate_x = ((pos_y - center_y) / center_y) * -25;
			const rotate_y = ((pos_x - center_x) / center_x) * 25;
			el.style.transform = `perspective(1000px) rotateX(${rotate_x}deg) rotateY(${rotate_y}deg) scale(1.15)`;
		});
		el.addEventListener("mouseleave", () => {
			el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
		});
	});
}

function navigateHorizontal(btn, dir) {
	if (debug) console.log(`Horizontal Nav Clicked: ${dir}`);
	const container = btn
		.closest(".horizontal-wrapper")
		.querySelector(".horizontal-scroll-snap");
	container.scrollBy({ left: dir * window.innerWidth, behavior: "smooth" });
}

function openModal(t, d, i) {
	if (debug) console.log(`Modal Open: ${t}`);
	document.getElementById("m_title").innerHTML = t;
	document.getElementById("m_desc").innerHTML = d;
	document.getElementById("m_icon").innerHTML = i;
	document.getElementById("offeringsModal").classList.add("active");
}

function closeModal() {
	if (debug) console.log("Modal Closed");
	document.getElementById("offeringsModal").classList.remove("active");
}

function triggerConfetti() {
	if (debug) console.log("%c Explosion Triggered", "color: lime;");
	const canvas = document.getElementById("confetti-canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const parts = [];
	const emojis = ["🦴", "🐾", "❤️", "🐶", "🎾", "🍗", "✨"];
	for (let i = 0; i < 45; i++)
		parts.push({
			x: window.innerWidth / 2,
			y: window.innerHeight / 2,
			vx: (Math.random() - 0.5) * 25,
			vy: (Math.random() - 0.5) * 25,
			e: emojis[Math.floor(Math.random() * emojis.length)],
			l: 120
		});
	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		parts.forEach((p) => {
			p.x += p.vx;
			p.y += p.vy;
			p.vy += 0.45;
			p.l--;
			ctx.font = "32px Arial";
			ctx.fillText(p.e, p.x, p.y);
		});
		if (parts.some((p) => p.l > 0)) requestAnimationFrame(animate);
		else ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	animate();
}

window.onload = () => {
	try {
		initCursor();
		initPawParticles();
		initIntroGrid();
		initNavigation();
		initMagneticButtons();
		initTiltEffect();
	} catch (err) {
		console.error("App Init Error:", err);
	}
};

function shareTwitter() {
	const shareUrl = "https://codepen.io/Julibe/full/gbMvxmW/";
	const viaUser = "Julibe";

	const messages = [
		"Check out this pawsome experience!",
		"Smooth scrolling and happy dogs. What else do you need?",
		"Woof! This interactive website is a treat.",
		"Just explored the GUAU project by Julibe. 10/10 would bark again.",
		"Web design that wags its tail! Check it out."
	];

	const hashtagsList = [
		"WebDesign",
		"GSAP",
		"Frontend",
		"CreativeCoding",
		"UX",
		"DogLovers",
		"Interactive",
		"Julibe",
		"WebDev",
		"Pawesome"
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
