import type { ReactNode } from "react";
import type { NodeHealth } from "@/illustrations";

/**
 * The Production & Validation Library's own schema, layered on top of the
 * motion, illustration, workflow, and platform architecture engines. A
 * `ProductionPipeline` describes how StudioPOD validates and produces
 * work, every future production or validation diagram is a value of this
 * shape handed to `<ProductionPipelineDiagram pipeline={...} />`, never
 * bespoke rendering code.
 */

/** The shared status vocabulary across every entity in this library. */
export type ProductionStatus =
  | "pending"
  | "running"
  | "passed"
  | "warning"
  | "failed"
  | "blocked"
  | "completed"
  | "archived";

export type ValidationSeverity = "info" | "warning" | "error" | "critical";

export interface ValidationRule {
  id: string;
  title: string;
  description?: string;
  severity: ValidationSeverity;
}

export interface ValidationResult {
  id: string;
  ruleId: string;
  stageId: string;
  passed: boolean;
  message?: string;
  severity: ValidationSeverity;
}

export interface HealthMetric {
  id: string;
  label: string;
  /** A pre-formatted display value, e.g. "98%", "1.2s", "42". */
  value: ReactNode;
  trend?: "up" | "down" | "flat";
  status?: ProductionStatus;
  description?: ReactNode;
}

export interface ValidationStage {
  id: string;
  title: string;
  description?: string;
  status?: ProductionStatus;
  severity?: ValidationSeverity;
  /** When true, the pipeline cannot proceed past this stage until it passes. */
  blocking?: boolean;
  /** 0-1. */
  progress?: number;
  /** Artifact ids or plain labels this stage consumes. */
  inputs?: string[];
  /** Artifact ids or plain labels this stage produces. */
  outputs?: string[];
  metrics?: HealthMetric[];
  rules?: ValidationRule[];
  icon?: ReactNode;
}

export interface ValidationConnection {
  id: string;
  source: string;
  target: string;
  label?: ReactNode;
}

export interface QualityGate {
  id: string;
  title: string;
  description?: string;
  required?: boolean;
  optional?: boolean;
  passed?: number;
  failed?: number;
  warning?: number;
  /** Overrides the status derived from passed/failed/warning counts. */
  status?: ProductionStatus;
  icon?: ReactNode;
}

export interface ProductionArtifact {
  id: string;
  name: string;
  type: string;
  status?: ProductionStatus;
  /** The stage or platform id this artifact came from. */
  source?: string;
  /** The stage or platform id this artifact is headed to. */
  destination?: string;
  version?: string;
  health?: NodeHealth;
  icon?: ReactNode;
}

export interface ProductionJob {
  id: string;
  title: string;
  status?: ProductionStatus;
  /** 0-1. */
  progress?: number;
  /** The stage id this job currently occupies. */
  stageId?: string;
  startedAt?: string;
  estimatedDuration?: string;
}

export type ProductionMetadata = Record<string, ReactNode>;

export interface ProductionPipeline {
  id: string;
  title: string;
  description?: string;
  stages: ValidationStage[];
  /** Omit to auto-chain stages in array order. */
  connections?: ValidationConnection[];
  gates?: QualityGate[];
  artifacts?: ProductionArtifact[];
  jobs?: ProductionJob[];
  results?: ValidationResult[];
  /** Aggregate, non-stage metrics, e.g. for a health dashboard. */
  metrics?: HealthMetric[];
  metadata?: ProductionMetadata;
}
