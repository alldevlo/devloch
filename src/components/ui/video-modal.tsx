"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type VideoModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function VideoModal({ open, title, onClose, children }: VideoModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const bodyStyleRef = useRef<{ overflow: string; paddingRight: string } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!open || typeof document === "undefined") {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const body = document.body;
    if (!bodyStyleRef.current) {
      bodyStyleRef.current = {
        overflow: body.style.overflow,
        paddingRight: body.style.paddingRight,
      };
    }

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      const previous = bodyStyleRef.current;
      if (previous) {
        body.style.overflow = previous.overflow;
        body.style.paddingRight = previous.paddingRight;
      } else {
        body.style.overflow = "";
        body.style.paddingRight = "";
      }
      bodyStyleRef.current = null;
    };
  }, [open, onClose]);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          aria-hidden={!open}
        >
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6" onClick={onClose}>
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={title}
              className="relative w-full max-w-5xl rounded-2xl bg-black p-2 shadow-2xl ring-1 ring-white/10 md:p-3"
              initial={{ opacity: 0, y: 8, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.985 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer la vidéo"
                className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-white/20"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
              <div className="overflow-hidden rounded-xl bg-black">
                <div className="relative aspect-[16/9]">{children}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
