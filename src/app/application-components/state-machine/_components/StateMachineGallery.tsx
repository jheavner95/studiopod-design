"use client";

import { useState } from "react";
import { Card, Body, Button } from "@/components/ui";
import {
  StateMachine,
  StateNode,
  StateTransition,
  StateCondition,
  StateAction,
  StateActions,
  StateEvents,
  StateInspector,
  StateHistory,
  StateLegend,
  StateSummary,
  StateMetrics,
  WorkflowHeader,
  WorkflowFooter,
  type StateValue,
  type StateEventEntry,
  type StateHistoryEntry,
} from "@/components/workflow";

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

function connectorFor(status: StateValue) {
  return status === "completed" || status === "terminal" ? "complete" : status === "active" ? "active" : "pending";
}

const LINEAR_LABELS = ["Draft", "Review", "Published"];

function LinearStateMachineDemo() {
  const [step, setStep] = useState(0);

  return (
    <GalleryCard title="Linear State Machine" description="Three states in sequence — click Advance to move the machine forward.">
      <StateMachine
        header={<WorkflowHeader name="Document lifecycle" type="Automation" />}
        footer={
          step < LINEAR_LABELS.length - 1 ? (
            <WorkflowFooter>
              <StateActions>
                <Button size="sm" onClick={() => setStep((value) => Math.min(LINEAR_LABELS.length - 1, value + 1))}>
                  Advance
                </Button>
              </StateActions>
            </WorkflowFooter>
          ) : undefined
        }
      >
        <div className="flex items-start pt-4">
          {LINEAR_LABELS.map((label, index) => {
            const status: StateValue = index < step ? "completed" : index === step ? "active" : "initial";
            return (
              <div key={label} className="flex flex-1 items-start">
                <StateNode label={label} status={status} />
                {index < LINEAR_LABELS.length - 1 ? <StateTransition status={connectorFor(status)} /> : null}
              </div>
            );
          })}
        </div>
      </StateMachine>
    </GalleryCard>
  );
}

const PUBLISHING_EVENTS: StateEventEntry[] = [
  { id: "1", name: "Submit for review", from: "initial", to: "waiting" },
  { id: "2", name: "Approve", from: "waiting", to: "active" },
  { id: "3", name: "Publish", from: "active", to: "terminal" },
];

function PublishingLifecycleDemo() {
  return (
    <GalleryCard title="Publishing Lifecycle" description="StateEvents catalogs the named events this machine responds to.">
      <StateMachine header={<WorkflowHeader name="Spring lookbook launch" type="Publishing" />}>
        <div className="flex flex-col gap-4">
          <StateEvents events={PUBLISHING_EVENTS} />
          <StateLegend states={["initial", "waiting", "active", "terminal"]} />
        </div>
      </StateMachine>
    </GalleryCard>
  );
}

function ProductionValidationDemo() {
  return (
    <GalleryCard title="Production Validation" description="StateCondition guards gating a transition to Completed.">
      <StateMachine header={<WorkflowHeader name="Artwork validation" type="Production" />}>
        <div className="flex flex-col gap-3">
          <StateNode label="Pending review" status="active" />
          <StateCondition label="Resolution meets minimum DPI" met={true} />
          <StateCondition label="Color profile is CMYK" met={true} />
          <StateCondition label="Safe zone respected" met={false} description="Artwork extends 4px into the trim margin." />
        </div>
      </StateMachine>
    </GalleryCard>
  );
}

function CommerceOrderFlowDemo() {
  return (
    <GalleryCard title="Commerce Order Flow" description="StateInspector showing the selected state's own detail.">
      <StateInspector
        name="Payment authorized"
        type="Commerce"
        status="active"
        properties={[
          { id: "1", label: "Order", value: "#10236" },
          { id: "2", label: "Amount", value: "$84.00" },
          { id: "3", label: "Entered", value: "2 minutes ago" },
        ]}
      />
    </GalleryCard>
  );
}

function ApprovalLifecycleDemo() {
  return (
    <GalleryCard title="Approval Lifecycle" description="StateAction records what fires automatically on enter and exit.">
      <StateMachine header={<WorkflowHeader name="Discount request" type="Commerce" />}>
        <div className="flex flex-col gap-4">
          <StateNode label="Awaiting approval" status="blocked" description="Blocked until finance signs off." />
          <StateAction label="Notify finance team" trigger="on-enter" description="Sends a Slack message to #finance-approvals" />
          <StateAction label="Log decision" trigger="on-exit" description="Writes the outcome to the audit trail" />
        </div>
      </StateMachine>
    </GalleryCard>
  );
}

const LONG_RUNNING_HISTORY: StateHistoryEntry[] = [
  { id: "1", title: "Machine started", timestamp: "9:00:00 AM", status: "initial" },
  { id: "2", title: "Entered Active", timestamp: "9:00:02 AM", status: "active" },
  { id: "3", title: "Entered Waiting", timestamp: "9:12:40 AM", status: "waiting" },
];

function LongRunningProcessDemo() {
  return (
    <GalleryCard title="Long-running Process" description="StateHistory plus Pause/Cancel actions for a machine still running.">
      <StateMachine
        header={<WorkflowHeader name="Nightly data sync" type="Automation" />}
        footer={
          <WorkflowFooter>
            <StateActions>
              <Button variant="secondary" size="sm">
                Pause
              </Button>
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
            </StateActions>
          </WorkflowFooter>
        }
      >
        <StateHistory title="Run #4821" entries={LONG_RUNNING_HISTORY} />
      </StateMachine>
    </GalleryCard>
  );
}

function FailureRecoveryDemo() {
  const [status, setStatus] = useState<StateValue>("failed");

  return (
    <GalleryCard title="Failure Recovery" description="A real transition back to Active — click Retry in the footer.">
      <StateMachine
        header={<WorkflowHeader name="Export job" type="Automation" />}
        footer={
          status === "failed" ? (
            <WorkflowFooter>
              <StateActions>
                <Button size="sm" onClick={() => setStatus("active")}>
                  Retry
                </Button>
              </StateActions>
            </WorkflowFooter>
          ) : undefined
        }
      >
        <StateNode label={status === "failed" ? "Export failed" : "Retrying export"} status={status} description={status === "failed" ? "Connection to storage provider timed out." : undefined} />
      </StateMachine>
    </GalleryCard>
  );
}

const COMPLETED_HISTORY: StateHistoryEntry[] = [
  { id: "1", title: "Machine started", timestamp: "Mon 9:00 AM", status: "initial" },
  { id: "2", title: "Entered Active", timestamp: "Mon 9:00 AM", status: "active" },
  { id: "3", title: "Reached Terminal", timestamp: "Mon 9:11 AM", status: "terminal" },
];

function CompletedProcessDemo() {
  return (
    <GalleryCard title="Completed Process" description="A terminal state — Summary, Metrics, and the full History together.">
      <StateMachine header={<WorkflowHeader name="Release 4.1.0" type="Automation" />}>
        <div className="flex flex-col gap-4">
          <StateSummary items={[{ value: "3", label: "States" }, { value: "11m", label: "Total time" }]} columns={2} />
          <StateMetrics items={[{ value: "2", label: "Transitions" }]} columns={2} />
          <StateHistory entries={COMPLETED_HISTORY} />
        </div>
      </StateMachine>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each composed from real component props — not a static screenshot. */
export function StateMachineGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <LinearStateMachineDemo />
      <PublishingLifecycleDemo />
      <ProductionValidationDemo />
      <CommerceOrderFlowDemo />
      <ApprovalLifecycleDemo />
      <LongRunningProcessDemo />
      <FailureRecoveryDemo />
      <CompletedProcessDemo />
    </div>
  );
}
