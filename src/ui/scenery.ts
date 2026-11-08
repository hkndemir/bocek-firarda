import Phaser from 'phaser';
import { GAME_H, GAME_W } from '../core/constants';
import { CENTER_X, HORIZON_Y, TRAVEL, projectP } from '../core/perspective';

const BUILDING_COLORS = [0xff7aa8, 0x6fd3a2, 0xffc857, 0x9a86ff, 0x5ec8ff, 0xff9a62];
const WALL_OFF = 200; // bina duvarının yoldan (merkezden) uzaklığı
const BUILD_H = 230;
const N_BANDS = 12;
const N_BUILD = 6;
const N_DASH = 10;

/** Perspektifli yol, kaldırım ve renkli binalar; her karede Graphics ile yeniden çizilir. */
export class Scenery {
  private g: Phaser.GameObjects.Graphics;
  private total = 0;

  constructor(scene: Phaser.Scene) {
    this.g = scene.add.graphics().setDepth(0);
    this.draw();
  }

  /** dy: bu karede katedilen mantıksal mesafe. */
  scroll(dy: number): void {
    this.total += dy / TRAVEL;
    this.draw();
  }

  private quad(c: number, a: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): void {
    this.g.fillStyle(c, a).fillTriangle(x1, y1, x2, y2, x3, y3).fillTriangle(x1, y1, x3, y3, x4, y4);
  }

  private draw(): void {
    const g = this.g;
    g.clear();
    const C = Phaser.Display.Color;

    // Gökyüzü
    const bands = 8;
    for (let i = 0; i < bands; i++) {
      const c = C.Interpolate.ColorWithColor(C.ValueToColor(0x4cb8ff), C.ValueToColor(0xffe2a8), bands - 1, i);
      g.fillStyle(C.GetColor(c.r, c.g, c.b)).fillRect(0, (i * HORIZON_Y) / bands, GAME_W, HORIZON_Y / bands + 1);
    }
    g.fillStyle(0xfff3c4, 0.9).fillCircle(280, 70, 26);
    // Uzak siluet
    g.fillStyle(0x7a6fb0, 0.6);
    [[10, 30], [50, 46], [95, 26], [140, 40], [215, 34], [250, 50], [300, 28], [335, 38]].forEach(([x, h]) =>
      g.fillRect(x, HORIZON_Y - h, 34, h));
    // Zemin
    g.fillStyle(0x59607a).fillRect(0, HORIZON_Y, GAME_W, GAME_H - HORIZON_Y);

    const qB = (GAME_H - HORIZON_Y) / 330; // ekran altı için q
    const kOf = (q: number) => 0.1 + 0.9 * q;
    const kB = kOf(qB);
    const X = (off: number, k: number) => CENTER_X + off * k;

    // Kaldırımlar + yol
    for (const sgn of [-1, 1]) {
      this.quad(0xaab0c4, 1, X(sgn * 160, 0.1), HORIZON_Y, X(sgn * 190, 0.1), HORIZON_Y, X(sgn * 190, kB), GAME_H, X(sgn * 160, kB), GAME_H);
      this.quad(0xe2e6f2, 1, X(sgn * 156, 0.1), HORIZON_Y, X(sgn * 162, 0.1), HORIZON_Y, X(sgn * 162, kB), GAME_H, X(sgn * 156, kB), GAME_H);
    }
    this.quad(0x3b3f56, 1, X(-160, 0.1), HORIZON_Y, X(160, 0.1), HORIZON_Y, X(160, kB), GAME_H, X(-160, kB), GAME_H);

    // Hız hissi veren yol şeritleri
    const fb = (this.total * N_BANDS) % 1;
    const base = Math.floor(this.total * N_BANDS);
    for (let i = -1; i < N_BANDS; i++) {
      if ((i - base) % 2 === 0) continue;
      const s0 = Math.max((i + fb) / N_BANDS, 0);
      const s1 = Math.min((i + 1 + fb) / N_BANDS, 1);
      if (s1 <= s0) continue;
      const a = projectP(s0), b = projectP(s1);
      this.quad(0x454a63, 1, X(-160, a.k), a.vy, X(160, a.k), a.vy, X(160, b.k), b.vy, X(-160, b.k), b.vy);
    }

    // Şerit çizgileri (kesikli)
    const fd = (this.total * N_DASH) % 1;
    for (const off of [-45, 45]) {
      for (let i = -1; i < N_DASH; i++) {
        const s0 = Math.max((i + fd) / N_DASH, 0);
        const s1 = Math.min((i + fd + 0.5) / N_DASH, 1);
        if (s1 <= s0) continue;
        const a = projectP(s0), b = projectP(s1);
        this.quad(0xe8ecf8, 1, X(off, a.k) - 2.6 * a.k, a.vy, X(off, a.k) + 2.6 * a.k, a.vy, X(off, b.k) + 2.6 * b.k, b.vy, X(off, b.k) - 2.6 * b.k, b.vy);
      }
    }

    // Binalar (uzaktan yakına)
    const fbld = (this.total * N_BUILD) % 1;
    const bbase = Math.floor(this.total * N_BUILD);
    for (let i = -1; i < N_BUILD; i++) {
      const s0 = (i + fbld) / N_BUILD;
      const s1 = Math.min((i + 1 + fbld) / N_BUILD, 1);
      if (s1 <= 0.001) continue;
      const a = projectP(Math.max(s0, 0)), b = projectP(s1);
      for (const sgn of [-1, 1]) {
        const id = i - bbase + (sgn === 1 ? 3 : 0);
        const col = BUILDING_COLORS[((id % 6) + 6) % 6];
        const shade = C.ValueToColor(col).darken(18).color;
        const xa = X(sgn * WALL_OFF, a.k), xb = X(sgn * WALL_OFF, b.k);
        this.quad(col, 1, xa, a.vy, xb, b.vy, xb, b.vy - BUILD_H * b.k, xa, a.vy - BUILD_H * a.k);
        this.quad(shade, 1, xa, a.vy, xb, b.vy, xb, b.vy - 14 * b.k, xa, a.vy - 14 * a.k);
        if (s0 < 0) continue;
        // pencereler
        const pt = (u: number, hf: number): [number, number] => {
          const p = projectP(s0 + (s1 - s0) * u);
          return [X(sgn * WALL_OFF, p.k), p.vy - hf * BUILD_H * p.k];
        };
        for (const [u0, u1] of [[0.14, 0.4], [0.58, 0.84]]) {
          for (const [h0, h1] of [[0.18, 0.34], [0.46, 0.62], [0.74, 0.9]]) {
            const [ax, ay] = pt(u0, h0), [bx, by] = pt(u1, h0), [cx, cy] = pt(u1, h1), [dx, dy] = pt(u0, h1);
            const lit = ((id + Math.round(h0 * 10) + Math.round(u0 * 10)) % 3) !== 0;
            this.quad(lit ? 0xfff0b0 : 0x3a4a78, 1, ax, ay, bx, by, cx, cy, dx, dy);
          }
        }
      }
    }
  }
}
