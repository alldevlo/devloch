"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useMemo, useState } from "react";

import { VideoModal } from "@/components/ui/video-modal";

type WistiaThumbnailTriggerProps = {
  videoId: string;
  title: string;
  previewSrc: string;
  previewAlt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function WistiaThumbnailTrigger({
  videoId,
  title,
  previewSrc,
  previewAlt,
  priority = false,
  sizes = "(min-width: 768px) 45vw, 92vw",
  className,
}: WistiaThumbnailTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showFrame, setShowFrame] = useState(false);

  const iframeSrc = useMemo(
    () => `https://fast.wistia.net/embed/iframe/${videoId}?autoplay=1&seo=true&videoFoam=true`,
    [videoId],
  );

  const handleOpen = () => {
    setShowFrame(true);
    setIsOpen(true);
  };

  const handleClose = () => {
    setShowFrame(false);
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <button
        type="button"
        aria-label={`Lire la vidéo : ${title}`}
        onClick={handleOpen}
        className="group relative block w-full text-left"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
          <Image
            src={previewSrc}
            alt={previewAlt}
            fill
            sizes={sizes}
            className="object-cover transition duration-300 group-hover:scale-[1.01] group-hover:brightness-105"
            quality={78}
            priority={priority}
          />
          <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.34)_100%)]" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-devlo-800 shadow-lg transition duration-200 group-hover:scale-105">
              <Play className="ml-1 h-8 w-8 fill-current" aria-hidden />
            </span>
          </span>
        </div>
      </button>

      <VideoModal open={isOpen} title={title} onClose={handleClose}>
        {showFrame ? (
          <iframe
            src={iframeSrc}
            title={title}
            loading="eager"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : null}
      </VideoModal>
    </div>
  );
}
