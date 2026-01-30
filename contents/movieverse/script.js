const apikey = "YmQ5ZDJmNjdlZjRiODIyZTkxMTliNjliYmNhZTY4MTA=";
const getApiKey = () => atob(apikey);

const app_config = {
	base_url: "https://api.themoviedb.org/3",
	image_base_url: "https://image.tmdb.org/t/p",
	language: "en-US",
	sizes: {
		poster: "/w500",
		thumb: "/original"
	}
};

// --- DATA CONTAINERS ---
let all_movies = [];
let recent_movies = [];
let unreleased_movies = [];
let next_week_content = [];
let this_month_content = [];
let all_tv = [];
let all_anime = []; // New Container for Anime
let genre_map = {};
let update_interval;
let typingTimeout;

// --- CONFIG: FILTERS ---

const REGION_FILTERS =
	"&without_original_language=hi|te|ta|ml|kn|bn|pa|mr|gu|ur|as|or|si";

// 2. QUALITY_FILTERS: (High Quality Only)
const QUALITY_FILTERS = "&vote_count.gte=350&vote_average.gte=8.0";

// 3. DATE_FILTERS:
const DATE_FILTER = "&primary_release_date.gte=2020-01-01";
const TV_DATE_FILTER = "&first_air_date.gte=2020-01-01";

// --- UTILITIES ---
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function typeWriter(element, text, speed = 50) {
	if (typingTimeout) clearTimeout(typingTimeout);
	element.innerHTML = "";
	element.classList.add("typing-cursor");
	let i = 0;

	function type() {
		if (i < text.length) {
			element.innerHTML += text.charAt(i);
			i++;
			typingTimeout = setTimeout(type, speed);
		} else {
			setTimeout(() => element.classList.remove("typing-cursor"), 1000);
		}
	}
	type();
}

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
}

function getDateStr(days_offset) {
	const date = new Date();
	date.setDate(date.getDate() + days_offset);
	return date.toISOString().split("T")[0];
}

async function fetchGenreMap() {
	const genre_url = `${
		app_config.base_url
	}/genre/movie/list?api_key=${getApiKey()}&language=${app_config.language}`;
	try {
		const res = await fetch(genre_url);
		const data = await res.json();
		data.genres.forEach((g) => (genre_map[g.id] = g.name));
	} catch (e) {
		console.error(e);
	}
}

// --- HELPER: DETECT INDIAN CONTENT ---
function isIndianContent(item) {
	// 1. Check Keywords (Updated list)
	const textToCheck =
		(item.title || item.name || "") + " " + (item.overview || "");
	const lowerText = textToCheck.toLowerCase();

	const blockList = [
		"bollywood",
		"tollywood",
		"kollywood",
		"sandalwood",
		"mollywood",
		"tamil",
		"telugu",
		"hindi",
		"kannada",
		"malayalam",
		"bengali",
		"marathi",
		"punjabi",
		"mumbai",
		"delhi",
		"chennai",
		"hyderabad",
		"bangalore",
		"kolkata",
		"kerala",
		"veeran",
		"maadu",
		"pidi",
		"varisu",
		"thunivu",
		"vikram",
		"ponniyin",
		"salaar",
		"kalki",
		"pushpa",
		"kantara",
		"kgf",
		"k.g.f",
		"rrr",
		"r.r.r",
		"bramayugam",
		"manjummel",
		"premalu",
		"avesham",
		"aadujeevitham",
		"jailer",
		"leo",
		"beast",
		"don",
		"doctor",
		"master",
		"bigil",
		"mersal",
		"sarkar",
		"theri",
		"kaththi",
		"thuppakki",
		"devara",
		"kanguva",
		"kapoor",
		"khan"
	];

	if (blockList.some((word) => lowerText.includes(word))) return true;

	// 2. Strict Language Check (Banning specific codes instead of requiring English)
	const indianCodes = [
		"hi",
		"te",
		"ta",
		"ml",
		"kn",
		"bn",
		"pa",
		"mr",
		"gu",
		"ur",
		"as",
		"or"
	];
	if (indianCodes.includes(item.original_language)) return true;

	return false;
}

// --- API FETCHING ---

async function fetchContent(url, type = "movie") {
	try {
		const res = await fetch(url);
		const data = await res.json();

		// --- STRICT FILTERING CHAIN ---
		const validResults = (data.results || []).filter((item) => {
			// 1. Must have poster
			if (!item.poster_path) return false;

			// 2. Remove Indian content
			if (isIndianContent(item)) return false;

			return true;
		});

		return validResults.map((item) => ({
			id: item.id,
			type: type,
			title: type === "movie" ? item.title : item.name,
			description: item.overview,
			genre: item.genre_ids
				? item.genre_ids
						.map((id) => genre_map[id] || "Unknown")
						.slice(0, 2)
						.join(", ")
				: "Unknown",
			year:
				(type === "movie" ? item.release_date : item.first_air_date)?.split(
					"-"
				)[0] || "N/A",
			poster: `${app_config.image_base_url}${app_config.sizes.poster}${item.poster_path}`,
			image: item.backdrop_path
				? `${app_config.image_base_url}${app_config.sizes.thumb}${item.backdrop_path}`
				: "https://placehold.co/1920x1080?text=No+Image",
			rating: item.vote_average,
			mp4:
				"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
		}));
	} catch (e) {
		return [];
	}
}

async function fetchTrailerKey(id, type = "movie") {
	const url = `${
		app_config.base_url
	}/${type}/${id}/videos?api_key=${getApiKey()}&language=${app_config.language}`;
	try {
		const res = await fetch(url);
		const data = await res.json();
		const videos = data.results || [];

		const ytVideos = videos.filter((vid) => vid.site === "YouTube");

		let trailer = ytVideos.find((vid) => vid.type === "Trailer");
		if (!trailer) {
			trailer = ytVideos.find((vid) => vid.type === "Teaser");
		}

		return trailer ? trailer.key : null;
	} catch (e) {
		return null;
	}
}

// 1. TRENDING (Global - No India)
async function getMovies(pages = 10) {
	const discover_base = `${
		app_config.base_url
	}/discover/movie?api_key=${getApiKey()}&language=${
		app_config.language
	}&sort_by=popularity.desc${DATE_FILTER}${QUALITY_FILTERS}${REGION_FILTERS}`;
	let promises = [];
	for (let i = 1; i <= pages; i++)
		promises.push(fetchContent(`${discover_base}&page=${i}`, "movie"));
	const results = await Promise.all(promises);
	return results.flat();
}

// 2. RECENT (Global - No India)
async function getRecentMovies() {
	const today = new Date().toISOString().split("T")[0];
	const discover_base = `${
		app_config.base_url
	}/discover/movie?api_key=${getApiKey()}&language=${
		app_config.language
	}&sort_by=primary_release_date.desc&primary_release_date.lte=${today}${DATE_FILTER}${QUALITY_FILTERS}${REGION_FILTERS}`;
	let promises = [];
	for (let i = 1; i <= 3; i++)
		promises.push(fetchContent(`${discover_base}&page=${i}`, "movie"));
	const results = await Promise.all(promises);
	return results.flat();
}

// 3. UNRELEASED
async function getUnreleasedMovies() {
	const tomorrow = getDateStr(1);
	const discover_base = `${
		app_config.base_url
	}/discover/movie?api_key=${getApiKey()}&language=${
		app_config.language
	}&sort_by=popularity.desc&primary_release_date.gte=${tomorrow}${REGION_FILTERS}`;
	let promises = [];
	for (let i = 1; i <= 3; i++)
		promises.push(fetchContent(`${discover_base}&page=${i}`, "movie"));
	const results = await Promise.all(promises);
	return results.flat();
}

// 4. NEXT WEEK / MONTH
async function getNextWeekContent() {
	const tomorrow = getDateStr(1);
	const next_week = getDateStr(8);

	const url_m = `${
		app_config.base_url
	}/discover/movie?api_key=${getApiKey()}&language=${
		app_config.language
	}&sort_by=popularity.desc&primary_release_date.gte=${tomorrow}&primary_release_date.lte=${next_week}${REGION_FILTERS}`;
	const url_t = `${
		app_config.base_url
	}/discover/tv?api_key=${getApiKey()}&language=${
		app_config.language
	}&sort_by=popularity.desc&first_air_date.gte=${tomorrow}&first_air_date.lte=${next_week}${REGION_FILTERS}`;

	const [movies, tv] = await Promise.all([
		fetchContent(url_m, "movie"),
		fetchContent(url_t, "tv")
	]);
	return [...movies, ...tv];
}

async function getThisMonthContent() {
	const tomorrow = getDateStr(1);
	const next_month = getDateStr(30);

	const url_m = `${
		app_config.base_url
	}/discover/movie?api_key=${getApiKey()}&language=${
		app_config.language
	}&sort_by=popularity.desc&primary_release_date.gte=${tomorrow}&primary_release_date.lte=${next_month}${REGION_FILTERS}`;
	const url_t = `${
		app_config.base_url
	}/discover/tv?api_key=${getApiKey()}&language=${
		app_config.language
	}&sort_by=popularity.desc&first_air_date.gte=${tomorrow}&first_air_date.lte=${next_month}${REGION_FILTERS}`;

	const [movies, tv] = await Promise.all([
		fetchContent(url_m, "movie"),
		fetchContent(url_t, "tv")
	]);
	return [...movies, ...tv];
}

// 5. TV SHOWS (Global - No India)
async function getTV(pages = 5) {
	const discover_base = `${
		app_config.base_url
	}/discover/tv?api_key=${getApiKey()}&language=${
		app_config.language
	}&sort_by=popularity.desc${TV_DATE_FILTER}${QUALITY_FILTERS}${REGION_FILTERS}`;
	let promises = [];
	for (let i = 1; i <= pages; i++)
		promises.push(fetchContent(`${discover_base}&page=${i}`, "tv"));
	const results = await Promise.all(promises);
	return results.flat();
}

// 6. ANIME (New Category)
async function getAnime(pages = 3) {
	// Genre 16 is Animation, original_language=ja ensures Anime
	const discover_base = `${
		app_config.base_url
	}/discover/tv?api_key=${getApiKey()}&language=${
		app_config.language
	}&with_genres=16&with_original_language=ja&sort_by=popularity.desc${TV_DATE_FILTER}${QUALITY_FILTERS}`;
	let promises = [];
	for (let i = 1; i <= pages; i++)
		promises.push(fetchContent(`${discover_base}&page=${i}`, "tv"));
	const results = await Promise.all(promises);
	return results.flat();
}

// 7. GENRES
async function loadGenre(genre_id, title) {
	document.getElementById("trendingTitle").textContent = title;
	document.getElementById("moviesRow").innerHTML =
		'<div style="color:white; padding: 20px;">Loading category...</div>';

	// Hide all sections including the new Anime one
	[
		"tvSection",
		"animeSection",
		"recentSection",
		"unreleasedSection",
		"nextWeekSection",
		"thisMonthSection"
	].forEach((id) => {
		const el = document.getElementById(id);
		if (el) el.style.display = "none";
	});

	document
		.querySelectorAll(".sidebar-icon")
		.forEach((el) => el.classList.remove("active"));

	const discover_url = `${
		app_config.base_url
	}/discover/movie?api_key=${getApiKey()}&language=${
		app_config.language
	}&sort_by=popularity.desc&with_genres=${genre_id}${DATE_FILTER}${QUALITY_FILTERS}${REGION_FILTERS}`;

	let promises = [];
	for (let i = 1; i <= 3; i++)
		promises.push(fetchContent(`${discover_url}&page=${i}`, "movie"));
	const results = await Promise.all(promises);
	const movies = shuffleArray(results.flat());

	if (movies.length > 0) {
		document.getElementById("moviesRow").innerHTML = movies
			.map((m) => createCard(m))
			.join("");
		all_movies = movies;
		attachTiltEffect();
	} else {
		document.getElementById("moviesRow").innerHTML =
			'<div style="color:white; padding: 20px;">No highly rated movies found in this category.</div>';
	}
}

// --- UI LOGIC ---

// Helper to inject Anime HTML structure if it's missing
function injectAnimeSection() {
	const tvSection = document.getElementById("tvSection");
	// Only add if it doesn't exist and we found a place to put it
	if (tvSection && !document.getElementById("animeSection")) {
		const animeHtml = `
            <div class="row-section" id="animeSection">
                <div class="row-header">
                    <h2 class="row-title">TOP TRENDING ANIME <span class="see-all">View All</span></h2>
                    <div class="nav-controls">
                        <button class="nav-btn" onclick="scrollRow('animeRow', 'left')"><i class="fas fa-chevron-left"></i></button>
                        <button class="nav-btn" onclick="scrollRow('animeRow', 'right')"><i class="fas fa-chevron-right"></i></button>
                    </div>
                </div>
                <div class="movie-row" id="animeRow"></div>
            </div>
        `;
		tvSection.insertAdjacentHTML("afterend", animeHtml);
	}
}

function resetHome() {
	document.getElementById("trendingTitle").textContent =
		"TOP 10 TRENDING MOVIES";

	// Show all sections
	[
		"tvSection",
		"animeSection",
		"recentSection",
		"unreleasedSection",
		"nextWeekSection",
		"thisMonthSection"
	].forEach((id) => {
		const el = document.getElementById(id);
		if (el) el.style.display = "block";
	});

	document
		.querySelectorAll(".sidebar-icon")
		.forEach((el) => el.classList.remove("active"));
	document
		.querySelector('.sidebar-icon[data-tooltip="Home"]')
		.classList.add("active");

	const top10 = all_movies.slice(0, 10);
	document.getElementById("moviesRow").innerHTML =
		top10.map((m, index) => createCard(m, index + 1)).join("") +
		all_movies
			.slice(10)
			.map((m) => createCard(m))
			.join("");
	document.getElementById("recentRow").innerHTML = recent_movies
		.map((m) => createCard(m))
		.join("");
	document.getElementById(
		"unreleasedRow"
	).innerHTML = unreleased_movies.map((m) => createCard(m)).join("");
	document.getElementById("nextWeekRow").innerHTML = next_week_content
		.map((m) => createCard(m))
		.join("");
	document.getElementById(
		"thisMonthRow"
	).innerHTML = this_month_content.map((m) => createCard(m)).join("");
	document.getElementById("tvRow").innerHTML = all_tv
		.map((m) => createCard(m))
		.join("");

	// Populate Anime
	const animeRow = document.getElementById("animeRow");
	if (animeRow) {
		animeRow.innerHTML = all_anime.map((m) => createCard(m)).join("");
	}

	attachTiltEffect();
}

function initHero(hero_movie) {
	if (!hero_movie) return;
	const container = document.getElementById("heroSection");
	const bg = container.querySelector(".hero-bg");
	const globalAmbient = document.getElementById("globalAmbient");

	globalAmbient.style.backgroundImage = `url('${hero_movie.image}')`;
	bg.style.opacity = 0;

	setTimeout(() => {
		bg.style.backgroundImage = `url('${hero_movie.image}')`;
		bg.style.opacity = 1;
		container.querySelector(".hero-content").innerHTML = `
            <span class="tag-pill">#1 Trending</span>
            <h1 class="typing-cursor"></h1>
            <p class="description">${hero_movie.description}</p>
            <div class="btn-group">
                <button class="btn btn-primary" onclick="openDetails('${hero_movie.id}')"><i class="fas fa-info-circle"></i> More Info</button>
                <button class="btn btn-secondary"><i class="fas fa-plus"></i> My List</button>
            </div>
        `;
		typeWriter(container.querySelector("h1"), hero_movie.title);
	}, 300);
}

function createCard(item, rank = null) {
	const rank_html = rank ? `<div class="rank-number">${rank}</div>` : "";
	return `
        <div class="card ${rank ? "ranked" : ""}" onclick="openDetails('${
		item.id
	}')">
            <div class="card-content">
                ${rank_html}
                <div class="new-badge">${item.rating.toFixed(1)}</div>
                <img src="${item.poster}" class="card-img" alt="${
		item.title
	}" loading="lazy">
                <div class="card-overlay"></div>
                <div class="card-info">
                    <h3>${item.title}</h3>
                    <div class="meta-tags"><span>${item.year}</span> • <span>${
		item.genre
	}</span></div>
                </div>
            </div>
        </div>
    `;
}

async function initApp() {
	await fetchGenreMap();

	// Create the Anime UI section
	injectAnimeSection();

	const [
		movies,
		tv,
		anime,
		recent,
		unreleased,
		next_week,
		this_month
	] = await Promise.all([
		getMovies(10),
		getTV(5),
		getAnime(3), // Fetch Anime
		getRecentMovies(),
		getUnreleasedMovies(),
		getNextWeekContent(),
		getThisMonthContent()
	]);

	all_movies = shuffleArray(movies);
	all_tv = shuffleArray(tv);
	all_anime = shuffleArray(anime);
	recent_movies = shuffleArray(recent);
	unreleased_movies = shuffleArray(unreleased);
	next_week_content = shuffleArray(next_week);
	this_month_content = shuffleArray(this_month);

	if (all_movies.length > 0) {
		let hero_index = Math.floor(Math.random() * all_movies.length);
		initHero(all_movies[hero_index]);
		setInterval(() => {
			hero_index = (hero_index + 1) % all_movies.length;
			initHero(all_movies[hero_index]);
		}, 15000);
		resetHome();
	}

	const preloader = document.getElementById("preloader");
	preloader.style.opacity = "0";
	preloader.style.visibility = "hidden";
}

function openDetails(id) {
	let item =
		all_movies.find((i) => i.id == id) ||
		all_tv.find((i) => i.id == id) ||
		all_anime.find((i) => i.id == id) || // Check Anime list
		recent_movies.find((i) => i.id == id) ||
		unreleased_movies.find((i) => i.id == id) ||
		next_week_content.find((i) => i.id == id) ||
		this_month_content.find((i) => i.id == id);

	if (!item) return;

	document.getElementById("detailImg").src = item.poster;
	document.getElementById("detailTitle").textContent = item.title;
	document.getElementById("detailYear").textContent = item.year;
	document.getElementById("detailGenre").textContent = item.genre;
	document.getElementById("detailDesc").textContent = item.description;
	document.getElementById("detailRating").textContent =
		(item.rating * 10).toFixed(0) + "% Match";

	document.getElementById("detailPlayBtn").onclick = () => {
		closeDetails();
		setTimeout(() => playVideo(item.id, item.type, item.title, item.mp4), 300);
	};

	const modal = document.getElementById("detailsModal");
	modal.classList.add("active");
	modal.querySelector(".details-container").classList.add("active");
}

function closeDetails() {
	const modal = document.getElementById("detailsModal");
	const container = modal.querySelector(".details-container");
	container.classList.remove("active");
	setTimeout(() => modal.classList.remove("active"), 300);
}

// 2. VIDEO PLAYER LOGIC (With Autoplay Fix)
async function playVideo(id, type, title, fallbackUrl) {
	const modal = document.getElementById("videoModal");
	const ytFrame = document.getElementById("youtubeFrame");
	const video = document.getElementById("mainVideo");
	const controls = document.getElementById("videoControls");

	document.getElementById("playerTitle").textContent = "NOW PLAYING: " + title;
	showToast("Loading", "Searching for trailer...");
	modal.classList.add("active");

	const ytKey = await fetchTrailerKey(id, type);

	if (ytKey) {
		showToast("Success", "Trailer found. Playing from YouTube.");
		video.style.display = "none";
		controls.classList.add("hidden");
		ytFrame.classList.add("active");

		// Force Autoplay permissions
		ytFrame.setAttribute(
			"allow",
			"autoplay; encrypted-media; gyroscope; picture-in-picture"
		);

		// Add Autoplay parameters
		ytFrame.src = `https://www.youtube.com/embed/${ytKey}?autoplay=1&mute=0&rel=0&showinfo=0&modestbranding=1`;
	} else {
		showToast("Notice", "No trailer found. Playing demo reel.");
		ytFrame.classList.remove("active");
		ytFrame.src = "";
		video.style.display = "block";
		controls.classList.remove("hidden");
		video.src = fallbackUrl;

		video
			.play()
			.then(() => updatePlayIcon(true))
			.catch(() => updatePlayIcon(false));

		update_interval = setInterval(updateProgressDisplay, 500);
	}
}

function closePlayer() {
	const video = document.getElementById("mainVideo");
	const ytFrame = document.getElementById("youtubeFrame");
	video.pause();
	video.src = "";
	ytFrame.src = "";
	ytFrame.classList.remove("active");
	document.getElementById("videoModal").classList.remove("active");
	updatePlayIcon(false);
	clearInterval(update_interval);
}

function scrollRow(row_id, direction) {
	const container = document.getElementById(row_id);
	const amount = container.clientWidth * 0.7;
	container.scrollBy({
		left: direction === "left" ? -amount : amount,
		behavior: "smooth"
	});
}

function showToast(title, message) {
	const container = document.getElementById("toastContainer");
	const toast = document.createElement("div");
	toast.className = "toast";
	toast.innerHTML = `<div class="toast-icon"><i class="fas fa-info-circle"></i></div><div class="toast-content"><div class="toast-title">${title}</div><div class="toast-message">${message}</div></div>`;
	container.appendChild(toast);
	setTimeout(() => {
		toast.classList.add("hiding");
		toast.addEventListener("animationend", () => toast.remove());
	}, 5000);
}

function openInfoModal(section_id) {
	const source = document.getElementById(`content_${section_id}`);
	const body = document.getElementById("infoBody");
	const modal = document.getElementById("infoModal");
	const container = modal.querySelector(".details-container");
	if (source) {
		body.style.opacity = 0;
		body.style.transform = "translateY(10px)";
		setTimeout(() => {
			body.innerHTML = source.innerHTML;
			body.style.transition = "opacity 0.3s ease, transform 0.3s ease";
			body.style.opacity = 1;
			body.style.transform = "translateY(0)";
		}, 100);
		modal.classList.add("active");
		container.classList.add("active");
	}
}

function closeInfoModal() {
	const modal = document.getElementById("infoModal");
	const container = modal.querySelector(".details-container");
	container.classList.remove("active");
	setTimeout(() => modal.classList.remove("active"), 300);
}

function scrollToSection(id) {
	if (document.getElementById("tvSection").style.display === "none") {
		resetHome();
		setTimeout(() => {
			const el = document.getElementById(id);
			if (el) el.scrollIntoView({ behavior: "smooth" });
		}, 100);
	} else {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: "smooth" });
	}
}

function shareTwitter() {
	const shareUrl = "https://codepen.io/Julibe/full/raLjMLZ/";
	const viaUser = "Julibe";
	const messages = [
		"EXT. DIGITAL THEATER - NIGHT. Movieverse premieres. The screen glows. 🎬",
		"INT. SCREENING ROOM. Every click a scene. Every scroll a story. 🍿",
		"POV: You’re inside a living cinematic universe. ✨",
		"THE DIRECTOR (O.S.): 'Cut! This experience deserves a standing ovation.' 📽️",
		"FADE IN: Lights dim, motion rises, magic unfolds. 🌌",
		"SLOW ZOOM: Each poster a portal, every interaction a scene."
	];
	const hashtagsList = [
		"cinema",
		"blockbuster",
		"movieverse",
		"premiere",
		"film",
		"hollywood",
		"movienight",
		"screening",
		"cinematic",
		"storytelling",
		"epic",
		"trailer",
		"director",
		"lightscameraaction",
		"filmlover"
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

function togglePlay() {
	const video = document.getElementById("mainVideo");
	if (video.style.display === "none") return;
	if (video.paused) {
		video.play();
		updatePlayIcon(true);
	} else {
		video.pause();
		updatePlayIcon(false);
	}
}

function updatePlayIcon(is_playing) {
	document.getElementById("playIcon").className = is_playing
		? "fas fa-pause"
		: "fas fa-play";
	document
		.getElementById("centerPlayBtn")
		.classList.toggle("visible", !is_playing);
}

function updateProgressDisplay() {
	const video = document.getElementById("mainVideo");
	if (video.duration) {
		const pct = (video.currentTime / video.duration) * 100;
		document.getElementById("progressBar").style.width = `${pct}%`;
		const cur_mins = Math.floor(video.currentTime / 60);
		const cur_secs = Math.floor(video.currentTime % 60);
		const dur_mins = Math.floor(video.duration / 60);
		const dur_secs = Math.floor(video.duration % 60);
		document.getElementById(
			"timeDisplay"
		).textContent = `${cur_mins}:${cur_secs
			.toString()
			.padStart(2, "0")} / ${dur_mins}:${dur_secs.toString().padStart(2, "0")}`;
	}
}

function seek(e) {
	const video = document.getElementById("mainVideo");
	if (video.style.display === "none") return;
	const rect = e.currentTarget.getBoundingClientRect();
	const pct = (e.clientX - rect.left) / rect.width;
	if (video.duration) {
		video.currentTime = pct * video.duration;
		updateProgressDisplay();
	}
}

function toggleMute() {
	const video = document.getElementById("mainVideo");
	video.muted = !video.muted;
	document.getElementById("muteIcon").className = video.muted
		? "fas fa-volume-mute"
		: "fas fa-volume-up";
}

function toggleFullscreen() {
	const container = document.getElementById("videoContainer");
	if (!document.fullscreenElement) container.requestFullscreen();
	else document.exitFullscreen();
}

function attachTiltEffect() {
	document.querySelectorAll(".card").forEach((card) => {
		card.addEventListener("mousemove", (e) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -15;
			const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 15;
			card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
		});
		card.addEventListener(
			"mouseleave",
			() =>
				(card.style.transform =
					"perspective(1000px) rotateX(0) rotateY(0) scale(1)")
		);
	});
}

document.addEventListener("DOMContentLoaded", () => {
	const dot = document.querySelector(".cursor-dot");
	const outline = document.querySelector(".cursor-outline");
	window.addEventListener("mousemove", (e) => {
		dot.style.left = `${e.clientX}px`;
		dot.style.top = `${e.clientY}px`;
		outline.animate(
			{
				left: `${e.clientX}px`,
				top: `${e.clientY}px`
			},
			{
				duration: 500,
				fill: "forwards"
			}
		);
	});
	new MutationObserver(() => {
		document
			.querySelectorAll("a, button, .card, .sidebar-icon, .close-btn")
			.forEach((el) => {
				el.onmouseenter = () => document.body.classList.add("hovering");
				el.onmouseleave = () => document.body.classList.remove("hovering");
			});
	}).observe(document.body, {
		childList: true,
		subtree: true
	});
});

window.onload = () => {
	initApp();
	window.onscroll = () => {
		document
			.getElementById("navbar")
			.classList.toggle("scrolled", window.scrollY > 50);
		const btn = document.getElementById("scrollTopBtn");
		if (window.scrollY > 500) btn.classList.add("visible");
		else btn.classList.remove("visible");
	};
};
