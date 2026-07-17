import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IdentityBlock } from "@/components/metadata";
import type { StatusTone } from "@/lib/tone";

interface InspectorHeaderProps {
  icon?: ReactNode;
  name: ReactNode;
  type?: ReactNode;
  status?: { label: string; tone?: StatusTone };
  /** A dismiss control — pass when the Inspector renders inside a Drawer/mobile view. */
  onCollapse?: () => void;
  className?: string;
}

/**
 * "What's selected" — icon, name, type, quick status. Composes Foundation
 * Metadata's IdentityBlock directly rather than re-declaring that layout;
 * stays sticky at the top of InspectorPanel's scroll area, matching the
 * sticky behavior already documented for the Inspector Workspace's own
 * Inspector Header region.
 */
export function InspectorHeader({ icon, name, type, status, onCollapse, className }: InspectorHeaderProps) {
  return (
    <div className={cn("sticky top-0 z-10 border-b border-border-subtle bg-surface px-6 py-4", className)}>
      <div className="flex items-center gap-3">
        <IdentityBlock icon={icon} name={name} type={type} status={status} className="min-w-0 flex-1" />
        {onCollapse ? (
          <button
            type="button"
            onClick={onCollapse}
            aria-label="Close inspector"
            className="focus-ring shrink-0 rounded-md p-1.5 text-ink-tertiary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-ink-primary"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
