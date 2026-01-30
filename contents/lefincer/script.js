const app_config = {
	brand_name: "Lefincer",
	via_handle: "Julibe",
	chart_values: [65, 85, 70, 90, 80, 95, 85],
	metric_targets: {
		user_count: 15824,
		volume_str: "2B+",
		satisfaction_val: 98,
		startup_count: 3200
	},
	badge_text: "Join 3,200+ scaling startups",
	projected_revenue: 5797,
	growth_pct: "24.5%",
	particle_count: 2200,
	particle_color: "#ec4899",
	blob_colors: ["#ec4899", "#8b5cf6", "#34d399"]
};
let metrics_animated = false;
let particle_scene, particle_camera, particle_renderer, particle_stars;
const testimonials_data = [
	{
		name: "Alex Morgan",
		role: "CEO, TechScale Inc.",
		content:
			"Lefincer saved us 40 hours per month on financial ops. Revenue tracking became effortless.",
		avatar_url: "https://randomuser.me/api/portraits/women/44.jpg",
		revenue: "2.4M"
	},
	{
		name: "Sarah Chen",
		role: "Founder, EcomBoost",
		content:
			"From messy spreadsheets to automated insights. Our financial clarity improved 10x.",
		avatar_url: "https://randomuser.me/api/portraits/women/68.jpg",
		revenue: "1.8M"
	},
	{
		name: "Marcus Rodriguez",
		role: "CFO, GrowthLabs",
		content:
			"The AI predictions helped us optimize cash flow and reduce burn rate by 35%.",
		avatar_url: "https://randomuser.me/api/portraits/men/32.jpg",
		revenue: "5.2M"
	}
];

function initThreeBackground() {
	const container_el = document.getElementById("bg-particles");
	particle_scene = new THREE.Scene();
	particle_camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	particle_renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true
	});
	particle_renderer.setSize(window.innerWidth, window.innerHeight);
	container_el.appendChild(particle_renderer.domElement);
	const star_geo = new THREE.BufferGeometry();
	const star_pos = new Float32Array(app_config.particle_count * 3);
	for (let i = 0; i < app_config.particle_count * 3; i++) {
		star_pos[i] = (Math.random() - 0.5) * 850;
	}
	star_geo.setAttribute("position", new THREE.BufferAttribute(star_pos, 3));
	const star_mat = new THREE.PointsMaterial({
		color: app_config.particle_color,
		size: 0.9,
		transparent: true,
		opacity: 0.5,
		blending: THREE.AdditiveBlending
	});
	particle_stars = new THREE.Points(star_geo, star_mat);
	particle_scene.add(particle_stars);
	particle_camera.position.z = 1;
	animateThree();
}

function animateThree() {
	requestAnimationFrame(animateThree);
	particle_stars.rotation.y += 0.00035;
	particle_stars.rotation.x += 0.00015;
	particle_renderer.render(particle_scene, particle_camera);
}

function renderChart() {
	const wrap_el = document.getElementById("bar_wrap");
	const data_values = app_config.chart_values;
	const label_list = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	wrap_el.innerHTML = "";
	data_values.forEach((val, i) => {
		const group_el = document.createElement("div");
		group_el.style.flex = "1";
		group_el.style.height = "100%";
		group_el.style.display = "flex";
		group_el.style.flexDirection = "column";
		group_el.style.justifyContent = "flex-end";
		group_el.style.alignItems = "center";
		group_el.style.gap = "0.5rem";
		const bar_el = document.createElement("div");
		bar_el.style.width = "60%";
		bar_el.style.borderRadius = "6px 6px 0 0";
		bar_el.style.background =
			i === 5 ? "var(--primary)" : "rgba(255,255,255,0.06)";
		bar_el.style.transition = "height 1.4s cubic-bezier(0.19, 1, 0.22, 1)";
		bar_el.style.height = "0%";
		const lbl_el = document.createElement("div");
		lbl_el.innerText = label_list[i];
		lbl_el.style.fontSize = "0.65rem";
		lbl_el.style.color = "var(--gray-500)";
		lbl_el.style.fontWeight = "700";
		group_el.appendChild(bar_el);
		group_el.appendChild(lbl_el);
		wrap_el.appendChild(group_el);
		requestAnimationFrame(() => {
			setTimeout(() => {
				bar_el.style.height = val + "%";
			}, i * 120 + 100);
		});
	});
}

function initActivity() {
	const feed_el = document.getElementById("activity_feed");
	const activity_list = [
		{
			t: "AWS Node Payment",
			h: "4 min ago",
			c: "var(--red)",
			v: "-$420.00"
		},
		{
			t: "Enterprise Inbound",
			h: "1 hour ago",
			c: "var(--emerald)",
			v: "+$14,500.00"
		},
		{
			t: "Scale Tier Upgrade",
			h: "3 hours ago",
			c: "var(--blue)",
			v: "+$899.00"
		},
		{
			t: "SaaS Integration",
			h: "5 hours ago",
			c: "var(--red)",
			v: "-$2,100.00"
		}
	];
	feed_el.innerHTML = activity_list
		.map(
			(i) => `
                <div class="entry">
                    <div class="icon-circle"><span class="material-symbols-rounded">update</span></div>
                    <div class="info"><div class="msg">${
																					i.t
																				}</div><div class="time">${i.h}</div></div>
                    <div class="amount" style="color: ${
																					i.v.includes("+") ? "var(--emerald)" : "var(--white)"
																				}">${i.v}</div>
                </div>`
		)
		.join("");
}

function initTestimonials() {
	const list_el = document.getElementById("testimonials_list");
	list_el.innerHTML = testimonials_data
		.map(
			(t) => `
                <li class="splide__slide">
                    <div class="testimonial-card">
                        <div class="user-info">
                            <img src="${t.avatar_url}" class="avatar" alt="${
				t.name
			}">
                            <div class="details">
                                <div class="name">${t.name}</div>
                                <div class="role">${t.role}</div>
                                <div class="rev-badge"><span class="material-symbols-rounded" style="font-size: 0.8rem">bolt</span> $${
																																	t.revenue
																																} ARR</div>
                            </div>
                        </div>
                        <p class="quote">"${t.content}"</p>
                        <div class="stars">${Array(5)
																									.fill(
																										'<span class="material-symbols-rounded">star</span>'
																									)
																									.join("")}</div>
                    </div>
                </li>`
		)
		.join("");
	new Splide("#testimonial_slider", {
		type: "loop",
		perPage: 1,
		autoplay: true,
		interval: 5000,
		arrows: true,
		pagination: true,
		gap: "2.5rem",
		easing: "cubic-bezier(0.16, 1, 0.3, 1)",
		speed: 800
	}).mount();
}

function animateCounter(id_key, target_num, suffix_str = "", is_float = false) {
	let start_val = 0;
	const counter_el = document.getElementById(id_key);
	if (!counter_el) return;
	const step_val = target_num / 60;
	const interval_id = setInterval(() => {
		start_val += step_val;
		if (start_val >= target_num) {
			counter_el.innerText =
				(is_float
					? target_num.toFixed(1)
					: Math.floor(target_num).toLocaleString()) + suffix_str;
			clearInterval(interval_id);
		} else {
			counter_el.innerText =
				(is_float ? start_val.toFixed(1) : Math.floor(start_val).toLocaleString()) +
				suffix_str;
		}
	}, 16);
}

function initTilt() {
	const ui_el = document.getElementById("ui_card");
	ui_el.addEventListener("mousemove", (e) => {
		if (window.innerWidth < 1024) return;
		const rect_box = ui_el.getBoundingClientRect();
		const mouse_x = (e.clientX - rect_box.left) / rect_box.width - 0.5;
		const mouse_y = (e.clientY - rect_box.top) / rect_box.height - 0.5;
		ui_el.style.transition = "none";
		ui_el.style.transform = `rotateX(${-mouse_y * 12}deg) rotateY(${
			mouse_x * 12
		}deg) scale3d(1.02, 1.02, 1.02)`;
	});
	ui_el.addEventListener("mouseleave", () => {
		ui_el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
		ui_el.style.transform = "rotateX(0) rotateY(0) scale3d(1, 1, 1)";
	});
}

function checkScroll() {
	if (metrics_animated) return;
	const stats_el = document.querySelector(".stats-bar");
	if (stats_el.getBoundingClientRect().top < window.innerHeight - 100) {
		metrics_animated = true;
		const m = app_config.metric_targets;
		animateCounter("count_users", m.user_count);
		animateCounter("count_vol_str", 2, "B+", true);
		animateCounter("count_sat", m.satisfaction_val);
		animateCounter("count_startup", m.startup_count, "+");
		animateCounter("rev_counter", app_config.projected_revenue);
		renderChart();
	}
}

function openModal(id_key) {
	const body_el = document.getElementById("modal_body");
	const tpl_el = document.getElementById("tpl-" + id_key);
	body_el.innerHTML = "";
	body_el.appendChild(tpl_el.content.cloneNode(true));
	document.getElementById("project_modal").classList.add("active");
	document.body.classList.add("modal-open");
}

function closeModal() {
	document.getElementById("project_modal").classList.remove("active");
	document.body.classList.remove("modal-open");
}
function shareTwitter() {
	const share_url = "https://codepen.io/Julibe/full/YPWpqXE";
	const via_user = "Julibe";
	const current_year = 2026;
	const messages = [
		"Scaling my financial ops with Lefincer. Next-level fintech design! 🚀",
		"Finally, a financial OS that looks as good as it performs. Check out Lefincer.",
		"Predictive modeling and real-time treasury. Lefincer is the future of FinOps.",
		"Just explored Lefincer by @Julibe. The architectural precision is insane!",
		"Say goodbye to fragmented capital flows. Lefincer has arrived. 💎",
		"Mastering capital velocity with the new Lefincer interface. Highly recommended."
	];

	const hashtags_list = [
		"Fintech",
		"FinOps",
		"UIUX",
		"DesignSystem",
		"WebDev",
		"StartupLife",
		"FinancialOS",
		"CapitalVelocity",
		"NeuralForecasting",
		"Julibe",
		"CreativeCoding",
		"TechInnovation"
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
}

function playConfetti() {
	confetti({
		particleCount: 180,
		spread: 90,
		origin: {
			y: 0.65
		},
		colors: ["#ec4899", "#f472b6", "#8b5cf6", "#ffffff"],
		ticks: 300
	});
}
window.onload = () => {
	document.getElementById("hero_badge").innerText = app_config.badge_text;
	initThreeBackground();
	initActivity();
	initTestimonials();
	initTilt();
	window.addEventListener("scroll", checkScroll);
	checkScroll();
	window.addEventListener("resize", () => {
		particle_camera.aspect = window.innerWidth / window.innerHeight;
		particle_camera.updateProjectionMatrix();
		particle_renderer.setSize(window.innerWidth, window.innerHeight);
	});
};
