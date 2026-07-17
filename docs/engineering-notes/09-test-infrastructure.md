# Test Infrastructure (DS-1C)

Audit, architecture, tool selection, and certification for the design system's first testing foundation. Contributor-facing how-to guidance lives separately in [docs/TESTING.md](../TESTING.md) — this note is the reasoning behind it, for whoever next has to decide whether to change or extend it.

## 1. Current state audit (before DS-1C)

| Category | Before | Finding |
|---|---|---|
| Test runner | None | Zero test files existed anywhere in the repo. `grep -r "describe(\|it(\|test("` across `src/` returned nothing. |
| Testing dependencies | None | No `vitest`, `jest`, `@testing-library/*`, or any test-adjacent package in either `package.json`. |
| Coverage tooling | None | No coverage config, no `coverage/` in `.gitignore` (added as part of this work). |
| Snapshot tooling | None | — |
| Accessibility tooling | None (automated) | `docs/engineering-notes/02-accessibility-findings.md` documents a real, prior manual accessibility audit — but nothing automated re-checks its findings on every change. |
| Visual regression | None | No Storybook, no Chromatic, no Percy, no screenshot tooling of any kind. |
| Performance tooling | None | Out of scope for this phase (see §12 future recommendations). |
| Storybook | Not adopted | Confirmed absent; see §3 for why this phase doesn't add it either. |
| CI integration | `packages/design-system`-only | `.github/workflows/release.yml`'s `verify` job runs `npm run verify` (build + typecheck + api-check + css-check + use-client-check + exports-check) scoped entirely to the publishable package. Nothing in CI exercised `src/` component *behavior* — the existing gates check the package's shape and build correctness, not what any component actually does at runtime. |
| Developer workflow | None | No documented process for verifying a component works beyond loading its playground page in a browser and looking at it. |

**Gap**: every quality gate that existed was structural (does it build, does it typecheck, does its public API match a baseline, is `"use client"` preserved) or manual (accessibility findings captured once, in prose, not re-verified automatically). Nothing verified runtime behavior, interaction, or accessibility on an ongoing basis. This is the gap DS-1C closes the infrastructure for.

One structural note that shaped every decision below: **this is not an npm workspace**. `packages/design-system/package.json` exists and has its own `dependencies`, but there is no root `workspaces` field and no nested `node_modules` or lockfile under `packages/design-system` — everything resolves from the root `node_modules` via Node's normal upward directory walk. `packages/design-system`'s own dependencies (`class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `framer-motion`) are simply duplicated in the root `package.json` too. Practically, this means there is exactly one place to install test tooling (root) and exactly one component source tree to point it at (`src/`) — `packages/design-system` re-exports that tree at build time via `tsup.config.ts`'s barrel-redirect esbuild plugins, it doesn't contain a second copy of the components.

## 2. Testing architecture

| Category | Owner | Where |
|---|---|---|
| Unit tests | Vitest | Co-located `*.test.ts` next to plain functions (`src/lib/*`, `src/*/utils/*`) |
| Component tests | Vitest + Testing Library | Co-located `*.test.tsx` next to the component |
| Interaction tests | Vitest + Testing Library `userEvent` (structural) / Playwright (real paint) | Same file as the component test for structural interaction (click fires a handler, Tab reaches a control); a `.visual.spec.ts` entry for anything that needs to be *seen* to be verified (hover, focus ring) |
| Accessibility tests | axe-core via `test/a11y.ts`, inside Vitest | Same `*.test.tsx` file, an `accessibility` describe block |
| Visual regression | Playwright | `e2e/visual/*.visual.spec.ts`, against existing playground routes |
| Snapshot strategy | Playwright screenshots only | No Vitest/Jest-style serialized-markup snapshots — see §3 for why |
| Integration tests | Not yet — see §12 | Would live at `e2e/` if adopted; no current candidate composition complex enough to need one beyond what component tests + visual regression already cover |
| Build verification | Existing (`packages/design-system`'s own `verify` script) | Unchanged by this phase |
| Regression testing | Whatever test the original bug lives closest to | Not a separate category — a regression test is just a normal test with a comment naming the bug |
| Publish verification | Existing (`scripts/check-*.mjs`, `npm pack --dry-run` in CI) | Unchanged by this phase |

## 3. Tool selection

| Tool | Adopted | Why |
|---|---|---|
| **Vitest** | Yes | Vite-native, ESM-first, fast (no Babel transform step), and the closest thing to a default choice for a modern React/Next.js codebase in 2026. Shares a config shape with the app's own tooling conventions. |
| **@testing-library/react** + **jest-dom** + **user-event** | Yes | The standard for testing React by user-visible behavior (roles, text, labels) instead of implementation details (component internals, class names). |
| **jsdom** | Yes, over happy-dom | Broader DOM API fidelity — this codebase's components lean on `ResizeObserver`, framer-motion, and Next's `<Link>`, and jsdom's wider compatibility surface was worth the (modest, at this scale) speed cost versus happy-dom. |
| **@vitest/coverage-v8** | Yes | Native V8 coverage, no instrumentation step, bundled first-party Vitest integration. |
| **axe-core**, direct | Yes, over `vitest-axe` | `vitest-axe` exists (npm, `0.1.0`) but is a thin, low-version wrapper; `axe-core` itself is the actively maintained engine every accessibility tool (including `vitest-axe`) wraps. `test/a11y.ts` is a ~40-line direct wrapper — less to depend on, same engine underneath, one fewer package to go stale. |
| **@playwright/test** | Yes | Real-browser rendering for the one thing jsdom structurally cannot do: prove something paints correctly. Chosen over Cypress for first-class screenshot-diffing (`toHaveScreenshot`) and lower per-test overhead. |
| **Storybook** | **No, not this phase** | Every component family already ships a playground route as part of its own build-out (`/core-components`, `/motion`, `/illustrations`, `/workflows`, `/platforms`, `/production`, `/capabilities`) — these already serve Storybook's core job (an isolated surface to render a component in every state). Adding Storybook now would mean maintaining two isolated-rendering surfaces for the same components. If the playground pages are ever retired in favor of Storybook specifically, that's a real future option — but introducing it alongside working playgrounds is exactly the "unnecessary complexity" this phase's brief warns against. |
| **Chromatic** (or equivalent hosted visual-review service) | **No** | Chromatic specifically integrates with Storybook. Without Storybook, it has nothing to attach to. Playwright's own local screenshot diffing covers the same need at zero additional cost until/unless Storybook is adopted. |
| Mock utilities | Vitest's built-in `vi` | Sufficient at this scale — no MSW or equivalent network-mocking layer added, since nothing in `src/components/**` makes real network calls (this is a component library, not the application). |

## 4–7. Repository infrastructure, accessibility infrastructure, visual regression infrastructure, conventions

Implemented as described in [docs/TESTING.md](../TESTING.md) §1–6. Not duplicated here — that document is the one to keep current as the suite grows; this note is a point-in-time record of why it looks the way it does.

## 8. CI integration

Added a new `test` job to `.github/workflows/release.yml`, sibling to the existing `verify` job, running `npm run test:typecheck && npm test` at the repo root on every push and PR. Both `dry-run` and `publish` now `needs: [verify, test]` — a broken component test suite blocks a release exactly like a broken package build already did.

**Playwright is deliberately not wired into CI yet.** `e2e/visual/*-snapshots/*.png` baselines were generated locally on macOS and are suffixed `-darwin.png` (Playwright's own convention); CI runs on `ubuntu-latest`, which would look for `-linux.png` baselines that don't exist. Wiring it in today would either fail every run for a reason that has nothing to do with a real regression, or require immediately generating a parallel Linux baseline set — a bigger, more deliberate step than this phase's brief ("build the infrastructure," "do not perform large-scale certification yet") asks for. `npm run test:e2e` remains a local, on-demand command (documented in `e2e/README.md`) until Linux baselines exist. This is the clearest concrete recommendation for DS-1D.

## 9. Developer experience

- `npm test` / `npm run test:watch` — the two commands a contributor needs day to day.
- One custom `render()` (from `@test/render`) instead of importing Testing Library directly and re-wrapping providers by hand every time.
- Failure messages are the underlying tool's own (Testing Library's DOM-aware assertion errors, axe's rule-id + help-text + selector output, Playwright's actual/expected/diff triptych) — no custom message-formatting layer was built on top, since all three are already good at explaining failures.
- `@/*` and `@test/*` path aliases keep every import statement (app source or test source) using the same style.

## 10. Pilot component

`Button` (`src/components/ui/Button.tsx`), chosen because it has every dimension a Foundation-tier primitive can have — a variant × size matrix, a dual `<button>`/`<Link>` identity depending on whether `href` is passed, a `loading` state that changes markup (spinner, `aria-busy`) and interactivity simultaneously, and a `disabled` state — without the layout or motion-timing complexity a bigger component (e.g. anything in `src/illustrations/` or `src/motion/primitives/`) would add on top. The full pair:

- `src/components/ui/Button.test.tsx` — 18 tests: rendering (default, link mode, all 4 variants, all 3 sizes, leading icon), interaction (click, keyboard reach + activation), state coverage (disabled blocks the click, loading sets `aria-busy` and disables without hiding the label, a loading link prevents navigation instead of disabling since a link has no `disabled`), accessibility (no axe violations in default, loading, and icon-only-with-`aria-label` states).
- `e2e/visual/button-gallery.visual.spec.ts` — 8 Playwright specs (4 screenshots × desktop/mobile): the existing states + variants gallery on `/core-components`, plus real hover and focus-visible paint.

Both pass. `npm run test:coverage` with only this one file covered reports ~8% overall statement coverage — expected and correct for a single pilot; not a target, a starting point (see `docs/TESTING.md` §4 on why coverage isn't a gate).

## 11. Known limitations

- **Single theme.** `src/styles/theme.css` defines its `@theme` tokens directly, with no light-mode variant, `prefers-color-scheme` query, or `data-theme` branch — despite `<html>` in `src/app/layout.tsx` carrying a literal `dark` class that currently does nothing CSS-wise. There is exactly one visual theme to snapshot today. The Playwright config's `projects` array varies viewport, not color scheme, for this reason; adding a real light theme is a prerequisite for a second axis, not something this infrastructure is blocked on.
- **No Linux visual baselines** (see §8) — Playwright is local-only until they exist.
- **Contrast checking is not automated.** axe's `color-contrast` rule is explicitly disabled in the Vitest/jsdom layer (`test/a11y.ts`) because jsdom has no layout engine and cannot compute real rendered contrast — running it there would produce either a crash or a meaningless result, not a true one. It is not yet re-enabled in the Playwright layer either (no `@axe-core/playwright` integration was added this phase). A real contrast check needs a real browser; that integration is a clean, scoped follow-up.
- **One pilot component.** Per the brief, this phase deliberately did not expand test coverage beyond `Button`. `docs/engineering-notes/02-accessibility-findings.md`'s existing findings are not yet re-verified by this new automated layer — that re-verification is exactly what DS-1D/DS-1F should use this infrastructure to do.
- **A real, unrelated bug was found, not fixed, while building the pilot**: `/core-components`'s "Component gallery" section renders `id="components"` on *both* its `<section>` and its `<h2>` heading (`src/app/core-components/_sections/ComponentGallerySection.tsx`) — invalid HTML (duplicate ids break `#components` anchor links and can confuse assistive tech that relies on id-based references). The Playwright spec works around it with a more specific `section#components` selector rather than fixing the underlying markup, consistent with this phase's "do not rewrite components to satisfy tests" instruction. Worth a follow-up fix independent of DS-1C.

## 12. Future recommendations

1. **Generate Linux Playwright baselines** (or run baseline generation inside the same `ubuntu-latest` container CI uses) and wire the `visual` spec into CI — the single largest gap left open by this phase.
2. **Add `@axe-core/playwright`** to re-enable contrast checking at the one layer that can actually compute it correctly.
3. **DS-1D/DS-1E/DS-1F** should use this infrastructure to re-verify `02-accessibility-findings.md`'s prior manual findings automatically, expand component test coverage beyond the one pilot, and decide a real coverage target once enough of the library is covered to make one meaningful.
4. Revisit Storybook only if the existing playground-route pattern is ever retired — not before, per §3.
