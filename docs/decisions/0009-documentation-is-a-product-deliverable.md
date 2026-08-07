# ADR 0009 — The documentation site is a product, not a demo

- **Status:** Accepted
- **Date:** 2026-08-06
- **Work package:** DH-1
- **Scope:** Repository
- **Supersedes:** —
- **Superseded by:** —

## Context

The repository contains a substantial Next.js documentation site — dozens of
routes, live examples, and a coverage script. It is treated as an implementation
artefact: something that exists to show the components, produced as a side effect
of building them.

That framing shows in the information architecture, and the symptoms are
specific:

- **Two top-level route groups, `docs/` and `documentation/`** — two names for
  one concept, and no way for a reader to know which is authoritative
- **`application-components/` holds 46 routes**, including twelve `foundation-*`
  pages. Foundations documented under "application components" is an inversion:
  the most fundamental material filed under the most specific heading
- **Top-level groupings named `core-components`, `application-components`,
  `marketing-components`** — organised by where a component came from, not by
  what a reader is looking for
- **Top-level route groups named `capabilities/`, `platforms/`, `production/`,
  `workflows/`** — these are **Cloud's** domain concepts. Design documenting
  them asserts ownership of an application's domain model
- **No Accessibility section.** The accessibility story is scattered through
  per-component notes
- **No Migration section**, although breaking changes exist
- **Examples import `@/components/...` directly**, so the site never exercises
  the published API

The fourth point is the most serious, and it is an ownership finding rather than
an IA one. Route groups named for Cloud's platforms mean Design has been
documenting an application's domain. Under Cloud ADR 0033 that is the inversion
the ecosystem separation exists to prevent — and it appeared in the information
architecture before it appeared in the code, which is typical.

The underlying cause is the framing. A demo is organised around what was built. A
product is organised around what a reader needs.

## Decision

**The documentation site is the canonical ecosystem reference for how StudioPOD
applications look and behave. It is a deliverable, not a by-product.**

This is deliberately broader than a component gallery. A Storybook answers "what
props does this take." This product answers: what is our visual language and why;
which component do I reach for and when do I not; what is the accessible way to
build this; what changed and how do I move.

### The information architecture

Eight sections, ordered as a reading order for someone new:

```
1. Foundations      What the language is made of — meaning, not values
2. Components       What you can use
3. Patterns         How to compose it
4. Accessibility    How to not exclude people
5. Playground       Try it
6. API              What you may depend on
7. Migration        How to move
8. Releases         What changed
```

Full specification, including the required sections of every component page:
[../architecture/documentation.md](../architecture/documentation.md).

### The rules

1. **Every Stable export has a page.** Checked mechanically.
2. **Every example renders the real published package.** An example that cannot
   be written against the public API has found an API gap, and the gap is the
   finding.
3. **Props are generated from source.** Hand-written prop tables go stale within
   two releases, and a stale prop table is worse than none because it is trusted.
4. **Documentation lands in the same commit as the change.**
5. **Nothing is documented twice.** The second copy is always the one that goes
   stale.
6. **Say what does not work.** Known gaps, limitations, and accessibility
   shortfalls are documented.

Rule 6 is the one that distinguishes a product from marketing material. A design
system whose documentation only describes success teaches consumers to distrust
it the first time they hit an edge — and they will hit an edge.

### Ownership correction

**Route groups named for application domain concepts are removed.**
`capabilities/`, `platforms/`, `production/`, and `workflows/` describe Cloud's
domain. Where the underlying components are genuinely general presentation
patterns, they are documented under Patterns with names that describe the
interface problem rather than Cloud's business model. Where they are not general,
they belong in Cloud.

## Alternatives considered

### Alternative A — Adopt Storybook

The industry default. Enormous ecosystem, addons for accessibility and visual
testing, and no bespoke site to maintain.

Rejected because Storybook is organised around components, and roughly half of
what this product must deliver is not. Foundations, Accessibility, Patterns, and
Migration are narrative documentation with embedded examples, not component
stories. Storybook can host documentation pages, but the tool's grain runs the
other way, and fighting it produces a worse result than building the site we
actually need.

The second reason is that the site is already built and is good. Replacing
working infrastructure to adopt a tool that fits half the requirement is a poor
trade.

**What Storybook does well and should be borrowed:** the controls/args pattern
for interactive prop exploration, and the discipline of a story per state. Both
belong in the Playground and in component examples.

### Alternative B — Keep it a demo; document properly in a separate wiki or site

Separate the narrative documentation from the component showcase.

Rejected because it splits the audience's attention and guarantees drift. A
reader looking at a Button page and wondering about its accessibility should not
have to leave for a different property. It also breaks the rule that
documentation lands with the change: a wiki is not in the commit.

### Alternative C — Generate everything from source

Props, examples, and prose all extracted from JSDoc.

Rejected for the prose. Generation is right for props and for the API section,
and rule 3 mandates it there. It is wrong for "when not to use this" and for
Patterns, which require judgement that does not live in a type annotation.
Over-generating produces documentation that is complete and useless.

### Alternative D — Version the documentation site

Maintain a site per major version, as many libraries do.

Rejected as premature. It is real infrastructure — build, hosting, routing,
search across versions — and it pays off only when consumers are routinely
several majors behind. If they are, that is the problem to fix. The Migration and
Releases sections cover the actual need, which is understanding what changed
between the version you have and the version you want.

Revisit if consumers legitimately need to stay on old majors for long periods.

## Consequences

### What this makes easier

- A new engineer can build a correct StudioPOD interface without asking anyone
- Ecosystem questions get settled by linking to a page rather than by a
  conversation
- The documentation build becomes an integration test of the published API
  ([ADR 0003](0003-library-owns-its-source.md))
- Accessibility gains a home, so it stops being a per-component footnote

### What this makes harder

- **Documentation becomes a release blocker.** A component without documentation
  does not ship, and that will be inconvenient at exactly the wrong moment.
- **The IA restructure is significant work** — dozens of routes move, and some
  content is deleted rather than moved.
- **Removing the application-domain route groups will feel like losing work.**
  Some of those pages are good; they are just in the wrong repository.
- **Narrative documentation cannot be generated**, so it is ongoing human effort
  that competes with building components.

### What this commits us to

- Documentation in the same commit, permanently
- Maintaining the narrative sections, which no tool will write
- Documenting known gaps honestly, including unflattering ones
- Keeping examples on the public API, which means an API gap blocks a
  documentation page rather than being worked around

## Enforcement

- **Documentation coverage check** — mechanical. Every Stable export has a page.
  The existing `docs:coverage` script is the seed of this.
- **Required-sections check** (DH-2) — mechanical. Every component page has all
  required sections.
- **Documentation build** — mechanical. The site builds against public entry
  points; a deep import fails to resolve.
- **Prop table generation** — structural. Generated tables cannot go stale.
- **Prose quality and "when not to use"** — review obligation. Not mechanically
  enforced beyond section presence, and a present-but-empty section is a review
  finding rather than a build failure.

## References

- [../architecture/documentation.md](../architecture/documentation.md)
- [ADR 0003 — The library owns its source](0003-library-owns-its-source.md)
- [../architecture/boundaries.md](../architecture/boundaries.md)
- [../product/success-metrics.md](../product/success-metrics.md) § 5
