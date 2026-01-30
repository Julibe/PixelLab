import * as THREE from "https://esm.sh/three";
import { EffectComposer } from "https://esm.sh/three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "https://esm.sh/three/addons/postprocessing/RenderPass.js";
import { AfterimagePass } from "https://esm.sh/three/addons/postprocessing/AfterimagePass.js";
import { UnrealBloomPass } from "https://esm.sh/three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "https://esm.sh/three/addons/postprocessing/OutputPass.js";
import { OrbitControls } from "https://esm.sh/three/addons/controls/OrbitControls.js";
import { TTFLoader } from "https://esm.sh/three/addons/loaders/TTFLoader.js";
import { FontLoader } from "https://esm.sh/three/addons/loaders/FontLoader.js";
import { TextGeometry } from "https://esm.sh/three/addons/geometries/TextGeometry.js";

const afterimage_damp = 0.9;
const particle_count = 15000;
const bg_particle_count = 2000;
const font_url =
  "https://res.cloudinary.com/dwrzfx0qg/raw/upload/v1768974055/Zodiac.ttf";
const zodiac_data = [
  {
    name: "Aries",
    greek: "Κριός",
    dates: "Mar 21 - Apr 19",
    illustration: "u",
    glyph: "v"
  },
  {
    name: "Taurus",
    greek: "Ταῦρος",
    dates: "Apr 20 - May 20",
    illustration: "c",
    glyph: "d"
  },
  {
    name: "Gemini",
    greek: "Δίδυμοι",
    dates: "May 21 - Jun 20",
    illustration: "o",
    glyph: "p"
  },
  {
    name: "Cancer",
    greek: "Καρκίνος",
    dates: "Jun 21 - Jul 22",
    illustration: "s",
    glyph: "t"
  },
  {
    name: "Leo",
    greek: "Λέων",
    dates: "Jul 23 - Aug 22",
    illustration: "m",
    glyph: "n"
  },
  {
    name: "Virgo",
    greek: "Παρθένος",
    dates: "Aug 23 - Sep 22",
    illustration: "a",
    glyph: "b"
  },
  {
    name: "Libra",
    greek: "Ζυγός",
    dates: "Sep 23 - Oct 22",
    illustration: "k",
    glyph: "l"
  },
  {
    name: "Scorpio",
    greek: "Σκορπίος",
    dates: "Oct 23 - Nov 21",
    illustration: "e",
    glyph: "f"
  },
  {
    name: "Sagittarius",
    greek: "Τοξότης",
    dates: "Nov 22 - Dec 21",
    illustration: "g",
    glyph: "h"
  },
  {
    name: "Capricorn",
    greek: "Αἰγόκερως",
    dates: "Dec 22 - Jan 19",
    illustration: "q",
    glyph: "r"
  },
  {
    name: "Aquarius",
    greek: "Ὑδροχόος",
    dates: "Jan 20 - Feb 18",
    illustration: "w",
    glyph: "x"
  },
  {
    name: "Pisces",
    greek: "Ἰχθύες",
    dates: "Feb 19 - Mar 20",
    illustration: "i",
    glyph: "j"
  }
];

const use_sym_2 = Math.random() < 0.75 ? "glyph" : "illustration";
const use_sym = "glyph";
const zodiac_explanations = [
  "Beloved Aries, feel the sacred fire of Mars awakening within you now, igniting courage, determination, and fearless momentum, and trust that every bold step you take reshapes your destiny in ways only your heart can comprehend, for the universe fully supports your initiative when your actions align with your truest desires.",
  "Blessed Taurus, pause to recognize the stability, comfort, and abundance that surround you under Venus’s gentle gaze, allowing yourself to savor pleasure without guilt, knowing that your steady growth and devotion to your needs create a foundation that nourishes both body and soul.",
  "Radiant Gemini, under Mercury’s lively influence, embrace your curiosity without restraint, allowing your mind and heart to explore new ideas freely, for the conversations you engage in now reflect hidden truths about yourself and guide you gently toward clarity and expansion.",
  "Sacred Cancer, ruled by the Moon’s protective light, honor your feelings and intuitive wisdom, trusting that your sensitivity is not weakness but profound strength, and know that you are divinely protected as your emotional awareness illuminates your path with grace and compassion.",
  "Magnificent Leo, step fully into your solar power and creative brilliance, letting joy and authenticity guide your actions, for the world awaits the unique light only you can radiate, and by embracing your true self, you inspire others effortlessly and magnificently.",
  "Wise Virgo, guided by mindful Mercury, attend lovingly to the meaningful details of your life, allowing intention to shape every action, for your care, service, and dedication ripple positive change outward, bringing clarity, healing, and purpose wherever you go.",
  "Harmonious Libra, blessed by Venus, seek balance in all choices and allow fairness to guide your interactions, knowing that your gift for restoring harmony and beauty transforms conflict into understanding and shapes your destiny with elegance and justice.",
  "Powerful Scorpio, ruled by Pluto’s transformative force, face your challenges with fearless emotional honesty, releasing what no longer serves you, and allow your inner power to rise fully as renewal, depth, and profound transformation reshape your life.",
  "Adventurous Sagittarius, under Jupiter’s expansive blessing, lift your gaze beyond the immediate horizon and let curiosity and freedom lead you, for every journey, lesson, and exploration you embrace brings wisdom, faith, and spiritual growth into your life.",
  "Steadfast Capricorn, guided by Saturn’s disciplined wisdom, trust your patience and persistence, knowing that each careful step you take now builds lasting success, aligning ambition with integrity and bringing you closer to your highest aspirations.",
  "Visionary Aquarius, ruled by Uranus’s electric insight, share your unique ideas boldly and generously, recognizing them as gifts meant to uplift the collective, for your courage to think differently and act with conscience inspires transformation far beyond yourself.",
  "Mystical Pisces, embraced by Neptune’s divine current, listen deeply to your intuition and allow it to guide your heart without hesitation, trusting that your empathy and sensitivity are sacred strengths, and by surrendering to life’s flow, you discover unity, healing, and spiritual nourishment for your soul."
];

const oracle_data = {
  love: [
    "Beloved soul illuminated by the eternal power of love, the love you seek and the love that seeks you are already dancing under favorable planetary alignments, moving toward one another with majestic inevitability, guided by Venus herself who blesses your readiness, your emotional wisdom, and the sacred evolution of your heart.",
    "Love declares that your heart is a celestial temple, built from memory, longing, and light, and only those whose intentions are pure and whose souls vibrate with honesty, tenderness, and reverence may cross its threshold and remain within its divine orbit.",
    "Under shifting moons and restless stars, love reveals that what you feel as tension or uncertainty is not loss but transformation, a cosmic refinement through which love expands your capacity to receive affection without fear, resistance, or self protection.",
    "Love announces a reunion written in the constellations long before this lifetime, a meeting of spirits magnetized by destiny itself, arriving now because the universe has deemed both hearts spiritually prepared.",
    "Love is not chaos nor exhaustion, love is rest for the soul, recognition without explanation, and the profound relief of finally exhaling after wandering through emotional deserts for far too long.",
    "When love witnesses you opening without armor, without strategy, and without expectation, it moves toward you swiftly and unmistakably, recognizing truth as its most powerful invitation.",
    "Love grows strongest when it is allowed to unfold according to divine timing, free from measurement, interrogation, or doubt, trusting the planets to guide its rhythm.",
    "Love reminds you that a soul aligned with yours feels familiar beyond logic, beyond language, because love communicates through vibration, intuition, and ancient remembrance.",
    "By releasing past emotional contracts that no longer honor who love is shaping you to become, you open sacred space for a deeper, more devoted expression of love to enter.",
    "Love affirms that your gentleness is not weakness but a magnetic force, teaching others how to approach you with respect, care, and emotional dignity.",
    "Everything love receives when given sincerely and without hidden conditions returns multiplied, blessed by the law of cosmic reciprocity.",
    "Love teaches that while intensity may burn brightly at first, true love reveals itself through calm presence, emotional safety, and a peace that endures beyond excitement.",
    "A conversation guided by love and spoken under compassionate stars has the power to dissolve misunderstandings that have lingered through many moons.",
    "Love whispers that even after heartbreak, your heart remembers how to trust again, and it guides you patiently toward healthier constellations of connection.",
    "The love you desire awakens fully the moment you choose to honor yourself without apology, aligning your inner world with the truth of your worth.",
    "Love gently loosens the grip of old wounds now, allowing tenderness, hope, and openness to return like starlight entering a long closed sky.",
    "Someone within your orbit is learning how to meet love at your depth, your care, and your emotional integrity, guided by lessons written in the heavens.",
    "When love is allowed to arrive without fear or interrogation, it flows freely, trusting divine intention and higher guidance.",
    "Love blossoms effortlessly when expectations soften and presence becomes sacred, allowing romance to breathe.",
    "Love makes you irresistibly magnetic when you remain aligned with your emotional truth, honoring your feelings as divine signals.",
    "Through forgiveness, love clears blocked emotional pathways and invites deeper, more authentic bonds to take root under favorable stars.",
    "A truth carried by love longs to be spoken now, and when expressed with kindness, it heals far more than it disrupts.",
    "Love assures you that what feels slow is aligning with cosmic precision, preparing a connection strong enough to withstand uncertainty.",
    "Your emotional honesty is an offering to love itself, strengthening bonds and sanctifying intimacy.",
    "Love asks only for your presence and sincerity, never perfection nor armor.",
    "A bond guided by love deepens not only through shared words but through sacred silence, where souls commune beyond sound.",
    "Love removes what no longer belongs, trusting that every ending creates space for destiny to enter.",
    "Love proclaims that you are worthy of peace, security, and profound affirmation at the soul level.",
    "Love meets you exactly where you are now, not where you think you should be, because authenticity is love’s true gateway.",
    "Much love surrounds you at all times, visible and invisible, holding you through every planetary shift, every season, and every becoming, showering you always with much, much love."
  ],
  career: [
    "Beloved soul guided by celestial purpose, your career is not random labor but a sacred offering to the universe, and even when recognition seems delayed or invisible, the planets affirm that every effort you place into the world carries intention, power, and future reward.",
    "Career flourishes most brilliantly when you lead through authenticity and integrity, because your quiet confidence resonates more deeply through the cosmic field than force, ego, or domination ever could.",
    "Your career path becomes illuminated the moment you allow passion to guide your professional decisions instead of fear, scarcity, or the expectations imposed by others.",
    "A door within your career is closing softly now, not as punishment or loss, but as divine preparation for a greater, more aligned opportunity that awaits just beyond your current horizon.",
    "Career reminds you that your purpose is never confined to a title, position, or role, but lives within the frequency, intention, and integrity you transmit through your work each day.",
    "Recognition within your career arrives naturally when you release the need for approval and place your trust in the depth, sincerity, and meaning of your contribution.",
    "Your professional instincts have been sharpened by experience, trial, and perseverance, and at this moment your career is being guided wisely by that inner knowing.",
    "What feels uncertain or unstable in your career is quietly forming a stronger, more sustainable foundation, one capable of supporting long term growth and fulfillment.",
    "Your creativity within your career longs to be expressed freely, and the universe is aligning the right audience, timing, and opportunity for its full revelation.",
    "A powerful ally or mentor enters your career path precisely when guidance, encouragement, and strategic support are most needed, sent by divine orchestration.",
    "Career urges you not to shrink your vision to fit limitations that were never meant to define your potential, your talent, or your destiny.",
    "Your efforts within your career are being observed, acknowledged, and valued by forces both visible and unseen, even if public recognition has not yet arrived.",
    "Allow patience to refine your career ambition into something enduring, stable, and deeply meaningful, rather than something rushed or fragile.",
    "You are permitted by destiny to evolve beyond old professional identities and outdated expectations, as your career expands into new expressions of self.",
    "A bold idea emerging within your career carries the seed of long lasting success when nurtured with discipline, faith, and strategic care.",
    "Your discipline and consistency in your career are quietly opening doors you cannot yet fully see, but which are already responding to your commitment.",
    "True success in your career aligns with integrity, service, and purpose, never with urgency, pressure, or external comparison.",
    "A new responsibility within your career arrives as a blessing, bringing growth, confidence, and a deeper trust in your own capabilities.",
    "Even without applause or immediate validation, your progress in your career remains real, meaningful, and energetically powerful.",
    "Your voice, vision, and professional perspective carry far more value within your career than you currently realize, and the universe is preparing others to recognize it.",
    "Release outdated definitions of achievement and allow your career to be defined by fulfillment, impact, and authenticity on your own terms.",
    "What seems invisible today within your career will become undeniable through time, consistency, and unwavering belief in your path.",
    "You are building a career legacy capable of outlasting doubt, hesitation, criticism, and temporary setbacks.",
    "Clarity within your career follows courageous, aligned action taken with intention and trust in divine timing.",
    "Let curiosity guide your career toward expansion and discovery, rather than allowing fear to confine your potential.",
    "Your work within your career serves others in ways you may never fully witness or measure, yet its impact ripples far beyond what you see.",
    "Step into leadership within your career with humility, confidence, and emotional intelligence, for these are the marks of true authority.",
    "Consistency is becoming your greatest strength in your career, anchoring your success across changing seasons and circumstances.",
    "Your passion is steering your career toward deeper fulfillment, alignment, and soul level purpose.",
    "Meaningful contribution within your career naturally attracts abundance, respect, and recognition, showering you always with progress, prosperity, and much, much success."
  ],
  money: [
    "Beloved soul under the benevolent gaze of Jupiter and Venus, money flows most freely into your life when fear loosens its grip on your spirit and trust replaces control, allowing abundance to circulate according to divine law.",
    "Money reminds you that your value is immeasurable and eternal, far beyond material measures, and that provision, support, and sustenance are woven into your cosmic design.",
    "Opportunities for money and prosperity often arrive softly and without spectacle, requiring attentive awareness, intuitive listening, and receptivity rather than force or desperation.",
    "Your worth does not rise or fall with income, numbers, or external financial validation, for money recognizes your essence before it ever reflects your effort.",
    "Release scarcity based thinking now, for under the shifting stars it no longer serves your growth, your peace, nor the expansion that awaits you.",
    "Money responds favorably when treated with clarity, respect, and conscious intention, aligning itself with those who honor its flow rather than attempt to dominate it.",
    "What you value sincerely expands when honored thoughtfully, consistently, and without fear, inviting money to circulate with greater harmony.",
    "A wise financial decision made under present planetary influence lays the foundation for lasting security and future stability.",
    "Support connected to money arrives unexpectedly when alignment, preparation, and trust converge in perfect timing.",
    "You are fully capable of managing money and resources with grace, responsibility, foresight, and emotional maturity.",
    "Generosity activates unseen pathways through which money flows more freely, bypassing the limitations imposed by fear.",
    "Your financial intuition is strengthening steadily through lived experience, sharpening your ability to sense opportunities and risks alike.",
    "Gratitude harmonizes your relationship with money, bringing balance, clarity, and peace to every exchange.",
    "Integrity magnetizes sustainable prosperity, ensuring that money arrives in forms that endure rather than vanish.",
    "A small but powerful shift in mindset now creates long term financial ease and a more relaxed relationship with money.",
    "You are learning to receive money and abundance without guilt, hesitation, or self denial, honoring your worth.",
    "Wealth is not merely currency but energy responding to intention, respect, awareness, and alignment with purpose.",
    "True financial security arises from trust, preparation, and wise planning, not accumulation alone.",
    "An old financial worry dissolves naturally under patient action and cosmic realignment.",
    "Your relationship with money is healing now, becoming calmer, more conscious, and more balanced.",
    "Preparation acts as an invitation, calling money and abundance toward you with greater consistency.",
    "When you invest in yourself, your skills, and your well being, money multiplies its return across time.",
    "Stability forms through consistent care, mindful decisions, and respect for long term growth.",
    "Delayed financial matters resolve themselves in their proper time, guided by divine order.",
    "Confidence naturally attracts money related opportunities and supportive alliances.",
    "Comparison clouds judgment and disrupts peace, while money flows best through clarity and self trust.",
    "You are supported financially in ways still unfolding quietly behind the scenes.",
    "Money flows more easily and generously where purpose, service, and integrity reside.",
    "You are safe to plan, build, and dream ahead responsibly, supported by universal provision.",
    "Prosperity arrives not through urgency or anxiety, but with calm assurance, steady progress, and much, much abundance."
  ],
  growth: [
    "Beloved soul under the watchful light of the evolving stars, growth reveals that you are gently releasing an old version of yourself, not through struggle but through grace, creating sacred space for renewal, authenticity, and higher alignment.",
    "When growth invites you to turn inward with compassion and tenderness, it unveils ancient wisdom that has been waiting patiently within you, ready to rise when judgment dissolves.",
    "Growth reminds you that peace already exists within this very moment, accessible whenever you soften resistance and surrender to presence.",
    "The challenges appearing along your path of growth are not obstacles but sculptors, shaping inner strength, emotional depth, and expanded awareness.",
    "Through growth, emotional release becomes a sacred cleansing of the spirit, restoring clarity, balance, and energetic flow.",
    "Growth truly begins when self judgment loosens its grip, allowing kindness to replace criticism and understanding to take root.",
    "Your past served as preparation for growth, but it does not confine your future nor dictate the limitless possibilities ahead.",
    "Growth teaches that silence is a profound teacher, offering insight and revelation beyond the reach of words.",
    "You are granted full permission by growth itself to change direction, redefine yourself, and evolve without guilt, fear, or apology.",
    "Healing through growth unfolds gradually and intelligently, honoring your natural rhythm rather than demanding urgency.",
    "Resilience within growth deepens quietly through lived experience, accumulating strength without spectacle.",
    "Self compassion stands at the heart of growth, unlocking true and lasting strength that force could never achieve.",
    "Growth reveals that rest is not retreat but sacred instruction, teaching balance, patience, and trust in divine timing.",
    "Awareness becomes your greatest ally through growth, sharpening perception and illuminating truth.",
    "As growth expands, old habits loosen naturally, dissolving through understanding rather than resistance.",
    "Your intuition matures beautifully under the influence of growth, refined through reflection and inner listening.",
    "Growth takes root deeply beneath the surface long before its transformation becomes visible to the world.",
    "With each conscious breath, growth renews intention, clarity, and alignment with your higher self.",
    "Day by day, growth guides you toward greater authenticity, allowing you to live more truthfully with each passing moment.",
    "Growth gently replaces criticism with curiosity, opening pathways to discovery and self understanding.",
    "Expansion through growth occurs naturally when resistance softens and trust is restored.",
    "Growth teaches that gentleness accelerates healing far more effectively than force or self pressure.",
    "Outgrowing what is familiar is not betrayal but evolution, fully supported by growth itself.",
    "Wisdom within growth arrives through lived, integrated experience, not through theory alone.",
    "Growth affirms that you are unfolding exactly as intended, guided by unseen intelligence and cosmic order.",
    "Trusting your inner guidance becomes effortless through growth, dissolving hesitation and doubt.",
    "As growth deepens awareness, clarity and inner peace sharpen in harmony.",
    "Growth reveals that discomfort often precedes liberation, signaling imminent expansion rather than failure.",
    "By honoring your limits, growth builds sustainable strength rather than exhaustion.",
    "Through growth, inner peace rises as your truest success, anchoring you in alignment, serenity, and much, much light."
  ],
  timing: [
    "Beloved soul moving beneath the steady rhythm of the heavens, timing invites you to pause gently and allow circumstances to rearrange themselves in your favor through divine intelligence.",
    "Timing reveals that the right moment is born when patience and readiness meet in perfect celestial harmony.",
    "Through timing, trust becomes an active force when aligned with calm, intentional, and grounded action rather than urgency.",
    "Decisions guided by timing and made from inner peace endure far longer than those driven by pressure or fear.",
    "What appears as delay within timing often serves as protection, shielding unseen outcomes and preparing future ease.",
    "Timing grants clarity when waiting feels steady, rooted, and emotionally grounded rather than restless.",
    "True timing carries ease, flow, and alignment, never desperation or frantic urgency.",
    "What is destined for you under divine timing cannot miss you, bypass you, nor arrive too late.",
    "Events governed by timing align naturally without force, struggle, or unnecessary pressure.",
    "In the stillness offered by timing, direction reveals itself with unmistakable clarity.",
    "You will recognize the correct moment through timing intuitively, without the need for justification or explanation.",
    "Preparation within timing unfolds quietly behind the scenes, guided by forces unseen yet precise.",
    "Timing asks you to trust the sacred interval between desire and arrival, knowing it holds essential refinement.",
    "Some answers require time under timing to mature fully, ripening into wisdom rather than haste.",
    "As timing completes its work, fog lifts gently, revealing clarity exactly when readiness arrives.",
    "Divine timing neither rushes nor delays unnecessarily, moving with cosmic precision and care.",
    "The slow unfolding permitted by timing builds endurance, confidence, and emotional stability.",
    "Through pauses, timing refines outcomes with wisdom that haste could never produce.",
    "Intuition, sharpened by timing, selects the right moment with effortless accuracy.",
    "Protection exists within waiting, and timing ensures you are not exposed before you are ready.",
    "Timing favors centered awareness, presence, and emotional equilibrium.",
    "Movement always follows true alignment, and timing signals when action becomes sacred.",
    "Presence enriches the waiting periods created by timing, transforming them into preparation rather than absence.",
    "Doors governed by timing open effortlessly and without resistance when the moment is right.",
    "Stillness within timing sharpens perception, awareness, and inner insight.",
    "Time itself supports your growth continuously, aligning lessons, opportunities, and readiness.",
    "Patience practiced under timing eventually receives its reward in clarity and fulfillment.",
    "Synchronization under timing unfolds quietly, naturally, and without spectacle.",
    "Timing asks you to trust natural progression without fear, comparison, or pressure.",
    "When timing completes its cycle, the moment reveals itself clearly, unmistakably, and with divine certainty, blessing you always with calm assurance and much, much trust."
  ],
  health: [
    "Beloved soul under the luminous protection of the healing planets, health proclaims that your body is a radiant temple deserving consistent care, loving attention, and deep respect.",
    "Health restores vitality when rhythm and rest align harmoniously, allowing the body to recalibrate according to divine intelligence.",
    "Your body speaks through health with gentle clarity, offering wisdom that guides you toward balance when you listen with compassion.",
    "Healing within health flows most freely when resistance softens into acceptance, allowing the body to remember its natural order.",
    "Nourishment guided by health strengthens both body and spirit together, weaving energy, clarity, and stability.",
    "Through health, rest becomes a sacred act that restores strength, mental clarity, and emotional calm.",
    "Balance upheld by health renews energy naturally, without strain or excess.",
    "Gentle movement encouraged by health supports harmony, circulation, and the smooth flow of vitality.",
    "Kindness toward yourself amplifies health, accelerating healing processes far more effectively than force.",
    "Breath guided by health carries restorative intelligence, calming the nervous system and renewing life force.",
    "Hydration supported by health clears emotional and physical residue, refreshing inner systems gently.",
    "Sunlight, blessed by health, revitalizes both spirit and body, awakening natural vitality.",
    "Health asks you to trust bodily intuition fully, honoring subtle signals as sacred guidance.",
    "Healing cycles within health honor patience, rhythm, and compassionate care rather than urgency.",
    "Calm nurtured through health supports nervous balance and emotional stability.",
    "Recovery guided by health is already underway, unfolding steadily and intelligently.",
    "Self care affirmed by health is essential, necessary, and never indulgent.",
    "Your body remembers wholeness naturally through health, restoring equilibrium with time and care.",
    "Effort balanced with rest through health allows healing to deepen and integrate fully.",
    "Sleep protected by health integrates restoration completely, renewing strength at every level.",
    "Nature aligned with health replenishes vitality profoundly, reconnecting you to elemental balance.",
    "Limits honored through health protect long term strength and prevent unnecessary depletion.",
    "Adaptability supported by health strengthens resilience and supports ongoing healing.",
    "Well being cultivated by health thrives through relationship, moderation, and balance.",
    "Patience practiced within health gently accelerates recovery without pressure.",
    "Strength returns steadily through health, rebuilding confidence and endurance over time.",
    "Consistency guided by health nurtures vitality sustainably, creating lasting well being.",
    "Peace cultivated through health strengthens immunity naturally and protects inner harmony.",
    "Inner listening encouraged by health deepens awareness and understanding of your body’s needs.",
    "Vitality remains protected under health when care, respect, and loving attention are maintained, blessing you always with balance, renewal, and much, much life force."
  ],
  travel: [
    "Beloved soul under wandering stars and benevolent skies, travel announces that the horizon calls you gently, inviting renewal, curiosity, and an expanded perspective aligned with destiny.",
    "Through travel, every journey outward becomes a mirror of inner awakening, revealing truths that could only be discovered through motion.",
    "Travel assures you that the road rises naturally beneath your feet when trust leads each step with confidence and openness.",
    "Waters encountered through travel carry sacred messages meant for reflection, emotional cleansing, and intuitive clarity.",
    "Wandering guided by travel invites discovery, openness, and the soft release of old limitations.",
    "Movement within travel restores clarity, balance, and emotional equilibrium, recalibrating your inner compass.",
    "Even familiar places, when revisited through travel, reveal new insight as awareness deepens.",
    "Travel refreshes spirit and mind alike, lifting heaviness and restoring curiosity.",
    "Short journeys blessed by travel offer powerful renewal, grounding, and gentle realignment.",
    "Curiosity awakened through travel guides direction wisely, protecting you from haste and misdirection.",
    "Journeys taken through travel release emotional weight, allowing lightness and presence to return.",
    "The soul expands through travel by embracing motion, exploration, and lived experience.",
    "Travel teaches that experience matters far more than destination, and presence outweighs arrival.",
    "Joy and wonder awaken naturally through travel, restoring childlike amazement and gratitude.",
    "Time spent away through travel restores balance, perspective, and emotional clarity.",
    "New landscapes revealed by travel inspire creativity deeply, unlocking fresh vision and imagination.",
    "Movement aligned with travel harmonizes energy naturally, easing tension and stagnation.",
    "The path revealed through travel teaches gently through experience, not force or urgency.",
    "Wonder returns through travel as exploration reconnects you to possibility and awe.",
    "Travel assures you that you are protected wherever you go, guided by unseen guardians and benevolent timing.",
    "Meaningful encounters await you through travel, bringing insight, connection, and synchronicity.",
    "Trust the timing of travel fully, knowing every departure and return follows divine order.",
    "Exploration guided by travel renews optimism, vision, and faith in possibility.",
    "Travel invites you to allow surprise and spontaneity, trusting joy to lead responsibly.",
    "Perspective gained through travel reshapes priorities naturally, without effort or conflict.",
    "Movement embraced through travel nourishes spirit and heart together, restoring emotional flow.",
    "Returning home through travel brings closure, integration, and newly gained insight.",
    "Journeys undertaken through travel leave blessings behind, enriching both traveler and place.",
    "Your steps within travel are guided gently, precisely, and with loving intention.",
    "The world opened through travel welcomes you openly, affirming your place within its vast and generous embrace, blessing you always with discovery, protection, and much, much wonder."
  ],
  compatibility: [
    "At this sacred moment beneath the fire charged heavens, compatibility reveals that Aries aligns harmoniously with Leo and Sagittarius, where shared fire ignites courage, passion, and forward movement, while Cancer or Capricorn energies may feel dense or demanding, asking patience, emotional maturity, and time before deeper involvement can unfold.",
    "Compatibility shows that Taurus now finds grounding, loyalty, and emotional safety with Virgo and Capricorn, where stability flourishes, while Aquarius or Leo connections may feel unpredictable or energetically disruptive, suggesting gentle distance, calm observation, and respect for differing rhythms rather than resistance.",
    "Under the airy influence of Mercury, compatibility confirms that Gemini resonates most smoothly with Libra and Aquarius through conversation, ideas, and shared curiosity, while Virgo or Pisces energies may feel draining or confusing at this time, calling for clarity, boundaries, and restorative space.",
    "Compatibility blesses Cancer with deep emotional comfort and intuitive bonding alongside Scorpio and Pisces, where feelings flow safely, while Aries or Libra interactions may require slower pacing, emotional reassurance, and patience to avoid imbalance or misunderstanding.",
    "Bathed in solar radiance, compatibility reveals that Leo shines most freely with Aries and Sagittarius, where mutual enthusiasm fuels confidence and joy, while Taurus or Scorpio dynamics may feel restrictive or intense for now, encouraging emotional boundaries and self respect.",
    "Compatibility aligns Virgo peacefully with Taurus and Capricorn, where shared values, practicality, and dedication create harmony, while Gemini or Sagittarius energy may feel scattered or inconsistent at this time, asking patience, grounding, and realistic expectations.",
    "Guided by Venus, compatibility flows most naturally for Libra with Gemini and Aquarius, where communication and balance thrive, while Cancer or Capricorn connections may feel emotionally heavy or demanding, suggesting intentional pacing and gentle boundaries.",
    "Compatibility reveals that Scorpio forms profound emotional and spiritual bonds with Cancer and Pisces, where depth is honored, while Leo or Aquarius interactions may feel intense, confrontational, or power charged for now, calling for conscious awareness and emotional restraint.",
    "Under expansive Jupiter, compatibility shows Sagittarius feeling most alive with Aries and Leo, where freedom and inspiration flourish, while Virgo or Pisces energy may feel temporarily misaligned, requiring understanding, patience, and mutual adjustment.",
    "Compatibility supports Capricorn in building stability and long term vision with Taurus and Virgo, where trust and structure grow steadily, while Aries or Libra energy may feel rushed or inconsistent, advising respect for timing and personal boundaries.",
    "Ruled by Uranus, compatibility allows Aquarius to connect easily with Gemini and Libra, where ideas and independence are celebrated, while Taurus or Scorpio energy may feel rigid or emotionally intense at present, asking flexibility and emotional space.",
    "Wrapped in Neptune’s mist, compatibility nurtures Pisces most deeply with Cancer and Scorpio, where empathy and emotional safety reign, while Gemini or Sagittarius interactions may feel overstimulating or unfocused, encouraging grounding, rest, and emotional clarity."
  ]
};

const lucky_colors = [
  "Rose Quartz",
  "Celestial Gold",
  "Emerald Mist",
  "Sapphire Deep",
  "Amethyst Haze",
  "Pearl White",
  "Coral Soft",
  "Moonlit Silver",
  "Sunrise Amber",
  "Velvet Indigo",
  "Opaline Cream",
  "Azure Whisper",
  "Lavender Smoke",
  "Jade Serenity",
  "Crimson Glow",
  "Ivory Light",
  "Ocean Teal",
  "Plum Radiance",
  "Sandstone Blush",
  "Midnight Blue",
  "Golden Honey",
  "Ethereal Lilac",
  "Forest Shadow",
  "Copper Warmth",
  "Star Dust Gray",
  "Turquoise Calm",
  "Blush Rose",
  "Solar Yellow",
  "Mystic Burgundy",
  "Cloud White"
];

let scene, camera, renderer, composer, controls;
let particles, background_stars, loaded_font;
let current_positions, target_positions;
let is_morphing = false;
let morph_start = 0;
let clock = new THREE.Clock();

let category_colors = {};
let session_readings = [];
let current_sign_index = -1;

async function init() {
  document.getElementById("dob-input").valueAsDate = new Date();

  document.querySelectorAll("#checkbox-container label").forEach((lbl) => {
    const val = lbl.querySelector("input").value;
    category_colors[val] = lbl.dataset.color;
  });

  generateSidebar();
  initThree();
  await loadFont();

  document.getElementById("start-btn").addEventListener("click", () => {
    const dob = document.getElementById("dob-input").value;
    let idx = 0;
    if (dob) idx = getSignIndex(new Date(dob));

    const checkboxes = document.querySelectorAll(
      "#checkbox-container input:checked"
    );
    const selectedAspects = Array.from(checkboxes).map((c) => c.value);
    if (selectedAspects.length === 0) selectedAspects.push("love");

    generateSessionData(selectedAspects);
    updateParticleColors(selectedAspects);

    document.getElementById("setup-view").style.display = "none";
    document.getElementById("reading-view").classList.add("active");

    activateSign(idx);
  });

  animate();
}

window.toggleMobileMenu = function () {
  const menu = document.getElementById("mobile-menu");
  const toggle = document.getElementById("mobile-menu-toggle");

  if (menu.classList.contains("open")) {
    menu.classList.remove("open");
    toggle.classList.remove("active");
  } else {
    menu.classList.add("open");
    toggle.classList.add("active");
  }
};

window.openModal = function (type) {
  const modal = document.getElementById("modal-overlay");

  const sections = document.querySelectorAll(".modal-section");
  sections.forEach((sec) => {
    sec.classList.remove("active");
    sec.style.display = "none";
  });

  const target = document.getElementById("modal-" + type);
  if (target) {
    target.style.display = "block";
    setTimeout(() => target.classList.add("active"), 10);
  }

  modal.classList.add("open");
};

window.closeModal = function () {
  document.getElementById("modal-overlay").classList.remove("open");
};

document.getElementById("modal-overlay").addEventListener("click", (e) => {
  if (e.target.id === "modal-overlay") window.closeModal();
});

window.prevSign = function () {
  if (current_sign_index === -1) return;
  let next = current_sign_index - 1;
  if (next < 0) next = 11;
  activateSign(next);
};

window.nextSign = function () {
  if (current_sign_index === -1) return;
  let next = current_sign_index + 1;
  if (next >= 12) next = 0;
  activateSign(next);
};

window.goHome = function () {
  current_sign_index = -1;
  document
    .querySelectorAll(".menu-item")
    .forEach((el) => el.classList.remove("active"));

  document.getElementById("reading-view").classList.remove("active");
  document.getElementById("setup-view").style.display = "block";

  const menu = document.getElementById("mobile-menu");
  if (menu.classList.contains("open")) {
    toggleMobileMenu();
  }
};

window.shareTwitter = function () {
  const shareUrl = "https://julibe.com/astrelle";
  const viaUser = "Julibe";

  let signName = "My Destiny";
  let signIntro = "The stars align.";

  if (current_sign_index !== -1) {
    signName = zodiac_data[current_sign_index].name;
    signIntro = zodiac_explanations[current_sign_index].split(".")[0];
  }

  const messages = [
    `My spirit resonates with ${signName}. ${signIntro} Feeling cosmic guidance today.`,
    `I just unlocked my frequency: ${signName}. The stars speak clearly.`,
    `Exploring the digital ether. ${signName} energy flows through me.`,
    `The universe whispers today. Seeing ${signName} in light particles is magical.`,
    `${signName} vibes are strong today. Feeling aligned with the stars.`,
    `${signName} guides me now. ${signIntro} Ready to receive the blessings of the cosmos.`,
    `The rhythm of ${signName} moves through me. Today, intuition leads the way.`,
    `I feel clarity in ${signName} energy. ${signIntro} The universe supports every step.`,
    `Stars shine through ${signName} today. ${signIntro} Miracles and synchronicities are near.`,
    `${signName} energy surrounds me. ${signIntro} Connected, guided, and full of cosmic light.`,
    `Feeling aligned with ${signName} vibrations. ${signIntro} The universe is speaking clearly today.`,
    `Cosmic energy flows as ${signName} awakens insight. ${signIntro} Trust your intuition now.`,
    `Light surrounds ${signName} energy today. ${signIntro} Magic and guidance are everywhere.`,
    `I open to ${signName} energy. ${signIntro} Alignment, clarity, and cosmic blessings flow.`,
    `${signName} flows through me. ${signIntro} Feeling guided, inspired, and connected to the stars.`,
    `The universe speaks through ${signName}. ${signIntro} Today brings insight, synchronicity, and clarity.`,
    `${signName} energy reminds me to trust myself. ${signIntro} Every step is part of the sacred journey.`,
    `I feel ${signName} energy in my heart. ${signIntro} Guidance and cosmic love are near.`,
    `Today, ${signName} whispers wisdom. ${signIntro} Align your intentions with the universe.`,
    `Connected to ${signName} today. ${signIntro} Energy flows, intuition rises, and stars guide.`
  ];

  const hashtagsList = [
    "Astrology",
    "Zodiac",
    "Horoscope",
    "Destiny",
    "Stars",
    "Cosmos",
    "Manifestation",
    "Spirituality",
    "Universe",
    "Energy",
    "Mystic",
    signName
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
    const tagsLength = selectedTags.reduce(
      (acc, tag) => acc + tag.length + 2,
      0
    );
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
};

function updateParticleColors(activeAspects) {
  if (!particles) return;
  const colors = particles.geometry.attributes.color;
  const count = colors.count;
  const cGold = new THREE.Color(0xd4af37);
  const cPurple = new THREE.Color(0x9c27b0);
  const userColors = activeAspects.map(
    (k) => new THREE.Color(category_colors[k] || "#ffffff")
  );

  for (let i = 0; i < count; i++) {
    let c;
    if (userColors.length > 0 && Math.random() < 0.35) {
      c = userColors[Math.floor(Math.random() * userColors.length)];
    } else {
      c = Math.random() > 0.5 ? cGold : cPurple;
    }
    colors.setXYZ(i, c.r, c.g, c.b);
  }
  colors.needsUpdate = true;
}

function generateSessionData(aspects) {
  session_readings = [];
  zodiac_data.forEach((sign, i) => {
    const signData = {
      readings: [],
      luckyColor: lucky_colors[Math.floor(Math.random() * lucky_colors.length)],
      luckyNum: Math.floor(Math.random() * 99) + 1
    };
    aspects.forEach((asp) => {
      if (asp !== "compatibility" && oracle_data[asp]) {
        const text =
          oracle_data[asp][Math.floor(Math.random() * oracle_data[asp].length)];
        signData.readings.push({ type: asp, text: text });
      }
    });
    if (aspects.includes("compatibility")) {
      const compText = oracle_data.compatibility[i];
      signData.readings.push({ type: "compatibility", text: compText });
    }
    session_readings.push(signData);
  });
}

function generateSidebar() {
  const list = document.getElementById("menu-list");

  zodiac_data.forEach((z, i) => {
    const item = document.createElement("div");
    item.className = "menu-item";
    item.dataset.index = i;
    item.onclick = () => {
      if (session_readings.length === 0) {
        const defaults = [
          "love",
          "money",
          "health",
          "growth",
          "timing",
          "compatibility"
        ];
        generateSessionData(defaults);
        updateParticleColors(defaults);
      }

      document.getElementById("setup-view").style.display = "none";
      document.getElementById("reading-view").classList.add("active");
      activateSign(i);
    };
    item.innerHTML = `<div class="z-icon"  aria-hidden="true" aria-label="${z.name}" title="${z.name}">${z[use_sym]}</div><a class="z-name"   aria-label="${z.name}"  title="${z.name}">${z.name}</a>`;
    list.appendChild(item);
  });
}

function activateSign(idx) {
  current_sign_index = idx;
  document
    .querySelectorAll(".menu-item")
    .forEach((el) => el.classList.remove("active"));
  document
    .querySelector(`.menu-item[data-index="${idx}"]`)
    .classList.add("active");

  const data = zodiac_data[idx];
  const sessionData = session_readings[idx];
  const intro = zodiac_explanations[idx];
  const contentDiv = document.getElementById("sign-details");

  let readingsHTML = "";
  sessionData.readings.forEach((r) => {
    let col = category_colors[r.type] || "#fff";
    let title = r.type.toUpperCase();
    if (r.type === "compatibility") {
      col = "#e91e63";
      title = "SOUL CONNECTIONS";
    }
    readingsHTML += `
      <div class="reading-card" style="border-left: 2px solid ${col}">
        <h4 style="color:${col}">${title}</h4>
        <p>"${r.text}"</p>
      </div>
    `;
  });

  contentDiv.innerHTML = `
    <div class="sign-header">
      <span class="sign-glyph-large">${data[use_sym_2]}</span>
      <div class="title-group">
        <span class="sign-date">${data.dates}</span>
        <div class="sign-greek">${data.greek}</div>
        <h2 class="sign-title">${data.name}</h2>
      </div>
    </div>

  <div class="lucky-footer">
  <div>Infuse your aura, use something with the color  <span class="lucky-val" style="color:${sessionData.luckyColor}">${sessionData.luckyColor}</span> today.</div>
  <div>Your lucky number this week is <span class="lucky-val">${sessionData.luckyNum}</span>, a sign of alignment and opportunity.</div>
</div>

    <div class="sign-intro">${intro}</div>
    ${readingsHTML}

    <div style="text-align: center; margin-bottom: 0.5rem;">
      <button class="share-btn" onclick="shareTwitter()" title="Share this reading on X" aria-label="Share on Twitter">
        <i class="fa-brands fa-twitter"></i> Share my destiny!
      </button>
    </div>
  `;

  morphToGlyph(data[use_sym_2]);
}

function getSignIndex(date) {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  if ((m == 3 && d >= 21) || (m == 4 && d <= 19)) return 0;
  if ((m == 4 && d >= 20) || (m == 5 && d <= 20)) return 1;
  if ((m == 5 && d >= 21) || (m == 6 && d <= 20)) return 2;
  if ((m == 6 && d >= 21) || (m == 7 && d <= 22)) return 3;
  if ((m == 7 && d >= 23) || (m == 8 && d <= 22)) return 4;
  if ((m == 8 && d >= 23) || (m == 9 && d <= 22)) return 5;
  if ((m == 9 && d >= 23) || (m == 10 && d <= 22)) return 6;
  if ((m == 10 && d >= 23) || (m == 11 && d <= 21)) return 7;
  if ((m == 11 && d >= 22) || (m == 12 && d <= 21)) return 8;
  if ((m == 12 && d >= 22) || (m == 1 && d <= 19)) return 9;
  if ((m == 1 && d >= 20) || (m == 2 && d <= 18)) return 10;
  return 11;
}

function initThree() {
  const container = document.getElementById("canvas-container");
  const w = container.offsetWidth;
  const h = container.offsetHeight;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
  camera.position.set(0, 0, 200);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.0;

  // Shader definitions reused for both particle systems
  const vertex_shader = `
		attribute vec3 color; varying vec3 vColor; uniform float time;
		void main() {
			vColor = color;
			vec3 p = position;
			float size = 2.0 + sin(time * 3.0 + p.x * 0.1)*1.0;
			vec4 mv = modelViewMatrix * vec4(p, 1.0);
			gl_PointSize = size * (250.0 / -mv.z);
			gl_Position = projectionMatrix * mv;
		}
	`;
  const fragment_shader = `
		varying vec3 vColor;
		void main() {
			float d = distance(gl_PointCoord, vec2(0.5));
			if(d > 0.5) discard;
			gl_FragColor = vec4(vColor, 1.0 - smoothstep(0.0, 0.5, d));
		}
	`;

  // Background Stars using same shader type
  const bg_geo = new THREE.BufferGeometry();
  const bg_pos = new Float32Array(bg_particle_count * 3);
  const bg_cols = new Float32Array(bg_particle_count * 3);
  const c_gray = new THREE.Color(0x888888);

  for (let i = 0; i < bg_particle_count; i++) {
    bg_pos[i * 3] = (Math.random() - 0.5) * 400;
    bg_pos[i * 3 + 1] = (Math.random() - 0.5) * 400;
    bg_pos[i * 3 + 2] = (Math.random() - 0.5) * 400;
    // Dim gray color for background
    bg_cols[i * 3] = c_gray.r * (0.5 + Math.random() * 0.5);
    bg_cols[i * 3 + 1] = c_gray.g * (0.5 + Math.random() * 0.5);
    bg_cols[i * 3 + 2] = c_gray.b * (0.5 + Math.random() * 0.5);
  }
  bg_geo.setAttribute("position", new THREE.BufferAttribute(bg_pos, 3));
  bg_geo.setAttribute("color", new THREE.BufferAttribute(bg_cols, 3));

  const bg_mat = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: vertex_shader,
    fragmentShader: fragment_shader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  background_stars = new THREE.Points(bg_geo, bg_mat);
  scene.add(background_stars);

  // Main Particles
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(particle_count * 3);
  const cols = new Float32Array(particle_count * 3);
  const c1 = new THREE.Color(0xd4af37);
  const c2 = new THREE.Color(0x9c27b0);

  for (let i = 0; i < particle_count; i++) {
    const r = 100 * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
    let c = Math.random() > 0.5 ? c1 : c2;
    cols[i * 3] = c.r;
    cols[i * 3 + 1] = c.g;
    cols[i * 3 + 2] = c.b;
  }

  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(cols, 3));

  const mat = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: vertex_shader,
    fragmentShader: fragment_shader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  particles = new THREE.Points(geo, mat);
  current_positions = new Float32Array(pos);
  target_positions = new Float32Array(pos);
  scene.add(particles);

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const afterimage_pass = new AfterimagePass();
  afterimage_pass.uniforms["damp"].value = afterimage_damp;
  composer.addPass(afterimage_pass);

  composer.addPass(
    new UnrealBloomPass(new THREE.Vector2(w, h), 0.5, 0.3, 0.85)
  );
  composer.addPass(new OutputPass());

  window.addEventListener("resize", () => {
    const cw = container.offsetWidth;
    const ch = container.offsetHeight;
    camera.aspect = cw / ch;
    camera.updateProjectionMatrix();
    renderer.setSize(cw, ch);
    composer.setSize(cw, ch);
  });
}

function loadFont() {
  return new Promise((resolve) => {
    new TTFLoader().load(
      font_url,
      (json) => {
        loaded_font = new FontLoader().parse(json);
        resolve();
      },
      undefined,
      resolve
    );
  });
}

function morphToGlyph(char) {
  if (!loaded_font) return;

  const shapes = loaded_font.generateShapes(char, 60);

  const geom = new TextGeometry(char, {
    font: loaded_font,
    size: 60,
    height: 15,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 1,
    bevelSegments: 3
  });
  geom.center();

  let pathPoints = [];
  shapes.forEach((shape) => {
    const pts = shape.getSpacedPoints(particle_count * 0.05);
    pts.forEach((p) => pathPoints.push(new THREE.Vector3(p.x, p.y, 0)));
  });

  const box = new THREE.Box3().setFromPoints(pathPoints);
  const center = new THREE.Vector3();
  box.getCenter(center);
  pathPoints.forEach((p) => p.sub(center));

  const posAttr = geom.attributes.position;
  const indexAttr = geom.index;
  const triCount = indexAttr ? indexAttr.count / 3 : posAttr.count / 3;

  for (let i = 0; i < particle_count; i++) {
    let tx, ty, tz;
    if (pathPoints.length > 0 && Math.random() > 0.5) {
      const p = pathPoints[Math.floor(Math.random() * pathPoints.length)];
      tx = p.x;
      ty = p.y;
      tz = (Math.random() - 0.5) * 15;
    } else {
      let i1, i2, i3;
      if (indexAttr) {
        const fIdx = Math.floor(Math.random() * triCount);
        i1 = indexAttr.getX(fIdx * 3);
        i2 = indexAttr.getX(fIdx * 3 + 1);
        i3 = indexAttr.getX(fIdx * 3 + 2);
      } else {
        const fIdx = Math.floor(Math.random() * triCount);
        i1 = fIdx * 3;
        i2 = fIdx * 3 + 1;
        i3 = fIdx * 3 + 2;
      }
      const va = new THREE.Vector3().fromBufferAttribute(posAttr, i1);
      const vb = new THREE.Vector3().fromBufferAttribute(posAttr, i2);
      const vc = new THREE.Vector3().fromBufferAttribute(posAttr, i3);
      const r1 = Math.random();
      const r2 = Math.random();
      const sqr1 = Math.sqrt(r1);
      const u = 1 - sqr1;
      const v = sqr1 * (1 - r2);
      const w = sqr1 * r2;
      tx = u * va.x + v * vb.x + w * vc.x;
      ty = u * va.y + v * vb.y + w * vc.y;
      tz = u * va.z + v * vb.z + w * vc.z;
    }
    target_positions[i * 3] = tx + (Math.random() - 0.5) * 1.0;
    target_positions[i * 3 + 1] = ty + (Math.random() - 0.5) * 1.0;
    target_positions[i * 3 + 2] = tz + (Math.random() - 0.5) * 2.0;
  }

  current_positions.set(particles.geometry.attributes.position.array);
  morph_start = clock.getElapsedTime();
  is_morphing = true;
}

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  controls.update();

  if (background_stars) {
    background_stars.rotation.y = t * 0.05;
    // Update uniform for background stars
    if (background_stars.material.uniforms) {
      background_stars.material.uniforms.time.value = t;
    }
  }

  if (is_morphing) {
    const el = t - morph_start;
    let alpha = el / 1.5;
    if (alpha >= 1) {
      alpha = 1;
      is_morphing = false;
    }
    const ease = 1 - Math.pow(1 - alpha, 3);
    const pos = particles.geometry.attributes.position.array;
    for (let i = 0; i < particle_count * 3; i++) {
      pos[i] =
        current_positions[i] +
        (target_positions[i] - current_positions[i]) * ease;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  }

  if (particles && particles.material.uniforms) {
    particles.material.uniforms.time.value = t;
  }
  composer.render();
}

init();
