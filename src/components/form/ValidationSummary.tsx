import type { ReactNode } from "react";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { Surface, Stack } from "@/components/layout";
import { Body } from "@/components/ui";

export interface ValidationSummaryItem {
  field: string;
  message: string;
  severity: "error" | "warning";
  /** An anchor id to jump to the field in question, if the form has one. */
  href?: string;
}

interface ValidationSummaryProps {
  items: ValidationSummaryItem[];
  title?: ReactNode;
  className?: string;
}

const SEVERITY_ICON = { error: AlertCircle, warning: AlertTriangle };
const SEVERITY_COLOR = { error: "text-error", warning: "text-warning" };

/**
 * An aggregate list of every field's own error/warning, surfaced once
 * at the top of the form — built on Surface directly rather than a
 * bespoke Alert (Alert itself is still "Needed" in the Foundation
 * Component Catalog).
 */
export function ValidationSummary({ items, title = "Please review the following", className }: ValidationSummaryProps) {
  if (items.length === 0) return null;

  const errorCount = items.filter((item) => item.severity === "error").length;
  const role = errorCount > 0 ? "alert" : "status";

  return (
    <div role={role} className={className}>
      <Surface border elevation="none" padding="md">
        <Stack gap="sm">
          <Body size="sm" className="font-medium">
            {title}
          </Body>
          <ul className="flex flex-col gap-1.5">
            {items.map((item, index) => {
              const Icon = SEVERITY_ICON[item.severity];
              const content = (
                <span className="flex items-start gap-2 text-body-sm text-ink-secondary">
                  <Icon className={`mt-0.5 size-4 shrink-0 ${SEVERITY_COLOR[item.severity]}`} aria-hidden />
                  <span className="min-w-0 break-words">
                    <span className="font-medium text-ink-primary">{item.field}:</span> {item.message}
                  </span>
                </span>
              );
              return (
                <li key={index}>
                  {item.href ? (
                    <a href={item.href} className="focus-ring block rounded-md hover:underline">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>
        </Stack>
      </Surface>
    </div>
  );
}
