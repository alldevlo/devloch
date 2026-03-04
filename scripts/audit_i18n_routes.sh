#!/usr/bin/env bash
set -euo pipefail

command -v jq >/dev/null 2>&1 || { echo "jq is required"; exit 1; }
command -v curl >/dev/null 2>&1 || { echo "curl is required"; exit 1; }

BASE_URL="${1:-https://devlo.ch}"
SLUG_MAP="${2:-src/lib/i18n/slug-map.json}"
STAMP="$(date +%Y%m%dT%H%M%S)"
OUT_DIR="docs/i18n_sanity_migration/phase5_audit_${STAMP}"
mkdir -p "$OUT_DIR/raw"

pick_path() {
  local locale="$1"
  jq -r --arg locale "$locale" '
    to_entries
    | map(select(.value[$locale] != null))
    | .[:6]
    | .[].value[$locale]
  ' "$SLUG_MAP"
}

extract_meta() {
  local html_file="$1"
  local canonical og_url
  canonical="$(grep -io '<link[^>]*rel=["'"'"']canonical["'"'"'][^>]*>' "$html_file" | sed -E 's/.*href=["'"'"']([^"'"'"']+)["'"'"'].*/\1/i' | head -1)"
  og_url="$(grep -io '<meta[^>]*property=["'"'"']og:url["'"'"'][^>]*>' "$html_file" | sed -E 's/.*content=["'"'"']([^"'"'"']+)["'"'"'].*/\1/i' | head -1)"
  local hreflangs
  hreflangs="$(grep -Eio '<link[^>]*(hreflang|hrefLang)=["'"'"'][^"'"'"']+["'"'"'][^>]*>' "$html_file" || true)"

  {
    echo "canonical: ${canonical:-MISSING}"
    echo "og:url: ${og_url:-MISSING}"
    echo "hreflang:"
    if [[ -n "$hreflangs" ]]; then
      echo "$hreflangs"
    else
      echo "MISSING"
    fi
  }
}

{
  echo "| URL | Status | Canonical=OG | Hreflang fr/en/de/nl/x-default |"
  echo "|---|---:|---|---|"
} > "$OUT_DIR/summary.md"

for locale in fr en de nl; do
  while IFS= read -r path; do
    [[ -z "$path" ]] && continue
    url="${BASE_URL}${path}"
    safe="$(echo "$locale${path}" | tr '/:' '__')"
    html_file="$OUT_DIR/raw/${safe}.html"
    meta_file="$OUT_DIR/raw/${safe}.meta.txt"

    status="$(curl -sI "$url" | awk 'NR==1 {print $2}')"
    curl -sL "$url" > "$html_file"
    extract_meta "$html_file" > "$meta_file"

    canonical="$(grep '^canonical:' "$meta_file" | cut -d' ' -f2-)"
    og_url="$(grep '^og:url:' "$meta_file" | cut -d' ' -f2-)"

    canonical_og_status="FAIL"
    if [[ "$canonical" != "MISSING" && "$canonical" == "$og_url" ]]; then
      canonical_og_status="PASS"
    fi

    hreflang_ok="FAIL"
    if grep -Eqi 'href[Ll]ang=["'"'"']fr["'"'"']' "$meta_file" \
      && grep -Eqi 'href[Ll]ang=["'"'"']en["'"'"']' "$meta_file" \
      && grep -Eqi 'href[Ll]ang=["'"'"']de["'"'"']' "$meta_file" \
      && grep -Eqi 'href[Ll]ang=["'"'"']nl["'"'"']' "$meta_file" \
      && grep -Eqi 'href[Ll]ang=["'"'"']x-default["'"'"']' "$meta_file"; then
      hreflang_ok="PASS"
    fi

    echo "| ${url} | ${status} | ${canonical_og_status} | ${hreflang_ok} |" >> "$OUT_DIR/summary.md"
  done < <(pick_path "$locale")
done

echo "Audit written to $OUT_DIR"
