#!/usr/bin/env bash
set -euo pipefail

command -v jq >/dev/null 2>&1 || { echo "jq required"; exit 1; }
command -v curl >/dev/null 2>&1 || { echo "curl required"; exit 1; }

BASE_URL="${1:-https://devlo.ch}"
SLUG_MAP="${2:-src/lib/i18n/slug-map.json}"
STAMP="$(date +%Y%m%dT%H%M%S)"
OUT_DIR="docs/i18n_sanity_migration/audit_full_${STAMP}"
RAW_DIR="${OUT_DIR}/raw"
mkdir -p "${RAW_DIR}"

extract_attr() {
  local file="$1"
  local pattern="$2"
  (grep -io "$pattern" "$file" || true) | sed -E 's/.*(href|content)=["'"'"']([^"'"'"']+)["'"'"'].*/\2/i' | head -1
}

extract_hreflang_url() {
  local file="$1"
  local lang="$2"
  (grep -Eio "<link[^>]*hreflang=[\\\"']${lang}[\\\"'][^>]*>" "$file" || true) | sed -E 's/.*href=["'"'"']([^"'"'"']+)["'"'"'].*/\1/i' | head -1
}

sample_paths_for_locale() {
  local locale="$1"
  local required='["home","services","consultation","academy","case-study:monizze-120-rendez-vous"]'
  jq -r --arg locale "$locale" --argjson required "$required" '
    def p($e): $e.value[$locale];
    . as $map |
    ($required
      | map(select($map[.] != null and $map[.][$locale] != null)
        | $map[.][$locale])) as $must |
    ($map
      | to_entries
      | map(select(.value[$locale] != null))
      | map(.value[$locale])) as $all |
    ($must + ($all - $must))
      | .[:7]
      | .[]
  ' "$SLUG_MAP"
}

check_canonical_live() {
  local canonical="$1"
  if [[ -z "$canonical" ]]; then
    echo "FAIL|missing"
    return
  fi
  local code hops
  code="$(curl -sIL --max-time 20 -o /dev/null -w '%{http_code}' "$canonical")"
  hops="$(curl -sIL --max-time 20 -o /dev/null -w '%{num_redirects}' "$canonical")"
  if [[ "$code" == "200" && "$hops" == "0" ]]; then
    echo "PASS|200_no_redirect"
  else
    echo "FAIL|code=${code};hops=${hops}"
  fi
}

is_devlo_absolute_url() {
  local value="$1"
  [[ "$value" =~ ^https://devlo\.ch($|/) ]]
}

{
  echo "# I18N + SEO Full Audit"
  echo
  echo "Base URL: ${BASE_URL}"
  echo "Generated: ${STAMP}"
  echo
  echo "| URL | Status | Canonical 200/no-redirect | OG URL = Canonical | Hreflang set | OG image |"
  echo "|---|---:|---|---|---|---|"
} > "${OUT_DIR}/summary.md"

for locale in fr en de nl; do
  while IFS= read -r path; do
    [[ -z "$path" ]] && continue

    if [[ "$path" == "/" ]]; then
      local_url="${BASE_URL%/}/"
    else
      local_url="${BASE_URL%/}${path}"
    fi
    safe_name="$(echo "${locale}_${path}" | tr '/:?' '___')"
    html_file="${RAW_DIR}/${safe_name}.html"
    meta_file="${RAW_DIR}/${safe_name}.meta.txt"

    status="$(curl -sL --max-time 20 -o "$html_file" -w '%{http_code}' "$local_url")"

    canonical="$(extract_attr "$html_file" '<link[^>]*rel=["'"'"']canonical["'"'"'][^>]*>')"
    og_url="$(extract_attr "$html_file" '<meta[^>]*property=["'"'"']og:url["'"'"'][^>]*>')"
    og_image="$(extract_attr "$html_file" '<meta[^>]*property=["'"'"']og:image["'"'"'][^>]*>')"

    fr_hreflang="$(extract_hreflang_url "$html_file" 'fr')"
    en_hreflang="$(extract_hreflang_url "$html_file" 'en')"
    de_hreflang="$(extract_hreflang_url "$html_file" 'de')"
    nl_hreflang="$(extract_hreflang_url "$html_file" 'nl')"
    xd_hreflang="$(extract_hreflang_url "$html_file" 'x-default')"

    canonical_check="$(check_canonical_live "$canonical")"
    canonical_status="${canonical_check%%|*}"
    canonical_detail="${canonical_check#*|}"

    og_match="FAIL"
    if [[ -n "$canonical" && -n "$og_url" && "$canonical" == "$og_url" ]]; then
      og_match="PASS"
    fi

    hreflang_status="FAIL"
    if [[ -n "$fr_hreflang" && -n "$en_hreflang" && -n "$de_hreflang" && -n "$nl_hreflang" && -n "$xd_hreflang" ]] \
      && is_devlo_absolute_url "$fr_hreflang" \
      && is_devlo_absolute_url "$en_hreflang" \
      && is_devlo_absolute_url "$de_hreflang" \
      && is_devlo_absolute_url "$nl_hreflang" \
      && is_devlo_absolute_url "$xd_hreflang"; then
      hreflang_status="PASS"
    fi

    og_image_status="FAIL"
    og_image_code="-"
    if [[ -n "$og_image" ]]; then
      og_image_code="$(curl -sIL --max-time 20 -o /dev/null -w '%{http_code}' "$og_image")"
      if [[ "$og_image_code" == "200" ]]; then
        og_image_status="PASS"
      fi
    fi

    {
      echo "url=${local_url}"
      echo "status=${status}"
      echo "canonical=${canonical:-MISSING}"
      echo "canonical_check=${canonical_status}:${canonical_detail}"
      echo "og_url=${og_url:-MISSING}"
      echo "og_image=${og_image:-MISSING}"
      echo "og_image_status=${og_image_status}:${og_image_code}"
      echo "hreflang.fr=${fr_hreflang:-MISSING}"
      echo "hreflang.en=${en_hreflang:-MISSING}"
      echo "hreflang.de=${de_hreflang:-MISSING}"
      echo "hreflang.nl=${nl_hreflang:-MISSING}"
      echo "hreflang.x-default=${xd_hreflang:-MISSING}"
    } > "$meta_file"

    echo "| ${local_url} | ${status} | ${canonical_status} (${canonical_detail}) | ${og_match} | ${hreflang_status} | ${og_image_status} (${og_image_code}) |" >> "${OUT_DIR}/summary.md"
  done < <(sample_paths_for_locale "$locale")
done

SITEMAP_URL="https://devlo.ch/sitemap.xml"
ROBOTS_URL="https://devlo.ch/robots.txt"

curl -sI --max-time 20 "$SITEMAP_URL" > "${RAW_DIR}/sitemap_headers.txt"
curl -sL --max-time 20 "$SITEMAP_URL" > "${RAW_DIR}/sitemap.xml"

if grep -qi "<sitemapindex" "${RAW_DIR}/sitemap.xml"; then
  : > "${RAW_DIR}/sitemap_all.xml"
  while IFS= read -r child; do
    [[ -z "$child" ]] && continue
    curl -sL --max-time 20 "$child" >> "${RAW_DIR}/sitemap_all.xml"
  done < <(grep -Eo '<loc>[^<]+' "${RAW_DIR}/sitemap.xml" | sed 's/<loc>//g')
else
  cp "${RAW_DIR}/sitemap.xml" "${RAW_DIR}/sitemap_all.xml"
fi

loc_count="$({ grep -Eo '<loc>[^<]+' "${RAW_DIR}/sitemap_all.xml" || true; } | wc -l | tr -d ' ')"
non_devlo_count="$({ grep -Eo '<loc>[^<]+' "${RAW_DIR}/sitemap_all.xml" || true; } | sed 's/<loc>//g' | { grep -Ev '^https://devlo\.ch/' || true; } | wc -l | tr -d ' ')"
legacy_count="$({ grep -Eo '<loc>[^<]+' "${RAW_DIR}/sitemap_all.xml" || true; } | { grep -c '/resultats/' || true; })"
devlo_agency_count="$(grep -c 'devlo-agency' "${RAW_DIR}/sitemap_all.xml" || true)"
en_count="$({ grep -Eo '<loc>[^<]+' "${RAW_DIR}/sitemap_all.xml" || true; } | { grep -c 'https://devlo.ch/en/' || true; })"
de_count="$({ grep -Eo '<loc>[^<]+' "${RAW_DIR}/sitemap_all.xml" || true; } | { grep -c 'https://devlo.ch/de/' || true; })"
nl_count="$({ grep -Eo '<loc>[^<]+' "${RAW_DIR}/sitemap_all.xml" || true; } | { grep -c 'https://devlo.ch/nl/' || true; })"

curl -sI --max-time 20 "$ROBOTS_URL" > "${RAW_DIR}/robots_headers.txt"
curl -sL --max-time 20 "$ROBOTS_URL" > "${RAW_DIR}/robots.txt"

robots_status="$(awk 'NR==1 {print $2}' "${RAW_DIR}/robots_headers.txt")"
robots_sitemap_exact="FAIL"
if grep -q '^Sitemap: https://devlo.ch/sitemap.xml$' "${RAW_DIR}/robots.txt"; then
  robots_sitemap_exact="PASS"
fi

{
  echo
  echo "## Sitemap checks"
  echo "- URL: ${SITEMAP_URL}"
  echo "- HTTP status: $(awk 'NR==1 {print $2}' "${RAW_DIR}/sitemap_headers.txt")"
  echo "- loc entries: ${loc_count}"
  echo "- non-devlo.ch loc entries: ${non_devlo_count}"
  echo "- /resultats/ loc entries: ${legacy_count}"
  echo "- devlo-agency references: ${devlo_agency_count}"
  echo "- /en entries: ${en_count}"
  echo "- /de entries: ${de_count}"
  echo "- /nl entries: ${nl_count}"
  echo
  echo "## Robots checks"
  echo "- URL: ${ROBOTS_URL}"
  echo "- HTTP status: ${robots_status}"
  echo "- Exact sitemap line: ${robots_sitemap_exact}"
} >> "${OUT_DIR}/summary.md"

echo "Audit written to ${OUT_DIR}"
