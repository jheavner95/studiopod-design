# Visual regression & browser interaction tests

Playwright, configured in `playwright.config.ts` at the repo root. These are the tests that need a real browser's layout, paint, and computed styles — everything the Vitest/jsdom suite (`src/**/*.test.tsx`) structurally cannot verify. See `docs/TESTING.md` for how this layer fits with the rest of the suite.

## What lives here

- `e2e/visual/*.visual.spec.ts` — screenshot comparisons (`toHaveScreenshot`) against committed baseline PNGs in `*-snapshots/` folders next to each spec.

Both run against every component family's existing playground route (`/core-components`, `/motion`, `/illustrations`, `/workflows`, …) rather than a dedicated Storybook instance — see `docs/TESTING.md` "Visual regression" for why.

## Running

```bash
npm run test:e2e            # run once, compare against committed baselines
npm run test:e2e:update      # regenerate baselines after an intentional visual change
```

Both spin up a **production build** (`next build && next start`) on port **3100** — not `next dev`, and not port 3000. A production build has no dev-mode indicator badge and no HMR overlay to pollute a screenshot; port 3100 avoids clobbering (or silently reusing) whatever may already be running on 3000 on a given machine.

## Updating a baseline

1. Make the visual change.
2. `npm run test:e2e:update` — this overwrites every `*.png` the affected spec produces.
3. Open the diffed PNGs in your diff tool of choice (or `git diff` won't show images usefully — use `git show` piped to an image viewer, or just open the file) and confirm the new baseline is actually correct, not accidentally capturing a regression.
4. Commit the updated PNGs alongside the code change that caused them. A baseline update with no accompanying visual change to explain it is a red flag in review.

## Adding a new visual spec

Copy `visual/button-gallery.visual.spec.ts` as a template. Conventions:

- One spec file per component-family gallery, named `<family>-gallery.visual.spec.ts`.
- Screenshot names: `<component>-<state>.png` (e.g. `button-hover.png`), not `<spec-name>-1.png` — Playwright's auto-numbering is meaningless once a spec has more than a couple of assertions.
- Prefer scoping the screenshot to the specific section/element under test (`page.locator(...)`) over a full-page screenshot — a full-page shot re-fails on any unrelated content change elsewhere on the same playground page.
- Cover default/disabled/loading (or whatever states the component has) as static screenshots, then hover/focus-visible as separate real-interaction screenshots — jsdom can assert an element *has* a hover/focus style rule, but only a real browser can prove it *paints*.

## Known limitation: single theme

This design system currently ships one theme (dark) — `src/styles/theme.css` defines `@theme` tokens directly with no light-mode variant or `prefers-color-scheme`/`data-theme` branch, despite `<html>` in `src/app/layout.tsx` carrying a literal `dark` class. There is only one `projects` axis in `playwright.config.ts` today (viewport, not theme) for that reason. If a real light theme ships, add a `colorScheme` dimension to the project matrix rather than duplicating specs.
