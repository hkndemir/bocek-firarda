import { loadMuted, saveMuted } from '../core/storage';

export type Sfx = 'jump' | 'slide' | 'lane' | 'hit' | 'milestone';

/** Web Audio ile üretilen basit ses efektleri (harici dosya yok). */
export class AudioManager {
  private ctx: AudioContext | null = null;
  muted = loadMuted();

  /** Tarayıcılar ilk kullanıcı etkileşimine kadar sesi engeller. */
  unlock(): void {
    try {
      this.ctx ??= new AudioContext();
      if (this.ctx.state === 'suspended') void this.ctx.resume();
    } catch { /* ses desteklenmiyor */ }
  }

  toggleMute(): boolean {
    this.muted = !this.muted;
    saveMuted(this.muted);
    return this.muted;
  }

  play(name: Sfx): void {
    if (this.muted || !this.ctx || this.ctx.state !== 'running') return;
    switch (name) {
      case 'jump': return this.tone(280, 560, 0.18, 'square', 0.08);
      case 'slide': return this.tone(320, 120, 0.2, 'sawtooth', 0.06);
      case 'lane': return this.tone(420, 380, 0.06, 'triangle', 0.07);
      case 'hit': return this.tone(180, 40, 0.45, 'sawtooth', 0.15);
      case 'milestone':
        this.tone(660, 660, 0.1, 'square', 0.07);
        return this.tone(880, 880, 0.15, 'square', 0.07, 0.1);
    }
  }

  private tone(f0: number, f1: number, dur: number, type: OscillatorType, vol: number, delay = 0): void {
    const ctx = this.ctx!;
    const t = ctx.currentTime + delay;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(f1, 1), t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + dur);
  }
}
