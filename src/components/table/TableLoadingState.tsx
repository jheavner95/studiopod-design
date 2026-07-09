import { Skeleton } from "@/components/ui";

interface TableLoadingStateProps {
  rows?: number;
  columns: number;
}

/** Skeleton rows shown while data is loading — reuses the same Skeleton primitive every other loading state in this design system already uses, never a bespoke shimmer. */
export function TableLoadingState({ rows = 5, columns }: TableLoadingStateProps) {
  return (
    <>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-border-subtle last:border-b-0">
          {Array.from({ length: columns }, (_, colIndex) => (
            <td key={colIndex} className="px-4 py-3">
              <Skeleton className="h-4 w-full max-w-32" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
