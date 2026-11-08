import type { SvgSprite } from '../svgTextures';

export const OBSTACLE_SPRITES: SvgSprite[] = [
  {
    key: 'slipper', w: 76, h: 46,
    body: `<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9ac8"/><stop offset="1" stop-color="#e83e8c"/></linearGradient></defs>
      <path transform="translate(0,5)" d="M38 3 C60 3 72 14 70 26 C68 37 52 39 38 39 C24 39 8 37 6 26 C4 14 16 3 38 3Z" fill="#9b1556"/>
      <path d="M38 3 C60 3 72 14 70 26 C68 37 52 39 38 39 C24 39 8 37 6 26 C4 14 16 3 38 3Z" fill="url(#s)" stroke="#7a0f42" stroke-width="2.2"/>
      <ellipse cx="38" cy="22" rx="23" ry="12" fill="#ffc9e0" opacity=".55"/>
      <circle cx="18" cy="28" r="2.4" fill="#fff" opacity=".8"/><circle cx="58" cy="28" r="2.4" fill="#fff" opacity=".8"/><circle cx="38" cy="33" r="2.4" fill="#fff" opacity=".8"/>
      <path d="M22 28 Q38 -2 54 28" stroke="#5a2a00" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M22 28 Q38 -2 54 28" stroke="#ffd23f" stroke-width="6.4" fill="none" stroke-linecap="round"/>
      <path d="M26 24 Q36 6 42 8" stroke="#fff" stroke-width="1.8" fill="none" opacity=".6" stroke-linecap="round"/>`,
  },
  {
    key: 'cat', w: 88, h: 98,
    body: `<defs>
      <radialGradient id="o" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#ffbe66"/><stop offset=".6" stop-color="#f08a24"/><stop offset="1" stop-color="#b85f10"/></radialGradient>
      <radialGradient id="e" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#f4ff8a"/><stop offset="1" stop-color="#9ccc1d"/></radialGradient></defs>
      <path d="M68 72 Q90 64 84 40 Q82 32 75 37" stroke="#4a2205" stroke-width="12" fill="none" stroke-linecap="round"/>
      <path d="M68 72 Q90 64 84 40 Q82 32 75 37" stroke="#e07a1c" stroke-width="8" fill="none" stroke-linecap="round"/>
      <ellipse cx="44" cy="70" rx="30" ry="27" fill="url(#o)" stroke="#6b3208" stroke-width="2.6"/>
      <ellipse cx="44" cy="76" rx="15" ry="19" fill="#fff4e0"/>
      <path d="M22 60 L30 64 M22 70 L30 72 M66 60 L58 64 M66 70 L58 72" stroke="#a24c0a" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="30" cy="92" rx="12" ry="6" fill="#fff" stroke="#6b3208" stroke-width="2.2"/><ellipse cx="58" cy="92" rx="12" ry="6" fill="#fff" stroke="#6b3208" stroke-width="2.2"/>
      <path d="M17 30 L15 4 L36 17Z" fill="url(#o)" stroke="#6b3208" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M71 30 L73 4 L52 17Z" fill="url(#o)" stroke="#6b3208" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M20 23 L19 10 L30 17Z M68 23 L69 10 L58 17Z" fill="#ff9ab0"/>
      <ellipse cx="44" cy="38" rx="29" ry="25" fill="url(#o)" stroke="#6b3208" stroke-width="2.6"/>
      <path d="M44 15 L44 24 M35 16 L37 24 M53 16 L51 24" stroke="#a24c0a" stroke-width="3.2" stroke-linecap="round"/>
      <ellipse cx="32" cy="37" rx="8.5" ry="9.5" fill="url(#e)" stroke="#3a1a04" stroke-width="2"/>
      <ellipse cx="56" cy="37" rx="8.5" ry="9.5" fill="url(#e)" stroke="#3a1a04" stroke-width="2"/>
      <ellipse cx="32" cy="38" rx="2.7" ry="7.5" fill="#111"/><ellipse cx="56" cy="38" rx="2.7" ry="7.5" fill="#111"/>
      <circle cx="29.5" cy="33" r="1.8" fill="#fff"/><circle cx="53.5" cy="33" r="1.8" fill="#fff"/>
      <path d="M21 27 L39 33 M67 27 L49 33" stroke="#3a1a04" stroke-width="3.8" stroke-linecap="round"/>
      <path d="M41 44 L47 44 L44 48.5Z" fill="#ff6f8f" stroke="#a02040" stroke-width="1"/>
      <path d="M44 48.5 Q40 54 35 51 M44 48.5 Q48 54 53 51" stroke="#3a1a04" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M37 52 L39 58 L41.5 52Z M51 52 L49 58 L46.5 52Z" fill="#fff" stroke="#999" stroke-width=".6"/>
      <path d="M14 44 L28 46 M14 51 L28 50 M74 44 L60 46 M74 51 L60 50" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>`,
  },
  {
    key: 'vacuum', w: 78, h: 104,
    body: `<defs>
      <linearGradient id="b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff7a68"/><stop offset=".5" stop-color="#e53935"/><stop offset="1" stop-color="#9e1b1b"/></linearGradient>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f4f6fa"/><stop offset="1" stop-color="#bcc3d0"/></linearGradient></defs>
      <path d="M60 62 Q80 66 73 88 Q70 98 58 97" stroke="#14181f" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M60 62 Q80 66 73 88 Q70 98 58 97" stroke="#5a626f" stroke-width="4.6" fill="none" stroke-linecap="round"/>
      <rect x="4" y="80" width="70" height="20" rx="10" fill="#37404d" stroke="#14181f" stroke-width="2.6"/>
      <rect x="9" y="89" width="60" height="5" rx="2.5" fill="#ffcc33"/>
      <circle cx="15" cy="100" r="4.6" fill="#14181f"/><circle cx="63" cy="100" r="4.6" fill="#14181f"/>
      <rect x="17" y="26" width="44" height="60" rx="15" fill="url(#b)" stroke="#5a0e0e" stroke-width="2.6"/>
      <path d="M22 32 Q22 52 25 70" stroke="#fff" stroke-width="3" fill="none" opacity=".35" stroke-linecap="round"/>
      <path d="M21 28 Q19 8 39 8 Q59 8 57 28Z" fill="url(#g)" stroke="#7a8190" stroke-width="2.6"/>
      <path d="M30 14 L30 26 M39 11 L39 26 M48 14 L48 26" stroke="#9aa2b0" stroke-width="1.6"/>
      <rect x="32" y="0" width="14" height="8" rx="4" fill="#37404d"/>
      <circle cx="30" cy="49" r="7.5" fill="#fff" stroke="#2a0a0a" stroke-width="2"/><circle cx="48" cy="49" r="7.5" fill="#fff" stroke="#2a0a0a" stroke-width="2"/>
      <circle cx="31.5" cy="51" r="3.2" fill="#111"/><circle cx="46.5" cy="51" r="3.2" fill="#111"/>
      <path d="M20 38 L35 44 M58 38 L43 44" stroke="#2a0a0a" stroke-width="3.8" stroke-linecap="round"/>
      <rect x="25" y="63" width="28" height="12" rx="4.5" fill="#2a0a0a"/>
      <path d="M27 64 L31 72 L35 64 L39 72 L43 64 L47 72 L51 64Z" fill="#fff"/>`,
  },
  {
    key: 'spray', w: 72, h: 116,
    body: `<defs>
      <radialGradient id="c" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#eaffb0"/><stop offset=".6" stop-color="#9be33a"/><stop offset="1" stop-color="#5a9e12"/></radialGradient>
      <linearGradient id="can" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff6a5c"/><stop offset=".5" stop-color="#e0261a"/><stop offset="1" stop-color="#8c120b"/></linearGradient></defs>
      <g fill="#3f7a0a" stroke="#3f7a0a" stroke-width="5">
        <circle cx="36" cy="88" r="22"/><circle cx="16" cy="80" r="15"/><circle cx="56" cy="80" r="16"/><circle cx="25" cy="100" r="13"/><circle cx="48" cy="102" r="13"/><circle cx="36" cy="72" r="14"/></g>
      <g fill="url(#c)">
        <circle cx="36" cy="88" r="22"/><circle cx="16" cy="80" r="15"/><circle cx="56" cy="80" r="16"/><circle cx="25" cy="100" r="13"/><circle cx="48" cy="102" r="13"/><circle cx="36" cy="72" r="14"/></g>
      <circle cx="36" cy="90" r="9" fill="#fff" stroke="#2a3a10" stroke-width="2"/>
      <circle cx="32.5" cy="89" r="2.4" fill="#222"/><circle cx="39.5" cy="89" r="2.4" fill="#222"/><path d="M33 95 L39 95" stroke="#222" stroke-width="2"/>
      <rect x="25" y="8" width="22" height="48" rx="7" fill="url(#can)" stroke="#4a0a05" stroke-width="2.6"/>
      <rect x="25" y="22" width="22" height="22" fill="#fff4cf" stroke="#4a0a05" stroke-width="1.6"/>
      <ellipse cx="36" cy="33" rx="4.2" ry="5.6" fill="#222"/>
      <path d="M31 29 L26 26 M41 29 L46 26 M31 34 L26 34 M41 34 L46 34 M32 38 L28 42 M40 38 L44 42" stroke="#222" stroke-width="1.4"/>
      <circle cx="36" cy="33" r="9.5" fill="none" stroke="#e0261a" stroke-width="2.2"/><path d="M29 40 L43 26" stroke="#e0261a" stroke-width="2.2"/>
      <rect x="28" y="52" width="16" height="10" rx="3" fill="#2f343d"/><rect x="32" y="60" width="8" height="8" rx="2" fill="#e8e8f0"/>
      <rect x="25" y="8" width="5" height="40" rx="2.5" fill="#fff" opacity=".28"/>`,
  },
];
