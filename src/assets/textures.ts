import Phaser from 'phaser';

/** Kodla üretilen çizgi film tarzı yer tutucu sprite'lar. Gerçek atlas gelince bu dosya değişir. */
export function makePlaceholderTextures(scene: Phaser.Scene): void {
  const g = scene.make.graphics({ x: 0, y: 0 }, false);
  const tex = (key: string, w: number, h: number, draw: () => void) => {
    g.clear(); draw(); g.generateTexture(key, w, h);
  };
  const eye = (x: number, y: number, r: number) => {
    g.fillStyle(0xffffff).fillCircle(x, y, r);
    g.fillStyle(0x000000).fillCircle(x + 1, y + 1, r * 0.45);
  };
  const smile = (x: number, y: number, r: number, color = 0x000000) => {
    g.lineStyle(2, color).beginPath().arc(x, y, r, 0.2, Math.PI - 0.2).strokePath();
  };

  // Böcek: antenler, kanatlı gövde, bacaklar, büyük gözler
  tex('bug', 48, 64, () => {
    g.lineStyle(2, 0x2b140a);
    g.lineBetween(18, 12, 8, 1).lineBetween(30, 12, 40, 1);
    g.lineBetween(8, 34, 0, 30).lineBetween(8, 46, 0, 52);
    g.lineBetween(40, 34, 48, 30).lineBetween(40, 46, 48, 52);
    g.fillStyle(0x7a4220).fillEllipse(24, 40, 34, 44);
    g.lineStyle(2, 0x4a2410).lineBetween(24, 20, 24, 62);
    g.fillStyle(0x9b5a2e, 0.8).fillEllipse(17, 40, 12, 34).fillEllipse(31, 40, 12, 34);
    g.fillStyle(0x4a2410).fillCircle(24, 14, 11);
    eye(19, 12, 5); eye(29, 12, 5);
    smile(24, 15, 5, 0xffffff);
  });

  // Terlik
  tex('slipper', 64, 36, () => {
    g.fillStyle(0x000000, 0.25).fillRoundedRect(3, 6, 60, 30, 15);
    g.fillStyle(0xd63a86).fillRoundedRect(0, 0, 60, 32, 16);
    g.fillStyle(0xff7ab8).fillRoundedRect(5, 4, 50, 22, 11);
    g.fillStyle(0x7a1d4a).fillRoundedRect(8, 2, 22, 8, 4);
    g.fillStyle(0xffffff).fillCircle(46, 14, 3);
  });

  // Kedi: kulaklar, yüz, bıyık, çizgiler
  tex('cat', 68, 68, () => {
    g.fillStyle(0xf0a030).fillRoundedRect(4, 14, 60, 52, 20);
    g.fillTriangle(6, 22, 12, 0, 28, 16).fillTriangle(40, 16, 56, 0, 62, 22);
    g.fillStyle(0xffc0c0).fillTriangle(12, 18, 14, 7, 22, 16).fillTriangle(46, 16, 54, 7, 56, 18);
    g.fillStyle(0xc07010).fillRect(30, 16, 4, 10).fillRect(22, 16, 3, 7).fillRect(43, 16, 3, 7);
    g.fillStyle(0xffffff).fillEllipse(23, 36, 14, 16).fillEllipse(45, 36, 14, 16);
    g.fillStyle(0x000000).fillEllipse(23, 36, 4, 12).fillEllipse(45, 36, 4, 12);
    g.fillStyle(0xff6080).fillTriangle(31, 46, 37, 46, 34, 50);
    g.lineStyle(1, 0x000000);
    g.lineBetween(4, 46, 22, 48).lineBetween(4, 53, 22, 51);
    g.lineBetween(64, 46, 46, 48).lineBetween(64, 53, 46, 51);
  });

  // Elektrikli süpürge: gövde, tekerlek, üstten sarkan hortum
  tex('vacuum', 68, 68, () => {
    g.fillStyle(0x2563eb).fillRoundedRect(4, 20, 60, 40, 14);
    g.fillStyle(0x60a5fa).fillRoundedRect(10, 25, 36, 12, 6);
    g.fillStyle(0x111111).fillCircle(16, 62, 7).fillCircle(52, 62, 7);
    g.fillStyle(0xbbbbbb).fillCircle(16, 62, 3).fillCircle(52, 62, 3);
    g.fillStyle(0xef4444).fillCircle(54, 32, 4);
    g.lineStyle(7, 0x333333).beginPath().arc(34, 20, 18, Math.PI, 0).strokePath();
    g.fillStyle(0x333333).fillRoundedRect(10, 0, 12, 10, 3);
    g.fillStyle(0xffffff).fillCircle(26, 46, 4).fillCircle(40, 46, 4);
    g.fillStyle(0x000000).fillCircle(27, 47, 2).fillCircle(41, 47, 2);
  });

  // Kayan yol parçası (360x80)
  tex('road', 360, 80, () => {
    g.fillStyle(0x3a3e50).fillRect(0, 0, 360, 80);
    g.fillStyle(0x23253a).fillRect(0, 0, 20, 80).fillRect(340, 0, 20, 80);
    g.fillStyle(0xcfd3e8).fillRect(19, 0, 3, 80).fillRect(338, 0, 3, 80);
    g.fillStyle(0x666b85);
    for (const x of [135, 225]) g.fillRect(x - 2, 10, 4, 36);
    g.fillStyle(0x4a4e62).fillCircle(60, 20, 2).fillCircle(300, 55, 2).fillCircle(180, 70, 2);
  });
  tex('shadow', 40, 14, () => { g.fillStyle(0x000000, 0.4).fillEllipse(20, 7, 36, 12); });
  g.destroy();
}
