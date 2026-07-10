"use client";

import { useEffect, useState } from "react";
import { Rocket, PanelRightClose, PanelRightOpen } from "lucide-react";
import { Card, Body, Button } from "@/components/ui";
import {
  Workflow,
  WorkflowHeader,
  WorkflowSidebar,
  WorkflowFooter,
  WorkflowActions,
  WorkflowStage,
  WorkflowStageGroup,
  WorkflowStep,
  WorkflowTransition,
  WorkflowProgress,
  WorkflowStatus,
  WorkflowSummary,
  type WorkflowStateValue,
} from "@/components/workflow";

function GalleryCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">{title}</span>
      <Body size="sm" muted>
        {description}
      </Body>
      <div className="h-[420px] overflow-hidden rounded-lg border border-border-subtle">{children}</div>
    </Card>
  );
}

const LINEAR_STEPS: { id: string; label: string; status: WorkflowStateValue; detail: string }[] = [
  { id: "write-copy", label: "Write copy", status: "completed", detail: "Finished by the content team on Monday." },
  { id: "select-imagery", label: "Select imagery", status: "completed", detail: "Five images selected from the spring shoot." },
  { id: "editorial-review", label: "Editorial review", status: "running", detail: "In review with the editorial lead since this morning." },
  { id: "legal-review", label: "Legal review", status: "not-started", detail: "Queued behind editorial review." },
  { id: "schedule", label: "Schedule", status: "not-started", detail: "Not started — waiting on both reviews to clear." },
];

function LinearWorkflowDemo() {
  const [selectedId, setSelectedId] = useState("editorial-review");
  const selected = LINEAR_STEPS.find((step) => step.id === selectedId);

  return (
    <GalleryCard title="Linear Workflow" description="Three stages in a single vertical sequence — click any step to see its detail in the sidebar.">
      <Workflow
        header={<WorkflowHeader icon={<Rocket className="size-4" aria-hidden />} name="Weekly content refresh" type="Publishing" />}
        sidebar={
          <WorkflowSidebar header={<span className="text-body-sm font-medium text-ink-primary">Step detail</span>}>
            {selected ? (
              <div className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{selected.label}</span>
                <WorkflowStatus value={selected.status} />
                <Body size="sm" muted>
                  {selected.detail}
                </Body>
              </div>
            ) : null}
          </WorkflowSidebar>
        }
      >
        <WorkflowStage title="Draft" status="completed">
          <WorkflowStep label="Write copy" status="completed" onClick={() => setSelectedId("write-copy")} />
          <WorkflowTransition status="complete" />
          <WorkflowStep label="Select imagery" status="completed" onClick={() => setSelectedId("select-imagery")} />
        </WorkflowStage>
        <WorkflowStage title="Review" status="running">
          <WorkflowStep label="Editorial review" status="running" onClick={() => setSelectedId("editorial-review")} />
          <WorkflowTransition status="pending" />
          <WorkflowStep label="Legal review" status="not-started" onClick={() => setSelectedId("legal-review")} />
        </WorkflowStage>
        <WorkflowStage title="Publish" status="not-started">
          <WorkflowStep label="Schedule" status="not-started" onClick={() => setSelectedId("schedule")} />
        </WorkflowStage>
      </Workflow>
    </GalleryCard>
  );
}

function BranchingWorkflowDemo() {
  return (
    <GalleryCard title="Branching Workflow" description="WorkflowStageGroup laying two stages side by side after a shared starting stage.">
      <Workflow header={<WorkflowHeader name="Asset export" type="Production" />}>
        <WorkflowStage title="Validate" status="completed">
          <WorkflowStep label="Check dimensions" status="completed" />
        </WorkflowStage>
        <WorkflowStageGroup title="Then, in parallel" columns={2}>
          <WorkflowStage title="Web export" status="running">
            <WorkflowStep label="Compress for web" status="running" />
          </WorkflowStage>
          <WorkflowStage title="Print export" status="ready">
            <WorkflowStep label="Convert to CMYK" status="ready" />
          </WorkflowStage>
        </WorkflowStageGroup>
      </Workflow>
    </GalleryCard>
  );
}

function ApprovalWorkflowDemo() {
  const [status, setStatus] = useState<WorkflowStateValue>("waiting");

  return (
    <GalleryCard title="Approval Workflow" description="A Waiting step gated on a real decision — click Approve or Reject in the footer.">
      <Workflow
        header={<WorkflowHeader name="Discount code request" type="Commerce" />}
        footer={
          status === "waiting" ? (
            <WorkflowFooter>
              <WorkflowActions>
                <Button variant="secondary" size="sm" onClick={() => setStatus("cancelled")}>
                  Reject
                </Button>
                <Button size="sm" onClick={() => setStatus("completed")}>
                  Approve
                </Button>
              </WorkflowActions>
            </WorkflowFooter>
          ) : undefined
        }
      >
        <WorkflowStage title="Request" status="completed">
          <WorkflowStep label="Submitted by merchandising" status="completed" />
        </WorkflowStage>
        <WorkflowStage title="Approval" status={status}>
          <WorkflowStep label="Awaiting finance sign-off" status={status} description={status === "waiting" ? "Requested 2 hours ago" : undefined} />
        </WorkflowStage>
      </Workflow>
    </GalleryCard>
  );
}

function PublishingWorkflowDemo() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <GalleryCard title="Publishing Workflow" description="Header, sidebar, and summary composed together — click the sidebar toggle.">
      <Workflow
        header={
          <WorkflowHeader name="Spring lookbook" type="Publishing">
            <WorkflowStatus value="running" />
            <WorkflowProgress value={0.6} label="Overall progress" />
          </WorkflowHeader>
        }
        sidebar={
          <WorkflowSidebar
            collapsed={collapsed}
            header={
              <Button variant="secondary" size="sm" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
                {collapsed ? <PanelRightOpen className="size-4" aria-hidden /> : <PanelRightClose className="size-4" aria-hidden />}
              </Button>
            }
          >
            {!collapsed ? (
              <WorkflowSummary
                items={[
                  { value: "3", label: "Stages" },
                  { value: "6", label: "Steps" },
                ]}
                columns={2}
              />
            ) : null}
          </WorkflowSidebar>
        }
      >
        <WorkflowStage title="Draft" status="completed">
          <WorkflowStep label="Write copy" status="completed" />
        </WorkflowStage>
        <WorkflowStage title="Review" status="running">
          <WorkflowStep label="Editorial review" status="running" />
        </WorkflowStage>
      </Workflow>
    </GalleryCard>
  );
}

function ProductionWorkflowDemo() {
  return (
    <GalleryCard title="Production Workflow" description="A Blocked step, showing warning-tone status alongside a completed and a failed sibling.">
      <Workflow header={<WorkflowHeader name="Style recipe validation" type="Production" />}>
        <WorkflowStage title="Validation" status="blocked">
          <WorkflowStep label="Schema check" status="completed" />
          <WorkflowTransition status="complete" />
          <WorkflowStep label="Provider timeout" status="failed" description="No response after 30s" />
          <WorkflowTransition status="pending" />
          <WorkflowStep label="Quality gate" status="blocked" description="Waiting on provider timeout to clear" />
        </WorkflowStage>
      </Workflow>
    </GalleryCard>
  );
}

function CommerceWorkflowDemo() {
  return (
    <GalleryCard title="Commerce Workflow" description="Order fulfillment stages paired with a WorkflowSummary metric row.">
      <Workflow header={<WorkflowHeader name="Order #10236" type="Commerce" />}>
        <WorkflowSummary
          items={[
            { value: "$142.00", label: "Order total" },
            { value: "2", label: "Items" },
            { value: "1d", label: "Elapsed" },
          ]}
          columns={3}
        />
        <WorkflowStage title="Fulfillment" status="running">
          <WorkflowStep label="Payment captured" status="completed" />
          <WorkflowTransition status="complete" />
          <WorkflowStep label="Packed" status="running" />
          <WorkflowTransition status="pending" />
          <WorkflowStep label="Shipped" status="not-started" />
        </WorkflowStage>
      </Workflow>
    </GalleryCard>
  );
}

function LongRunningWorkflowDemo() {
  const [progress, setProgress] = useState(0.3);

  useEffect(() => {
    if (progress >= 1) return;
    const timeout = setTimeout(() => setProgress((value) => Math.min(1, value + 0.1)), 600);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <GalleryCard title="Long-running Workflow" description="WorkflowProgress advancing on its own — a real interval, not a static bar.">
      <Workflow
        header={
          <WorkflowHeader name="Catalog re-index" type="Intelligence">
            <WorkflowStatus value={progress >= 1 ? "completed" : "running"} />
            <WorkflowProgress value={progress} label="Re-indexing" />
          </WorkflowHeader>
        }
      >
        <WorkflowStage title="Indexing" status={progress >= 1 ? "completed" : "running"}>
          <WorkflowStep label="Scanning 40,000 SKUs" status={progress >= 1 ? "completed" : "running"} />
        </WorkflowStage>
      </Workflow>
    </GalleryCard>
  );
}

function ReadOnlyWorkflowDemo() {
  return (
    <GalleryCard title="Read-only Workflow" description="No onClick on any step and no footer — every WorkflowStep renders as a plain, non-interactive div.">
      <Workflow header={<WorkflowHeader name="Q3 planning (archived)" type="Planning" />}>
        <WorkflowStage title="Research" status="completed">
          <WorkflowStep label="Market analysis" status="completed" />
        </WorkflowStage>
        <WorkflowStage title="Draft" status="completed">
          <WorkflowStep label="Roadmap draft" status="completed" />
        </WorkflowStage>
        <WorkflowStage title="Archived" status="cancelled">
          <WorkflowStep label="Superseded by Q4 plan" status="cancelled" />
        </WorkflowStage>
      </Workflow>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each composed from real component props — not a static screenshot. */
export function WorkflowFrameworkGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <LinearWorkflowDemo />
      <BranchingWorkflowDemo />
      <ApprovalWorkflowDemo />
      <PublishingWorkflowDemo />
      <ProductionWorkflowDemo />
      <CommerceWorkflowDemo />
      <LongRunningWorkflowDemo />
      <ReadOnlyWorkflowDemo />
    </div>
  );
}
