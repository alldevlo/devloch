# Metadata Audit (Phase 0)

Date: 2026-02-27
Router: Next.js App Router (`src/app`)
Source of truth: repository files only

## 1) Router type
- `App Router` is in use (`src/app/layout.tsx`, `src/app/**/page.tsx`).
- No active `pages/` router implementation detected.

## 2) Metadata locations
- Global metadata: `src/app/layout.tsx`
- Per-page metadata:
  - `src/app/page.tsx`
  - `src/app/academy/page.tsx`
  - `src/app/consultation/page.tsx`
  - `src/app/conditions/page.tsx`
  - `src/app/etudes-de-cas/page.tsx`
  - `src/app/etudes-de-cas/[slug]/page.tsx` (`generateMetadata`)
- Robots route: `src/app/robots.ts`
- Hreflang runtime system: Lovalingo provider + middleware + manifest
  - `src/components/providers/lovalingo-next-provider.tsx`
  - `src/middleware.ts`
  - `src/app/.well-known/lovalingo.json/route.ts`

## 3) Indexable route inventory from repo

Only these routes render content (non-redirect pages):
- `/`
- `/academy`
- `/consultation`
- `/conditions`
- `/etudes-de-cas`
- `/etudes-de-cas/[slug]` (14 case studies from `caseStudiesCards`)

Redirect-only routes (non-indexable) exist but are not part of this table.

## 4) Route metadata status table (current state before fixes)

| route | file path | title/desc status | canonical status | OG status | twitter status | og:image chosen | hreflang status | schema status |
|---|---|---|---|---|---|---|---|---|
| `/` | `src/app/page.tsx` | OK | OK | PARTIAL | PARTIAL | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/academy` | `src/app/academy/page.tsx` | OK | OK | PARTIAL | MISSING (page-level) | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/consultation` | `src/app/consultation/page.tsx` | OK | OK | PARTIAL | MISSING (page-level) | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/conditions` | `src/app/conditions/page.tsx` | OK | OK | PARTIAL | MISSING (page-level) | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/etudes-de-cas` | `src/app/etudes-de-cas/page.tsx` | OK | OK | PARTIAL | MISSING (page-level) | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/etudes-de-cas/careerlunch-54-rendez-vous-dach` | `src/app/etudes-de-cas/[slug]/page.tsx` | PARTIAL (metrics-only desc) | OK | PARTIAL | MISSING | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/etudes-de-cas/cortexia-71-rendez-vous-decideurs-urbains` | `src/app/etudes-de-cas/[slug]/page.tsx` | PARTIAL (metrics-only desc) | OK | PARTIAL | MISSING | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/etudes-de-cas/squareco-52-prospects-interesses-biocarburants` | `src/app/etudes-de-cas/[slug]/page.tsx` | PARTIAL (metrics-only desc) | OK | PARTIAL | MISSING | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/etudes-de-cas/cegos-45-taux-reponse` | `src/app/etudes-de-cas/[slug]/page.tsx` | PARTIAL (metrics-only desc) | OK | PARTIAL | MISSING | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/etudes-de-cas/lemanvisio-16-rendez-vous-architectes` | `src/app/etudes-de-cas/[slug]/page.tsx` | PARTIAL (metrics-only desc) | OK | PARTIAL | MISSING | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/etudes-de-cas/cybersecurite-4500-entreprises` | `src/app/etudes-de-cas/[slug]/page.tsx` | PARTIAL (metrics-only desc) | OK | PARTIAL | MISSING | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/etudes-de-cas/many-ways-70-taux-reponse-merchandising` | `src/app/etudes-de-cas/[slug]/page.tsx` | PARTIAL (metrics-only desc) | OK | PARTIAL | MISSING | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/etudes-de-cas/apidae-70-rendez-vous` | `src/app/etudes-de-cas/[slug]/page.tsx` | PARTIAL (metrics-only desc) | OK | PARTIAL | MISSING | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/etudes-de-cas/locky-40-entreprises-interessees` | `src/app/etudes-de-cas/[slug]/page.tsx` | PARTIAL (metrics-only desc) | OK | PARTIAL | MISSING | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/etudes-de-cas/hiag-immeuble-commercial-winterthur` | `src/app/etudes-de-cas/[slug]/page.tsx` | PARTIAL (metrics-only desc) | OK | PARTIAL | MISSING | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/etudes-de-cas/iddi-generation-leads-biotech-pharma` | `src/app/etudes-de-cas/[slug]/page.tsx` | PARTIAL (metrics-only desc) | OK | PARTIAL | MISSING | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/etudes-de-cas/horus-200k-contrats-belgique` | `src/app/etudes-de-cas/[slug]/page.tsx` | PARTIAL (metrics-only desc) | OK | PARTIAL | MISSING | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/etudes-de-cas/abacus-30-prospects-interesses` | `src/app/etudes-de-cas/[slug]/page.tsx` | PARTIAL (metrics-only desc) | OK | PARTIAL | MISSING | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |
| `/etudes-de-cas/monizze-120-rendez-vous-qualifies-belgique` | `src/app/etudes-de-cas/[slug]/page.tsx` | PARTIAL (metrics-only desc) | OK | PARTIAL | MISSING | `/images/devlo-logo.webp` (global fallback) | PARTIAL | PARTIAL |

### Notes from audit
- Canonical production domain is currently `https://devlo-agency.ch` in `src/lib/site.ts`; required target is `https://devlo.ch`.
- Global OG/Twitter fallback image is currently `/images/devlo-logo.webp`; required fallback is `/images/devlo_OG_Banner.webp`.
- No explicit favicon/icons/manifest metadata setup in `src/app/layout.tsx`.
- Required icon filenames from prompt (`*.png`) are not present; repository currently contains `.webp` equivalents in `public/images`.
- Structured data currently includes Organization + LocalBusiness (CH/US) globally, plus page Breadcrumb/FAQ where used.
- `Service` JSON-LD is missing globally.
- Hreflang is managed by Lovalingo runtime. Locales currently configured in repo are `fr/en/de/nl`; no `it` locale detected.
