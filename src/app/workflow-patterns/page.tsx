import { SectionPlaceholder } from "@/components/layout";
import { DESIGN_SYSTEM_SECTIONS } from "@/lib/design-system-nav";

const section = DESIGN_SYSTEM_SECTIONS.find((s) => s.id === "workflow-patterns")!;

export default function WorkflowPatternsPage() {
  return <SectionPlaceholder section={section} />;
}
