import { Sparkles } from "lucide-react";
import { SectionPlaceholder } from "@/components/layout";
import { Card, Body, Button } from "@/components/ui";
import { DESIGN_SYSTEM_SECTIONS } from "@/lib/design-system-nav";

const section = DESIGN_SYSTEM_SECTIONS.find((s) => s.id === "application-components")!;

export default function ApplicationComponentsPage() {
  return (
    <SectionPlaceholder section={section}>
      <Card className="flex flex-col gap-4 border-accent-500/30 bg-accent-soft/40 sm:flex-row sm:items-start">
        <Sparkles className="size-5 shrink-0 text-accent-400" aria-hidden />
        <div className="flex flex-col gap-4">
          <Body size="sm" muted>
            This is the next major focus of the StudioPOD Design System: the components, patterns, and diagram
            libraries the StudioPOD application&rsquo;s own screens are built from — not just how those subsystems
            are explained on a marketing page. The libraries below already exist and are the starting point.
          </Body>
          <Button variant="secondary" size="sm" href="/application-components/inventory" className="w-fit">
            View the component inventory
          </Button>
        </div>
      </Card>
    </SectionPlaceholder>
  );
}
