---
name: devlo-website-conventions
description: Development conventions and patterns for devlo-website. TypeScript Next.js project with mixed commits.
---

# Devlo Website Conventions

> Generated from [alldevlo/devlo-website](https://github.com/alldevlo/devlo-website) on 2026-03-22

## Overview

This skill teaches Claude the development patterns and conventions used in devlo-website.

## Tech Stack

- **Primary Language**: TypeScript
- **Framework**: Next.js
- **Architecture**: type-based module organization
- **Test Location**: separate

## When to Use This Skill

Activate this skill when:
- Making changes to this repository
- Adding new features following established patterns
- Writing tests that match project conventions
- Creating commits with proper message format

## Commit Conventions

Follow these commit message conventions based on 165 analyzed commits.

### Commit Style: Mixed Style

### Prefixes Used

- `feat`
- `fix`
- `chore`

### Message Guidelines

- Average message length: ~54 characters
- Keep first line concise and descriptive
- Use imperative mood ("Add feature" not "Added feature")


*Commit message example*

```text
feat: Insights hub page, navbar restructure, design polish
```

*Commit message example*

```text
fix: French accents, blue hero, category tooltips, newsletter placement
```

*Commit message example*

```text
docs: enrich SEO/GEO guide to 1275 lines + fix Vercel domain aliasing
```

*Commit message example*

```text
perf: replace force-dynamic with ISR on catch-all locale route
```

*Commit message example*

```text
chore: add AIOS sync trigger on content changes
```

*Commit message example*

```text
feat: interactive buying-signals page with Lovable UI/UX spec
```

*Commit message example*

```text
feat: add 94 B2B buying signals insight page (#11)
```

*Commit message example*

```text
fix: use Vercel API to find latest deployment instead of parsing CLI output
```

## Architecture

### Project Structure: Single Package

This project uses **type-based** module organization.

### Source Layout

```
src/
├── app/
├── components/
├── content/
├── data/
├── lib/
├── types/
```

### Configuration Files

- `.eslintrc.json`
- `.github/workflows/deploy.yml`
- `.github/workflows/fix-domain.yml`
- `.github/workflows/notify-aios.yml`
- `next.config.mjs`
- `package.json`
- `tailwind.config.ts`
- `tsconfig.json`
- `vercel.json`

### Guidelines

- Group code by type (components, services, utils)
- Keep related functionality in the same type folder
- Avoid circular dependencies between type folders

## Code Style

### Language: TypeScript

### Naming Conventions

| Element | Convention |
|---------|------------|
| Files | snake_case |
| Functions | camelCase |
| Classes | PascalCase |
| Constants | SCREAMING_SNAKE_CASE |

### Import Style: Path Aliases (@/, ~/)

### Export Style: Default Exports


*Preferred import style*

```typescript
// Use path aliases for imports
import { Button } from '@/components/Button'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/api'
```

*Preferred export style*

```typescript
// Use default exports for main component/function
export default function UserProfile() { ... }
```

## Error Handling

### Error Handling Style: Try-Catch Blocks


*Standard error handling pattern*

```typescript
try {
  const result = await riskyOperation()
  return result
} catch (error) {
  console.error('Operation failed:', error)
  throw new Error('User-friendly message')
}
```

## Common Workflows

These workflows were detected from analyzing commit patterns.

### Feature Development

Standard feature implementation workflow

**Frequency**: ~18 times per month

**Steps**:
1. Add feature implementation
2. Add tests for feature
3. Update documentation

**Files typically involved**:
- `src/app/agence/*`
- `src/components/home/*`
- `src/components/layout/*`
- `**/*.test.*`
- `**/api/**`

**Example commit sequence**:
```
feat(ui): homepage services carousel, agence overhaul, breadcrumb upgrade + nav fix
Merge branch 'fix/i18n-hardcoded-strings'
Add files via upload
```

### Add Or Enrich Multilingual Page

Adds a new page or enriches an existing one with content and translations in multiple locales (FR/EN/DE/NL), including updating slug maps and localized JSON bundles.

**Frequency**: ~4 times per month

**Steps**:
1. Create or update page implementation (e.g., page.tsx) in src/app or src/components/pages
2. Add or update content in locale-specific JSON files (e.g., src/lib/i18n/*-content.json, src/lib/i18n/slug-map.json)
3. If new, add route to slug-map.json and sitemap.ts
4. Translate or sync content across locales (often via DeepL or scripts)
5. Update or create supporting components if needed

**Files typically involved**:
- `src/app/[locale]/[[...slug]]/page.tsx`
- `src/app/insights/*/page.tsx`
- `src/app/ai-sales-ops/page.tsx`
- `src/app/agence/page.tsx`
- `src/components/pages/*`
- `src/lib/i18n/slug-map.json`
- `src/lib/i18n/*-content.json`
- `src/lib/i18n/*-content.ts`
- `scripts/translate_*.mjs`

**Example commit sequence**:
```
Create or update page implementation (e.g., page.tsx) in src/app or src/components/pages
Add or update content in locale-specific JSON files (e.g., src/lib/i18n/*-content.json, src/lib/i18n/slug-map.json)
If new, add route to slug-map.json and sitemap.ts
Translate or sync content across locales (often via DeepL or scripts)
Update or create supporting components if needed
```

### Ai Seo Geo Enrichment

Enriches existing pages with AI SEO and GEO signals: summary sections, author bylines, answer capsules, definition patterns, citations, and JSON-LD schema for better search and AI visibility.

**Frequency**: ~3 times per month

**Steps**:
1. Update or add SummarySection, AuthorByline, and other semantic components in page files
2. Add or update editorial fields (summaryPoints, editorialTitle, citations) in content files (JSON or TS)
3. Add or update JSON-LD schema and microdata in components/pages
4. Sync content between masterfile.fr.ts and masterfile-content.json
5. Translate new fields across locales if needed

**Files typically involved**:
- `src/components/pages/*`
- `src/components/shared/summary-section.tsx`
- `src/components/shared/author-byline.tsx`
- `src/components/shared/comparison-table.tsx`
- `src/lib/i18n/masterfile-content.json`
- `src/content/masterfile.fr.ts`
- `src/lib/i18n/*-content.json`
- `src/lib/seo/metadata.ts`

**Example commit sequence**:
```
Update or add SummarySection, AuthorByline, and other semantic components in page files
Add or update editorial fields (summaryPoints, editorialTitle, citations) in content files (JSON or TS)
Add or update JSON-LD schema and microdata in components/pages
Sync content between masterfile.fr.ts and masterfile-content.json
Translate new fields across locales if needed
```

### Navbar Footer Navigation Update

Updates navigation structure in the site header/footer, often to add new pages, restructure dropdowns, or localize navigation items.

**Frequency**: ~2 times per month

**Steps**:
1. Edit src/components/layout/site-header.tsx and/or site-footer.tsx to add, remove, or restructure navigation links
2. Update navigation labels for all supported languages
3. If relevant, update dropdown groupings or mobile/desktop variants
4. Test navigation in all locales

**Files typically involved**:
- `src/components/layout/site-header.tsx`
- `src/components/layout/site-footer.tsx`

**Example commit sequence**:
```
Edit src/components/layout/site-header.tsx and/or site-footer.tsx to add, remove, or restructure navigation links
Update navigation labels for all supported languages
If relevant, update dropdown groupings or mobile/desktop variants
Test navigation in all locales
```

### Vercel Deploy Domain Workflow

Modifies GitHub Actions workflows to ensure Vercel deployments are correctly aliased to the production domain, including diagnostics and fixes for domain drift.

**Frequency**: ~2 times per month

**Steps**:
1. Edit .github/workflows/deploy.yml to improve deployment and aliasing logic
2. Add or update .github/workflows/fix-domain.yml for diagnostics or one-off fixes
3. Use Vercel API for deployment and alias management
4. Test deployment and verify domain assignment

**Files typically involved**:
- `.github/workflows/deploy.yml`
- `.github/workflows/fix-domain.yml`

**Example commit sequence**:
```
Edit .github/workflows/deploy.yml to improve deployment and aliasing logic
Add or update .github/workflows/fix-domain.yml for diagnostics or one-off fixes
Use Vercel API for deployment and alias management
Test deployment and verify domain assignment
```

### I18n Slug And Redirect Fix

Corrects or adds localized slugs and 301 redirects for pages across EN/DE/NL/FR, ensuring all locales have proper URLs and legacy paths redirect correctly.

**Frequency**: ~2 times per month

**Steps**:
1. Edit src/lib/i18n/slug-map.json to add or fix localized slugs
2. Update next.config.mjs to add or adjust redirects
3. If needed, update sitemap.ts to include new/changed routes
4. Test all affected URLs and redirects

**Files typically involved**:
- `src/lib/i18n/slug-map.json`
- `next.config.mjs`
- `src/app/sitemap.ts`

**Example commit sequence**:
```
Edit src/lib/i18n/slug-map.json to add or fix localized slugs
Update next.config.mjs to add or adjust redirects
If needed, update sitemap.ts to include new/changed routes
Test all affected URLs and redirects
```


## Best Practices

Based on analysis of the codebase, follow these practices:

### Do

- Use snake_case for file names
- Prefer default exports

### Don't

- Don't use long relative imports (use aliases)
- Don't deviate from established patterns without discussion

---

*This skill was auto-generated by [ECC Tools](https://ecc.tools). Review and customize as needed for your team.*
