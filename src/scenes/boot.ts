import Phaser from 'phaser';
import { loadSvgTextures } from '../assets/svgTextures';

export class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }
  create(): void {
    loadSvgTextures(this).then(() => this.scene.start('Game'));
  }
}
