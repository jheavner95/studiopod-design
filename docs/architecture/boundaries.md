# Repository boundaries

**Owns:** the canonical answer to "does this belong in Design?"

Every ownership dispute in a design system is a variant of one question: _is this
the visual language, or is this one application's opinion?_ This document is the
tiebreaker.

---

## 1. The three owners

```
Foundation      What are the canonical design values?
Design          How should StudioPOD applications look and behave?
Applications    How does this product work?
```

Each question has exactly one repository that answers it. A concern answered in
two places is architectural debt that accrues interest silently: the second
implementation is always cheap, and the cost is paid later by whoever has to work
out which one is authoritative.

---

## 2. Foundation — `@studiopod/foundation`

**Owns**

- Raw token values — colour, spacing, type scale, radius, elevation, motion
  duration and easing
- Themes and mode definitions
- Icon and logo geometry as data
- Token provenance and metadata
- The generators that produce token artefacts
- Deterministic generation and artefact validation
- Contracts shared by more than one repository

**Does not own**

- Components of any kind
- React, Tailwind, Next.js, or any framework
- Semantic naming as it applies to interfaces
- Layout, patterns, or accessibility guidance

**The test:** if it would still be true if StudioPOD were rebuilt in a different
technology, it is Foundation's.

---

## 3. Design — `@studiopod/design` (this repository)

**Owns**

- Semantic token names and the Foundation token bridge
- Component primitives and their accessibility contracts
- Composed patterns — Workspace, Inspector, Table, Form, Navigation
- Brand compositions — page-section archetypes
- The illustration engine
- Motion primitives and reduced-motion handling
- Headless behaviour hooks
- The theme provider and the framework-capability adapters
- The documentation product and the playground
- Migration guidance and codemods
- Component APIs, versioning, and release

**Does not own**

- Any design value (Foundation's)
- Business workflows, authentication, tenancy, authorisation
- Application routing, data fetching, persistence, API clients
- Product feature logic
- Any application's page composition
- Feature flags and rollout

**The test:** if two different StudioPOD applications would both want it, and
neither would want to own it, it is Design's.

---

## 4. Applications — Cloud, Web, and everything after

**Own**

- Page and route composition
- Business workflows and product logic
- Authentication, tenancy, permissions, feature flags
- Data fetching, persistence, API integration
- Application-specific compositions of Design's exports
- Their own content

**Do not own**

- The visual language
- Reusable component primitives
- Design tokens
- Component documentation

**The test:** if it would be wrong for another StudioPOD application to inherit
it, it is the application's.

---

## 5. The hard cases

The easy cases never cause arguments. These are the ones that do.

### A component an application built that is generally useful

**It is promoted into Design.** Not copied — promoted. The application deletes
its copy and consumes the published one.

The failure mode this prevents is the one that killed the previous generation: a
component copied into a second application, both copies drift, and within a year
there is no answer to "which one is right." Promotion is more expensive on the
day and cheaper every day after.

The promotion path is in
[../contributing/governance.md](../contributing/governance.md) § 5.

### A component only one application will ever use

**It stays in the application.** Design is not a warehouse. A component with one
consumer and no plausible second one is an application composition, and putting
it here costs every other consumer a larger API surface to reason about for no
benefit.

Reasonable disagreement here is resolved by waiting: keep it in the application,
and promote it when a second consumer appears. The cost of waiting is one
copy-paste. The cost of promoting too early is a public API that must be
maintained forever for one caller.

### Marketing and brand compositions

**They stay in Design**, in the `./marketing` entry.

This is the call most likely to be challenged, so here is the reasoning. The
compositions — Hero, CTA, FeatureGrid, Comparison, Metrics, FAQ, Testimonial —
look like Web's page sections, and the obvious argument is that Web owns its own
pages. But they are not Web's pages; they are the **brand's** page grammar, and
brand expression is ecosystem-owned by the same logic that puts colour in
Foundation. Cloud has marketing-adjacent surfaces too — pricing, upgrade
prompts, onboarding, empty states — and a future customer portal will have more.
A second consumer is not hypothetical here; it is scheduled.

Two corrections follow, and they are DH-2 work:

1. **The entry is mis-scoped today.** `Empty`, `Workflow`, `Platform`, and
   `Timeline` ship from `./marketing` and are not marketing compositions. They
   are patterns, and they belong in the root entry.
2. **Brand compositions must stop being the reason the package couples to
   Next.js.** They are the sole source of the `next` peer dependency, via
   `next/link`. See [ADR 0007](../decisions/0007-framework-neutrality.md).

If, after those corrections, `./marketing` still has exactly one consumer in two
years, the decision should be revisited by ADR rather than defended out of habit.

### The illustration engine

**It stays in Design**, in the `./illustrations` entry, and it is the strongest
candidate for a future second package.

It is a genuinely separable concern with its own dependency weight, its own
release rhythm, and a consumer set that does not overlap the component library's.
It stays for now because subpath exports plus correct tree-shaking already give
consumers the isolation they need, and a second package costs a second release
process, a second version to reconcile, and a second changelog to read.

Revisit when either becomes true: the engine's dependencies diverge from the
library's, or its release cadence does. See [packages.md](packages.md) § 4.

### Something Foundation should own but does not yet

**Do not build it here as a stopgap.** A value implemented in Design "until
Foundation catches up" is a second canonical owner, and the temporary version
always outlives the plan to remove it.

Open the work in Foundation. If Design is blocked in the meantime, record the
block in the work package rather than routing around it.

---

## 6. Enforcement

| Rule                                        | How it is caught                                            |
| ------------------------------------------- | ----------------------------------------------------------- |
| No hand-edited token values                 | `token:bridge-check` — mechanical                           |
| No framework imports in the package         | Dependency check on the built bundle — mechanical           |
| No application concerns in the package      | Code review — convention, not mechanically enforced         |
| No upward imports between tiers             | Import boundary check — mechanical, DH-2                    |
| Promotion instead of duplication            | Code review in the **consuming** repository                 |

Two of these are review obligations rather than checks, and saying so is the
point: claiming enforcement that does not exist is worse than admitting a
convention.

---

## 7. References

- [ADR 0002 — Ecosystem architecture](../decisions/0002-ecosystem-architecture.md)
- [ADR 0004 — One published package](../decisions/0004-one-published-package.md)
- [ADR 0008 — Foundation is a build-time input](../decisions/0008-foundation-is-a-build-time-input.md)
- [overview.md](overview.md)
- [packages.md](packages.md)
