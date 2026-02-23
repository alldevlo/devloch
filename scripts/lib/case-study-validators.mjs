import { load } from "cheerio";

import {
  getCaseStudyArtifactPaths,
  writeJsonArtifact,
} from "./case-study-reporters.mjs";

const FORBIDDEN_PUBLIC_TEXT = [
  "Source originale",
  "Resultats verifiables dans la source",
  "Résultats vérifiables dans la source",
  "Transparence : Notre méthodologie",
  "Note d’integrite",
  "Note d'intégrité",
  "Audit",
];

function clean(value = "") {
  return String(value)
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalize(value = "") {
  return clean(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizeRoute(route = "") {
  if (!route) return "/";
  if (!route.startsWith("/")) return `/${route}`;
  return route;
}

function joinUrl(baseUrl, route) {
  return new URL(normalizeRoute(route), baseUrl).toString();
}

async function fetchHtml(url) {
  const response = await fetch(url, { redirect: "follow" });
  const html = await response.text();
  return { response, html };
}

async function fetchRedirect(url) {
  const response = await fetch(url, { redirect: "manual" });
  return response;
}

function decodeNextImageUrl(src, pageUrl) {
  try {
    const url = new URL(src, pageUrl);
    if (!url.pathname.includes("/_next/image")) return "";
    const raw = url.searchParams.get("url") || "";
    if (!raw) return "";
    return decodeURIComponent(raw);
  } catch {
    return "";
  }
}

function extractPathname(value, pageUrl) {
  if (!value) return "";
  if (value.startsWith("data:")) return "";
  try {
    return new URL(value, pageUrl).pathname;
  } catch {
    return "";
  }
}

function assetExtFromImgSrc(src, pageUrl) {
  const nextDecoded = decodeNextImageUrl(src, pageUrl);
  const pathname = extractPathname(nextDecoded || src, pageUrl);
  if (!pathname) return "";
  const match = pathname.match(/\.([a-z0-9]+)$/i);
  return match ? `.${match[1].toLowerCase()}` : "";
}

function isRasterExt(ext) {
  return [".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"].includes(ext);
}

function isAllowedRasterExt(ext) {
  return [".webp", ".avif"].includes(ext);
}

function deriveSourceSlugFromRoute(route) {
  const normalized = normalizeRoute(route).replace(/\/+$/g, "");
  const parts = normalized.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
}

function buildChecks() {
  return {
    build: "warn",
    ctaScrollToHubspot: "fail",
    stickySubnav: "fail",
    stickyCta: "fail",
    hubspotPresent: "fail",
    sourceAuditBlocksHidden: "fail",
    webpOnlyImagesOnPage: "fail",
    previewVercelDeployed: "warn",
    routePublicOk: "fail",
    h1Visible: "fail",
    legacyRedirectCanonical: "warn",
  };
}

function toPassFail(value) {
  return value ? "pass" : "fail";
}

function toValidationStatus(checks, blockers) {
  if (blockers.length) return "blocked";
  const criticalFail = [
    "ctaScrollToHubspot",
    "stickySubnav",
    "stickyCta",
    "hubspotPresent",
    "sourceAuditBlocksHidden",
    "webpOnlyImagesOnPage",
    "routePublicOk",
    "h1Visible",
  ].some((key) => checks[key] === "fail");
  return criticalFail ? "fail" : "pass";
}

export async function validateCaseStudyPage({
  baseUrl,
  route,
  sourceSlug = "",
  legacyRoute = "",
  previewSiteUrl = "",
  previewPageUrl = "",
  runBuild = false,
  buildStatus = "warn",
}) {
  if (!baseUrl) {
    throw new Error("validateCaseStudyPage requires baseUrl");
  }
  if (!route) {
    throw new Error("validateCaseStudyPage requires route");
  }

  const pageUrl = joinUrl(baseUrl, route);
  const resolvedSourceSlug = sourceSlug || deriveSourceSlugFromRoute(route);
  const artifactPaths = getCaseStudyArtifactPaths(resolvedSourceSlug);
  const checks = buildChecks();
  checks.build = runBuild ? buildStatus : "warn";
  const blockers = [];
  const evidence = {
    pageUrl,
    route: normalizeRoute(route),
    sourceSlug: resolvedSourceSlug,
    ctaHrefs: [],
    forbiddenMatches: [],
    imageRasterOffenders: [],
    imageRasterAllowed: [],
    legacyRedirect: {},
    previewSiteUrl,
    previewPageUrl,
  };

  const { response, html } = await fetchHtml(pageUrl);
  checks.routePublicOk = response.ok ? "pass" : "fail";
  evidence.pageHttpStatus = response.status;
  evidence.pageHttpFinalUrl = response.url;

  if (!response.ok) {
    blockers.push(`PAGE_HTTP_${response.status}`);
  }

  const $ = load(html);
  const bodyText = clean($("body").text());

  const h1 = clean($("h1").first().text());
  checks.h1Visible = toPassFail(Boolean(h1));
  evidence.h1 = h1;
  if (!h1) blockers.push("H1_MISSING");

  const contactForm = $("#contact-form").first();
  checks.hubspotPresent = toPassFail(contactForm.length > 0);
  evidence.contactFormPresent = contactForm.length > 0;
  if (!contactForm.length) blockers.push("HUBSPOT_CONTACT_FORM_MISSING");

  const ctaLinks = $("a[data-case-study-cta]")
    .toArray()
    .map((el) => ({
      href: clean($(el).attr("href") || ""),
      label: clean($(el).text()),
      variant: clean($(el).attr("data-case-study-cta-variant") || ""),
    }));
  evidence.ctaHrefs = ctaLinks;
  const ctaValid = ctaLinks.length > 0 && ctaLinks.every((cta) => cta.href === "#contact-form");
  checks.ctaScrollToHubspot = toPassFail(ctaValid);
  if (!ctaValid) blockers.push("CTA_NOT_INTRA_PAGE_CONTACT_FORM");

  const stickySubnav = $("[data-case-study-sticky-subnav]").first();
  const stickySubnavLinks = stickySubnav.find("a[href^='#']").length;
  evidence.stickySubnavLinks = stickySubnavLinks;
  checks.stickySubnav = toPassFail(stickySubnav.length > 0 && stickySubnavLinks > 0);
  if (checks.stickySubnav === "fail") blockers.push("STICKY_SUBNAV_MISSING_OR_EMPTY");

  const stickyCta = $("a[data-case-study-cta][data-case-study-cta-variant='sidebar']").first();
  checks.stickyCta = toPassFail(stickyCta.length > 0 && clean(stickyCta.attr("href") || "") === "#contact-form");
  if (checks.stickyCta === "fail") blockers.push("STICKY_CTA_INVALID");

  const forbiddenMatches = FORBIDDEN_PUBLIC_TEXT.filter((value) => normalize(bodyText).includes(normalize(value)));
  evidence.forbiddenMatches = forbiddenMatches;
  checks.sourceAuditBlocksHidden = toPassFail(forbiddenMatches.length === 0);
  if (forbiddenMatches.length) blockers.push("FORBIDDEN_SOURCE_AUDIT_TEXT_VISIBLE");

  const imageAudit = [];
  const rasterOffenders = [];
  const rasterAllowed = [];

  $("img").each((_, el) => {
    const src = clean($(el).attr("src") || "");
    if (!src) return;
    const ext = assetExtFromImgSrc(src, pageUrl);
    if (!ext || !isRasterExt(ext)) {
      imageAudit.push({ src, ext, kind: "ignored" });
      return;
    }
    const target = { src, ext };
    if (isAllowedRasterExt(ext)) {
      rasterAllowed.push(target);
    } else {
      rasterOffenders.push(target);
    }
  });

  evidence.imageRasterAllowed = rasterAllowed;
  evidence.imageRasterOffenders = rasterOffenders;
  checks.webpOnlyImagesOnPage = rasterOffenders.length ? "fail" : "pass";
  if (rasterOffenders.length) blockers.push("NON_WEBP_RASTER_IMAGE_DETECTED");

  if (legacyRoute) {
    const legacyUrl = joinUrl(baseUrl, legacyRoute);
    const redirectResponse = await fetchRedirect(legacyUrl);
    const location = redirectResponse.headers.get("location") || "";
    evidence.legacyRedirect = {
      route: normalizeRoute(legacyRoute),
      status: redirectResponse.status,
      location,
    };

    const expectedPath = normalizeRoute(route);
    const redirectedToExpected =
      (redirectResponse.status === 301 || redirectResponse.status === 308) &&
      (location === expectedPath || location.endsWith(expectedPath));

    checks.legacyRedirectCanonical = redirectedToExpected ? "pass" : "fail";
    if (!redirectedToExpected) blockers.push("LEGACY_REDIRECT_MISMATCH");
  }

  if (previewSiteUrl || previewPageUrl) {
    checks.previewVercelDeployed = "pass";
  }

  const payload = {
    sourceSlug: resolvedSourceSlug,
    route: normalizeRoute(route),
    checks,
    evidence,
    blockers: [...new Set(blockers)],
    status: toValidationStatus(checks, [...new Set(blockers)]),
    generatedAt: new Date().toISOString(),
  };

  if (resolvedSourceSlug) {
    await writeJsonArtifact(artifactPaths.validation, payload);
  }

  return {
    ...payload,
    artifactPath: resolvedSourceSlug ? artifactPaths.validation : "",
  };
}

