# ADR 0005 — Stable, Preview, Internal — declared, never inferred

- **Status:** Accepted
- **Date:** 2026-08-06
- **Work package:** DH-1
- **Scope:** Repository
- **Supersedes:** —
- **Superseded by:** —
- **Amended by:** [ADR 0011](0011-internal-entry-point.md) — § Internal only

## Context

The package's root entry is very large, and a meaningful share of it arrived
through `export * from` rather than through a decision. `API.md` already
classifies exports and a mechanical check already enforces that the surface
matches the contract — both good, and both preserved.

Two problems remain.

**Everything is implicitly stable.** A component published last week and a
component that has been unchanged for a year carry the same implied promise.
Consumers cannot distinguish them, so they either treat everything as stable
(and get broken) or treat nothing as stable (and pin to exact versions forever,
which defeats the purpose of a changelog).

**There is no way to ship something unfinished.** A new component either gets
published with a full stability promise before its shape is known, or it does not
ship at all and the consumer who needs it builds their own — which is the
duplication the ecosystem separation exists to prevent. The absence of a
provisional tier does not prevent immature APIs; it just prevents labelling them.

There is also a naming hazard already present. `src/_internal/` exists, but it is
a **build-time shim directory**, not a privacy mechanism. A future reader could
reasonably assume the underscore means "not public." It does not, and nothing
enforces that it would.

## Decision

**Every export carries exactly one stability tier, declared in `API.md`. An
undeclared export is a defect that fails the API check.**

### Stable

The default expectation. Changes follow the full deprecation procedure
([ADR 0006](0006-versioning-and-compatibility.md) § Deprecation).

An export becomes Stable when it has **all four**: complete documentation, unit
and accessibility tests, at least one real consumer, and a settled API shape.

"At least one real consumer" is deliberate. An API that has never been used by
anyone but its author has not been tested against the thing that actually breaks
APIs, which is someone else's problem.

### Preview

Available, documented as Preview everywhere it appears, and **may change in any
release including a patch**.

Three rules keep Preview from becoming a parking space:

1. Preview exports are named in the changelog on every change.
2. Consumers depending on Preview are told to pin exactly.
3. **An export at Preview across three consecutive minor releases is promoted to
   Stable or removed. There is no fourth option.** The graduation review is part
   of release approval, not a cleanup task.

Rule 3 is the load-bearing one. A provisional tier with no forced exit becomes a
way to avoid ever deciding: consumers depend on "temporary" APIs for years, at
which point removing them breaks people who were told not to rely on them, and
promoting them freezes a shape nobody ever defended.

### Internal

Not exported from any entry point. Not documented. No compatibility promise of
any kind.

**If it is reachable from an entry point, it is public, whatever it is named.**
Naming a module `_internal` does not make it private; not exporting it does. This
is stated flatly because the underscore convention is genuinely tempting and
genuinely useless — consumers import what resolves.

> **Amended by [ADR 0011](0011-internal-entry-point.md) (DH-2).** The rule above
> now reads *"if it is reachable from a **public** entry point."* DH-2's
> implementation found thirty-seven symbols the documentation application needs
> that are genuinely library code, genuinely not public API, and that the
> library itself depends on — so they could not move out either. The package
> therefore declares one non-public entry point, `@jheavner95/design/internal`,
> which carries no compatibility promise and which no application may import.
> Everything else in this ADR — the Stable and Preview tiers, the three-minor
> graduation rule, the declaration requirement — stands unchanged.

## Alternatives considered

### Alternative A — Two tiers: public and internal

Simpler, and simpler is usually right.

Rejected because it forces the choice this ADR exists to avoid: publish an
unfinished API with a full promise, or do not publish it. Both outcomes are bad,
and the second is worse than it looks — a consumer blocked on a missing component
does not wait, they build it locally, and the local version outlives the plan to
replace it.

### Alternative B — Four tiers, adding Deprecated

Deprecation is a state an export is in, so it could be a tier.

Rejected because it conflates an orthogonal dimension. A deprecated export still
has a stability tier — a deprecated Stable export keeps its promise until removal,
while a deprecated Preview export may vanish immediately. Making Deprecated a
tier loses that distinction. Deprecation is a **flag**, applied on top of a tier.

### Alternative C — Semantic versioning alone; no tiers

SemVer already communicates compatibility. Tiers could be redundant.

Rejected because SemVer describes what happened between two versions, not what a
consumer may rely on going forward. A consumer deciding whether to build on a
component needs to know its expected volatility **before** the next release, and
no version number carries that. Tiers are forward-looking; SemVer is backward-
looking. They answer different questions.

### Alternative D — Preview with a time limit rather than a release limit

"Six months in Preview, then decide."

Rejected because it decouples the deadline from the process that would enforce
it. Releases are where API decisions are already being made and approved; a
calendar deadline is a thing that arrives when nobody is looking at the API. Tying
graduation to three minors puts the decision in front of the person already
holding it.

## Consequences

### What this makes easier

- Consumers can distinguish "safe to build on" from "use at your own risk"
- New components can ship and get real usage before their shape is frozen
- The Stable tier means something, because entry into it has criteria
- Preview exports cannot rot indefinitely

### What this makes harder

- **Every export needs a tier decision**, including the several hundred that
  currently have none. That audit is DH-2 work and it will be tedious.
- **Preview graduation is a recurring obligation** at every release, and it is
  exactly the kind of recurring obligation that gets skipped under deadline.
- **Some exports will be removed** at graduation, which will annoy the consumers
  who used them despite the label.
- **Tier changes are themselves API events** and must be changelogged, which adds
  ceremony to what feels like an internal judgement.

### What this commits us to

- Auditing the existing root entry against these tiers and accepting that some of
  it should never have been exported
- Running the graduation review at every release, including inconvenient ones
- Documenting the tier everywhere an export appears — `API.md`, JSDoc, and the
  documentation product — because a consumer who discovers a Preview dependency
  by being broken has been failed by us, not by the label

## Enforcement

- **`api-check`** — mechanical. Every export is classified; an undeclared export
  fails the build. This check already exists and is the reason the tier system
  can be trusted at all.
- **`api-baseline/*.json`** — mechanical. A surface diff prompts a review of the
  version class.
- **Preview graduation** — governance obligation at release approval
  ([../contributing/governance.md](../contributing/governance.md) § 5). **Not
  mechanically enforced**, and worth saying so: a check that counts releases
  since a tier was assigned is buildable, and DH-2 should build it.
- **Tier assignment correctness** — review obligation. Whether a shape is
  "settled" is a judgement.

## References

- [../architecture/public-api.md](../architecture/public-api.md)
- [ADR 0006 — Versioning and compatibility](0006-versioning-and-compatibility.md)
- [../contributing/governance.md](../contributing/governance.md) § 5
