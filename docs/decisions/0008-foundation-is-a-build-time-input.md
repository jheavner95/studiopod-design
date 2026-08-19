# ADR 0008 — Foundation is a build-time input, consumed through the token bridge

- **Status:** Accepted
- **Date:** 2026-08-06
- **Work package:** DH-1
- **Scope:** Repository
- **Supersedes:** —
- **Superseded by:** —

## Context

Foundation owns the canonical design values. Design owns what they mean in an
interface. The mechanism connecting them already exists and works: a generator
(`generate-tokens-from-foundation.mjs`) reads `@jheavner95/foundation` and emits
Design's semantic token modules and CSS custom properties, and a `--check` mode
fails the build if a generated file has been hand-edited.

`@jheavner95/foundation` is pinned exactly (`0.3.0`) and declared as a
**devDependency**. The generated values are baked into the published artefacts.

This arrangement is correct, but it was never written down as a decision, which
means its most important consequence is also undocumented: **Design sits on the
critical path for every brand change.** A Foundation token release does not reach
Cloud or Web until Design rebuilds and publishes.

That consequence is significant enough that someone will eventually propose
removing it — by making Foundation a peer dependency, or a runtime dependency, or
by having consumers import Foundation directly. This ADR records why not.

## Decision

**`@jheavner95/foundation` is a build-time input. It is pinned exactly, consumed
through the token bridge, and never appears as a runtime or peer dependency of
`@jheavner95/design`.**

Concretely:

1. **Foundation is a devDependency**, pinned to an exact version.
2. **Values enter only through the generator.** Generated token modules and CSS
   custom properties are committed and checked.
3. **Hand-editing a generated file fails the build** — `token:bridge-check`, and
   it runs **first** in the verification chain because it is the cheapest step
   and catches the one class of drift nothing downstream can see.
4. **Design's published artefacts contain Foundation's values**, resolved at
   build time.
5. **`@jheavner95/design/tokens` exports only the generated projection.** An
   export from that entry that did not come through the bridge is a fork of the
   brand.
6. **A Foundation release that changes values gets a Design release within one
   week.**

Rule 6 is the mitigation for the critical-path cost, and it is a real
obligation, not an aspiration. If it becomes routinely hard to meet, the thing to
fix is the release process, not the dependency direction.

## Alternatives considered

### Alternative A — Foundation as a peer dependency

Consumers install Foundation themselves and resolve their own version. A token
change reaches applications without a Design release.

Rejected because it makes a class of failure silent and moves it to production. A
consumer could resolve a Foundation version Design was never built against,
meaning a semantic token in Design's CSS could reference a Foundation value that
no longer exists — with no build-time signal, no type error, and no test failure.
The symptom would be a colour that renders as `unset` on someone's page.

**A slow path is better than a silent one.** Design's release becoming the
gate is the cost of the values being verified against the components that use
them.

It also multiplies the compatibility matrix: every Design version would need a
supported Foundation range, and every consumer would need to satisfy both.

### Alternative B — Foundation as a runtime dependency

Design depends on Foundation directly and resolves values at runtime.

Rejected because it ships the same values twice to any consumer that also uses
Foundation, and it means token resolution happens in the browser rather than at
build time — paying a runtime cost for values that are constant. It also would
not remove the critical path: Design would still need to release to pick up a new
Foundation version, since the dependency is pinned inside Design's manifest.

All the cost, none of the benefit.

### Alternative C — Consumers import Foundation directly for values, Design for components

A clean division: values from the value repository, components from the component
repository.

Rejected because it puts the burden of keeping them in sync on every consumer,
and gets it wrong in a specific way. Design's components are built against
**semantic** names, which are Design's, not Foundation's — and those names are
derived from Foundation's values at build time. A consumer importing Foundation
directly would get raw values with no semantic layer, and would be constructing
the mapping themselves. That is a second implementation of the semantic layer, in
every consumer.

Consumers may still depend on Foundation directly for their own purposes. What
they may not do is use it to reconstruct what Design already provides.

### Alternative D — Vendor Foundation's values into Design and drop the dependency

Copy the values in and stop depending on the package.

Rejected immediately — it makes Design a second canonical owner of the brand,
which is the exact failure the ecosystem separation exists to prevent, and which
Cloud ADR 0033 was written to reverse. The generator plus the check is what makes
the copy safe: the values are present, but they are provably derived rather than
authored.

## Consequences

### What this makes easier

- One canonical owner of design values, verified mechanically
- Consumers get values and semantics as one coherent artefact
- Token drift is impossible rather than discouraged
- No runtime cost for values that are constant
- No compatibility matrix between Design and Foundation for consumers to satisfy

### What this makes harder

- **Design is on the critical path for every brand change.** A colour correction
  in Foundation requires a Design release before anyone sees it.
- **Two releases for one change** whenever the change originates in Foundation.
- **A Foundation version bump is a Design change** requiring review, verification,
  and a version of its own.
- **An urgent brand fix is as slow as a Design release**, which is the case where
  this hurts most and the case rule 6 exists for.

### What this commits us to

- Releasing Design within one week of any Foundation value change
- Never hand-editing a generated file, including in an emergency — the emergency
  fix is a Foundation release, not a local edit
- Keeping the bridge generator deterministic, so the check means something
- Treating any proposal to change the dependency direction as an ADR, since the
  failure mode it reintroduces is silent

## Enforcement

- **`token:bridge-check`** — mechanical, and runs first. A hand-edited generated
  file fails.
- **`identity-check`** — mechanical. Foundation must not appear in `dependencies`
  or `peerDependencies`.
- **Exact pinning** — mechanical, via the dependency policy.
- **The one-week release obligation** — **not mechanically enforced.** It is a
  process commitment, and the honest statement is that it will be missed
  occasionally. A staleness check comparing Design's pinned Foundation version to
  Foundation's latest release is buildable and would make the obligation visible;
  DH-2 should consider it.

## References

- Cloud ADR 0033 — StudioPOD ecosystem architecture
- [../architecture/boundaries.md](../architecture/boundaries.md) § 2
- [../engineering/publishing.md](../engineering/publishing.md) § 5
- [../engineering/quality-gates.md](../engineering/quality-gates.md) § 3
