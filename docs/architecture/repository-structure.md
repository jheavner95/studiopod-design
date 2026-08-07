# Repository structure

**Owns:** the tree. Where everything lives, and why.

**DH-2 built this.** The top level, the package boundary and the workspace
mechanics below are the repository as it stands. Two things described here are
still target rather than fact, and are marked where they appear: the library's
internal tier layout (§ 2) and the removal of the banned directory names (§ 5).
Both are DH-3 work — see [../certification/DH-2.md](../certification/DH-2.md)
§ Remaining gaps.

---

## 1. The top level

```
studiopod-design/
├── packages/
│   └── design/               @studiopod/design — the published library
├── apps/
│   └── docs/                 the documentation product (a consumer)
├── docs/                     repository documentation — architecture, ADRs, certification
├── tooling/                  checks, generators, the verification runner
├── CONSTITUTION.md           binding
├── CLAUDE.md                 the working guide
└── README.md                 the front door
```

Four directories, each with a one-sentence charter:

| Directory    | Charter                                                                   |
| ------------ | ------------------------------------------------------------------------- |
| `packages/`  | Published artefacts. Code here ships to consumers.                        |
| `apps/`      | Deployed artefacts. Consume packages; are never consumed by them.         |
| `docs/`      | Documentation about this repository, for the people who build it.         |
| `tooling/`   | Everything that verifies or generates. Never shipped.                     |

The distinction between `apps/docs/` and `docs/` is the one people get wrong,
so it is stated in [../../CONSTITUTION.md](../../CONSTITUTION.md) Article
VII § 3: `apps/docs/` explains the design language to the ecosystem; `docs/`
explains the repository to its maintainers. A document in the wrong one is a
document with the wrong audience.

### Why `apps/docs` and not `documentation/`

DH-1 specified `documentation/`, arguing that `apps/` names a deployment shape
rather than a purpose. DH-2 changed it on implementation evidence:
`documentation/` and `docs/` differ by three characters, and every path in every
script, workflow, tsconfig and test then has to discriminate between two
directories that are both, in plain English, documentation. `apps/` also states
the thing that actually distinguishes the two workspace members — one is
published, one is deployed.

The distinction DH-1 cared about is kept; only the names changed.
[ADR 0012](../decisions/0012-workspace-layout.md).

---

## 2. Inside the package

```
packages/design/
├── src/
│   ├── index.ts              root entry — primitives and patterns
│   ├── marketing.ts          brand entry
│   ├── illustrations.ts      illustration entry
│   ├── tokens.ts             generated — do not hand-edit
│   ├── internal.ts           NOT public API — see ADR 0011
│   ├── styles.css            the stylesheet
│   │
│   ├── components/           ← today: ui, layout, form, feedback, navigation,
│   │                           overlay, table, metadata, motion, operational,
│   │                           workflow, illustration
│   ├── compositions/         ← today: the brand compositions
│   ├── illustrations/        the illustration engine
│   ├── motion/               duration, easing, transitions, reduced motion
│   ├── hooks/                ← banned name; see § 5
│   ├── providers/            the motion provider
│   ├── lib/                  ← banned name; see § 5
│   ├── styles/               the generated token stylesheets
│   └── capabilities/ platforms/ production/ workflows/   diagram engines
│
│   TARGET (DH-3, gap 8): the tiers below replace the layout above —
│     primitives/  patterns/  brand/  illustration/  motion/
│     behavior/    theme/     tokens/
│   DH-2 moved the source without reorganising it, deliberately: moving a file
│   into the wrong tier is an unintended API change, and doing both at once
│   would have made the migration unreviewable.
│
├── API.md                    the frozen public contract
├── CHANGELOG.md              consumer-facing release history
├── VERSIONING.md             the versioning policy
├── package.json
└── tsconfig.json             self-contained. No baseUrl outside the package.
```

**`tsconfig.json` resolves nothing outside `packages/design/`.** That single
constraint is what makes the boundary real: if the package cannot resolve the
documentation site, it cannot accidentally ship it, and no build plugin is needed
to undo the mistake.

### Import rules inside the package

**Today, enforced:** no module under `packages/design/src` may resolve anything
outside `packages/design`. `tooling/boundary-check.mjs` fails on a relative
path that climbs out of the package, and `packages/design/tsconfig.json` makes
it impossible anyway — its `baseUrl` is the package, so `@/…` cannot reach
further. That single line is ADR 0003's boundary.

**Target (DH-3, gap 8):** once the tiers above exist, dependencies point
downward within them too.

| Tier            | May import                                                    |
| --------------- | ------------------------------------------------------------- |
| `brand/`        | `patterns/`, `primitives/`, and the substrate                 |
| `patterns/`     | `primitives/` and the substrate                               |
| `primitives/`   | the substrate only                                            |
| `theme/`, `tokens/`, `motion/`, `behavior/` | each other, and nothing above    |

There is no allowlist and no exception short of an ADR.

### Component family layout

One directory per family, and the directory is the unit of ownership:

```
primitives/button/
├── Button.tsx
├── Button.test.tsx
├── Button.a11y.test.tsx
├── index.ts               the family's public surface
└── README.md              why this family exists, and its contract
```

`index.ts` is the family's entire public surface. A file not reachable from it
is internal to the family, and other families import the family, not its files.

---

## 3. Inside the documentation product

```
apps/docs/
├── src/
│   ├── app/                  routes — the information architecture
│   ├── components/docs/      the site's own documentation chrome
│   ├── components/layout/    GlobalNav, Footer — site chrome
│   ├── components/platform/  the platform demo compositions
│   ├── lib/                  the site's registries, contracts, and navigation
│   └── {workflows,capabilities,platforms,production}/examples/
│                             canned demo scenario data
├── e2e/                      Playwright visual regression
├── package.json              depends on @studiopod/design
└── next.config.ts
```

`GlobalNav` and `Footer` used to sit in the library's layout family, excluded
from the package by a build-time barrel shim and a hand-written comment in
`index.ts`. They are here now, so the exclusion is structural: they are in a
different package, and there is nothing left to exclude.

The information architecture of the site — what the routes are and why — is
owned by [documentation.md](documentation.md), not by this file.

---

## 4. Inside `tooling/`

```
tooling/
├── boundary-check.mjs        asserts the library/documentation separation
├── generators/               the Foundation token bridge
├── release/                  release-target resolution and registry checks
├── docs-coverage.mjs         documentation coverage
├── certification-report.mjs  component certification reporting
├── token-report.mjs          token hygiene
├── token-verification.ts     token hygiene, as a library
└── verify.mjs                the one verification runner
```

Every check is a standalone script with a single responsibility and a non-zero
exit code on failure.

**The package's own contract checks stay with the package**, in
`packages/design/scripts/` — `check-api`, `check-css`, `check-exports`,
`check-use-client`, `check-package-identity`. DH-1 anticipated moving them here;
DH-2 left them where they are, because they run from the package's own
`prepublishOnly` and a publish must not depend on a directory outside the thing
being published.

---

## 5. Banned directory names

`shared/` · `common/` · `core/` · `utils/` · `helpers/` · `misc/` · `lib/`

These are not stylistic preferences. Each one is a name that means "we did not
decide who owns this," and the contents reliably become the part of the
repository nobody can safely change.

The package still contains `lib/`, `hooks/`, and four `*/utils/` directories.
Rehoming them is **DH-3** work (gap 6) — DH-2 deliberately moved source without
renaming it. Two rows below are already done, because the split forced them:

| Currently                          | Goes to                                                       |
| ---------------------------------- | ------------------------------------------------------------- |
| `src/lib/utils.ts` (`cn`)          | `theme/class-names.ts`                                         |
| `src/lib/control-size.ts`, `spacing.ts`, `tone.ts` | `theme/`                                       |
| `src/lib/tokens.ts`, `token-verification.ts` | `tokens/`                                            |
| `lib/canonical.ts`, `showcase-registry.ts`, `docs-contracts.ts`, `design-system-navigation.ts`, `certification*.ts` | **done in DH-2** → `apps/docs/src/lib/` |
| `lib/token-verification.ts`, `release-*.test.ts` | **done in DH-2** → `tooling/`                 |
| `hooks/*`                          | `behavior/`, except motion hooks → `motion/`                   |
| `*/utils/`                         | into the family that owns the behaviour                        |

Note what the first two rows say: a meaningful fraction of what was `src/lib/`
was never library code at all — it was documentation-site tooling and
repository tooling sitting inside the library's resolution path. That is the
shared-source problem in miniature, and DH-2 removed it as a side effect of the
split rather than as a rename.

---

## 6. Workspace mechanics

The repository is an npm workspace with two members: `packages/design` and
`apps/docs`.

- **Dev dependencies live at the root.** Packages declare none.
- **One version per external dependency, repository-wide.**
- **The documentation site depends on the package by workspace reference**, and
  therefore exercises the package's real public surface — the same entry points,
  the same exports, the same `sideEffects` behaviour a published consumer gets.
  It also imports the stylesheet and declares the `@source` line every consumer
  must write, so a break in either is a build failure here first.

That last point is the underrated benefit, and it paid immediately. The
documentation build now runs against `dist/`, and on its first run it found
three defects the shared tree had hidden for as long as it existed: a component
documented under a name the package does not export, two same-named token
objects with different shapes, and `cn` being unusable from a server component.
None of them was findable before, because the site never touched the public API.
See [../certification/DH-2.md](../certification/DH-2.md) § Unexpected
discoveries.

---

## 7. References

- [ADR 0003 — The library owns its source](../decisions/0003-library-owns-its-source.md)
- [overview.md](overview.md)
- [packages.md](packages.md)
- [documentation.md](documentation.md)
