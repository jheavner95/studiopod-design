import { SegmentedControl } from "@/components/navigation";

export interface SearchScopeOption<T extends string> {
  value: T;
  label: string;
}

interface SearchScopeProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: SearchScopeOption<T>[];
  className?: string;
}

/** Narrowing where a query searches — "Everywhere / Name / Tags" — a thin preset over Foundation Navigation's SegmentedControl, not a second choice-input implementation. */
export function SearchScope<T extends string>({ value, onChange, options, className }: SearchScopeProps<T>) {
  return (
    <SegmentedControl
      aria-label="Search scope"
      value={value}
      onChange={onChange}
      className={className}
      options={options.map((option) => ({ value: option.value, label: option.label }))}
    />
  );
}
