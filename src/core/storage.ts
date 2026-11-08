const KEY = 'bocek-firarda:best';

// localStorage can throw in sandboxed iframes (portals), so guard everything.
export function loadBest(): number {
  try { return Number(localStorage.getItem(KEY)) || 0; } catch { return 0; }
}
export function saveBest(v: number): void {
  try { localStorage.setItem(KEY, String(Math.floor(v))); } catch { /* ignore */ }
}

const MUTE_KEY = 'bocek-firarda:muted';
export function loadMuted(): boolean {
  try { return localStorage.getItem(MUTE_KEY) === '1'; } catch { return false; }
}
export function saveMuted(m: boolean): void {
  try { localStorage.setItem(MUTE_KEY, m ? '1' : '0'); } catch { /* ignore */ }
}
