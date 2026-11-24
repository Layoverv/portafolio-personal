/**
 * Piezas decorativas del tema. Todas son aria-hidden: no aportan
 * contenido, solo ambiente, y los lectores de pantalla las ignoran.
 */

/** Destello de cuatro puntas (forma tomada del pack de símbolos Y2K). */
export function Sparkle({ size = 18, style, className = '' }) {
  return (
    <svg
      className={`sparkle ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z"
      />
    </svg>
  );
}

/** Arcos finos que cruzan un panel, como en la referencia editorial. */
export function ArcLines({ className = '' }) {
  return (
    <svg
      className={`arc-lines ${className}`.trim()}
      viewBox="0 0 800 500"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M-40 470 C 220 560, 560 330, 840 -10" fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <path d="M520 -20 C 700 40, 820 160, 830 260" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Capas fijas del fondo de toda la página. */
export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__layer backdrop__wire" />
      <div className="backdrop__layer backdrop__y2k" />
      <div className="backdrop__layer backdrop__roots" />
      <div className="backdrop__layer backdrop__grain" />
      <Sparkle size={22} style={{ top: '14%', left: '46%', '--delay': '0ms' }} />
      <Sparkle size={12} style={{ top: '62%', left: '12%', '--delay': '1400ms' }} />
      <Sparkle size={16} style={{ top: '78%', right: '30%', '--delay': '2600ms' }} />
      <Sparkle size={10} style={{ top: '30%', right: '6%', '--delay': '800ms' }} />
    </div>
  );
}
