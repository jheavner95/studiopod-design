# ADR 0001 — Design is a product, not an implementation detail

- **Status:** Accepted
- **Date:** 2026-08-06
- **Work package:** DH-1
- **Scope:** Repository
- **Supersedes:** —
- **Superseded by:** —

## Context

`studiopod-design` began as the implementation surface for one application's
interface. It accumulated roughly 560 component files, a documentation site, a
published package, and thirty work-package reports, and it did so while its
primary question was "what does the application need this week."

That framing produced a repository with real capability and no stated identity.
Concretely, it shows up as:

- A package whose source is the documentation site's source, because nothing ever
  required them to be different things
- A root entry point that grew by `export * from` rather than by decision
- A framework coupling (`next`) that one consumer needed and every consumer now
  pays for
- Documentation route groups named for another repository's domain concepts

None of these is a mistake anyone made. Each is what happens when a repository
serves a caller instead of serving a purpose.

Meanwhile the ecosystem changed underneath it. StudioPOD is now four repositories
with separated ownership, and Design has consumers — Cloud, Web, and more later —
that do not share its release schedule and cannot see its reasoning.

A repository with external consumers and no stated identity does not stay
coherent. It becomes the union of what its callers asked for.

## Decision

**`studiopod-design` is a product.** It is independently versioned, independently
released, independently documented, and consumed by applications that did not
write it.

Concretely, this means four things bind from now on:

1. **A change must be justifiable to every consumer**, not to one. A change
   defensible only by what one application needs this week is an application
   change, and it goes back to the application.
2. **The version number means something.** Consumers make decisions on it. See
   [ADR 0006](0006-versioning-and-compatibility.md).
3. **The documentation is a deliverable**, not a demo of the code. See
   [ADR 0009](0009-documentation-is-a-product-deliverable.md).
4. **Consumers are protected by contract**, not by our attention. See
   [ADR 0005](0005-public-api-tiers.md).

This ADR ratifies [CONSTITUTION.md](../../CONSTITUTION.md), which states the
principles that follow from it.

## Alternatives considered

### Alternative A — Keep Design as a component library serving Cloud

The status quo, stated honestly: Design exists because Cloud needs components,
and Cloud's needs set the agenda.

Plausible because it is simpler, faster in the short term, and matches how the
repository already behaves. It requires no versioning discipline, no deprecation
windows, and no API contract, because there is effectively one caller.

Rejected on the evidence already visible. Web is a consumer today and did not get
a vote in the `next` coupling. Cloud declined to consume the package **for
reasons that are entirely consequences of this model** — a marketing surface it
does not want and a framework dependency it did not choose. A design system
shaped by one caller is a design system the second caller cannot use, and by the
time that is discovered the shape is expensive to change.

### Alternative B — Make Design a design-token and style-only product, with each application owning components

Plausible: it removes the hardest coordination problem, which is component API
evolution across independent consumers. Foundation already proves the model works
for values.

Rejected because it relocates the duplication rather than removing it. Every
application would implement its own `Button`, and within a year "how should
StudioPOD applications look and behave" would have as many answers as there are
applications. That is the failure the previous generation already demonstrated,
at cost, and it is the failure the ecosystem separation exists to prevent.

### Alternative C — Publish nothing; consume Design as a git submodule or source dependency

Plausible because it removes registry infrastructure and lets consumers see the
source.

Rejected because it removes the version boundary, which is the mechanism that
makes any of the rest work. A source dependency has no release, therefore no
changelog, therefore no way for a consumer to decide whether to take a change —
and every consumer ends up pinned to a commit hash nobody can reason about.

## Consequences

### What this makes easier

- Consumers can adopt Design without inheriting one application's decisions
- Breaking changes become manageable events instead of surprises
- The question "does this belong here" has an answer that does not depend on who
  is asking
- Adding a fifth or sixth StudioPOD application becomes routine

### What this makes harder

- **Everything is slower.** A component that would have taken an afternoon in an
  application takes a proposal, an API review, documentation, accessibility
  tests, and a release.
- **Some changes are simply not allowed**, and the person who wants them is not
  wrong — they are just asking the wrong repository.
- **Coordination cost is real and permanent.** A change that spans Design and a
  consumer is now two repositories and two releases.
- **The existing tree does not conform**, and closing that gap is work with no
  visible feature output.

These costs are accepted. They are the price of the second consumer, and the
second consumer already exists.

### What this commits us to

- Maintaining a public API contract indefinitely
- Deprecation windows and migration paths for every removal
- Documentation as a permanent obligation, not a phase
- Saying no to changes that serve one consumer, including when that consumer is
  the loudest one

## Enforcement

- The constitution is binding on review — [Article I](../../CONSTITUTION.md#article-i--purpose-and-authority)
- The API check makes the export surface a contract rather than an intention
- Documentation coverage is checked mechanically
- **The rest is review obligation**, not mechanical. "Is this justifiable to
  every consumer" cannot be checked by a script, and claiming otherwise would be
  worse than admitting it.

## References

- [CONSTITUTION.md](../../CONSTITUTION.md)
- [ADR 0002 — Ecosystem architecture](0002-ecosystem-architecture.md)
- [ADR 0005 — Public API tiers](0005-public-api-tiers.md)
- [ADR 0009 — Documentation is a product deliverable](0009-documentation-is-a-product-deliverable.md)
- Cloud ADR 0033 — StudioPOD ecosystem architecture
