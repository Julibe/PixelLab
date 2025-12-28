---
title: Metrio - Chromatic Expedition
slogan: Order in the Void
slug: metrio-chromatic-expedition
extract: Experience a block-stacking sculpture in motion. 🧊 Battle algorithmic AI, master hydro-acoustic soundscapes, and survive the Obsidian Anomalies. Enter the chromatic void!
description: A minimalist, high-performance Tetris evolution featuring adaptive Web Audio synthesis, 40 procedural color palettes, and an aggressive AI opponent system.

## Pricing & Estimates
time_concept: 5
time_design: 22
time_coding: 10
time_testing: 8
time_polish: 45

price_rate: 26
price_currency: USD
price_hours_day: 8

## Code Structure
difficulty: high
technologies:
    - JavaScript
    - HTML5
    - Canvas
    - Web Audio API
    - LocalStorage
    - Gamepad API

category: game

## Metadata
tags:
    - Puzzle
    - Minimalist
    - Arcade
    - AI
    - Procedural
    - Abstract
emojis:
    - 🧩
    - 🧊
    - 🔊
    - 🤖
    - 🎨
    - 🕹️
    - 💎
    - ⚖️
    - 🌌
    - 🏁
keywords:
    - tetris
    - metrio
    - procedural
    - synth
    - stacker
    - grid
    - battle
    - chromatic
    - geometry
    - logic
    - minimalist
    - algorithm
hashtags:
    - '#Metrio'
    - '#TetrisEvolved'
    - '#MinimalistGaming'
    - '#CreativeCoding'
    - '#WebAudio'
    - '#JavaScriptGame'
    - '#IndieDev'
    - '#ProceduralArt'
    - '#AIBattle'
    - '#Julibe'

## Call to Action
view_btn: Initiate Composition
read_btn: Study the Order

## Design
colors:
    - '#ffffff'
    - '#222222'
    - '#cfcfcf'

## System
created: 2025-02-15 09:00:00 -05
version: 1.3.0
iteration: 55
fmContentType: Content
date: 2025-12-18 00:55:10 -05
published: true
---

# Metrio - Chromatic Expedition
### Order in the Void

Metrio is not merely a game; it is a kinetic sculpture you build in real-time. Step into an arena where geometry meets emotion, and explore the delicate tension between absolute order and total entropy. 🧊

## The Kinetic Sculpture (Project Overview)
Metrio is an evolved block-stacking experience that transforms a classic puzzle into an immersive digital exhibit. Built with a focus on "Minimalist Brutalism," it features a procedural palette engine that shifts through 40 unique color schemes every five levels. It isn't just a solo challenge—Metrio introduces an AI Battle Mode where an algorithmic opponent can steal your pieces and sabotage your grid, forcing you to adapt your strategy on the fly.

The inspiration for this project was the idea of "Visual Music." I wanted to create a game that felt like a performance. By integrating a hydro-acoustic soundscape that reacts to every rotation and drop, Metrio becomes a living organism where the player is the conductor of the chaos.

## The Entropy Balance (Theory)
The philosophy behind Metrio is rooted in the "Order vs. Chaos" dichotomy found in the works of Piet Mondrian and the Bauhaus movement. It challenges the player to maintain structural integrity in a space that is constantly being disrupted by Obsidian Anomalies (bombs) and Vertical Purifications. Culturally, it sits at the intersection of early 90s puzzle logic and the modern generative art scene. The "Chromatic Expedition" refers to the psychological journey through color as the game speeds up, testing the player's focus as the environment morphs from soothing white to deep, oppressive voids.

## Geometric Friction (Challenges)
1.  **Algorithmic Rivalry**: Developing an AI opponent that can analyze its own grid while simultaneously interacting with the player's space to send "Garbage Lines" or steal active pieces.
2.  **Stateful Palette Swapping**: Implementing a system that transitions CSS variables and Canvas fill-styles across 40 distinct themes without disrupting the rendering loop.
3.  **Real-Time Hydro-Acoustics**: Using the Web Audio API to synthesize "liquid" sounds—relying on frequency ramps and reverb nodes—that trigger exactly upon rotation, movement, and line clears.
4.  **Anomaly Logic**: Creating "Special Blocks" like the Obsidian Anomaly that require custom collision and destruction logic outside the standard line-clear array.

## Elegant Compositions (Solutions)
1.  **Dual-Arena Context**: A modular rendering engine that can handle one or two independent grids simultaneously, allowing for seamless transitions between solo and battle modes.
2.  **Reactive Palette Engine**: A centralized theme controller that maps `level / 5` to a specific index in a large JSON array of HEX codes, updating the `root` CSS variables instantly.
3.  **Synthesis Controller**: A specialized `audio_controller` that manages a pool of oscillators, using exponential ramps to create "organic" sounds that feel less like digital beeps and more like a physical performance.
4.  **Column-Wise Purification**: A custom algorithm that scans the grid vertically to handle "Purification" events, clearing entire columns based on specific block triggers rather than horizontal rows.

## Aesthetic Significance (Impact)
Metrio serves as a benchmark for high-performance, asset-free browser gaming. It demonstrates how a minimalist aesthetic—relying on clean lines and sophisticated color theory—can create a deeper sense of immersion than photorealistic graphics. It is a tool for focus, a challenge for the mind, and a testament to the power of procedural systems.

## Operational Parameters (Scope)
* **Procedural Aesthetics**: 40 distinct color palettes that evolve as you climb levels.
* **AI Battle Mode**: Compete against a real-time algorithmic opponent.
* **Adaptive Soundscape**: Real-time Web Audio synthesis for a unique sonic identity.
* **Obsidian Anomalies**: Special bomb blocks that clear a 3x3 area upon landing.
* **Bento UI Overlay**: A modern, clean dashboard for stats and level progress.

## Under the Surface (Technical Details)
The core engine uses a matrix-based grid representation where integers correspond to active pieces, settled blocks, and special anomalies. The collision detection checks for boundary overflows and matrix intersections before every movement or rotation.

### Built With (Built With)
This project leverages the power of **Vanilla JS** and procedural logic.
* **JavaScript**: Manages the AI decision-making, physics, and state.
* **HTML5 Canvas**: Renders the minimalist geometry of the blocks and grid.
* **Web Audio API**: Synthesizes the hydro-acoustic sound effects on the fly.

### Future Refinements (Future Improvements)
* Introduce "Palette Editor" for players to create and share their own color schemes.
* Add a "Zen Mode" with a purely generative background and no gravity.
* Implement "Spectral Pieces" that can pass through existing blocks.

### Known Anomalies (Known Bugs)
* Occasional audio clipping on mobile devices if too many lines are cleared at once.
* Rare visual artifacts when transitioning themes on high-refresh-rate monitors.

## Pilot Protocol (Controls)
* **Move**: WASD or Arrow Keys / Left Stick.
* **Rotate**: W / Up Arrow / A Button.
* **Drop**: S / Down Arrow (Soft) or Space (Hard).
* **Hold Piece**: Q / L1 Button.
* **Objective**: Stack pieces, clear lines, and outlast the AI or the speed of the void.

## Final Summary (Conclusion)
Metrio is a celebration of geometry, color, and code. It is a reminder that in the space between the pieces, there is order to be found. It is a digital sculpture that exists only as long as you keep building.

## The Quick Rundown (TL;DR Version)
Metrio is a sleek, modern version of Tetris with a minimalist art style. It features 40 different color themes that change as you get better at the game. You can play by yourself or fight against an AI that tries to mess up your board.

Every sound you hear is generated by the code in real-time, making it feel like a live performance. It’s light, fast, and works perfectly in your browser with no downloads. It’s the classic puzzle you know, turned into a work of art.

## Connect with the Architect Julibe (About Julibe)
I’m Julibe. Follow me at [@julibe](https://julibe.com/ "Julibe - Crafting Digital Experiences!"). I’m a digital architect based in Bogotá, focused on creating high-performance, visually stunning solutions that push the boundaries of the browser.

I believe that code should be as beautiful as the art it renders. If you have a concept that needs a sophisticated technical touch and a unique visual perspective, let’s talk. Together, we can build something impactful.

- [Web](https://julibe.com/ "Warp speed to Julibe's Portfolio!")
- [GitHub](https://julibe.ibe/github "Inspect Julibe's source code on GitHub")
- [WhatsApp](https://julibe.com/whatsapp "Direct link to chat with Julibe on WhatsApp")
- [X (Twitter)](https://julibe.com/twitter "Follow Julibe's updates on Twitter")
- [Instagram](https://julibe.com/instagram "See Julibe's visual adventures on Instagram")
- [Email](mailto:mail@julibe.com "Send a signal to Julibe via email")

**Copyright © 2025 - [https://julibe.com](https://julibe.com/)**