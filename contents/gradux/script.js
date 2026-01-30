const default_config = {
	theme: "light",
	nav_position: "left",
	nav_align: "start",
	socials_pos: "std",
	gallery_mode: "masonry",
	gallery_cols: 3,
	aspect_ratio: "auto",
	padding: 40,
	gap: 20,
	radius: 12
};
let config = {
	...default_config
};
let is_dark_mode = false;
let current_category = "portfolio";
let mouse_x = 0;
let mouse_y = 0;
let current_image_index = 0;
let gallery_images = [];

window.addEventListener("DOMContentLoaded", () => {
	loadConfig();
	applyConfig();
	loadCategory("portfolio", document.querySelector(".nav-links a.active"));
	document.addEventListener("click", (e) => {
		if (!e.target.closest(".dropdown")) {
			document
				.querySelectorAll(".dropdown")
				.forEach((d) => d.classList.remove("open"));
		}
		if (e.target.id === "lightbox") {
			closeLightbox();
		}
	});
	document.addEventListener("keydown", (e) => {
		if (!document.getElementById("lightbox").classList.contains("active")) return;
		if (e.key === "Escape") closeLightbox();
		if (e.key === "ArrowLeft") changeImage(-1);
		if (e.key === "ArrowRight") changeImage(1);
	});
	document.querySelector(".modal-overlay").addEventListener("click", (e) => {
		if (e.target.classList.contains("modal-overlay")) {
			closeModal();
		}
	});
	const gallery = document.getElementById("gallery");
	gallery.addEventListener("wheel", (evt) => {
		if (
			(config.gallery_mode === "horizontal" ||
				config.gallery_mode === "horizontal-grid") &&
			current_category !== "contact"
		) {
			evt.preventDefault();
			gallery.scrollLeft += evt.deltaY;
		}
	});
	initCustomCursor();
	updateScrollHint();
	document.addEventListener("mousemove", (e) => {
		mouse_x = e.clientX;
		mouse_y = e.clientY;
		const cursor = document.getElementById("cursor-effect");
		cursor.style.left = `${mouse_x}px`;
		cursor.style.top = `${mouse_y}px`;
		if (
			config.gallery_mode !== "horizontal" &&
			config.gallery_mode !== "horizontal-grid"
		) {
			const items = document.querySelectorAll(".gallery .item");
			items.forEach((item) => {
				const rect = item.getBoundingClientRect();
				const itemCenterX = rect.left + rect.width / 2;
				const itemCenterY = rect.top + rect.height / 2;
				const distanceX = mouse_x - itemCenterX;
				const distanceY = mouse_y - itemCenterY;
				const intensity = 0.02;
				const moveX = distanceX * intensity;
				const moveY = distanceY * intensity;
				item.style.transform = `translate(${moveX}px, ${moveY}px)`;
			});
		}
	});
	document.querySelectorAll("button, a, .item").forEach((el) => {
		el.addEventListener("mouseenter", () => {
			document.getElementById("cursor-effect").classList.add("hover");
		});
		el.addEventListener("mouseleave", () => {
			document.getElementById("cursor-effect").classList.remove("hover");
		});
	});
	gallery.addEventListener("scroll", updateScrollHint);
});

function loadConfig() {
	const saved = localStorage.getItem("gradux_config");
	if (saved) {
		config = {
			...default_config,
			...JSON.parse(saved)
		};
	}
}

function saveConfig() {
	localStorage.setItem("gradux_config", JSON.stringify(config));
}

function applyConfig() {
	is_dark_mode = config.theme === "dark";
	document.body.classList.toggle("dark-mode", is_dark_mode);
	const icon = document.querySelector("#btn-theme span");
	if (icon) icon.textContent = is_dark_mode ? "light_mode" : "dark_mode";
	setNavPosition(config.nav_position, false);
	setNavAlign(config.nav_align, false);
	const nav = document.getElementById("main-nav");
	nav.setAttribute("data-socials", config.socials_pos);
	const container = document.getElementById("app-container");
	if (
		container.getAttribute("data-nav") !== "top" &&
		container.getAttribute("data-nav") !== "bottom"
	) {
		nav.setAttribute("data-socials", config.socials_pos);
	}
	document.documentElement.style.setProperty(
		"--main-padding",
		config.padding + "px"
	);
	document.documentElement.style.setProperty("--gap", config.gap + "px");
	document.documentElement.style.setProperty("--radius", config.radius + "px");
	document.documentElement.style.setProperty(
		"--item-aspect",
		config.aspect_ratio
	);
	const inputPadding = document.getElementById("input-padding");
	if (inputPadding) inputPadding.value = config.padding;
	const inputGap = document.getElementById("input-gap");
	if (inputGap) inputGap.value = config.gap;
	const inputRadius = document.getElementById("input-radius");
	if (inputRadius) inputRadius.value = config.radius;
}

function loadCategory(cat, element) {
	current_category = cat;
	const transition = document.getElementById("page-transition");
	transition.classList.add("active");
	setTimeout(() => {
		document
			.querySelectorAll(".nav-links a")
			.forEach((a) => a.classList.remove("active"));
		if (element) element.classList.add("active");
		const galleryDropdown = document.getElementById("gallery-dd");
		if (cat === "contact") {
			galleryDropdown.style.display = "none";
			const divider = document.querySelector(
				"#main-toolbar .divider:nth-of-type(2)"
			);
			if (divider) divider.style.display = "none";
		} else {
			galleryDropdown.style.display = "block";
			const divider = document.querySelector(
				"#main-toolbar .divider:nth-of-type(2)"
			);
			if (divider) divider.style.display = "block";
		}
		const gallery = document.getElementById("gallery");
		gallery.innerHTML = "";
		gallery.removeAttribute("style");
		gallery.classList.add("loading");
		updateGalleryAttributes();
		gallery_images = [];
		if (cat === "contact") {
			renderContact(gallery);
		} else if (cat === "journal") {
			renderJournal(gallery);
		} else {
			let seed = cat;
			let count = 16;
			if (cat === "exhibitions") {
				count = 8;
				seed = "art";
			}
			if (cat === "series") {
				count = 12;
				seed = "bw";
			}
			generateImages(gallery, count, seed);
		}
		const nav = document.getElementById("main-nav");
		if (nav.classList.contains("active")) {
			toggleMenuOverlay();
		}
		setTimeout(() => {
			gallery.classList.remove("loading");
			transition.classList.remove("active");
			const items = document.querySelectorAll(".gallery .item");
			items.forEach((item, index) => {
				item.style.animationDelay = `${index * 0.05}s`;
				item.style.opacity = 1;
			});
			updateScrollHint();
		}, 800);
	}, 400);
}

function generateImages(container, count, seed) {
	const heights = [300, 450, 600, 350, 500, 400];
	let html = "";
	for (let i = 0; i < count; i++) {
		const h = heights[Math.floor(Math.random() * heights.length)];
		const src = `https://picsum.photos/seed/${seed}${i}/400/${h}`;
		const highRes = `https://picsum.photos/seed/${seed}${i}/1200/${h * 3}`;
		gallery_images.push(highRes);
		html += `
                    <div class="item" style="animation-delay: ${
																					i * 0.05
																				}s;" onclick="openLightbox(${i})">
                        <img src="${src}" loading="lazy" alt="Gallery Image">
                    </div>
                `;
	}
	container.innerHTML = html;
	container.querySelectorAll("img").forEach((img) => {
		img.addEventListener("load", function () {
			this.style.opacity = "1";
		});
		img.style.opacity = "0";
	});
}

function renderJournal(container) {
	const entries = [
		{
			title: "The Light in Venice",
			date: "Oct 12, 2023"
		},
		{
			title: "Analog Process",
			date: "Sep 28, 2023"
		},
		{
			title: "Shadows of Tokyo",
			date: "Aug 15, 2023"
		},
		{
			title: "Portraiture Notes",
			date: "Jul 02, 2023"
		}
	];
	let html = "";
	entries.forEach((entry, i) => {
		const src = `https://picsum.photos/seed/journal${i}/600/400`;
		const highRes = `https://picsum.photos/seed/journal${i}/1200/800`;
		gallery_images.push(highRes);
		html += `
                    <div class="item journal-entry" style="animation-delay: ${
																					i * 0.1
																				}s;" onclick="openLightbox(${gallery_images.length - 1})">
                        <img src="${src}" loading="lazy" style="border-radius:var(--radius); width:100%; aspect-ratio:3/2; object-fit:cover; margin-bottom:5px;">
                        <div class="meta">${entry.date}</div>
                        <h3>${entry.title}</h3>
                    </div>
                `;
	});
	for (let i = 4; i < 10; i++) {
		const src = `https://picsum.photos/seed/journal${i}/400/500`;
		const highRes = `https://picsum.photos/seed/journal${i}/800/1000`;
		gallery_images.push(highRes);
		html += `
                    <div class="item" style="animation-delay: ${
																					i * 0.05
																				}s;" onclick="openLightbox(${gallery_images.length - 1})">
                        <img src="${src}" loading="lazy" alt="Gallery Image">
                    </div>
                `;
	}
	container.innerHTML = html;
}

function openLightbox(index) {
	current_image_index = index;
	const lightbox = document.getElementById("lightbox");
	const img = document.getElementById("lightbox-img");
	img.classList.remove("loaded");
	img.classList.remove("animate-next", "animate-prev");
	img.src = gallery_images[current_image_index];
	img.onload = () => img.classList.add("loaded");
	lightbox.classList.add("active");
}

function closeLightbox() {
	document.getElementById("lightbox").classList.remove("active");
}

function changeImage(direction) {
	current_image_index += direction;
	if (current_image_index >= gallery_images.length) current_image_index = 0;
	if (current_image_index < 0) current_image_index = gallery_images.length - 1;
	const img = document.getElementById("lightbox-img");
	img.classList.remove("loaded", "animate-next", "animate-prev");
	const tempImg = new Image();
	tempImg.src = gallery_images[current_image_index];
	tempImg.onload = () => {
		img.src = tempImg.src;
		img.classList.add("loaded");
		if (direction > 0) img.classList.add("animate-next");
		else img.classList.add("animate-prev");
	};
}

function renderContact(container) {
	container.removeAttribute("data-mode");
	container.removeAttribute("data-cols");
	container.innerHTML = `
                <div class="contact-container">
                    <h1>Inquiries & Commissions</h1>
                    <p>Available for commercial shoots (Not really but im available for web desing and development), collaborative exposures, and visual projects worldwide.<br>Based in the  darkroom.</p>
                    <div class="contact-grid">
                        <div class="input-group">
                            <label>Subject / Name</label>
                            <input type="text" placeholder="Who is in the frame?">
                        </div>
                        <div class="input-group">
                            <label>Contact Sheet</label>
                            <input type="email" placeholder="email@address.com">
                        </div>
                        <div class="input-group">
                            <label>The Brief</label>
                            <textarea rows="6" placeholder="Describe the desired exposure..."></textarea>
                        </div>
                        <button class="text-btn" style="border-color:var(--text-color); margin-top:10px; justify-content:center;" onclick="sendMessage()">Develop Message</button>
                    </div>
                </div>
            `;
}

function sendMessage() {
	const btn = document.querySelector(".contact-grid button");
	const originalText = btn.innerHTML;
	btn.innerHTML =
		'<span class="material-symbols-outlined">check</span> Exposure Complete';
	btn.style.background = "var(--text-color)";
	btn.style.color = "var(--bg-color)";
	setTimeout(() => {
		btn.innerHTML = originalText;
		btn.style.background = "";
		btn.style.color = "";
	}, 2000);
}

function setNavPosition(pos, save = true) {
	if (save) {
		config.nav_position = pos;
		saveConfig();
	}
	const container = document.getElementById("app-container");
	container.setAttribute("data-nav", pos);
	const nav = document.getElementById("main-nav");
	if (pos !== "hamburger") {
		nav.classList.remove("active");
		document.getElementById("toggle-icon").textContent = "menu";
	} else {
		setTimeout(() => {
			nav.classList.add("active");
			document.getElementById("toggle-icon").textContent = "close";
		}, 50);
	}
}

function setNavAlign(align, save = true) {
	if (save) {
		config.nav_align = align;
		saveConfig();
	}
	const nav = document.getElementById("main-nav");
	nav.setAttribute("data-align", align);
}

function toggleSocialsPos() {
	const nav = document.getElementById("main-nav");
	const current = nav.getAttribute("data-socials");
	const newVal = current === "alt" ? "std" : "alt";
	nav.setAttribute("data-socials", newVal);
	config.socials_pos = newVal;
	saveConfig();
}

function toggleMenuOverlay() {
	const nav = document.getElementById("main-nav");
	const icon = document.getElementById("toggle-icon");
	if (!nav.classList.contains("active")) {
		nav.classList.add("active");
		icon.textContent = "close";
		icon.style.animation = "rotate 0.5s ease";
		setTimeout(() => {
			icon.style.animation = "";
		}, 500);
	} else {
		nav.classList.remove("active");
		icon.textContent = "menu";
	}
}

function updateStyleVar(variable, value) {
	document.documentElement.style.setProperty(variable, value);
	if (variable === "--main-padding") config.padding = parseInt(value);
	if (variable === "--gap") config.gap = parseInt(value);
	if (variable === "--radius") config.radius = parseInt(value);
	if (variable === "--item-aspect") config.aspect_ratio = value;
	saveConfig();
	const root = document.documentElement;
	root.style.transform = "scale(1.001)";
	setTimeout(() => {
		root.style.transform = "scale(1)";
	}, 100);
}

function toggleDropdown(id) {
	document.querySelectorAll(".dropdown").forEach((d) => {
		if (d.id !== id) d.classList.remove("open");
	});
	const dropdown = document.getElementById(id);
	dropdown.classList.toggle("open");
	const icon = dropdown.querySelector(".material-symbols-outlined");
	if (dropdown.classList.contains("open")) {
		icon.style.transform = "rotate(90deg)";
	} else {
		icon.style.transform = "rotate(0deg)";
	}
}

function setLayoutMode(mode) {
	config.gallery_mode = mode;
	saveConfig();
	updateGalleryAttributes();
	const main = document.getElementById("main-content");
	if (mode === "horizontal" || mode === "horizontal-grid") {
		main.classList.add("horizontal-scroll-active");
	} else {
		main.classList.remove("horizontal-scroll-active");
	}
	updateScrollHint();
}

function setColumns(n) {
	config.gallery_cols = n;
	saveConfig();
	if (
		config.gallery_mode !== "horizontal" &&
		config.gallery_mode !== "horizontal-grid"
	) {
		updateGalleryAttributes();
	}
}

function setAspectRatio(ratio) {
	updateStyleVar("--item-aspect", ratio);
}

function updateGalleryAttributes() {
	const g = document.getElementById("gallery");
	if (current_category === "contact") return;
	g.setAttribute("data-mode", config.gallery_mode);
	g.setAttribute("data-cols", config.gallery_cols);
	g.style.opacity = "0.5";
	setTimeout(() => {
		g.style.opacity = "1";
	}, 300);
}

function toggleTheme() {
	is_dark_mode = !is_dark_mode;
	config.theme = is_dark_mode ? "dark" : "light";
	saveConfig();
	document.body.classList.toggle("dark-mode", is_dark_mode);
	const icon = document.querySelector("#btn-theme span");
	icon.textContent = is_dark_mode ? "light_mode" : "dark_mode";
	icon.style.animation = "rotate 0.8s ease";
	setTimeout(() => {
		icon.style.animation = "";
	}, 800);
}

function initCustomCursor() {
	const cursor = document.getElementById("cursor-effect");
	document.addEventListener("mousemove", (e) => {
		cursor.style.left = `${e.clientX}px`;
		cursor.style.top = `${e.clientY}px`;
	});
	document.addEventListener("mouseleave", () => {
		cursor.style.opacity = "0";
	});
	document.addEventListener("mouseenter", () => {
		cursor.style.opacity = "0.7";
	});
}

function updateScrollHint() {
	const hint = document.getElementById("scroll-hint");
	if (
		(config.gallery_mode === "horizontal" ||
			config.gallery_mode === "horizontal-grid") &&
		current_category !== "contact"
	) {
		const gallery = document.getElementById("gallery");
		const isAtEnd =
			gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 50;
		if (isAtEnd) {
			hint.classList.remove("visible");
		} else {
			hint.classList.add("visible");
			const arrow = hint.querySelector(".material-symbols-outlined");
			if (gallery.scrollLeft > 50) {
				arrow.textContent = "arrow_back";
			} else {
				arrow.textContent = "arrow_forward";
			}
		}
	} else {
		hint.classList.remove("visible");
	}
}

function openModal(type) {
	const modal = document.getElementById("info-modal");
	const sections = document.querySelectorAll(".modal-section");
	sections.forEach((s) => s.classList.remove("active"));
	const activeSection = document.getElementById(`content-${type}`);
	if (activeSection) {
		activeSection.classList.add("active");
	}
	document
		.querySelectorAll(".dropdown")
		.forEach((d) => d.classList.remove("open"));
	modal.classList.add("active");
}

function closeModal() {
	document.getElementById("info-modal").classList.remove("active");
}

function shareTwitter() {
	const shareUrl = "https://codepen.io/Julibe/full/PwzmEOq";
	const viaUser = "Julibe";
	const messages = [
		"Adjusting my focal length on Gradux.",
		"A new exposure for digital galleries.",
		"Fluid compositions and timeless exposures.",
		"Redefining the digital contact sheet.",
		"Where composition meets visual narrative."
	];
	const hashtagsList = [
		"Photography",
		"VisualArt",
		"DigitalJournal",
		"FineArt",
		"Inspiration",
		"Minimalism",
		"Aesthetics",
		"Composition",
		"LightAndShadow",
		"Curated"
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
