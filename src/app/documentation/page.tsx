import { SectionPlaceholder } from "@/components/layout";
import { DESIGN_SYSTEM_SECTIONS } from "@/lib/design-system-nav";

const section = DESIGN_SYSTEM_SECTIONS.find((s) => s.id === "documentation")!;

export default function DocumentationPage() {
  return <SectionPlaceholder section={section} />;
}
