const canvas = document.getElementById("bg-canvas");
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	alpha: true
});

const uniforms = {
	uTime: { value: 0 },
	uColor: { value: new THREE.Color(0x090909) },
	uResolution: { value: new THREE.Vector2() },
	uMouse: { value: new THREE.Vector2(0.5, 0.5) },
	uIntensity: { value: 0.0 },
	uMode: { value: 0 }
};

const material = new THREE.ShaderMaterial({
	uniforms: uniforms,
	vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `,
	fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform float uIntensity; 
        uniform int uMode; 
        varying vec2 vUv;

        float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
        
        float noise(vec2 st) {
            vec2 i = floor(st); vec2 f = fract(st);
            float a = random(i); float b = random(i + vec2(1.0, 0.0));
            float c = random(i + vec2(0.0, 1.0)); float d = random(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }
        
        float fbm(vec2 st) {
            float value = 0.0; float amp = .5;
            for (int i = 0; i < 5; i++) { value += amp * noise(st); st *= 2.; amp *= .5; }
            return value;
        }

        float grid(vec2 st, float res) {
            vec2 grid = fract(st * res);
            return (step(0.98, grid.x*1.03) + step(0.98, grid.y*1.03));
        }

        void main() {
            vec2 st = gl_FragCoord.xy / uResolution.xy;
            float aspect = uResolution.x / uResolution.y;
            st.x *= aspect;

            vec2 mousePos = uMouse;
            mousePos.x *= aspect; 
            vec2 toMouse = st - mousePos;
            float distMouse = length(toMouse);
            float mouseInteraction = smoothstep(0.4, 0.0, distMouse);

            vec3 finalColor = vec3(0.0);
            vec2 warpSt = st; 
            
            if (uMode == 0) {
                warpSt -= toMouse * mouseInteraction * 0.05;
                warpSt.x += sin(st.y * 5.0 + uTime * 0.2) * 0.01;
            }
            else if (uMode == 1) { 
                float speed = 0.1;
                vec2 flowDistort = toMouse * mouseInteraction * 1.5;
                
                vec2 q = vec2(fbm(st + flowDistort + vec2(0.0, uTime * speed)), fbm(st + vec2(5.2, 1.3)));
                vec2 r = vec2(fbm(st + 4.0 * q + vec2(uTime * speed)), fbm(st + 4.0 * q + vec2(5.2)));
                float f = fbm(st + 4.0 * r);
                
                warpSt += r * 0.1 * uIntensity;
                vec3 psychedelic = mix(uColor, uColor * 1.8, f); 
                finalColor += psychedelic * f * f * uIntensity;
            } 
            else if (uMode == 2) {
                float speed = 1.5;
                warpSt += toMouse * mouseInteraction * 0.2;
                
                float fire = fbm(st * 4.0 + vec2(0.0, -uTime * speed)); 
                warpSt.x += fire * 0.05 * uIntensity; 
                warpSt.y += fire * 0.08 * uIntensity;
                
                float heat = smoothstep(0.0, 1.0, fire);
                
                vec3 cRed = vec3(0.8, 0.1, 0.0);
                vec3 cOrange = vec3(1.0, 0.5, 0.0);
                vec3 cYellow = vec3(1.0, 0.9, 0.2);
                vec3 fireCol = mix(cRed, cOrange, heat);
                fireCol = mix(fireCol, cYellow, smoothstep(0.5, 1.0, heat));
                
                finalColor += fireCol * heat * (1.4 - vUv.y) * 0.8 * uIntensity; 
            }
            else if (uMode == 3) {
                float t = uTime * 0.3;
                vec2 q = st * vec2(1.0, 0.5); 
                
                float aurora = 0.0;
                for(float i = 1.0; i < 4.0; i++) {
                    float wavy = sin(q.x * 2.0 * i + t * i) * 0.3;
                    wavy += mouseInteraction * 0.2 * sin(uTime * 5.0);
                    float y = q.y - 0.3 - wavy * 0.2;
                    float band = smoothstep(0.0, 0.1, y) * smoothstep(0.6, 0.1, y);
                    float n = fbm(q * 10.0 * i + vec2(0.0, t * 2.0));
                    aurora += band * n * (1.0 / i);
                }

                warpSt += vec2(0.0, aurora) * 0.2 * uIntensity;
                
                vec3 colA = vec3(0.0, 1.0, 0.1); 
                vec3 colB = vec3(0.0, 0.9, 0.6); 
                vec3 finalAurora = mix(colA, colB, st.x + sin(t));
                
                finalColor += finalAurora * aurora * 0.6 * uIntensity;
                finalColor += uColor * mouseInteraction * 0.3;
            }
            else if (uMode == 4) {
                float speed = 0.1;
                warpSt -= toMouse * mouseInteraction * 0.3;
                vec2 q = vec2(fbm(st + speed*uTime), fbm(st + vec2(1.0)));
                float f = fbm(st + q + uTime*speed);
                warpSt += f * 0.5 * uIntensity;
                finalColor += uColor * f * 0.6 * uIntensity;
            }
            else if (uMode == 5) {
                vec2 vortexCenter = vec2(aspect, 0.0);
                vec2 toCenter = st - vortexCenter;
                float len = length(toCenter);
                float angle = atan(toCenter.y, toCenter.x);
                float twist = len * 10.0 - uTime * 2.0;
                twist += mouseInteraction * 5.0; 
                float f = sin(angle * 5.0 + twist);
                warpSt += vec2(cos(f), sin(f)) * 0.05 * uIntensity;
                finalColor += uColor * smoothstep(0.0, 1.0, f) * (1.0 - len) * 0.5 * uIntensity;
            }

            float g = grid(warpSt, 20.0); 
            vec3 gridBase = vec3(0.15); 
            vec3 gridActive = uColor * 0.8;
            vec3 finalGridCol = mix(gridBase, gridActive, uIntensity * 0.8);
            finalColor += vec3(g) * finalGridCol;

            float dist = distance(vUv, vec2(0.5));
            finalColor *= 1.0 - dist * 0.6;

            gl_FragColor = vec4(finalColor, 1.0);
        }
    `
});

const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
scene.add(plane);

function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	renderer.setSize(width, height);
	uniforms.uResolution.value.set(width, height);
}
window.addEventListener("resize", resize);
resize();

window.addEventListener("mousemove", (e) => {
	const x = e.clientX / window.innerWidth;
	const y = 1.0 - e.clientY / window.innerHeight;
	uniforms.uMouse.value.set(x, y);
});

let targetColor = new THREE.Color(0x050505);
const defaultColor = new THREE.Color(0x050505);
let targetIntensity = 0.0;

function animate(time) {
	requestAnimationFrame(animate);
	uniforms.uTime.value = time * 0.001;
	uniforms.uColor.value.lerp(targetColor, 0.04);
	uniforms.uIntensity.value +=
		(targetIntensity - uniforms.uIntensity.value) * 0.05;
	renderer.render(scene, camera);
}
requestAnimationFrame(animate);

setTimeout(() => {
	canvas.style.opacity = 1;
}, 100);

const cards = document.querySelectorAll(".app-card");
cards.forEach((card) => {
	card.addEventListener("mouseenter", () => {
		const hex = card.getAttribute("data-hex");
		const mode = parseInt(card.getAttribute("data-mode") || 0);
		if (hex) targetColor.set(hex);
		uniforms.uMode.value = mode;
		targetIntensity = 1.0;
	});
	card.addEventListener("mouseleave", () => {
		targetColor.copy(defaultColor);
		targetIntensity = 0.0;
	});
});

function shareHub() {
	const shareUrl = "https://codepen.io/Julibe/full/yyOELbR";
	const viaUser = "Julibe";

	const messages = [
		"DevDesk: The ultimate developer suite for styling, refactoring, and text magic. 🚀",
		"Create faster with DevDesk. A stunning 3D dashboard with essential dev tools. ✨",
		"Classify, Refacta, TXTLY. Your new favorite web dev utilities in one place. 🔥",
		"Web design meets WebGL. Check out the DevDesk toolkit. 💻",
		"Stop wrestling with CSS and data. Let DevDesk handle the heavy lifting. 🛠️",
		"A visual DOM builder and modular pipeline? Yes please! Check out DevDesk. 🎨"
	];

	const hashtagsList = [
		"web dev",
		"css",
		"java script",
		"three js",
		"front end",
		"creative coding",
		"ui design",
		"web gl",
		"dev tools",
		"productivity"
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
