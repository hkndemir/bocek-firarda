import Phaser from 'phaser';

export type Action = 'left' | 'right' | 'jump' | 'slide' | 'restart' | 'mute';

/** Translates keyboard and swipe/tap input into abstract actions. */
export class InputController {
  constructor(scene: Phaser.Scene, onAction: (a: Action) => void) {
    const kb = scene.input.keyboard!;
    const map: Record<string, Action> = {
      LEFT: 'left', A: 'left', RIGHT: 'right', D: 'right',
      UP: 'jump', W: 'jump', SPACE: 'jump', DOWN: 'slide', S: 'slide', ENTER: 'restart', M: 'mute',
    };
    for (const [k, a] of Object.entries(map)) kb.on(`keydown-${k}`, () => onAction(a));

    scene.input.on('pointerup', (p: Phaser.Input.Pointer) => {
      const dx = p.upX - p.downX, dy = p.upY - p.downY;
      const ax = Math.abs(dx), ay = Math.abs(dy);
      if (Math.max(ax, ay) < 25) return onAction('restart'); // tap (only used on game over)
      if (ax > ay) onAction(dx < 0 ? 'left' : 'right');
      else onAction(dy < 0 ? 'jump' : 'slide');
    });
  }
}
