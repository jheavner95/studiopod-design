# ADR 0003 — The library owns its source; documentation consumes the package

- **Status:** Accepted
- **Date:** 2026-08-06
- **Work package:** DH-1
- **Scope:** Repository
- **Supersedes:** —
- **Superseded by:** —

## Context

The published package does not have its own source tree. It compiles the
documentation site's.

`packages/design-system/tsconfig.json` sets `baseUrl: "../.."` and maps
`@/* → src/*`, where `src/` is the Next.js documentation application. The
package's own `src/` contains five entry files and two build shims. Every
component the package publishes is resolved out of the documentation site.

The consequences are already visible in the build, and they are not subtle.

**The build must hand-amputate documentation code from the bundle.**
`tsup.config.ts` carries two esbuild resolver plugins. One redirects the
`@/components/layout` barrel to a package-local shim that omits `GlobalNav` and
`Footer`, because those import documentation-site navigation tooling. The other
redirects the `@/workflows` barrel to a shim that omits example scenario data
built on `@/lib/canonical.ts`. Both carry long comments explaining which files
would otherwise be pulled in.

**The exclusions are maintained by memory.** `index.ts` excludes `GlobalNav` and
`Footer` in a hand-written comment that also explains why the barrel had to be
bypassed file-by-file. Nothing detects the next component that acquires a
documentation-site import. The default outcome is silent inclusion; correctness
depends on someone noticing.

**Documentation-site tooling sits inside the library's resolution path.**
`src/lib/` contains `showcase-registry.ts`, `docs-contracts.ts`,
`design-system-navigation.ts`, `certification.ts`, `release-workflow.ts`, and
`canonical.ts` — none of which is library code, all of which the package can
reach.

**The documentation site cannot detect a broken public API.** Its examples import
`@/components/...` directly. It never resolves an entry point, never sees the
export surface, and never exercises `sideEffects` behaviour. The one artefact
best positioned to catch a break in the published contract is structurally
incapable of it.

**Tree-shaking claims cannot be verified.** The argument for one package with
subpath entries ([ADR 0004](0004-one-published-package.md)) depends on consumers
not paying for code they do not import. While the trees are shared, the boundary
that would make that true does not exist.

The through-line: **the boundary between "library" and "documentation" is being
enforced by build configuration because it does not exist structurally.** Those
plugins are not a clever workaround. They are a boundary, reimplemented by hand,
per barrel, forever — and they only catch the barrels someone remembered.

## Decision

**The published package compiles its own source tree and nothing else. The
documentation site consumes the published package, exactly as Cloud and Web do.**

Concretely:

1. **All library source moves into `packages/design/src/`**, organised by the
   tiers in [../architecture/repository-structure.md](../architecture/repository-structure.md)
   § 2.
2. **`packages/design/tsconfig.json` resolves nothing outside the package.** No
   `baseUrl` pointing at the repository root. This single constraint makes the
   boundary structural: the package cannot ship what it cannot resolve.
3. **The documentation site becomes a workspace member** that declares
   `@jheavner95/design` as a dependency and imports only from public entry points.
4. **Both esbuild resolver plugins are deleted.** They have nothing left to do.
5. **The hand-written exclusion comments in `index.ts` are deleted.**
   `GlobalNav` and `Footer` move to the documentation site, where they always
   belonged.
6. **`src/lib/` is dissolved.** Library parts move into the tier that owns them;
   documentation tooling moves to the documentation site.
7. **The directory is renamed `packages/design`** to match the package name.

## Alternatives considered

### Alternative A — Keep the shared tree, add a lint rule forbidding doc-site imports in library code

Plausible, and much cheaper. A lint rule with an import-path allowlist would
catch the same class of mistake the esbuild shims catch, and catch it earlier.

Rejected because it enforces the boundary in the weakest available place. A lint
rule can be suppressed inline, is easy to bypass through a barrel or a dynamic
import, and requires a maintained allowlist of what "library code" means — which
is the thing the directory structure should be saying. It also does nothing for
the two problems that matter most: the documentation site still would not
exercise the public API, and tree-shaking would remain unverifiable.

It buys detection where the structural fix buys **impossibility**.

### Alternative B — Move the documentation site to a separate repository

Plausible: a clean split, no workspace complexity, and the site becomes
unambiguously a consumer.

Rejected because it breaks Article VII's requirement that documentation lands in
the same commit as the change it describes. A cross-repository documentation
update is a second pull request, a second review, and a window during which the
documentation is wrong. It would also make local development considerably worse:
changing a component and seeing it in the documentation site would require a
publish or a link step.

The workspace gives us the consumer relationship without the coordination cost.

### Alternative C — Invert it: the package builds from the site, but with an explicit manifest

Plausible: keep the current arrangement and add a file listing exactly which
modules are public, which the build reads and enforces.

Rejected because it is the current arrangement with a better-organised version
of the same defect. A manifest is still a hand-maintained list of what is
library code, still drifts, and still leaves documentation tooling inside the
resolution path. It also does not let the documentation site consume the entry
points, so the integration-test benefit is still lost.

### Alternative D — Do nothing; the shims work

Plausible in the narrow sense: the package builds and publishes today.

Rejected because "works" is doing a lot of work in that sentence. The shims
handle the two barrels someone found. The failure mode is not a broken build —
it is a documentation-site module silently shipping to consumers, discovered
when a consumer's bundle grows or their build fails on a `next` import they never
asked for. That has already happened once, in effect: the `next` peer dependency
is exactly this class of leak.

## Consequences

### What this makes easier

- The boundary is structural. Shipping documentation code becomes impossible
  rather than discouraged.
- The documentation build becomes an integration test of the published API — the
  single highest-value gate this repository can have
  ([../engineering/quality-gates.md](../engineering/quality-gates.md) § 3).
- Tree-shaking claims become verifiable, which is the load-bearing assumption of
  [ADR 0004](0004-one-published-package.md).
- Two build plugins, one set of exclusion comments, and a class of recurring
  review question all disappear.
- The library's own structure becomes visible instead of being distributed
  through a site's `src/`.

### What this makes harder

- **The migration is large.** Roughly 560 component files move, and every import
  in the documentation site changes.
- **It is high-risk work with no feature output.** A file that moves to the wrong
  tier is an API change nobody intended.
- **Local iteration gains a build step.** Changing a component and seeing it in
  the documentation site requires the package to rebuild. Workspace linking plus
  watch mode reduces this, but it does not become free.
- **Some components will not sort cleanly.** Anything that is genuinely half
  documentation tooling and half library will need a decision, and some of those
  decisions will be wrong the first time.

### What this commits us to

- Keeping `packages/design/tsconfig.json` self-contained. A future `baseUrl`
  pointing outward reintroduces the entire problem.
- The documentation site importing only from public entry points, permanently.
- Doing the migration in reviewable stages rather than one commit, with the
  package verified at each stage.

## Enforcement

- **`tsconfig.json` scope** — mechanical, and self-enforcing: the package cannot
  resolve what it cannot see.
- **Pack check** — mechanical. The tarball must contain no documentation source.
- **Documentation build** — mechanical. The site builds against entry points; a
  deep import fails to resolve.
- **Import boundary check** (DH-2) — mechanical. No upward tier imports, no
  documentation-site imports.

The change from the current state is that these are **structural or mechanical**,
where today the equivalent guarantees are build plugins plus reviewer memory.

## References

- [../architecture/repository-structure.md](../architecture/repository-structure.md)
- [../architecture/packages.md](../architecture/packages.md) § 5
- [ADR 0004 — One published package](0004-one-published-package.md)
- [ADR 0007 — Framework neutrality](0007-framework-neutrality.md)
- [../certification/DH-1.md](../certification/DH-1.md) § Conformance gap
