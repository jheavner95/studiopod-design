import type { ReactNode } from "react";
import { Check, X, Minus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionShell, CardGrid, ContentColumns } from "@/components/layout";
import { SectionHeader, SurfacePanel, Heading, Body } from "@/components/ui";
import { StaggerGroup, StaggerItem, SlideUp } from "@/components/motion";
import { AnimatedNode } from "@/components/illustration";

export interface ComparisonPoint {
  label: ReactNode;
  supported: boolean | "partial";
}

export interface ComparisonCard {
  title: ReactNode;
  description?: ReactNode;
  /** Visually emphasizes this card — use for the "with StudioPOD" side. */
  highlight?: boolean;
  points: ComparisonPoint[];
  cta?: ReactNode;
}

export interface MatrixColumn {
  id: string;
  label: ReactNode;
  highlight?: boolean;
}

export interface MatrixRow {
  label: ReactNode;
  values: Record<string, boolean | "partial">;
}

export type ComparisonVariant = "cards" | "matrix" | "before-after";

export interface ComparisonCompositionProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  variant?: ComparisonVariant;
  /** Used by "cards" (any count) and "before-after" (first two entries: before, after). */
  cards?: ComparisonCard[];
  /** Used by "matrix". */
  matrix?: { columns: MatrixColumn[]; rows: MatrixRow[] };
  className?: string;
}

function SupportIcon({ supported }: { supported: boolean | "partial" }) {
  if (supported === true) return <Check className="size-4 text-success" />;
  if (supported === "partial") return <Minus className="size-4 text-warning" />;
  return <X className="size-4 text-ink-disabled" />;
}

function ComparisonCardView({ card }: { card: ComparisonCard }) {
  return (
    <SurfacePanel
      elevated={card.highlight}
      className={cn("flex h-full flex-col gap-6", card.highlight && "border-accent-500 shadow-glow")}
    >
      <div className="flex flex-col gap-2">
        <Heading level={4}>{card.title}</Heading>
        {card.description ? (
          <Body size="sm" muted>
            {card.description}
          </Body>
        ) : null}
      </div>
      <ul className="flex flex-col gap-3">
        {card.points.map((point, index) => (
          <li key={index} className="flex items-center gap-3 text-body-sm text-ink-secondary">
            <SupportIcon supported={point.supported} />
            <span>{point.label}</span>
          </li>
        ))}
      </ul>
      {card.cta ? <div className="mt-auto pt-2">{card.cta}</div> : null}
    </SurfacePanel>
  );
}

function CardsVariant({ cards }: { cards: ComparisonCard[] }) {
  const columns = cards.length >= 4 ? 4 : cards.length === 3 ? 3 : 2;
  return (
    <StaggerGroup>
      <CardGrid columns={columns}>
        {cards.map((card, index) => (
          <StaggerItem key={index} className="h-full">
            <ComparisonCardView card={card} />
          </StaggerItem>
        ))}
      </CardGrid>
    </StaggerGroup>
  );
}

function BeforeAfterVariant({ cards }: { cards: ComparisonCard[] }) {
  const [before, after] = cards;
  return (
    <div className="relative">
      <ContentColumns
        ratio="even"
        align="start"
        primary={<ComparisonCardView card={{ ...before, highlight: false }} />}
        secondary={<ComparisonCardView card={{ ...after, highlight: after?.highlight ?? true }} />}
      />
      <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
        <div className="rounded-full border border-border-strong bg-canvas p-2">
          <AnimatedNode status="active" icon={<ArrowRight className="size-4" />} size="sm" />
        </div>
      </div>
    </div>
  );
}

function MatrixVariant({ matrix }: { matrix: NonNullable<ComparisonCompositionProps["matrix"]> }) {
  return (
    <SlideUp>
      <SurfacePanel padding="sm" className="scrollbar-none overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left text-caption text-ink-tertiary">Feature</th>
              {matrix.columns.map((column) => (
                <th
                  key={column.id}
                  className={cn(
                    "p-4 text-center text-body-sm font-medium",
                    column.highlight ? "text-accent-400" : "text-ink-primary",
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-border-subtle">
                <td className="p-4 text-body-sm text-ink-secondary">{row.label}</td>
                {matrix.columns.map((column) => (
                  <td key={column.id} className={cn("p-4", column.highlight && "bg-accent-soft/30")}>
                    <div className="flex justify-center">
                      <SupportIcon supported={row.values[column.id] ?? false} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </SurfacePanel>
    </SlideUp>
  );
}

/** Comparisons: side-by-side cards, a before/after pair with a transition marker, or a full feature matrix. */
export function ComparisonComposition({
  eyebrow,
  title,
  description,
  variant = "cards",
  cards,
  matrix,
  className,
}: ComparisonCompositionProps) {
  return (
    <SectionShell spacing="lg" className={className}>
      <div className="flex flex-col gap-14">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        {variant === "matrix" && matrix ? <MatrixVariant matrix={matrix} /> : null}
        {variant === "cards" && cards ? <CardsVariant cards={cards} /> : null}
        {variant === "before-after" && cards ? <BeforeAfterVariant cards={cards} /> : null}
      </div>
    </SectionShell>
  );
}
