"use client";

import { useState, type ComponentType } from "react";
import { cn } from "@/lib/utils";
import { Card, Badge, Body, Caption, Heading } from "@/components/ui";
import {
  InputField,
  TextareaField,
  SelectField,
  ComboboxField,
  CheckboxField,
  RadioGroupField,
  SwitchField,
  SliderField,
  DatePickerField,
  FileUploadField,
} from "@/components/form";
import { FIELD_DOCS, type FieldDoc } from "../_data/fields";

function InputDemo() {
  const [value, setValue] = useState("Homepage Banner");
  return <InputField label="Name" required value={value} onChange={(e) => setValue(e.target.value)} />;
}

function TextareaDemo() {
  const [value, setValue] = useState("");
  return <TextareaField label="Description" description="Shown on the object's own detail page." value={value} onChange={(e) => setValue(e.target.value)} placeholder="Optional notes" />;
}

function SelectDemo() {
  const [value, setValue] = useState("artwork-project");
  return (
    <SelectField
      label="Type"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      options={[
        { value: "artwork-project", label: "Artwork Project" },
        { value: "style", label: "Style" },
        { value: "ratio-set", label: "Ratio Set" },
      ]}
    />
  );
}

function ComboboxDemo() {
  const [value, setValue] = useState("");
  return (
    <ComboboxField
      label="Provider"
      value={value}
      onChange={setValue}
      placeholder="Search providers…"
      options={[
        { value: "shopify", label: "Shopify" },
        { value: "amazon", label: "Amazon" },
        { value: "etsy", label: "Etsy" },
        { value: "walmart", label: "Walmart" },
        { value: "printful", label: "Printful" },
      ]}
    />
  );
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  return <CheckboxField label="Notify me when this finishes" checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
}

function RadioDemo() {
  const [value, setValue] = useState("grid");
  return (
    <RadioGroupField
      label="Default view"
      value={value}
      onChange={setValue}
      options={[
        { value: "grid", label: "Grid" },
        { value: "table", label: "Table" },
      ]}
      orientation="horizontal"
    />
  );
}

function SwitchDemo() {
  const [checked, setChecked] = useState(true);
  return <SwitchField label="Enable notifications" checked={checked} onChange={setChecked} />;
}

function SliderDemo() {
  const [value, setValue] = useState(75);
  return <SliderField label="Quality" value={value} onChange={setValue} formatValue={(v) => `${v}%`} />;
}

function DatePickerDemo() {
  const [value, setValue] = useState("2026-07-09");
  return <DatePickerField label="Publish date" value={value} onChange={setValue} />;
}

function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);
  return <FileUploadField label="Attachment" files={files} onChange={setFiles} />;
}

const DEMO_BY_ID: Record<string, ComponentType> = {
  input: InputDemo,
  textarea: TextareaDemo,
  select: SelectDemo,
  combobox: ComboboxDemo,
  checkbox: CheckboxDemo,
  radio: RadioDemo,
  switch: SwitchDemo,
  slider: SliderDemo,
  "date-picker": DatePickerDemo,
  "file-upload": FileUploadDemo,
};

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

/** Select a field to see its purpose, a live example, and when — and when not — to reach for it. */
export function FieldGallery() {
  const [selectedId, setSelectedId] = useState(FIELD_DOCS[0].id);
  const selected: FieldDoc = FIELD_DOCS.find((f) => f.id === selectedId) ?? FIELD_DOCS[0];
  const Demo = DEMO_BY_ID[selected.id];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {FIELD_DOCS.map((field) => (
          <PillButton key={field.id} label={field.name} active={field.id === selectedId} onClick={() => setSelectedId(field.id)} />
        ))}
      </div>

      <Card padding="lg" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Heading level={3}>{selected.name}</Heading>
          <Body muted>{selected.purpose}</Body>
        </div>

        <div className="max-w-sm rounded-lg border border-dashed border-border-subtle bg-canvas/40 p-6">{Demo ? <Demo /> : null}</div>

        <div className="grid grid-cols-1 gap-6 border-t border-border-subtle pt-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Caption className="text-ink-tertiary">Variants</Caption>
            <div className="flex flex-wrap gap-1.5">
              {selected.variants.map((variant) => (
                <Badge key={variant} tone="neutral" size="sm">
                  {variant}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Caption className="text-ink-tertiary">States</Caption>
            <div className="flex flex-wrap gap-1.5">
              {selected.states.map((state) => (
                <Badge key={state} tone="neutral" size="sm">
                  {state}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Caption className="text-ink-tertiary">When to use</Caption>
            <Body size="sm" muted>
              {selected.whenToUse}
            </Body>
          </div>
          <div className="flex flex-col gap-1.5">
            <Caption className="text-ink-tertiary">When NOT to use</Caption>
            <Body size="sm" muted>
              {selected.whenNotToUse}
            </Body>
          </div>
          <div className="flex flex-col gap-1.5">
            <Caption className="text-ink-tertiary">Accessibility</Caption>
            <Body size="sm" muted>
              {selected.accessibility}
            </Body>
          </div>
          <div className="flex flex-col gap-1.5">
            <Caption className="text-ink-tertiary">Responsive behavior</Caption>
            <Body size="sm" muted>
              {selected.responsive}
            </Body>
          </div>
        </div>
      </Card>
    </div>
  );
}
