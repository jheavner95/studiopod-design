"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { Surface, Stack } from "@/components/layout";
import { Body } from "@/components/ui";
import { feedbackRole } from "@/components/feedback/Alert";
import { useAnnounce } from "@/components/feedback/LiveRegion";
import { FIELD_MESSAGE_TEXT, type FieldMessageTone } from "./FieldError";

export interface ValidationSummaryItem {
  field: string;
  message: string;
  /** DS-5B: reuses FieldError's own FieldMessageTone rather than an independently declared "error"|"warning" union of the same two values. */
  severity: FieldMessageTone;
  /** An anchor id to jump to the field in question, if the form has one. */
  href?: string;
}

interface ValidationSummaryProps {
  items: ValidationSummaryItem[];
  title?: ReactNode;
  className?: string;
}

const SEVERITY_ICON = { error: AlertCircle, warning: AlertTriangle };

/**
 * An aggregate list of every field's own error/warning, surfaced once
 * at the top of the form — built on Surface directly rather than a
 * bespoke Alert (Alert itself is still "Needed" in the Foundation
 * Component Catalog). Its role="alert"/"status" root is itself an implicit
 * live region, so new items appearing are already announced without extra
 * wiring — but there's nothing left mounted to announce the opposite
 * transition, so a useAnnounce() call below covers items going back to
 * empty (validation passing) via the shared LiveRegionProvider instead.
 */
export function ValidationSummary({ items, title = "Please review the following", className }: ValidationSummaryProps) {
  const announce = useAnnounce();
  const hadItems = useRef(false);

  useEffect(() => {
    if (items.length === 0) {
      if (hadItems.current) announce("Validation passed — no errors remain.");
      hadItems.current = false;
    } else {
      hadItems.current = true;
    }
  }, [items.length, announce]);

  if (items.length === 0) return null;

  const errorCount = items.filter((item) => item.severity === "error").length;
  // Reuses Alert's shared error-is-assertive/rest-are-polite rule (same one FieldError already
  // consolidates onto) instead of re-deriving the alert/status split locally.
  const role = feedbackRole(errorCount > 0 ? "error" : "warning");

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
                  <Icon className={`mt-0.5 size-4 shrink-0 ${FIELD_MESSAGE_TEXT[item.severity]}`} aria-hidden />
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
