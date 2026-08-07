import { SearchInput } from "@/components/ui";
import { cn } from "@/lib/utils";

interface DataGridSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/** A grid-scoped search field — a thin width/placement preset over Foundation Forms' own SearchInput, not a reimplementation. */
export function DataGridSearch({ value, onChange, placeholder = "Search", className }: DataGridSearchProps) {
  return <SearchInput value={value} onChange={onChange} placeholder={placeholder} className={cn("w-full sm:max-w-xs", className)} />;
}
