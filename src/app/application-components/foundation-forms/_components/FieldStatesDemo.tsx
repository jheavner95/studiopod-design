"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, Caption } from "@/components/ui";
import { InputField } from "@/components/form";

function PillButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "focus-ring rounded-full border px-3 py-1.5 text-caption font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        active
          ? "border-accent-500/60 bg-accent-soft/30 text-accent-300"
          : "border-border-subtle bg-surface text-ink-tertiary hover:text-ink-secondary",
      )}
    >
      {label}
    </button>
  );
}

/** Toggle Disabled, Required, and Error on one real InputField — three of the eleven documented states, live rather than only described. */
export function FieldStatesDemo() {
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <Card padding="lg" className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        <PillButton label="Disabled" active={disabled} onClick={() => setDisabled((v) => !v)} />
        <PillButton label="Required" active={required} onClick={() => setRequired((v) => !v)} />
        <PillButton label="Error" active={showError} onClick={() => setShowError((v) => !v)} />
      </div>
      <div className="max-w-sm rounded-lg border border-dashed border-border-subtle bg-canvas/40 p-6">
        <InputField
          label="Email"
          required={required}
          disabled={disabled}
          defaultValue={showError ? "not-an-email" : ""}
          error={showError ? "Enter a valid email address." : undefined}
          placeholder="you@example.com"
        />
      </div>
      <Caption className="text-ink-tertiary">
        Hover and Focus aren&rsquo;t toggleable here — try tabbing to the field above, or hovering it, to see those two live instead.
      </Caption>
    </Card>
  );
}
