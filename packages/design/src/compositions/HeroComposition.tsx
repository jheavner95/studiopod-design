import type { ReactNode } from "react";
import { SectionShell, ContentColumns, CardGrid } from "@/components/layout";
import { Display, Body, StatCard, Caption } from "@/components/ui";
import { FadeIn, SlideUp, ScaleIn, StaggerGroup, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

export interface HeroMetric {
  value: ReactNode;
  label: ReactNode;
}

export interface HeroTrustRow {
  label?: ReactNode;
  items: ReactNode[];
}

export type HeroLayout = "centered" | "split" | "illustration-first";

export interface HeroCompositionProps {
  /** Typically a <SectionBadge> or <Eyebrow>. */
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** A pre-built <CTAGroup>. */
  cta?: ReactNode;
  /** A pre-built visual — a GlassPanel, a PipelineStep row, a screenshot, anything. */
  illustration?: ReactNode;
  metrics?: HeroMetric[];
  trustRow?: HeroTrustRow;
  /** centered: everything stacked and centered. split: text left, illustration right. illustration-first: mirrored. */
  layout?: HeroLayout;
  className?: string;
}

function metricColumns(count: number): 2 | 3 | 4 | 6 {
  if (count >= 6) return 6;
  if (count >= 4) return 4;
  if (count === 3) return 3;
  return 2;
}

function TrustRow({ label, items }: HeroTrustRow) {
  return (
    <FadeIn className="flex flex-col items-center gap-4 pt-4" repeat>
      {label ? <Caption className="text-ink-tertiary">{label}</Caption> : null}
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-70">
        {items.map((item, index) => (
          <div key={index} className="text-body-sm font-medium text-ink-secondary">
            {item}
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

function MetricsRow({ metrics }: { metrics: HeroMetric[] }) {
  return (
    <StaggerGroup className="w-full pt-2">
      <CardGrid columns={metricColumns(metrics.length)} gap="sm">
        {metrics.map((metric, index) => (
          <StaggerItem key={index}>
            <StatCard value={metric.value} label={metric.label} />
          </StaggerItem>
        ))}
      </CardGrid>
    </StaggerGroup>
  );
}

function TextBlock({
  eyebrow,
  title,
  subtitle,
  cta,
  align,
}: Pick<HeroCompositionProps, "eyebrow" | "title" | "subtitle" | "cta"> & { align: "left" | "center" }) {
  const isCentered = align === "center";
  return (
    <div className={cn("flex flex-col gap-6", isCentered && "items-center text-center")}>
      {eyebrow ? <FadeIn>{eyebrow}</FadeIn> : null}
      <SlideUp>
        <Display className={isCentered ? "max-w-3xl" : undefined}>{title}</Display>
      </SlideUp>
      {subtitle ? (
        <SlideUp delay={0.05}>
          <Body size="lg" muted className={cn("max-w-[var(--container-narrow)]", isCentered && "mx-auto")}>
            {subtitle}
          </Body>
        </SlideUp>
      ) : null}
      {cta ? <SlideUp delay={0.1}>{cta}</SlideUp> : null}
    </div>
  );
}

/**
 * The top-of-page opener. All three layouts share one content model —
 * eyebrow, title, subtitle, cta, optional metrics/illustration/trust row —
 * only the arrangement changes.
 */
export function HeroComposition({
  eyebrow,
  title,
  subtitle,
  cta,
  illustration,
  metrics,
  trustRow,
  layout = "centered",
  className,
}: HeroCompositionProps) {
  if (layout === "centered") {
    return (
      <SectionShell spacing="xl" className={className}>
        <div className="flex flex-col items-center gap-16">
          <TextBlock eyebrow={eyebrow} title={title} subtitle={subtitle} cta={cta} align="center" />
          {metrics ? <MetricsRow metrics={metrics} /> : null}
          {illustration ? <ScaleIn className="w-full">{illustration}</ScaleIn> : null}
          {trustRow ? <TrustRow {...trustRow} /> : null}
        </div>
      </SectionShell>
    );
  }

  const textColumn = (
    <div className="flex flex-col gap-10">
      <TextBlock eyebrow={eyebrow} title={title} subtitle={subtitle} cta={cta} align="left" />
      {metrics ? <MetricsRow metrics={metrics} /> : null}
    </div>
  );

  if (!illustration) {
    return (
      <SectionShell spacing="xl" className={className}>
        <div className="flex flex-col gap-16">
          {textColumn}
          {trustRow ? <TrustRow {...trustRow} /> : null}
        </div>
      </SectionShell>
    );
  }

  const illustrationColumn = <ScaleIn>{illustration}</ScaleIn>;

  return (
    <SectionShell spacing="xl" className={className}>
      <div className="flex flex-col gap-16">
        <ContentColumns
          ratio={layout === "split" ? "narrow-wide" : "wide-narrow"}
          align="center"
          primary={layout === "split" ? textColumn : illustrationColumn}
          secondary={layout === "split" ? illustrationColumn : textColumn}
        />
        {trustRow ? <TrustRow {...trustRow} /> : null}
      </div>
    </SectionShell>
  );
}
