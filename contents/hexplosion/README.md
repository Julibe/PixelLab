---
title: Hexplosion
slogan: Six Axes of Geometric Flow
slug: hexplosion
extract: Experience the hypnotic rhythm of hexagonal matching. 🔄 Rotate clusters, trigger gravity-defying 3D combos, and unlock vibrant themes in this Three.js puzzle odyssey.
description: A high-performance 3D match-3 experience utilizing a hexagonal grid. Built with Three.js and custom GLSL shaders, it features procedural audio synthesis and a dynamic material-swapping theme engine.

## Pricing & Estimates
time_concept: 6
time_design: 12
time_coding: 28
time_testing: 8
time_polish: 6

price_rate: 27
price_currency: USD
price_hours_day: 8

## Code Structure
difficulty: high
technologies:
    - JavaScript
    - Three.js
    - WebGL
    - Web Audio API
    - CSS
    - HTML5

category: game

## Metadata
tags:
    - Match3
    - Puzzle
    - 3D
    - Geometric
    - Logic
    - Bento
emojis:
    - 💎
    - 🔄
    - 🌈
    - 🎮
    - 🌌
    - 🧪
    - ⚡
    - 🔮
    - 📐
    - 🔊
keywords:
    - hexplosion
    - match-3
    - hexagonal
    - webgl
    - threejs
    - puzzle
    - rotation
    - gem
    - combo
    - synth
    - dynamic
    - procedural
hashtags:
    - '#Hexplosion'
    - '#ThreeJS'
    - '#WebGL'
    - '#PuzzleGame'
    - '#CreativeCoding'
    - '#GameDev'
    - '#ThreeJS'
    - '#HexagonalGrid'
    - '#WebAudio'
    - '#Julibe'

## Call to Action
view_btn: Enter the Flow
read_btn: Decode the Grid

## Design
colors:
    - '#6c3483'
    - '#ffffff'
    - '#16a085'

## System
created: 2024-12-08 12:00:00 -05
version: 1.2.0
iteration: 38
fmContentType: Content
date: 2025-12-18 00:10:45 -05
published: true
---

# Hexplosion 🔷
### Six Axes of Geometric Flow

Forget the rigid boundaries of the square. Step into a world where symmetry and rotation define your success. Hexplosion is a 3D puzzle experience designed to pull you into a state of geometric flow. 💎

## The Hexagonal Dimension (Project Overview)
Hexplosion is a spatial match-3 game built on the power of Three.js. Unlike traditional grid-based puzzles, it utilizes a hexagonal coordinate system where players interact with intersections to rotate clusters of three gems. The project emphasizes visual polish, featuring a custom theme engine that swaps materials, lighting, and UI variables in real-time, accompanied by a procedural audio engine that synthesizes sound directly in the browser.

The inspiration came from a desire to break the "four-way" movement constraint. Hexagons offer six axes of freedom, creating more complex chain reactions and a more organic visual layout. It’s a study in how 3D depth can revitalize a classic genre, turning a simple matching task into a tactile, immersive ritual.

## The Symmetry of Logic (Theory)
Hexplosion is influenced by the mathematical beauty of honeycomb structures and the tile-based puzzles of the early 2000s. It explores the concept of "Rotational Symmetry"—specifically how three independent objects can be manipulated as a single unit to achieve order. Culturally, it aligns with the "Bento UI" movement, organizing its dashboard into clean, accessible compartments that feel grounded. The procedural audio reflects a minimalist philosophy: why load a library of sounds when you can calculate the frequency of success in real-time?

## Navigating 3D Space (Challenges)
1.  **Hexagonal Math**: Implementing a coordinate system that accurately maps 2D mouse clicks to 3D hexagonal intersections for rotation.
2.  **Gravity Logic**: Developing a custom "fall" algorithm that handles gems sliding down a 3D hexagonal lattice while maintaining stability.
3.  **Theme Synchronization**: Managing a global state that updates Three.js materials, CSS variables, and shader uniforms simultaneously without performance hitches.
4.  **Procedural SFX**: Crafting distinct, satisfying tones using the Web Audio API that scale in pitch with combo multipliers.

## Engineering the Grid (Solutions)
1.  **Intersection Triggers**: Utilizing Three.js raycasting to detect the "nearest intersection point" of three gem meshes, providing a clear visual indicator for rotation.
2.  **Tweening Engine**: A custom interpolation system that handles the smooth 120-degree rotation of gem clusters, ensuring the physics feel "heavy" yet responsive.
3.  **Dynamic Shader Backgrounds**: A GLSL-powered backdrop that morphs based on the active theme, providing visual depth without using large texture files.
4.  **Audio Context Management**: A centralized SoundEngine class that manages oscillators and gain nodes, ensuring audio only plays when triggered by specific game events.

## Tactical Resonance (Impact)
Hexplosion demonstrates the viability of high-fidelity, 3D interactive experiences within the browser. By leveraging modern WebGL and the Web Audio API, it provides a "native app" feel with zero installation. This project serves as a showcase for "Tech-Art" integration—where performance and aesthetics are balanced to create a truly hypnotic user experience.

## Operational Matrix (Scope)
* **3D Hexagonal Grid**: A fully interactive lattice of gems with depth-sorting and lighting.
* **Rotational Mechanics**: Left and right-click interactions to spin gem clusters 120 degrees.
* **Theme Engine**: Five distinct visual palettes (Nebula, Forest, Deep Sea, etc.) that shift the entire experience.
* **Adaptive Difficulty**: Scaling meter requirements and speed as levels increase.
* **Bento Dashboard**: A clean, modern UI for tracking level progress and scores.

## Under the Prism (Technical Details)
The core of the game is a 3D coordinate map where each gem is an instance of a sphere or custom geometry. The rotation logic calculates the center point of three adjacent gems and applies a rotation matrix to swap their positions in the logical array and the 3D scene.

### Built With (Built With)
This project leverages the power of **Three.js** and procedural logic.
* **Three.js**: Manages the 3D scene, lighting, and the gem meshes.
* **Web Audio API**: Synthesizes all sound effects, including the "match" jingles and "rotate" clicks.
* **GLSL Shaders**: Powers the animated, color-shifting background mesh.

### Future Increments (Future Improvements)
* Introduce "Special Gems" that clear entire hexagonal axes when matched.
* Add a "Zen Mode" with no timers for a purely meditative experience.

### Known Anomalies (Known Bugs)
* Occasional "jitter" in gem falling animation if multiple combos trigger in a single frame.
* Mobile browsers may require a user gesture to initialize the SoundEngine context.
* Color grading of some automatic color combinations can make it difficult to differentiate the hexagons.

## Interacting with the Grid (Controls)
* **Desktop**: Hover over an intersection. **Left-Click** to rotate Clockwise, **Right-Click** for Counter-Clockwise.
* **Mobile**: Tap an intersection to rotate.
* **Objective**: Match 3 or more gems of the same color to clear them and fill the level meter.

## Final Alignment (Conclusion)
Hexplosion 🔷 is more than a game; it is an exploration of 3D geometry and web performance. It proves that even the most established genres can be elevated through innovative interaction design and a commitment to technical polish.

## The Quick Rundown (TL;DR Version)
Hexplosion is a 3D match-3 game where you play on a honeycomb grid. Instead of swapping squares, you rotate groups of three gems to make matches. It looks and sounds amazing because everything is generated by code—from the glowing 3D gems to the synth-style music.

It features different themes that change the colors and lighting of the game as you play. It's a smooth, satisfying puzzle experience that lives entirely in your browser.

## About the Creator Julibe (About Julibe)
I’m Julibe. Follow me at [@julibe](https://julibe.com/ "Julibe - Crafting Digital Experiences!"). I’m a developer and designer based in Bogotá, obsessed with bridging the gap between art and code.

I specialize in creating interactive experiences that feel alive. If you have a concept that needs to push boundaries or a project that requires a high-end technical touch, let's collaborate. Together, we can shape the digital landscape.

- [Web](https://julibe.com/ "Warp speed to Julibe's Portfolio!")
- [GitHub](https://julibe.ibe/github "Inspect Julibe's source code on GitHub")
- [WhatsApp](https://julibe.com/whatsapp "Direct link to chat with Julibe on WhatsApp")
- [X (Twitter)](https://julibe.com/twitter "Follow Julibe's updates on Twitter")
- [Instagram](https://julibe.com/instagram "See Julibe's visual adventures on Instagram")
- [Email](mailto:mail@julibe.com "Send a signal to Julibe via email")

**Copyright © 2025 - [https://julibe.com](https://julibe.com/)**