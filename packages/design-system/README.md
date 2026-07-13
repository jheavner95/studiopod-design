# @studiopod/design-system

StudioPOD's shared design system: tokens, UI/layout/form/feedback/navigation/overlay/table/metadata primitives, motion and illustration engines, and marketing compositions — for the StudioPOD Web and App products.

**Status: RM-4 scaffold.** This package builds and packs correctly and has been verified against a disposable local consumer fixture, but it is **not published to any registry** and **not yet connected to studiopod-web or paws-bones-studio**. Those are later, separate work packages (see below).

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

## Local build

```bash
# from the studiopod-design repo root
npm run package:build       # tsup — ESM output + type declarations + CSS
npm run package:typecheck   # standalone tsc check
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

## What's intentionally excluded

- `src/components/platform/**` — confirmed (RM-1) to be almost entirely one-line aliases of `operational`/`workflow` under domain-flavored names; not a real export surface.
- `src/app/**` — documentation/example/gallery/certification routes, not package exports.
- `src/components/docs/**` — documentation-site chrome, internal tooling only.
- `GlobalNav`/`Footer` (from `src/components/layout`) — app-shell chrome that imports doc-site nav config; excluded from the package build via a scoped esbuild alias rather than by editing the canonical barrel (which the live documentation app still depends on).
- `src/app/application-components/business-features/production-workspace/**` — scheduled for RM-5 documentation capture and deletion; never was a candidate for export.
- `src/lib/canonical.ts` and the `examples/` subfolders inside `workflows`/`platforms`/`production`/`capabilities` — documentation-site demo/mock data, not reusable presentation code.
- Business logic, API clients, repository access, authentication, routing/application state — none of the source folders exported here contain any.

## Deferred

- **Registry publishing** is deferred until local package consumption is proven in both consumers — not part of this or the next work package.
- **RM-6** connects `studiopod-web` to this package, replacing its 41 temporary duplicated files (see that repo's `MIGRATION-RM6.md`).
- **A later phase** connects `paws-bones-studio`, after its own Tailwind v3→v4 reconciliation (a separate, dedicated phase — this package does not attempt to solve that compatibility question).
