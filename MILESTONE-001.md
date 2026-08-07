# MILESTONE-001

## StudioPOD Design Becomes a Platform

**Date:** 2026-08-07

---

## Summary

DH-2 completed the architectural separation between the Design library and the
Design documentation product.

Prior to DH-2, package boundaries were enforced through build-time exclusions
and shared source compilation.

Following DH-2:

- the published library owns its own source tree
- the documentation application consumes the published package
- architectural workarounds were removed
- package boundaries became mechanically enforceable
- verification expanded rather than weakened

This marks the point at which StudioPOD Design became an independently
consumable platform rather than an implementation artifact.

**Future packages should assume DH-2 as the architectural baseline.**

---

## Evidence

Each claim above, as it can be checked in the repository today.

| Claim                                    | Verifiable as                                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------ |
| The library owns its own source tree     | `packages/design/tsconfig.json` → `baseUrl: "."`. The package cannot resolve anything outside itself. |
| Documentation consumes the published package | 636 imports across five entry points; **zero** reaches into library source                  |
| Architectural workarounds removed        | 0 `esbuildPlugins` in `tsup.config.ts`; 0 files in `src/_internal/`                              |
| Boundaries mechanically enforceable      | `npm run boundary-check` — four assertions, each proven falsifiable against an injected fault    |
| Verification expanded, not weakened      | 13 gates → 14. The package's own `verify` script — the publish gate — is byte-identical to before. |

**Commit:** [`e6c19b1`](https://github.com/jheavner95/studiopod-design/commit/e6c19b1393fb23f59ce1e5c6a1de08af76e377e3)
· 1,553 files changed · 1,411 relocated

**Verification at the milestone:** `verify:full` 14/14 · 1013/1013 tests ·
76 routes built · 0 lint errors · public API baseline 616 / 5 / 44 / 249,
unchanged.

---

## What this baseline means for future packages

**Assume, and do not re-derive:**

- `packages/design` is the published library and owns its source. Its `baseUrl`
  is the package. Do not point it outward.
- `apps/docs` is a consumer. It has no path alias into library source, and
  adding one reintroduces the defect this milestone marks the end of.
- The boundary is checked mechanically. If a change requires weakening
  `tooling/boundary-check.mjs`, the change is wrong —
  [Constitution, Article VI § 7](CONSTITUTION.md#article-vi--engineering-standards).
- The package build runs before anything else can typecheck or test. That
  ordering is the boundary being real, not an inconvenience.

**Do not assume:**

This milestone records an *architectural* threshold, not the absence of defects.
DH-2's verdict was **CERTIFIED WITH OBSERVATIONS**, and three things are
deliberately unfinished — stated here so a future package does not discover them
as surprises:

1. **`next` is still a peer dependency**, and six library files still import
   `next/*`. Framework neutrality
   ([ADR 0007](docs/decisions/0007-framework-neutrality.md)) is not done, and it
   is one of the two reasons Cloud cannot comfortably adopt the package yet.
2. **N1 — the root entry's `"use client"` directive** makes every root export a
   client reference, including pure functions like `cn`. Any consumer with a
   server component hits it. Found by DH-2, intentionally left for a later
   package.
3. **Tree-shaking is an unverified assumption.** DH-2 made verification
   possible; it did not measure it. See
   [packages.md § 3](docs/architecture/packages.md).

"Independently consumable" describes the architecture. Making it comfortably
consumable is DH-3's work.

---

## References

- [DH-2 certification report](docs/certification/DH-2.md) — the full record,
  including the seven-check final pass and the three observations
- [DH-1 certification report](docs/certification/DH-1.md) — the architecture
  this implemented
- [ADR 0003](docs/decisions/0003-library-owns-its-source.md) — the library owns
  its source
- [ADR 0011](docs/decisions/0011-internal-entry-point.md) ·
  [ADR 0012](docs/decisions/0012-workspace-layout.md) — the two DH-1 amendments
  DH-2 required
- [Architecture overview](docs/architecture/overview.md) ·
  [Repository structure](docs/architecture/repository-structure.md)
