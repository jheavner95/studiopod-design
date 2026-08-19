#!/usr/bin/env node
/**
 * CLI: prove the just-published package is really installable, from OUTSIDE
 * this repository.
 *
 *   node scripts/release/verify-published.mjs --name @jheavner95/design \
 *        --version 0.13.0 --tarball /tmp/ds-pack/studiopod-design-0.13.0.tgz
 *
 * Runs in a temp directory outside the workspace, installs the package from the
 * registry as a real consumer would, and checks:
 *
 *   - the install succeeds from the intended registry
 *   - the installed manifest reports the expected name and version
 *   - every declared export subpath resolves
 *   - type declarations are present
 *   - the CSS entry resolves and is non-empty
 *   - the expected built files are present
 *   - the OLD package was not pulled in transitively
 *   - no unexpected runtime dependency appeared
 *   - installed file hashes match the locally packed tarball
 *
 * Subpaths are checked with `import.meta.resolve`, which performs full
 * export-map resolution WITHOUT executing the module — so the `react`/`next`
 * peers never need installing, exactly as check-package-identity.mjs does.
 *
 * This is the gate between publishing and tagging. If it fails, the workflow
 * must not tag or release: a tag pointing at a publish nobody could install is
 * worse than no tag.
 */

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";

function arg(flag, fallback) {
  const index = process.argv.indexOf(flag);
  const value = index === -1 ? undefined : process.argv[index + 1];
  return value && !value.startsWith("--") ? value : fallback;
}

const name = arg("--name", "@jheavner95/design");
const version = arg("--version");
const registry = arg("--registry", process.env.DS_REGISTRY || "https://npm.pkg.github.com");
const localTarball = arg("--tarball");
/** Both prior identities — see check-package-identity.mjs for why there are two. */
const OLD_NAMES = ["@studiopod/design-system", "@studiopod/design"];

if (!version) {
  console.error("::error::--version is required");
  process.exit(1);
}

const problems = [];
const ok = [];
const scratch = mkdtempSync(join(tmpdir(), "ds-consumer-"));

const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");

function walk(dir, base = dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, out);
    else if (entry.isFile()) out.push(relative(base, full));
  }
  return out;
}

try {
  // ── A clean consumer, entirely outside the repository ─────────────────────
  writeFileSync(
    join(scratch, "package.json"),
    JSON.stringify({ name: "ds-clean-consumer", version: "1.0.0", type: "module", private: true }, null, 2),
  );
  writeFileSync(join(scratch, ".npmrc"), `@jheavner95:registry=${registry}\n`);

  console.log(`installing ${name}@${version} from ${registry} …`);
  execFileSync(
    "npm",
    ["install", `${name}@${version}`, "--no-audit", "--no-fund", "--omit=dev", "--legacy-peer-deps"],
    { cwd: scratch, stdio: ["ignore", "pipe", "pipe"], encoding: "utf8" },
  );
  ok.push(`installed ${name}@${version} from ${registry}`);

  // ── Installed manifest ────────────────────────────────────────────────────
  const installedRoot = join(scratch, "node_modules", name);
  if (!existsSync(installedRoot)) throw new Error(`${name} is not present in node_modules after install`);

  const installed = JSON.parse(readFileSync(join(installedRoot, "package.json"), "utf8"));
  if (installed.name !== name) problems.push(`installed manifest name is "${installed.name}", expected "${name}"`);
  else ok.push(`installed manifest name: ${installed.name}`);
  if (installed.version !== version) problems.push(`installed manifest version is "${installed.version}", expected "${version}"`);
  else ok.push(`installed manifest version: ${installed.version}`);

  // ── Neither prior package may have come along ─────────────────────────────
  for (const oldName of OLD_NAMES) {
    if (existsSync(join(scratch, "node_modules", oldName))) {
      problems.push(`${oldName} was installed transitively — it must not be a dependency`);
    } else {
      ok.push(`${oldName} not installed transitively`);
    }
  }

  // ── No unexpected runtime dependency ──────────────────────────────────────
  const declaredDeps = Object.keys(installed.dependencies ?? {});
  ok.push(`runtime dependencies: ${declaredDeps.length ? declaredDeps.join(", ") : "none"}`);
  // The new scope is @jheavner95, shared with Foundation — but Foundation is
  // a devDependency of THIS repo's build, never a runtime dependency of the
  // published package (see docs/decisions/0008-foundation-is-a-build-time-input.md),
  // so nothing besides `design` itself should ever appear here.
  const scopedExtras = existsSync(join(scratch, "node_modules", "@jheavner95"))
    ? readdirSync(join(scratch, "node_modules", "@jheavner95")).filter(
        (d) => `@jheavner95/${d}` !== name,
      )
    : [];
  if (scopedExtras.length > 0) {
    problems.push(`unexpected @jheavner95 package(s) installed: ${scopedExtras.join(", ")}`);
  } else {
    ok.push("no unexpected @jheavner95 package installed alongside it");
  }

  // ── Export subpaths, types, CSS ───────────────────────────────────────────
  const subpaths = Object.keys(installed.exports ?? {}).filter((s) => !s.includes("*"));
  const probe = `
    const out = {};
    for (const sub of ${JSON.stringify(subpaths)}) {
      const spec = sub === "." ? ${JSON.stringify(name)} : ${JSON.stringify(name)} + sub.slice(1);
      try { out[spec] = import.meta.resolve(spec); } catch (e) { out[spec] = "ERROR:" + e.code; }
    }
    console.log(JSON.stringify(out));
  `;
  writeFileSync(join(scratch, "probe.mjs"), probe);
  const resolved = JSON.parse(
    execFileSync(process.execPath, [join(scratch, "probe.mjs")], { cwd: scratch, encoding: "utf8" }),
  );
  for (const [spec, value] of Object.entries(resolved)) {
    if (String(value).startsWith("ERROR")) problems.push(`subpath "${spec}" does not resolve (${value})`);
    else ok.push(`resolves: ${spec}`);
  }

  for (const [sub, node] of Object.entries(installed.exports ?? {})) {
    const types = typeof node === "object" && node?.types;
    if (!types) continue;
    const abs = join(installedRoot, types);
    if (!existsSync(abs) || statSync(abs).size === 0) problems.push(`types for "${sub}" missing or empty (${types})`);
    else ok.push(`types present: ${sub} -> ${types}`);
  }

  const cssRel = installed.exports?.["./styles.css"];
  if (typeof cssRel === "string") {
    const cssAbs = join(installedRoot, cssRel);
    if (!existsSync(cssAbs) || statSync(cssAbs).size === 0) problems.push(`CSS entry missing or empty (${cssRel})`);
    else {
      const css = readFileSync(cssAbs, "utf8");
      if (!css.includes("@theme")) problems.push("installed styles.css has lost its @theme block");
      else ok.push(`CSS resolves and retains @theme (${cssRel})`);
    }
  }

  // ── Hash comparison against the locally packed tarball ────────────────────
  if (localTarball && existsSync(localTarball)) {
    const extractDir = join(scratch, "local-extract");
    mkdirSync(extractDir, { recursive: true });
    execFileSync("tar", ["-xzf", localTarball, "-C", extractDir, "--strip-components=1"], { stdio: "ignore" });

    const localFiles = walk(join(extractDir, "dist"));
    let matched = 0;
    for (const rel of localFiles) {
      const a = join(extractDir, "dist", rel);
      const b = join(installedRoot, "dist", rel);
      if (!existsSync(b)) {
        problems.push(`dist/${rel} present locally but absent from the installed package`);
        continue;
      }
      if (sha256(a) !== sha256(b)) problems.push(`dist/${rel} differs between local tarball and registry install`);
      else matched += 1;
    }
    ok.push(`hash comparison: ${matched}/${localFiles.length} dist file(s) byte-identical to the local tarball`);
  } else {
    ok.push("hash comparison: skipped (no --tarball supplied)");
  }
} catch (error) {
  const redacted = String(error.stderr ?? error.message ?? error).replace(
    /(Bearer|_authToken=)\s*\S+/gi,
    "$1 <redacted>",
  );
  problems.push(`clean-consumer verification failed: ${redacted.split("\n").slice(0, 5).join(" | ")}`);
} finally {
  rmSync(scratch, { recursive: true, force: true });
}

for (const line of ok) console.log(`  ✔ ${line}`);

if (problems.length > 0) {
  console.error("\n✖ Published-package verification FAILED:\n");
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error("\nThe tag and GitHub release must NOT be created.");
  process.exit(1);
}

console.log(`\n✔ ${name}@${version} verified from a clean external consumer.`);
