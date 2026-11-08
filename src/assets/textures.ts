import Phaser from 'phaser';

/** Placeholder art generated at runtime. Swap for real atlases later. */
export function makePlaceholderTextures(scene: Phaser.Scene): void {
  const g = scene.make.graphics({ x: 0, y: 0 }, false);
  const tex = (key: string, w: number, h: number, draw: () => void) => {
    g.clear(); draw(); g.generateTexture(key, w, h);
  };
  tex('bug', 40, 56, () => {
    g.fillStyle(0x6b3a1e).fillEllipse(20, 32, 34, 48);
    g.fillStyle(0x3d2010).fillCircle(20, 8, 8);
    g.fillStyle(0xffffff).fillCircle(16, 7, 3).fillCircle(24, 7, 3);
    g.fillStyle(0x000000).fillCircle(16, 7, 1).fillCircle(24, 7, 1);
  });
  tex('slipper', 56, 30, () => {
    g.fillStyle(0xe8499a).fillRoundedRect(0, 0, 56, 30, 14);
    g.fillStyle(0xffffff).fillRoundedRect(8, 6, 22, 8, 4);
  });
  tex('cat', 64, 64, () => {
    g.fillStyle(0xf0a030).fillRoundedRect(4, 12, 56, 48, 16);
    g.fillTriangle(6, 18, 14, 0, 22, 18).fillTriangle(42, 18, 50, 0, 58, 18);
    g.fillStyle(0x000000).fillCircle(22, 34, 4).fillCircle(42, 34, 4);
  });
  tex('vacuum', 64, 64, () => {
    g.fillStyle(0x3b82f6).fillRoundedRect(4, 4, 56, 56, 12);
    g.fillStyle(0x222222).fillRect(0, 26, 64, 12);
    g.fillStyle(0xdddddd).fillCircle(32, 32, 10);
  });
  // Seamless road tile (360x80): lane dividers and edge lines scroll via TileSprite
  tex('road', 360, 80, () => {
    g.fillStyle(0x3a3e50).fillRect(0, 0, 360, 80);
    g.fillStyle(0x23253a).fillRect(0, 0, 20, 80).fillRect(340, 0, 20, 80);
    g.fillStyle(0xcfd3e8).fillRect(19, 0, 3, 80).fillRect(338, 0, 3, 80);
    g.fillStyle(0x666b85);
    for (const x of [135, 225]) g.fillRect(x - 2, 10, 4, 36);
  });
  tex('shadow', 40, 14, () => { g.fillStyle(0x000000, 0.4).fillEllipse(20, 7, 36, 12); });
  g.destroy();
}
