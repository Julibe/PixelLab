---
title: Survive Dino Survive!
slogan: Outrun the Extinction
slug: survive-dino-survive
extract: Your keyboard is your only hope! 🦖 Type with surgical precision to outrun a meteor apocalypse. Can you reach the valley?
description: A high-velocity typing survival game featuring a dynamic 'Proximity Warning' system. It combines parallax canvas rendering with SVG post-processing to deliver a high-pressure retro arcade experience.

## Pricing & Estimates
time_concept: 4
time_design: 4
time_coding: 18
time_testing: 5
time_polish: 4

price_rate: 26
price_currency: USD
price_hours_day: 8

## Code Structure
difficulty: medium
technologies:
    - JavaScript
    - HTML5
    - Canvas
    - SVG Filters
    - CSS Animation
    - LocalStorage

category: game

## Metadata
tags:
    - Typing
    - Survival
    - Retro
    - Dinosaur
    - Arcade
    - Action
emojis:
    - 🦖
    - ☄️
    - ⌨️
    - 🔥
    - 🌋
    - 🏃
    - 📟
    - 🔋
    - 🌩️
    - 🌲
keywords:
    - typing
    - dino
    - survival
    - meteor
    - jurassic
    - parallax
    - combo
    - speed
    - extinction
    - reflex
    - canvas
    - pixel
hashtags:
    - '#SurviveDinoSurvive'
    - '#TypingGame'
    - '#DinoRun'
    - '#JavaScriptGaming'
    - '#PixelArt'
    - '#RetroArcade'
    - '#IndieDev'
    - '#WebGame'
    - '#CodingLife'
    - '#Julibe'

## Call to Action
view_btn: Run for Life
read_btn: Check Intel

## Design
colors:
    - '#44ff44'
    - '#ffffff'
    - '#ffff00'

## System
created: 2024-11-15 00:00:00 -05
version: 1.1.0
iteration: 36
fmContentType: Content
date: 2025-12-18 00:35:12 -05
published: true
---

# Survive Dino Survive!
### Outrun the Extinction

Welcome to the Jurassic. The sky is falling, the ground is melting, and your fingers are the only thing standing between a pixelated dinosaur and total extinction. 🦖

## The Prehistoric Sprint (Project Overview)
Survive Dino Survive! is a high-stakes typing survival game that turns your keyboard into an engine of escape. You control a lone dinosaur sprinting through 8 increasingly dangerous zones, from calm forests to erupting volcanic craters. The game uses a "Proximity Warning" system—a dynamic danger meter that tracks how close the encroaching lava and meteors are. If your typing speed drops or your accuracy falters, the "Doom" catches up.

The spark for this project was to take the educational "typing tutor" genre—specifically inspired by the legendary *Mario Teaches Typing* from 1992—and inject it with the adrenaline of a survival horror game. I wanted to create a sense of mounting dread where the visual environment and the typing prompts become more chaotic as the meteor shower intensifies.

## The Rhythm of Survival (Theory)
The project is inspired by the 1992 DOS classic *Mario Teaches Typing*, adopting its core loop of character-by-character progression but replacing the Mushroom Kingdom with a crumbling prehistoric world. Conceptually, it explores "Kinetic Literacy"—the idea that typing becomes an instinctive, physical reaction to environmental stress. The 8 zones represent a narrative arc of displacement, moving from safety to chaos and finally to "Paradise Found." Culturally, the project pays homage to the 8-bit arcade era, using custom pixelation filters and a restricted color palette to evoke a sense of urgent, low-fi nostalgia.

## Technical Tectonic Shifts (Challenges)
1.  **Typing Synchronization**: Creating a robust input listener that handles rapid keystrokes, differentiates between correct/incorrect characters, and manages a decaying combo multiplier.
2.  **Parallax Danger Logic**: Building a multi-layered background system where the scroll speed and color filters are directly tied to the "Danger Level" variable.
3.  **Meteor Physics**: Implementing a particle system for incoming meteors that calculates trajectories and impacts without slowing down the core typing logic.
4.  **Aesthetic Cohesion**: Applying a global `#pixelate` SVG filter that ensures UI elements and the Canvas look like they are being projected on an old CRT monitor.

## Jurassic Architectures (Solutions)
1.  **State-Driven Input**: A centralized `updateStatsUI` function that recalculates multiplier, score, and WPM (Words Per Minute) in real-time, providing immediate feedback to the player.
2.  **Dynamic Danger Mapping**: A linear interpolation algorithm that maps the `danger` value (0 to 100) to the background's red-shift and the intensity of the screen-shake effect.
3.  **Recursive Particle Management**: Meteors and "dust" particles are pooled and recycled within the game loop, maintaining high performance even during the final "Doomsday" zones.
4.  **CSS Variable Theming**: Using the `:root` to handle font sizes and colors, allowing for instant transitions between the "Safe Green" and "Extinction Red" states of the UI.

## Educational Adrenaline (Impact)
Survive Dino Survive! demonstrates how gamification can transform a mundane skill like typing into an engaging experience. It’s a tool for both fun and self-improvement, proving that web technologies like the Canvas API and SVG filters can create deeply atmospheric worlds that load in less than a second.

## Mission Data (Scope)
* **8 Unique Zones**: Each with its own sentence data and visual progression.
* **Dynamic Danger Meter**: A real-time "Proximity Warning" bar that tracks your speed vs. doom.
* **Combo System**: Build multipliers for perfect accuracy to climb the leaderboard.
* **3 Difficulty Tiers**: From simple words to complex narrative phrases.
* **Retro CRT Aesthetic**: Custom SVG pixelation and scanline effects for total immersion.

## Under the Scales (Technical Details)
The core loop is built around a character-by-character comparison. The `state.charIdx` tracks the player's progress through the current string, while a `danger` incrementor runs every frame. Typing a correct character decreases the danger, while time passing increases it.

### Crafted With (Built With)
This project leverages the power of **Vanilla JavaScript** and pixel-perfect assets.
* **JavaScript**: Manages the typing logic, state machine, and zone transitions.
* **HTML5 Canvas**: Renders the parallax mountains, the dinosaur animations, and the meteors.
* **SVG Filters**: Powers the iconic "Pixelate" look that gives the game its retro soul.

### Future Evolutions (Future Improvements)
* Introduce "Power-up" words that temporarily freeze the danger meter.
* Add a "Ghost Run" feature where you can see the trail of your previous fastest attempt.
* Implement custom text loading, allowing players to practice with their own documents.

### Known Extiction Factors (Known Bugs)
* On very small screens, the sentence display may wrap in a way that obscures the dinosaur.
* Rapid "backspacing" is intentionally disabled to maintain the high-stakes survival feel.

## How to Survive (Controls)
* **Keyboard**: Type the letters shown on the screen as fast and accurately as possible.
* **Difficulty**: Choose Easy, Med, or Hard on the main menu.
* **Combo**: Don't wait more than 3 seconds between letters or your multiplier resets!
* **Objective**: Reach the 8th zone (Safe Valley) before the danger bar reaches the end.

## Final Debrief (Conclusion)
Survive Dino Survive! is a testament to the fact that the most basic tools—like a keyboard—can be the key to the most intense experiences. It’s a game of speed, focus, and survival, built for the modern web.

## The Rapid Recap (TL;DR Version)
Survive Dino Survive! is a typing game where you help a pixel dinosaur outrun meteors and lava. To move, you have to type the sentences that appear on the screen. The faster and more accurately you type, the further you get from the fire.

It's heavily inspired by the classic *Mario Teaches Typing* from 1992. It looks like an old-school arcade game with "pixel" graphics and has 8 different levels of difficulty. It’s a fun way to practice typing while trying to survive a prehistoric apocalypse.

## About the Creator Julibe (About Julibe)
I’m Julibe. Follow me at [@julibe](https://julibe.com/ "Julibe - Crafting Digital Experiences!"). I’m a developer and designer, always looking for new ways to turn code into a memorable experience.

I believe that every project should have a soul. Whether it's a typing game or a complex business solution, I aim for high performance and high impact. If you have an idea that needs a creative developer with a senior architectural vision, let’s talk.

- [Web](https://julibe.com/ "Warp speed to Julibe's Portfolio!")
- [GitHub](https://julibe.ibe/github "Inspect Julibe's source code on GitHub")
- [WhatsApp](https://julibe.com/whatsapp "Direct link to chat with Julibe on WhatsApp")
- [X (Twitter)](https://julibe.com/twitter "Follow Julibe's updates on Twitter")
- [Instagram](https://julibe.com/instagram "See Julibe's visual adventures on Instagram")
- [Email](mailto:mail@julibe.com "Send a signal to Julibe via email")

**Copyright © 2025 - [https://julibe.com](https://julibe.com/)**