import fs from "node:fs/promises";
import path from "node:path";

import {
  getCaseStudyArtifactPaths,
  getRepoRoot,
  readJsonArtifact,
  writeJsonArtifact,
} from "./case-study-reporters.mjs";

const REPO_ROOT = getRepoRoot();
const PUBLIC_ROOT = path.join(REPO_ROOT, "public");
const CASE_STUDIES_DATA_PATH = path.join(REPO_ROOT, "src", "lib", "case-studies.data.json");

function normalize(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

function publicUrlToFilePath(publicUrl = "") {
  if (!publicUrl || !publicUrl.startsWith("/")) return "";
  return path.join(PUBLIC_ROOT, publicUrl.replace(/^\//, ""));
}

async function exists(filePath) {
  if (!filePath) return false;
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function loadCaseStudiesData() {
  const raw = await fs.readFile(CASE_STUDIES_DATA_PATH, "utf8");
  return JSON.parse(raw);
}

function findDataEntryBySourceSlug(caseStudies, sourceSlug) {
  return (
    caseStudies.find((entry) => entry.slug === sourceSlug) ||
    caseStudies.find((entry) => typeof entry.sourceUrl === "string" && entry.sourceUrl.endsWith(`/resultats/${sourceSlug}/`)) ||
    null
  );
}

async function mapRequiredAsset({ required, preferredPublicUrl, fallbackPublicUrls = [] }) {
  if (!required) {
    return {
      required: false,
      status: "ok",
      sourceUrl: "",
      localWebpPath: "",
      tried: [],
    };
  }

  const candidates = [preferredPublicUrl, ...fallbackPublicUrls].filter(Boolean);
  const tried = [];

  for (const candidate of candidates) {
    const filePath = publicUrlToFilePath(candidate);
    if (!filePath) continue;
    tried.push(candidate);
    if (!(await exists(filePath))) continue;
    const ext = path.extname(candidate).toLowerCase();
    if (ext === ".webp" || ext === ".avif") {
      return {
        required: true,
        status: "ok",
        localWebpPath: candidate,
        sourceUrl: "",
        tried,
      };
    }
  }

  return {
    required: true,
    status: candidates.length > 1 ? "ambiguous" : "missing",
    localWebpPath: "",
    sourceUrl: "",
    tried,
  };
}

async function findWebpByNameHints(nameHints = []) {
  const entries = await fs.readdir(PUBLIC_ROOT, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile()).map((e) => e.name);
  const normalizedHints = nameHints.map(normalize).filter(Boolean);
  if (!normalizedHints.length) return [];

  return files
    .filter((file) => [".webp", ".avif"].includes(path.extname(file).toLowerCase()))
    .map((file) => ({ file, normalized: normalize(path.basename(file, path.extname(file))) }))
    .filter((item) => normalizedHints.some((hint) => item.normalized.includes(hint)))
    .map((item) => `/${item.file}`);
}

export async function auditCaseStudyAssets({ sourceSlug }) {
  const artifactPaths = getCaseStudyArtifactPaths(sourceSlug);
  const snapshot = await readJsonArtifact(artifactPaths.sourceSnapshotJson);
  const caseStudies = await loadCaseStudiesData();
  const entry = findDataEntryBySourceSlug(caseStudies, sourceSlug);

  const testimonialRequired = snapshot?.page?.testimonials?.length > 0;
  const heroPreferred = `/images/case-studies/heroes/${sourceSlug}-hero.webp`;
  const logoPreferred = `/images/case-studies/logos/${sourceSlug}-logo.webp`;

  const hero = await mapRequiredAsset({
    required: true,
    preferredPublicUrl: heroPreferred,
    fallbackPublicUrls: [entry?.heroImageUrl].filter(Boolean),
  });

  const logo = await mapRequiredAsset({
    required: true,
    preferredPublicUrl: logoPreferred,
    fallbackPublicUrls: [entry?.clientLogoUrl].filter(Boolean),
  });

  const testimonialNameHints = [];
  if (entry?.testimonialPhotoAlt) testimonialNameHints.push(entry.testimonialPhotoAlt);
  if (snapshot?.page?.testimonials?.[0]?.author) testimonialNameHints.push(snapshot.page.testimonials[0].author);
  if (entry?.client) testimonialNameHints.push(entry.client);
  const testimonialCandidates = [
    entry?.testimonialPhotoUrl,
    `/images/case-studies/testimonials/${sourceSlug}-testimonial.webp`,
    ...(await findWebpByNameHints(testimonialNameHints)),
  ].filter(Boolean);

  const testimonialPhoto = await mapRequiredAsset({
    required: testimonialRequired,
    preferredPublicUrl: testimonialCandidates[0] || "",
    fallbackPublicUrls: testimonialCandidates.slice(1),
  });

  const extras = [];
  for (const extraPublicUrl of ["/images/devlo_Logo_Name.webp", "/images/service_badge_lemlist-1024x443.webp"]) {
    extras.push({
      sourceUrl: "",
      localWebpPath: (await exists(publicUrlToFilePath(extraPublicUrl))) ? extraPublicUrl : "",
      status: (await exists(publicUrlToFilePath(extraPublicUrl))) ? "ok" : "missing",
    });
  }

  const blockers = [];
  for (const [label, asset] of [
    ["hero", hero],
    ["logo", logo],
    ["testimonialPhoto", testimonialPhoto],
  ]) {
    if (asset.required && asset.status !== "ok") {
      blockers.push(`ASSET_${label.toUpperCase()}_${asset.status.toUpperCase()}`);
    }
  }

  const payload = {
    sourceSlug,
    hero: {
      required: true,
      sourceUrl: snapshot?.page?.assets?.heroImages?.[0] || "",
      localWebpPath: hero.localWebpPath || "",
      status: hero.status,
      tried: hero.tried,
    },
    logo: {
      required: true,
      sourceUrl: snapshot?.page?.assets?.clientLogos?.[0] || "",
      localWebpPath: logo.localWebpPath || "",
      status: logo.status,
      tried: logo.tried,
    },
    testimonialPhoto: {
      required: testimonialRequired,
      sourceUrl: snapshot?.page?.assets?.profilePhotos?.[0] || "",
      localWebpPath: testimonialPhoto.localWebpPath || "",
      status: testimonialPhoto.status,
      tried: testimonialPhoto.tried,
    },
    extras,
    renamed: [],
    status: blockers.length ? "blocked" : "pass",
    blockers,
    evidence: {
      dataEntrySlug: entry?.slug || "",
      dataEntryClient: entry?.client || "",
      sourceTestimonialsCount: snapshot?.page?.testimonials?.length || 0,
    },
    generatedAt: new Date().toISOString(),
  };

  await writeJsonArtifact(artifactPaths.assetsMap, payload);
  return { ...payload, artifactPath: artifactPaths.assetsMap };
}

