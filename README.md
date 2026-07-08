# StudioPOD Design System

## Purpose

This repository is the **StudioPOD Design System** — the shared source of truth for tokens, primitives, and patterns consumed by both the future **StudioPOD marketing site** and the **StudioPOD application**. It is no longer a marketing-site-in-progress: the marketing composition work this project started as is now one package among several, not the project's goal.

Rather than hand-building UI with one-off styles per product, this project builds a layered set of reusable, data-driven engines and component packages first. Web and App both consume these packages rather than reimplementing tokens, primitives, or diagram logic independently.

## Packages

The system is organized into seven packages, each with its own section at `/foundations`, `/tokens`, `/core-components`, `/marketing-components`, `/application-components`, `/workflow-patterns`, and `/documentation` (a persistent top nav links between all of them):

| Package | Route | What it covers |
|---|---|---|
| **Foundations** | `/foundations` | Layout system, motion engine, illustration engine — the structural and motion bedrock everything else builds on. |
| **Tokens** | `/tokens` | Raw foundation color ramps and semantic color/typography/spacing/radius/shadow tokens. |
| **Core Components** | `/core-components` | The shared UI kit: buttons, cards, badges, form inputs, and controls. |
| **Marketing Components** | `/marketing-components` | Reusable marketing page-section compositions — reclassified as early design-system examples, not the final site. |
| **Application Components** | `/application-components` | The operational libraries the StudioPOD app is built from (platform architecture, production/validation, capability library). **The next major focus.** |
| **Workflow Patterns** | `/workflow-patterns` | Reusable patterns for visualizing StudioPOD's processes end to end. |
| **Documentation** | `/documentation` | Where principles, package structure, and contribution workflow are written down. |

Each package page currently links out to its existing implementation (the developer playgrounds below) — nothing has been deleted in this restructure, only reclassified and given a home in the new navigation.

## Technology Stack

- **[Next.js 16](https://nextjs.org/)** (App Router, Turbopack).
- **[React 19](https://react.dev/)** with the Server/Client Component boundary used deliberately throughout.
- **TypeScript** in strict mode, no `any`, exhaustive prop typing across every package.
- **[Tailwind CSS v4](https://tailwindcss.com/)** using its CSS-first `@theme` configuration (no `tailwind.config.ts`); design tokens live as CSS custom properties in `src/styles/`.
- **[Framer Motion](https://www.framer.com/motion/)** underneath the custom Motion Engine's semantic primitives.
- **[lucide-react](https://lucide.dev/)** for iconography.
- **Vercel** as the deployment target.

## Architecture Overview

The codebase is organized as a stack of engines and libraries, each built only on the layers beneath it:

```
Design System (tokens, typography, layout, UI primitives)
        ↓
Motion Engine        (src/motion, src/hooks, src/providers)
        ↓
Illustration Engine  (src/illustrations)
        ↓
Workflow Engine      (src/workflows)               → Workflow Patterns package
        ↓
Platform Architecture Library (src/platforms)      ┐
Production & Validation Library (src/production)   ├→ Application Components package
Capability Library (src/capabilities)              ┘
        ↓
Marketing Compositions (src/compositions)          → Marketing Components package
```

Key architectural rules enforced throughout:

- **Everything renders from structured data.** Every diagram, workflow, and architecture is a plain data value (e.g. `<WorkflowDiagram workflow={data} />`, `<PlatformArchitectureDiagram architecture={data} />`); there is no page-specific rendering logic.
- **No duplicated rendering logic.** Each higher layer composes the primitives beneath it (illustration nodes/connections, motion primitives, workflow diagrams) instead of reimplementing them.
- **Container-based responsiveness.** Diagrams measure their own container width via `ResizeObserver` rather than relying on viewport media queries, so they remain correct even embedded in a narrower parent.
- **Accessibility and reduced motion are first-class.** Every motion primitive respects a global reduced-motion preference, and interactive diagrams support keyboard navigation and ARIA labeling.
- Each engine ships with its own developer playground (`/design-system`, `/motion`, `/illustrations`, `/workflows`, `/platforms`, `/production`, `/capabilities`, `/compositions`) used to build and verify the primitives in isolation.

## Current Milestone

The full engine/library build-out (MS-1.x/MS-2.x) and a visual foundation lock (MS-2A/MS-2B) are complete and certified. The project has since repositioned from "marketing site in progress" to "design system product" — the milestone history below reflects work done under the original framing:

| Milestone | Description |
|---|---|
| MS-1.1 | Design System Foundation: tokens, typography, layout, UI/motion/illustration primitives |
| MS-1.2 | Design System Showcase & Playground |
| MS-1.3 | Marketing Composition System: 11 reusable page-section compositions |
| MS-2.1 | Motion Engine & Tokens: semantic motion tokens, provider, hooks, 14 primitives |
| MS-2.2 | Illustration Engine: data-driven diagram engine (nodes, connections, groups, layouts) |
| MS-2.3 | Workflow Diagram Library: reusable workflow visualizations built on the illustration engine |
| MS-2.4 | Platform Architecture Library: reusable architecture diagrams built on the workflow engine |
| MS-2.5 | Production & Validation Library: reusable production/validation visualizations |
| MS-2.6 | Capability Library: provider-agnostic AI/publishing/commerce capability diagrams |
| MS-2A | Token audit against the StudioPOD app reference and WCAG contrast verification |
| MS-2B | Visual foundation lock: collision fixes, typography/component/motion polish, accessibility re-verification |

## Roadmap

With the full package set in place and the repo repositioned as a design system product:

- **Application Components is the next major focus** — building out real operational UI (not just diagrams explaining it) for the StudioPOD application, consuming the existing platform/production/capability libraries as a starting point.
- Marketing page construction is paused, not planned next — the Marketing Components package stays as-is (early examples) until application work is further along.
- Each of the seven package placeholder pages will grow into full section pages as their content is built out.

## Development Workflow

```bash
npm install        # install dependencies
npm run dev         # start the dev server at http://localhost:3000
npm run build        # production build (also type-checks)
npm run lint          # ESLint
npx tsc --noEmit     # standalone TypeScript check
```

Every engine/library has a corresponding developer playground route for visual QA:

- `/design-system`: tokens, typography, motion, illustration, and component showcase
- `/compositions`: the 11 marketing compositions with desktop/mobile previews
- `/motion`: the motion engine's tokens, hooks, and primitives
- `/illustrations`: the illustration engine's node/connection/layout system
- `/workflows`: the workflow diagram library
- `/platforms`: the platform architecture library
- `/production`: the production & validation library
- `/capabilities`: the capability library

The established workflow for every change in this repository is: implement in small verified batches, run `npx tsc --noEmit` and `npx eslint .` after each batch, run `npm run build` at natural checkpoints, then visually verify in a browser (desktop, mobile, and reduced-motion) before considering a milestone done.

> **Note:** This project intentionally targets a customized fork of Next.js with breaking changes from the version most tooling assumes. See `AGENTS.md` before making changes that touch Next.js APIs or conventions.
