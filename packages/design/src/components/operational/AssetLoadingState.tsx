import { Skeleton } from "@/components/feedback";
import { Grid } from "@/components/layout";

interface AssetLoadingStateProps {
  count?: number;
  className?: string;
}

/**
 * Skeleton cards shown while AssetGrid's data is loading — reuses
 * Foundation Feedback's own Skeleton primitive directly, shaped like an
 * AssetCard (a square thumbnail plus two text lines) rather than Data
 * Grid's own DataGridLoadingState, which renders <tr>/<td> skeleton rows
 * and is only valid inside a <table>.
 */
export function AssetLoadingState({ count = 8, className }: AssetLoadingStateProps) {
  return (
    <Grid columns="auto-fit" minChildWidth="160px" gap="md" className={className}>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Skeleton variant="block" className="aspect-square w-full rounded-md" />
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
      ))}
    </Grid>
  );
}
