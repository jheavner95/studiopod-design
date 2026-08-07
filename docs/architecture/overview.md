# Architecture overview

**Owns:** the shape of this repository and the reasoning behind it.

If you read one document before working here, read
[CONSTITUTION.md](../../CONSTITUTION.md). This one explains how the constitution
turns into a tree.

---

## 1. What this repository is

`studiopod-design` is a **product**. It has consumers who did not write it,
release notes those consumers read before upgrading, and a version number that
means something.

It produces two artefacts:

| Artefact                | What it is                                                              | Who consumes it                       |
| ----------------------- | ----------------------------------------------------------------------- | ------------------------------------- |
| `@studiopod/design`     | The published npm package — the visual language as code                 | Cloud, Web, every future application  |
| The documentation site  | The canonical reference for how StudioPOD applications look and behave  | Engineers, designers, product         |

Both are deliverables. Neither is a by-product of the other.

The question this repository answers is: **how should StudioPOD applications look
and behave?**

It does not answer _what are the canonical design values_ (Foundation) or _how
does the product work_ (Cloud, Web).

---

## 2. The three tiers of the visual language

Everything the package exports sits in one of three tiers, and the tier
determines what it may depend on, how stable it is, and how it is documented.

```
brand/          Page-section archetypes. Composed, opinionated, marketing-facing.
   ↓
patterns/       Multi-primitive compositions with behaviour. Workspace, Inspector, Table.
   ↓
primitives/     The smallest reusable units. Button, Input, Badge, Stack.
   ↓
theme/ tokens/ motion/ behavior/     The substrate everything composes from.
```

**Dependencies point downward, always.** A primitive may not import a pattern. A
pattern may not import a brand composition. This is the same rule the ecosystem
uses, applied one level down, and for the same reason: an upward import means
the tier boundary has stopped describing anything.

The practical consequence intended: a consumer who imports one `Button` does not
transitively load the illustration engine, the brand compositions, or the motion
library. DH-2 removed the structural obstacle to that — the package no longer
compiles a foreign source tree — but the tiers below do not exist yet and
nothing measures the claim. Treat it as the design, not as a measured fact,
until DH-3 builds the tier boundary and the bundle-composition check.

### Why tiers rather than one flat component folder

A flat library cannot answer the question consumers actually ask, which is not
"what components exist" but **"what am I allowed to depend on, and how likely is
it to change?"** A `Button` and a `Hero` are not the same kind of object: one is
a decades-stable primitive, the other is a composition whose shape follows
marketing's needs. Giving them the same stability promise means either
over-freezing the composition or under-promising the primitive.

---

## 3. The substrate

Four concerns sit beneath the component tiers. None of them is a utility bucket;
each has a stated owner and a stated boundary.

| Concern     | Owns                                                                  | Does not own                                  |
| ----------- | --------------------------------------------------------------------- | --------------------------------------------- |
| `tokens/`   | The generated semantic projection of Foundation values                | Any value. Values are Foundation's.           |
| `theme/`    | The provider, theming, the link adapter, class composition            | Component-specific styling                    |
| `motion/`   | Duration, easing, transition primitives, reduced-motion handling      | Component-specific animation choreography     |
| `behavior/` | Headless hooks — behaviour with no presentation                       | Anything that renders                         |

`behavior/` is the one that needs defending. It is not "the hooks folder" — it is
the tier where interaction logic lives **without a visual commitment**, so that
`useEditSession`, `useFocusTrap`, and `useOutsideClick` can be consumed directly
by an application that needs the behaviour and not our markup. That is a design
system concern, not a technical convenience, and it is the reason the directory
survives Article IV § 4's ban on utility folders.

---

## 4. Where the boundary sits

Design sits in the middle of a three-repository dependency chain and is bound in
both directions.

```
@studiopod/foundation ──► studiopod-design ──► studiopod-cloud
   (build-time input)         (this repo)         studiopod-web
                                                  (runtime consumers)
```

**Upward:** Foundation's values enter through a generator at build time, not
through a runtime dependency. Design's CSS ships with Foundation's values already
baked in. This has a real cost — a Foundation token change requires a Design
release to reach applications — and it is accepted deliberately.
[ADR 0008](../decisions/0008-foundation-is-a-build-time-input.md).

**Downward:** Design knows nothing about its consumers. There is no Cloud-shaped
export, no Web-shaped export, and no conditional behaviour keyed on who is
importing. A consumer's need that cannot be expressed as a general capability is
a need the consumer owns.

Full ownership table: [boundaries.md](boundaries.md).

---

## 5. The repository is not the package

This is the distinction the tree got wrong until DH-2, and it is worth stating
plainly.

```
studiopod-design/            the repository — a workspace
├── packages/design/         the package — @studiopod/design
├── apps/docs/               the documentation product — a consumer
├── docs/                    repository documentation — this file
└── tooling/                 checks and generators
```

The repository contains the package. The repository is not the package. Code
that lives in the repository is not thereby shipped, and code that is shipped
lives in exactly one place.

Until DH-2 this was not true. `packages/design-system/tsconfig.json` set
`baseUrl: "../.."` and resolved `@/*` into the documentation site's `src/`, so
the published package compiled the documentation site, and two esbuild resolver
plugins in `tsup.config.ts` existed solely to cut documentation chrome back out
of the bundle afterwards. Those plugins were the boundary, hand-implemented, per
barrel — and they only caught the barrels someone remembered.

DH-2 gave the library its own source tree and deleted both plugins.
`packages/design/tsconfig.json` now sets `baseUrl: "."`, and
`tooling/boundary-check.mjs` fails the build if that ever changes, if library
source resolves outside the package, if documentation source reaches into
library source, or if a documentation identifier appears in the bundle.

[repository-structure.md](repository-structure.md) is the tree.
[ADR 0003](../decisions/0003-library-owns-its-source.md) records the decision;
[../certification/DH-2.md](../certification/DH-2.md) records the migration.

---

## 6. What is deliberately not here

| Not here                        | Where it lives | Why                                                          |
| ------------------------------- | -------------- | ------------------------------------------------------------ |
| Token values                    | Foundation     | One canonical owner of the brand                             |
| Icons and logos as data         | Foundation     | Framework-neutral brand assets                               |
| Authentication, tenancy, routing| Applications   | Product behaviour, not visual language                       |
| API clients, persistence        | Applications   | Design renders; it does not fetch                            |
| Page composition                | Applications   | A page is a product decision                                 |
| Feature flags                   | Applications   | Rollout is a product concern                                 |

A component in this repository that reads application state, calls an API, or
knows a route's name is misfiled, and the fix is to move it, not to approve it.

---

## 7. Reading order

1. [CONSTITUTION.md](../../CONSTITUTION.md) — the rules
2. [boundaries.md](boundaries.md) — what belongs here
3. [packages.md](packages.md) — what we publish
4. [public-api.md](public-api.md) — what stability means
5. [repository-structure.md](repository-structure.md) — the tree
6. [documentation.md](documentation.md) — the documentation product
