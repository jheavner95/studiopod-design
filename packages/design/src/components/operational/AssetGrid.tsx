"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Grid } from "@/components/layout";
import type { LinkComponent } from "@/framework";
import { AssetCard } from "./AssetCard";
import { AssetEmptyState, type AssetEmptyVariant } from "./AssetEmptyState";
import { AssetLoadingState } from "./AssetLoadingState";
import { toggleSelection } from "./DataGridSelection";

export interface AssetGridRenderer<T> {
  getId: (row: T) => string;
  getName: (row: T) => ReactNode;
  getSecondary?: (row: T) => ReactNode[];
  getThumbnailSrc?: (row: T) => string | undefined;
  getThumbnailFallbackIcon?: (row: T) => ReactNode;
  getStatus?: (row: T) => ReactNode;
  /** Where the row's card goes. Supplying it makes every card a real link. */
  getHref?: (row: T) => string | undefined;
  /** A shorter accessible name than the card's full visible content. */
  getLabel?: (row: T) => string | undefined;
}

export interface AssetGridProps<T> {
  rows: T[];
  render: AssetGridRenderer<T>;
  selectable?: boolean;
  selectedIds?: Set<string>;
  onSelectionChange?: (ids: Set<string>) => void;
  onItemClick?: (row: T) => void;
  loading?: boolean;
  loadingCount?: number;
  emptyVariant?: AssetEmptyVariant;
  /** Full replacement for the default AssetEmptyState. */
  emptyState?: ReactNode;
  minChildWidth?: string;
  /** What renders a card's link, when `render.getHref` supplies one. */
  linkComponent?: LinkComponent;
  className?: string;
}

/**
 * A grid of AssetCards — the card-based counterpart to AssetList (which
 * composes Data Grid's own table instead). Selection reuses Data Grid's
 * own toggleSelection helper rather than a second set implementation.
 */
export function AssetGrid<T>({
  rows,
  render,
  selectable = false,
  selectedIds,
  onSelectionChange,
  onItemClick,
  loading = false,
  loadingCount,
  emptyVariant,
  emptyState,
  minChildWidth = "160px",
  linkComponent,
  className,
}: AssetGridProps<T>) {
  const selected = selectedIds ?? new Set<string>();

  function handleToggle(id: string) {
    onSelectionChange?.(toggleSelection(selected, id));
  }

  if (loading) return <AssetLoadingState count={loadingCount} className={className} />;

  if (rows.length === 0) {
    return <div className={cn("py-6", className)}>{emptyState ?? <AssetEmptyState variant={emptyVariant} />}</div>;
  }

  return (
    <Grid columns="auto-fit" minChildWidth={minChildWidth} gap="md" className={className}>
      {rows.map((row) => {
        const id = render.getId(row);
        const href = render.getHref?.(row);
        const label = render.getLabel?.(row);
        return (
          <AssetCard
            key={id}
            name={render.getName(row)}
            secondary={render.getSecondary?.(row)}
            thumbnailSrc={render.getThumbnailSrc?.(row)}
            thumbnailFallbackIcon={render.getThumbnailFallbackIcon?.(row)}
            status={render.getStatus?.(row)}
            selectable={selectable}
            selected={selected.has(id)}
            onSelectChange={() => handleToggle(id)}
            {...(href === undefined ? {} : { href })}
            {...(linkComponent === undefined ? {} : { linkComponent })}
            {...(label === undefined ? {} : { "aria-label": label })}
            onClick={onItemClick ? () => onItemClick(row) : undefined}
          />
        );
      })}
    </Grid>
  );
}
