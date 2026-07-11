"use client";

import { useState } from "react";
import { Card, Body, Button } from "@/components/ui";
import {
  Pipeline,
  PipelineStage,
  PipelineStep,
  PipelineConnector,
  PipelineStatus,
  PipelineProgress,
  PipelineBranch,
  PipelineGate,
  PipelineSummary,
  PipelineActions,
  PipelineMetrics,
  PipelineHistory,
  WorkflowHeader,
  WorkflowFooter,
  type PipelineHistoryEntry,
} from "@/components/workflow";
import type { WorkflowStateValue } from "@/components/workflow";
import type { ApprovalStateValue } from "@/components/workflow";

function GalleryCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">{title}</span>
      <Body size="sm" muted>
        {description}
      </Body>
      <div className="h-[440px] overflow-hidden rounded-lg border border-border-subtle">{children}</div>
    </Card>
  );
}

function connectorFor(status: WorkflowStateValue) {
  return status === "completed" ? "complete" : status === "running" ? "active" : "pending";
}

const LINEAR_LABELS = ["Build", "Test", "Deploy"];

function LinearPipelineDemo() {
  const [step, setStep] = useState(1);

  return (
    <GalleryCard title="Linear Pipeline" description="Three sequential stages — click Advance to move the run forward.">
      <Pipeline
        header={<WorkflowHeader name="Release 4.2.0" type="Automation" />}
        footer={
          step < LINEAR_LABELS.length ? (
            <WorkflowFooter>
              <PipelineActions>
                <Button size="sm" onClick={() => setStep((value) => Math.min(LINEAR_LABELS.length, value + 1))}>
                  Advance
                </Button>
              </PipelineActions>
            </WorkflowFooter>
          ) : undefined
        }
      >
        <PipelineProgress completedStages={step - 1} totalStages={LINEAR_LABELS.length} />
        <div className="flex items-start pt-4">
          {LINEAR_LABELS.map((label, index) => {
            const status: WorkflowStateValue = index + 1 < step ? "completed" : index + 1 === step ? "running" : "not-started";
            return (
              <div key={label} className="flex flex-1 items-start">
                <PipelineStep label={label} status={status} />
                {index < LINEAR_LABELS.length - 1 ? <PipelineConnector status={connectorFor(status)} /> : null}
              </div>
            );
          })}
        </div>
      </Pipeline>
    </GalleryCard>
  );
}

function BranchingPipelineDemo() {
  return (
    <GalleryCard title="Branching Pipeline" description="A shared stage forks into two parallel paths via PipelineBranch.">
      <Pipeline header={<WorkflowHeader name="Multi-region deploy" type="Automation" />}>
        <div className="flex flex-col gap-4">
          <PipelineStage title="Build" status="completed">
            <PipelineStep label="Compile" status="completed" />
          </PipelineStage>
          <PipelineBranch title="Deploy regions">
            <PipelineStage title="us-east" status="completed">
              <PipelineStep label="Deploy" status="completed" />
            </PipelineStage>
            <PipelineStage title="eu-west" status="running">
              <PipelineStep label="Deploy" status="running" />
            </PipelineStage>
          </PipelineBranch>
        </div>
      </Pipeline>
    </GalleryCard>
  );
}

function ProductionPipelineDemo() {
  return (
    <GalleryCard title="Production Pipeline" description="Domain-flavored run with PipelineMetrics for throughput and duration.">
      <Pipeline header={<WorkflowHeader name="Product render batch" type="Production" />}>
        <div className="flex flex-col gap-4">
          <PipelineMetrics items={[{ value: "142", label: "Rendered" }, { value: "3m 20s", label: "Duration" }, { value: "0.7%", label: "Error rate" }]} />
          <div className="flex items-start">
            <PipelineStep label="Geometry check" status="completed" />
            <PipelineConnector status="complete" />
            <PipelineStep label="Safe zones" status="running" />
          </div>
        </div>
      </Pipeline>
    </GalleryCard>
  );
}

function PublishingPipelineDemo() {
  const [gateStatus, setGateStatus] = useState<ApprovalStateValue>("in-review");

  return (
    <GalleryCard title="Publishing Pipeline" description="A PipelineGate checkpoint — click Approve in the footer to clear it.">
      <Pipeline
        header={<WorkflowHeader name="Spring lookbook launch" type="Publishing" />}
        footer={
          gateStatus === "in-review" ? (
            <WorkflowFooter>
              <PipelineActions>
                <Button size="sm" onClick={() => setGateStatus("approved")}>
                  Approve
                </Button>
              </PipelineActions>
            </WorkflowFooter>
          ) : undefined
        }
      >
        <div className="flex flex-col gap-4">
          <PipelineStep label="Draft ready" status="completed" />
          <PipelineGate title="Editorial sign-off" status={gateStatus} reason={gateStatus === "approved" ? "Looks good, ship it." : undefined} actor="Sam" timestamp={gateStatus === "approved" ? "just now" : "—"} />
        </div>
      </Pipeline>
    </GalleryCard>
  );
}

function CommercePipelineDemo() {
  return (
    <GalleryCard title="Commerce Pipeline" description="A PipelineSummary aggregate alongside per-stage status.">
      <Pipeline header={<WorkflowHeader name="Store sync run" type="Commerce" />}>
        <div className="flex flex-col gap-4">
          <PipelineSummary items={[{ value: "3", label: "Stages" }, { value: "1", label: "Blocked" }]} columns={2} />
          <div className="flex items-start">
            <PipelineStep label="Fetch orders" status="completed" />
            <PipelineConnector status="complete" />
            <PipelineStep label="Sync inventory" status="blocked" />
            <PipelineConnector status="pending" />
            <PipelineStep label="Update pricing" status="not-started" />
          </div>
        </div>
      </Pipeline>
    </GalleryCard>
  );
}

function ValidationPipelineDemo() {
  return (
    <GalleryCard title="Validation Pipeline" description="Per-stage PipelineStatus markers, including a failed check.">
      <Pipeline header={<WorkflowHeader name="Artwork validation" type="Production" />}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-body-sm text-ink-primary">Resolution check</span>
            <PipelineStatus value="completed" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-body-sm text-ink-primary">Color profile</span>
            <PipelineStatus value="failed" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-body-sm text-ink-primary">Safe zone</span>
            <PipelineStatus value="waiting" />
          </div>
        </div>
      </Pipeline>
    </GalleryCard>
  );
}

const LONG_RUNNING_HISTORY: PipelineHistoryEntry[] = [
  { id: "1", title: "Run started", timestamp: "9:00:00 AM", status: "completed" },
  { id: "2", title: "Ingest stage completed", timestamp: "9:12:40 AM", status: "completed" },
  { id: "3", title: "Transform stage running", timestamp: "9:13:02 AM", status: "running" },
];

function LongRunningPipelineDemo() {
  return (
    <GalleryCard title="Long-running Pipeline" description="PipelineHistory plus Pause/Cancel actions for a run still in progress.">
      <Pipeline
        header={<WorkflowHeader name="Nightly data sync" type="Automation" />}
        footer={
          <WorkflowFooter>
            <PipelineActions>
              <Button variant="secondary" size="sm">
                Pause
              </Button>
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
            </PipelineActions>
          </WorkflowFooter>
        }
      >
        <PipelineHistory title="Run #918" entries={LONG_RUNNING_HISTORY} />
      </Pipeline>
    </GalleryCard>
  );
}

const COMPLETED_HISTORY: PipelineHistoryEntry[] = [
  { id: "1", title: "Run started", timestamp: "Mon 9:00 AM", status: "completed" },
  { id: "2", title: "Build completed", timestamp: "Mon 9:04 AM", status: "completed" },
  { id: "3", title: "Deploy completed", timestamp: "Mon 9:11 AM", status: "completed" },
];

function CompletedPipelineDemo() {
  return (
    <GalleryCard title="Completed Pipeline" description="Every stage completed — Summary, Metrics, and the full History together.">
      <Pipeline header={<WorkflowHeader name="Release 4.1.0" type="Automation" />}>
        <div className="flex flex-col gap-4">
          <PipelineSummary items={[{ value: "3", label: "Stages" }, { value: "11m", label: "Total time" }]} columns={2} />
          <PipelineMetrics items={[{ value: "100%", label: "Success rate" }]} columns={2} />
          <PipelineHistory entries={COMPLETED_HISTORY} />
        </div>
      </Pipeline>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each composed from real component props — not a static screenshot. */
export function PipelineGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <LinearPipelineDemo />
      <BranchingPipelineDemo />
      <ProductionPipelineDemo />
      <PublishingPipelineDemo />
      <CommercePipelineDemo />
      <ValidationPipelineDemo />
      <LongRunningPipelineDemo />
      <CompletedPipelineDemo />
    </div>
  );
}
