import Image from "next/image";

type LogoItem = {
  src: string;
  alt: string;
};

type InfiniteLogoRailProps = {
  logos: LogoItem[];
  pauseOnHover?: boolean;
  reverse?: boolean;
  duration?: "normal" | "slow";
};

const logoScaleClassByAlt: Record<string, string> = {
  Apple: "scale-[0.82]",
  BCF: "scale-[0.82]",
  BHP: "scale-[0.82]",
  ADM: "scale-[1.12]",
};

const railLogoSizesByAlt: Record<string, string> = {
  Apple: "(max-width: 768px) 72px, 80px",
  BCF: "(max-width: 768px) 72px, 80px",
  BHP: "(max-width: 768px) 72px, 80px",
  ADM: "(max-width: 768px) 88px, 96px",
  UEFA: "(max-width: 768px) 72px, 80px",
};

const defaultRailLogoSizes = "(max-width: 768px) 120px, 160px";

export function namesToLogoItems(names: string[]): LogoItem[] {
  return names.map((name) => {
    const base = name.replace(/\.[a-z0-9]+$/i, "").replace(/^Logo[_-]?/i, "").replace(/[_-]/g, " ");
    return { src: `/images/${name}`, alt: `${base} logo` };
  });
}

export function InfiniteLogoRail({
  logos,
  pauseOnHover = false,
  reverse = false,
  duration = "normal",
}: InfiniteLogoRailProps) {
  const doubled = [...logos, ...logos];
  const animationClass = duration === "slow"
    ? (reverse ? "animate-logo-scroll-slow-reverse" : "animate-logo-scroll-slow")
    : (reverse ? "animate-logo-scroll-reverse" : "animate-logo-scroll");

  return (
    <div className="group bg-white py-1">
      <div
        className={[
          "flex min-w-max items-center will-change-transform",
          animationClass,
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {doubled.map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className="flex h-11 w-[170px] shrink-0 items-center justify-center px-5"
          >
            <div
              className={["relative h-10 w-full overflow-hidden", logoScaleClassByAlt[logo.alt] ?? ""].join(" ").trim()}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain opacity-70 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
                loading="lazy"
                sizes={railLogoSizesByAlt[logo.alt] ?? defaultRailLogoSizes}
                quality={72}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
