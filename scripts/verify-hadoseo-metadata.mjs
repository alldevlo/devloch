import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const mappingPath = path.join(repoRoot, "src/content/hadoseo-metadata.ts");
const reportPath = path.join(repoRoot, "docs/hadoseo-metadata-parity.csv");

const sourcePath =
  process.argv[2] ??
  ["/mnt/data/file.txt", "/Users/charlesperret/Downloads/file.txt"].find((candidate) =>
    fs.existsSync(candidate),
  );

if (!sourcePath || !fs.existsSync(sourcePath)) {
  console.error("HadoSEO source file not found. Pass a path as first argument.");
  process.exit(1);
}

function parseSimpleCsvLine(line) {
  const columns = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === "\"") {
      if (inQuotes && line[i + 1] === "\"") {
        current += "\"";
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (char === "," && !inQuotes) {
      columns.push(current);
      current = "";
      continue;
    }
    current += char;
  }

  columns.push(current);
  return columns;
}

function parseTargetMetadata(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/);
  const headerIndex = lines.findIndex((line) =>
    line.trim().startsWith("route,title,description,canonical,og_image,status"),
  );

  if (headerIndex === -1) {
    throw new Error(`CSV header not found in ${filePath}`);
  }

  const rows = [];
  for (let i = headerIndex + 1; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line || line.startsWith("```")) break;
    const [route, title, description, canonical, ogImage, status] = parseSimpleCsvLine(line);
    rows.push({ route, title, description, canonical, ogImage, status });
  }

  return rows;
}

function parseMappingMetadata(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const blockPattern =
    /\{\s*route:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*canonical:\s*"([^"]+)",\s*ogImage:\s*"([^"]+)",\s*status:\s*"([^"]+)",\s*\}/g;
  const rows = [];
  let match;

  while ((match = blockPattern.exec(raw)) !== null) {
    const [, route, title, description, canonical, ogImage, status] = match;
    rows.push({ route, title, description, canonical, ogImage, status });
  }

  return rows;
}

function csvEscape(value) {
  const stringValue = value == null ? "" : String(value);
  if (/["\n,]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, "\"\"")}"`;
  }
  return stringValue;
}

const targetRows = parseTargetMetadata(sourcePath);
const mappingRows = parseMappingMetadata(mappingPath);

const targetByRoute = new Map(targetRows.map((row) => [row.route, row]));
const mappingByRoute = new Map(mappingRows.map((row) => [row.route, row]));

const reportRows = [];
let mismatchCount = 0;

const allRoutes = new Set([...targetByRoute.keys(), ...mappingByRoute.keys()]);
for (const route of [...allRoutes].sort()) {
  const target = targetByRoute.get(route);
  const current = mappingByRoute.get(route);

  if (!target) {
    mismatchCount += 1;
    reportRows.push({
      route,
      field: "route",
      target: "MISSING_IN_TARGET",
      current: "PRESENT_IN_MAPPING",
      status: "MISMATCH",
    });
    continue;
  }

  if (!current) {
    mismatchCount += 1;
    reportRows.push({
      route,
      field: "route",
      target: "PRESENT_IN_TARGET",
      current: "MISSING_IN_MAPPING",
      status: "MISMATCH",
    });
    continue;
  }

  for (const field of ["title", "description", "canonical", "ogImage", "status"]) {
    const targetField = field === "ogImage" ? "ogImage" : field;
    const targetValue = target[targetField];
    const currentValue = current[field];
    const status = targetValue === currentValue ? "OK" : "MISMATCH";
    if (status === "MISMATCH") mismatchCount += 1;

    reportRows.push({
      route,
      field,
      target: targetValue,
      current: currentValue,
      status,
    });
  }
}

const headers = ["route", "field", "target", "current", "status"];
const csvContent = [
  headers.join(","),
  ...reportRows.map((row) =>
    headers.map((header) => csvEscape(row[header])).join(","),
  ),
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, csvContent, "utf8");

if (mismatchCount > 0) {
  console.error(
    `HadoSEO parity check failed with ${mismatchCount} mismatch(es). Report: ${reportPath}`,
  );
  process.exit(1);
}

console.log(`HadoSEO parity check passed (${targetRows.length} routes). Report: ${reportPath}`);
