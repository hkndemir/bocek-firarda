import { LANES, PLAYER_Y, GAME_W } from './constants';

/** Sahte 3B: mantıksal y (spawn → oyuncu) ekran konumu ve ölçeğe çevrilir. Çarpışma mantığı etkilenmez. */
export const HORIZON_Y = 170;
export const Y_SPAWN = 40;
export const TRAVEL = PLAYER_Y - Y_SPAWN;
export const CENTER_X = GAME_W / 2;
const K0 = 0.1; // ufukta ölçek

export interface Proj { p: number; q: number; k: number; vy: number }

export function projectP(p: number): Proj {
  const q = Math.max(p, 0) ** 2;
  return { p, q, k: K0 + (1 - K0) * q, vy: HORIZON_Y + (PLAYER_Y - HORIZON_Y) * q };
}
export const project = (y: number): Proj => projectP((y - Y_SPAWN) / TRAVEL);
export const laneX = (lane: number, k: number): number => CENTER_X + (LANES[lane] - CENTER_X) * k;
