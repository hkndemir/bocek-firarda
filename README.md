# bocek-firarda
A funny cockroach endless runner game built with Phaser 3

## Development
```
npm install
npm run dev     # dev server
npm run build   # typecheck + production build in dist/
```
Controls: ←/→ or A/D change lane, ↑/W/Space jump, ↓/S slide, Enter restart. Touch: swipe; tap to restart.
Obstacles: slipper (jump), vacuum hose (slide), cat (change lane).

Structure: `src/core` pure rules, `src/systems` input/spawner, `src/scenes`, `src/ui`, `src/assets`.
