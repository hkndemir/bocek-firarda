import Phaser from 'phaser';
import { TEX_R } from '../assets/svgTextures';

export type Mood = 'run' | 'jump' | 'slide' | 'hit';

export const MASCOT_SCALE = 0.7;
const FOOT_UNITS = 78; // kalçadan ayak ucuna
export const FOOT_PX = FOOT_UNITS * MASCOT_SCALE;

interface Leg { img: Phaser.GameObjects.Image; side: 1 | -1; rest: number; amp: number; inv: boolean; tuck: number; spread: number }
interface Antenna { img: Phaser.GameObjects.Image; out: 1 | -1 }

const MOUTH: Record<Mood, string> = {
  run: 'mouth_smile', jump: 'mouth_open', slide: 'mouth_strain', hit: 'mouth_shock',
};

/**
 * Böcek mascot'u: parçalardan kurulu, tamamen kodla canlandırılan karakter.
 * (kalça = (0,0); ayaklar +FOOT_UNITS aşağıda). Container konumu zemine göre ayarlanır.
 */
export class Cockroach extends Phaser.GameObjects.Container {
  /** Zıplama yüksekliği (ekran px). Dışarıdan tween ile sürülür. */
  lift = 0;
  private rig: Phaser.GameObjects.Container;
  private mood: Mood = 'run';
  private phase = 0;
  private clock = 0;
  private blinkAt = 2;
  private blinkUntil = 0;
  private sx = 1;
  private sy = 1;
  private legs: Leg[] = [];
  private antennae: Antenna[] = [];
  private torso: Phaser.GameObjects.Image;
  private head: Phaser.GameObjects.Image;
  private eyes: Phaser.GameObjects.Image[] = [];
  private pupils: Phaser.GameObjects.Image[] = [];
  private mouth: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.rig = new Phaser.GameObjects.Container(scene, 0, 0);
    this.add(this.rig);

    const img = (key: string, px: number, py: number, ox = 0.5, oy = 0.5) => {
      const i = new Phaser.GameObjects.Image(scene, px, py, key).setScale(1 / TEX_R).setOrigin(ox, oy);
      this.rig.add(i);
      return i;
    };
    const leg = (px: number, py: number, side: 1 | -1, rest: number, amp: number, inv: boolean, tuck: number, spread: number) => {
      const i = img('roach_leg', px, py, side === 1 ? 0.4 : 0.6, 0.045).setFlipX(side === -1);
      this.legs.push({ img: i, side, rest, amp, inv, tuck, spread });
    };
    const antenna = (out: 1 | -1) => {
      const i = img('roach_antenna', out * 13, -86, out === 1 ? 0.27 : 0.73, 0.97).setFlipX(out === -1);
      this.antennae.push({ img: i, out });
    };

    // Arka plan: antenler, arka/orta bacaklar
    antenna(-1); antenna(1);
    for (const s of [1, -1] as const) {
      leg(-s * 12, 18, s, 8, 34, false, 60, 55);   // arka bacak
      leg(-s * 24, 2, s, 38, 26, true, 80, 85);    // orta bacak
    }
    this.torso = img('roach_torso', 0, -8);
    // Ön bacaklar (kol gibi), gövdenin önünde
    for (const s of [1, -1] as const) leg(-s * 27, -22, s, 58, 30, false, 125, 100);
    this.head = img('roach_head', 0, -62);
    for (const s of [-1, 1]) this.eyes.push(img('roach_eye', s * 14, -72));
    for (const s of [-1, 1]) this.pupils.push(img('roach_pupil', s * 14, -72));
    this.mouth = img('mouth_smile', 0, -45);

    this.rig.setScale(MASCOT_SCALE);
    scene.add.existing(this);
  }

  setMood(m: Mood): void {
    this.mood = m;
    this.mouth.setTexture(MOUTH[m]);
    const ps = (m === 'hit' ? 0.5 : 1) / TEX_R;
    this.pupils.forEach((p) => p.setScale(ps));
  }

  getMood(): Mood { return this.mood; }

  reset(): void {
    this.mood = 'run';
    this.setMood('run');
    this.lift = 0;
    this.sx = this.sy = 1;
    this.rig.setAngle(0);
    this.setAngle(0);
    this.setAlpha(1);
  }

  /** Her karede çağrılır. speed01: 0..1 arası oyun hızı. */
  tick(dtMs: number, speed01: number): void {
    const t = dtMs / 1000;
    this.clock += t;
    const m = this.mood;
    this.phase += t * (m === 'run' ? 9 + speed01 * 7 : m === 'hit' ? 14 : 18);
    const s = Math.sin(this.phase);

    for (const l of this.legs) {
      const ph = l.side * (l.inv ? -1 : 1);
      let ang: number;
      if (m === 'run') ang = l.rest + l.amp * ph * s;
      else if (m === 'jump') ang = l.tuck + 6 * s;
      else if (m === 'slide') ang = l.spread;
      else ang = l.rest + 60 * Math.sin(this.phase * ph + l.rest);
      l.img.setAngle(l.side * ang);
    }

    for (const a of this.antennae) {
      let base = 10;
      let wig = Math.sin(this.clock * 7 + a.out) * 10;
      if (m === 'jump') { base = 28; wig = Math.sin(this.clock * 26 + a.out) * 14; }
      else if (m === 'slide') { base = 4; wig = Math.sin(this.clock * 9) * 4; }
      else if (m === 'hit') { base = 58; wig = Math.sin(this.clock * 20) * 8; }
      a.img.setAngle(a.out * base + wig);
    }

    let bob = 0;
    let tsx = 1;
    let tsy = 1;
    let headAng = 0;
    let torsoAng = 0;
    let lookX = Math.sin(this.clock * 3) * 2;
    let lookY = 2 + Math.sin(this.phase * 2) * 1.5;
    if (m === 'run') { bob = -Math.abs(s) * 5; torsoAng = s * 3; headAng = -s * 4; }
    else if (m === 'jump') { tsx = 0.92; tsy = 1.12; headAng = Math.sin(this.clock * 20) * 3; lookX = 0; lookY = -3; }
    else if (m === 'slide') { tsx = 1.18; tsy = 0.55; lookX = 0; lookY = 4; }
    else { lookX = Math.sin(this.clock * 30) * 3; lookY = Math.cos(this.clock * 30) * 3; headAng = Math.sin(this.clock * 18) * 8; }
    this.torso.setAngle(torsoAng);
    this.head.setAngle(headAng);
    this.mouth.setAngle(headAng * 0.5);

    if (this.clock >= this.blinkAt) {
      this.blinkUntil = this.clock + 0.12;
      this.blinkAt = this.clock + 2 + Math.random() * 2.5;
    }
    const blinking = this.clock < this.blinkUntil && m !== 'hit';
    this.eyes.forEach((e, i) => {
      e.setScale(1 / TEX_R, (blinking ? 0.08 : 1) / TEX_R);
      this.pupils[i].setVisible(!blinking).setPosition(e.x + (i === 0 ? lookX : -lookX * 0.6), e.y + lookY);
    });

    const k = 1 - Math.exp(-16 * t);
    this.sx += (tsx - this.sx) * k;
    this.sy += (tsy - this.sy) * k;
    this.rig.setScale(MASCOT_SCALE * this.sx, MASCOT_SCALE * this.sy);
    // ezilince ayaklar zeminde kalsın
    this.rig.y = bob - this.lift + FOOT_UNITS * MASCOT_SCALE * (1 - this.sy);
    this.rig.angle += ((m === 'hit' ? 180 : 0) - this.rig.angle) * (1 - Math.exp(-10 * t));
  }
}
