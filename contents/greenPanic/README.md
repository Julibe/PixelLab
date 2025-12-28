---
  title: Green Panic
  slogan: Isometric Ghost-Hunting Chaos
  slug: green-panic
  extract: Dive into a 4-color isometric nightmare! 🟩 Outrun smart AI, survive random bomb sprees, and master the infinite maze in this Roguelike PacMan evolution.
  description: A 2.5D isometric arcade roguelite utilizing a GameBoy-inspired palette. Features procedural maze generation, reactive AI pathfinding, and dynamic 'Chaos Events' that alter game physics in real-time.

  ## Pricing & Estimates
  time_concept: 3
  time_design: 8
  time_coding: 14
  time_testing: 9
  time_polish: 6

  price_rate: 27
  price_currency: USD
  price_hours_day: 8

  ## Code Structure
  difficulty: medium
  technologies:
    - JavaScript
    - HTML5
    - Canvas
    - CSS
    - WebGL

  category: game

  ## Metadata
  tags:
    - PacMan
    - Isometric
    - Roguelike
    - Retro
    - Arcade
    - Procedural
  emojis:
    - 👻
    - 💣
    - 🟩
    - 🕹️
    - 🧪
    - 🏃
    - 📟
    - ⚡
    - 💀
    - 🔋
  keywords:
    - isometric
    - rogue
    - maze
    - gameboy
    - palette
    - ghost
    - chaos
    - dash
    - canvas
    - arcade
    - retro
    - pixel
  hashtags:
    - '#GreenPanic'
    - '#IsometricGame'
    - '#Roguelike'
    - '#GameBoyAesthetic'
    - '#JavaScriptGaming'
    - '#RetroDev'
    - '#IndieGame'
    - '#ProceduralArt'
    - '#ArcadeClassic'

  ## Call to Action
  view_btn: Enter the Labyrinth
  read_btn: View Survival Guide

  ## Design
  colors:
    - '#8bac0f'
    - '#9bbc0f'
    - '#0f380f'

  ## System
  created: 2023-03-15 00:00:00 -05
  version: 0.7.0
  iteration: 23
  fmContentType: Content
  date: 2025-12-18 00:05:22 -05
  published: true
---

# Green Panic
### Isometric Ghost-Hunting Chaos

Rediscover the thrill of the chase in a dimension you’ve never seen. Green Panic takes the foundational DNA of arcade legends and warps it into an isometric, procedural survival experience. 🟩

## The 2.5D Labyrinth (Project Overview)
Green Panic is an isometric homage to the classic *PacMan*, reimagined as a chaotic roguelite. Built using a strict 4-color GameBoy-inspired palette, it forces players to navigate infinite, procedurally generated mazes while being hunted by reactive AI. This isn't just about eating dots; it's about managing "Chaos Events"—random gameplay modifiers like bomb sprees and speed boosts—that turn a standard run into a fight for survival.

The goal was to blend the nostalgic limitations of 8-bit hardware with modern gameplay loops. By moving from 2D to an isometric perspective, the game introduces spatial complexity that challenges traditional patterns, making every corner turn a tactical decision.

## Monochrome Madness (Theory)
The project is a love letter to the Nintendo GameBoy and the early era of handheld gaming. The choice of the "Green Palette" (GB: #0f380f to #9bbc0f) is a deliberate attempt to evoke the specific "pea-soup" aesthetic of 1989. Conceptually, Green Panic explores "Emergent Chaos"—the idea that simple rules (move, avoid, collect) can become unpredictable when environmental variables are randomized. It sits at the intersection of retro-gaming nostalgia and the modern "one-more-run" Roguelite philosophy, referencing the mathematical elegance of isometric projection.

## Navigating the Static (Challenges)
1.  **Isometric Projection Logic**: Translating standard 2D grid coordinates into a 2.5D space (toIso) while maintaining pixel-perfect collision detection.
2.  **Smart AI Pathfinding**: Developing ghosts that don't just wander but actively react to the player's position within a non-linear maze.
3.  **Real-Time Proceduralism**: Generating infinite layouts that are guaranteed to be traversable while scaling difficulty dynamically.
4.  **Aesthetic Constraint**: Creating visual depth and clarity using only four shades of green, requiring clever use of sprites and shadows.

## Retro-Modern Engineering (Solutions)
1.  **Coordinate Mapping**: A custom mathematical bridge (ISO_X, ISO_Y) that allows the game engine to calculate depths correctly, ensuring that sprites appear "behind" or "in front" of walls accurately.
2.  **Chaos Event Controller**: A randomized state machine that triggers events like "Bomb Spree" or "Hyper Speed," injecting variety into the core loop.
3.  **Buffer Sprites**: Using 2D arrays to define pixel-art sprites within the code, allowing for a "Zero Image" architecture that loads instantly.
4.  **Scanline Post-Processing**: Utilizing CSS overlays and `image-rendering: pixelated` to reinforce the CRT and handheld screen feel.

## Operational Echoes (Impact)
Green Panic demonstrates how a limited aesthetic can actually enhance player focus and brand identity. By stripping away modern high-definition bloat, the project focuses purely on "game feel" and mechanical tension. It serves as a prime example of how to leverage the HTML5 Canvas for high-performance, stylized arcade experiences that work seamlessly across devices.

## System Parameters (Scope)
* **2.5D Perspective**: Full isometric rendering with depth-sorting for entities and walls.
* **Infinite Mazes**: A procedural generator that builds new labyrinths for every run.
* **The Chaos System**: Dynamic modifiers that shift game rules every few seconds.
* **Ghost AI**: Multiple enemy types with unique tracking behaviors.
* **Dash Mechanic**: A high-risk, high-reward mobility tool for narrow escapes.

## Under the Green Lens (Technical Details)
The game's engine revolves around the `toIso` function, which transforms Cartesian coordinates `(x, y)` into isometric coordinates. The visuals are drawn frame-by-frame on a Canvas, using the `SPRITES` object to render characters as arrays of blocks.

### Built With (Built With)
This project leverages the power of **Vanilla JavaScript** and 8-bit logic.
* **JavaScript**: Powers the procedural maze generation and AI decision-making.
* **HTML5 Canvas**: The primary rendering engine for all isometric blocks and sprites.
* **CSS3 Nesting**: Used for the HUD and post-processing scanline effects.

### Future Patches (Future Improvements)
* Introduce "Boss Ghosts" with unique isometric patterns.
* Add a local leader-board saved via `LocalStorage`.
* Expand the Chaos System to include screen-warping effects.

### Known Glitches (Known Bugs)
* Very rarely, a bomb may spawn in a location that temporarily blocks the exit path.
* Sprite flickering can occur if the browser's hardware acceleration is disabled.

## Survival Protocol (Controls)
* **Movement**: WASD or Arrow Keys.
* **Dash**: SPACE (Use carefully, it has a cooldown).
* **Objective**: Collect points, survive the chaos, and find the exit to the next floor.

## Final Debrief (Conclusion)
Green Panic is a proof of concept that proves that style and gameplay are superior to raw polygons. It’s a nostalgic trip through a green-tinted lens, built for the modern web architect who appreciates the beauty of the grid.

## The Quick Byte (TL;DR Version)
Green Panic is an isometric, GameBoy-style PacMan game where the levels are never the same. You have to escape ghosts while the game randomly changes the rules—like making you move faster or dropping bombs everywhere.

It's built with four shades of green to look like an old-school handheld game, but it plays like a modern roguelite. No images to download, just pure code and pure arcade tension.

## Meet the Architect Julibe (About Julibe)
I’m Julibe. Follow me at [@julibe](https://julibe.com/ "Julibe - Crafting Digital Experiences!"). I’m a developer and designer based in Bogotá, focused on turning complex code into visceral digital experiences.

I believe in the power of constraints and the elegance of the retro aesthetic. If you’re looking to build something that breaks the mold and challenges the status quo, I’m your architect. Let's build the future by remembering the past.

- [Web](https://julibe.com/ "Warp speed to Julibe's Portfolio!")
- [GitHub](https://julibe.ibe/github "Inspect Julibe's source code on GitHub")
- [WhatsApp](https://julibe.com/whatsapp "Direct link to chat with Julibe on WhatsApp")
- [X (Twitter)](https://julibe.com/twitter "Follow Julibe's updates on Twitter")
- [Instagram](https://julibe.com/instagram "See Julibe's visual adventures on Instagram")
- [Email](mailto:mail@julibe.com "Send a signal to Julibe via email")

**Copyright © 2025 - [https://julibe.com](https://julibe.com/)**