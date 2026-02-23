# Script Spec — Pipeline strict des études de cas FR (devlo)

## Objectif
Définir la refonte/extension du pipeline actuel de scraping (`sync-case-studies.mjs`) vers un pipeline **strict, auditable, par étude de cas**, compatible avec le prompt maître et le runbook.

## Portée de cette spec
- **Spec technique uniquement** (pas d’implémentation dans ce livrable)
- Couvre :
  - retrieval source via sitemap,
  - génération d’artefacts d’audit,
  - audit assets `.webp`,
  - validation de page publiée,
  - production de rapports standardisés.

---

## État actuel (baseline)
### Script existant
- `/Users/charlesperret/My Drive (charles@devlo.ch)/Onboarding/devlo-next/scripts/sync-case-studies.mjs`

### Limites actuelles
1. Scraping global, pas “1 étude de cas par run”
2. Pas de `source.html` / `snapshot.json` / `snapshot.md`
3. Pas de `missingFromSource` / `ambiguousClaims`
4. Pas de fact mapping / anti-hallucination audit trail
5. Téléchargement assets sans politique `.webp only`
6. Données FR + cas spéciaux (Monizze) injectés hors standard source-first

---

## Architecture recommandée (nouveau pipeline strict)
Conserver le script existant pour maintenance/legacy, et créer un pipeline dédié.

## Fichiers (nouveaux)
- `/Users/charlesperret/My Drive (charles@devlo.ch)/Onboarding/devlo-next/scripts/case-study-pipeline.mjs` (orchestrateur CLI)
- `/Users/charlesperret/My Drive (charles@devlo.ch)/Onboarding/devlo-next/scripts/lib/case-study-source-extractor.mjs`
- `/Users/charlesperret/My Drive (charles@devlo.ch)/Onboarding/devlo-next/scripts/lib/case-study-assets.mjs`
- `/Users/charlesperret/My Drive (charles@devlo.ch)/Onboarding/devlo-next/scripts/lib/case-study-validators.mjs`
- `/Users/charlesperret/My Drive (charles@devlo.ch)/Onboarding/devlo-next/scripts/lib/case-study-reporters.mjs`

## Pourquoi cette architecture
- réduit le risque de casser `sync-case-studies.mjs`
- permet des commandes ciblées par phase (`retrieve`, `assets-audit`, `validate-page`)
- rend l’audit interne systématique et versionnable
- facilite la montée en charge (une étude de cas par run)

---

## CLI (API publique du pipeline)
Le pipeline doit supporter au minimum :

```bash
node scripts/case-study-pipeline.mjs retrieve --client "Saporo"
node scripts/case-study-pipeline.mjs retrieve --source-slug "cybersecurite-4500-entreprises"
node scripts/case-study-pipeline.mjs assets-audit --source-slug "cybersecurite-4500-entreprises"
node scripts/case-study-pipeline.mjs validate-page --route "/etudes-de-cas/cybersecurite-4500-entreprises"
```

Optionnel (recommandé) :
```bash
node scripts/case-study-pipeline.mjs run --client "Saporo" --mode draft
```

### Contrats CLI (décision complète)
#### `retrieve`
**Entrées**
- `--client <string>` OR `--source-slug <string>` (au moins un)
- `--force` (optionnel, overwrite artefacts)

**Sorties**
- génère `source.html`, `source-snapshot.json`, `source-snapshot.md`
- affiche : sitemap index URL, sitemap URL, source URL, dossier d’artefacts
- exit code `0` si succès, `1` si échec

#### `assets-audit`
**Entrées**
- `--source-slug <string>` (obligatoire)
- `--fix` (optionnel, autorise conversion/renommage)

**Sorties**
- génère `assets-map.json`
- exit code `0` si tous assets obligatoires `.webp` OK
- exit code `2` si assets obligatoires manquants/ambigus (blocage publish)

#### `validate-page`
**Entrées**
- `--route <string>` (obligatoire)
- `--base-url <string>` (optionnel, défaut `http://localhost:3000`)

**Sorties**
- génère `validation.json`
- vérifie CTA, sticky nav, HubSpot, visibilité de blocs interdits, `.webp only`
- exit code `0` si checks critiques OK, `1` sinon

#### `run` (optionnel)
**Entrées**
- `--client <string>` OR `--source-slug <string>`
- `--mode draft|production` (défaut `draft`)

**Comportement**
- orchestre `retrieve` + `assets-audit`
- ne modifie pas le contenu de production en `draft`
- en `production`, seulement si préconditions passées (assets OK, source OK)

---

## Répertoires et artefacts (schéma obligatoire)
Par étude de cas :
- `reports/case-study-rewrites/<slug-source>/`

### Fichiers obligatoires
- `source.html` — HTML brut téléchargé
- `source-snapshot.json` — extraction structurée
- `source-snapshot.md` — snapshot lisible et traçable
- `rewrite-fr.md` — version réécrite + fact integrity checklist (interne)
- `assets-map.json` — mapping final assets source -> local `.webp`
- `validation.json` — résultats checks techniques/public
- `run-summary.md` — résumé run (recommandé)

---

## Schémas de données (minimum requis)

## 1) `source-snapshot.json`
```ts
type SourceSnapshot = {
  sourceDomain: string;
  sitemapIndexUrl: string;
  sitemapUrl: string;
  sourceUrl: string;
  fetchedAt: string;
  page: {
    titleTag: string;
    h1: string;
    intro: string[];
    heroKpis: Array<{ value: string; label: string }>;
    campaignDetails: Array<{ label: string; value: string }>;
    sections: Array<{
      heading: string;
      paragraphs: string[];
      bullets: string[];
    }>;
    testimonials: Array<{
      quote: string;
      author?: string;
      role?: string;
      company?: string;
    }>;
    ctas: Array<{ text: string; href: string }>;
    assets: {
      heroImages: string[];
      clientLogos: string[];
      profilePhotos: string[];
      otherImages: string[];
    };
  };
  outOfScopeDetected: Array<{ label: string; reason: string }>;
  missingFromSource: string[];
  ambiguousClaims: Array<{
    label: string;
    options: string[];
    chosenPolicy: "most_detailed" | "hero_kpi" | "defer";
    note: string;
  }>;
};
```

### Règles de remplissage
- `missingFromSource` doit exister même si vide
- `ambiguousClaims` doit exister même si vide
- `outOfScopeDetected` doit expliciter les blocs cross-promo ignorés
- `sourceUrl` doit être la preuve canonique de retrieval

## 2) `assets-map.json`
```ts
type AssetsMap = {
  sourceSlug: string;
  hero: {
    required: true;
    sourceUrl?: string;
    localWebpPath?: string;
    status: "ok" | "missing" | "ambiguous";
  };
  logo: {
    required: true;
    sourceUrl?: string;
    localWebpPath?: string;
    status: "ok" | "missing" | "ambiguous";
  };
  testimonialPhoto: {
    required: boolean;
    sourceUrl?: string;
    localWebpPath?: string;
    status: "ok" | "missing" | "ambiguous";
  };
  extras: Array<{
    sourceUrl?: string;
    localWebpPath?: string;
    status: "ok" | "missing" | "ambiguous";
  }>;
  renamed: Array<{
    from: string;
    to: string;
    reason: string;
  }>;
};
```

### Politique de sortie
- Si `hero.status !== "ok"` → blocage publish
- Si `logo.status !== "ok"` → blocage publish
- Si `testimonialPhoto.required === true` et `testimonialPhoto.status !== "ok"` → blocage publish

## 3) `validation.json`
```ts
type CaseStudyValidation = {
  sourceSlug: string;
  route: string;
  checks: {
    build: "pass" | "fail";
    ctaScrollToHubspot: "pass" | "fail";
    stickySubnav: "pass" | "fail";
    stickyCta: "pass" | "fail";
    hubspotPresent: "pass" | "fail";
    sourceAuditBlocksHidden: "pass" | "fail";
    webpOnlyImagesOnPage: "pass" | "fail" | "warn";
    previewVercelDeployed: "pass" | "fail";
  };
  evidence: Record<string, string | string[]>;
  blockers: string[];
};
```

### Règles de criticité
- checks critiques bloquants :
  - `build`
  - `ctaScrollToHubspot`
  - `hubspotPresent`
  - `sourceAuditBlocksHidden`
  - `webpOnlyImagesOnPage`
- `previewVercelDeployed` peut être `fail` uniquement si le run s’est arrêté avant release (mais doit être expliqué)

---

## Module spec — responsabilités détaillées

## `case-study-source-extractor.mjs`
### Responsabilités
- résoudre `ETUDE_CIBLE` -> `sourceSlug` via sitemap
- récupérer `source.html`
- parser HTML (Cheerio)
- extraire la structure `SourceSnapshot`
- détecter blocs hors périmètre (`discover-section`, cross-promo, etc.)
- détecter ambiguïtés KPI/claims
- produire `source-snapshot.json` + `source-snapshot.md`

### Entrées
- client name ou source slug
- chemins repo
- URLs sitemap index / sitemap résultats

### Sorties
- objets snapshot + fichiers artefacts

### Points d’attention
- la source peut être partiellement “rendered” WordPress → fallback extraction tolérant
- préserver les nombres et libellés exactement dans le snapshot
- ne jamais normaliser ou traduire au niveau extraction brute

---

## `case-study-assets.mjs`
### Responsabilités
- identifier les assets source utiles (bannière/logo/photo témoin)
- mapper vers assets locaux existants
- convertir/normaliser en `.webp` (si `--fix`)
- produire `assets-map.json`
- signaler les ambiguïtés de mapping

### Entrées
- `sourceSlug`
- `source-snapshot.json`
- répertoire `public/images/...`

### Sorties
- `assets-map.json`
- fichiers `.webp` (si conversion activée)

### Politique `.webp only`
- vérifier les références rendues sur la page cible
- statut `blocked` si un asset obligatoire n’est pas `.webp`

---

## `case-study-validators.mjs`
### Responsabilités
- exécuter checks techniques et UX minimaux sur la page publiée
- vérifier CTA → ancre HubSpot (pas de navigation)
- vérifier sticky subnav/sticky CTA (existence + comportement DOM minimal)
- vérifier absence de blocs interdits (source/audit/transparence)
- vérifier images `.webp` uniquement sur la page cible
- produire `validation.json`

### Entrées
- `route`
- `baseUrl`
- éventuellement `sourceSlug` pour contexte

### Sorties
- `validation.json`

### Méthode recommandée
- `fetch` HTML pour checks statiques (textes interdits, extensions images)
- Playwright (optionnel/recommandé) pour checks interactifs (scroll CTA, sticky nav)

---

## `case-study-reporters.mjs`
### Responsabilités
- générer `run-summary.md`
- consolider liens / statuts / blocages / preuves
- produire le format de reporting attendu (7 sections)

### Entrées
- `source-snapshot.json`
- `assets-map.json`
- `validation.json`
- métadonnées run (slug, preview URL, fichiers modifiés)

### Sorties
- `run-summary.md`

---

## `case-study-pipeline.mjs` (orchestrateur)
### Responsabilités
- parser arguments CLI
- orchestrer les modules par commande
- centraliser codes de sortie
- standardiser logs console (étapes + statuts)

### Codes de sortie (décision complète)
- `0` = succès
- `1` = erreur technique / extraction impossible / validation KO
- `2` = blocage qualité (assets manquants/ambigus, slug non confirmé, etc.)

---

## Intégrations futures dans le site (spec, pas implémenté ici)

## 1) Data model case studies
Fichier à étendre (future implémentation) :
- `/Users/charlesperret/My Drive (charles@devlo.ch)/Onboarding/devlo-next/src/lib/case-studies.ts`

### Champs recommandés à ajouter
- `sourceSlug: string`
- `legacySlugs?: string[]`
- `assetAudit?: {
    hero: "webp" | "legacy";
    logo: "webp" | "legacy";
    testimonialPhoto?: "webp" | "legacy";
  }`

### Raison
- rend explicite le slug canonique source
- centralise les legacy slugs à rediriger
- rend la conformité assets traçable

## 2) Mapping de redirections de slugs (nouveau fichier)
Spécifier :
- `/Users/charlesperret/My Drive (charles@devlo.ch)/Onboarding/devlo-next/src/lib/case-study-slug-redirects.ts`

Exemple :
```ts
export const caseStudySlugRedirects = {
  "careerlunch-54-rendez-vous-dach": "hr-54-rendez-vous-dach",
  "saporo-180-prospects-cybersecurite": "cybersecurite-4500-entreprises",
} as const;
```

### Intégration cible
- `next.config.mjs` via `redirects()` (301)
- maillage interne (`caseStudiesCards`) pointant uniquement vers les slugs source canoniques

## 3) Migration de `caseStudiesCards`
Fichier concerné :
- `/Users/charlesperret/My Drive (charles@devlo.ch)/Onboarding/devlo-next/src/content/masterfile.fr.ts`

### Politique
- `caseStudiesCards.slug` doit devenir le slug source canonique
- les anciens slugs marketing ne doivent plus être utilisés en liens internes
- ils survivent uniquement en redirect 301

---

## Validation & tests (automatisables)

## A. Retrieval
- [ ] `resultats-sitemap.xml` trouvé depuis le sitemap index
- [ ] source URL exacte trouvée
- [ ] `source.html` généré
- [ ] `source-snapshot.json` complet
- [ ] `source-snapshot.md` complet
- [ ] `missingFromSource` présent

## B. Anti-hallucination / rewrite (semi-automatique + humain)
- [ ] chaque KPI publié mappé à la source
- [ ] chaque témoignage publié existe dans la source
- [ ] ambiguïtés loguées en interne uniquement
- [ ] aucun wording audit/source visible dans le rendu public

## C. Assets `.webp`
- [ ] bannière `.webp`
- [ ] logo `.webp`
- [ ] photo témoin `.webp` si témoignage présent
- [ ] aucune image `.jpg/.png` sur la page publiée (sauf exception documentée)

## D. Publish/UI
- [ ] slug source canonique
- [ ] redirect 301 legacy -> source (si applicable)
- [ ] CTA hero/sticky/final -> HubSpot form (scroll)
- [ ] sticky subnav active-state OK
- [ ] sticky CTA sans overlap footer
- [ ] HubSpot form inline visible

## E. Release
- [ ] `npm run build` passe
- [ ] preview Vercel déployée
- [ ] URLs preview (site + page) partagées
- [ ] checklist finale ✅/⚠️ fournie

---

## Intégration `package.json` (future implémentation)
Ajouter des scripts dédiés (exemples) :
```json
{
  "scripts": {
    "case-study:retrieve": "node scripts/case-study-pipeline.mjs retrieve",
    "case-study:assets": "node scripts/case-study-pipeline.mjs assets-audit",
    "case-study:validate": "node scripts/case-study-pipeline.mjs validate-page"
  }
}
```

---

## Non-objectifs (pour éviter le scope creep)
- Refaire tout le design des études de cas (on réutilise CareerLunch)
- Générer automatiquement la réécriture SEO/GEO sans contrôle humain
- Publier en masse plusieurs études de cas dans un seul run
- Corriger les textes source de manière éditoriale “créative”
- Autoriser des assets non `.webp` “temporairement” en production

---

## Politique d’escalade (quand poser une question)
Poser une question uniquement si bloquant :
1. slug source introuvable/ambigu dans le sitemap,
2. asset `.webp` obligatoire manquant/ambigu,
3. témoignage présent mais photo introuvable,
4. conflit majeur entre source et données existantes,
5. impossibilité de conserver le slug source sans casser le route mapping actuel.

Dans ce cas, terminer les artefacts et remonter :
- le blocage,
- l’impact,
- la proposition de résolution,
- 1 amélioration du process.
