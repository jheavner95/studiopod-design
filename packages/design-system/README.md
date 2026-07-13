# @studiopod/design-system

StudioPOD's shared design system: tokens, UI/layout/form/feedback/navigation/overlay/table/metadata primitives, motion and illustration engines, and marketing compositions — for the StudioPOD Web and App products.

**Status: RM-5.5, API frozen.** The public export surface is audited, classified, and frozen (see `API.md`) ahead of `studiopod-web` adopting it in RM-6. The package builds, packs, and has been verified against disposable local consumer fixtures under **both** React 19/Next 16 and React 18/Next 14. It is **not published to any registry** and **not yet connected to studiopod-web or paws-bones-studio**.

## Purpose

`studiopod-web` and (eventually) `paws-bones-studio` currently maintain their own local, duplicated copies of design-system primitives. This package is the real, distributable source those duplicates are meant to be replaced by, so both products consume one shared implementation instead of two independently drifting ones.

## Public entry points

| Import | Contents |
|---|---|
| `@studiopod/design-system` | Core UI/layout/form/feedback/navigation/overlay/table/metadata primitives, the motion engine, the operational and workflow component families, shared hooks/providers, and `cn()`. |
| `@studiopod/design-system/tokens` | JS-side motion/z-index token constants (durations, easings, z-index scale). Raw values, no application-specific theme config. |
| `@studiopod/design-system/marketing` | The 11 canonical marketing composition components (Hero, CTA, FeatureGrid, Comparison, Metrics, Timeline, FAQ, Testimonial, Empty, Workflow, Platform). |
| `@studiopod/design-system/illustrations` | The illustration engine plus the workflow/platform/production/capability diagram-engine libraries, merged into one entry point. Depends on the root entry point for some UI/motion primitives — not fully self-contained, and that's expected. |
| `@studiopod/design-system/styles.css` | The canonical token CSS (palette, semantic theme tokens, typography, small utility classes) as one file. Import this alongside your own `@import "tailwindcss";` — Tailwind v4 discovers the `@theme` block inside via your own app's build. |

Every JS entry ships a `.d.ts` alongside it; TypeScript resolves types automatically.

Representative imports:

```ts
import { Button, Card, DataGrid } from "@studiopod/design-system";
import { motionDuration, motionEase } from "@studiopod/design-system/tokens";
import { HeroComposition, CTAComposition } from "@studiopod/design-system/marketing";
import { WorkflowDiagram, AnimatedNode } from "@studiopod/design-system/illustrations";
import "@studiopod/design-system/styles.css";
```

## Public stability policy

See `API.md` for the full, frozen export contract (per-family classification, marketing/illustrations/tokens/CSS/dependency contracts) and `VERSIONING.md` for the semantic versioning and deprecation rules. In short:

- **Stable public** (`ui`, `layout`, `form`, `feedback`, `navigation`, `overlay`, `table`, `metadata`, `motion` composition components, `hooks`, `providers`, `cn`, the marketing entry, the tokens entry, and the illustration-engine/`components/illustration` part of the illustrations entry): safe to build against long-term.
- **Public but experimental** (`operational`, `workflow`, and the `workflows`/`platforms`/`production`/`capabilities` part of the illustrations entry): exported and usable now, but expect more naming/shape churn here than in the stable set — these haven't yet been proven with a second real consumer.
- **Internal, not exported**: `src/components/platform/**` (never exported — confirmed almost entirely one-line aliases), the `@/motion` low-level engine (bundled where needed, not part of the public surface as of RM-5.5), and the illustration engine's `dev` debug-overlay tooling (same).
- All consumer-visible breaking changes — including pre-1.0 — are treated with major-version discipline. See `VERSIONING.md`.

## Local build

```bash
# from the studiopod-design repo root
npm run package:build       # tsup — ESM output + type declarations + CSS
npm run package:typecheck   # standalone tsc check
npm run package:api-check   # verify the export surface matches api-baseline/*.json
npm run package:css-check   # verify dist/styles.css still contains the @theme block + canonical tokens (see below)
npm run package:use-client-check  # verify index/marketing/illustrations still begin with "use client" (see below)
```

Output goes to `packages/design-system/dist/`. Nothing here modifies the repo's own documentation app or its build.

## Local pack

```bash
npm run package:pack     # npm pack ./packages/design-system → a .tgz in packages/design-system/
npm run package:inspect  # list the tarball's contents
```

## Installing from a tarball (pre-registry)

Until this package is published, consumers install directly from the generated tarball:

```bash
npm install /absolute/path/to/studiopod-design-system-0.1.0.tgz
```

or, once the tarball is hosted somewhere reachable by both repos, via a `file:` reference in `package.json`. **Do not** use a `file:` reference to a relative path across repos in production — that's an unpublished local hack. This is fine for local verification only.

## Peer dependencies

| Package | Range | Why |
|---|---|---|
| `react` | `^18.0.0 \|\| ^19.0.0` | Supports both known consumers (studiopod-web on 19, paws-bones-studio on 18). Not bundled. |
| `react-dom` | `^18.0.0 \|\| ^19.0.0` | Same. Not bundled. |
| `next` | `>=14.0.0` | Several exported components (`Button`, `NavigationItem`, `Breadcrumbs`, `RelationshipList`, `AssetThumbnail`, `QueueWidget`) genuinely use `next/link`, `next/navigation`, or `next/image`. Both known consumers are Next.js apps. |

`class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, and `framer-motion` are regular `dependencies` — implementation details a consumer doesn't need to manage directly.

## CSS

Import `@studiopod/design-system/styles.css` once, wherever your app's own Tailwind entry CSS lives, alongside your own `@import "tailwindcss";`. This package does not run Tailwind's compiler itself — the CSS is a plain concatenation of the canonical token files, and your app's own Tailwind v4 build discovers the `@theme` block inside via the normal import graph, exactly as this repo's own app does today.

This package ships its own empty `postcss.config.mjs` for exactly this reason: `tsup`'s bundled PostCSS integration walks up the directory tree looking for a config, and without a package-local one it would find and apply this repo's own (Tailwind-enabled) root config while building `styles.css` in isolation — silently pruning the entire `@theme` block as "unused" content. `npm run package:css-check` guards against this regressing.

## Client components

`index`, `marketing`, and `illustrations` export real client components (hooks, context providers, framer-motion primitives) and must carry a `"use client"` directive so Next.js App Router consumers don't try to run them as Server Components. Because `tsup.config.ts` sets `treeshake: true`, esbuild drops any module-level directive prologue during bundling — even one placed as the literal first line of an entry's own source — so `scripts/inject-use-client.mjs` (wired in via `onSuccess`) prepends it as plain text after the build finishes. `dist/tokens.js` is deliberately excluded (pure constants, no React import). `npm run package:use-client-check` guards against this regressing.

## What's intentionally excluded

- `src/components/platform/**` — confirmed (RM-1, reconfirmed RM-5.5) to be almost entirely one-line aliases of `operational`/`workflow` under domain-flavored names; kept in the app as internal documentation-gallery support (RM-5.5's approved platform decision), but never exported and never to be adopted by Web or App directly. Its removal/rewrite is deferred to a future RM-5.5-adjacent phase.
- `src/app/**` — documentation/example/gallery/certification routes, not package exports.
- `src/components/docs/**` — documentation-site chrome, internal tooling only.
- `GlobalNav`/`Footer` (from `src/components/layout`) — app-shell chrome that imports doc-site nav config; excluded from the package build via a scoped esbuild alias rather than by editing the canonical barrel (which the live documentation app still depends on).
- The `@/motion` low-level engine and the illustration engine's `dev` debug-overlay tooling — reclassified internal in RM-5.5's API freeze; both remain bundled where still needed but are no longer part of the public export surface. See `API.md` and `CHANGELOG.md`.
- `src/app/application-components/business-features/production-workspace/**` — deleted in RM-5 after documentation capture; never was a candidate for export.
- `src/lib/canonical.ts` and the `examples/` subfolders inside `workflows`/`platforms`/`production`/`capabilities` — documentation-site demo/mock data, not reusable presentation code.
- Business logic, API clients, repository access, authentication, routing/application state — none of the source folders exported here contain any.

## Portability caveats

See `API.md`'s "Portability caveats" section for the full list (7 items, including `useBodyLock`'s `#app-root` assumption, the two build-scoped shims, and empirically-verified React 18/19 + SSR compatibility). None block Web's RM-6 adoption.

## Deferred

- **Registry publishing** is deferred until local package consumption is proven in both consumers — not part of this or the next work package.
- **RM-6** connects `studiopod-web` to this package, replacing its 41 temporary duplicated files (see that repo's `MIGRATION-RM6.md`).
- **A later phase** connects `paws-bones-studio`, after its own Tailwind v3→v4 reconciliation (a separate, dedicated phase — this package does not attempt to solve that compatibility question).
