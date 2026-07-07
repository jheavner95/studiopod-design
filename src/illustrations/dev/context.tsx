"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export interface IllustrationDevState {
  nodeBounds: boolean;
  anchorPoints: boolean;
  connectorRouting: boolean;
  grid: boolean;
  animationPaths: boolean;
  labelRegions: boolean;
}

const DEFAULT_STATE: IllustrationDevState = {
  nodeBounds: false,
  anchorPoints: false,
  connectorRouting: false,
  grid: false,
  animationPaths: false,
  labelRegions: false,
};

interface IllustrationDevContextValue {
  state: IllustrationDevState;
  setToggle: (key: keyof IllustrationDevState, value: boolean) => void;
}

const IllustrationDevContext = createContext<IllustrationDevContextValue | null>(null);

/**
 * Page-scoped, unlike MotionProvider — dev overlays are a diagram-authoring
 * tool, not a universal concern, so only the playground wraps this. Every
 * illustration primitive reads `useIllustrationDev()` with a safe
 * all-off default, so they render identically whether or not a provider
 * is present.
 */
export function IllustrationDevProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<IllustrationDevState>(DEFAULT_STATE);

  const setToggle = useCallback((key: keyof IllustrationDevState, value: boolean) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const value = useMemo(() => ({ state, setToggle }), [state, setToggle]);

  return <IllustrationDevContext.Provider value={value}>{children}</IllustrationDevContext.Provider>;
}

/** The read-only state every illustration primitive checks before drawing dev chrome. Safe with no provider. */
export function useIllustrationDev(): IllustrationDevState {
  const ctx = useContext(IllustrationDevContext);
  return ctx?.state ?? DEFAULT_STATE;
}

/** The read/write pair the playground's control panel uses. Safe with no provider (returns a no-op setter). */
export function useIllustrationDevControls(): IllustrationDevContextValue {
  const ctx = useContext(IllustrationDevContext);
  return ctx ?? { state: DEFAULT_STATE, setToggle: () => {} };
}
