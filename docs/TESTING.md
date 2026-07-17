# Testing the StudioPOD Design System

The contributor guide to this repo's test suite: what to test, what not to, how to run it, how to debug it, and how to add to it. For the audit and architecture reasoning behind these choices, see [docs/engineering-notes/09-test-infrastructure.md](./engineering-notes/09-test-infrastructure.md). For how this test suite is orchestrated together with typecheck/lint/build/package checks into one verification pipeline, see [docs/VERIFICATION.md](./VERIFICATION.md).

There is one component source tree, `src/`. `packages/design-system` builds *from* it (see its `tsup.config.ts`) rather than duplicating it, so tests live in `src/` too — there's nothing to test twice.

---

## 1. The three layers

| Layer | Tool | Environment | Answers |
|---|---|---|---|
| Unit / component | Vitest + Testing Library | jsdom | Does it render the right markup, respond to interaction, expose the right ARIA? |
| Accessibility | axe-core (via `test/a11y.ts`), inside the Vitest layer | jsdom | Any structural a11y violations (labels, roles, landmarks) in this state? |
| Visual / real-browser | Playwright | real Chromium | Does it actually **paint** correctly — hover, focus ring, layout, color — in a real browser? |

Nothing here is Storybook. Every component family already has a playground route (`/core-components`, `/motion`, `/illustrations`, `/workflows`, `/platforms`, `/production`, `/capabilities`) built as part of shipping that family — those pages are the isolated-rendering surface a Storybook instance would otherwise exist to provide, so Playwright targets them directly instead of a fourth thing to maintain.

## 2. Running tests

```bash
npm test                 # Vitest, once — what CI runs
npm run test:watch        # Vitest, watch mode — what you run while writing a component
npm run test:coverage     # Vitest with a coverage report (text + html in coverage/)
npm run test:typecheck    # type-checks test/**, **/*.test.tsx, and e2e/** in isolation

npm run test:e2e          # Playwright, once, against committed screenshot baselines
npm run test:e2e:update   # Playwright, regenerating baselines — see e2e/README.md
```

`npm run build`, `npm run lint`, and `npm run package:*` are unaffected — test files are excluded from the app's own `tsconfig.json` (see §6) so a test-only type error never blocks a production build.

## 3. What deserves a test

Write a test when:

- The component has more than one meaningful state (variant, size, loading, disabled, error) and a regression in one wouldn't be caught by simply looking at another.
- The component owns real interaction logic (click, keyboard, focus management) rather than just forwarding props to a DOM element.
- The component has an accessibility contract worth protecting — an icon-only control needing an accessible name, a live-region announcement, a focus trap.
- A past bug lived here. Regressions deserve a test more than green-field code does.

Don't write a test when:

- The component is a pure prop-forwarding wrapper with no logic of its own (many Platform-tier "thin re-export" components documented in `docs/engineering-notes/` are exactly this — testing them tests the thing they wrap, redundantly).
- You'd be asserting on Tailwind class strings. That's what the Playwright visual layer is for — a class-string assertion breaks on every unrelated refactor and proves nothing about what actually renders.
- The only thing under test is TypeScript's own type system already enforcing (e.g. a prop being `required` — `tsc` already fails the build for that).

## 4. Conventions

- **Co-locate**: `Button.tsx` → `Button.test.tsx`, same folder. No parallel `__tests__/` tree — the test is part of the component, not a separate concern living somewhere else.
- **Naming**: `<Component>.test.tsx` for Vitest, `<family>-gallery.visual.spec.ts` for Playwright (see `e2e/README.md`).
- **Structure**: one top-level `describe(ComponentName)`, with nested `describe` blocks per concern — `rendering`, `interaction`, `state coverage`, `accessibility` is the pattern `Button.test.tsx` establishes; adapt the concern names, keep the shape.
- **Imports**: always `@test/render` (not `@testing-library/react` directly) and `@test/a11y` — see §5. Always `@/...` for app source, matching every other file in this repo.
- **Fixtures**: reuse `@/lib/canonical.ts` (re-exported for convenience from `@test/fixtures`) rather than inventing test-only data. If a test needs data `canonical.ts` doesn't have, that's usually a sign the fixture belongs there, not in the test file.
- **Coverage**: no enforced percentage gate. Coverage is a tool for finding untested branches while writing a test, not a target to hit after the fact — a 100%-covered component with no assertions on behavior is worse than a 60%-covered one that actually checks something.

## 5. The shared test utilities (`test/`)

| File | Purpose |
|---|---|
| `test/setup.ts` | Registered globally via `vitest.config.ts`. jest-dom matchers, `ResizeObserver`/`IntersectionObserver` stubs, default `matchMedia` mock, automatic Testing Library cleanup. You never import this directly. |
| `test/render.tsx` | `render()` — drop-in replacement for Testing Library's, pre-wrapped in the real `MotionProvider` + `LiveRegionProvider` stack (`src/app/layout.tsx`'s own providers). Also re-exports `screen`, `userEvent`, and exposes `mockMatchMedia()` and `getAnnouncement()`. |
| `test/a11y.ts` | `runA11yCheck(container)` runs axe-core against a rendered subtree; `.toHaveNoA11yViolations()` is a custom matcher for the result. |
| `test/fixtures.ts` | Re-exports `@/lib/canonical.ts`'s shared demo data for test consumption. |

Import path: `@test/*` resolves to `test/*` (configured in both `vitest.config.ts` and `tsconfig.json`), the same pattern as `@/*` for `src/*`.

## 6. Why test files can't break the app build

`tsconfig.json` excludes `test/**`, `e2e/**`, and `**/*.test.{ts,tsx}` (see its `exclude` array). `tsconfig.test.json` extends the base config and includes exactly those paths, checked independently via `npm run test:typecheck`. This exists because `next build` type-checks against the root `tsconfig.json` — without the exclusion, a type-only concern in test code (e.g. augmenting Vitest's `Assertion` interface, which `test/a11y.ts` does for the custom a11y matcher) can fail a production build for a reason that has nothing to do with the shipped app. This was found the hard way while building this infrastructure, not theorized in advance — see `docs/engineering-notes/09-test-infrastructure.md` §Known limitations.

## 7. Debugging a failing test

- **Vitest**: `npx vitest run path/to/File.test.tsx -t "test name"` to isolate one test. `npx vitest` (no `run`) for watch mode with a filter UI. Testing Library's `screen.debug()` prints the current DOM to the terminal — reach for it before adding console.logs.
- **Accessibility**: a failed `toHaveNoA11yViolations()` prints every violation's rule id, human-readable help text, the axe docs URL, and the specific failing selector — usually enough to fix without further digging. Remember `color-contrast` is disabled in this layer (jsdom can't compute it); a contrast regression will only show up in Playwright.
- **Playwright**: a failed visual test writes an actual/expected/diff triptych into `test-results/`; open the HTML report (`npx playwright show-report`) to see them side by side. `npx playwright test --debug` opens the Playwright Inspector for step-through debugging in a real browser window.

## 8. Adding a new test — walkthrough

Use `src/components/ui/Button.test.tsx` and `e2e/visual/button-gallery.visual.spec.ts` as the canonical pair. To add coverage for a new component:

1. Create `<Component>.test.tsx` next to it.
2. `import { render, screen, userEvent } from "@test/render"` and `import { runA11yCheck } from "@test/a11y"`.
3. Cover rendering (does it render at all, across its real variant/size/state matrix — use `it.each` for matrices, not one test per value), interaction (click, keyboard reachability + activation), state coverage (every documented prop that changes behavior, not just appearance), and accessibility (`toHaveNoA11yViolations()` in at least its default state and any state that changes its accessible name or role).
4. If the component has a meaningful visual identity (most do) and already appears on a playground page, add a scoped screenshot to that family's `.visual.spec.ts` (or create one, following `button-gallery.visual.spec.ts`'s shape, if the family doesn't have one yet).
5. Run `npm test` and `npm run test:e2e` (the latter with `--update-snapshots` the first time, since no baseline exists yet) before opening a PR.
