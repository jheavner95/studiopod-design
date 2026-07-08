import { SectionPlaceholder } from "@/components/layout";
import { DESIGN_SYSTEM_SECTIONS } from "@/lib/design-system-nav";

const section = DESIGN_SYSTEM_SECTIONS.find((s) => s.id === "tokens")!;

export default function TokensPage() {
  return <SectionPlaceholder section={section} />;
}
