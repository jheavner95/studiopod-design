import { SectionPlaceholder } from "@/components/layout";
import { DESIGN_SYSTEM_SECTIONS } from "@/lib/design-system-nav";

const section = DESIGN_SYSTEM_SECTIONS.find((s) => s.id === "foundations")!;

export default function FoundationsPage() {
  return <SectionPlaceholder section={section} />;
}
