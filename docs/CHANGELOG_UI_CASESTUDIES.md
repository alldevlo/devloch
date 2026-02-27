# Changelog UI Case Studies

## Key files located
- Case study FR data: `src/lib/case-studies.data.json`
- Case study model/types: `src/lib/case-studies.ts`
- Case study page template: `src/components/pages/case-study-master-page.tsx`
- Home page composition: `src/components/pages/home-page.tsx`
- Home FR source content: `src/content/masterfile.fr.ts`
- Footer layout: `src/components/layout/site-footer.tsx`

## Applied changes
- Added `testimonialVideo` support in case study data model and template render.
- Added Abacus written testimonial (full FR quote), avatar, and kept/embedded Vistia video.
- Added Cegos testimonial video block before the written testimonial.
- Updated homepage hero mini-card copy order and made the whole card clickable.
- Moved “Nos études de cas” section between “Développez votre chiffre d'affaires sans recruter” and methodology section.
- Compacted footer layout (grid tuning, mission text wrapping reduced, navigation column shifted right).
- IDDI: H1 updated, sequence section removed, hero image fit adjusted, results panel spacing tightened.
- Contact block on all case studies now displays only “Résultats”.
- Many Ways testimonial photo updated to `/images/Xavier_Leuthold_Many_Ways.webp`.
- Horus logo references verified against `/images/Horus_logo.webp`.

## TODO
- Locky/Shady testimonial photo update is blocked: no Shady image exists in `public/images/` (flat folder). Current value kept unchanged in FR source data.
