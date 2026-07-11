"use client";

import { useCallback, useMemo, useState } from "react";
import type { StatGroupItem } from "@/components/metadata";
import { useAnnounce } from "@/components/feedback";
import {
  INITIAL_ARTWORKS,
  INITIAL_QUEUE_JOBS,
  PRODUCTION_STAGES,
  VALIDATION_FLOW_ORDER,
  VALIDATION_FLOW_LABEL,
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
  // Announces this feature's own selection/workflow/validation transitions through the shared
  // LiveRegionProvider mounted at the app root — this hook is the feature's Services layer, the one
  // place that already knows what changed and why, so the announcement lives here rather than
  // scattered across the presentation-only components it hands state down to.
  const announce = useAnnounce();

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

  const selectArtwork = useCallback(
    (id: string | null) => {
      setSelectedId(id);
      const artwork = id ? artworks.find((a) => a.id === id) : null;
      announce(artwork ? `${artwork.name} selected.` : "Selection cleared.");
    },
    [artworks, announce],
  );

  const advanceStage = useCallback(
    (id: string) => {
      const artwork = artworks.find((a) => a.id === id);
      updateArtwork(id, advanceProductionStage);
      if (artwork) {
        const nextStageId = advanceProductionStage(artwork).stage;
        const stageLabel = PRODUCTION_STAGES.find((s) => s.id === nextStageId)?.label ?? nextStageId;
        announce(`${artwork.name} moved to ${stageLabel}.`);
      }
    },
    [artworks, updateArtwork, announce],
  );

  const advanceValidation = useCallback(
    (id: string) => {
      const artwork = artworks.find((a) => a.id === id);
      updateArtwork(id, advanceValidationStatus);
      if (artwork) {
        const nextStatus = advanceValidationStatus(artwork).validationStatus;
        announce(`${artwork.name} validation: ${VALIDATION_FLOW_LABEL[nextStatus]}.`);
      }
    },
    [artworks, updateArtwork, announce],
  );

  const toggleIssue = useCallback(
    (artworkId: string, issueId: string) => updateArtwork(artworkId, (artwork) => toggleIssueResolved(artwork, issueId)),
    [updateArtwork],
  );

  const openDialog = useCallback((type: ProductionDialogType, artworkId: string) => setDialog({ type, artworkId }), []);
  const closeDialog = useCallback(() => setDialog(null), []);

  const confirmDialog = useCallback(() => {
    if (!dialog) return;
    const artwork = artworks.find((a) => a.id === dialog.artworkId);
    const name = artwork?.name ?? "Artwork";
    switch (dialog.type) {
      case "delete":
        removeArtwork(dialog.artworkId);
        announce(`${name} deleted.`);
        break;
      case "publish":
        updateArtwork(dialog.artworkId, publishArtwork);
        announce(`${name} published.`);
        break;
      case "export":
        updateArtwork(dialog.artworkId, exportArtwork);
        announce(`${name} exported.`);
        break;
      case "validation":
        updateArtwork(dialog.artworkId, advanceValidationStatus);
        if (artwork) announce(`${name} validation: ${VALIDATION_FLOW_LABEL[advanceValidationStatus(artwork).validationStatus]}.`);
        break;
      case "confirm":
        updateArtwork(dialog.artworkId, advanceProductionStage);
        if (artwork) {
          const stageLabel = PRODUCTION_STAGES.find((s) => s.id === advanceProductionStage(artwork).stage)?.label;
          announce(`${name} moved to ${stageLabel ?? "next stage"}.`);
        }
        break;
    }
    setDialog(null);
  }, [dialog, artworks, removeArtwork, updateArtwork, announce]);

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
