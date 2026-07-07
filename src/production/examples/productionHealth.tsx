import type { ProductionPipeline, HealthMetric } from "../types";

export const productionHealthMetrics: HealthMetric[] = [
  { id: "jobs", label: "Jobs", value: "128", trend: "up" },
  { id: "queue", label: "Queue", value: "6", trend: "flat" },
  { id: "errors", label: "Errors", value: "2", trend: "down", status: "failed" },
  { id: "warnings", label: "Warnings", value: "5", trend: "down", status: "warning" },
  { id: "completed", label: "Completed", value: "119", trend: "up", status: "passed" },
  { id: "average-time", label: "Average Time", value: "4m 12s", trend: "down" },
  { id: "health-score", label: "Health Score", value: "96%", trend: "up", status: "passed" },
];

/** The rolled-up health of the production system over the last 24 hours. */
export const productionHealth: ProductionPipeline = {
  id: "production-health",
  title: "Production Health",
  description: "How the production system is performing right now.",
  stages: [],
  metrics: productionHealthMetrics,
};
