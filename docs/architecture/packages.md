# Package architecture

**Owns:** what this repository publishes, and the test a new package must pass.

---

## 1. One published package

The repository publishes exactly one package.

```
@studiopod/design      the visual language as code
```

Everything else in the repository — the documentation site, the tooling, the
test infrastructure — is **not published**. It exists to produce, verify, and
explain that one package.

The reasoning is in [ADR 0004](../decisions/0004-one-published-package.md). The
short version: package boundaries are the most expensive boundaries in a
monorepo, because each one adds a version to reconcile, a changelog to read, a
release to coordinate, and a compatibility matrix to maintain. Entry points buy
most of the same isolation for almost none of the cost.

---

## 2. Entry points

Entry points, not packages, are the unit of scope. Each has a **declared scope**
that governs what may be exported from it — the scope is contract, and an export
that does not fit its entry's scope is a defect regardless of whether it
compiles.

| Entry             | Scope                                                      | Stability                    | Typical consumer     |
| ----------------- | ---------------------------------------------------------- | ---------------------------- | -------------------- |
| `.`               | Primitives and patterns — the visual language              | Highest. Most exports Stable | Every consumer       |
| `./marketing`     | Brand compositions — page-section archetypes               | Lower. Composition-tier      | Web, marketing pages |
| `./illustrations` | The illustration engine                                    | Lower. Preview-heavy         | Web, documentation   |
| `./tokens`        | Generated semantic projection of Foundation values         | Tracks Foundation            | Every consumer       |
| `./styles.css`    | The stylesheet                                             | Highest — load-bearing       | Every consumer       |
| `./internal`      | **Not public API.** The motion engine, the illustration dev overlay, control-sizing constants | **None whatsoever** | `@studiopod/docs` only |

**Adding, removing, or re-scoping a public entry point is a breaking change**,
because consumers' import paths and bundler configuration depend on the set.

`./internal` is not a public entry point. It was added in DH-2 so the
documentation application could stop reaching into library source for the
engine internals it documents, without those internals becoming public API.
It has no baseline, no versioning promise, and no consumers outside this
repository. [ADR 0011](../decisions/0011-internal-entry-point.md).

### What each entry may not contain

- `.` may not export a brand composition, an illustration primitive, or anything
  that imports from `./marketing` or `./illustrations`.
- `./marketing` may not export a primitive. If a brand composition needs one, it
  imports it from the library's own `primitives/`, and the primitive is exported
  from `.`.
- `./illustrations` may not export documentation tooling or example scenario
  data. Until DH-2 the build shimmed a barrel to enforce this; the example data
  now lives in the documentation application, so the boundary is structural.
- `./tokens` may not export a value that did not come from Foundation through the
  bridge. This is the one entry where an addition can silently fork the brand.

---

## 3. Why the isolation works without separate packages

The concern that motivates package splitting is real: Cloud does not want
marketing compositions or an illustration engine in its bundle, and
[ADR 0033 in Cloud](https://github.com/jheavner95/studiopod-cloud) named exactly
that as a reason not to consume Design.

Three mechanisms address it, and all three must hold:

1. **Subpath exports.** A consumer that never imports `@studiopod/design/marketing`
   never resolves the module. The entry is not reachable from `.`.
2. **`sideEffects` declared correctly.** The package declares `sideEffects:
   ["*.css"]` so bundlers may drop unreferenced modules. This is currently
   undermined by barrel files that pull whole families in on a single import —
   see § 5.
3. **No upward imports between tiers.** A primitive that imports a pattern makes
   the pattern unreachable-but-included. This is the leak that makes tree-shaking
   claims untrue in practice, and it is why the tier rule is mechanical rather
   than advisory.

If any of the three fails, the isolation is a claim rather than a fact, and the
honest response is to fix the mechanism — not to reach for a second package,
which would paper over the same leak with a bigger boundary.

**Status after DH-2.** (1) holds and always did. (2) is now possible to reason
about — the package compiles only its own source, so what `sideEffects` and
tree-shaking do to it is a property of the library rather than of a shared tree
— but it is **still unverified**: no check yet asserts that importing one
primitive fails to pull in `/marketing` or `/illustrations`. (3) is still
target, because the tiers do not exist yet. Both are DH-3 work and both are
recorded as open gaps in
[../certification/DH-2.md](../certification/DH-2.md) § Remaining gaps. Until
they are built, this section describes an argument, not a measurement.

---

## 4. The test for a second package

A second published package requires an ADR that answers **all three** of these
affirmatively. Two out of three is a "no."

1. **Divergent dependencies.** Does it require runtime dependencies the main
   package must not carry, such that co-publishing forces every consumer to
   resolve them?
2. **Divergent cadence.** Does it need to release on a schedule that would
   otherwise force unnecessary version churn in the main package — or be held
   back by it?
3. **Divergent consumers.** Is there a real, named consumer that wants this and
   not the main package, or the main package and not this?

### Candidates already considered and rejected

| Candidate                  | Why it was rejected                                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `@studiopod/design-tokens` | Fails (3). Foundation already owns values; a token package here would be a third hop and a second canonical owner in waiting.         |
| `@studiopod/design-icons`  | Fails (1) and (3). Icons are Foundation's. Design consumes them.                                                                      |
| `@studiopod/design-marketing` | Fails (1) once the Next.js coupling is removed. Its dependencies are the library's. Subpath export is sufficient. Revisit if cadence genuinely diverges. |
| `@studiopod/design-illustrations` | Fails (2) today — it releases with the library. The strongest future candidate; see [boundaries.md](boundaries.md) § 5.        |
| `@studiopod/design-core` / `-react` split | Fails all three. A framework-neutral core with a React binding is a real pattern, but StudioPOD has exactly one UI technology and no second one planned. Splitting for a hypothetical consumer is fragmentation. |
| `@studiopod/design-testing` | Fails (3) **today**. Genuinely passes (1) — testing-library and axe must not ship to production. Promote when a consumer asks for render helpers or accessibility matchers; do not build it speculatively. |

The pattern in that table is worth naming: almost every plausible second package
fails on **consumers**, not on technology. Package boundaries should follow the
people who install them.

---

## 5. Known defects in the current package

| Defect                                                                                          | Consequence                                                                | Status                     |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------- |
| The package compiles the documentation site's `src/` via `baseUrl: "../.."`                     | No enforceable boundary; the build hand-amputates doc chrome per barrel     | **Fixed — DH-2**           |
| Two esbuild resolver plugins shim barrels to strip doc-site imports                              | Only catches barrels someone remembered. Silent inclusion is the default    | **Fixed — DH-2**, deleted  |
| Directory is `packages/design-system`; package is `@studiopod/design`                            | Two names for one thing                                                    | **Fixed — DH-2**           |
| `sideEffects` cannot be tightened while the source tree is shared                                | Bundlers evaluate more than they need to                                   | **Unblocked — DH-2**; not yet tightened |
| `next` is a required peer dependency for all consumers                                          | Blocks Cloud. Levies a framework tax on consumers that do not use it        | Open — DH-3, [ADR 0007](../decisions/0007-framework-neutrality.md) |
| Barrel-heavy exports (`export * from "@/components/ui"`)                                        | Undermines the tree-shaking that the no-second-package argument depends on   | Open — DH-3                |
| The root entry carries `"use client"`, so pure exports such as `cn` cannot be called from a server component | Any consumer with a server component hits it              | Open — found by DH-2       |

The last row is new, and it is the kind of defect only a real consumer finds.
The documentation site hit it on its first build against `dist/`. See
[../certification/DH-2.md](../certification/DH-2.md) § Unexpected discoveries.

---

## 6. Package identity

The published package declares:

- **Name:** `@studiopod/design`
- **Registry:** GitHub Packages (`https://npm.pkg.github.com`)
- **Module format:** ESM only
- **Peer dependencies:** `react`, `react-dom`, and — still, pending
  [ADR 0007](../decisions/0007-framework-neutrality.md) — `next`. DH-2 did not
  touch this; framework neutrality is DH-3.
- **Runtime dependencies:** kept minimal and reviewed as public API — a runtime
  dependency is something every consumer installs, so adding one requires an ADR
- **Build-time dependency:** `@studiopod/foundation`, consumed through the token
  bridge, never a runtime dependency
  ([ADR 0008](../decisions/0008-foundation-is-a-build-time-input.md))

Identity is verified mechanically by the package's `identity-check`, which is one
of the stronger pieces of existing practice and is preserved unchanged.

---

## 7. References

- [ADR 0004 — One published package, entry points as scope](../decisions/0004-one-published-package.md)
- [ADR 0007 — Framework neutrality](../decisions/0007-framework-neutrality.md)
- [ADR 0008 — Foundation is a build-time input](../decisions/0008-foundation-is-a-build-time-input.md)
- [public-api.md](public-api.md)
- [../engineering/publishing.md](../engineering/publishing.md)
