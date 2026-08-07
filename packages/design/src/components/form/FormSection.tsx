import type { ReactNode } from "react";
import { Panel, Stack } from "@/components/layout";
import { Body } from "@/components/ui";

interface FormSectionProps {
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
}

/**
 * A titled, bounded group of fields — built directly on Panel, the same
 * base PropertySection (Foundation Metadata) uses, rather than
 * FieldGroup's own hand-rolled "card" border (see Promotion Candidates).
 */
export function FormSection({ children, title, description, className }: FormSectionProps) {
  return (
    <Panel header={title ? <span className="text-body-sm font-medium text-ink-primary">{title}</span> : undefined} className={className}>
      <Stack gap="md">
        {description ? (
          <Body size="sm" muted>
            {description}
          </Body>
        ) : null}
        {children}
      </Stack>
    </Panel>
  );
}
