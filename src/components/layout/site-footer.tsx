import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";

import { footerContent } from "@/content/masterfile.fr";

function FooterList({ title, links, columns = 1 }: { title: string; links: { label: string; href: string }[]; columns?: 1 | 2 }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white">{title}</p>
      <ul className={["mt-4", columns === 2 ? "grid grid-cols-2 gap-x-4 gap-y-2.5" : "space-y-2.5"].join(" ")}>
        {links.map((link) => (
          <li key={`${title}-${link.href}`}>
            <Link href={link.href} className="text-sm text-neutral-300 transition hover:text-white">
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
    <footer className="relative bg-devlo-900 pb-20 pt-16 text-white md:pt-20">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-6 md:grid-cols-2 md:px-12 lg:grid-cols-[1fr_1fr_2fr_1fr]">
        <div>
          <Image
            src="/images/devlo-logo.webp"
            alt="devlo logo"
            width={128}
            height={42}
            className="h-9 w-auto brightness-0 invert"
            loading="lazy"
          />

          <p className="mt-4 text-sm leading-7 text-neutral-300">{footerContent.mission}</p>

          <div className="mt-6 space-y-4 text-sm text-neutral-300">
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-devlo-700 text-neutral-300 transition hover:border-white hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Image
              src={footerContent.badge}
              alt="Badge Lemlist 2025"
              width={211}
              height={91}
              className="h-auto w-[150px]"
              loading="lazy"
            />
            <Image
              src={footerContent.badge2}
              alt="Badge Lemlist 2026"
              width={211}
              height={91}
              className="h-auto w-[150px]"
              loading="lazy"
            />
          </div>
        </div>

        <FooterList title="Navigation" links={footerContent.navigation} />
        <FooterList title="Études de cas" links={footerContent.caseLinks} columns={2} />

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm text-neutral-300">
            <li>
              <Link href="mailto:emea@devlo.ch" className="transition hover:text-white">
                emea@devlo.ch
              </Link>
            </li>
            <li>
              <Link href="mailto:americas@devlo.ch" className="transition hover:text-white">
                americas@devlo.ch
              </Link>
            </li>
            <li>
              <Link href="tel:+41797586403" className="transition hover:text-white">
                +41 79 758 64 03
              </Link>
            </li>
            <li>
              <Link href="tel:+12342018019" className="transition hover:text-white">
                +1 (234) 201-8019
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-[1200px] flex-col gap-3 border-t border-devlo-800 px-6 pt-8 text-xs text-neutral-400 md:flex-row md:items-center md:justify-between md:px-12">
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

      <details className="group fixed bottom-6 right-5 z-40">
        <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md bg-[#121316] px-3 py-2 text-xs text-white shadow-lg">
          <span className="inline-block h-2.5 w-3.5 rounded-sm bg-[linear-gradient(#244aa5_0_33%,#fff_33%_66%,#dc1f26_66%)]" />
          French
        </summary>
        <div className="absolute bottom-[calc(100%+8px)] right-0 min-w-[122px] rounded-md border border-[#2b2d31] bg-[#121316] p-1 text-xs text-white">
          <Link href="https://devlo.ch/en/" className="block rounded px-2 py-1 hover:bg-white/10">
            English
          </Link>
          <Link href="https://devlo.ch/de/" className="block rounded px-2 py-1 hover:bg-white/10">
            German
          </Link>
          <Link href="https://devlo.ch/" className="block rounded px-2 py-1 hover:bg-white/10">
            French
          </Link>
        </div>
      </details>
    </footer>
  );
}
