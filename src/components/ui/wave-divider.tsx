type WaveDividerProps = {
  tone?: "light" | "dark";
  variant?: "simple" | "layered-top" | "layered-bottom";
  fromBg?: string;
  toBg?: string;
};

export function WaveDivider({ tone = "light", variant = "simple", fromBg, toBg }: WaveDividerProps) {
  if (variant === "layered-top") {
    const containerBg = fromBg ?? "#FFFFFF";
    const darkLayer = toBg ?? "#0F2B3C";
    const mid1 = fromBg ? blendHex(containerBg, darkLayer, 0.3) : "#AFC8D7";
    const mid2 = fromBg ? blendHex(containerBg, darkLayer, 0.6) : "#4F809E";

    // Flat at bottom (glued to section above via -mb-1), wavy at top flowing into dark section below
    return (
      <div className="pointer-events-none -mb-1 h-16 w-full overflow-hidden sm:h-20" style={{ backgroundColor: containerBg }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-full w-full" aria-hidden>
          <path d="M0,44 C170,38 330,46 480,58 C650,72 820,78 980,70 C1160,60 1310,40 1440,44 L1440,80 L0,80 Z" fill={mid1} />
          <path d="M0,52 C170,46 330,54 480,64 C650,76 820,80 980,74 C1160,66 1310,48 1440,52 L1440,80 L0,80 Z" fill={mid2} />
          <path d="M0,60 C170,54 330,62 480,70 C650,80 820,84 980,78 C1160,72 1310,56 1440,60 L1440,80 L0,80 Z" fill={darkLayer} />
        </svg>
      </div>
    );
  }

  if (variant === "layered-bottom") {
    const containerBg = fromBg ?? "#0F2B3C";
    const target = toBg ?? "#FFFFFF";
    // Colors from dark→light: layer 1 (widest, slight blend), layer 2 (medium), layer 3 (target)
    const mid1 = toBg ? blendHex(containerBg, target, 0.2) : "#2A5068";
    const mid2 = toBg ? blendHex(containerBg, target, 0.5) : "#7FAABB";

    // Flat at top (glued to dark section above), wavy at bottom flowing into light section below
    // No transform needed: SVG paths naturally fill bottom, container bg fills top
    return (
      <div className="pointer-events-none -mt-1 h-16 w-full overflow-hidden sm:h-20" style={{ backgroundColor: containerBg }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-full w-full" aria-hidden>
          <path d="M0,44 C170,38 330,46 480,58 C650,72 820,78 980,70 C1160,60 1310,40 1440,44 L1440,80 L0,80 Z" fill={mid1} />
          <path d="M0,52 C170,46 330,54 480,64 C650,76 820,80 980,74 C1160,66 1310,48 1440,52 L1440,80 L0,80 Z" fill={mid2} />
          <path d="M0,60 C170,54 330,62 480,70 C650,80 820,84 980,78 C1160,72 1310,56 1440,60 L1440,80 L0,80 Z" fill={target} />
        </svg>
      </div>
    );
  }

  // Simple variant
  const containerColor = fromBg;
  const fillColor = toBg ?? (tone === "dark" ? "#0b5b86" : "#f3f4f6");

  return (
    <div
      className="pointer-events-none h-10 w-full overflow-hidden sm:h-12"
      style={containerColor ? { backgroundColor: containerColor } : undefined}
    >
      <svg className="block h-full w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path
          d="M0,74 C95,120 195,18 300,50 C415,86 520,6 640,45 C745,79 855,34 960,56 C1080,82 1198,24 1295,46 C1370,63 1415,77 1440,90 L1440,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}

/** Simple hex color blending (no external deps). */
function blendHex(from: string, to: string, t: number): string {
  const f = parseHex(from);
  const tt = parseHex(to);
  const r = Math.round(f[0] + (tt[0] - f[0]) * t);
  const g = Math.round(f[1] + (tt[1] - f[1]) * t);
  const b = Math.round(f[2] + (tt[2] - f[2]) * t);
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

function parseHex(color: string): [number, number, number] {
  const c = color.replace("#", "");
  return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)];
}

function hex(n: number): string {
  return n.toString(16).padStart(2, "0");
}
