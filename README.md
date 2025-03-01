# Til Valhalla - Norse-Themed Cascading Slot Game

Welcome to **Til Valhalla**, an epic cascading slot game inspired by Norse mythology! Spin the 3x5 grid to gather Glory, trigger special effects, battle in Valkyrie’s Trial, and prove your worth to reach Valhalla. This game features falling animations, cascading wins, and skill-based challenges, all wrapped in a rich Viking aesthetic.

## Overview

"Til Valhalla" is a web-based slot game built with HTML, CSS, and JavaScript. Players spin a 3x5 grid of Norse symbols (represented by emojis for now, with plans for graphics), match symbols on paylines to win Glory, and experience cascading mechanics where winning symbols explode and new symbols fall until no more wins occur. The game includes bonuses (e.g., Loki’s Trickery, Freyr’s Bounty) and a skill-based mini-game (Valkyrie’s Trial) to test reflexes.

## Features
- **Cascading Wins**: Winning symbols explode, and new symbols fall until no more wins are possible.
- **Falling Animations**: Symbols drop from above with a bounce, creating a slot machine feel.
- **Norse Theme**: Inspired by Viking mythology, featuring symbols like Thor, Odin, Valkyrie, and more.
- **Special Effects**: Bonuses like Loki’s Trickery (random win modifiers), Freyr’s Bounty (extra spins), Mjolnir’s Free Spin, and Valkyrie’s Trial (skill-based challenge).
- **Paytable**: Detailed payouts and effects for each symbol, accessible via the welcome screen.
- **Welcome Screen**: Introduces the game and paytable on first load, with a "How to Play" option.
- **Responsive Design**: Works on desktop and mobile browsers, with simple styling for emojis.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ryanpyles/tilValhalla.git
   cd tilValhalla

   # Til Valhalla - Game Guide

## 2. Open in a Web Browser
No server or build tools are required. Simply open `tilValhalla.html` in a modern web browser (e.g., Chrome, Firefox, Safari).


## Installation

### Open in a Web Browser
- No server or build tools are required. Simply open `tilValhalla.html` in a modern web browser (e.g., Chrome, Firefox, Safari).
- Ensure all files (`tilValhalla.html`, `styles.css`, `script.js`) are in the same directory.

### Optional Graphics
- Currently, the game uses emojis. If you have graphics, place them in a `graphics/` subdirectory and update `script.js` and `styles.css` to reference them (see "Graphics Integration" below).

## Usage

### Launch the Game
- Open `tilValhalla.html` in a browser. The welcome screen will appear on first load, explaining the game and paytable.
- Click "Start Game" to begin, or "How to Play" to revisit the welcome screen.

### Gameplay
- Click "Spin ⚡" to spin the reels. Symbols fall, cascade on wins, and trigger bonuses or trials.
- Use "Reset 🌀" to restart the game with zero Glory.
- During Valkyrie’s Trial, click weak points (✨) to slay foes and attack points (🔥) to defend, earning bonus Glory.

### Winning
- Match 3+ symbols on paylines (horizontal, diagonal, zigzag) to win Glory.
- Wilds (Raven 🦅, Serpent 🌊) substitute for any symbol except Valkyrie.
- Special effects include Loki’s Trickery, Freyr’s Bounty, Mjolnir’s Free Spin, and Valkyrie’s Trial.

## Graphics Integration

Currently, "Til Valhalla" uses emojis for simplicity. To integrate graphics:

1. Place PNG files in `tilValhalla/graphics/` with names like `rune.png`, `axe.png`, etc. (see the "Graphics" section below for a full list).
2. Update `script.js` to map symbols to graphic paths (e.g., `symbolImages['Rune'] = '../graphics/rune.png'`).
3. Modify `styles.css` to use `background-image` and `background-size` for `.reel`, buttons, and Trial elements, resizing to 80x80px for symbols, 150x50px for buttons, etc.

## Graphics

The game currently uses emojis, but here’s a list of required graphics (PNG with transparent backgrounds, unless noted):

### Reel Symbols (80x80px)
- `rune.png` (Rune, 🪨)
- `axe.png` (Axe, 🪓)
- `thor.png` (Thor, ⚡)
- `odin.png` (Odin, 🐦)
- `valkyrie.png` (Valkyrie, 🛡️)
- `raven.png` (Raven, 🦅)
- `loki.png` (Loki, 🐍)
- `freyr.png` (Freyr, 🌾)
- `mjolnir.png` (Mjolnir, 🔨)
- `serpent.png` (Serpent, 🌊)
- `runestone.png` (Runestone, 🗿)

### Buttons (150x50px)
- `spin_button_idle.png` (Spin Button Idle)
- `spin_button_hover.png` (Spin Button Hover)
- `reset_button_idle.png` (Reset Button Idle)
- `reset_button_hover.png` (Reset Button Hover)

### Background (1920x1080px, PNG or JPG)
- `background.png` or `stormBackground.png`

### Reel Frame (600x400px)
- `reelFrame.png` (Wooden frame with transparent center)

### Glory Meter (300x40px)
- `glory_meter.png` (Background)
- `glory_fill.png` (Fill, repeatable horizontally)

### Trial Elements
- `enemy_idle.png` (Enemy Idle, 80x80px)
- `enemy_defeated.png` (Enemy Defeated, 80x80px)
- `shield_idle.png` (Shield Idle, 80x80px)
- `shield_active.png` (Shield Active, 80x80px)
- `weak_point.png` (Weak Point, 20x20px)
- `attack_point.png` (Attack Point, 20x20px)
- `battlefield.png` (Trial Background, 800x400px)
- `trial_header.png` (Trial Header, 300x50px)

## Features (Detailed)

- **Cascading Wins**: Winning symbols explode, and new symbols fall until no more wins are possible (max 5 cascades).
- **Falling Animations**: Symbols drop from above with a bounce, creating a slot machine feel.
- **Norse Bonuses**:
  - **Loki (🐍)**: Randomly reshuffles (+50 Glory), doubles, or halves winnings.
  - **Freyr (🌾)**: Extends Freyja’s Blessing (+2 spins) or grants 2 spins.
  - **Mjolnir (🔨)**: Triggers a free spin.
  - **Valkyrie (🛡️)**: Initiates Valkyrie’s Trial, a 2-phase skill challenge (Slay Foes, Hold Shield Wall).
- **Paytable**: Accessible via welcome screen, detailing payouts and effects.
- **Glory Meter**: Tracks progress toward Valhalla (5,000 Glory).
- **Milestones**: Unlock Thor’s Hammer (1,000 Glory), Freyja’s Blessing (2,500 Glory), and Valhalla (5,000 Glory).

## Known Issues

- **Graphics**: Currently using emojis; graphics integration is incomplete (see "Graphics Integration").
- **Performance**: May lag on low-end devices with complex animations or large graphics (not applicable with emojis).
- **Cascading Bugs**: Ensure cascades trigger correctly; report any stalling or misbehavior.
- **Browser Compatibility**: Tested on modern browsers (Chrome, Firefox, Safari); older browsers may need polyfills for animations.

## Contributing

I welcome contributions to "Til Valhalla"! Here’s how to get involved:

### Fork the Repository
Create your own copy on GitHub.

### Create a Branch
Use a descriptive name (e.g., `feature/graphics-integration`).

### Make Changes
Add graphics, improve animations, fix bugs, or enhance features.

### Submit a Pull Request
Describe your changes and link to the issue or feature request.

### Testing
Ensure changes work across browsers and maintain existing functionality.

### Issues
- Report bugs or suggest features by opening an issue on GitHub.
- Include steps to reproduce, expected behavior, and actual behavior.

### Guidelines
- Follow the code style (consistent indentation, comments for complex logic).
- Test changes locally before submitting.
- Keep graphics consistent with the Norse theme (e.g., Viking runes, wooden textures).

## License

This project is licensed under the [MIT License](LICENSE). See the `LICENSE` file for details.

## Contact

For questions or feedback, contact Ryan Pyles at [ryan.pyles@me.com](mailto:ryan.pyles@me.com) or open an issue on GitHub.
