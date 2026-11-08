import type { SvgSprite } from '../svgTextures';

const OUT = '#2a1206';

/** Böcek mascot'unun parçaları (ayrı ayrı çizilir, kod ile canlandırılır). */
export const CHARACTER_PARTS: SvgSprite[] = [
  {
    key: 'roach_torso', w: 60, h: 76,
    body: `<defs>
      <radialGradient id="g" cx="38%" cy="28%" r="80%"><stop offset="0" stop-color="#e09a52"/><stop offset=".5" stop-color="#9a5420"/><stop offset="1" stop-color="#4a210b"/></radialGradient>
      <linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0c88c"/><stop offset="1" stop-color="#c07f3f"/></linearGradient></defs>
      <ellipse cx="30" cy="40" rx="28" ry="35" fill="url(#g)" stroke="${OUT}" stroke-width="2.5"/>
      <path d="M8 30 Q4 50 15 65 Q10 46 14 26Z" fill="#2e1306" opacity=".55"/>
      <path d="M52 30 Q56 50 45 65 Q50 46 46 26Z" fill="#2e1306" opacity=".55"/>
      <path d="M18 22 Q30 15 42 22 L40 62 Q30 71 20 62Z" fill="url(#b)" stroke="#5a2a0e" stroke-width="1.6"/>
      <path d="M19 32 Q30 38 41 32 M19.5 43 Q30 49 40.5 43 M21 54 Q30 60 39 54" stroke="#7a3d12" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M30 4 L30 14" stroke="${OUT}" stroke-width="2"/>
      <ellipse cx="17" cy="16" rx="8" ry="4" transform="rotate(-28 17 16)" fill="#fff" opacity=".35"/>`,
  },
  {
    key: 'roach_head', w: 66, h: 58,
    body: `<defs><radialGradient id="h" cx="36%" cy="24%" r="82%"><stop offset="0" stop-color="#d28340"/><stop offset=".5" stop-color="#8a4519"/><stop offset="1" stop-color="#47200a"/></radialGradient></defs>
      <path d="M3 30 Q3 4 33 4 Q63 4 63 30 Q63 52 46 55 Q33 58 20 55 Q3 52 3 30Z" fill="url(#h)" stroke="${OUT}" stroke-width="2.6"/>
      <path d="M17 11 Q33 4 49 11" stroke="#f0b878" stroke-width="3" fill="none" stroke-linecap="round" opacity=".75"/>
      <path d="M33 6 L33 17 M27 8 L33 14 L39 8" stroke="#3a1808" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <ellipse cx="11" cy="42" rx="6" ry="4" fill="#ff6a3a" opacity=".5"/><ellipse cx="55" cy="42" rx="6" ry="4" fill="#ff6a3a" opacity=".5"/>`,
  },
  {
    key: 'roach_eye', w: 30, h: 30,
    body: `<defs><radialGradient id="e" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#fff"/><stop offset=".8" stop-color="#f0f0f4"/><stop offset="1" stop-color="#c4c4d4"/></radialGradient></defs>
      <circle cx="15" cy="15" r="13.5" fill="url(#e)" stroke="${OUT}" stroke-width="2.2"/>`,
  },
  {
    key: 'roach_pupil', w: 14, h: 14,
    body: `<circle cx="7" cy="7" r="6.2" fill="#0d0d12"/><circle cx="4.8" cy="4.6" r="2" fill="#fff"/><circle cx="9" cy="9.2" r="1" fill="#fff" opacity=".7"/>`,
  },
  {
    key: 'mouth_smile', w: 30, h: 20,
    body: `<path d="M3 3 Q15 24 27 3 Q15 8 3 3Z" fill="#3b0c10" stroke="#1d0505" stroke-width="2" stroke-linejoin="round"/>
      <ellipse cx="15" cy="13.5" rx="6" ry="3" fill="#ec6a84"/>
      <rect x="10.5" y="4.6" width="4.4" height="7" rx="1.2" fill="#fff" stroke="#9a9aa8" stroke-width=".7"/>
      <rect x="15.2" y="4.6" width="4.4" height="7" rx="1.2" fill="#fff" stroke="#9a9aa8" stroke-width=".7"/>`,
  },
  {
    key: 'mouth_open', w: 30, h: 20,
    body: `<path d="M3 3 Q15 5 27 3 Q28 19 15 19 Q2 19 3 3Z" fill="#3b0c10" stroke="#1d0505" stroke-width="2" stroke-linejoin="round"/>
      <ellipse cx="15" cy="15.5" rx="7.5" ry="3.8" fill="#ec6a84"/>
      <rect x="8" y="3.6" width="14" height="4.6" rx="1.5" fill="#fff"/>`,
  },
  {
    key: 'mouth_strain', w: 30, h: 20,
    body: `<rect x="3" y="3" width="24" height="12" rx="5.5" fill="#fff" stroke="#1d0505" stroke-width="2.2"/>
      <path d="M9 3V15M15 3V15M21 3V15M3 9H27" stroke="#1d0505" stroke-width="1.3"/>`,
  },
  {
    key: 'mouth_shock', w: 30, h: 20,
    body: `<ellipse cx="15" cy="10" rx="7.5" ry="9" fill="#3b0c10" stroke="#1d0505" stroke-width="2"/>
      <ellipse cx="15" cy="14.5" rx="4.4" ry="2.8" fill="#ec6a84"/>`,
  },
  {
    key: 'roach_antenna', w: 22, h: 72,
    body: `<path d="M6 70 Q3 34 17 9" stroke="#2f1507" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      <path d="M6 70 Q3 34 17 9" stroke="#9a6030" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      <circle cx="17" cy="7.5" r="4" fill="#5a2a0e" stroke="${OUT}" stroke-width="1.6"/>`,
  },
  {
    key: 'roach_leg', w: 20, h: 66,
    body: `<path d="M8 3 L13 28 L8 61" stroke="${OUT}" stroke-width="7.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 3 L13 28 L8 61" stroke="#b06a2e" stroke-width="4.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14 26 l5 -3 -2 7z M11 42 l6 0 -4 5z" fill="#3a1808"/>
      <circle cx="13" cy="28" r="3.6" fill="#7a3d12" stroke="${OUT}" stroke-width="1.4"/>
      <ellipse cx="7.5" cy="62" rx="5.6" ry="3.2" fill="#3a1808"/>`,
  },
  {
    key: 'shadow', w: 52, h: 16,
    body: `<ellipse cx="26" cy="8" rx="24" ry="6.5" fill="#000" opacity=".4"/>`,
  },
];
