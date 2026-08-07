import type { ReactNode } from "react";
import { SectionShell, CardGrid } from "@/components/layout";
import { SectionHeader, FeatureCard } from "@/components/ui";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { StatusIndicator, type SystemStatus } from "@/components/illustration";

export interface FeatureGridItem {
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  /** e.g. a <Badge tone="accent">New</Badge>, shown next to the title. */
  badge?: ReactNode;
  status?: SystemStatus;
  /** A link or button shown in the card footer. */
  cta?: ReactNode;
}

export interface FeatureGridCompositionProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  items: FeatureGridItem[];
  columns?: 2 | 3 | 4 | 6;
  className?: string;
}

/** A responsive grid of FeatureCards. The header is optional so this can nest inside another composition. */
export function FeatureGridComposition({
  eyebrow,
  title,
  description,
  items,
  columns = 3,
  className,
}: FeatureGridCompositionProps) {
  return (
    <SectionShell spacing="lg" className={className}>
      <div className="flex flex-col gap-14">
        {title ? <SectionHeader eyebrow={eyebrow} title={title} description={description} /> : null}
        <StaggerGroup>
          <CardGrid columns={columns}>
            {items.map((item, index) => (
              <StaggerItem key={index} className="h-full">
                <FeatureCard
                  icon={item.icon}
                  title={
                    item.badge ? (
                      <span className="flex items-center gap-2">
                        {item.title}
                        {item.badge}
                      </span>
                    ) : (
                      item.title
                    )
                  }
                  description={item.description}
                  footer={
                    item.status || item.cta ? (
                      <div className="flex items-center justify-between gap-2">
                        {item.status ? <StatusIndicator status={item.status} /> : <span />}
                        {item.cta}
                      </div>
                    ) : undefined
                  }
                />
              </StaggerItem>
            ))}
          </CardGrid>
        </StaggerGroup>
      </div>
    </SectionShell>
  );
}
