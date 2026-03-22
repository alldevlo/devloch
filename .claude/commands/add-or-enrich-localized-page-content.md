---
name: add-or-enrich-localized-page-content
description: Workflow command scaffold for add-or-enrich-localized-page-content in devlo-website.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-or-enrich-localized-page-content

Use this workflow when working on **add-or-enrich-localized-page-content** in `devlo-website`.

## Goal

Adds a new page or enriches an existing page with localized (EN/DE/NL/FR) content, often using DeepL translations, and updates all locale JSON bundles and slug maps for routing.

## Common Files

- `src/app/[locale]/[[...slug]]/page.tsx`
- `src/app/insights/*/page.tsx`
- `src/app/ai-sales-ops/page.tsx`
- `src/app/agence/page.tsx`
- `src/components/pages/*`
- `src/lib/i18n/*-content.json`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create or update the page component (e.g., page.tsx) in the appropriate route directory.
- Add or update localized content in JSON files (e.g., masterfile-content.json, agency-content.json, alternatives-content.json, blog-content.json, geo-content.json, services-content.json, ai-sales-ops-content.json, case-studies-content.json).
- If needed, update or generate TypeScript content files (e.g., masterfile.fr.ts, ai-sales-ops-content.ts, agency-content.ts, etc.).
- Update slug-map.json to add or correct localized slugs for the new/changed page.
- If necessary, update or create translation scripts (e.g., translate_fr_only_pages_deepl.mjs, geo-translate-json.mjs).

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.