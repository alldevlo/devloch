import {
  caseStudySlugRedirects as caseStudySlugRedirectsShared,
  findLegacyCaseStudySlugs as findLegacyCaseStudySlugsShared,
  resolveCaseStudyCanonicalSlug as resolveCaseStudyCanonicalSlugShared,
} from "./case-study-slug-redirects.shared.mjs";

export const caseStudySlugRedirects: Record<string, string> = caseStudySlugRedirectsShared;

export function resolveCaseStudyCanonicalSlug(slug: string): string {
  return resolveCaseStudyCanonicalSlugShared(slug);
}

export function findLegacyCaseStudySlugs(canonicalSlug: string): string[] {
  return findLegacyCaseStudySlugsShared(canonicalSlug);
}
