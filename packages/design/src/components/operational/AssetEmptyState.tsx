import type { ReactNode } from "react";
import { EmptyState, type EmptyStateTone } from "@/components/feedback";

export type AssetEmptyVariant = "no-data" | "no-results" | "error";

const VARIANT_DEFAULTS: Record<AssetEmptyVariant, { title: string; description: string; tone: EmptyStateTone }> = {
  "no-data": { title: "No assets yet", description: "Upload your first file to get started.", tone: "neutral" },
  "no-results": { title: "No results", description: "Try a different search or filter.", tone: "neutral" },
  error: { title: "Failed to load", description: "Check your connection and try again.", tone: "error" },
};

interface AssetEmptyStateProps {
  variant?: AssetEmptyVariant;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

/**
 * The empty placeholder for AssetGrid/AssetList alike — delegates entirely
 * to Foundation Feedback's own EmptyState (a plain <div>, the correct DOM
 * shape for a card grid) rather than Data Grid's own DataGridEmptyState,
 * which renders a <tr><td> and is only valid inside a <table>.
 */
export function AssetEmptyState({ variant = "no-data", title, description, action, className }: AssetEmptyStateProps) {
  const defaults = VARIANT_DEFAULTS[variant];
  return <EmptyState tone={defaults.tone} title={title ?? defaults.title} description={description ?? defaults.description} action={action} className={className} />;
}
