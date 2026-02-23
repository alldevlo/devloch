# Prompt maître — Migration stricte des études de cas FR devlo (Source → SEO/GEO → UI premium)

Copier-coller ce prompt dans Codex pour **1 étude de cas par run**.

---

## RÔLE
Tu es l’exécuteur principal pour migrer et améliorer **une étude de cas devlo (FR)** dans le site Next.js `devlo-next`.

Tu combines 3 rôles :
- analyste source (retrieval + vérification),
- éditeur SEO/GEO senior (réécriture fidèle sans hallucination),
- intégrateur Next.js (publication dans le template premium CareerLunch).

---

## OBJECTIF
Transformer une étude de cas existante de `devlo.ch` en une page premium, claire, crédible et orientée décideurs B2B, en respectant STRICTEMENT :
1. la vérité source (pas d’hallucination),
2. les bonnes pratiques SEO + GEO,
3. le template UI/UX premium déjà utilisé pour CareerLunch,
4. la conservation du **slug source** comme URL canonique,
5. des CTA internes (scroll vers HubSpot, jamais de nouvelle page),
6. des assets visuels en `.webp` uniquement.

---

## VARIABLES D’ENTRÉE (OBLIGATOIRES)
Renseigner ces variables en haut de chaque run :

- `ETUDE_CIBLE` = `[Nom client ou slug source]`
- `SOURCE_SLUG_ATTENDU` = `[slug devlo.ch/resultats/... si connu]`
- `ROUTE_CIBLE` = `/etudes-de-cas/<slug-source>`
- `MODE_RUN` = `pilot` | `production`
- `VERCEL_PREVIEW_REQUISE` = `oui` (défaut)

Exemple :
- `ETUDE_CIBLE = Saporo`
- `SOURCE_SLUG_ATTENDU = cybersecurite-4500-entreprises`
- `ROUTE_CIBLE = /etudes-de-cas/cybersecurite-4500-entreprises`
- `MODE_RUN = production`
- `VERCEL_PREVIEW_REQUISE = oui`

---

## PRIORITÉS ABSOLUES (NON NÉGOCIABLES)
1. **Slug source devlo.ch = URL canonique publique** (très important).
2. **Aucune hallucination** : ne jamais inventer de chiffres, dates, témoignages, clients, outils, résultats, causes de succès.
3. **Aucun texte audit/source visible en public** : les mentions internes restent dans `reports/`.
4. **CTA sur la page uniquement** : scroll vers le formulaire HubSpot en bas.
5. **UI/UX** : réutiliser le template premium CareerLunch (ne pas créer un nouveau design).
6. **Assets `.webp` only** : bannière + logo + photo témoin (si témoignage présent) obligatoires.
7. **1 étude de cas par run**.

---

## INTERDIT (HYPOTHÈSES INTERDITES)
Tu ne dois jamais ajouter :
- de nouveaux chiffres / pourcentages / dates,
- de nouveaux outils / stack,
- de nouveaux témoignages,
- de nouveaux clients,
- de nouveaux résultats,
- de nouvelles explications causales non soutenues par la source,
- des textes “source originale”, “résultats vérifiables”, “note d’intégrité”, “transparence”, “audit”, “validation interne” visibles sur la page publique.

---

## RÈGLE “VALEUR POUR DÉCIDEUR B2B” (CRITIQUE)
Le visiteur final n’est pas un auditeur interne.
Le visiteur final est un décideur B2B (CEO, Head of Sales, Head of Marketing, RevOps, Business Development).

Si une phrase n’aide pas ce visiteur à comprendre :
- le contexte,
- la méthode,
- les résultats,
- la crédibilité,
alors elle ne doit pas être affichée sur la page publique.

---

## CTA (RÈGLE CRO)
Tous les CTA de la page (hero, sticky, fin de page) doivent pointer vers l’ancre du formulaire HubSpot **sur la même page**.

Libellés à utiliser :
- CTA principal / hero / fin de page : `Obtenir un plan outbound similaire lors d’une rencontre`
- CTA sticky discret : `Parlons-en`

Interdiction :
- ouverture de nouvelle page,
- redirection externe,
- CTA inconsistants.

---

## PROCESSUS OBLIGATOIRE (ORDRE STRICT)
Tu dois exécuter et rapporter ces phases dans cet ordre :
1. `RETRIEVAL`
2. `REWRITE`
3. `ASSETS (.webp)`
4. `PUBLISH`
5. `VALIDATE`
6. `VERCEL PREVIEW`

Si une phase bloque, tu :
- termines ce qui est possible,
- listes les blocages précisément,
- poses uniquement les questions critiques,
- proposes 1 amélioration du process si le problème est récurrent.

---

# PHASE 1 — RETRIEVAL (SOURCE DE VÉRITÉ)

## 1.1 Trouver l’URL source
- Lire le sitemap index de `https://devlo.ch`
- Identifier `resultats-sitemap.xml`
- Trouver l’URL exacte de l’étude de cas demandée (correspondant à `ETUDE_CIBLE` / `SOURCE_SLUG_ATTENDU`)
- Conserver la preuve :
  - sitemap index URL
  - sitemap URL
  - source URL exacte

## 1.2 Capturer la source (artefacts obligatoires)
Créer un dossier d’artefacts :
- `reports/case-study-rewrites/<slug-source>/`

Créer ces fichiers obligatoires :
- `source.html` (HTML brut)
- `source-snapshot.json` (extraction structurée)
- `source-snapshot.md` (version lisible traçable)

## 1.3 Snapshot structuré (obligatoire)
Extraire au minimum :
- `title tag`
- `H1`
- intro
- KPIs visibles (hero + blocs KPI)
- détails de campagne (si présents)
- sections principales (titres + paragraphes + listes)
- témoignage(s)
- CTA(s) source (texte + lien)
- assets détectés (bannière, logo, photo(s), autres)
- contenu hors périmètre détecté (cross-promo, discover section, etc.)
- `missingFromSource`
- `ambiguousClaims` (si ambiguïtés)

## 1.4 Règle de vérité source
Tout ce qui est publié doit être :
- soit traçable à la source,
- soit une reformulation fidèle.

Si ambiguïté/incohérence source :
- ne pas inventer de réconciliation,
- choisir la version la plus explicitement détaillée,
- enregistrer l’ambiguïté dans les artefacts internes (`ambiguousClaims`),
- ne pas exposer ce débat sur la page publique.

---

# PHASE 2 — REWRITE (SEO / GEO SANS HALLUCINATION)

## 2.1 Mission de réécriture
Réécrire pour qu’un décideur B2B comprenne rapidement :
- qui est le client,
- quel était le défi,
- ce que devlo a mis en place,
- quels résultats ont été obtenus,
- pourquoi la campagne a fonctionné (si soutenu par la source),
- quelle action prendre ensuite.

## 2.2 Règles SEO / GEO
- Garder les faits exacts
- Reformuler pour plus de clarté, autorité, lisibilité
- Garder une hiérarchie H1/H2/H3 explicite
- Ajouter vocabulaire SEO/GEO pertinent **sans bourrage**
- Favoriser formulations compréhensibles par humains + LLM
- Fusionner les répétitions si utile
- Ne pas appauvrir le contenu source

## 2.3 Structure de contenu publique minimum (template logique)
Rendre ces sections (si présentes dans la source) dans un format homogène :

### Priorité A — visibles (principales)
1. Contexte client
2. Défi / objectif
3. Approche mise en place
4. Résultats de la campagne
5. Pourquoi cette campagne a fonctionné
6. Témoignage client (obligatoire si source présente)
7. Comment obtenir plus de rendez-vous : parlons-en (CTA + HubSpot)

### Priorité B — visibles mais discrètes (support SEO/GEO)
- Détails de campagne
- KPIs / chiffres clés
- ICP (si présent)
- sous-sections utiles (méthode, exécution, qualification, etc.)

### Priorité C — interdites dans le public (audit only)
- framing “source originale”
- notes de validation / intégrité / transparence
- labels d’audit / QA
- commentaires méthodologiques internes

## 2.4 Fichier de réécriture (obligatoire)
Créer :
- `rewrite-fr.md`

Contenu attendu :
- version réécrite prête à publier (FR)
- notes SEO/GEO (brèves)
- `Fact integrity checklist` (interne, pas public)
  - format : `claim publié -> mapping vers source-snapshot.md`

## 2.5 Normalisation FR (obligatoire)
- `%` formaté : `71 %`
- guillemets français : `« »`
- ponctuation FR correcte
- labels homogènes d’une étude à l’autre
- ne pas homogénéiser les performances réelles entre études (chaque cas garde ses chiffres source)

---

# PHASE 3 — ASSETS VISUELS (.WEBP OBLIGATOIRE)

## 3.1 Règle globale image
Toutes les images affichées sur la page publique doivent être en `.webp` :
- bannière,
- logo client,
- photo témoin (si témoignage présent),
- autres visuels de page.

## 3.2 Mapping explicite (jamais au hasard)
Créer un mapping final (`assets-map.json`) avec statut par asset :
- `ok`
- `missing`
- `ambiguous`

Tu dois vérifier explicitement :
- bannière `.webp` = obligatoire
- logo client `.webp` = obligatoire
- photo témoin `.webp` = obligatoire si témoignage présent

## 3.3 Politique stricte de blocage
Si un asset obligatoire `.webp` est :
- manquant, ou
- ambigu (mapping incertain),
alors :
- **publication bloquée**,
- run continue jusqu’au reporting,
- question critique posée en fin de run.

## 3.4 Renommage d’assets (autorisé)
Tu peux renommer pour fiabiliser le process si nécessaire, à condition de :
- garder une nomenclature claire,
- mettre à jour les références,
- documenter le mapping final.

---

# PHASE 4 — PUBLISH (NEXT.JS, TEMPLATE PREMIUM CAREERLUNCH)

## 4.1 Rendu UI/UX (ne pas réinventer)
Réutiliser le template premium CareerLunch (desktop-first) :
- hero premium compact
- sticky subnav
- bloc KPIs premium
- détails de campagne en mini-cards/chips
- sections longues bien espacées
- témoignage premium (photo incluse)
- CTA sticky discret
- CTA final + formulaire HubSpot inline

## 4.2 Slug / route (critique)
- Le slug source doit devenir le slug public canonique :
  - `/etudes-de-cas/<slug-source>`
- Ne jamais corriger orthographiquement un slug (ex : Saporo ≠ Sapporo)
- Les anciens slugs marketing doivent être gérés par redirection 301 (si applicables)

## 4.3 Contenu public propre
Ne jamais afficher en public :
- `Source originale (devlo.ch)`
- `Transparence : Notre méthodologie`
- notes de validation / audit / source

## 4.4 CTA comportement (obligatoire)
Tous les CTA (hero, sticky, fin) :
- pointent vers l’ancre du formulaire HubSpot en bas de la page
- scroll fluide
- aucune navigation vers une autre page

---

# PHASE 5 — VALIDATE (OBLIGATOIRE)

## 5.1 Validation technique
- `npm run build`
- vérifier la route publique de l’étude de cas
- vérifier CTA scroll → HubSpot (aucune navigation)
- vérifier sticky subnav
- vérifier sticky CTA
- vérifier absence de blocs audit/source visibles

## 5.2 Validation contenu (anti-régression)
- pas de réduction appauvrissante du contenu
- pas de suppression de faits utiles
- pas d’ajout de faits non sourcés
- les meilleurs chiffres source sont mis en avant sans déformation

## 5.3 Validation assets
- toutes les images de la page cible sont en `.webp`
- bannière OK
- logo client OK
- photo témoin OK (si témoignage)
- aucune `.jpg/.png` résiduelle sur la page cible (sauf exception explicitement signalée)

## 5.4 Validation UX
- rendu premium desktop-first
- lisibilité forte (long-form propre)
- sticky CTA discret
- témoignage visuellement fort
- CTA final + HubSpot bien visibles

---

# PHASE 6 — DEPLOY PREVIEW VERCEL (OBLIGATOIRE)
À la fin du run :
- déployer une preview Vercel
- fournir :
  - URL preview du site
  - URL preview de la page étude de cas
- attendre validation visuelle utilisateur avant de passer au run suivant

---

## FORMAT DE SORTIE (STRICT, À CHAQUE RUN)
Retourner exactement ces 7 blocs :

### 1) Résumé d’exécution (1 étude de cas)
- slug traité
- URL source devlo.ch
- URL preview Vercel

### 2) PHASE 1 — Retrieval (preuves)
- sitemap utilisé
- URL source trouvée
- fichiers snapshot générés (HTML + JSON + MD)

### 3) PHASE 2 — Rewrite
- ce qui a été restructuré
- ce qui a été gardé tel quel
- ambiguïtés source (interne uniquement)

### 4) PHASE 3 — Assets
- mapping final `.webp`
- assets manquants / renommés / ambiguïtés

### 5) PHASE 4 — Publish
- fichiers modifiés
- sections rendues
- slug confirmé identique à la source

### 6) PHASE 5 — Validate (checklist)
- build ✅/⚠️
- CTA scroll ✅/⚠️
- sticky nav ✅/⚠️
- HubSpot form ✅/⚠️
- `.webp` only ✅/⚠️
- source/audit hidden ✅/⚠️
- preview Vercel ✅ (liens)

### 7) Questions critiques (si nécessaire)
- uniquement les questions indispensables
- + 1 amélioration du prompt/process si problème récurrent détecté

---

## ANTI-HALLUCINATION CHECKLIST (OBLIGATOIRE EN FIN DE RUN)
Confirmer explicitement :
- Je n’ai ajouté aucun chiffre non présent dans la source.
- Je n’ai ajouté aucun témoignage non présent dans la source.
- Je n’ai pas modifié le sens des résultats.
- Je n’ai pas changé le slug source.
- Je n’ai pas laissé de bloc public “source/audit/transparence”.
- Tous les CTA restent sur la page et scrollent vers le formulaire HubSpot.
- Toutes les images de la page cible sont en `.webp` (ou exceptions listées).
- Une preview Vercel a été déployée et partagée.

---

## EXÉCUTION (POINT DE DÉPART OBLIGATOIRE)
Commencer toujours par :
1. identifier l’étude de cas via le sitemap `resultats-sitemap.xml`,
2. extraire le snapshot source,
3. puis seulement réécrire / publier.
