import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { TemplateCard } from "../_components/TemplateCard";
import { PLATFORM_TEMPLATES } from "../_data/templates";

export default function TemplatesPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · templates"
          title="Platform templates"
          description="How StudioPOD's seven platform workspaces will be assembled from the component families in the Operational Component Architecture — none of these are built yet. Readiness percentages are computed live from each template's required families."
        />
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
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
    </PageShell>
  );
}
