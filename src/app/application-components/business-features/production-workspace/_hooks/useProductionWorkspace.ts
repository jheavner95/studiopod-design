"use client";

import { useCallback, useMemo, useState } from "react";
import type { StatGroupItem } from "@/components/metadata";
import {
  INITIAL_ARTWORKS,
  INITIAL_QUEUE_JOBS,
  PRODUCTION_STAGES,
  VALIDATION_FLOW_ORDER,
  advanceProductionStage,
  advanceValidationStatus,
  toggleIssueResolved,
  publishArtwork,
  exportArtwork,
  type ProductionArtwork,
} from "../_data/mock-production";

export type ProductionView = "pipeline" | "queue" | "dashboard";
export type ProductionDialogType = "validation" | "delete" | "publish" | "export" | "confirm";

export interface ProductionDialogState {
  type: ProductionDialogType;
  artworkId: string;
}

const HISTORY_LIMIT = 20;

/**
 * The Business Feature's own Services layer — everything DS-5.2's own
 * Feature Structure assigns to a Business Feature (state, orchestration,
 * commands, dialog state, selection, validation state, feature navigation,
 * feature actions, view switching) lives in this one hook. Every certified
 * component this feature renders is a controlled, presentation-only child —
 * none of them own state of their own beyond the local UI state the
 * DocsShell/Expandable/etc. components already manage internally.
 */
export function useProductionWorkspace() {
  const [artworks, setArtworks] = useState<ProductionArtwork[]>(INITIAL_ARTWORKS);
  const [queueJobs] = useState(INITIAL_QUEUE_JOBS);
  const [selectedId, setSelectedId] = useState<string | null>(INITIAL_ARTWORKS[2]?.id ?? null);
  const [view, setView] = useState<ProductionView>("pipeline");
  const [dialog, setDialog] = useState<ProductionDialogState | null>(null);

  const [past, setPast] = useState<ProductionArtwork[][]>([]);
  const [future, setFuture] = useState<ProductionArtwork[][]>([]);

  const commit = useCallback((next: ProductionArtwork[]) => {
    setPast((prev) => [...prev.slice(-HISTORY_LIMIT + 1), artworks]);
    setFuture([]);
    setArtworks(next);
  }, [artworks]);

  const updateArtwork = useCallback(
    (id: string, transform: (artwork: ProductionArtwork) => ProductionArtwork) => {
      commit(artworks.map((artwork) => (artwork.id === id ? transform(artwork) : artwork)));
    },
    [artworks, commit],
  );

  const removeArtwork = useCallback(
    (id: string) => {
      commit(artworks.filter((artwork) => artwork.id !== id));
      setSelectedId((current) => (current === id ? null : current));
    },
    [artworks, commit],
  );

  const selectArtwork = useCallback((id: string | null) => setSelectedId(id), []);

  const advanceStage = useCallback((id: string) => updateArtwork(id, advanceProductionStage), [updateArtwork]);

  const advanceValidation = useCallback((id: string) => updateArtwork(id, advanceValidationStatus), [updateArtwork]);

  const toggleIssue = useCallback(
    (artworkId: string, issueId: string) => updateArtwork(artworkId, (artwork) => toggleIssueResolved(artwork, issueId)),
    [updateArtwork],
  );

  const openDialog = useCallback((type: ProductionDialogType, artworkId: string) => setDialog({ type, artworkId }), []);
  const closeDialog = useCallback(() => setDialog(null), []);

  const confirmDialog = useCallback(() => {
    if (!dialog) return;
    switch (dialog.type) {
      case "delete":
        removeArtwork(dialog.artworkId);
        break;
      case "publish":
        updateArtwork(dialog.artworkId, publishArtwork);
        break;
      case "export":
        updateArtwork(dialog.artworkId, exportArtwork);
        break;
      case "validation":
        updateArtwork(dialog.artworkId, advanceValidationStatus);
        break;
      case "confirm":
        updateArtwork(dialog.artworkId, advanceProductionStage);
        break;
    }
    setDialog(null);
  }, [dialog, removeArtwork, updateArtwork]);

  const undo = useCallback(() => {
    setPast((prevPast) => {
      if (prevPast.length === 0) return prevPast;
      const previous = prevPast[prevPast.length - 1];
      setFuture((prevFuture) => [artworks, ...prevFuture].slice(0, HISTORY_LIMIT));
      setArtworks(previous);
      return prevPast.slice(0, -1);
    });
  }, [artworks]);

  const redo = useCallback(() => {
    setFuture((prevFuture) => {
      if (prevFuture.length === 0) return prevFuture;
      const next = prevFuture[0];
      setPast((prevPast) => [...prevPast.slice(-HISTORY_LIMIT + 1), artworks]);
      setArtworks(next);
      return prevFuture.slice(1);
    });
  }, [artworks]);

  const selectedArtwork = useMemo(() => artworks.find((artwork) => artwork.id === selectedId) ?? null, [artworks, selectedId]);

  const artworksByStage = useMemo(() => {
    const grouped = new Map<string, ProductionArtwork[]>();
    for (const stage of PRODUCTION_STAGES) grouped.set(stage.id, []);
    for (const artwork of artworks) grouped.get(artwork.stage)?.push(artwork);
    return grouped;
  }, [artworks]);

  const metrics: StatGroupItem[] = useMemo(() => {
    const total = artworks.length || 1;
    const blocked = artworks.filter((a) => a.issues.some((i) => i.severity === "error" && !i.resolved)).length;
    const validated = artworks.filter((a) => VALIDATION_FLOW_ORDER.indexOf(a.validationStatus) >= VALIDATION_FLOW_ORDER.indexOf("validated")).length;
    const published = artworks.filter((a) => a.published).length;
    return [
      { value: `${Math.round((validated / total) * 100)}%`, label: "Validated or later" },
      { value: String(blocked), label: "Blocked by open errors" },
      { value: String(published), label: "Published" },
      { value: String(artworks.length), label: "Total artworks" },
    ];
  }, [artworks]);

  return {
    artworks,
    artworksByStage,
    queueJobs,
    selectedId,
    selectedArtwork,
    view,
    dialog,
    metrics,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    setView,
    selectArtwork,
    advanceStage,
    advanceValidation,
    toggleIssue,
    openDialog,
    closeDialog,
    confirmDialog,
    undo,
    redo,
  };
}

export type UseProductionWorkspaceReturn = ReturnType<typeof useProductionWorkspace>;
