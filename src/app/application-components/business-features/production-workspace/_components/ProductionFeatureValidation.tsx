import { ProductionValidationPanel } from "@/components/platform/production";
import { InspectorSection, PropertyToggle } from "@/components/operational";
import { InlineMessage } from "@/components/feedback";
import { VALIDATION_FLOW_LABEL, VALIDATION_FLOW_TO_APPROVAL_STATE, type ProductionArtwork } from "../_data/mock-production";

interface ProductionFeatureValidationProps {
  artwork: ProductionArtwork | null;
  onToggleIssue: (artworkId: string, issueId: string) => void;
}

function gateReason(artwork: ProductionArtwork): string {
  const openErrors = artwork.issues.filter((issue) => issue.severity === "error" && !issue.resolved);
  if (openErrors.length > 0) return `${openErrors.length} blocking issue${openErrors.length === 1 ? "" : "s"} must be resolved.`;
  if (artwork.validationStatus === "validated" || artwork.validationStatus === "complete") return "All quality gates passed.";
  return "Automated checks running — no blocking issues found yet.";
}

/**
 * Feature-level validation state — composes Platform's own
 * ProductionValidationPanel (a re-export of Workflow's PipelineGate) for
 * the gate status, and Operational's own PropertyToggle for each mock
 * quality issue. The Business Feature owns the Draft → Ready → Validating →
 * Validated → Complete flow itself and the mapping into Workflow's own
 * ApprovalStateValue vocabulary — Workflow has no such flow built in.
 */
export function ProductionFeatureValidation({ artwork, onToggleIssue }: ProductionFeatureValidationProps) {
  if (!artwork) {
    return <InlineMessage tone="info">Select an artwork to review its validation gate.</InlineMessage>;
  }

  return (
    <div className="flex flex-col gap-4">
      <ProductionValidationPanel
        title={`Validation — ${VALIDATION_FLOW_LABEL[artwork.validationStatus]}`}
        status={VALIDATION_FLOW_TO_APPROVAL_STATE[artwork.validationStatus]}
        reason={gateReason(artwork)}
        actor={artwork.validationStatus === "validated" || artwork.validationStatus === "complete" ? artwork.assignee : "QA bot"}
        timestamp={artwork.updatedAt}
      />
      {artwork.issues.length > 0 ? (
        <InspectorSection title="Quality issues" defaultOpen>
          <div className="flex flex-col gap-3">
            {artwork.issues.map((issue) => (
              <PropertyToggle
                key={issue.id}
                label={issue.title}
                checked={issue.resolved}
                onChange={() => onToggleIssue(artwork.id, issue.id)}
                helperText={issue.severity === "error" ? "Blocking" : "Warning"}
              />
            ))}
          </div>
        </InspectorSection>
      ) : null}
    </div>
  );
}
