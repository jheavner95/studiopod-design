import type { ReactNode } from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionShell, CardGrid } from "@/components/layout";
import { SectionHeader, SurfacePanel, GlassPanel, Badge, Caption } from "@/components/ui";
import { StaggerGroup, StaggerItem, SlideUp } from "@/components/motion";

export interface Testimonial {
  id: string;
  quote: ReactNode;
  authorName: string;
  authorRole?: ReactNode;
  company?: ReactNode;
  /** e.g. "Enterprise", "Scale-up" — rendered as a badge. */
  customerType?: ReactNode;
  metric?: { value: ReactNode; label: ReactNode };
}

export type TestimonialLayout = "grid" | "spotlight";

export interface TestimonialCompositionProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  testimonials: Testimonial[];
  /** grid: even cards. spotlight: one large featured quote, the rest smaller below. */
  layout?: TestimonialLayout;
  className?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function Avatar({ name, size = "md" }: { name: string; size?: "md" | "lg" }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-border bg-accent-soft font-medium text-accent-400",
        size === "lg" ? "size-14 text-body-md" : "size-10 text-body-sm",
      )}
    >
      {initials(name)}
    </div>
  );
}

function AuthorRow({ testimonial, size = "md" }: { testimonial: Testimonial; size?: "md" | "lg" }) {
  return (
    <div className={cn("flex items-center gap-3", size === "lg" && "flex-col text-center")}>
      <Avatar name={testimonial.authorName} size={size} />
      <div className="flex flex-col">
        <span className="text-body-sm font-medium text-ink-primary">{testimonial.authorName}</span>
        <Caption>
          {testimonial.authorRole}
          {testimonial.authorRole && testimonial.company ? " · " : null}
          {testimonial.company}
        </Caption>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <SurfacePanel className="flex h-full flex-col gap-6">
      <Quote className="size-6 text-accent-400" />
      <p className="flex-1 text-body-md text-ink-primary">{testimonial.quote}</p>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AuthorRow testimonial={testimonial} />
        {testimonial.customerType ? <Badge tone="accent">{testimonial.customerType}</Badge> : null}
      </div>
      {testimonial.metric ? (
        <div className="flex items-baseline gap-2 border-t border-border-subtle pt-4">
          <span className="text-heading-3 font-semibold text-ink-primary">{testimonial.metric.value}</span>
          <span className="text-caption text-ink-tertiary">{testimonial.metric.label}</span>
        </div>
      ) : null}
    </SurfacePanel>
  );
}

function GridLayout({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <StaggerGroup>
      <CardGrid columns={testimonials.length >= 3 ? 3 : 2}>
        {testimonials.map((testimonial) => (
          <StaggerItem key={testimonial.id} className="h-full">
            <TestimonialCard testimonial={testimonial} />
          </StaggerItem>
        ))}
      </CardGrid>
    </StaggerGroup>
  );
}

function SpotlightLayout({ testimonials }: { testimonials: Testimonial[] }) {
  const [featured, ...rest] = testimonials;
  if (!featured) return null;

  return (
    <div className="flex flex-col gap-8">
      <SlideUp>
        <GlassPanel padding="lg" className="flex flex-col items-center gap-6 text-center">
          <Quote className="size-8 text-accent-400" />
          <p className="max-w-2xl text-body-lg text-ink-primary">{featured.quote}</p>
          <AuthorRow testimonial={featured} size="lg" />
          {featured.customerType ? <Badge tone="accent">{featured.customerType}</Badge> : null}
        </GlassPanel>
      </SlideUp>
      {rest.length > 0 ? (
        <StaggerGroup>
          <CardGrid columns={rest.length >= 3 ? 3 : 2}>
            {rest.map((testimonial) => (
              <StaggerItem key={testimonial.id} className="h-full">
                <TestimonialCard testimonial={testimonial} />
              </StaggerItem>
            ))}
          </CardGrid>
        </StaggerGroup>
      ) : null}
    </div>
  );
}

/** Customer proof: an even grid of quote cards, or one spotlighted quote with smaller supporting ones below. */
export function TestimonialComposition({
  eyebrow,
  title,
  description,
  testimonials,
  layout = "grid",
  className,
}: TestimonialCompositionProps) {
  return (
    <SectionShell spacing="lg" className={className}>
      <div className="flex flex-col gap-14">
        {title ? <SectionHeader eyebrow={eyebrow} title={title} description={description} /> : null}
        {layout === "spotlight" ? (
          <SpotlightLayout testimonials={testimonials} />
        ) : (
          <GridLayout testimonials={testimonials} />
        )}
      </div>
    </SectionShell>
  );
}
