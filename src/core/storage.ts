const KEY = 'bocek-firarda:best';

// localStorage can throw in sandboxed iframes (portals), so guard everything.
export function loadBest(): number {
  try { return Number(localStorage.getItem(KEY)) || 0; } catch { return 0; }
}
export function saveBest(v: number): void {
  try { localStorage.setItem(KEY, String(Math.floor(v))); } catch { /* ignore */ }
}
