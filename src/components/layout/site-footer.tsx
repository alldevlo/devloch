import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";

import { footerContent } from "@/content/masterfile.fr";
import { WaveDivider } from "@/components/ui/wave-divider";

function FooterList({
  title,
  links,
  columns = 1,
  compactLinks = false,
}: {
  title: string;
  links: { label: string; href: string }[];
  columns?: 1 | 2;
  compactLinks?: boolean;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white">{title}</p>
      <ul className={["mt-4", columns === 2 ? "grid grid-cols-2 gap-x-6 gap-y-2.5" : "space-y-2.5"].join(" ")}>
        {links.map((link) => (
          <li key={`${title}-${link.href}`}>
            <Link
              href={link.href}
              className={[
                compactLinks
                  ? "block whitespace-nowrap overflow-hidden text-ellipsis text-[13px] text-neutral-300 transition hover:text-white lg:overflow-visible lg:text-clip xl:text-sm"
                  : "text-sm text-neutral-300 transition hover:text-white",
              ].join(" ")}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <>
      <WaveDivider variant="layered-top" />
      <footer className="relative bg-devlo-900 pb-20 pt-16 text-white md:pt-20">
        <div className="mx-auto w-full max-w-[1320px] px-6 md:px-8">
          <div className="mb-8 flex flex-wrap items-center gap-3 md:mb-10 lg:mb-12">
            {footerContent.badges.map((badge) => (
              <Image
                key={badge.src}
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                className="h-[72px] w-auto max-w-full bg-transparent object-contain md:h-[80px]"
                loading="lazy"
                unoptimized={badge.src.endsWith(".svg")}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-[1320px] gap-10 px-6 md:grid-cols-2 md:px-8 lg:grid-cols-[1.35fr_0.5fr_2.15fr]">
          <div>
            <Image
              src="/images/devlo-logo.webp"
              alt="devlo logo"
              width={200}
              height={66}
              className="h-12 w-auto brightness-0 invert md:h-14"
              loading="lazy"
            />

            <p className="mt-4 max-w-[620px] text-sm leading-6 text-neutral-300">{footerContent.mission}</p>

            <div className="mt-6 grid gap-5 text-sm text-neutral-300 md:grid-cols-2 md:gap-8">
              <div>
                <p className="font-semibold text-white">Bureau Suisse:</p>
                {footerContent.swissOffice.map((line) => (
                  <p key={`swiss-${line}`}>{line}</p>
                ))}
              </div>
              <div>
                <p className="font-semibold text-white">Bureau US:</p>
                {footerContent.usOffice.map((line) => (
                  <p key={`us-${line}`}>{line}</p>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href={footerContent.linkedin}
                target="_blank"
                aria-label="LinkedIn devlo"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white text-devlo-700 transition hover:bg-devlo-50 hover:text-devlo-900"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:ml-4 lg:border-l lg:border-devlo-800 lg:pl-14">
            <FooterList title="Navigation" links={footerContent.navigation} />
          </div>

          <div className="lg:border-l lg:border-devlo-800 lg:pl-10">
            <FooterList title="Études de cas" links={footerContent.caseLinks} columns={2} compactLinks />
          </div>
        </div>

        <div className="mx-auto mt-12 flex w-full max-w-[1320px] flex-col gap-3 border-t border-devlo-800 px-6 pt-8 text-xs text-neutral-400 md:flex-row md:items-center md:justify-between md:px-8">
          <Link href={footerContent.bottomLink.href} className="transition hover:text-white">
            {footerContent.bottomLink.label}
          </Link>
          <p>{footerContent.copyright}</p>
        </div>

        <div className="fixed bottom-6 left-5 z-40">
          <button
            type="button"
            aria-label="Chat"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-devlo-700 bg-devlo-800 text-white shadow-[0_8px_18px_rgba(27,58,75,0.35)]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 18l-1 3 3-1h10a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v8a4 4 0 0 0 2 3Z" />
            </svg>
          </button>
        </div>

      </footer>
    </>
  );
}
