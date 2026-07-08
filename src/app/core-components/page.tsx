import { SectionPlaceholder } from "@/components/layout";
import { DESIGN_SYSTEM_SECTIONS } from "@/lib/design-system-nav";

const section = DESIGN_SYSTEM_SECTIONS.find((s) => s.id === "core-components")!;

export default function CoreComponentsPage() {
  return <SectionPlaceholder section={section} />;
}
