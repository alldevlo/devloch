# Handoff Cursor

## Ce qui a été fait
- Pipeline Sanity runtime corrigé pour supporter les deux jeux d'env vars:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` ou `SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET` ou `SANITY_DATASET`
  - `SANITY_API_TOKEN` ou `SANITY_WRITE_TOKEN`
- `scripts/sanity_seed_from_repo_fr.mjs` corrigé:
  - seed FR fiable sur 84 docs depuis `slug-map.json`
  - remplit `title/description/seoTitle/seoDescription` FR
  - priorise `docs/chatseo-metadata-export.csv`, fallback `seo-crawl-exports/sf-internal-html.csv`, puis live HTTP
- `scripts/translate_missing_locales_deepl.mjs` corrigé:
  - patch réel EN/DE/NL (plus de no-op)
  - appels DeepL robustes (header auth, endpoint pro/free fallback)
  - traduction batchée par locale/doc
- Audit i18n/SEO étendu:
  - `scripts/audit_i18n_full.sh` vérifie 10 routes/locale + canonical/og/hreflang + sitemap/robots

## Commandes utiles (rerun)
```bash
set -a && source .env.local && set +a
node scripts/sanity_seed_from_repo_fr.mjs
node scripts/translate_missing_locales_deepl.mjs
npm run build
bash scripts/audit_i18n_full.sh https://devlo.ch src/lib/i18n/slug-map.json
```

## Mappings de slugs
- Mapping principal: `/Users/charlesperret/Documents/GitHub/devloch/src/lib/i18n/slug-map.json`
- Helpers de résolution: `/Users/charlesperret/Documents/GitHub/devloch/src/lib/i18n/slug-map.ts`
- Utilisation routing locale: `/Users/charlesperret/Documents/GitHub/devloch/src/app/[locale]/[[...slug]]/page.tsx`

## État actuel / points d’attention
- Seed + translate tournent et écrivent bien en Sanity.
- Les previews Vercel peuvent être protégées (401), donc audit public fiable surtout sur `https://devlo.ch`.
- Snapshot sitemap enregistré: `/Users/charlesperret/Documents/GitHub/devloch/docs/i18n_sanity_migration/final_sitemap.xml`
