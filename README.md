# StudioPOD Marketing Platform

## Purpose

This repository is the marketing website for **StudioPOD**, a Production Operating System for print-on-demand and custom-product businesses. Rather than hand-building marketing pages with one-off illustrations and copy, this project builds a layered set of reusable, data-driven engines first: a design system, a motion engine, an illustration engine, and libraries for visually explaining StudioPOD's workflows, platform architecture, and production/validation pipeline. Marketing pages are the last mile, they consume these engines rather than reimplementing visuals per page.

## Technology Stack

- **[Next.js 16](https://nextjs.org/)** (App Router, Turbopack): the marketing site is a set of static/server routes generated with `next build`.
- **[React 19](https://react.dev/)** with the Server/Client Component boundary used deliberately throughout.
- **TypeScript** in strict mode, no `any`, exhaustive prop typing across every engine.
- **[Tailwind CSS v4](https://tailwindcss.com/)** using its CSS-first `@theme` configuration (no `tailwind.config.ts`); design tokens live as CSS custom properties in `src/styles/`.
- **[Framer Motion](https://www.framer.com/motion/)** underneath the custom Motion Engine's semantic primitives.
- **[lucide-react](https://lucide.dev/)** for iconography.
- **Vercel** as the deployment target.

## Architecture Overview

The codebase is organized as a stack of engines, each one built only on the layers beneath it:

```
Design System (tokens, typography, layout, UI primitives)
        ↓
Motion Engine        (src/motion, src/hooks, src/providers)
        ↓
Illustration Engine  (src/illustrations)
        ↓
Workflow Engine      (src/workflows)
        ↓
Platform Architecture Library (src/platforms)
        ↓
Production & Validation Library (src/production)
        ↓
Marketing Compositions (src/compositions) → Marketing Pages
```

Key architectural rules enforced throughout:

- **Everything renders from structured data.** Every diagram, workflow, and architecture is a plain data value (e.g. `<WorkflowDiagram workflow={data} />`, `<PlatformArchitectureDiagram architecture={data} />`); there is no page-specific rendering logic.
- **No duplicated rendering logic.** Each higher layer composes the primitives beneath it (illustration nodes/connections, motion primitives, workflow diagrams) instead of reimplementing them.
- **Container-based responsiveness.** Diagrams measure their own container width via `ResizeObserver` rather than relying on viewport media queries, so they remain correct even embedded in a narrower parent.
- **Accessibility and reduced motion are first-class.** Every motion primitive respects a global reduced-motion preference, and interactive diagrams support keyboard navigation and ARIA labeling.
- Each engine ships with its own developer playground (`/design-system`, `/motion`, `/illustrations`, `/workflows`, `/platforms`, `/production`, `/compositions`) used to build and verify the primitives in isolation before any marketing page consumes them.

## Current Milestone

**MS-2.5, Production & Validation Library,** is complete and certified. The full milestone history so far:

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

## Roadmap

With the full engine stack (design system → motion → illustration → workflow → platform architecture → production/validation) now in place, upcoming milestones move into actual page construction:

- Homepage implementation, composed from the Marketing Composition System and the diagram libraries built in MS-2.x
- Additional marketing pages (product, pricing, use-case, and platform-detail pages)
- Finalized marketing copy (none of the engine playgrounds use real marketing copy by design)
- SEO, analytics, and performance passes ahead of launch

## Development Workflow

```bash
npm install        # install dependencies
npm run dev         # start the dev server at http://localhost:3000
npm run build        # production build (also type-checks)
npm run lint          # ESLint
npx tsc --noEmit     # standalone TypeScript check
```

Every engine has a corresponding developer playground route for visual QA:

- `/design-system`: tokens, typography, motion, illustration, and component showcase
- `/compositions`: the 11 marketing compositions with desktop/mobile previews
- `/motion`: the motion engine's tokens, hooks, and primitives
- `/illustrations`: the illustration engine's node/connection/layout system
- `/workflows`: the workflow diagram library
- `/platforms`: the platform architecture library
- `/production`: the production & validation library

The established workflow for every change in this repository is: implement in small verified batches, run `npx tsc --noEmit` and `npx eslint .` after each batch, run `npm run build` at natural checkpoints, then visually verify in a browser (desktop, mobile, and reduced-motion) before considering a milestone done.

> **Note:** This project intentionally targets a customized fork of Next.js with breaking changes from the version most tooling assumes. See `AGENTS.md` before making changes that touch Next.js APIs or conventions.
