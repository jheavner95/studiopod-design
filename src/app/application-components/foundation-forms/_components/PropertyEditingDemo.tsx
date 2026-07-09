"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Stack, Panel } from "@/components/layout";
import { Card, Body, Caption, Expandable } from "@/components/ui";
import { FormSection, PropertyEditor } from "@/components/form";

function SimpleExample() {
  const [name, setName] = useState("Homepage Banner");
  const [size, setSize] = useState("2.4 MB");
  return (
    <PropertyEditor
      columns={2}
      fields={[
        { id: "name", type: "text", label: "Name", value: name, onChange: setName },
        { id: "size", type: "text", label: "Size", value: size, onChange: setSize },
      ]}
    />
  );
}

function GroupedExample() {
  const [type, setType] = useState("artwork-project");
  const [owner, setOwner] = useState("J. Heavner");
  const [notify, setNotify] = useState(true);
  const [autoPublish, setAutoPublish] = useState(false);
  return (
    <Stack gap="md">
      <FormSection title="Identity">
        <PropertyEditor
          columns={2}
          fields={[
            { id: "type", type: "select", label: "Type", value: type, onChange: setType, options: [{ value: "artwork-project", label: "Artwork Project" }, { value: "style", label: "Style" }] },
            { id: "owner", type: "text", label: "Owner", value: owner, onChange: setOwner },
          ]}
        />
      </FormSection>
      <FormSection title="Behavior">
        <PropertyEditor
          columns={2}
          fields={[
            { id: "notify", type: "switch", label: "Notify on completion", value: notify, onChange: setNotify },
            { id: "auto-publish", type: "switch", label: "Auto-publish", value: autoPublish, onChange: setAutoPublish },
          ]}
        />
      </FormSection>
    </Stack>
  );
}

function InspectorExample() {
  const [name, setName] = useState("Homepage Banner");
  const [status, setStatus] = useState("draft");
  return (
    <Panel header={<span className="text-body-sm font-medium text-ink-primary">Inspector</span>} className="max-w-xs">
      <PropertyEditor
        columns={1}
        fields={[
          { id: "name", type: "text", label: "Name", value: name, onChange: setName },
          { id: "status", type: "select", label: "Status", value: status, onChange: setStatus, options: [{ value: "draft", label: "Draft" }, { value: "published", label: "Published" }] },
        ]}
      />
    </Panel>
  );
}

function AdvancedExample() {
  const [open, setOpen] = useState(false);
  const [timeout_, setTimeout_] = useState("30");
  const [retries, setRetries] = useState("3");
  return (
    <Card padding="md">
      <Expandable
        open={open}
        onOpenChange={setOpen}
        trigger={
          <>
            <ChevronDown className={cn("size-4 shrink-0 text-ink-tertiary transition-transform", open && "rotate-180")} aria-hidden />
            <span className="text-body-sm font-medium text-ink-primary">Advanced configuration</span>
          </>
        }
        contentClassName="pt-4"
      >
        <PropertyEditor
          columns={2}
          fields={[
            { id: "timeout", type: "text", label: "Timeout (seconds)", value: timeout_, onChange: setTimeout_ },
            { id: "retries", type: "text", label: "Max retries", value: retries, onChange: setRetries },
          ]}
        />
      </Expandable>
    </Card>
  );
}

const PATTERNS = [
  { id: "simple", name: "Simple property editor", description: "A flat PropertyEditor row — the default for a handful of unrelated fields.", Demo: SimpleExample },
  { id: "grouped", name: "Grouped properties", description: "Multiple FormSections, each with its own PropertyEditor — related fields stay visually together.", Demo: GroupedExample },
  { id: "inspector", name: "Inspector editing", description: "A single-column PropertyEditor inside a Panel at Inspector width.", Demo: InspectorExample },
  { id: "advanced", name: "Advanced configuration", description: "Progressive disclosure — rarely-needed fields stay collapsed behind Expandable until asked for.", Demo: AdvancedExample },
];

/** Four ways PropertyEditor composes into a real editing surface — each a live, working example. */
export function PropertyEditingDemo() {
  const [selectedId, setSelectedId] = useState(PATTERNS[0].id);
  const selected = PATTERNS.find((p) => p.id === selectedId) ?? PATTERNS[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {PATTERNS.map((pattern) => (
          <button
            key={pattern.id}
            type="button"
            onClick={() => setSelectedId(pattern.id)}
            aria-pressed={pattern.id === selectedId}
            className={cn(
              "focus-ring rounded-full border px-3 py-1.5 text-caption font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
              pattern.id === selectedId
                ? "border-accent-500/60 bg-accent-soft/30 text-accent-300"
                : "border-border-subtle bg-surface text-ink-tertiary hover:text-ink-secondary",
            )}
          >
            {pattern.name}
          </button>
        ))}
      </div>
      <Card padding="lg" className="flex flex-col gap-4">
        <Body muted>{selected.description}</Body>
        <div className="rounded-lg border border-dashed border-border-subtle bg-canvas/40 p-6">
          <selected.Demo />
        </div>
      </Card>
      <Caption className="text-ink-tertiary">
        Large forms should default to Grouped or Advanced — a flat Simple editor beyond ~6 fields starts to overwhelm.
      </Caption>
    </div>
  );
}
