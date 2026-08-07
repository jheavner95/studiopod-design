import type { ReactNode } from "react";
import type { TableDensity } from "@/components/table";
import { DataGrid } from "./DataGrid";
import type { DataGridColumn } from "./DataGridColumn";
import type { DataGridEmptyVariant } from "./DataGridEmptyState";
import { AssetThumbnail } from "./AssetThumbnail";
import type { AssetGridRenderer } from "./AssetGrid";

export interface AssetListProps<T> {
  rows: T[];
  render: AssetGridRenderer<T>;
  caption: ReactNode;
  selectable?: boolean;
  selectedIds?: Set<string>;
  onSelectionChange?: (ids: Set<string>) => void;
  onItemClick?: (row: T) => void;
  loading?: boolean;
  emptyVariant?: DataGridEmptyVariant;
  footer?: ReactNode;
  density?: TableDensity;
  className?: string;
}

/**
 * The table counterpart to AssetGrid, sharing the exact same rows+render
 * shape so a caller can switch AssetViewToggle between them without
 * redefining columns twice. Composes Operational Data Grid directly — a
 * fixed Name/Details/Status column preset over DataGrid's own table,
 * selection, and empty/loading states, rather than a second table
 * implementation.
 */
export function AssetList<T>({
  rows,
  render,
  caption,
  selectable,
  selectedIds,
  onSelectionChange,
  onItemClick,
  loading,
  emptyVariant,
  footer,
  density,
  className,
}: AssetListProps<T>) {
  const columns: DataGridColumn<T>[] = [
    {
      id: "name",
      header: "Name",
      sticky: true,
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <AssetThumbnail
            src={render.getThumbnailSrc?.(row)}
            alt=""
            fallbackIcon={render.getThumbnailFallbackIcon?.(row)}
            className="size-9 shrink-0 rounded"
          />
          <span className="min-w-0 truncate">{render.getName(row)}</span>
        </div>
      ),
    },
  ];

  if (render.getSecondary) {
    columns.push({
      id: "details",
      header: "Details",
      accessor: (row) => {
        const parts = render.getSecondary!(row);
        return (
          <span className="text-ink-tertiary">
            {parts.map((part, index) => (
              <span key={index}>
                {index > 0 ? " · " : ""}
                {part}
              </span>
            ))}
          </span>
        );
      },
    });
  }

  if (render.getStatus) {
    columns.push({ id: "status", header: "Status", accessor: (row) => render.getStatus!(row) });
  }

  return (
    <DataGrid
      caption={caption}
      columns={columns}
      rows={rows}
      getRowId={render.getId}
      selectable={selectable}
      selectedIds={selectedIds}
      onSelectionChange={onSelectionChange}
      onRowClick={onItemClick}
      loading={loading}
      emptyVariant={emptyVariant}
      footer={footer}
      density={density}
      className={className}
    />
  );
}
