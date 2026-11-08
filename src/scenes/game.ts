import Phaser from 'phaser';
import { GAME_H, GAME_W, JUMP_MS, LANES, PLAYER_Y, SLIDE_MS } from '../core/constants';
import { hits, speedAt, type ObstacleKind, type PlayerState } from '../core/rules';
import { loadBest, saveBest } from '../core/storage';
import { Spawner } from '../systems/spawner';
import { InputController, type Action } from '../systems/input';
import { AudioManager, type Sfx } from '../systems/audio';
import { Hud } from '../ui/hud';

interface Obstacle extends Phaser.GameObjects.Image { lane: number; kind: ObstacleKind }

export class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Image;
  private state: PlayerState = { lane: 1, jumping: false, sliding: false };
  private obstacles: Obstacle[] = [];
  private spawner = new Spawner();
  private hud!: Hud;
  private audio = new AudioManager();
  private nextMilestone = 500;
  private road!: Phaser.GameObjects.TileSprite;
  private shadow!: Phaser.GameObjects.Image;
  private elapsed = 0;
  private dist = 0;
  private score = 0;
  private best = loadBest();
  private dead = false;

  constructor() { super('Game'); }

  create(): void {
    this.cameras.main.setBackgroundColor('#2a2d3a');
    this.drawRoad();
    this.shadow = this.add.image(LANES[1], PLAYER_Y + 30, 'shadow').setDepth(4);
    this.player = this.add.image(LANES[1], PLAYER_Y, 'bug').setDepth(5);
    this.hud = new Hud(this, this.audio.muted, () => this.toggleMute());
    new InputController(this, (a) => this.onAction(a));
    this.restart();
  }

  private drawRoad(): void {
    this.road = this.add.tileSprite(GAME_W / 2, GAME_H / 2, GAME_W, GAME_H, 'road');
  }

  private restart(): void {
    this.obstacles.forEach((o) => o.destroy());
    this.obstacles = [];
    this.spawner.reset();
    this.state = { lane: 1, jumping: false, sliding: false };
    this.player.setPosition(LANES[1], PLAYER_Y).setScale(1).setAngle(0).setAlpha(1);
    this.elapsed = this.dist = this.score = 0;
    this.dead = false;
    this.nextMilestone = 500;
    this.hud.hideGameOver();
  }

  private toggleMute(): void {
    this.audio.unlock();
    this.hud.setMuted(this.audio.toggleMute());
  }

  private sfx(n: Sfx): void { this.audio.play(n); }

  private onAction(a: Action): void {
    this.audio.unlock();
    if (a === 'mute') return this.toggleMute();
    if (this.dead) { if (a === 'restart' || a === 'jump') this.restart(); return; }
    const s = this.state;
    if (a === 'left') s.lane = Math.max(0, s.lane - 1);
    else if (a === 'right') s.lane = Math.min(LANES.length - 1, s.lane + 1);
    else if (a === 'jump' && !s.jumping) {
      s.jumping = s.sliding = false;
      s.jumping = true;
      this.sfx('jump');
      this.tweens.add({ targets: this.player, scale: 1.5, yoyo: true, duration: JUMP_MS / 2,
        onComplete: () => { s.jumping = false; } });
    } else if (a === 'slide' && !s.sliding && !s.jumping) {
      s.sliding = true;
      this.sfx('slide');
      this.player.setScale(1, 0.5);
      this.time.delayedCall(SLIDE_MS, () => { s.sliding = false; this.player.setScale(1); });
    }
    if (a === 'left' || a === 'right') {
      this.sfx('lane');
      this.tweens.add({ targets: this.player, x: LANES[s.lane], duration: 90 });
      this.tweens.add({ targets: this.player, angle: a === 'left' ? -15 : 15, duration: 60, yoyo: true });
    }
  }

  update(_t: number, delta: number): void {
    if (this.dead) return;
    const dt = delta / 1000;
    this.elapsed += dt;
    const dy = speedAt(this.elapsed) * dt;
    this.road.tilePositionY -= dy;
    this.shadow.x = this.player.x;
    this.shadow.setScale(2 - this.player.scale * 0.7);
    this.dist += dy / 40;
    this.score += dy / 10;

    for (const s of this.spawner.update(dy)) {
      const o = this.add.image(LANES[s.lane], -40, s.kind) as Obstacle;
      o.lane = s.lane; o.kind = s.kind;
      this.obstacles.push(o);
    }
    for (const o of this.obstacles) {
      o.y += dy;
      if (hits(this.state, o)) return this.die();
    }
    this.obstacles = this.obstacles.filter((o) => {
      if (o.y > GAME_H + 60) { o.destroy(); return false; }
      return true;
    });
    if (this.score >= this.nextMilestone) { this.nextMilestone += 500; this.sfx('milestone'); }
    this.hud.update(this.score, this.dist, Math.max(this.best, this.score));
  }

  private die(): void {
    this.dead = true;
    this.best = Math.max(this.best, this.score);
    saveBest(this.best);
    this.player.setAngle(180).setAlpha(0.8);
    this.sfx('hit');
    this.cameras.main.shake(250, 0.015);
    this.cameras.main.flash(150, 255, 80, 80);
    this.hud.showGameOver(this.score, this.best);
  }
}
