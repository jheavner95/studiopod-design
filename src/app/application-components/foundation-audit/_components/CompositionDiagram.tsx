import { Check, X } from "lucide-react";
import { Stack, Grid } from "@/components/layout";
import { cn } from "@/lib/utils";

interface DiagramNodeProps {
  title: string;
  detail: string;
}

function DiagramNode({ title, detail }: DiagramNodeProps) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border-subtle bg-surface p-4 text-center">
      <span className="text-body-sm font-medium text-ink-primary">{title}</span>
      <span className="text-caption text-ink-tertiary">{detail}</span>
    </div>
  );
}

function Edge({ verified, label }: { verified: boolean; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 py-1">
      <div className={cn("h-6 w-px", verified ? "bg-accent-400" : "border-l border-dashed border-border")} />
      <div
        className={cn(
          "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
          verified ? "bg-success-soft text-success" : "bg-canvas-raised text-ink-tertiary"
        )}
      >
        {verified ? <Check className="size-3" aria-hidden /> : <X className="size-3" aria-hidden />}
        {label}
      </div>
      <div className={cn("h-6 w-px", verified ? "bg-accent-400" : "border-l border-dashed border-border")} />
    </div>
  );
}

/**
 * A literal reading of the import-grep evidence in Section 3: solid, verified composition from
 * ui/ up through Table/Metadata/Forms, then a dashed, unverified edge into Workspace Architecture —
 * because zero workspace page imports any of the three.
 */
export function CompositionDiagram() {
  return (
    <Stack gap="none" className="items-stretch">
      <DiagramNode title="ui/ primitives" detail="Button, TextInput, Select, Checkbox, ToggleSwitch, Badge, StatCard…" />
      <Edge verified label="composes" />
      <DiagramNode title="Foundation Layout" detail="Stack, Inline, Grid, Surface, Panel, DescriptionList — 16 files" />
      <Edge verified label="composes" />
      <Grid columns={3} gap="sm">
        <DiagramNode title="Foundation Table" detail="13 components" />
        <DiagramNode title="Foundation Metadata" detail="16 components" />
        <DiagramNode title="Foundation Forms" detail="23 files" />
      </Grid>
      <Edge verified={false} label="no imports found" />
      <DiagramNode title="Workspace Architecture" detail="9 pages — import only PageShell / SectionShell / CardGrid" />
    </Stack>
  );
}
