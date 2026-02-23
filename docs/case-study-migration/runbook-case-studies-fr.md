# Runbook — Migration stricte des études de cas FR devlo (1 run = 1 étude de cas)

## Objectif
Standardiser une exécution **fiable, traçable et premium** pour migrer les études de cas FR de `devlo.ch` vers `devlo-next`, sans hallucination et sans dérive UX.

## Principes non négociables
- Vérité source uniquement (`devlo.ch/resultats/...`)
- 1 étude de cas par run
- Slug source = URL canonique publique
- Redirections 301 depuis slugs marketing existants
- `.webp` obligatoire pour tous les visuels affichés
- CTA intra-page uniquement (scroll vers HubSpot)
- Pas de wording audit/source visible en public
- Preview Vercel obligatoire en fin de run

---

## Pré-requis (avant le run)
### Technique
- Repo à jour localement (`devlo-next`)
- Node/npm installés
- Vercel CLI connecté et projet linké
- Build local fonctionnel de base

### Références internes
- Template premium CareerLunch validé visuellement
- Prompt maître strict disponible
- Dossier artefacts `reports/case-study-rewrites/` accessible

---

## Workflow standard (ordre strict)

## Étape A — Préparation
### A.1 Identifier la cible
- Input : nom client ou slug source présumé
- Exemples : `Saporo`, `cybersecurite-4500-entreprises`

### A.2 Vérifier la cible dans le sitemap
- Lire `https://devlo.ch/sitemap_index.xml`
- Identifier `resultats-sitemap.xml`
- Trouver l’URL exacte de la page cible

### A.3 Vérifier l’état actuel du site Next
- Vérifier si la page détaillée existe déjà dans `src/lib/case-studies.data.json`
- Vérifier le slug public actuellement utilisé (`masterfile.fr.ts`, route page résultats, etc.)
- Noter l’éventuel slug marketing legacy à rediriger vers le slug source

### A.4 Définir le dossier de run
- Créer : `reports/case-study-rewrites/<slug-source>/`
- Tous les artefacts du run vont dans ce dossier

**Checklist A**
- [ ] Cible identifiée
- [ ] Slug source confirmé via sitemap
- [ ] Route canonique déduite `/etudes-de-cas/<slug-source>`
- [ ] Legacy slug(s) éventuels identifiés
- [ ] Dossier artefacts créé

---

## Étape B — Retrieval source
### B.1 Télécharger la page source
- Sauvegarder `source.html`

### B.2 Extraire le snapshot structuré
Créer :
- `source-snapshot.json`
- `source-snapshot.md`

### B.3 Contenu à extraire (minimum)
- title tag
- H1
- intro
- hero KPIs
- détails de campagne
- sections (titres + paragraphes + listes)
- témoignage(s)
- CTA(s) source
- assets détectés (bannière/logo/photo/autres)
- `outOfScopeDetected`
- `missingFromSource`
- `ambiguousClaims`

### B.4 Politique d’ambiguïté source
Si la source est incohérente :
- choisir la version la plus détaillée pour la publication,
- documenter l’ambiguïté dans les artefacts internes,
- ne pas exposer cette ambiguïté au public.

**Checklist B**
- [ ] `source.html` généré
- [ ] `source-snapshot.json` complet
- [ ] `source-snapshot.md` traçable
- [ ] `missingFromSource` rempli (même vide explicitement)
- [ ] `ambiguousClaims` rempli (même vide explicitement)

---

## Étape C — Réécriture SEO/GEO (sans hallucination)
### C.1 Objectif éditorial
Transformer le contenu pour une lecture premium B2B :
- clair
- structuré
- crédible
- scannable
- orienté décision

### C.2 Ce qui est autorisé
- reformuler / clarifier / restructurer
- fusionner des répétitions
- améliorer la hiérarchie H1/H2/H3
- renforcer SEO/GEO (sans bourrage)
- mettre en avant les résultats les plus décisifs (s’ils sont dans la source)

### C.3 Ce qui est interdit
- inventer des faits / chiffres / témoignages / outils / dates
- supprimer des sections utiles de la source
- afficher des formulations audit/source/méthodologie interne

### C.4 Livrable interne
Créer `rewrite-fr.md` contenant :
- la version réécrite prête à publier
- notes SEO/GEO (courtes)
- `Fact integrity checklist` (obligatoire)
  - `Claim publié -> référence source-snapshot.md`

### C.5 Normalisation FR
- `71 %`
- guillemets français `« »`
- ponctuation FR
- labels homogènes entre études

**Checklist C**
- [ ] Réécriture complète générée
- [ ] Aucune hallucination détectée
- [ ] Structure SEO/GEO claire (H1/H2/H3)
- [ ] Fact integrity checklist complet
- [ ] Aucun wording audit/source dans la version publique

---

## Étape D — Assets `.webp`
### D.1 Assets requis (bloquants)
- Bannière (obligatoire)
- Logo client (obligatoire)
- Photo témoin (obligatoire si témoignage présent)

### D.2 Politique stricte
- Tous les assets affichés doivent être `.webp`
- Mapping explicite uniquement (jamais au hasard)
- Si asset obligatoire manquant/ambigu → publication bloquée

### D.3 Actions autorisées
- conversion en `.webp`
- renommage pour clarifier la nomenclature
- mise à jour des références
- documentation du mapping

### D.4 Livrable
Créer `assets-map.json` avec :
- statut de chaque asset (`ok`, `missing`, `ambiguous`)
- chemins source et local `.webp`
- renommages effectués

**Checklist D**
- [ ] Bannière `.webp` OK
- [ ] Logo `.webp` OK
- [ ] Photo témoin `.webp` OK (si témoignage)
- [ ] `assets-map.json` généré
- [ ] Aucun mapping ambigu non résolu avant publish

---

## Étape E — Publish (Next.js, template premium CareerLunch)
### E.1 Règle UI/UX
Réutiliser le template premium CareerLunch, sans redesign spécifique par étude :
- hero compact
- sticky subnav
- bloc KPI
- détails de campagne mini-cards
- sections long-form lisibles
- témoignage premium avec photo
- CTA sticky discret
- CTA final + HubSpot inline

### E.2 Slug canonique + redirects
- Route publique = `/etudes-de-cas/<slug-source>`
- Slug source conservé tel quel
- Legacy slug marketing redirigé (301)
- Ne jamais auto-corriger un slug (`Saporo` reste `Saporo`)

### E.3 Contenu public propre
Retirer / masquer du rendu public :
- `Source originale (devlo.ch)`
- `Transparence : Notre méthodologie`
- notes de validation / audit / source

### E.4 CTA comportement (obligatoire)
Tous les CTA de la page :
- scroll vers le formulaire HubSpot final
- aucune navigation externe / nouvelle page

**Checklist E**
- [ ] Page publiée dans le template premium CareerLunch
- [ ] Slug source canonique confirmé
- [ ] Legacy redirect ajouté/confirmé (si nécessaire)
- [ ] CTA hero/sticky/final -> HubSpot (scroll)
- [ ] Aucun bloc audit/source visible

---

## Étape F — Validate
### F.1 Validation technique
- `npm run build`
- route publique rend correctement
- sticky subnav visible et utilisable
- sticky CTA OK
- HubSpot form présent inline

### F.2 Validation contenu (anti-régression)
- pas de perte d’information utile
- pas d’ajout non sourcé
- chiffres clés source bien mis en avant

### F.3 Validation assets
- images `.webp` uniquement sur la page cible
- bannière/logo/photo témoin présents

### F.4 Validation UX desktop-first
- lecture fluide
- hiérarchie visuelle premium
- CTA final + form visibles
- impression crédible B2B premium

### F.5 Preview Vercel (obligatoire)
- déployer preview
- partager URL preview site + URL page étude de cas
- attendre feedback visuel avant production

**Checklist F**
- [ ] Build OK
- [ ] Route OK
- [ ] Sticky subnav OK
- [ ] Sticky CTA OK
- [ ] HubSpot form OK
- [ ] `.webp only` OK
- [ ] Preview Vercel déployée

---

## Format de reporting (strict, à chaque run)
### 1) Résumé d’exécution
- slug traité
- URL source devlo.ch
- URL preview Vercel

### 2) Phase 1 — Retrieval (preuves)
- sitemap utilisé
- URL source trouvée
- snapshots générés (HTML + JSON + MD)

### 3) Phase 2 — Rewrite
- ce qui a été restructuré
- ce qui a été gardé tel quel
- ambiguïtés source (interne)

### 4) Phase 3 — Assets
- mapping `.webp`
- assets manquants / renommés / ambiguïtés

### 5) Phase 4 — Publish
- fichiers modifiés
- sections rendues
- slug canonique confirmé

### 6) Phase 5 — Validate (checklist)
- build ✅/⚠️
- CTA scroll ✅/⚠️
- sticky nav ✅/⚠️
- HubSpot form ✅/⚠️
- `.webp` only ✅/⚠️
- source/audit hidden ✅/⚠️
- preview Vercel ✅ (liens)

### 7) Questions critiques (si nécessaire)
- seulement les questions bloquantes
- + 1 amélioration du process si problème récurrent détecté

---

## Politique de blocage (qualité > vitesse)
Le run est **bloqué en publication** si l’un des points suivants n’est pas résolu :
- slug source non confirmé,
- asset `.webp` obligatoire manquant/ambigu,
- témoignage présent sans photo témoin mappée,
- hallucination détectée,
- CTA qui quittent la page,
- texte audit/source visible en public.

Dans ce cas :
- terminer retrieval/rewrite/reporting,
- ne pas publier,
- remonter blocage + question critique.
