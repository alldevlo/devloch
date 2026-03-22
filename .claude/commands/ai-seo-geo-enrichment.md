---
name: ai-seo-geo-enrichment
description: Workflow command scaffold for ai-seo-geo-enrichment in devlo-website.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /ai-seo-geo-enrichment

Use this workflow when working on **ai-seo-geo-enrichment** in `devlo-website`.

## Goal

Enriches pages and content with AI SEO and GEO signals, including summary points, author bylines, FAQ schema, JSON-LD, and translation of editorial content across locales.

## Common Files

- `src/content/*.ts`
- `src/lib/i18n/*.json`
- `src/components/pages/*-master-page.tsx`
- `src/components/shared/summary-section.tsx`
- `src/components/shared/author-byline.tsx`
- `src/components/shared/faq-section.tsx`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit or add fields in content JSON/TS (summaryPoints, editorialTitle, etc.)
- Update or create components to render new SEO/GEO fields (SummarySection, AuthorByline, etc.)
- Add or update schema (Article JSON-LD, FAQ, breadcrumbs) in page components
- Translate new/enriched content to EN/DE/NL via DeepL or scripts
- Sync TS and JSON content files to ensure consistency

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.