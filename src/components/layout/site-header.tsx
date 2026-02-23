"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { buttonClassName } from "@/components/ui/button";
import { mainNav } from "@/content/masterfile.fr";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileStickyCta, setShowMobileStickyCta] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      setShowMobileStickyCta(y > 300);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const transparentMode = pathname === "/" && !isScrolled;

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-200",
          transparentMode
            ? "border-transparent bg-transparent"
            : "border-b border-neutral-200 bg-white/95 shadow-sm backdrop-blur-md",
        ].join(" ")}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 md:h-20 md:px-12">
          <Link href="/" className="inline-flex min-h-[44px] items-center" aria-label="Accueil devlo">
            <Image src={mainNav.logo} alt="devlo logo" width={120} height={40} className="h-7 w-auto md:h-8" priority />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
            {mainNav.links.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "inline-flex min-h-[44px] items-center border-b-2 text-[14px] font-semibold uppercase tracking-[0.08em] transition-colors",
                    active ? "border-devlo-600 text-devlo-700" : "border-transparent text-devlo-900 hover:text-devlo-600",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link href={mainNav.cta.href} className={buttonClassName("outline", "px-5 py-2.5 text-sm")}>
              {mainNav.cta.label}
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-200 bg-white text-devlo-900 md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <Image src={mainNav.logo} alt="devlo logo" width={120} height={40} className="h-7 w-auto" />
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-200"
                aria-label="Fermer le menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-10 space-y-2">
              {mainNav.links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "flex min-h-[44px] items-center rounded-lg px-4 py-3 text-xl font-semibold",
                    isActive(pathname, item.href) ? "bg-devlo-50 text-devlo-700" : "text-devlo-900",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link href={mainNav.cta.href} className={buttonClassName("primary", "mt-8 w-full py-4 text-base")}>
              {mainNav.cta.label}
            </Link>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showMobileStickyCta ? (
          <motion.div
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white p-4 md:hidden"
          >
            <Link href={mainNav.cta.href} className={buttonClassName("primary", "w-full py-4 text-base")}>
              {mainNav.cta.label}
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
