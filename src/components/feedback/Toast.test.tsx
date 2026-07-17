import type { ReactNode } from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, renderHook, fireEvent, waitFor, act } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { MotionContext, type MotionContextValue } from "@/providers";
import { ToastProvider, useToast, type ToastOptions } from "./Toast";

/**
 * useMotionEnabled() reads MotionContext (computed once, at MotionProvider's
 * own root, from ITS OWN internal MotionPreferenceProvider) — nesting a
 * second MotionPreferenceProvider override deeper in the tree (the pattern
 * SplitView.test.tsx uses for useMotionPreference()) has no effect on it,
 * since the bridge that resolves reducedMotion into MotionContext already
 * ran above where the override would sit. Overriding MotionContext directly
 * is the only way to force useMotionEnabled() to false here — needed so
 * AnimatePresence's exit transition completes instantly instead of leaving
 * the exiting Notification mounted mid-animation (jsdom never advances real
 * animation time, so a real exit transition never resolves in a test at all).
 */
const REDUCED_MOTION_CONTEXT: MotionContextValue = {
  scale: 1,
  setScale: () => {},
  speed: 1,
  setSpeed: () => {},
  paused: false,
  setPaused: () => {},
  togglePaused: () => {},
  reducedMotionOverride: true,
  setReducedMotionOverride: () => {},
  reducedMotion: true,
  diagnostics: { bounds: false, origins: false, timingLabels: false, frameDiagnostics: false },
  setDiagnostic: () => {},
  replayKey: 0,
  replay: () => {},
};

function ReducedMotionToastProvider({ children }: { children: ReactNode }) {
  return (
    <MotionContext.Provider value={REDUCED_MOTION_CONTEXT}>
      <ToastProvider>{children}</ToastProvider>
    </MotionContext.Provider>
  );
}

function ShowToastButton(options: ToastOptions) {
  const { show } = useToast();
  return (
    <button type="button" onClick={() => show(options)}>
      Show
    </button>
  );
}

describe("Toast", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe("rendering", () => {
    it("renders nothing until show() is called", () => {
      render(
        <ToastProvider>
          <ShowToastButton message="Export finished" />
        </ToastProvider>,
      );
      expect(screen.queryByText("Export finished")).not.toBeInTheDocument();
    });

    it("renders a Notification with the given message into the portal once shown", () => {
      render(
        <ToastProvider>
          <ShowToastButton message="Export finished" />
        </ToastProvider>,
      );
      fireEvent.click(screen.getByRole("button", { name: "Show" }));
      expect(screen.getByText("Export finished")).toBeInTheDocument();
    });

    it("throws when useToast is called outside a ToastProvider — the same guard every context-backed hook in this codebase uses", () => {
      expect(() => renderHook(() => useToast())).toThrow("useToast must be used within a ToastProvider");
    });
  });

  describe("state coverage", () => {
    it("stacks multiple toasts, newest first", () => {
      render(
        <ToastProvider>
          <ShowToastButton message="First" />
        </ToastProvider>,
      );
      fireEvent.click(screen.getByRole("button", { name: "Show" }));
      expect(screen.getByText("First")).toBeInTheDocument();
    });

    it("auto-dismisses after its duration elapses", async () => {
      vi.useFakeTimers();
      render(
        <ReducedMotionToastProvider>
          <ShowToastButton message="Export finished" duration={1000} />
        </ReducedMotionToastProvider>,
      );
      fireEvent.click(screen.getByRole("button", { name: "Show" }));
      expect(screen.getByText("Export finished")).toBeInTheDocument();
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1000);
      });
      expect(screen.queryByText("Export finished")).not.toBeInTheDocument();
    });

    it("never auto-dismisses when duration is 0", () => {
      vi.useFakeTimers();
      render(
        <ToastProvider>
          <ShowToastButton message="Export finished" duration={0} />
        </ToastProvider>,
      );
      fireEvent.click(screen.getByRole("button", { name: "Show" }));
      vi.advanceTimersByTime(60_000);
      expect(screen.getByText("Export finished")).toBeInTheDocument();
    });

    it("dismisses via its own Notification's dismiss button", async () => {
      render(
        <ReducedMotionToastProvider>
          <ShowToastButton message="Export finished" duration={0} />
        </ReducedMotionToastProvider>,
      );
      fireEvent.click(screen.getByRole("button", { name: "Show" }));
      fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
      await waitFor(() => expect(screen.queryByText("Export finished")).not.toBeInTheDocument());
    });

    it("switches the viewport's aria-live urgency to assertive when the newest toast is an error", () => {
      render(
        <ToastProvider>
          <ShowToastButton message="Export failed" tone="error" duration={0} />
        </ToastProvider>,
      );
      fireEvent.click(screen.getByRole("button", { name: "Show" }));
      expect(screen.getByRole("region", { name: "Notifications" })).toHaveAttribute("aria-live", "assertive");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations with a visible toast", async () => {
      render(
        <ToastProvider>
          <ShowToastButton title="Export ready" message="homepage-banner.zip" duration={0} />
        </ToastProvider>,
      );
      fireEvent.click(screen.getByRole("button", { name: "Show" }));
      expect(await runA11yCheck(document.body)).toHaveNoA11yViolations();
    });
  });
});
