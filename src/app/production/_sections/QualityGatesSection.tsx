"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { QualityGateDiagram, QualitySummary, ValidationLegend } from "@/production";
import { qualityGates } from "@/production/examples";
import { PreviewSection } from "../_components/preview-primitives";

type Filter = "failed" | "warning" | undefined;

/** The seven quality gates, with buttons that filter down to just the failing or just the warning gates. */
export function QualityGatesSection() {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<Filter>(undefined);

  return (
    <PreviewSection
      id="quality-gates"
      eyebrow="quality gates"
      title="Quality gates"
      description="Every automated check an artwork clears before Approval. Filter down to just what's failing or just what needs attention."
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant={filter === undefined ? "primary" : "secondary"} onClick={() => setFilter(undefined)}>
            All gates
          </Button>
          <Button size="sm" variant={filter === "failed" ? "primary" : "secondary"} onClick={() => setFilter("failed")}>
            Failures only
          </Button>
          <Button size="sm" variant={filter === "warning" ? "primary" : "secondary"} onClick={() => setFilter("warning")}>
            Warnings only
          </Button>
        </div>

        <div className="scrollbar-none overflow-x-auto">
          <QualityGateDiagram
            gates={qualityGates}
            selectedGateId={selectedId}
            onSelectGate={(id) => setSelectedId((current) => (current === id ? undefined : id))}
            filterStatus={filter}
          />
        </div>

        <QualitySummary gates={qualityGates} />
        <ValidationLegend statuses={["passed", "warning", "failed", "pending"]} severities={["error", "warning"]} />
      </div>
    </PreviewSection>
  );
}
