@AGENTS.md

# Working in this repository

**Read [CONSTITUTION.md](CONSTITUTION.md) before making any change.** It is
short, it is binding, and it governs decisions that are not obvious from the
code.

This repository is `studiopod-design` — the StudioPOD visual language. It
publishes `@studiopod/design` and it owns the documentation product that the
whole ecosystem reads.

## Non-negotiables

- **Design never owns a design value.** Colour, spacing, type, motion, radius,
  and icon geometry come from `@studiopod/foundation` through the token bridge.
  A hand-edited generated token file fails `token:bridge-check`.
- **Components are public APIs.** Props, DOM contract, accessibility semantics,
  and behaviour are published contract. Changing them is a breaking change even
  when the types do not move.
- **An export exists because someone accepted it.** Public entries name their
  exports explicitly; `export *` is not how the API grows. A new export enters
  at `preview` and fails `package:api-check` until it is in the manifest
  ([ADR 0016](docs/decisions/0016-intentional-exports.md)).
- **A component exports its props type.** Consumers wrap components; a component
  they cannot type is a component they cannot wrap.
- **The library owns its source.** Library code lives under `packages/design`.
  The documentation site consumes the published package like any other consumer.
  `packages/design/tsconfig.json`'s `baseUrl` is the package — do not point it
  outward, and do not add a path alias from `apps/docs` into `packages/design`.
  `npm run boundary-check` fails on either.
  [ADR 0003](docs/decisions/0003-library-owns-its-source.md).
- **No `shared/`, `common/`, `core/`, `utils/`, `helpers/`, `misc/`, or `lib/`
  directories.** `packages/design/src/lib/`, `src/hooks/` and four `*/utils/`
  directories still exist. They are migration targets, not precedent.
- **No framework coupling in the package.** No `next/*`, no router, no data
  layer — `npm run package:framework-check` fails on any of them, in source,
  in the emitted output, or in the manifest. Framework capabilities are
  injected as props with plain-HTML defaults, never through context
  ([ADR 0013](docs/decisions/0013-framework-capabilities-are-props.md)).
- **Only genuinely interactive modules carry `"use client"`.** The package
  emits one module per source file so directives are per-module. Adding one
  where it is not needed fails `package:client-boundaries-check` just as loudly
  as omitting one where it is — over-marking is how N1 spread
  ([ADR 0014](docs/decisions/0014-preserve-modules-build.md)).
- **Accessibility regressions are breaking changes** and are released as such.
- **Documentation lands in the same commit as the change it describes.**
- **A decision that is expensive to reverse needs an ADR**, written before the
  work — see [docs/decisions/README.md](docs/decisions/README.md).
- **Never weaken a check to make a build green.** Fix the check in its own
  commit and say what the false positive was.

## Before you finish

```bash
npm run verify
```

This is the full gate chain, identical to CI. Do not report work as complete
until it passes. For component changes, visual and accessibility verification is
also required — [docs/engineering/quality-gates.md](docs/engineering/quality-gates.md).

## Where things are

| You need                          | Read                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| The rules                         | [CONSTITUTION.md](CONSTITUTION.md)                                                   |
| How the repository is shaped      | [docs/architecture/overview.md](docs/architecture/overview.md)                       |
| What belongs here vs elsewhere    | [docs/architecture/boundaries.md](docs/architecture/boundaries.md)                   |
| What we publish and why           | [docs/architecture/packages.md](docs/architecture/packages.md)                       |
| The tree                          | [docs/architecture/repository-structure.md](docs/architecture/repository-structure.md) |
| API tiers, SemVer, deprecation    | [docs/architecture/public-api.md](docs/architecture/public-api.md)                   |
| The documentation product         | [docs/architecture/documentation.md](docs/architecture/documentation.md)             |
| How releases happen               | [docs/engineering/publishing.md](docs/engineering/publishing.md)                     |
| What each gate proves             | [docs/engineering/quality-gates.md](docs/engineering/quality-gates.md)               |
| How consumers install and upgrade | [docs/consuming/README.md](docs/consuming/README.md)                                 |
| Who approves what                 | [docs/contributing/governance.md](docs/contributing/governance.md)                   |
| How success is measured           | [docs/product/success-metrics.md](docs/product/success-metrics.md)                   |
| Why something is the way it is    | [docs/decisions/](docs/decisions/README.md)                                           |

## Current state

DH-1 established the architecture. **DH-2 built the boundary at the centre of
it:** the published library and the documentation product are now separate
workspace members, the package compiles only its own source, and the two esbuild
resolver plugins that used to amputate documentation code out of the bundle are
deleted.

```
packages/design/   @studiopod/design — the published library
apps/docs/         @studiopod/docs — the documentation product, a consumer
docs/              repository documentation
tooling/           checks, generators, the verification runner
```

**The documentation site consumes the published package.** It has no alias into
library source. If you find yourself wanting one, that is the defect DH-2
removed — see [ADR 0003](docs/decisions/0003-library-owns-its-source.md).

**DH-3 made the package framework-independent.** `next` is no longer a peer
dependency, no library module imports a framework, and 392 of 538 emitted
modules (73%) are server-safe where previously every export was a client
reference. Both blockers Cloud named are gone.

**DH-5 made the API a designed contract.** Every export declares a stability
tier in `api-baseline/<entry>.json`, which ships in the package; 310 of 372 root
components export their props type; and the root entry names its exports
explicitly instead of aggregating them with `export *`.

Ten of DH-1's nineteen gaps plus N1 are closed. The rest are enumerated in
[docs/certification/DH-5.md](docs/certification/DH-5.md) § Remaining gaps —
most notably the component audit (whether all 876 root exports deserve to be
public) and the library's tier layout (gap 8).

Do not treat the current tree as precedent where it contradicts this
architecture.
