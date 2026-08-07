"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

type AnnouncePriority = "polite" | "assertive";

interface LiveRegionContextValue {
  announce: (message: string, priority?: AnnouncePriority) => void;
}

const LiveRegionContext = createContext<LiveRegionContextValue | null>(null);

/**
 * Mounted once at the app root (see src/app/layout.tsx). This is the shared
 * announcement primitive DS-6.3 found missing: a dozen-plus _data/accessibility.ts
 * pages across Operational, Workflow, and Platform already independently disclosed
 * the same gap — "no built-in aria-live region... the same opt-in convention every
 * prior package already follows" — and per that same audit trail, that convention
 * was adopted nowhere outside Toast.tsx. This provides two persistent, visually-hidden
 * live regions (polite/assertive) and a useAnnounce() hook any component can call
 * instead of hand-rolling its own aria-live markup.
 */
export function LiveRegionProvider({ children }: { children: ReactNode }) {
  const [politeMessage, setPoliteMessage] = useState("");
  const [assertiveMessage, setAssertiveMessage] = useState("");
  const parity = useRef(0);

  const announce = useCallback((message: string, priority: AnnouncePriority = "polite") => {
    // Screen readers only fire on an aria-live region's content actually changing —
    // toggle a trailing space so back-to-back identical announcements still land.
    parity.current += 1;
    const text = parity.current % 2 === 0 ? `${message} ` : message;
    if (priority === "assertive") setAssertiveMessage(text);
    else setPoliteMessage(text);
  }, []);

  return (
    <LiveRegionContext.Provider value={{ announce }}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {politeMessage}
      </div>
      <div aria-live="assertive" aria-atomic="true" className="sr-only">
        {assertiveMessage}
      </div>
    </LiveRegionContext.Provider>
  );
}

/** Announces a message to screen readers via the shared live regions mounted at the app root. */
export function useAnnounce(): (message: string, priority?: AnnouncePriority) => void {
  const context = useContext(LiveRegionContext);
  if (!context) {
    throw new Error("useAnnounce must be used within a LiveRegionProvider");
  }
  return context.announce;
}
