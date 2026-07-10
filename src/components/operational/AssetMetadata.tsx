import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";

interface AssetMetadataProps {
  name: ReactNode;
  /** Rendered as a single "·"-joined caption line — type, size, modified date, or whatever the caller wants secondary. */
  secondary?: ReactNode[];
  className?: string;
}

/** The compact name + secondary-details line under an AssetThumbnail — built directly from Foundation Typography's Caption, distinct from Metadata's IdentityBlock (which is icon-led and status-badge-focused, the right fit for Inspector Panel's header, not a dense card grid). */
export function AssetMetadata({ name, secondary, className }: AssetMetadataProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-0.5", className)}>
      <span className="min-w-0 truncate text-body-sm font-medium text-ink-primary">{name}</span>
      {secondary && secondary.length > 0 ? (
        <Caption className="min-w-0 truncate text-ink-tertiary">
          {secondary.map((part, index) => (
            <span key={index}>
              {index > 0 ? " · " : ""}
              {part}
            </span>
          ))}
        </Caption>
      ) : null}
    </div>
  );
}
