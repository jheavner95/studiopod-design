import type { ReactNode } from "react";
import { Inline, Stack } from "@/components/layout";
import { Badge } from "@/components/ui";

type StatusTone = "neutral" | "accent" | "success" | "warning" | "error";

interface IdentityBlockProps {
  icon?: ReactNode;
  name: ReactNode;
  type?: ReactNode;
  status?: { label: string; tone?: StatusTone };
  className?: string;
}

/**
 * "What am I looking at right now" — icon, name, type, and an optional
 * quick-status Badge. The same shape every workspace's own Identity
 * anatomy region already establishes ad hoc (see Promotion Candidates),
 * generalized into one component.
 */
export function IdentityBlock({ icon, name, type, status, className }: IdentityBlockProps) {
  return (
    <Inline gap="sm" align="center" wrap={false} className={className}>
      {icon ? (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft/30 text-accent-300">{icon}</span>
      ) : null}
      <Stack gap="none" className="min-w-0">
        <span className="min-w-0 truncate text-body-md font-medium text-ink-primary">{name}</span>
        {type ? <span className="min-w-0 truncate text-caption text-ink-tertiary">{type}</span> : null}
      </Stack>
      {status ? (
        <Badge tone={status.tone ?? "neutral"} size="sm" className="ml-auto shrink-0">
          {status.label}
        </Badge>
      ) : null}
    </Inline>
  );
}
