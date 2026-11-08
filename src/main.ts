import Phaser from 'phaser';
import { GAME_H, GAME_W } from './core/constants';
import { BootScene } from './scenes/boot';
import { GameScene } from './scenes/game';

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: GAME_W,
  height: GAME_H,
  backgroundColor: '#111111',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  input: { activePointers: 1 },
  scene: [BootScene, GameScene],
});
