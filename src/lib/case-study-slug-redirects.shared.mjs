export const caseStudySlugRedirects = {
  "careerlunch-54-rendez-vous-dach": "hr-54-rendez-vous-dach",
  "cortexia-71-rendez-vous-decideurs-urbains": "proprete-urbaine-71-rendez-vous",
  "squareco-52-prospects-interesses-biocarburants": "biocarburants-52-rendez-vous",
  "cegos-45-taux-reponse": "formation-14-rendez-vous",
  "lemanvisio-16-rendez-vous-architectes": "audiovisuel-16-rendez-vous",
  "many-ways-70-taux-reponse-merchandising": "merchandising-23-prospects",
  "apidae-70-rendez-vous": "biodiversite-70-rendez-vous",
  "locky-40-entreprises-interessees": "mobilite-40-prospects",
  "hiag-immeuble-commercial-winterthur": "immobilier-11-prospects",
  "horus-200k-contrats-belgique": "logiciel-comptable-200k-ca",
  "abacus-30-prospects-interesses": "immobilier-30-prospects",
  "monizze-120-rendez-vous-qualifies-belgique": "monizze-120-rendez-vous",
  "saporo-180-prospects-cybersecurite": "cybersecurite-4500-entreprises",
};

export function resolveCaseStudyCanonicalSlug(slug) {
  return caseStudySlugRedirects[slug] ?? slug;
}

export function findLegacyCaseStudySlugs(canonicalSlug) {
  return Object.entries(caseStudySlugRedirects)
    .filter(([, destination]) => destination === canonicalSlug)
    .map(([legacy]) => legacy);
}

