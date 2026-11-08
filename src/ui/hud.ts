import Phaser from 'phaser';
import { GAME_H, GAME_W } from '../core/constants';

export class Hud {
  private score: Phaser.GameObjects.Text;
  private info: Phaser.GameObjects.Text;
  private over: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    const st = { fontFamily: 'sans-serif', color: '#fff', stroke: '#000', strokeThickness: 4 };
    this.score = scene.add.text(12, 10, '', { ...st, fontSize: '22px' }).setDepth(10);
    this.info = scene.add.text(GAME_W - 12, 10, '', { ...st, fontSize: '16px', align: 'right' })
      .setOrigin(1, 0).setDepth(10);
    this.over = scene.add.text(GAME_W / 2, GAME_H / 2, '', { ...st, fontSize: '30px', align: 'center' })
      .setOrigin(0.5).setDepth(10).setVisible(false);
  }

  update(score: number, dist: number, best: number): void {
    this.score.setText(`Skor ${Math.floor(score)}`);
    this.info.setText(`${Math.floor(dist)} m\nEn iyi ${Math.floor(best)}`);
  }

  showGameOver(score: number, best: number): void {
    this.over.setText(`YAKALANDIN!\nSkor ${Math.floor(score)}\nEn iyi ${Math.floor(best)}\n\nDokun / Enter: tekrar`).setVisible(true);
  }
  hideGameOver(): void { this.over.setVisible(false); }
}
