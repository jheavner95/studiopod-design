import type { ReactNode } from "react";
import type { TableDensity } from "@/components/table";
import { cn } from "@/lib/utils";
import { AssetBrowserToolbar } from "./AssetBrowserToolbar";
import { AssetSearch } from "./AssetSearch";
import { AssetFilters, type AssetFilterDef } from "./AssetFilters";
import { AssetViewToggle, type AssetViewMode } from "./AssetViewToggle";
import { AssetGrid, type AssetGridRenderer } from "./AssetGrid";
import { AssetList } from "./AssetList";
import { AssetPagination } from "./AssetPagination";
import { DataGridPagination } from "./DataGridPagination";
import type { DataGridEmptyVariant } from "./DataGridEmptyState";

export interface AssetBrowserPagination {
  page: number;
  pageCount: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

interface AssetBrowserProps<T> {
  rows: T[];
  render: AssetGridRenderer<T>;
  /** Announced to screen readers when viewMode is "list" — Data Grid's own required caption, passed through. */
  caption: ReactNode;
  viewMode: AssetViewMode;
  onViewModeChange: (mode: AssetViewMode) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filters?: AssetFilterDef[];
  activeFilters?: Record<string, string | null>;
  onFilterChange?: (key: string, value: string | null) => void;
  onFilterReset?: () => void;
  selectable?: boolean;
  selectedIds?: Set<string>;
  onSelectionChange?: (ids: Set<string>) => void;
  /** Action buttons rendered in the toolbar's bulk-action bar once something is selected. */
  bulkActions?: ReactNode;
  onItemClick?: (row: T) => void;
  loading?: boolean;
  emptyVariant?: DataGridEmptyVariant;
  pagination?: AssetBrowserPagination;
  density?: TableDensity;
  minChildWidth?: string;
  /** An InspectorPanel or PropertyPanel showing the current selection's detail — Asset Browser arranges it alongside the grid/list, it doesn't own or build one itself. */
  inspector?: ReactNode;
  className?: string;
}

/**
 * The canonical StudioPOD Asset Browser — the standard browsing experience
 * for every asset library. Composes Data Grid (AssetList), the Overlay/
 * Navigation/Forms/Feedback families (via AssetSearch/AssetFilters/
 * AssetViewToggle/AssetEmptyState/AssetLoadingState), and arranges an
 * Inspector Panel or Property Panel alongside as a caller-provided slot
 * rather than building a fourth panel implementation of its own.
 */
export function AssetBrowser<T>({
  rows,
  render,
  caption,
  viewMode,
  onViewModeChange,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  filters,
  activeFilters,
  onFilterChange,
  onFilterReset,
  selectable,
  selectedIds,
  onSelectionChange,
  bulkActions,
  onItemClick,
  loading,
  emptyVariant,
  pagination,
  density,
  minChildWidth,
  inspector,
  className,
}: AssetBrowserProps<T>) {
  const selectedCount = selectedIds?.size ?? 0;
  const columnCount = 1 + (render.getSecondary ? 1 : 0) + (render.getStatus ? 1 : 0) + (selectable ? 1 : 0);

  return (
    <div className={cn("flex flex-col gap-4 lg:flex-row", className)}>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <AssetBrowserToolbar selectedCount={selectedCount} bulkActions={bulkActions} onClearSelection={() => onSelectionChange?.(new Set())}>
          <div className="flex flex-wrap items-center gap-3">
            {onSearchChange ? <AssetSearch value={searchValue ?? ""} onChange={onSearchChange} placeholder={searchPlaceholder} /> : null}
            {filters && activeFilters && onFilterChange ? (
              <AssetFilters filters={filters} activeFilters={activeFilters} onChange={onFilterChange} onReset={onFilterReset} />
            ) : null}
          </div>
          <AssetViewToggle value={viewMode} onChange={onViewModeChange} />
        </AssetBrowserToolbar>

        {viewMode === "grid" ? (
          <>
            <AssetGrid
              rows={rows}
              render={render}
              selectable={selectable}
              selectedIds={selectedIds}
              onSelectionChange={onSelectionChange}
              onItemClick={onItemClick}
              loading={loading}
              emptyVariant={emptyVariant}
              minChildWidth={minChildWidth}
            />
            {pagination ? <AssetPagination {...pagination} /> : null}
          </>
        ) : (
          <AssetList
            caption={caption}
            rows={rows}
            render={render}
            selectable={selectable}
            selectedIds={selectedIds}
            onSelectionChange={onSelectionChange}
            onItemClick={onItemClick}
            loading={loading}
            emptyVariant={emptyVariant}
            density={density}
            footer={pagination ? <DataGridPagination {...pagination} colSpan={columnCount} /> : undefined}
          />
        )}
      </div>
      {inspector ? <div className="w-full shrink-0 lg:w-80">{inspector}</div> : null}
    </div>
  );
}
