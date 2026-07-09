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
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="sm" href="/application-components/inventory">
              Component inventory
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/architecture">
              Architecture
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/coverage">
              Coverage matrix
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/maturity">
              Maturity model
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/templates">
              Platform templates
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/workspace-framework">
              Workspace framework
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/workspace-header">
              Workspace header
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/workspace-layout">
              Workspace layout
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/workspace-toolbar">
              Workspace toolbar
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/asset-workspace">
              Asset workspace
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/primary-workspace">
              Primary workspace
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/inspector-workspace">
              Inspector workspace
            </Button>
          </div>
        </div>
      </Card>
    </SectionPlaceholder>
  );
}
