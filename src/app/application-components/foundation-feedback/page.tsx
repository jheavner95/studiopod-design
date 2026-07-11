import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { FeedbackGallery } from "./_components/FeedbackGallery";
import { FEEDBACK_ANATOMY } from "./_data/anatomy";
import { FEEDBACK_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { FEEDBACK_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { FEEDBACK_PROMOTION_CANDIDATES, FEEDBACK_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { FEEDBACK_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("foundation-feedback")!;

export default function FoundationFeedbackPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="feedback-anatomy"
            eyebrow={<Eyebrow tone="accent">Feedback anatomy</Eyebrow>}
            title="Six axes, one family"
            description="Transient, Persistent, Blocking, Non-blocking, Inline, and Global — most components sit on more than one; this groups by the axis each is most defined by."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {FEEDBACK_ANATOMY.map((region) => (
              <Card key={region.name} className="flex flex-col gap-2">
                <span className="text-body-md font-medium text-ink-primary">{region.name}</span>
                <Body size="sm" muted>
                  {region.description}
                </Body>
                <Caption className="border-t border-border-subtle pt-3 text-ink-tertiary">{region.components}</Caption>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="component-gallery"
            eyebrow={<Eyebrow tone="accent">Component gallery</Eyebrow>}
            title="Every component, live"
            description="Each demo below is a real, working component with real local state — not a static screenshot. Try Toast's button, Progress Bar's ± controls, and each dismissible component's close button."
            descriptionMaxWidth={false}
          />
          <FeedbackGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="states"
            eyebrow={<Eyebrow tone="accent">States</Eyebrow>}
            title="States"
            description="Eight states this family recognizes, grounded in the real implementation detail behind each one."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={FEEDBACK_STATES.map((item) => ({ label: item.state, value: item.note }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="responsive-behavior"
            eyebrow={<Eyebrow tone="accent">Responsive behavior</Eyebrow>}
            title="Responsive behavior"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {BREAKPOINT_NOTES.map((item) => (
              <Card key={item.breakpoint} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{item.breakpoint}</span>
                <Body size="sm" muted>
                  {item.note}
                </Body>
              </Card>
            ))}
          </CardGrid>
          <DescriptionList items={RESPONSIVE_TOPICS.map((topic) => ({ label: topic.label, value: topic.note }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={FEEDBACK_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="implementation-guidance"
            eyebrow={<Eyebrow tone="accent">Implementation guidance</Eyebrow>}
            title="Implementation guidance"
            descriptionMaxWidth={false}
          />
          <DescriptionList items={IMPLEMENTATION_GUIDANCE.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="promotion-candidates"
            eyebrow={<Eyebrow tone="accent">Promotion candidates</Eyebrow>}
            title="Promotion candidates"
            description="Real, grep-verified duplication found while building this system — not estimated or carried over from memory. This audit came back almost entirely clean, a genuinely different result from every prior Foundation package."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-6">
            {FEEDBACK_PROMOTION_CANDIDATES.map((candidate) => (
              <Card key={candidate.id} className="flex flex-col gap-3">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="text-body-md font-medium text-ink-primary">{candidate.pattern}</span>
                  <Badge tone="warning" size="sm" className="w-fit shrink-0 whitespace-nowrap">
                    {candidate.files.length} {candidate.files.length === 1 ? "file" : "files"}
                  </Badge>
                </div>
                <Body size="sm" muted>
                  {candidate.description}
                </Body>
                <ul className="flex flex-col gap-1 border-t border-border-subtle pt-3">
                  {candidate.files.map((file) => (
                    <li key={file} className="text-metadata text-ink-tertiary">
                      <code className="break-words">{file}</code>
                    </li>
                  ))}
                </ul>
                <Body size="sm" muted className="border-t border-border-subtle pt-3">
                  {candidate.migrationNote}
                </Body>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Clean findings</span>
            {FEEDBACK_CLEAN_FINDINGS.map((finding) => (
              <Card key={finding.slice(0, 24)} className="flex flex-col gap-2 border-success/30 bg-success-soft">
                <Body size="sm" muted>
                  {finding}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="future-extensions"
            eyebrow={<Eyebrow tone="accent">Future extensions</Eyebrow>}
            title="Future extensions"
            description="Room the current system leaves for later — reserved, not scoped or committed."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {FEEDBACK_FUTURE_EXTENSIONS.map((extension) => (
              <Card key={extension.title} className="flex flex-col gap-2 border-dashed">
                <span className="text-body-sm font-medium text-ink-primary">{extension.title}</span>
                <Body size="sm" muted>
                  {extension.description}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
