/** CrazyGames SDK v3 sarmalayıcısı. SDK yoksa (yerel geliştirme, başka portal) tüm çağrılar sessizce atlanır. */

interface CgSdk {
  init(): Promise<void>;
  game: { gameplayStart(): void; gameplayStop(): void };
  ad: {
    requestAd(
      type: 'midgame' | 'rewarded',
      cb: { adStarted?: () => void; adFinished?: () => void; adError?: (e: unknown) => void },
    ): void;
  };
}

const SDK_URL = 'https://sdk.crazygames.com/crazygames-sdk-v3.js';
const MIN_AD_GAP_MS = 60_000; // reklamlar arası en az süre (portal ayrıca sınırlar)

let sdk: CgSdk | null = null;
let lastAd = Date.now(); // ilk reklam en erken 60 sn sonra
let playing = false;

/** SDK'yı yükler. Yüklenemezse oyun SDK'sız devam eder. */
export async function initPlatform(): Promise<void> {
  try {
    await new Promise<void>((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SDK_URL;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('sdk load failed'));
      document.head.appendChild(s);
      setTimeout(() => reject(new Error('sdk timeout')), 3000);
    });
    const candidate = (window as unknown as { CrazyGames?: { SDK?: CgSdk } }).CrazyGames?.SDK;
    if (!candidate) return;
    await candidate.init();
    sdk = candidate;
    if (playing) candidate.game.gameplayStart(); // SDK, oyun başladıktan sonra hazır olduysa
  } catch {
    sdk = null;
  }
}

export function gameplayStart(): void {
  if (playing) return;
  playing = true;
  try { sdk?.game.gameplayStart(); } catch { /* ignore */ }
}

export function gameplayStop(): void {
  if (!playing) return;
  playing = false;
  try { sdk?.game.gameplayStop(); } catch { /* ignore */ }
}

/**
 * Uygunsa ara reklam gösterir; reklam bitince (veya hata/yoksa hemen) `done` çağrılır.
 * `onAdState(true/false)` reklam sırasında sesi/girdiyi durdurmak içindir.
 */
export function maybeMidgameAd(done: () => void, onAdState: (active: boolean) => void): void {
  if (!sdk || Date.now() - lastAd < MIN_AD_GAP_MS) return done();
  let finished = false;
  const end = () => {
    if (finished) return;
    finished = true;
    lastAd = Date.now();
    onAdState(false);
    done();
  };
  try {
    sdk.ad.requestAd('midgame', {
      adStarted: () => onAdState(true),
      adFinished: end,
      adError: end,
    });
  } catch { end(); }
}
