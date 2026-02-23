"use client";

import Image from "next/image";
import { useState } from "react";

type WistiaLiteProps = {
  videoId: string;
  title: string;
  previewSrc: string;
  previewAlt: string;
  priority?: boolean;
  className?: string;
};

export function WistiaLite({
  videoId,
  title,
  previewSrc,
  previewAlt,
  priority = false,
  className,
}: WistiaLiteProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-[12px] border border-[#d4e3ec] bg-[#0a4f75] p-2 shadow-[0_16px_36px_rgba(0,68,103,0.18)]">
        <div className="relative overflow-hidden rounded-[10px]" style={{ paddingTop: "56.25%" }}>
          {isLoaded ? (
            <iframe
              src={`https://fast.wistia.net/embed/iframe/${videoId}?autoplay=1&seo=true&videoFoam=true`}
              title={title}
              loading="lazy"
              allow="autoplay; fullscreen"
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              aria-label={`Lire la vidéo: ${title}`}
              onClick={() => setIsLoaded(true)}
              className="absolute inset-0 block h-full w-full"
            >
              <Image
                src={previewSrc}
                alt={previewAlt}
                fill
                sizes="(min-width: 768px) 45vw, 92vw"
                className="object-cover"
                quality={78}
                priority={priority}
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.32)_100%)]" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#0a4f75] shadow-lg">
                  <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-current" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
