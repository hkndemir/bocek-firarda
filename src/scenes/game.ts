import Phaser from 'phaser';
import { JUMP_MS, LANES, MAX_SPEED, PLAYER_Y, SLIDE_MS, START_SPEED } from '../core/constants';
import { project, laneX, Y_SPAWN } from '../core/perspective';
import { hits, speedAt, type ObstacleKind, type PlayerState } from '../core/rules';
import { loadBest, saveBest } from '../core/storage';
import { Spawner } from '../systems/spawner';
import { InputController, type Action } from '../systems/input';
import { AudioManager, type Sfx } from '../systems/audio';
import { gameplayStart, gameplayStop, maybeMidgameAd } from '../platform/crazygames';
import { Cockroach, FOOT_PX } from '../entities/cockroach';
import { TEX_R } from '../assets/svgTextures';
import { Scenery } from '../ui/scenery';
import { Hud } from '../ui/hud';

/** Engelin mantıksal y'si `ly`; ekran konumu perspektiften hesaplanır. */
interface Obstacle extends Phaser.GameObjects.Image { lane: number; kind: ObstacleKind; ly: number }

/** Havada duran engellerin zeminden yüksekliği (ekran px, k=1 iken). */
const LIFT: Partial<Record<ObstacleKind, number>> = { spray: 62 };

export class GameScene extends Phaser.Scene {
  private player!: Cockroach;
  private state: PlayerState = { lane: 1, jumping: false, sliding: false };
  private obstacles: Obstacle[] = [];
  private spawner = new Spawner();
  private scenery!: Scenery;
  private hud!: Hud;
  private audio = new AudioManager();
  private nextMilestone = 500;
  private shadow!: Phaser.GameObjects.Image;
  private elapsed = 0;
  private dist = 0;
  private score = 0;
  private best = loadBest();
  private dead = false;
  private adActive = false;

  constructor() { super('Game'); }

  create(): void {
    this.cameras.main.setBackgroundColor('#2a2d3a');
    this.scenery = new Scenery(this);
    this.shadow = this.add.image(LANES[1], PLAYER_Y, 'shadow').setScale(1 / TEX_R).setDepth(4);
    this.player = new Cockroach(this, LANES[1], PLAYER_Y - FOOT_PX).setDepth(5);
    this.hud = new Hud(this, this.audio.muted, () => this.toggleMute());
    new InputController(this, (a) => this.onAction(a));
    this.restart();
  }

  private restart(): void {
    this.obstacles.forEach((o) => o.destroy());
    this.obstacles = [];
    this.spawner.reset();
    this.tweens.killTweensOf(this.player);
    this.state = { lane: 1, jumping: false, sliding: false };
    this.player.reset();
    this.player.setPosition(LANES[1], PLAYER_Y - FOOT_PX);
    this.elapsed = this.dist = this.score = 0;
    this.dead = false;
    this.nextMilestone = 500;
    this.hud.hideGameOver();
    gameplayStart();
  }

  private toggleMute(): void {
    this.audio.unlock();
    this.hud.setMuted(this.audio.toggleMute());
  }

  private sfx(n: Sfx): void { this.audio.play(n); }

  private onAction(a: Action): void {
    this.audio.unlock();
    if (a === 'mute') return this.toggleMute();
    if (this.adActive) return;
    if (this.dead) {
      if (a === 'restart' || a === 'jump') {
        maybeMidgameAd(() => this.restart(), (on) => {
          this.adActive = on;
          this.audio.suspended = on;
        });
      }
      return;
    }
    const s = this.state;
    const p = this.player;
    if (a === 'left') s.lane = Math.max(0, s.lane - 1);
    else if (a === 'right') s.lane = Math.min(LANES.length - 1, s.lane + 1);
    else if (a === 'jump' && !s.jumping) {
      s.sliding = false;
      s.jumping = true;
      this.sfx('jump');
      p.setMood('jump');
      this.tweens.add({ targets: p, lift: 100, yoyo: true, duration: JUMP_MS / 2, ease: 'Sine.easeOut',
        onComplete: () => { s.jumping = false; if (!this.dead) p.setMood('run'); } });
    } else if (a === 'slide' && !s.sliding && !s.jumping) {
      s.sliding = true;
      this.sfx('slide');
      p.setMood('slide');
      this.time.delayedCall(SLIDE_MS, () => {
        s.sliding = false;
        if (!this.dead && p.getMood() === 'slide') p.setMood('run');
      });
    }
    if (a === 'left' || a === 'right') {
      this.sfx('lane');
      this.tweens.add({ targets: p, x: LANES[s.lane], duration: 100 });
      this.tweens.add({ targets: p, angle: a === 'left' ? -12 : 12, duration: 80, yoyo: true });
    }
  }

  private place(o: Obstacle): void {
    const pr = project(o.ly);
    o.setPosition(laneX(o.lane, pr.k), pr.vy - (LIFT[o.kind] ?? 0) * pr.k)
      .setScale((pr.k * (o.kind === 'slipper' ? 1 : 1.05)) / TEX_R)
      .setAlpha(Math.min(1, pr.p * 6))
      .setDepth(o.ly > PLAYER_Y + 25 ? 6 : 2 + pr.q);
  }

  update(_t: number, delta: number): void {
    const speed01 = Phaser.Math.Clamp((speedAt(this.elapsed) - START_SPEED) / (MAX_SPEED - START_SPEED), 0, 1);
    this.player.tick(delta, speed01);
    this.shadow.setPosition(this.player.x, PLAYER_Y).setScale((1 - this.player.lift / 260) / TEX_R);
    if (this.dead) return;

    const dt = delta / 1000;
    this.elapsed += dt;
    const dy = speedAt(this.elapsed) * dt;
    this.scenery.scroll(dy);
    this.dist += dy / 40;
    this.score += dy / 10;

    for (const s of this.spawner.update(dy)) {
      const o = this.add.image(0, 0, s.kind).setOrigin(0.5, 1) as Obstacle;
      o.lane = s.lane; o.kind = s.kind; o.ly = Y_SPAWN;
      this.place(o);
      this.obstacles.push(o);
    }
    for (const o of this.obstacles) {
      o.ly += dy;
      this.place(o);
      if (hits(this.state, { lane: o.lane, kind: o.kind, y: o.ly })) return this.die();
    }
    this.obstacles = this.obstacles.filter((o) => {
      if (o.ly > 700) { o.destroy(); return false; }
      return true;
    });
    if (this.score >= this.nextMilestone) { this.nextMilestone += 500; this.sfx('milestone'); }
    this.hud.update(this.score, this.dist, Math.max(this.best, this.score));
  }

  private die(): void {
    this.dead = true;
    gameplayStop();
    this.best = Math.max(this.best, this.score);
    saveBest(this.best);
    this.player.setMood('hit');
    this.sfx('hit');
    this.cameras.main.shake(250, 0.015);
    this.cameras.main.flash(150, 255, 80, 80);
    this.hud.showGameOver(this.score, this.best);
  }
}
