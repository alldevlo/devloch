/**
 * Translates the Cold Email Templates hub page UI text to EN/DE/NL via DeepL.
 * Output: src/lib/i18n/cold-email-hub-content.json
 *
 * Usage: DEEPL_API_KEY=xxx node scripts/translate_cold_email_hub_deepl.mjs
 */

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const deeplKey = process.env.DEEPL_API_KEY;
if (!deeplKey) throw new Error('Missing DEEPL_API_KEY');

const TARGETS = [
  { locale: 'en', deepl: 'EN-GB' },
  { locale: 'de', deepl: 'DE' },
  { locale: 'nl', deepl: 'NL' },
];

const ENDPOINTS = [
  'https://api-free.deepl.com/v2/translate',
  'https://api.deepl.com/v2/translate',
];

/* ------------------------------------------------------------------ */
/*  DeepL helpers                                                      */
/* ------------------------------------------------------------------ */

function shouldSkipString(value) {
  if (!value || typeof value !== 'string') return true;
  const v = value.trim();
  if (!v) return true;
  if (v.startsWith('/')) return true;
  if (/^https?:\/\//i.test(v)) return true;
  if (/\.(webp|png|jpg|jpeg|svg|gif|pdf|mp4|webm)$/i.test(v)) return true;
  if (/^\+?[0-9\s().-]{8,}$/.test(v)) return true;
  if (/^[A-Za-z0-9_-]{2,}$/.test(v) && !/[\s'']/.test(v) && v.length < 18) return true;
  return false;
}

function collectStrings(node, out) {
  if (Array.isArray(node)) {
    for (const item of node) collectStrings(item, out);
    return;
  }
  if (!node || typeof node !== 'object') {
    if (typeof node === 'string' && !shouldSkipString(node)) out.add(node);
    return;
  }
  for (const [, v] of Object.entries(node)) {
    collectStrings(v, out);
  }
}

function applyTranslations(node, map) {
  if (Array.isArray(node)) return node.map((item) => applyTranslations(item, map));
  if (!node || typeof node !== 'object') {
    if (typeof node === 'string' && !shouldSkipString(node)) return map.get(node) || node;
    return node;
  }
  const out = {};
  for (const [k, v] of Object.entries(node)) {
    out[k] = applyTranslations(v, map);
  }
  return out;
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

let totalCharsSent = 0;

async function translateBatch(texts, targetLang, attempt = 0) {
  if (texts.length === 0) return [];
  let lastError = '';
  for (const endpoint of ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `DeepL-Auth-Key ${deeplKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: texts, source_lang: 'FR', target_lang: targetLang, preserve_formatting: true }),
      });
      const raw = await response.text();
      if (!response.ok) { lastError = `${response.status}:${raw.slice(0, 180)}`; continue; }
      const json = JSON.parse(raw);
      const rows = Array.isArray(json?.translations) ? json.translations : [];
      if (rows.length !== texts.length) { lastError = `invalid-count:${rows.length}/${texts.length}`; continue; }
      totalCharsSent += texts.reduce((sum, t) => sum + t.length, 0);
      return rows.map((row) => row?.text || '');
    } catch (err) {
      lastError = String(err.message || err);
      console.warn(`  fetch error on ${endpoint}: ${lastError}`);
    }
  }
  if (attempt < 4) {
    const delay = 1000 * Math.pow(2, attempt);
    console.warn(`  retry ${attempt + 1}/4 in ${delay}ms for ${targetLang}...`);
    await sleep(delay);
    return translateBatch(texts, targetLang, attempt + 1);
  }
  throw new Error(`DeepL translate failed (${targetLang}) ${lastError}`);
}

async function buildBundle(source, label) {
  const strings = new Set();
  collectStrings(source, strings);
  const all = Array.from(strings);
  console.log(`${label}: ${all.length} strings to translate`);

  const result = { fr: source };
  for (const target of TARGETS) {
    const map = new Map();
    const chunkSize = 35;
    for (let i = 0; i < all.length; i += chunkSize) {
      const chunk = all.slice(i, i + chunkSize);
      const translated = await translateBatch(chunk, target.deepl);
      chunk.forEach((src, idx) => map.set(src, translated[idx] || src));
    }
    result[target.locale] = applyTranslations(source, map);
    console.log(`  ${label}: translated ${target.locale}`);
  }
  return result;
}

/* ------------------------------------------------------------------ */
/*  Source content — Cold Email Templates Hub                           */
/* ------------------------------------------------------------------ */

const coldEmailHub = {
  metaTitle: "25 Séquences Cold Email B2B avec Résultats — Templates Gratuits",
  metaDescription: "Templates cold email B2B testés sur 1000+ campagnes. Séquences outreach complètes avec métriques réelles, exemples emails prospection et résultats mesurés.",
  hero: {
    title: "25 Séquences Cold Email B2B avec Résultats",
    subtitle: "Des séquences complètes testées sur plus de 1000 campagnes. Industrie, métriques, emails complets — utilisez-les comme base pour vos propres séquences.",
    authorRole: "Fondateur de",
    dateLabel: "Mars 2026",
  },
  breadcrumbs: {
    home: "Accueil",
    insights: "Insights",
    coldEmailTemplates: "Templates Cold Email",
  },
  browser: {
    title: "25 Séquences Cold Email B2B",
    subtitle: "Inspiration et résultats réels",
    searchPlaceholder: "Rechercher une séquence...",
    industryLabel: "Industrie",
    channelLabel: "Canal",
    allFilter: "Tous",
    emailOnly: "Email seul",
    multichannel: "Multicanal",
    noResults: "Aucune séquence ne correspond à ces filtres. Voici toutes les {count} séquences disponibles :",
    resultsCounter: "{count} séquence{plural} affichée{plural}",
    sequenceOf: "Séquence de",
    sentLabel: "Envoyés",
    openedLabel: "Ouverts",
    repliesLabel: "Réponses",
    interestedLabel: "Intéressés",
    stepsLabel: "étapes",
    daysLabel: "jours",
    targetIcp: "Cible (ICP)",
    abTest: "Test A/B",
    fullSequence: "Séquence complète",
    duration: "Durée",
    viewFullSequence: "Voir la séquence complète",
    subjectLabel: "Objet",
    callLabel: "Appel",
  },
  metrics: {
    titleTemplate: "25 séquences. {touches} étapes. {withResults} avec résultats mesurés.",
    sequences: "séquences",
    totalSteps: "étapes au total",
    avgReplyRate: "taux de réponse moyen",
    industriesCovered: "industries couvertes",
  },
  faq: [
    {
      question: "Qu'est-ce qu'une séquence cold email ?",
      answer: "Une séquence cold email est une série d'emails envoyés automatiquement à des prospects qui ne vous connaissent pas encore. Chaque email de la séquence est espacé dans le temps et conçu pour créer de la valeur, établir la confiance et déclencher une réponse. Les meilleures séquences combinent plusieurs canaux (email, LinkedIn, appel) et s'appuient sur des signaux d'achat pour personnaliser chaque message.",
    },
    {
      question: "Comment personnaliser ces séquences ?",
      answer: "Pour personnaliser efficacement une séquence, commencez par identifier des signaux d'achat concrets : levée de fonds, recrutement, changement de direction, adoption d'une nouvelle technologie. Référencez des événements réels dans vos icebreakers (un post LinkedIn, un article de presse, une participation à un salon). Adaptez la proposition de valeur au contexte spécifique du prospect plutôt que d'envoyer un message générique.",
    },
    {
      question: "Combien d'étapes devrait avoir une séquence ?",
      answer: "Nos données sur 25 séquences montrent une moyenne de 6,9 étapes par séquence, avec une fourchette optimale entre 5 et 9 touches. Les séquences trop courtes (moins de 4 touches) ne laissent pas assez de chances au prospect de répondre, tandis que les séquences trop longues (plus de 10 touches) risquent d'être perçues comme du spam. La durée moyenne est de 25 jours.",
    },
    {
      question: "Ces séquences fonctionnent-elles pour mon industrie ?",
      answer: "Cette collection couvre plus de 15 industries différentes : Cybersecurity, SaaS, RH, Finance, Pharma, Immobilier, Manufacturing, et bien d'autres. Même si votre industrie exacte n'est pas représentée, les structures, les frameworks de personnalisation et les techniques de copywriting sont transférables. L'important est d'adapter le message à votre ICP et à vos signaux d'achat spécifiques.",
    },
  ],
  faqSectionTitle: "Questions fréquentes",
  cta: {
    heading: "Vous voulez des séquences personnalisées pour votre industrie ?",
    body: "devlo conçoit et exécute des campagnes cold email B2B sur-mesure. ICP, signaux d'achat, séquences multichannel — on s'occupe de tout.",
    primaryButton: "Réserver une consultation",
    secondaryButton: "Voir nos services",
  },
  newsletter: {
    title: "Recevez nos insights B2B chaque semaine",
    subtitle: "Stratégies outbound concrètes, automatisation IA et intelligence du marché suisse. Pas de blabla — uniquement ce qui fonctionne.",
    button: "S'abonner",
    placeholder: "votre@email.com",
  },
  lastUpdated: "Dernière mise à jour : mars 2026",
};

/* ------------------------------------------------------------------ */
/*  Run translations                                                   */
/* ------------------------------------------------------------------ */

console.log('\n=== Cold Email Hub ===');
const bundle = await buildBundle(coldEmailHub, 'cold-email-hub');

const outPath = resolve(process.cwd(), 'src/lib/i18n/cold-email-hub-content.json');
writeFileSync(outPath, JSON.stringify(bundle, null, 2));
console.log(`\nWritten: ${outPath}`);
console.log(`Total characters sent to DeepL: ${totalCharsSent.toLocaleString()}`);
console.log('All translations complete.');
