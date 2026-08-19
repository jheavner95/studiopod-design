#!/usr/bin/env node
/**
 * Package-identity check for @jheavner95/design (ORG-2B, formerly DS-7.3a
 * for the design-system -> design rename).
 *
 * The sibling scripts verify what the package CONTAINS — check-api.mjs the
 * exported symbols, check-css.mjs the stylesheet, check-exports.mjs that every
 * declared subpath exists, check-use-client.mjs the directives. None of them
 * cares what the package is CALLED, which is precisely the property the DS-7.3a
 * rename changed. This script covers that gap.
 *
 * Checks:
 *   1. package.json declares the new name
 *   2. publishing config targets the intended registry, and nothing pins the
 *      package to npmjs
 *   3. no BUILT file mentions the old name — a stale name baked into dist is
 *      invisible in source review and ships to consumers
 *   4. no CURRENT source or script self-reference uses the old name (historical
 *      records under docs/ are deliberately exempt — see below)
 *   5. every export subpath RESOLVES under the new name, from a real packed
 *      tarball, through Node's own export-map resolution
 *
 * On (4): dated work-package records in docs/ (DS-5*, DS-6*, DS-7.2*), the
 * engineering notes, the pre-0.13.0 CHANGELOG entries, and the rollback section
 * of DISTRIBUTION.md all still say `@studiopod/design-system` ON PURPOSE. They
 * describe work completed, and versions published, under that name. Rewriting
 * them would make the repository's own history inaccurate. This check therefore
 * scopes itself to the package directory's live source, not to prose.
 *
 * On (5): this does NOT import the built modules. They reference bare
 * and friends as bare specifiers, which a plain Node loader cannot resolve
 * outside a bundler — the same reason check-exports.mjs stays static.
 * `import.meta.resolve` performs full export-map resolution WITHOUT executing
 * the target, so it proves the subpath is reachable under the new name while
 * sidestepping the peer dependencies entirely.
 *
 * Exit codes: 0 = all good. 1 = at least one problem.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(pkgRoot, "package.json"), "utf8"));

const EXPECTED_NAME = "@jheavner95/design";
/**
 * Both prior identities. @studiopod/design-system was retired at DS-7.3a;
 * @studiopod/design was retired at ORG-2B. Neither may leak into a built
 * artifact or a live self-reference — the property this script exists to
 * prove is unbroken by having two predecessors instead of one.
 */
const OLD_NAMES = ["@studiopod/design-system", "@studiopod/design"];
const EXPECTED_REGISTRY = "https://npm.pkg.github.com";

const problems = [];
const ok = [];

// ── 1. Identity ─────────────────────────────────────────────────────────────
if (pkg.name !== EXPECTED_NAME) {
  problems.push(`package.json#name is "${pkg.name}", expected "${EXPECTED_NAME}"`);
} else {
  ok.push(`name: ${pkg.name}`);
}

// ── 2. Publishing configuration ─────────────────────────────────────────────
if (pkg.publishConfig?.registry !== EXPECTED_REGISTRY) {
  problems.push(
    `package.json#publishConfig.registry is "${pkg.publishConfig?.registry}", expected "${EXPECTED_REGISTRY}". ` +
      `Without it, npm falls back to registry.npmjs.org and this private package would be published publicly.`,
  );
} else {
  ok.push(`publishConfig.registry: ${pkg.publishConfig.registry}`);
}

if (!pkg.name?.startsWith("@jheavner95/")) {
  problems.push(`package name must stay in the @jheavner95 scope — GitHub Packages routes by scope`);
}

if (pkg.repository?.directory && !existsSync(join(pkgRoot, "..", "..", pkg.repository.directory))) {
  problems.push(`package.json#repository.directory "${pkg.repository.directory}" does not exist`);
}

// ── 3. Built output must not carry the old name ─────────────────────────────
const dist = join(pkgRoot, "dist");
if (!existsSync(dist)) {
  problems.push(`dist/ not found — run "npm run build" before this check`);
} else {
  const stale = new Map();
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (![".js", ".ts", ".css", ".map", ".json"].includes(extname(entry.name))) continue;
      const text = readFileSync(full, "utf8");
      for (const oldName of OLD_NAMES) {
        if (text.includes(oldName)) {
          if (!stale.has(oldName)) stale.set(oldName, []);
          stale.get(oldName).push(entry.name);
        }
      }
    }
  };
  walk(dist);

  if (stale.size > 0) {
    for (const [oldName, files] of stale) {
      problems.push(`built file(s) still reference "${oldName}": ${files.join(", ")}`);
    }
  } else {
    ok.push(`dist/: no reference to any prior identity (${OLD_NAMES.join(", ")})`);
  }
}

// ── 4. Live source self-references ──────────────────────────────────────────
const liveDirs = ["src", "scripts"];
const staleSources = [];
for (const rel of liveDirs) {
  const root = join(pkgRoot, rel);
  if (!existsSync(root)) continue;
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      const text = readFileSync(full, "utf8");
      // This script names the old strings deliberately; exempt it.
      if (full === fileURLToPath(import.meta.url)) continue;
      if (OLD_NAMES.some((oldName) => text.includes(oldName))) staleSources.push(join(rel, entry.name));
    }
  };
  walk(root);
}

if (staleSources.length > 0) {
  problems.push(`live source still references a prior identity (${OLD_NAMES.join(", ")}): ${staleSources.join(", ")}`);
} else {
  ok.push(`src/ and scripts/: no reference to any prior identity (${OLD_NAMES.join(", ")})`);
}

// Manifest fields must be clean too — `files`, `main`, `types`, `exports`.
const manifestBlob = JSON.stringify({
  main: pkg.main,
  types: pkg.types,
  exports: pkg.exports,
  files: pkg.files,
  name: pkg.name,
  repository: pkg.repository,
  homepage: pkg.homepage,
  bugs: pkg.bugs,
});
for (const oldName of OLD_NAMES) {
  if (manifestBlob.includes(oldName)) {
    problems.push(`package.json still references "${oldName}" in a published metadata field`);
  }
}

// ── 5. Real export-map resolution from a packed tarball ─────────────────────
let scratch = null;
if (!existsSync(dist)) {
  problems.push(`skipped export-resolution check: dist/ missing`);
} else {
  try {
    scratch = mkdtempSync(join(tmpdir(), "ds-identity-"));
    const packDir = join(scratch, "pack");
    mkdirSync(packDir, { recursive: true });

    execFileSync("npm", ["pack", "--pack-destination", packDir], {
      cwd: pkgRoot,
      stdio: ["ignore", "pipe", "pipe"],
    });

    const tarball = readdirSync(packDir).find((f) => f.endsWith(".tgz"));
    if (!tarball) throw new Error("npm pack produced no tarball");

    // The tarball FILENAME is derived from the package name — a cheap,
    // independent confirmation that the rename reached the published artifact.
    const expectedPrefix = `${EXPECTED_NAME.replace("@", "").replace("/", "-")}-`;
    if (!tarball.startsWith(expectedPrefix)) {
      problems.push(`packed tarball is "${tarball}", expected it to start with "${expectedPrefix}"`);
    } else {
      ok.push(`tarball: ${tarball}`);
    }

    // Install position: <scratch>/node_modules/@jheavner95/design
    const installDir = join(scratch, "node_modules", EXPECTED_NAME);
    mkdirSync(installDir, { recursive: true });
    execFileSync("tar", ["-xzf", join(packDir, tarball), "-C", installDir, "--strip-components=1"], {
      stdio: "ignore",
    });

    // A probe INSIDE the scratch package, so Node walks up to its node_modules.
    writeFileSync(join(scratch, "package.json"), JSON.stringify({ name: "probe", type: "module" }));

    const subpaths = Object.keys(pkg.exports ?? {}).filter((s) => !s.includes("*"));
    const probe = `
      const results = {};
      for (const sub of ${JSON.stringify(subpaths)}) {
        const specifier = sub === "." ? ${JSON.stringify(EXPECTED_NAME)}
                                      : ${JSON.stringify(EXPECTED_NAME)} + sub.slice(1);
        try { results[specifier] = import.meta.resolve(specifier); }
        catch (error) { results[specifier] = "ERROR: " + error.code; }
      }
      console.log(JSON.stringify(results));
    `;
    writeFileSync(join(scratch, "probe.mjs"), probe);

    const raw = execFileSync(process.execPath, [join(scratch, "probe.mjs")], {
      cwd: scratch,
      encoding: "utf8",
    });
    const resolved = JSON.parse(raw);

    for (const [specifier, result] of Object.entries(resolved)) {
      if (typeof result === "string" && result.startsWith("ERROR")) {
        problems.push(`export subpath "${specifier}" does not resolve (${result})`);
      } else {
        ok.push(`resolves: ${specifier}`);
      }
    }

    // Neither prior name may still resolve — nothing should be reachable by
    // either of them from a package built under the current identity.
    for (const oldName of OLD_NAMES) {
      writeFileSync(
        join(scratch, "probe-old.mjs"),
        `try { import.meta.resolve(${JSON.stringify(oldName)}); console.log("RESOLVED"); }
         catch { console.log("NOT_FOUND"); }`,
      );
      const oldResult = execFileSync(process.execPath, [join(scratch, "probe-old.mjs")], {
        cwd: scratch,
        encoding: "utf8",
      }).trim();
      if (oldResult === "RESOLVED") {
        problems.push(`"${oldName}" still resolves from the packed tarball`);
      } else {
        ok.push(`"${oldName}" no longer resolves`);
      }
    }
  } catch (error) {
    problems.push(`export-resolution check failed to run: ${error.message}`);
  } finally {
    if (scratch) rmSync(scratch, { recursive: true, force: true });
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
if (problems.length > 0) {
  console.error("✖ Package identity check failed:\n");
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error("\nSee docs/DS-7.3a-Package-Rename.md.");
  process.exit(1);
}

console.log(`✔ Package identity verified as ${EXPECTED_NAME}:`);
for (const line of ok) console.log(`  - ${line}`);
