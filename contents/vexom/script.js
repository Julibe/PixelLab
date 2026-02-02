/* ============================================================
   CONFIGURATION
   ============================================================ */
// Your Web App URL
const GOOGLE_SCRIPT_URL =
	"https://script.google.com/macros/s/AKfycbyDWj5PAHCj8TIEzS2Hpklr-QwI8oJt7-vaSaZqmac85YHBqttyk3qImM9hatdHbRZ8/exec";

// Fallback Read-Only URLs (Backup data if API fails)
const gdocsId =
	"2PACX-1vS8G5QDgP1tCB2uJi2jPMC4moo7asr2L_QTDomdNMaF7ntYEgIJXbfrJbFgKE9Ydxq4Kd14ZajiBTS1";
const gdocsBase = `https://docs.google.com/spreadsheets/d/e/${gdocsId}/pub`;
const LINKS_URL = `${gdocsBase}?gid=490851426&single=true&output=csv`;
const CATS_URL = `${gdocsBase}?gid=1459478140&single=true&output=csv`;

/* --- STATE MANAGEMENT --- */
let apps = [],
	categories = [],
	appCounts = {},
	isReadOnly = false,
	exchangeRates = {};

console.clear();

/* --- INITIALIZATION --- */
async function init() {
	const loader = document.getElementById("loader");

	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

		console.log("Fetching data...");
		// Use the Web App URL for GET
		const response = await fetch(GOOGLE_SCRIPT_URL, {
			signal: controller.signal
		});
		clearTimeout(timeoutId);

		if (!response.ok) throw new Error(`API Status: ${response.status}`);

		const data = await response.json();

		if (!data || (!data.apps && !data.categories)) {
			throw new Error("Invalid Data Structure");
		}

		apps = data.apps || [];
		categories = data.categories || [];
		showToast("Connected to Cloud", "success");
	} catch (e) {
		console.warn("API Connection Failed, using Backup CSV:", e.message);

		isReadOnly = true;
		document.body.classList.add("read-only");

		try {
			const [l, c] = await Promise.all([
				fetch(LINKS_URL).catch((err) => ({ ok: false })),
				fetch(CATS_URL).catch((err) => ({ ok: false }))
			]);

			if (l.ok && c.ok) {
				apps = parseCSV(await l.text());
				categories = parseCSV(await c.text());
				showToast("Read-Only Mode", "info");
			} else {
				throw new Error("CSV Fallback failed");
			}
		} catch (err) {
			console.error("Critical Data Failure");
			showToast("Offline / No Data", "error");
			apps = [];
			categories = [];
		}
	} finally {
		try {
			processData();
			initWidgets();
			initTools();
		} catch (renderError) {
			console.error(renderError);
		}

		if (loader) {
			loader.style.opacity = "0";
			setTimeout(() => loader.classList.add("hidden"), 500);
		}
	}
}

function processData() {
	if (!Array.isArray(apps)) apps = [];
	if (!Array.isArray(categories)) categories = [];

	appCounts = {};
	apps.forEach((app) => {
		if (app.Category)
			app.Category.split(",").forEach((c) => {
				c = c.trim();
				appCounts[c] = (appCounts[c] || 0) + 1;
			});
	});

	let displayCats = categories.filter(
		(c) => appCounts[c.Name] > 0 && c.Name.toUpperCase() !== "ALL"
	);
	displayCats.sort((a, b) => {
		if (a.Name === "Favorites") return -1;
		if (b.Name === "Favorites") return 1;
		return (appCounts[b.Name] || 0) - (appCounts[a.Name] || 0);
	});

	const s = document.getElementById("catSelect");
	if (s) {
		s.innerHTML = "";
		categories.forEach((c) => {
			if (c.Name !== "ALL" && c.Name !== "Favorites")
				s.innerHTML += `<option value="${c.Name}">${c.Name}</option>`;
		});
	}

	renderSidebar(displayCats);
	loadHome();
}

function parseCSV(text) {
	if (!text) return [];
	const rows = text.split("\n");
	if (rows.length < 2) return [];
	const headers = rows[0].split(",").map((h) => h.trim().replace(/"/g, ""));
	return rows
		.slice(1)
		.map((r) => {
			if (!r.trim()) return null;
			const c = r
				.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
				.map((v) => v.trim().replace(/"/g, ""));
			let e = {};
			headers.forEach((h, i) => (e[h] = c[i] || ""));
			return e;
		})
		.filter((x) => x && x.Name);
}

/* --- UI RENDERING --- */
const grid = document.getElementById("appGrid");
const folderList = document.getElementById("folderList");
const homeView = document.getElementById("home-view");
const dynamicView = document.getElementById("dynamic-view");
const recentGrid = document.getElementById("recentGrid");
const favoritesGrid = document.getElementById("favoritesGrid");

function renderSidebar(cats) {
	if (!folderList) return;
	folderList.innerHTML = "";
	createSidebarItem(
		{ Name: "Home", Icon: "home", Color: "#585264", Type: "Google Material" },
		"home"
	);
	createSidebarItem(
		{ Name: "All Apps", Icon: "apps", Color: "#57a0ee", Type: "Google Material" },
		"all"
	);
	cats.forEach((c) => createSidebarItem(c, "cat"));
}

function getIconHTML(typeRaw, iconVal, color, isCard = false) {
	const type = (typeRaw || "").toLowerCase().trim();
	const baseClass = isCard
		? type.includes("google") || type.includes("material")
			? "material-icon-display"
			: "icon-font-display"
		: "";
	const styleAttr = isCard ? "" : `style="color:${color}"`;

	if (type.includes("google") || type.includes("material")) {
		return `<i class="icon google-materia material-icons ${baseClass}" ${styleAttr}>${iconVal}</i>`;
	} else if (type.includes("font") || type.includes("flat")) {
		return `<i class="icon flat-icon ${iconVal} ${baseClass}" ${styleAttr}></i>`;
	} else {
		return isCard
			? null
			: `<i class="icon font-awesome fa-solid fa-folder" ${styleAttr}></i>`;
	}
}

function createSidebarItem(cat, mode) {
	const li = document.createElement("li");
	li.className = "nav-item";
	li.setAttribute("title", cat.Name);
	li.setAttribute("aria-label", cat.Name);
	if (mode === "home") li.classList.add("active");
	li.style.setProperty("--accent-color", cat.Color);
	li.innerHTML = `${getIconHTML(
		cat.Type,
		cat.Icon,
		cat.Color
	)} <span class="name">${cat.Name}</span>`;
	li.onclick = () => {
		document
			.querySelectorAll(".nav-item")
			.forEach((el) => el.classList.remove("active"));
		li.classList.add("active");
		if (mode === "home") loadHome();
		else if (mode === "all") loadCategory("ALL");
		else loadCategory(cat.Name);
	};
	li.addEventListener("mouseenter", () =>
		document.documentElement.style.setProperty("--active-glow", cat.Color)
	);
	li.addEventListener("mouseleave", () =>
		document.documentElement.style.setProperty("--active-glow", "transparent")
	);
	folderList.appendChild(li);
}

function createCard(app, index) {
	if (!app) return document.createElement("div");

	const name = app.Name || "Unknown";
	const url = app.URL || "#";
	const color = app.Color || "#555";
	const icon = app.Icon || "extension";
	const type = (app.Type || "").toLowerCase().trim();

	const a = document.createElement("a");
	a.className = "card";
	a.href = url;
	//a.target = "_blank";
	a.title = name;
	a.setAttribute("aria-label", name);
	a.style.animationDelay = `${index * 0.05}s`;
	a.style.animationName = "cardPop";
	a.style.animationDuration = "0.4s";
	a.style.animationFillMode = "forwards";
	a.style.setProperty("--glow-color", color);

	const isFav = app.Category && app.Category.includes("Favorites");
	const favBtn = document.createElement("div");
	favBtn.className = `card-fav-btn ${isFav ? "active" : ""}`;
	favBtn.innerHTML = isFav
		? '<i class="fas fa-star"></i>'
		: '<i class="far fa-star"></i>';
	favBtn.onclick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		toggleFavorite(app, favBtn);
	};
	a.appendChild(favBtn);

	a.addEventListener("mouseenter", () =>
		document.documentElement.style.setProperty("--active-glow", color)
	);
	a.addEventListener("mouseleave", () =>
		document.documentElement.style.setProperty("--active-glow", "transparent")
	);

	a.onclick = (e) => {
		if (e.target !== favBtn && !favBtn.contains(e.target)) saveRecent(app);
	};

	const iconContainer = document.createElement("div");
	iconContainer.className = "icon-container";

	if (type === "image") {
		const img = document.createElement("img");
		img.src = icon;
		img.className = "card-img";
		img.style.width = "100%";
		img.style.height = "100%";
		img.style.objectFit = "cover";
		img.onerror = () => {
			img.style.display = "none";
			fallbackToInitial(iconContainer, name, color);
		};
		iconContainer.appendChild(img);
	} else {
		const html = getIconHTML(type, icon, color, true);
		if (html) iconContainer.innerHTML = html;
		else fallbackToInitial(iconContainer, name, color);
	}
	a.appendChild(iconContainer);

	const span = document.createElement("span");
	span.innerText = name;
	a.appendChild(span);
	return a;
}

function fallbackToInitial(container, name, color) {
	const validName = (name || "?").toString();
	const div = document.createElement("div");
	div.className = "initial-fallback";
	div.style.background = color;
	div.innerText = validName.charAt(0).toUpperCase();
	container.appendChild(div);
}

function loadHome() {
	if (!homeView || !dynamicView) return;
	homeView.classList.remove("hidden");
	dynamicView.classList.add("hidden");
	renderFavorites();
	renderRecents();
}

function renderFavorites() {
	const favs = apps.filter(
		(a) => a.Category && a.Category.includes("Favorites")
	);
	const sec = document.getElementById("favorites-section");
	if (!sec || !favoritesGrid) return;

	if (favs.length) sec.classList.remove("hidden");
	else sec.classList.add("hidden");

	favoritesGrid.innerHTML = "";
	favs.forEach((a, i) => favoritesGrid.appendChild(createCard(a, i)));
}

function renderRecents() {
	let r = [];
	try {
		r = JSON.parse(localStorage.getItem("julibeRecents")) || [];
	} catch (e) {
		localStorage.removeItem("julibeRecents");
		r = [];
	}
	const validRecents = r.filter(
		(savedApp) => savedApp && savedApp.URL && savedApp.Name
	);
	const sec = document.getElementById("recent-section");
	if (!sec || !recentGrid) return;
	if (validRecents.length) sec.classList.remove("hidden");
	else sec.classList.add("hidden");
	recentGrid.innerHTML = "";
	validRecents.forEach((savedApp, i) => {
		const actualApp = apps.find((x) => x.URL === savedApp.URL) || savedApp;
		recentGrid.appendChild(createCard(actualApp, i));
	});
}

function saveRecent(app) {
	if (app.Category && app.Category.includes("Favorites")) return;
	let r = [];
	try {
		r = JSON.parse(localStorage.getItem("julibeRecents")) || [];
	} catch (e) {
		r = [];
	}
	r = r.filter((x) => x.URL !== app.URL);
	r.unshift({
		Name: app.Name,
		URL: app.URL,
		Type: app.Type,
		Icon: app.Icon,
		Color: app.Color,
		Category: app.Category
	});
	if (r.length > 6) r.pop();
	localStorage.setItem("julibeRecents", JSON.stringify(r));
}

function loadCategory(name) {
	homeView.classList.add("hidden");
	dynamicView.classList.remove("hidden");
	const catObj = categories.find((c) => c.Name === name);
	let iconHtml = `<span class="icon google-materia material-icons">apps</span>`;
	if (name !== "ALL" && catObj)
		iconHtml = getIconHTML(catObj.Type, catObj.Icon, "#fff");
	document.getElementById("gridTitle").innerHTML = `${iconHtml} ${name}`;
	grid.innerHTML = "";
	let filtered =
		name === "ALL"
			? apps
			: apps.filter((a) => a.Category && a.Category.includes(name));
	if (filtered.length === 0)
		grid.innerHTML =
			'<div style="opacity:0.5; text-align:center;">No apps found.</div>';
	else filtered.forEach((a, i) => grid.appendChild(createCard(a, i)));
}

document.getElementById("appFilter").addEventListener("input", (e) => {
	const t = e.target.value.toLowerCase();
	if (t) {
		homeView.classList.add("hidden");
		dynamicView.classList.remove("hidden");
		document.getElementById(
			"gridTitle"
		).innerHTML = `<span class="icon google-materia material-icons">search</span> Search`;
		grid.innerHTML = "";
		apps
			.filter((a) => a.Name.toLowerCase().includes(t))
			.forEach((a, i) => grid.appendChild(createCard(a, i)));
	} else loadHome();
});

function toggleWidget(header) {
	header.parentElement.classList.toggle("collapsed");
}
function showToast(msg, type) {
	const c = document.getElementById("toast-container");
	if (!c) return;
	const t = document.createElement("div");
	t.className = `toast ${type}`;
	t.innerText = msg;
	c.appendChild(t);
	setTimeout(() => t.classList.add("show"), 10);
	setTimeout(() => {
		t.classList.remove("show");
		setTimeout(() => t.remove(), 500);
	}, 5000);
}

function openModal() {
	document.getElementById("modalOverlay").style.display = "flex";
	setTimeout(
		() => (document.getElementById("modalOverlay").style.opacity = "1"),
		10
	);
}
function closeModal() {
	document.getElementById("modalOverlay").style.opacity = "0";
	setTimeout(
		() => (document.getElementById("modalOverlay").style.display = "none"),
		300
	);
}

// --- CLEAN SAVE LOGIC (No Popups) ---
document.getElementById("addForm").addEventListener("submit", async (e) => {
	e.preventDefault();
	if (isReadOnly) return showToast("Read Only Mode", "error");

	const fd = new FormData(e.target);
	const url = fd.get("url").trim();
	const name = fd.get("name").trim();

	if (!url) return showToast("URL is required", "error");

	const duplicate = apps.find(
		(a) => a.URL === url || a.Name.toLowerCase() === name.toLowerCase()
	);
	if (duplicate) {
		return showToast(`Duplicate found: ${duplicate.Name}`, "error");
	}

	let cat = fd.get("category");
	if (fd.get("fav")) cat += ", Favorites";

	const pl = {
		action: "add",
		name: name,
		url: url,
		type: fd.get("type"),
		icon: fd.get("icon"),
		color: fd.get("color"),
		category: cat
	};

	const btn = document.getElementById("submitBtn");
	btn.disabled = true;
	btn.innerText = "Saving...";

	try {
		// Send to Google Script (no-cors)
		await fetch(GOOGLE_SCRIPT_URL, {
			method: "POST",
			mode: "no-cors",
			headers: { "Content-Type": "text/plain" },
			body: JSON.stringify(pl)
		});

		const newApp = {
			Name: name,
			URL: url,
			Type: fd.get("type"),
			Icon: fd.get("icon"),
			Color: fd.get("color"),
			Category: cat
		};
		apps.push(newApp);
		processData();

		showToast("App Saved Successfully!", "success");
		closeModal();
		e.target.reset();
	} catch (err) {
		const csvLine = `"${name}","${url}","${fd.get("type")}","${fd.get(
			"icon"
		)}","${fd.get("color")}","${cat}"`;
		showToast(`Save failed. Copy: ${csvLine}`, "error");
	} finally {
		btn.disabled = false;
		btn.innerText = "Save";
	}
});

async function toggleFavorite(app, btn) {
	if (isReadOnly) return showToast("Read Only", "error");

	const wasFav = app.Category && app.Category.includes("Favorites");
	const i = btn.querySelector("i");

	if (wasFav) {
		btn.classList.remove("active");
		i.className = "far fa-star";
		if (app.Category)
			app.Category = app.Category.split(",")
				.map((s) => s.trim())
				.filter((s) => s !== "Favorites")
				.join(", ");
	} else {
		btn.classList.add("active");
		i.className = "fas fa-star";
		if (app.Category) app.Category += ", Favorites";
		else app.Category = "Favorites";
	}

	if (!document.getElementById("home-view").classList.contains("hidden")) {
		renderFavorites();
		renderRecents();
	}

	try {
		await fetch(GOOGLE_SCRIPT_URL, {
			method: "POST",
			mode: "no-cors",
			headers: { "Content-Type": "text/plain" },
			body: JSON.stringify({ action: "toggleFav", url: app.URL })
		});
	} catch (e) {
		console.error("Fav sync error", e);
	}
}

function initWidgets() {
	setInterval(() => {
		const d = new Date();
		const tEl = document.getElementById("clockTime");
		const dEl = document.getElementById("clockDate");
		if (tEl)
			tEl.innerText = d.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			});
		if (dEl)
			dEl.innerText = d.toLocaleDateString([], {
				weekday: "long",
				month: "short",
				day: "numeric"
			});
	}, 1000);

	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=4.7110&lon=-74.0721&appid=8b208e66b937fae961b84cc6d432ec7f&units=metric`
	)
		.then((r) => r.json())
		.then((d) => {
			if (!d.weather || !d.main) throw new Error("Weather data incomplete");
			const iconUrl = `https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`;
			const wEl = document.getElementById("weatherContent");
			if (wEl) {
				wEl.innerHTML = `
                    <div class="weather-main">
                        <img src="${iconUrl}" class="weather-icon-img" alt="Icon">
                        <div class="weather-temp-group">
                            <div class="weather-temp-xl">${Math.round(
																													d.main.temp
																												)}°</div>
                            <div class="weather-location">${d.name}</div>
                        </div>
                    </div>
                    <div class="weather-details">
                        <div class="weather-detail-item">
                            <span>Feels</span>
                            <strong>${Math.round(d.main.feels_like)}°</strong>
                        </div>
                        <div class="weather-detail-item">
                            <span>Min</span>
                            <strong>${Math.round(d.main.temp_min)}°</strong>
                        </div>
                        <div class="weather-detail-item">
                            <span>Max</span>
                            <strong>${Math.round(d.main.temp_max)}°</strong>
                        </div>
                    </div>
                `;
			}
		})
		.catch((e) => {
			const wEl = document.getElementById("weatherContent");
			if (wEl)
				wEl.innerHTML = `<div style="opacity:0.5; padding:10px;">Weather Offline</div>`;
		});
}

function initTools() {
	const n = localStorage.getItem("julibeNotes");
	if (n) {
		const qn = document.getElementById("quickNotes");
		if (qn) qn.value = n;
	}
	updateRates();
}

function saveNotes() {
	localStorage.setItem(
		"julibeNotes",
		document.getElementById("quickNotes").value
	);
}

function updateRates() {
	const fromEl = document.getElementById("currFrom");
	const toEl = document.getElementById("currTo");
	if (!fromEl || !toEl) return;
	const from = fromEl.value;
	const to = toEl.value;
	if (from === to) {
		exchangeRates[`${from}-${to}`] = 1;
		convertCurrency();
		return;
	}
	fetch(`https://open.er-api.com/v6/latest/${from}`)
		.then((r) => r.json())
		.then((d) => {
			if (d.rates && d.rates[to]) {
				exchangeRates[`${from}-${to}`] = d.rates[to];
				convertCurrency();
			}
		})
		.catch((e) => console.error("Currency Error", e));
}

function convertCurrency() {
	const f = document.getElementById("currFrom").value;
	const t = document.getElementById("currTo").value;
	const v = document.getElementById("convAmount").value;
	const r = exchangeRates[`${f}-${t}`] || (f === t ? 1 : 0);
	const res = document.getElementById("convResult");
	if (res) {
		if (r === 0) res.value = "...";
		else
			res.value = (v * r).toLocaleString("en-US", {
				style: "currency",
				currency: t
			});
	}
}

let cV = "";
function calcAppend(v) {
	cV += v;
	document.getElementById("calcDisplay").value = cV;
}
function calcClear() {
	cV = "";
	document.getElementById("calcDisplay").value = "";
}
function calcSolve() {
	try {
		cV = eval(cV).toString();
	} catch {
		cV = "Error";
	}
	document.getElementById("calcDisplay").value = cV;
}
function shareTwitter() {
	const shareUrl = "https://codepen.io/Julibe/pen/ByKqWoR";

	const viaUser = "Julibe";

	const messages = [
		"Just upgraded my browser experience with Vexon! 🚀",
		"Finally, a start page that looks as good as it works. ✨",
		"Organizing my digital chaos with style. Check this out!",
		"Productivity meets aesthetics in this new dashboard.",
		"My new digital command center is slick, fast, and beautiful.",
		"Say goodbye to messy bookmarks. Vexon is here. 🔥"
	];

	const hashtagsList = [
		"Productivity",
		"Dashboard",
		"WebDesign",
		"UIUX",
		"Frontend",
		"Glassmorphism",
		"DevLife",
		"JavaScript",
		"OpenSource",
		"Coding",
		"WebDev"
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
function openInfo(type) {
	const modalOverlay = document.getElementById("infoModalOverlay");

	// 1. Hide all info blocks
	const allBlocks = document.querySelectorAll(".info-block");
	allBlocks.forEach((block) => block.classList.add("hidden"));

	// 2. Show the specific block matching the type
	const targetBlock = document.getElementById("info-" + type);
	if (targetBlock) {
		targetBlock.classList.remove("hidden");

		// 3. Show overlay
		modalOverlay.style.display = "flex";
		setTimeout(() => {
			modalOverlay.style.opacity = "1";
		}, 10);
	}
}

function closeInfoModal() {
	const modalOverlay = document.getElementById("infoModalOverlay");
	modalOverlay.style.opacity = "0";
	setTimeout(() => {
		modalOverlay.style.display = "none";
	}, 500);
}

// Close on click outside
document.getElementById("infoModalOverlay").addEventListener("click", (e) => {
	if (e.target === document.getElementById("infoModalOverlay")) {
		closeInfoModal();
	}
});

init();
