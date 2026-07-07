import type { ValidationResult } from "../types";

export function getResultsForStage(stageId: string, results: ValidationResult[] = []): ValidationResult[] {
  return results.filter((result) => result.stageId === stageId);
}

export function getFailingResults(results: ValidationResult[] = []): ValidationResult[] {
  return results.filter((result) => !result.passed);
}
