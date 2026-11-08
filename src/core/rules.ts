import { ACCEL, HIT_BAND, MAX_SPEED, PLAYER_Y, START_SPEED } from './constants';

/** How the player can get past an obstacle. */
export type ObstacleKind = 'slipper' | 'cat' | 'vacuum';
export type Counter = 'jump' | 'slide' | 'dodge';

export const KIND_COUNTER: Record<ObstacleKind, Counter> = {
  slipper: 'jump', // low: hop over it
  vacuum: 'slide', // hose overhead: slide under
  cat: 'dodge', // full block: change lane
};

export interface PlayerState {
  lane: number;
  jumping: boolean;
  sliding: boolean;
}

export const speedAt = (elapsedSec: number): number =>
  Math.min(MAX_SPEED, START_SPEED + ACCEL * elapsedSec);

/** Pure collision rule: does this obstacle hit the player? */
export function hits(
  p: PlayerState,
  o: { lane: number; y: number; kind: ObstacleKind },
): boolean {
  if (o.lane !== p.lane || Math.abs(o.y - PLAYER_Y) > HIT_BAND) return false;
  const c = KIND_COUNTER[o.kind];
  if (c === 'jump') return !p.jumping;
  if (c === 'slide') return !p.sliding;
  return true;
}
