"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMotion } from "@/hooks/useMotion";

interface MotionDebugOverlayProps {
  children: ReactNode;
  /** A short human-readable summary of this demo's resolved timing, e.g. "300ms · enter · 0ms delay". */
  label?: string;
  className?: string;
}

/** Throttled (~2/sec) so the frame readout doesn't itself become a re-render performance problem. */
function FrameReadout() {
  const { paused, reducedMotion, speed, scale } = useMotion();
  const [fps, setFps] = useState(0);
  const frameCount = useRef(0);
  const lastSample = useRef<number | null>(null);

  useEffect(() => {
    let raf: number;
    const tick = (time: number) => {
      if (lastSample.current === null) lastSample.current = time;
      frameCount.current += 1;
      const elapsed = time - lastSample.current;
      if (elapsed >= 500) {
        setFps(Math.round((frameCount.current * 1000) / elapsed));
        frameCount.current = 0;
        lastSample.current = time;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pointer-events-none absolute bottom-1 left-1 z-[var(--z-tooltip)] whitespace-nowrap rounded bg-canvas/90 px-1.5 py-0.5 font-mono text-[10px] text-ink-tertiary">
      ~{fps}fps · {speed}x · scale {scale} · {paused ? "paused" : reducedMotion ? "reduced" : "live"}
    </div>
  );
}

/**
 * Wraps a motion demo with opt-in developer overlays: animation bounds (a
 * dashed outline), transform origin (a center dot), a timing label, and a
 * live frame-rate readout. Every overlay is invisible chrome — it never
 * changes the wrapped content's own layout — and reads its on/off state
 * from MotionProvider's `diagnostics`, so toggling it anywhere (e.g. the
 * Motion Playground) affects every overlay on the page at once.
 */
export function MotionDebugOverlay({ children, label, className }: MotionDebugOverlayProps) {
  const { diagnostics } = useMotion();
  const anyChromeActive = diagnostics.bounds || diagnostics.origins || diagnostics.timingLabels;

  return (
    <div className={cn("relative block w-full", className)}>
      {children}
      {anyChromeActive && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit]",
            diagnostics.bounds && "outline outline-1 outline-dashed outline-accent-400/70",
          )}
        >
          {diagnostics.origins && (
            <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400" />
          )}
          {diagnostics.timingLabels && label && (
            <span className="absolute -top-5 left-0 whitespace-nowrap rounded bg-canvas/90 px-1.5 py-0.5 font-mono text-[10px] text-accent-400">
              {label}
            </span>
          )}
        </div>
      )}
      {diagnostics.frameDiagnostics && <FrameReadout />}
    </div>
  );
}
