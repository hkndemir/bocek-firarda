import Phaser from 'phaser';
import { CHARACTER_PARTS } from './svg/character';
import { OBSTACLE_SPRITES } from './svg/obstacles';

/** Her SVG bu çarpanla rasterize edilir (keskin görüntü için); sprite'lar 1/TEX_R ölçeğiyle gösterilir. */
export const TEX_R = 2;

export interface SvgSprite { key: string; w: number; h: number; body: string }

const toDataUri = (s: SvgSprite): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s.w * TEX_R}" height="${s.h * TEX_R}" viewBox="0 0 ${s.w} ${s.h}">${s.body}</svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
};

const load = (s: SvgSprite): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`SVG yüklenemedi: ${s.key}`));
    img.src = toDataUri(s);
  });

/** Tüm SVG sprite'larını Phaser texture'larına çevirir. */
export async function loadSvgTextures(scene: Phaser.Scene): Promise<void> {
  const all = [...CHARACTER_PARTS, ...OBSTACLE_SPRITES];
  const imgs = await Promise.all(all.map(load));
  all.forEach((s, i) => scene.textures.addImage(s.key, imgs[i]));
}
