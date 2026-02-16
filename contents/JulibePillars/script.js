(function () {
	// ---------- FULL MODAL DATA (from markdown files) ----------
	const MODAL_SLIDES = {
		en: {
			"cognitive-clarity": {
				title: "Cognitive Clarity",
				color: "#714674",
				audioFile: "ux",
				slides: [
					{
						text:
							'You may already have awesome <strong class="accent-text">Branding</strong>;<br>\n' +
							'now let’s add the <strong class="accent-text">Visual Logic</strong>.<br><br>\n' +
							'People should not have to think while using your <strong class="accent-text">UI</strong>,<br>\n' +
							"They should just know!",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 0,
						end: 158
					},
					{
						text:
							"No more puzzle-solving. No guessing.<br>\n" +
							'<strong class="accent-text">Context, Consistency</strong> and <strong class="accent-text">Hierarchy</strong> are key!<br><br>\n' +
							"Your interface should feel like second nature.<br>\n" +
							'<strong class="accent-text">Effortless. Intuitive. Easy.</strong>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 158,
						end: 316
					},
					{
						text:
							"Let’s give users back control by delivering the<br>\n" +
							'<strong class="accent-text">right information</strong> at the exact moment they need it.<br><br>\n' +
							'<strong class="accent-text">One click. No stress. No wasted time.</strong>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 316,
						end: 474
					},
					{
						text:
							'And let’s never forget <strong class="accent-text">accessibility and usability</strong>.<br>\n' +
							'<em class="accent-text cta-footnote">If it’s not for everyone, it’s not for anyone.</em><br><br>\n' +
							"We aren’t building for SEO bots, greedy algorithms,<br>\n" +
							"useless automation, or mindless AI slop.<br><br>\n" +
							'We are building for <strong class="accent-text">humans</strong>!',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 474,
						end: 632
					}
				]
			},

			"emotional-resonance": {
				title: "Emotional Resonance",
				color: "#2a9d8f",
				audioFile: "ux",
				slides: [
					{
						text:
							'Now, this is how you make it matter: add <strong class="accent-text">Brand Value</strong>! <br>\n' +
							"A product that just 'works' is okay, but it is a commodity.<br><br>\n" +
							'But a product that <strong class="accent-text">connects</strong>?<br>\n' +
							'Now... That is a <strong class="accent-text">SuperPower</strong>.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 632,
						end: 811
					},
					{
						text:
							"We need a voice that harmonizes with your brand.<br><br>\n" +
							"A product that is not only good-looking,<br>\n" +
							'but <strong class="accent-text">balanced, enjoyable, and genuinely useful</strong>.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 811,
						end: 990
					},
					{
						text:
							"Let’s move beyond generic 'feature lists' and the typical 'About Us'... <br><br>\n" +
							'Instead, let’s build something <strong class="accent-text">Desirable and Findable</strong>.<br>\n' +
							'<em class="accent-text cta-footnote">Because if users cannot find it, it doesn’t exist!</em>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 990,
						end: 1169
					},
					{
						text:
							'This is about <strong class="accent-text">meaning</strong>.<br><br>\n' +
							"About creating something so valuable that users wouldn’t want to go anywhere else.<br><br>\n" +
							"Why settle for boring, sterile, mindless corporate noise<br>\n" +
							'when we can focus on what is <strong class="accent-text">Meaningful</strong>?',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1169,
						end: 1348
					}
				]
			},

			"organic-growth": {
				title: "Organic Growth",
				color: "#38b000",
				audioFile: "ux",
				slides: [
					{
						text:
							'This is all about <strong class="accent-text">Trust</strong> over Tactics.<br><br>\n' +
							"Let’s be honest: people are exhausted by the noise, right?<br>\n" +
							"They don’t want another 'sales pitch' or 'clever tricks';<br><br>\n" +
							'They want a <strong class="accent-text">genuine solution</strong> that actually helps them.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1348,
						end: 1548
					},
					{
						text:
							"We need to stop trying to 'trick a click.'<br>\n" +
							"Stop obsessing over 'capturing leads';<br><br>\n" +
							'Start building <strong class="accent-text">authentic relationships</strong> through <strong class="accent-text">thoughtful design</strong>.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1548,
						end: 1748
					},
					{
						text:
							"When you respect your users, their intelligence,<br>\n" +
							"and their time, and treat them like people...<br><br>\n" +
							'<strong class="accent-text">Trust me, they stick around.</strong>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1748,
						end: 1948
					},
					{
						text:
							'<h3 class="accent-text font-display modal-slide-subtitle">So, will your product add to the noise,<br>\n' +
							"or rise above it?</h3>",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1948,
						end: 2148
					}
				]
			},

			"high-velocity": {
				title: "High-Velocity Workflow",
				color: "#7c4dff",
				audioFile: "ai",
				slides: [
					{
						text:
							'This is about delivering <strong class="accent-text">high-quality work</strong>, faster.<br>\n' +
							"We don’t have to waste time on the boring stuff.<br><br>\n" +
							"We use AI to debug code instantly and refine copywriting in seconds.",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 0,
						end: 133
					},
					{
						text:
							'But remember: <strong class="accent-text">AI is a tool.</strong><br><br>\n' +
							'<strong class="accent-text font-subdisplay">Like a hammer</strong><br>\n' +
							"And a hammer doesn’t build a house.<br>\n" +
							'<strong class="accent-text">The carpenter does.</strong><br><br>\n' +
							"Because we know how to wield the tool,<br>\n" +
							"we can build stronger and faster without ever sacrificing the experience.",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 133,
						end: 266
					},
					{
						text:
							'We use the speed of the machine to buy more time for <strong class="accent-text">what matters</strong>.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 266,
						end: 400
					}
				]
			},

			"creative-acceleration": {
				title: "Creative Acceleration",
				color: "#ef233c",
				audioFile: "ai",
				slides: [
					{
						text:
							'Don’t just generate. <strong class="accent-text">Enhance. Iterate. Dream.</strong><br><br>\n' +
							"We don’t use AI to spit out a final result;<br>\n" +
							"we use it to break creative blocks.",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 400,
						end: 533
					},
					{
						text:
							"Why settle for one idea when we can explore dozens<br>\n" +
							"in the time it usually takes to draw one?<br><br>\n" +
							'We push <strong class="accent-text">visual boundaries</strong> and prototype at high speed.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 533,
						end: 666
					},
					{
						text:
							"The machine brings the raw material.<br>\n" +
							'<strong class="accent-text">We bring the Vision.</strong><br><br>\n' +
							"It’s not about accepting the first output a prompt spits out.<br>\n" +
							'It’s about refining, directing, and shaping it until it becomes <strong class="accent-text">Intentional</strong>.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 666,
						end: 800
					}
				]
			},

			"augmented-intelligence": {
				title: "Augmented Intelligence",
				color: "#3a86ff",
				audioFile: "ai",
				slides: [
					{
						text:
							'It’s not replacement. It’s <strong class="accent-text">Collaboration</strong>.<br><br>\n' +
							"Many companies use AI to cut corners.<br>\n" +
							"To replace the artist.<br><br>\n" +
							'<strong class="accent-text">And the result?</strong><br>\n' +
							"You’ve seen it. Cold and empty.",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 800,
						end: 933
					},
					{
						text:
							'<strong class="accent-text">Let’s do it differently</strong><br>\n' +
							"Let the AI handle the repetition, the data crunching, and the patterns.<br><br>\n" +
							"This frees us up to focus 100% on what machines cannot replicate:",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 933,
						end: 1066
					},
					{
						text:
							'<strong class="accent-text">Empathy. Taste. Soul.</strong><br>\n' +
							"We use technology so the human connection shines brighter.",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1066,
						end: 1200
					}
				]
			},

			"adaptive-ecosystems": {
				title: "Adaptive Ecosystems",
				color: "#8338ec",
				audioFile: "ai",
				slides: [
					{
						text:
							'The end of "<strong class="accent-text">one-size-fits-all</strong>."<br>\n' +
							"Websites used to be static brochures.<br><br>\n" +
							'<strong class="accent-text">Now, we build living systems.</strong>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1200,
						end: 1333
					},
					{
						text:
							"Interfaces that learn. Experiences that adapt.<br>\n" +
							"Journeys that respond to behavior and context.<br>\n" +
							'We move from "hoping they like it" to  "<strong class="accent-text">knowing they need it.</strong>."',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1333,
						end: 1466
					},
					{
						text:
							"It’s not about using AI everywhere.<br>\n" +
							'It’s about <strong class="accent-text">us</strong> using it with intention.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1466,
						end: 1600
					},
					{
						text:
							"Stop using AI to create more noise.<br>\n" +
							'<strong class="accent-text">Start using it to create more value.</strong><br><br>\n' +
							"Don’t settle for 'Artificial.' Let’s aim for <strong class=\"accent-text\">Intelligent</strong>.",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1600,
						end: 1733
					},
					{
						text:
							'<h3 class="accent-text font-display modal-slide-subtitle">So, are you going to let the algorithm run your brand,<br>\n' +
							"or are you going to use it to lead the way?</h3>",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1733,
						end: 1866
					}
				]
			},

			"cognitive-real-estate": {
				title: "Cognitive Real Estate",
				color: "#ffbe0b",
				audioFile: "game",
				slides: [
					{
						text:
							'Now you are buying impressions and earning <strong class="accent-text">time</strong>!<br><br>\n' +
							"While competitors settle for a 3s glance,<br>\n" +
							'you are unlocking <strong class="accent-text">30+ seconds</strong> or even more<br>\n' +
							'of focused interaction and <strong class="accent-text">immersion</strong>.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 0,
						end: 200
					},
					{
						text:
							"Forget banner blindness! No passive consumption.<br><br>\n" +
							'<strong class="accent-text">Just you. Your brand. Your products. Center stage!</strong>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 200,
						end: 400
					}
				]
			},

			"brand-recognition": {
				title: "Brand Recognition",
				color: "#fb5607",
				audioFile: "game",
				slides: [
					{
						text:
							'What you need is <strong class="accent-text">Differentiation</strong>.<br><br>\n' +
							"A digital store is a must,<br>\n" +
							"but let’s be honest, it’s a passive experience.<br><br>\n",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 400,
						end: 600
					},
					{
						text:
							'What about a <strong class="accent-text">branded experience</strong>?<br><br>\n' +
							'Now, that tells a story! A <strong class="accent-text">memorable story</strong>!',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 400,
						end: 600
					},
					{
						text:
							"We need make sure your clients actually<br>\n" +
							"remember who you are long after they leave.<br><br>\n" +
							'Let’s live rent-free in your <strong class="accent-text">clients’ minds for weeks!</strong>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 600,
						end: 800
					}
				]
			},

			"organic-data": {
				title: "Organic Data",
				color: "#00e676",
				audioFile: "game",
				slides: [
					{
						text:
							"Today, users are more protective of their data than ever.<br><br>\n" +
							"Forget the often ignored 'Sign up for 10% off'<br>\n" +
							"and those annoying pop-ups.",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 800,
						end: 1066
					},
					{
						text:
							'Instead of interrupting? <strong class="accent-text">Let’s invite</strong>.<br>\n' +
							'Instead of extracting? <strong class="accent-text">Let’s exchange</strong>.<br>\n' +
							"Instead of relying on questionable third-party data",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1066,
						end: 1333
					},
					{
						text:
							'<em class="cta-footnote">what if we just...<br>\n' +
							"and hear me out for a sec...</em><br><br>\n" +
							'What if we <strong class="accent-text">just ask?</strong>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1333,
						end: 1466
					},
					{
						text:
							'We need to build a <strong class="accent-text">conversation</strong> with thousands of users.<br>\n' +
							'A conversation built on <strong class="accent-text">trust</strong> by exchanging a<br>\n' +
							"unique, fun experience for information.<br>\n" +
							'<em class="accent-text cta-footnote">Maybe a prize or two to sweeten the deal!</em>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1333,
						end: 1466
					},
					{
						text:
							"Your clients will know you are<br>\n" +
							'<strong class="accent-text">Transparent. Honest, Intentional, Cultivated & Authentic.</strong>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1466,
						end: 1600
					},
					{
						text:
							'Stop fighting for attention! <strong class="accent-text">Start owning it!</strong><br><br>\n' +
							'That is how you build <strong class="accent-text">trust at scale</strong> and turn attention into <strong class="accent-text">long-term loyalty</strong>.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1600,
						end: 1733
					},
					{
						text:
							'<h3 class="accent-text font-display modal-slide-subtitle">So, are you ready to turn your brand into a <strong class="accent-text">destination</strong>,<br>\n' +
							"or remain just another swipe?</h3>",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1733,
						end: 1866
					}
				]
			}
		},
		es: {
			"cognitive-clarity": {
				title: "Claridad Cognitiva",
				color: "#ff6b35",
				audioFile: "ux",
				slides: [
					{
						text:
							'Puede que ya tengas un <strong class="accent-text">branding</strong> increíble;<br>\n' +
							'ahora sumémosle <strong class="accent-text">Lógica Visual</strong>.<br><br>\n' +
							'Las personas no deberían tener que pensar mientras usan tu <strong class="accent-text">UI</strong>. Simplemente deberían entenderla.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 0,
						end: 158
					},
					{
						text:
							"Nada de resolver acertijos. Nada de adivinar.<br>\n" +
							'<strong class="accent-text">Contexto</strong>, <strong class="accent-text">Consistencia</strong> y <strong class="accent-text">Jerarquía</strong> lo son todo.<br><br>\n' +
							"Tu interfaz debe sentirse natural. Fluida.<br>\n" +
							'<strong class="accent-text">Intuitiva</strong>. Fácil.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 158,
						end: 316
					},
					{
						text:
							"Devolvámosle el control al usuario entregándole la<br>\n" +
							'<strong class="accent-text">información correcta</strong> en el momento exacto.<br><br>\n' +
							'<strong class="accent-text">Un clic. Sin estrés. Sin perder tiempo.</strong>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 316,
						end: 474
					},
					{
						text:
							'Y nunca olvidemos la <strong class="accent-text">accesibilidad</strong> y la <strong class="accent-text">usabilidad</strong>.<br>\n' +
							'<em class="accent-text cta-footnote">Si no es para todos, no es para nadie.</em><br><br>\n' +
							"No estamos diseñando para bots de SEO, algoritmos codiciosos,<br>\n" +
							"ni contenido automático sin alma.<br><br>\n" +
							'Estamos diseñando para <strong class="accent-text">personas</strong>!',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 474,
						end: 632
					}
				]
			},

			"emotional-resonance": {
				title: "Resonancia Emocional",
				color: "#ff4081",
				audioFile: "ux",
				slides: [
					{
						text:
							'Aquí es donde todo cobra sentido: ¡Agregaremos <strong class="accent-text">Valor de Marca</strong>! <br>\n' +
							"Un producto que solo “funciona” está bien, pero ya no es suficiente.<br><br>\n" +
							"¿Un producto que conecta?…<br>\n" +
							'Eso sí es un <strong class="accent-text">superpoder</strong>.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 632,
						end: 811
					},
					{
						text:
							"Necesitamos una voz que armonice con tu marca.<br><br>\n" +
							"Un producto no solo atractivo,<br>\n" +
							'sino equilibrado, disfrutable y realmente <strong class="accent-text">útil</strong>.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 811,
						end: 990
					},
					{
						text:
							"Vayamos más allá de las típicas listas de características y del clásico 'Quiénes somos'... <br><br>\n" +
							'Construyamos algo <strong class="accent-text">Deseable y Fácil de Encontrar</strong>.<br>\n' +
							'<em class="accent-text cta-footnote">Porque si no lo encuentran, ¡no existe!</em>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 990,
						end: 1169
					},
					{
						text:
							'Esto trata de <strong class="accent-text">significado</strong>.<br><br>\n' +
							"De crear algo tan valioso que nadie quiera irse a otro lugar.<br><br>\n" +
							"¿Para qué conformarnos con el ruido corporativo, aburrido, estéril y sin sentido<br>\n" +
							'cuando podemos crear algo verdaderamente <strong class="accent-text">significativo</strong>?',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1169,
						end: 1348
					}
				]
			},

			"organic-growth": {
				title: "Crecimiento Orgánico",
				color: "#ff6b35",
				audioFile: "ux",
				slides: [
					{
						text:
							'Aquí hablamos de <strong class="accent-text">Confianza</strong> por encima de tácticas.<br><br>\n' +
							"Seamos honestos: la gente está cansada del ruido.<br>\n" +
							"No quieren otro “discurso de ventas” ni trucos disfrazados de estrategia;<br><br>\n" +
							'Quieren una <strong class="accent-text">solución real</strong> que les ayude de verdad.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1348,
						end: 1548
					},
					{
						text:
							"Dejemos de intentar “forzar el clic”.<br>\n" +
							"Dejemos de obsesionarnos con “capturar leads”;<br><br>\n" +
							'Empecemos a construir <strong class="accent-text">relaciones auténticas</strong> a través de un <strong class="accent-text">diseño consciente</strong>.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1548,
						end: 1748
					},
					{
						text:
							"Cuando respetas a tus usuarios, su inteligencia<br>\n" +
							"y su tiempo, y los tratas como personas…<br><br>\n" +
							'<strong class="accent-text">Confía en mí, ellos se quedarán.</strong>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1748,
						end: 1948
					},
					{
						text:
							'<h3 class="accent-text font-display modal-slide-subtitle">Entonces, ¿tu producto va a sumar más ruido…<br>\n' +
							"o va a destacar?</h3>",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1948,
						end: 2148
					}
				]
			},

			"high-velocity": {
				title: "Flujo de Trabajo de Alta Velocidad",
				color: "#7c4dff",
				audioFile: "ai",
				slides: [
					{
						text:
							'Se trata de entregar <strong class="accent-text">trabajo de alta calidad</strong>, más rápido.<br>\n' +
							"No tenemos que perder tiempo en lo aburrido.<br><br>\n" +
							"Usamos IA para depurar código al instante y pulir textos en segundos.",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 0,
						end: 133
					},
					{
						text:
							'Pero recuerda: <strong class="accent-text">La IA es una herramienta.</strong><br><br>\n' +
							'<strong class="accent-text font-subdisplay">Como un martillo</strong><br>\n' +
							"Y un martillo no construye una casa.<br>\n" +
							'<strong class="accent-text">La construye el carpintero.</strong><br><br>\n' +
							"Como sabemos usar la herramienta,<br>\n" +
							"podemos construir mejor y más rápido sin sacrificar la experiencia.",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 133,
						end: 266
					},
					{
						text:
							'Usamos la velocidad de la máquina para ganar más tiempo para <strong class="accent-text">lo que realmente importa</strong>.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 266,
						end: 400
					}
				]
			},

			"creative-acceleration": {
				title: "Aceleración Creativa",
				color: "#00bcd4",
				audioFile: "ai",
				slides: [
					{
						text:
							'No solo generamos. <strong class="accent-text">Mejoramos. Iteramos. Soñamos.</strong><br><br>\n' +
							"No usamos la IA para arrojar un resultado final,<br>\n" +
							"la usamos para romper bloqueos creativos.",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 400,
						end: 533
					},
					{
						text:
							"¿Por qué quedarnos con una sola idea cuando podemos explorar decenas<br>\n" +
							"en el tiempo que antes tomaba desarrollar una?<br><br>\n" +
							'Llevamos los <strong class="accent-text">límites visuales</strong> más lejos y prototipamos a gran velocidad.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 533,
						end: 666
					},
					{
						text:
							"La máquina trae la materia prima.<br>\n" +
							'<strong class="accent-text">NOSOTROS aportamos la Visión.</strong><br><br>\n' +
							"No se trata de aceptar el primer resultado que arroja un prompt.<br>\n" +
							'Se trata de refinar, dirigir y moldear hasta que se vuelva <strong class="accent-text">Intencional</strong>.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 666,
						end: 800
					}
				]
			},

			"augmented-intelligence": {
				title: "Inteligencia Aumentada",
				color: "#7c4dff",
				audioFile: "ai",
				slides: [
					{
						text:
							'No es reemplazo. Es <strong class="accent-text">Colaboración</strong>.<br><br>\n' +
							"Muchas empresas usan la IA para recortar costos.<br>\n" +
							"Para reemplazar al creativo.<br><br>\n" +
							'<strong class="accent-text">¿El resultado?</strong><br>\n' +
							"Ya lo has visto. Frío y vacío.",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 800,
						end: 933
					},
					{
						text:
							'<strong class="accent-text">Hagámoslo diferente</strong><br>\n' +
							"Dejemos que la IA se encargue de la repetición, los datos y los patrones.<br><br>\n" +
							"Eso nos libera para enfocarnos 100% en lo que las máquinas no pueden replicar:",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 933,
						end: 1066
					},
					{
						text:
							'<strong class="accent-text">Empatía. Criterio. Alma.</strong><br>\n' +
							"Usamos la tecnología para que la conexión humana brille aún más.",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1066,
						end: 1200
					}
				]
			},

			"adaptive-ecosystems": {
				title: "Ecosistemas Adaptativos",
				color: "#00bcd4",
				audioFile: "ai",
				slides: [
					{
						text:
							'El fin del "<strong class="accent-text">talla única para todos</strong>".<br>\n' +
							"Los sitios web solían ser folletos estáticos.<br><br>\n" +
							'<strong class="accent-text">Ahora construimos sistemas vivos.</strong>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1200,
						end: 1333
					},
					{
						text:
							"Interfaces que aprenden. Experiencias que se adaptan.<br>\n" +
							"Recorridos que responden al comportamiento y al contexto.<br>\n" +
							'Pasamos de “ojalá les guste” a “<strong class="accent-text">sabemos que lo necesitan</strong>”.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1333,
						end: 1466
					},
					{
						text:
							"No se trata de usar IA en todo.<br>\n" +
							'Se trata de <strong class="accent-text">usarla con intención</strong>.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1466,
						end: 1600
					},
					{
						text:
							"Deja de usar la IA para crear más ruido.<br>\n" +
							'<strong class="accent-text">Empieza a usarla para crear más valor.</strong><br><br>\n' +
							'No te conformes con lo “Artificial”. Apunta a lo <strong class="accent-text">Inteligente</strong>.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1600,
						end: 1733
					},
					{
						text:
							'<h3 class="accent-text font-display modal-slide-subtitle">Entonces, ¿vas a dejar que el algoritmo dirija tu marca,<br>\n' +
							"o vas a usarlo para liderar el camino?</h3>",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1733,
						end: 1866
					}
				]
			},

			"cognitive-real-estate": {
				title: "Territorio Cognitivo",
				color: "#00e676",
				audioFile: "game",
				slides: [
					{
						text:
							'¡Ahora estás comprando impresiones y ganando <strong class="accent-text">tiempo</strong>!<br><br>\n' +
							"Mientras otros se conforman con una mirada fugaz de tres segundos,<br>\n" +
							'tú desbloqueas <strong class="accent-text">30 segundos o más</strong> de interacción enfocada e <strong class="accent-text">inmersión</strong> real.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 0,
						end: 200
					},
					{
						text:
							"¡Olvídate de la ceguera de banners! Nada de consumo pasivo.<br><br>\n" +
							'<strong class="accent-text">Solo tú. Tu marca. Tus productos. En el centro del escenario.</strong>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 200,
						end: 400
					}
				]
			},

			"brand-recognition": {
				title: "Reconocimiento de Marca",
				color: "#2979ff",
				audioFile: "game",
				slides: [
					{
						text:
							'Lo que necesitas es <strong class="accent-text">diferenciación</strong>.<br><br>\n' +
							"Tener una tienda digital es imprescindible,<br>\n" +
							"pero seamos honestos, es una experiencia pasiva.<br><br>\n",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 400,
						end: 600
					},
					{
						text:
							'¿Y si creamos una <strong class="accent-text">experiencia de marca</strong>?<br><br>\n' +
							'¡Ahora, eso sí cuenta una historia! ¡Una <strong class="accent-text">historia memorable</strong>!',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 400,
						end: 600
					},
					{
						text:
							"Asegurémonos de que tus clientes recuerden quién eres<br>\n" +
							"mucho después de irse.<br><br>\n" +
							'¡Dejemos una huella en la <strong class="accent-text">mente de tus clientes por semanas!</strong>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 600,
						end: 800
					}
				]
			},

			"organic-data": {
				title: "Datos Orgánicos",
				color: "#00e676",
				audioFile: "game",
				slides: [
					{
						text:
							"Hoy, los usuarios protegen sus datos más que nunca.<br><br>\n" +
							"Olvida el típico “Regístrate y obtén 10% de descuento”<br>\n" +
							"y esos molestos pop-ups que nadie quiere ver.",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 800,
						end: 1066
					},
					{
						text:
							'¿En lugar de interrumpir? <strong class="accent-text">¡Invitemos!</strong><br>\n' +
							'¿En lugar de extraer? <strong class="accent-text">¡Intercambiemos!</strong><br>\n' +
							"En vez de depender de datos dudosos de terceros",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1066,
						end: 1333
					},
					{
						text:
							'<em class="cta-footnote">¿Qué tal si... y escúchame un segundo...</em><br><br>\n' +
							'¿Y si simplemente <strong class="accent-text">preguntamos?</strong>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1333,
						end: 1466
					},
					{
						text:
							'Necesitamos construir una <strong class="accent-text">conversación</strong> con miles de usuarios.<br>\n' +
							'Una conversación basada en <strong class="accent-text">confianza</strong>,<br>\n' +
							"donde intercambiamos una experiencia única y divertida por información.<br>\n" +
							'<em class="accent-text cta-footnote">¡Quizás un premio o dos para hacerlo más atractivo!</em>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1333,
						end: 1466
					},
					{
						text:
							"Tus clientes sabrán que eres<br>\n" +
							'<strong class="accent-text">transparente, honesto, intencional, cultivado y auténtico.</strong>',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1466,
						end: 1600
					},
					{
						text:
							'¡Deja de pelear por atención! <strong class="accent-text">¡Empieza a ser dueño de esta!</strong><br><br>\n' +
							'Así es como se construye <strong class="accent-text">confianza a escala</strong><br>\n' +
							'y se transforma la atención en <strong class="accent-text">lealtad a largo plazo</strong>.',
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1600,
						end: 1733
					},
					{
						text:
							'<h3 class="accent-text font-display modal-slide-subtitle">Entonces, ¿estás listo para convertir tu marca en un <strong class="accent-text">destino</strong>,<br>\n' +
							"o vas a seguir siendo solo un swipe más?</h3>",
						image:
							"https://omnex.julibe.com/Assets/Julibe/Phanto/hungry-or-delicious/widescreen.jpg",
						start: 1733,
						end: 1866
					}
				]
			}
		}
	};

	// ---------- UI STRINGS (including social links) ----------
	const UI_STRINGS = {
		en: {
			select_language: "Select Language",
			menu_intro: 'Intro <i class="fas fa-home"></i>',
			menu_ux: 'UX Design <i class="fas fa-paint-brush"></i>',
			menu_ai: 'Responsible AI <i class="fas fa-robot"></i>',
			menu_game: 'Gamification <i class="fas fa-gamepad"></i>',
			menu_contact: 'Contact <i class="fas fa-globe"></i>',
			hero_title: "Hi! I'm",
			hero_subtitle:
				'A supercool <span class="highlight">Designer</span> with 18+ years crafting <span class="highlight">digital experiences ❤️</span>.',
			hero_tagline:
				"Lover of sci‑fi, TV, anime, and a pro at game overs since the '90s! 🕹️",
			hero_question: "So, what's my job about?",
			hero_answer:
				'I build <span class="highlight">digital experiences</span> by using three simple pillars:',
			card_ux: "Cognitive Clarity, Emotional Resonance",
			card_ux_title: "UX Design",
			card_ai: "Augmented Intelligence, Not Replacement",
			card_ai_title: "AI Strategy",
			card_game: "Cognitive Real Estate, Organic Data",
			card_game_title: "Gamification",
			ux_title: "UX Design",
			ux_intro:
				'Let’s face it, the web is a chaotic storm.<br> <span class="highlight">Let’s make your brand cut through that noise.</span>',
			ux_p1_title: "Cognitive Clarity",
			ux_p2_title: "Emotional Resonance",
			ux_p3_title: "Organic Growth",
			ai_title: "Responsible AI",
			ai_intro:
				'The web is flooding with "AI slop". <br>We don\'t use AI to replace the human touch; <br>We use it to give it <span class="highlight">superpowers</span>.',
			ai_p1_title: "High‑Velocity Workflow",
			ai_p2_title: "Creative Acceleration",
			ai_p3_title: "Augmented Intelligence",
			ai_p4_title: "Adaptive Ecosystems",
			game_title: "Gamification",
			game_intro:
				'Most brands are fighting just to get a 3-second glance. <br>Let’s help your brand win that attention and <span class="highlight">multiply it by 10</span>.',
			game_p1_title: "Cognitive Real Estate",
			game_p2_title: "Brand Recognition",
			game_p3_title: "Organic Data",
			cta_subtitle:
				"By combining these core pillars, We can give your brand the important stuff back<br><strong>The Human Experience, The Smart Experience.</strong>",
			cta_title: "I'm",
			cta_line:
				'I don\'t just build websites; <span class="accent-text">I craft digital experiences!</span>',
			cta_btn: "Let’s collaborate!",
			choice_footnote:
				'<span class="accent-text">Imagine what we could create!</span><br />The choice really... <strong>it\'s yours!</strong>',
			// Social link texts
			social_portfolio_text: "Portfolio",
			social_github_text: "GitHub",
			social_whatsapp_text: "WhatsApp",
			social_twitter_text: "X (Twitter)",
			social_instagram_text: "Instagram",
			social_email_text: "Email",
			// Social titles (creative)
			social_portfolio_title: "Enter Julibe’s awesome realm 👻",
			social_github_title: "“Copy… Argh! 🏴‍☠️” I mean, explore Julibe’s code",
			social_whatsapp_title: "💬 Message Julibe and say hi or just Boo!",
			social_twitter_title:
				"Get some of Julibe's thoughts, pixels, and the occasional rant 🐦",
			social_instagram_title:
				"Peek behind the scenes of Julibe’s creative stuff 📸",
			social_email_title: "Send a good old digital email to Julibe 📧",
			// Social ARIA (can reuse titles or be more descriptive)
			social_portfolio_aria: "Visit Julibe's Portfolio",
			social_github_aria: "Julibe's GitHub",
			social_whatsapp_aria: "Contact Julibe via WhatsApp",
			social_twitter_aria: "Follow Julibe on Twitter",
			social_instagram_aria: "Follow Julibe on Instagram",
			social_email_aria: "Send Email to Julibe",
			// ARIA labels for other elements (kept from before)
			lang_en: "Switch to English",
			lang_es: "Cambiar a español",
			goto_intro: "Go to Intro",
			goto_ux: "Go to UX Design",
			goto_ai: "Go to Responsible AI",
			goto_game: "Go to Gamification",
			goto_contact: "Go to Contact",
			play_intro: "Play intro audio",
			play_ux_audio: "Play UX section audio",
			play_ai_audio: "Play AI section audio",
			play_game_audio: "Play Gamification section audio",
			play_outro_audio: "Play outro audio",
			open_cognitive: "Open Cognitive Clarity modal",
			open_emotional: "Open Emotional Resonance modal",
			open_organic: "Open Organic Growth modal",
			open_high: "Open High Velocity Workflow modal",
			open_creative: "Open Creative Acceleration modal",
			open_augmented: "Open Augmented Intelligence modal",
			open_adaptive: "Open Adaptive Ecosystems modal",
			open_cognitive_estate: "Open Cognitive Real Estate modal",
			open_brand: "Open Brand Recognition modal",
			open_organic_data: "Open Organic Data modal",
			collaborate_link: "Collaborate with Julibe",
			social_nav: "Social media links"
		},
		es: {
			select_language: "Seleccionar idioma",
			menu_intro: 'Intro <i class="fas fa-home"></i>',
			menu_ux: 'Diseño UX <i class="fas fa-paint-brush"></i>',
			menu_ai: 'IA Responsable <i class="fas fa-robot"></i>',
			menu_game: 'Gamificación <i class="fas fa-gamepad"></i>',
			menu_contact: 'Contacto <i class="fas fa-globe"></i>',
			hero_title: "¡Hola! Soy",
			hero_subtitle:
				'Un <span class="highlight">Diseñador</span> súper cool con más de 18 años creando <span class="highlight">experiencias digitales ❤️</span>.',
			hero_tagline:
				"¡Amante de la sci‑fi, TV, anime y pro en game overs desde los 90s! 🕹️",
			hero_question: "Entonces, ¿En qué consiste mi trabajo?",
			hero_answer:
				'Construyo <span class="highlight">experiencias digitales</span> utilizando tres pilares claros:',
			card_ux: "Claridad Cognitiva, Resonancia Emocional",
			card_ux_title: "Diseño UX",
			card_ai: "Inteligencia Aumentada, No Reemplazo",
			card_ai_title: "Estrategia de IA",
			card_game: "Propiedad Cognitiva, Datos Orgánicos",
			card_game_title: "Gamificación",
			ux_title: "Diseño UX",
			ux_intro:
				'Enfrentémoslo, la web es una tormenta caótica. <br><span class="highlight">Hagamos que tu marca corte ese ruido.</span>',
			ux_p1_title: "Claridad Cognitiva",
			ux_p2_title: "Resonancia Emocional",
			ux_p3_title: "Crecimiento Orgánico",
			ai_title: "IA Responsable",
			ai_intro:
				'La web se inunda de "AI slop".<br> No usamos IA para reemplazar el toque humano;<br> la usamos para darle <span class="highlight">superpoderes</span>.',
			ai_p1_title: "Flujo de Alta Velocidad",
			ai_p2_title: "Aceleración Creativa",
			ai_p3_title: "Inteligencia Aumentada",
			ai_p4_title: "Ecosistemas Adaptativos",
			game_title: "Gamificación",
			game_intro:
				'La mayoría de las marcas luchan por solo 3 segundos de atención.<br> Ayudemos a tu marca a ganar esa atención y <span class="highlight">multiplicarla por 10</span>.',
			game_p1_title: "Propiedad Cognitiva",
			game_p2_title: "Reconocimiento de Marca",
			game_p3_title: "Datos Orgánicos",
			cta_subtitle:
				"Al combinar estos pilares, le devolvemos a tu marca lo más importante:<br><strong>La Experiencia Humana, la Experiencia Inteligente.</strong>",
			cta_title: "Soy",
			cta_line:
				'No solo creo páginas web, <span class="accent-text">construyo experiencias digitales!</span>',
			cta_btn: "¡Colaboremos!",
			choice_footnote:
				'<span class="accent-text">¡Imagina lo que podríamos crear!</span><br />La decisión realmente...<strong>¡es tuya!</strong>',

			// Social link texts (Spanish)
			social_portfolio_text: "Portafolio",
			social_github_text: "GitHub",
			social_whatsapp_text: "WhatsApp",
			social_twitter_text: "X (Twitter)",
			social_instagram_text: "Instagram",
			social_email_text: "Correo",
			// Social titles (creative, translated where possible, keeping emojis)
			social_portfolio_title: "Entra al increíble reino de Julibe 👻",
			social_github_title: "“Copia… ¡Argh! 🏴‍☠️” O sea, explora el código de Julibe",
			social_whatsapp_title: "💬 Envía un mensaje a Julibe y di hola o solo Boo!",
			social_twitter_title:
				"Obtén algunos pensamientos, píxeles y el rant ocasional de Julibe 🐦",
			social_instagram_title:
				"Mira detrás de escena de las cosas creativas de Julibe 📸",
			social_email_title: "Envía un buen correo digital antiguo a Julibe 📧",
			// Social ARIA
			social_portfolio_aria: "Visitar el Portafolio de Julibe",
			social_github_aria: "GitHub de Julibe",
			social_whatsapp_aria: "Contactar a Julibe por WhatsApp",
			social_twitter_aria: "Seguir a Julibe en Twitter",
			social_instagram_aria: "Seguir a Julibe en Instagram",
			social_email_aria: "Enviar correo a Julibe",
			// ARIA labels
			lang_en: "Cambiar a inglés",
			lang_es: "Switch to Spanish",
			goto_intro: "Ir a Intro",
			goto_ux: "Ir a Diseño UX",
			goto_ai: "Ir a IA Responsable",
			goto_game: "Ir a Gamificación",
			goto_contact: "Ir a Contacto",
			play_intro: "Reproducir audio de introducción",
			play_ux_audio: "Reproducir audio de sección UX",
			play_ai_audio: "Reproducir audio de sección IA",
			play_game_audio: "Reproducir audio de sección Gamificación",
			play_outro_audio: "Reproducir audio de cierre",
			open_cognitive: "Abrir modal Claridad Cognitiva",
			open_emotional: "Abrir modal Resonancia Emocional",
			open_organic: "Abrir modal Crecimiento Orgánico",
			open_high: "Abrir modal Flujo de Alta Velocidad",
			open_creative: "Abrir modal Aceleración Creativa",
			open_augmented: "Abrir modal Inteligencia Aumentada",
			open_adaptive: "Abrir modal Ecosistemas Adaptativos",
			open_cognitive_estate: "Abrir modal Propiedad Cognitiva",
			open_brand: "Abrir modal Reconocimiento de Marca",
			open_organic_data: "Abrir modal Datos Orgánicos",
			collaborate_link: "Colaborar con Julibe",
			social_nav: "Enlaces a redes sociales"
		}
	};

	// ---------- AUDIO FILES ----------
	const AUDIO_FILES = {
		en: {
			intro:
				"https://omnex.julibe.com/Assets/Julibe/Branding/Pillars/Intro-EN.mp3",
			ux:
				"https://omnex.julibe.com/Assets/Julibe/Branding/Pillars/UXDesign-EN.mp3",
			ai: "https://omnex.julibe.com/Assets/Julibe/Branding/Pillars/AI-EN.mp3",
			game:
				"https://omnex.julibe.com/Assets/Julibe/Branding/Pillars/Gamification-EN.mp3"
		},
		es: {
			intro: "",
			ux:
				"https://omnex.julibe.com/Assets/Julibe/Branding/Pillars/UXDesign-ES.mp3",
			ai: "https://omnex.julibe.com/Assets/Julibe/Branding/Pillars/AI-ES.mp3",
			game:
				"https://omnex.julibe.com/Assets/Julibe/Branding/Pillars/Gamification-ES.mp3"
		}
	};

	// ---------- STATE ----------
	let currentLang = "en";
	let currentModalId = null;
	let currentSlide = 0;
	const audio = document.getElementById("audio-player");
	let currentClip = { btn: null, start: 0, end: 25 };

	// ---------- THREE.JS: PARTICLES + WAVE GRID ----------
	function initThree() {
		const canvas = document.getElementById("three-canvas");
		if (!canvas) return;
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			45,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({
			canvas,
			alpha: true,
			antialias: true
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		const size = 30;
		const divisions = 80;
		const step = size / divisions;
		const points = [];
		const lineIndices = [];

		for (let i = 0; i <= divisions; i++) {
			for (let j = 0; j <= divisions; j++) {
				const x = -size / 2 + i * step;
				const z = -size / 2 + j * step;
				points.push(x, 0, z);
			}
		}

		for (let row = 0; row <= divisions; row++) {
			for (let col = 0; col < divisions; col++) {
				const a = row * (divisions + 1) + col;
				const b = a + 1;
				lineIndices.push(a, b);
			}
		}
		for (let col = 0; col <= divisions; col++) {
			for (let row = 0; row < divisions; row++) {
				const a = row * (divisions + 1) + col;
				const b = (row + 1) * (divisions + 1) + col;
				lineIndices.push(a, b);
			}
		}

		const gridGeometry = new THREE.BufferGeometry();
		gridGeometry.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(points, 3)
		);
		gridGeometry.setIndex(lineIndices);
		const gridMaterial = new THREE.LineBasicMaterial({
			color: 0x44aaff,
			opacity: 0.2,
			transparent: true
		});
		const gridLines = new THREE.LineSegments(gridGeometry, gridMaterial);
		scene.add(gridLines);

		const particleCount = 800;
		const particleGeometry = new THREE.BufferGeometry();
		const particlePositions = new Float32Array(particleCount * 3);
		for (let i = 0; i < particleCount * 3; i += 3) {
			particlePositions[i] = (Math.random() - 0.5) * 40;
			particlePositions[i + 1] = (Math.random() - 0.5) * 30;
			particlePositions[i + 2] = (Math.random() - 0.5) * 40;
		}
		particleGeometry.setAttribute(
			"position",
			new THREE.BufferAttribute(particlePositions, 3)
		);
		const particleMaterial = new THREE.PointsMaterial({
			color: 0x88aaff,
			size: 0.1,
			transparent: true,
			opacity: 0.3
		});
		const particles = new THREE.Points(particleGeometry, particleMaterial);
		scene.add(particles);

		camera.position.set(10, 10, 10);
		camera.lookAt(0, 0, 0);

		let mouseX = 0,
			mouseY = 0;
		window.addEventListener("mousemove", (e) => {
			mouseX = (e.clientX / window.innerWidth) * 2 - 1;
			mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
		});

		let time = 0;
		function animate() {
			requestAnimationFrame(animate);
			time += 0.005;

			const positions = gridGeometry.attributes.position.array;
			for (let i = 0; i < positions.length; i += 3) {
				const x = positions[i];
				const z = positions[i + 2];
				const y =
					Math.sin(time * 1.8 + x * 0.5 + z * 0.4) * 2.5 +
					Math.cos(time * 1.2 + x * 0.3 - z * 0.3) * 1.8;
				positions[i + 1] = y;
			}
			gridGeometry.attributes.position.needsUpdate = true;

			particles.rotation.y += 0.0002;
			particles.rotation.x += 0.0001;

			gridLines.rotation.y = mouseX * 0.5;
			gridLines.rotation.x = mouseY * 0.3;

			camera.position.x = 10 + mouseX * 3;
			camera.position.y = 10 + mouseY * 2;
			camera.lookAt(0, 0, 0);

			renderer.render(scene, camera);
		}
		animate();

		window.addEventListener("resize", () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		});
	}
	initThree();

	// ---------- HELPER FUNCTIONS ----------
	window.getAudioUrl = (key) =>
		AUDIO_FILES[currentLang][key] || AUDIO_FILES.en[key];
	function formatTime(s) {
		let m = Math.floor(s / 60);
		let sec = Math.floor(s % 60);
		return `${m}:${sec.toString().padStart(2, "0")}`;
	}

	function updateLanguage(lang) {
		document.querySelectorAll("[data-i18n]").forEach((el) => {
			let key = el.dataset.i18n;
			if (UI_STRINGS[lang] && UI_STRINGS[lang][key]) {
				el.innerHTML = UI_STRINGS[lang][key];
			}
		});
		document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
			let key = el.dataset.i18nAria;
			if (UI_STRINGS[lang] && UI_STRINGS[lang][key]) {
				el.setAttribute("aria-label", UI_STRINGS[lang][key]);
			}
		});
		document.querySelectorAll("[data-i18n-title]").forEach((el) => {
			let key = el.dataset.i18nTitle;
			if (UI_STRINGS[lang] && UI_STRINGS[lang][key]) {
				el.setAttribute("title", UI_STRINGS[lang][key]);
			}
		});
		if (currentModalId) rebuildModal(currentModalId);
	}

	window.setLang = function (lang) {
		currentLang = lang;
		updateLanguage(lang);
		document.getElementById("btn-en").classList.toggle("active", lang === "en");
		document.getElementById("btn-es").classList.toggle("active", lang === "es");
	};

	window.startWithLang = function (lang) {
		setLang(lang);
		document.getElementById("loading-overlay").classList.add("hidden");
	};

	window.navigateTo = (id) =>
		document.getElementById(id).scrollIntoView({ behavior: "smooth" });

	window.playSectionAudio = function (url, start, end, btn) {
		if (currentClip.btn === btn && !audio.paused) {
			audio.pause();
			updateBtnState(btn, false);
			return;
		}
		currentClip = { btn, start, end };
		if (!audio.src.includes(url)) audio.src = url;
		audio.currentTime = start;
		audio
			.play()
			.then(() => updateBtnState(btn, true))
			.catch(() => {});
	};

	function updateBtnState(btn, isPlaying) {
		document
			.querySelectorAll(".section-play-btn, .play-btn-intro, .btn-play")
			.forEach((b) => {
				b.classList.remove("playing");
				let i = b.querySelector("i");
				if (i) {
					i.classList.remove("fa-pause");
					i.classList.add("fa-play");
				}
			});
		if (isPlaying && btn) {
			btn.classList.add("playing");
			let i = btn.querySelector("i");
			if (i) {
				i.classList.remove("fa-play");
				i.classList.add("fa-pause");
			}
			if (btn.id === "intro-play-btn") {
				document
					.querySelectorAll(".waveform .bar")
					.forEach((b) => (b.style.animation = "waveAnim 0.5s infinite alternate"));
			}
		} else {
			document
				.querySelectorAll(".waveform .bar")
				.forEach((b) => (b.style.animation = "none"));
		}
	}

	audio.addEventListener("timeupdate", () => {
		if (!currentClip.btn) return;
		if (audio.currentTime >= currentClip.end) {
			audio.pause();
			updateBtnState(currentClip.btn, false);
			return;
		}
		let rel = audio.currentTime - currentClip.start;
		let total = currentClip.end - currentClip.start;
		let str = `${formatTime(rel)} / ${formatTime(total)}`;
		let display = currentClip.btn.querySelector(".audio-time-display");
		if (display) display.innerText = str;
		if (currentClip.btn.id === "intro-play-btn")
			document.getElementById("intro-time-display").innerText = str;
		if (currentClip.btn.id === "modal-play-btn") {
			document.getElementById("modal-progress").style.width =
				(rel / total) * 100 + "%";
			document.getElementById("modal-time").innerText = str;
		}
	});

	window.toggleIntroAudio = () => {
		let btn = document.getElementById("intro-play-btn");
		playSectionAudio(getAudioUrl("intro"), 0, 25, btn);
	};

	// ---------- MODAL FUNCTIONS ----------
	window.openModal = (id) => {
		currentModalId = id;
		rebuildModal(id);
	};

	function rebuildModal(id) {
		let data = MODAL_SLIDES[currentLang][id] || MODAL_SLIDES.en[id];
		if (!data) return;
		document.documentElement.style.setProperty("--accent", data.color);
		let slidesHtml = data.slides
			.map(
				(s, i) => `
          <div class="slide ${i === 0 ? "active" : ""}">
            <div class="content">
              <h2 class="font-display modal-slide-title accent-text">${
															data.title
														}</h2>
              <div class="slide-img-placeholder"><img src="${s.image}" alt="${
					data.title
				} slide image" /></div>
              <p class="modal-slide-text">${s.text}</p>
            </div>
          </div>
        `
			)
			.join("");
		let dotsHtml = data.slides
			.map(
				(_, i) =>
					`<div class="dot ${
						i === 0 ? "active" : ""
					}" onclick="goToSlide(${i})" role="button" tabindex="0" aria-label="Go to slide ${
						i + 1
					}" data-i18n-aria="goto_slide"></div>`
			)
			.join("");
		document.getElementById("modal-box").innerHTML = `
          <button class="modal-close" onclick="closeModal()" aria-label="Close modal" data-i18n-aria="close_modal">&times;</button>
          <div class="slider-wrap"><div class="slider-track" id="slider-track">${slidesHtml}</div></div>
          <div class="modal-audio-player">
            <button class="btn-play" id="modal-play-btn" onclick="toggleModalAudio()" aria-label="Play modal audio" data-i18n-aria="play_modal_audio"><i class="fas fa-play"></i></button>
            <div class="progress-container" onclick="seekModalAudio(event)" role="slider" aria-label="Audio progress" data-i18n-aria="audio_progress"><div class="progress-bar" id="modal-progress"></div></div>
            <div class="time" id="modal-time">0:00 / 0:00</div>
          </div>
          <div class="modal-footer">
            <button class="btn-nav" onclick="prevSlide()" aria-label="Previous slide" data-i18n-aria="prev_slide"><i class="fas fa-chevron-left"></i></button>
            <div class="modal-dots" id="modal-dots">${dotsHtml}</div>
            <button class="btn-nav" onclick="nextSlide()" aria-label="Next slide" data-i18n-aria="next_slide"><i class="fas fa-chevron-right"></i></button>
          </div>
        `;
		document.querySelectorAll("#modal [data-i18n-aria]").forEach((el) => {
			let key = el.dataset.i18nAria;
			if (UI_STRINGS[currentLang] && UI_STRINGS[currentLang][key]) {
				el.setAttribute("aria-label", UI_STRINGS[currentLang][key]);
			}
		});
		currentSlide = 0;
		document.getElementById("modal").classList.add("active");
		document.body.style.overflow = "hidden";
		prepareModalAudio(0);
	}

	function prepareModalAudio(idx) {
		let data =
			MODAL_SLIDES[currentLang][currentModalId] || MODAL_SLIDES.en[currentModalId];
		let s = data.slides[idx];
		audio.src = getAudioUrl(data.audioFile);
		audio.currentTime = s.start;
		document.getElementById("modal-time").innerText = `0:00 / ${formatTime(
			s.end - s.start
		)}`;
		document.getElementById("modal-progress").style.width = "0%";
		let btn = document.getElementById("modal-play-btn");
		btn.classList.remove("playing");
		btn.querySelector("i").className = "fas fa-play";
	}

	window.toggleModalAudio = () => {
		let data =
			MODAL_SLIDES[currentLang][currentModalId] || MODAL_SLIDES.en[currentModalId];
		let s = data.slides[currentSlide];
		let btn = document.getElementById("modal-play-btn");
		playSectionAudio(getAudioUrl(data.audioFile), s.start, s.end, btn);
	};

	window.nextSlide = () => {
		let data = MODAL_SLIDES[currentLang][currentModalId];
		if (data && currentSlide < data.slides.length - 1)
			goToSlide(currentSlide + 1);
	};
	window.prevSlide = () => {
		if (currentSlide > 0) goToSlide(currentSlide - 1);
	};
	window.goToSlide = (idx) => {
		currentSlide = idx;
		document.getElementById("slider-track").style.transform = `translateX(-${
			idx * 100
		}%)`;
		document
			.querySelectorAll("#modal-dots .dot")
			.forEach((d, i) => d.classList.toggle("active", i === idx));
		document
			.querySelectorAll(".slide")
			.forEach((s, i) => s.classList.toggle("active", i === idx));
		prepareModalAudio(idx);
	};
	window.seekModalAudio = (e) => {
		if (!currentModalId) return;
		let data =
			MODAL_SLIDES[currentLang][currentModalId] || MODAL_SLIDES.en[currentModalId];
		let s = data.slides[currentSlide];
		let rect = e.currentTarget.getBoundingClientRect();
		let perc = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
		audio.currentTime = s.start + perc * (s.end - s.start);
	};
	window.closeModal = () => {
		document.getElementById("modal").classList.remove("active");
		document.body.style.overflow = "";
		audio.pause();
		updateBtnState(document.getElementById("modal-play-btn"), false);
		currentModalId = null;
	};

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target
						.querySelectorAll(".reveal")
						.forEach((el) => el.classList.add("visible"));
					let idx = parseInt(e.target.id.split("-")[1]);
					document
						.querySelectorAll(".side-dots .dot")
						.forEach((d, i) => d.classList.toggle("active", i === idx));
					document
						.querySelectorAll(".nav-item")
						.forEach((n, i) => n.classList.toggle("active", i === idx));
					let color = "#f9025b";
					if (idx === 1) color = "#ff6b35";
					if (idx === 2) color = "#7c4dff";
					if (idx === 3) color = "#00e676";
					document.documentElement.style.setProperty("--accent", color);
				}
			});
		},
		{ threshold: 0.3 }
	);
	document.querySelectorAll(".section").forEach((s) => observer.observe(s));

	setLang("en");
	document.getElementById("loading-overlay").classList.remove("hidden");
})();
