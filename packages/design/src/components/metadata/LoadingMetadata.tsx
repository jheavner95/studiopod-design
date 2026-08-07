import { Skeleton } from "@/components/ui";
import { Stack } from "@/components/layout";

interface LoadingMetadataProps {
  rows?: number;
  className?: string;
}

/** Skeleton rows for a metadata region while data is loading — reuses Skeleton directly, the same primitive Foundation Table's TableLoadingState already uses. */
export function LoadingMetadata({ rows = 4, className }: LoadingMetadataProps) {
  return (
    <Stack gap="sm" className={className}>
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} className="h-4 w-full max-w-xs" />
      ))}
    </Stack>
  );
}
