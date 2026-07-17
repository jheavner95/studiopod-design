import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Testing Library doesn't auto-cleanup outside a test-framework integration
// it recognizes out of the box; this is the one line every project needs.
afterEach(() => {
  cleanup();
});

// jsdom implements neither observer — every component that measures itself
// (illustration layout, ScrollArea, motion viewport triggers) would otherwise
// throw "X is not defined" the moment it mounts in a test. A no-op stub is
// enough: no test here asserts on real intersection/resize math, only on
// resulting DOM/markup, so components should treat "never observed" as inert.
class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): unknown[] {
    return [];
  }
}
globalThis.ResizeObserver = ObserverStub as unknown as typeof ResizeObserver;
globalThis.IntersectionObserver = ObserverStub as unknown as typeof IntersectionObserver;

// jsdom has no layout engine, so `window.matchMedia` is entirely unimplemented.
// useMotionPreference and any other `prefers-*` media-query reads would throw
// without this. Defaults to "no match" (motion allowed, no dark-mode query,
// etc.) — tests that need the matched branch override this per-test via
// `mockMatchMedia(query => ...)` from test/render.tsx.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// jsdom implements no part of the Pointer Events capture API — any component
// that drags via setPointerCapture (SplitDivider) throws "is not a function"
// the moment a pointerdown test fires without this. No-op stubs are enough:
// capture semantics (routing subsequent events to the same element even off
// its bounds) are a real-browser guarantee Playwright verifies; jsdom tests
// only need the calls to not throw.
Element.prototype.setPointerCapture = function () {};
Element.prototype.releasePointerCapture = function () {};
Element.prototype.hasPointerCapture = function () {
  return false;
};
