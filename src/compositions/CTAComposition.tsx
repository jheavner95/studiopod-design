import type { ReactNode } from "react";
import { SectionShell, ContentColumns } from "@/components/layout";
import { SectionBadge, Heading, Display, Body, GlassPanel } from "@/components/ui";
import { SlideUp, FadeIn } from "@/components/motion";

export type CTASize = "sm" | "md" | "lg";
export type CTALayout = "centered" | "split" | "illustration";

export interface CTACompositionProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** A pre-built <CTAGroup> or <Button>. */
  cta: ReactNode;
  size?: CTASize;
  layout?: CTALayout;
  /** Used when layout="illustration". */
  illustration?: ReactNode;
  /** Wraps the content in a glass panel with an "Enterprise" badge for premium/enterprise-tier CTAs. */
  enterprise?: boolean;
  className?: string;
}

const spacingMap: Record<CTASize, "sm" | "md" | "lg"> = { sm: "sm", md: "md", lg: "lg" };
const headingLevelMap: Record<CTASize, 2 | 3> = { sm: 3, md: 2, lg: 2 };

function CTAHeading({ size, children }: { size: CTASize; children: ReactNode }) {
  if (size === "lg") return <Display className="max-w-2xl">{children}</Display>;
  return <Heading level={headingLevelMap[size]}>{children}</Heading>;
}

interface ContentProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  cta: ReactNode;
  size: CTASize;
}

function CenteredContent({ eyebrow, title, description, cta, size }: ContentProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {eyebrow ? <FadeIn>{eyebrow}</FadeIn> : null}
      <SlideUp>
        <CTAHeading size={size}>{title}</CTAHeading>
      </SlideUp>
      {description ? (
        <SlideUp delay={0.05}>
          <Body size="lg" muted className="max-w-[var(--container-narrow)]">
            {description}
          </Body>
        </SlideUp>
      ) : null}
      <SlideUp delay={0.1}>{cta}</SlideUp>
    </div>
  );
}

function SplitContent({ eyebrow, title, description, cta, size }: ContentProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3">
        {eyebrow}
        <CTAHeading size={size}>{title}</CTAHeading>
        {description ? (
          <Body muted size="sm">
            {description}
          </Body>
        ) : null}
      </div>
      <div className="shrink-0">{cta}</div>
    </div>
  );
}

function IllustrationContent({
  eyebrow,
  title,
  description,
  cta,
  size,
  illustration,
}: ContentProps & { illustration: ReactNode }) {
  return (
    <ContentColumns
      ratio="narrow-wide"
      primary={
        <div className="flex flex-col gap-6">
          {eyebrow ? <FadeIn>{eyebrow}</FadeIn> : null}
          <SlideUp>
            <CTAHeading size={size}>{title}</CTAHeading>
          </SlideUp>
          {description ? (
            <SlideUp delay={0.05}>
              <Body muted>{description}</Body>
            </SlideUp>
          ) : null}
          <SlideUp delay={0.1}>{cta}</SlideUp>
        </div>
      }
      secondary={<FadeIn>{illustration}</FadeIn>}
    />
  );
}

/** A closing call-to-action band. Three layouts, three sizes, and an enterprise treatment, all built from the same content model. */
export function CTAComposition({
  eyebrow,
  title,
  description,
  cta,
  size = "md",
  layout = "centered",
  illustration,
  enterprise = false,
  className,
}: CTACompositionProps) {
  const resolvedEyebrow = enterprise ? (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <SectionBadge>Enterprise</SectionBadge>
      {eyebrow}
    </div>
  ) : (
    eyebrow
  );

  let content: ReactNode;
  if (layout === "split") {
    content = <SplitContent eyebrow={resolvedEyebrow} title={title} description={description} cta={cta} size={size} />;
  } else if (layout === "illustration" && illustration) {
    content = (
      <IllustrationContent
        eyebrow={resolvedEyebrow}
        title={title}
        description={description}
        cta={cta}
        size={size}
        illustration={illustration}
      />
    );
  } else {
    content = <CenteredContent eyebrow={resolvedEyebrow} title={title} description={description} cta={cta} size={size} />;
  }

  const inner = enterprise ? (
    <GlassPanel padding="lg" className="border-accent-500/40 shadow-glow">
      {content}
    </GlassPanel>
  ) : (
    content
  );

  return (
    <SectionShell spacing={spacingMap[size]} className={className}>
      {inner}
    </SectionShell>
  );
}
