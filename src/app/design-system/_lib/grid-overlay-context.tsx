"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export interface GridOverlayState {
  layoutGrid: boolean;
  baselineGrid: boolean;
  containerWidth: boolean;
  safeArea: boolean;
}

const defaultState: GridOverlayState = {
  layoutGrid: false,
  baselineGrid: false,
  containerWidth: false,
  safeArea: false,
};

interface GridOverlayContextValue {
  state: GridOverlayState;
  toggle: (key: keyof GridOverlayState) => void;
}

const GridOverlayContext = createContext<GridOverlayContextValue | null>(null);

export function GridOverlayProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GridOverlayState>(defaultState);

  const value = useMemo<GridOverlayContextValue>(
    () => ({
      state,
      toggle: (key) => setState((prev) => ({ ...prev, [key]: !prev[key] })),
    }),
    [state],
  );

  return <GridOverlayContext.Provider value={value}>{children}</GridOverlayContext.Provider>;
}

export function useGridOverlay() {
  const ctx = useContext(GridOverlayContext);
  if (!ctx) {
    throw new Error("useGridOverlay must be used within a GridOverlayProvider");
  }
  return ctx;
}
