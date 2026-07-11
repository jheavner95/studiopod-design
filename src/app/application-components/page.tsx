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
            <Button variant="secondary" size="sm" href="/application-components/status-workspace">
              Status workspace
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/workspace-certification">
              Workspace certification
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/foundation-components">
              Foundation components
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/foundation-layout">
              Foundation layout primitives
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/foundation-table">
              Foundation table system
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/foundation-metadata">
              Foundation metadata system
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/foundation-forms">
              Foundation form system
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/foundation-overlays">
              Foundation overlay system
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/foundation-navigation">
              Foundation navigation system
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/foundation-feedback">
              Foundation feedback system
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/foundation-audit">
              Foundation layer audit
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/data-grid">
              Data grid
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/inspector-panel">
              Inspector panel
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/property-panel">
              Property panel
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/asset-browser">
              Asset browser
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/filter-search">
              Filter & search system
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/bulk-actions">
              Bulk actions system
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/status-health">
              Status & health panels
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/queue-jobs">
              Queue & job components
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/dashboard-widgets">
              Dashboard widgets
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/workflow-framework">
              Workflow framework
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/workflow-stepper">
              Workflow stepper
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/workflow-timeline">
              Workflow timeline
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/approval-review">
              Approval & review
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/pipeline-components">
              Pipeline components
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/state-machine">
              State machine
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/dependency-relationships">
              Dependency & relationships
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/workflow-visualization">
              Workflow visualization
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/operational-certification">
              Operational certification
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/workflow-certification">
              Workflow certification
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/platform-architecture">
              Platform architecture
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/production-platform">
              Production platform
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/product-platform">
              Product platform
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/publishing-platform">
              Publishing platform
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/commerce-platform">
              Commerce platform
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/intelligence-platform">
              Intelligence platform
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/operations-platform">
              Operations platform
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/admin-platform">
              Admin platform
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/integrations-platform">
              Integrations platform
            </Button>
            <Button variant="secondary" size="sm" href="/application-components/platform-certification">
              Platform certification
            </Button>
          </div>
        </div>
      </Card>
    </SectionPlaceholder>
  );
}
