import type { ReactNode } from "react";
import { Panel } from "@/components/layout";
import { Body } from "@/components/ui";
import { HealthRecommendation } from "./HealthRecommendation";

export interface RecommendationEntry {
  id: string;
  title: ReactNode;
  detail: ReactNode;
  action?: ReactNode;
}

interface RecommendationWidgetProps {
  title: ReactNode;
  recommendations: RecommendationEntry[];
  emptyMessage?: string;
  className?: string;
}

/** A stacked list of suggested next steps — Status & Health's own HealthRecommendation repeated per entry, the same stacking pattern OperationalAlertPanel already uses for its own Alert list. */
export function RecommendationWidget({ title, recommendations, emptyMessage = "No recommendations right now", className }: RecommendationWidgetProps) {
  return (
    <Panel header={<span className="text-body-md font-medium text-ink-primary">{title}</span>} className={className}>
      {recommendations.length === 0 ? (
        <Body size="sm" muted>
          {emptyMessage}
        </Body>
      ) : (
        <div className="flex flex-col gap-3">
          {recommendations.map((recommendation) => (
            <HealthRecommendation key={recommendation.id} title={recommendation.title} action={recommendation.action}>
              {recommendation.detail}
            </HealthRecommendation>
          ))}
        </div>
      )}
    </Panel>
  );
}
