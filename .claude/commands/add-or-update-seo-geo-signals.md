---
name: add-or-update-seo-geo-signals
description: Workflow command scaffold for add-or-update-seo-geo-signals in devlo-website.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-or-update-seo-geo-signals

Use this workflow when working on **add-or-update-seo-geo-signals** in `devlo-website`.

## Goal

Enriches pages with AI SEO and GEO signals: summary points, author byline, definition patterns, citations, structured data, and more for improved search and AI crawler visibility.

## Common Files

- `src/components/shared/summary-section.tsx`
- `src/components/shared/author-byline.tsx`
- `src/components/shared/comparison-table.tsx`
- `src/components/shared/faq-section.tsx`
- `src/lib/i18n/masterfile-content.json`
- `src/content/masterfile.fr.ts`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Add or update summary/conclusion sections with key takeaways.
- Add or update AuthorByline with author microdata and dates.
- Add definition patterns, attribution indicators, and answer capsules to content.
- Add or update external citations and links in summary points.
- Add or update Article JSON-LD and other structured data.

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.