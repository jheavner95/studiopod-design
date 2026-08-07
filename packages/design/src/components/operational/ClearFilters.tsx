import { X } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface ClearFiltersProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

/** The "clear all" action — pulled out standalone since Data Grid's own DataGridFilters and Foundation Forms' FilterBar each inline an identical reset button rather than sharing one. */
export function ClearFilters({ onClick, label = "Clear filters", className }: ClearFiltersProps) {
  return (
    <Button size="sm" variant="ghost" leadingIcon={<X className="size-3.5" />} onClick={onClick} className={cn(className)}>
      {label}
    </Button>
  );
}
