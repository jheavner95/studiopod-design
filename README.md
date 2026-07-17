# StudioPOD Design System

The shared design language of StudioPOD, the Production Operating System — one source of truth for tokens, components, patterns, and application composition, consumed by both the marketing site and the product. This repository is the documentation site itself and the source of `@studiopod/design-system`, the package both surfaces build from, so a button, a table, or a workflow diagram looks, behaves, and composes the same way wherever it appears.

It exists because building each surface with its own one-off components produces exactly the drift a shared system is meant to prevent: two teams solving the same interaction problem twice, and a product that looks like several different products stitched together. Everything here is built so that doesn't happen — one layered set of primitives, engines, and patterns, documented and verified in the open.

## Core philosophy

- **Production-first.** Every component here is built to ship in a real product screen, not just to look good in isolation on a docs page.
- **Reusable by construction.** Higher-level pieces (patterns, application compositions) are always built by composing lower-level primitives — never by duplicating them.
- **Accessibility-first.** Keyboard operability, focus handling, and reduced-motion support are part of a component's definition, not an afterthought added later.
- **Documentation-driven.** The documentation site is not a wrapper around the components — it's built from the same registry and contracts the components themselves are held to, so the docs can't silently drift from what's real.
- **One system, two surfaces.** The same primitives, patterns, and architecture are used across StudioPOD's marketing site and its application — not two related-but-different component sets.

## What's here

- **Design tokens** — color, typography, spacing, radius, shadow, and motion values as the single source every other layer builds on.
- **Components** — the shared UI kit: layout, navigation, data display, forms, overlays, feedback, search and filter, inspector and property editing, and workflow/process primitives.
- **Patterns** — reusable compositions for recurring problems: platform templates and the process-diagram library.
- **Application composition** — real domain platforms (Production, Product, Publishing, Commerce, Intelligence, Operations, Administration, Integrations) assembled from the same component and pattern layers, as evidence the system produces real screens, not just isolated examples.
- **Documentation site** — the Next.js app in this repository, with a page for every documented component family, pattern, and architectural relationship.
- **Playground** — interactive exploration tools for the token, motion, and illustration engines, kept separate from reference documentation.
- **Accessibility** — automated `axe-core` checks as part of the standard test suite, not a separate manual pass.
- **Testing** — Vitest and Testing Library for component behavior, Playwright for real-browser visual regression.
- **Verification** — one consolidated `verify`/`verify:fast`/`verify:full` pipeline covering typecheck, lint, tests, build, and package integrity — the same commands CI runs.
- **Certification** — a canonical checklist and per-component registry for tracking production-readiness, distinguishing automated checks from the ones that genuinely require human review.

## Repository structure

```
src/app/                 The documentation site itself — one route per section (see docs/DOCUMENTATION.md)
src/components/          Component families: ui, layout, navigation, table, form, overlay,
                          feedback, metadata, docs, operational, workflow, platform
src/motion/               The motion engine — semantic timing/easing tokens and primitives
src/illustrations/        The data-driven diagram engine (nodes, connections, layout)
src/workflows/            Workflow diagram library, built on the illustration engine
src/platforms/            Platform architecture diagram library
src/production/           Production & validation diagram library
src/capabilities/         Capability/provider diagram library
src/compositions/         Reusable marketing page-section compositions
src/lib/                  Canonical demo data, the navigation registry, page contracts,
                          and the showcase-registry pattern for example metadata
packages/design-system/   The publishable @studiopod/design-system npm package —
                          built from this repo's own src/ (see its own README)
docs/                     Contributor guides (testing, verification, documentation,
                          distribution) and docs/engineering-notes/ (architecture history)
test/                     Shared Vitest utilities (render, accessibility, fixtures)
e2e/                      Playwright visual-regression specs
scripts/                  Verification runner and documentation-coverage reporting
```

## Quick start

```bash
# Install
npm install

# Development
npm run dev              # start the docs site at http://localhost:3000

# Build
npm run build             # production build (Next.js)

# Verification
npm run verify:fast       # typecheck + lint + tests — the fast, constant-use command
npm run verify             # verify:fast + build + package verification — the pre-merge gate
npm run verify:full        # verify + package pack integrity — the most complete local check

# Testing
npm test                   # Vitest — component behavior and accessibility
npm run test:watch          # Vitest, watch mode
npm run test:e2e             # Playwright — visual regression (local only; see docs/TESTING.md)
```

See [docs/VERIFICATION.md](./docs/VERIFICATION.md) for what each command checks and why they're layered this way.

## Documentation

This repository's own documentation site (run `npm run dev` and visit `/documentation`) is the primary reference for components, patterns, and architecture. Contributor-facing guides live in `docs/`:

- [docs/DOCUMENTATION.md](./docs/DOCUMENTATION.md) — how pages, related-links, and example data register themselves, and what's validated automatically
- [docs/TESTING.md](./docs/TESTING.md) — testing philosophy, conventions, and how to add a test
- [docs/VERIFICATION.md](./docs/VERIFICATION.md) — the verification pipeline, its layers, and CI behavior
- [docs/DISTRIBUTION.md](./docs/DISTRIBUTION.md) — how `@studiopod/design-system` is versioned and released
- [docs/TOKENS.md](./docs/TOKENS.md) — the token architecture: hierarchy, ownership, naming, adding/deprecating a token, consumer imports
- [docs/CERTIFICATION.md](./docs/CERTIFICATION.md) — the production-readiness checklist and how a component earns Certified status
- [docs/engineering-notes/](./docs/engineering-notes/) — the architectural record of how this system was built, including findings, tradeoffs, and decisions later phases relied on

## Contributing

This project is not yet accepting external contributions in a structured way — that workflow is still being defined. If you've found an issue or have a suggestion, open a GitHub issue in the meantime. This section will expand once a contribution process exists.

## License

[MIT](./LICENSE).

## Closing

StudioPOD is a Production Operating System, not a design system alone, a workflow tool, or a UI library — and this repository is what keeps its design language coherent as that system grows. Every layer here exists so a new screen gets built by composing what already exists, correctly, rather than by reinventing it.
