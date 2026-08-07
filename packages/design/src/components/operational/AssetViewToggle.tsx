import { LayoutGrid, List } from "lucide-react";
import { SegmentedControl } from "@/components/navigation";

export type AssetViewMode = "grid" | "list";

interface AssetViewToggleProps {
  value: AssetViewMode;
  onChange: (value: AssetViewMode) => void;
  className?: string;
}

/** Switching between AssetGrid and AssetList — a thin preset over Foundation Navigation's SegmentedControl, not a second choice-input implementation. */
export function AssetViewToggle({ value, onChange, className }: AssetViewToggleProps) {
  return (
    <SegmentedControl
      aria-label="View"
      value={value}
      onChange={onChange}
      className={className}
      options={[
        { value: "grid", label: <LayoutGrid className="size-4" aria-hidden />, "aria-label": "Grid view" },
        { value: "list", label: <List className="size-4" aria-hidden />, "aria-label": "List view" },
      ]}
    />
  );
}
