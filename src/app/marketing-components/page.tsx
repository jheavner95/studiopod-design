import { Info } from "lucide-react";
import { SectionPlaceholder } from "@/components/layout";
import { Card, Body } from "@/components/ui";
import { DESIGN_SYSTEM_SECTIONS } from "@/lib/design-system-nav";

const section = DESIGN_SYSTEM_SECTIONS.find((s) => s.id === "marketing-components")!;

export default function MarketingComponentsPage() {
  return (
    <SectionPlaceholder section={section}>
      <Card className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <Info className="size-5 shrink-0 text-accent-400" aria-hidden />
        <Body size="sm" muted>
          This package used to be the entire project. It has been reclassified: the compositions below are early
          design-system examples of how the core components and tokens compose into marketing page sections — not a
          roadmap toward a finished marketing site. That work is paused while{" "}
          <span className="font-medium text-ink-secondary">Application Components</span> becomes the priority.
        </Body>
      </Card>
    </SectionPlaceholder>
  );
}
