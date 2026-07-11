import { SectionShell, CardGrid } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { TemplateCard } from "../_components/TemplateCard";
import { PLATFORM_TEMPLATES } from "../_data/templates";

const entry = getEntry("templates")!;

export default function TemplatesPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="templates"
            eyebrow={<Eyebrow tone="accent">Templates</Eyebrow>}
            title="Seven workspaces"
            description="Every template links its required families back to the Architecture page, so the family that's blocking a template is always one click away."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {PLATFORM_TEMPLATES.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </CardGrid>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
