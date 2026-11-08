import { LANES } from '../core/constants';
import type { ObstacleKind } from '../core/rules';

const KINDS: ObstacleKind[] = ['slipper', 'cat', 'vacuum', 'spray'];

/** Distance-based spawner: decides what spawns and when (no Phaser objects). */
export class Spawner {
  private nextIn = 400;

  update(dy: number): { lane: number; kind: ObstacleKind }[] {
    this.nextIn -= dy;
    if (this.nextIn > 0) return [];
    this.nextIn = 260 + Math.random() * 180;
    const out = [{ lane: Math.floor(Math.random() * LANES.length), kind: pick() }];
    // sometimes block a second lane, but never all three (always fair)
    if (Math.random() < 0.3) {
      let l2 = Math.floor(Math.random() * LANES.length);
      if (l2 === out[0].lane) l2 = (l2 + 1) % LANES.length;
      out.push({ lane: l2, kind: pick() });
    }
    return out;
  }

  reset(): void { this.nextIn = 400; }
}

const pick = (): ObstacleKind => KINDS[Math.floor(Math.random() * KINDS.length)];
