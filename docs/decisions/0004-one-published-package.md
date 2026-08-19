# ADR 0004 — One published package; entry points are the unit of scope

- **Status:** Accepted
- **Date:** 2026-08-06
- **Work package:** DH-1
- **Scope:** Repository
- **Supersedes:** —
- **Superseded by:** —

## Context

The repository publishes `@jheavner95/design` with four code entries — `.`,
`./tokens`, `./marketing`, `./illustrations` — plus a stylesheet.

There is real pressure to split it. Cloud declined to consume the package partly
because it "carries marketing compositions, an illustration engine and a
`next/link` coupling Cloud has no use for." That is a legitimate complaint from a
consumer, and the obvious remedy is to publish the parts separately so a consumer
installs only what it wants.

There is equal pressure not to. Package boundaries are the most expensive
boundaries in a monorepo: each adds a version to reconcile, a changelog to read,
a release to coordinate, a compatibility matrix to maintain, and a decision for
every consumer about which packages to install. Design systems that fragmented
early are well represented among design systems whose consumers dread upgrades.

The question is which mechanism actually delivers the isolation consumers need.

## Decision

**The repository publishes one package. Entry points, not packages, are the unit
of scope.**

Each entry has a **declared scope** that governs what may be exported from it.
The scope is contract: an export that does not fit its entry is a defect,
regardless of whether it compiles.

| Entry             | Scope                                                | May not contain                        |
| ----------------- | ---------------------------------------------------- | -------------------------------------- |
| `.`               | Primitives and patterns — the visual language        | Brand compositions, illustration internals |
| `./marketing`     | Brand compositions — page-section archetypes         | Primitives                             |
| `./illustrations` | The illustration engine                              | Documentation tooling, example data     |
| `./tokens`        | Generated semantic projection of Foundation values   | Any value not from the bridge          |
| `./styles.css`    | The stylesheet                                       | —                                      |

**Adding, removing, or re-scoping an entry point is a breaking change.**

### What must hold for this to be honest

The isolation is a claim unless three mechanisms hold, and all three are
obligations of this decision:

1. **Subpath exports.** A consumer that never imports `/marketing` never resolves
   it. Structurally true today.
2. **Correct `sideEffects` and real tree-shaking.** Currently undermined by
   barrel exports and by the shared source tree —
   [ADR 0003](0003-library-owns-its-source.md) is a precondition for this ADR
   being truthful.
3. **No upward imports between tiers.** A primitive importing a pattern makes the
   pattern unreachable-but-included, which is the leak that makes tree-shaking
   claims false in practice. Enforced mechanically.

If any fails, the fix is the mechanism — not a second package, which would paper
over the same leak with a larger and more expensive boundary.

### The test for a second package

An ADR proposing one must answer **all three** affirmatively. Two of three is a
"no."

1. **Divergent dependencies** — does it need runtime dependencies the main
   package must not carry?
2. **Divergent cadence** — does it need to release on a schedule that would force
   churn in, or be held back by, the main package?
3. **Divergent consumers** — is there a real, named consumer that wants one and
   not the other?

## Alternatives considered

### Alternative A — Split into `@jheavner95/design`, `-marketing`, and `-illustrations`

The direct answer to Cloud's complaint: Cloud installs the core package and never
sees the rest.

Rejected because it solves a problem that subpath exports already solve, at
permanent cost. Cloud does not currently pay for `/marketing` in its bundle; it
pays for it in **peer dependencies** (`next`) and in perceived API surface. The
peer dependency is a real defect with a real fix
([ADR 0007](0007-framework-neutrality.md)), and once fixed, the remaining
complaint is that the package's documentation mentions components Cloud will not
use — which is not worth three release processes.

The decisive test is § "Divergent consumers": Web wants marketing **and** the
core; Cloud wants the core. There is no consumer that wants marketing and not the
core. A boundary that no consumer's installation actually follows is a boundary
that only creates work.

### Alternative B — Split `@studiopod/design-core` (framework-neutral) from `@studiopod/design-react`

A real and respected pattern — headless logic separated from a rendering binding.

Rejected on all three tests. StudioPOD has exactly one UI technology and no
second one planned. Building the split for a hypothetical future consumer means
paying the full coordination cost now against a benefit that may never arrive,
and the design would inevitably be wrong for whatever the real second technology
turned out to be. The `behavior/` tier already gives us headless hooks without a
package boundary.

### Alternative C — One package, one entry point

Simplest possible: everything from `@jheavner95/design`.

Rejected because it removes the scope declaration, which is the part doing the
work. With one entry, nothing prevents a brand composition from being imported
alongside a button, tree-shaking becomes the only defence against bundle bloat,
and consumers lose the ability to reason about what they depend on. Entry points
are cheap and communicate intent; collapsing them saves nothing.

### Alternative D — A package per component family

The maximally granular option. Consumers install exactly what they use.

Rejected decisively. Dozens of versions to reconcile, an intractable
compatibility matrix between families that legitimately depend on each other, and
an upgrade experience that no consumer would tolerate. The industry has run this
experiment repeatedly and the results are consistent.

## Consequences

### What this makes easier

- One version, one changelog, one release, one upgrade decision per consumer
- Cross-tier changes land atomically — a primitive and the pattern using it move
  together, with no version skew
- Adding a capability does not require deciding which package it goes in
- Consumers reason about scope through import paths, which they already read

### What this makes harder

- **A consumer who wants only illustrations still installs the whole package.**
  Disk and install time, not bundle size — but real.
- **The single version number covers surfaces with different stability.** A
  breaking change in `/marketing` bumps the version for consumers who only use
  `.`, and they must read a changelog entry that does not affect them.
- **Tree-shaking becomes load-bearing.** If it degrades, the argument for this
  decision degrades with it — which is why § "What must hold" is an obligation,
  not a note.
- **The `sideEffects` and barrel discipline must be maintained forever.** It is
  the kind of discipline that erodes quietly.

### What this commits us to

- Keeping entry-point scopes honest, including moving misfiled exports (`Empty`,
  `Workflow`, `Platform`, and `Timeline` are currently in `/marketing` and are
  not brand compositions)
- Verifying tree-shaking rather than assuming it
- Requiring an ADR clearing the three-part test before any second package
- Revisiting this if `/illustrations` ever develops genuinely divergent
  dependencies or cadence — the strongest future candidate

## Enforcement

- **`exports-check`** — mechanical. Every declared entry resolves in the shapes
  consumers import.
- **`api-check`** — mechanical. The export surface per entry matches `API.md`.
- **Import boundary check** (DH-2) — mechanical. No upward tier imports.
- **Bundle composition check** (DH-2) — mechanical. Importing one primitive must
  not pull in `/marketing` or `/illustrations`. This is the check that keeps this
  ADR honest, and it does not exist yet.
- **Entry scope** — review obligation. Whether an export belongs in its entry is
  a judgement.

## References

- [../architecture/packages.md](../architecture/packages.md)
- [ADR 0003 — The library owns its source](0003-library-owns-its-source.md)
- [ADR 0007 — Framework neutrality](0007-framework-neutrality.md)
- [../architecture/boundaries.md](../architecture/boundaries.md) § 5
- Cloud ADR 0033 — StudioPOD ecosystem architecture
