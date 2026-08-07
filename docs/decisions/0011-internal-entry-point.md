# ADR 0011 — An internal entry point for the documentation application

- **Status:** Accepted
- **Date:** 2026-08-07
- **Work package:** DH-2
- **Scope:** Repository
- **Supersedes:** —
- **Superseded by:** —

> **Amends [ADR 0005](0005-public-api-tiers.md) § Internal.** That ADR states
> "if it is reachable from an entry point, it is public, whatever it is named."
> DH-2's implementation proved the rule too strong for exactly one consumer.
> This ADR narrows it; the rest of ADR 0005 stands unchanged.

## Context

[ADR 0003](0003-library-owns-its-source.md) required the documentation
application to consume `@studiopod/design` rather than reach into library
source. Implementing that in DH-2 surfaced a case ADR 0005 had not anticipated.

The documentation product does not only document the public API. It documents
the **design system**, which is a larger thing. Concretely, it has pages that
demonstrate the motion engine's primitives and easing vocabulary, and a
playground that uses the illustration-authoring debug overlay.

Those symbols are deliberately **not public**. RM-5.5 removed roughly thirty
motion-engine exports and four illustration dev-tooling exports from the root
entry precisely because they are engine internals rather than consumer-facing
API. That was a good decision and DH-2 does not reverse it.

The modules cannot move into the documentation application either, because the
library depends on them. Measured, not assumed: twenty-one library modules
across overlay, feedback, illustration, workflow, platform, production and
capability families import motion primitives (`Expand`, `Progress`, `Activate`,
`Pulse`, `transition`), and the capability diagram components reach the
illustration dev context through the illustrations barrel.

So the documentation site needs thirty-seven symbols that are (a) genuinely
library code, (b) genuinely not public API, and (c) genuinely required for the
documentation product to document what it exists to document.

Under ADR 0005 as written there was no legal move. Every option violated
something.

## Decision

**The package declares one additional entry point, `@studiopod/design/internal`,
which carries no compatibility promise and which no application may import.**

Concretely:

1. It exports the motion engine, the illustration dev context, and the
   control-sizing class constants — and nothing else without review.
2. It is **not** part of the frozen contract in `API.md`, not covered by the
   versioning policy in [ADR 0006](0006-versioning-and-compatibility.md), and
   has no API baseline gate. Anything in it may change in any release,
   including a patch.
3. **Only `@studiopod/docs` may import it.** Cloud, Web, and every future
   application use the four public entries. This is a review obligation today;
   see § Enforcement.
4. Adding to it requires the same review as a public export, and the standing
   expectation is that it **shrinks**. Every symbol in it is either a future
   public export or a documentation page reaching for something it should not
   need.

**ADR 0005 § Internal is amended** to: *an export reachable from a public entry
point is public. The `internal` entry point is not a public entry point, and
reachability through it confers no promise.*

The rest of ADR 0005 — the Stable and Preview tiers, the three-minor
graduation rule, the declaration requirement — is untouched.

## Alternatives considered

### Alternative A — Widen the public API

Export the motion engine and the dev overlay from the root entry.

Rejected. It reverses a deliberate RM-5.5 decision, permanently, for one
consumer's benefit — and it is the expensive direction: thirty-seven exports
added to the frozen contract, each then owed documentation, tests,
accessibility coverage, deprecation windows and a migration path forever. The
documentation site's convenience is not a reason to enlarge what Cloud and Web
must reason about.

### Alternative B — Let the documentation site keep a source alias for these modules

A path mapping into `packages/design/src` scoped to just the internal modules.

Rejected. It is the defect [ADR 0003](0003-library-owns-its-source.md) exists to
remove, reintroduced at smaller scale — and scale is not the property that made
it a defect. A source alias means shared compilation, means the documentation
site can pull in library modules the package never chose to emit, and means the
"no aliases into library internals" line has an exception that the next case
will widen.

### Alternative C — Duplicate the modules in the documentation application

Copy the motion engine and dev overlay into the docs app.

Rejected outright. The library depends on them, so this creates two motion
engines that must stay in step — the parallel-implementation failure the
constitution's whole Article II exists to prevent, and one that would drift
within a release or two.

### Alternative D — Move the documentation pages that need internals into the package

Let the package own the pages that document its own engine.

Rejected. It inverts the dependency the wrong way and re-merges the two things
DH-2 just separated. It would also mean the package ships documentation pages,
which is precisely what the deleted esbuild shims existed to prevent.

### Alternative E — Do not document the motion engine

The narrowest reading of "document the public API only."

Rejected because it makes the documentation product worse to preserve a rule's
tidiness. The motion engine is how animation works across the system; an
engineer asking "what easing should this use" needs that page. A design system
whose documentation cannot explain its own motion vocabulary has solved a
governance problem by creating a comprehension one.

## Consequences

### What this makes easier

- The documentation application consumes the package for **everything**, with
  no source alias and no shared compilation
- The public API stays exactly as it was — DH-2 changed the export surface by
  zero symbols, verified against the API baseline
- The set of internals the documentation site depends on becomes an explicit,
  reviewable list instead of unrestricted reach

### What this makes harder

- **There is now a door in the package wall.** It is labelled, but it exists,
  and a future consumer could import it. Nothing in the package prevents that
  today.
- **The rule is more complicated to state.** "Reachable means public, except
  through this one entry" is a worse sentence than what ADR 0005 had.
- **It can rot.** An entry with no baseline and no versioning policy is an
  entry nobody is forced to look at. The shrink expectation is a convention,
  and conventions decay.

### What this commits us to

- Keeping the entry small, and reviewing additions as seriously as public ones
- Reviewing it at every release alongside Preview graduation — a symbol that
  has been there a year is a question, not a fixture
- Building the enforcement in § Enforcement rather than leaving it a convention
- Treating any external consumer's need for an internal symbol as a signal to
  promote it properly, never as a reason to point them at this door

## Enforcement

- **`tooling/boundary-check.mjs`** — mechanical. The documentation application
  may import only from the declared entry points; a deep import fails.
- **`check-exports`** — mechanical. The entry resolves and ships.
- **`check-use-client`** — mechanical. `internal.js` carries the directive, as
  it must: it exports context providers and framer-motion primitives.
- **"Only the documentation app may import it"** — **not mechanically
  enforced.** Nothing stops Cloud or Web from importing it today. A check that
  fails when any workspace other than `@studiopod/docs` names the entry is
  buildable and small, and not building it is a known gap recorded in
  [../certification/DH-2.md](../certification/DH-2.md) § Remaining gaps.
- **The shrink expectation** — convention only.

## References

- [ADR 0003 — The library owns its source](0003-library-owns-its-source.md)
- [ADR 0005 — Public API tiers](0005-public-api-tiers.md) — amended by this ADR
- [../architecture/packages.md](../architecture/packages.md)
- [../certification/DH-2.md](../certification/DH-2.md)
- `packages/design/src/internal.ts` — the entry, and the reasoning at its head
