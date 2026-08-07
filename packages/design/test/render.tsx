import type { ReactElement, ReactNode } from "react";
import { render as rtlRender, type RenderOptions } from "@testing-library/react";
import { MotionProvider } from "@/providers";
import { LiveRegionProvider } from "@/components/feedback";

/**
 * The same provider stack src/app/layout.tsx mounts once for the whole app
 * (MotionProvider — which itself wraps MotionPreferenceProvider — plus
 * LiveRegionProvider for useAnnounce()). Anything that reads motion
 * preference, playback controls, or announces via aria-live needs this;
 * everything else tolerates it for free, so it's the default for every test
 * rather than something each test opts into.
 */
function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <LiveRegionProvider>{children}</LiveRegionProvider>
    </MotionProvider>
  );
}

/**
 * Drop-in replacement for Testing Library's `render` — same signature, same
 * return value — pre-wrapped in the app's real provider stack. Import this
 * instead of `@testing-library/react` in every component test.
 */
export function render(ui: ReactElement, options?: RenderOptions) {
  return rtlRender(ui, { wrapper: AppProviders, ...options });
}

/**
 * For the rare test that must assert on behavior with NO providers mounted
 * (e.g. proving a component doesn't crash when read outside the app shell).
 * Prefer `render` unless you have a specific reason to reach for this.
 */
export { render as renderWithoutProviders } from "@testing-library/react";

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

/**
 * Reads the current text of one of the app's two shared aria-live regions
 * (mounted once by LiveRegionProvider, which the default `render` wrapper
 * always includes). Use after triggering whatever calls `useAnnounce()` to
 * assert a screen reader would have heard the right thing — e.g.
 * `expect(getAnnouncement("polite")).toBe("Saved")`.
 *
 * Trims the trailing space LiveRegionProvider alternates in on repeat
 * announcements (its own mechanism for making back-to-back identical
 * messages still register as a DOM change) — that's an implementation
 * detail an assertion shouldn't have to know about.
 */
export function getAnnouncement(priority: "polite" | "assertive"): string {
  const region = document.querySelector(`[aria-live="${priority}"]`);
  return region?.textContent?.trim() ?? "";
}

/**
 * Overrides `window.matchMedia` for the duration of one test — e.g.
 * `mockMatchMedia((query) => query.includes("prefers-reduced-motion"))` to
 * simulate a user with reduced motion enabled. Setup.ts installs the
 * always-false default; call this inside a test, not in setup, so the
 * override never leaks into unrelated tests.
 */
/**
 * Overrides `Element.prototype.getBoundingClientRect` for the duration of
 * one test so pointer-drag math (SplitView, or anything else measuring its
 * own container to convert pixel deltas to percentages) has real, non-zero
 * numbers to work with — jsdom has no layout engine, so every element's
 * real rect is always `{ width: 0, height: 0, ... }`. Returns the same
 * fixed rect for every element; tests that need per-element rects should
 * mock more narrowly themselves.
 */
export function mockBoundingClientRect(rect: Partial<DOMRect>) {
  const full: DOMRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON: () => ({}),
    ...rect,
  };
  Element.prototype.getBoundingClientRect = () => full;
}

export function mockMatchMedia(matches: (query: string) => boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: matches(query),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}
