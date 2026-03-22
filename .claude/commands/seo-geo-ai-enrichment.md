---
name: seo-geo-ai-enrichment
description: Workflow command scaffold for seo-geo-ai-enrichment in devlo-website.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /seo-geo-ai-enrichment

Use this workflow when working on **seo-geo-ai-enrichment** in `devlo-website`.

## Goal

Enriches pages and content with AI SEO, GEO, and structured data signals (e.g., summary sections, author bylines, JSON-LD, answer capsules, citations, transitions, etc.) to improve search and AI crawler visibility.

## Common Files

- `src/components/pages/*`
- `src/components/shared/summary-section.tsx`
- `src/components/shared/author-byline.tsx`
- `src/components/shared/comparison-table.tsx`
- `src/components/shared/faq-section.tsx`
- `src/lib/i18n/*-content.json`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Add or update SummarySection, AuthorByline, ComparisonTable, FAQSection, or similar components in relevant page files.
- Add or update structured data (JSON-LD Article schema, microdata, meta tags) in page components.
- Enrich content JSON/TS files with new fields: summaryPoints, editorialTitle, editorialParagraphs, datePublished, dateModified, external citations, etc.
- Update or sync localized content files to propagate new enrichment fields.
- Update or create utility functions for rich-text rendering, metadata, or AI/SEO helpers.

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.