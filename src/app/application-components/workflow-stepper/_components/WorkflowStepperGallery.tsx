"use client";

import { useState } from "react";
import { Card, Body, Button } from "@/components/ui";
import {
  WorkflowStepper,
  WorkflowStepperHeader,
  WorkflowStepperStage,
  WorkflowStepperStep,
  WorkflowStepperConnector,
  WorkflowStepperSummary,
  WorkflowStepperProgress,
  WorkflowStepperNavigation,
  WorkflowStepperActions,
  WorkflowStepperFooter,
  type WorkflowStepperStateValue,
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

function statusFor(index: number, current: number): WorkflowStepperStateValue {
  if (index < current) return "completed";
  if (index === current) return "current";
  return "not-started";
}

const LINEAR_LABELS = ["Account", "Profile", "Preferences", "Review"];

function LinearWizardDemo() {
  const [step, setStep] = useState(1);

  return (
    <GalleryCard title="Linear Wizard" description="Four steps in a horizontal bar — click Next/Back to move through them.">
      <WorkflowStepper
        header={<WorkflowStepperHeader name="Create account" type="Onboarding" />}
        footer={
          <WorkflowStepperFooter>
            <WorkflowStepperNavigation
              currentStep={step}
              totalSteps={LINEAR_LABELS.length}
              onBack={() => setStep((value) => Math.max(1, value - 1))}
              onNext={() => setStep((value) => Math.min(LINEAR_LABELS.length, value + 1))}
            />
          </WorkflowStepperFooter>
        }
      >
        <WorkflowStepperProgress currentStep={step} totalSteps={LINEAR_LABELS.length} />
        <div className="flex items-start pt-4">
          {LINEAR_LABELS.map((label, index) => (
            <div key={label} className="flex flex-1 items-start">
              <WorkflowStepperStep index={index + 1} label={label} status={statusFor(index + 1, step)} />
              {index < LINEAR_LABELS.length - 1 ? <WorkflowStepperConnector status={index + 1 < step ? "complete" : "pending"} /> : null}
            </div>
          ))}
        </div>
      </WorkflowStepper>
    </GalleryCard>
  );
}

const PRODUCT_STEPS: { label: string; description: string }[] = [
  { label: "Choose blank", description: "Select a product template" },
  { label: "Upload artwork", description: "Add your design file" },
  { label: "Set pricing", description: "Choose your margin" },
];

function ProductSetupDemo() {
  const [step, setStep] = useState(2);

  return (
    <GalleryCard title="Product Setup" description="Vertical orientation — the natural fit for a narrow sidebar-hosted step list.">
      <WorkflowStepper
        header={<WorkflowStepperHeader name="New product" type="Production" />}
        footer={
          <WorkflowStepperFooter>
            <WorkflowStepperNavigation
              currentStep={step}
              totalSteps={PRODUCT_STEPS.length}
              onBack={() => setStep((value) => Math.max(1, value - 1))}
              onNext={() => setStep((value) => Math.min(PRODUCT_STEPS.length, value + 1))}
            />
          </WorkflowStepperFooter>
        }
      >
        <div className="flex flex-col">
          {PRODUCT_STEPS.map((item, index) => (
            <div key={item.label}>
              <WorkflowStepperStep index={index + 1} label={item.label} description={item.description} status={statusFor(index + 1, step)} orientation="vertical" />
              {index < PRODUCT_STEPS.length - 1 ? <WorkflowStepperConnector orientation="vertical" status={index + 1 < step ? "complete" : "pending"} /> : null}
            </div>
          ))}
        </div>
      </WorkflowStepper>
    </GalleryCard>
  );
}

function PublishingWizardDemo() {
  const [step] = useState(2);
  const total = 3;

  return (
    <GalleryCard title="Publishing Wizard" description="Header, progress, and summary composed together.">
      <WorkflowStepper
        header={
          <WorkflowStepperHeader name="Spring lookbook launch" type="Publishing">
            <WorkflowStepperProgress currentStep={step} totalSteps={total} />
          </WorkflowStepperHeader>
        }
      >
        <WorkflowStepperSummary
          items={[
            { value: "3", label: "Stages" },
            { value: "1", label: "Blocked" },
          ]}
          columns={2}
        />
        <div className="flex items-start pt-4">
          <WorkflowStepperStep index={1} label="Draft" status="completed" />
          <WorkflowStepperConnector status="complete" />
          <WorkflowStepperStep index={2} label="Review" status="current" />
          <WorkflowStepperConnector status="pending" />
          <WorkflowStepperStep index={3} label="Publish" status="not-started" />
        </div>
      </WorkflowStepper>
    </GalleryCard>
  );
}

function CommerceSetupDemo() {
  return (
    <GalleryCard title="Commerce Setup" description="Two WorkflowStepperStage groups — a Skipped optional step inside the second one.">
      <WorkflowStepper header={<WorkflowStepperHeader name="Store setup" type="Commerce" />}>
        <div className="flex flex-col gap-4 pt-4">
          <WorkflowStepperStage title="Business setup" status="completed">
            <div className="flex items-start">
              <WorkflowStepperStep index={1} label="Store details" status="completed" />
            </div>
          </WorkflowStepperStage>
          <WorkflowStepperStage title="Payment" status="running">
            <div className="flex items-start">
              <WorkflowStepperStep index={2} label="Tax settings" description="Skipped — using defaults" status="skipped" />
              <WorkflowStepperConnector status="complete" />
              <WorkflowStepperStep index={3} label="Payment methods" status="current" />
            </div>
          </WorkflowStepperStage>
        </div>
      </WorkflowStepper>
    </GalleryCard>
  );
}

function ApprovalWizardDemo() {
  const [status, setStatus] = useState<WorkflowStepperStateValue>("waiting");

  return (
    <GalleryCard title="Approval Wizard" description="A Waiting step gated on a real decision — click Approve in the footer.">
      <WorkflowStepper
        header={<WorkflowStepperHeader name="Discount request" type="Commerce" />}
        footer={
          status === "waiting" ? (
            <WorkflowStepperFooter>
              <WorkflowStepperActions>
                <Button variant="secondary" size="sm" onClick={() => setStatus("blocked")}>
                  Reject
                </Button>
                <Button size="sm" onClick={() => setStatus("completed")}>
                  Approve
                </Button>
              </WorkflowStepperActions>
            </WorkflowStepperFooter>
          ) : undefined
        }
      >
        <div className="flex items-start pt-4">
          <WorkflowStepperStep index={1} label="Request" status="completed" />
          <WorkflowStepperConnector status="complete" />
          <WorkflowStepperStep index={2} label="Approval" description={status === "waiting" ? "Awaiting finance sign-off" : undefined} status={status} />
        </div>
      </WorkflowStepper>
    </GalleryCard>
  );
}

function ResumeLaterDemo() {
  const [step, setStep] = useState(1);
  const [savedStep, setSavedStep] = useState<number | null>(null);
  const total = 4;

  return (
    <GalleryCard title="Resume Later" description="Save & Resume is a caller concern — click Save and exit, then Resume to prove the saved step is what comes back.">
      <WorkflowStepper
        header={<WorkflowStepperHeader name="Tax profile" type="Planning" />}
        footer={
          <WorkflowStepperFooter>
            <div className="flex w-full items-center justify-between gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSavedStep(step);
                  setStep(1);
                }}
              >
                Save and exit
              </Button>
              {savedStep ? (
                <Button size="sm" onClick={() => setStep(savedStep)}>
                  Resume (step {savedStep})
                </Button>
              ) : (
                <WorkflowStepperNavigation
                  currentStep={step}
                  totalSteps={total}
                  onBack={() => setStep((value) => Math.max(1, value - 1))}
                  onNext={() => setStep((value) => Math.min(total, value + 1))}
                />
              )}
            </div>
          </WorkflowStepperFooter>
        }
      >
        <WorkflowStepperProgress currentStep={step} totalSteps={total} />
        <div className="flex items-start pt-4">
          {["Income", "Deductions", "Credits", "Review"].map((label, index) => (
            <div key={label} className="flex flex-1 items-start">
              <WorkflowStepperStep index={index + 1} label={label} status={statusFor(index + 1, step)} />
              {index < 3 ? <WorkflowStepperConnector status={index + 1 < step ? "complete" : "pending"} /> : null}
            </div>
          ))}
        </div>
      </WorkflowStepper>
    </GalleryCard>
  );
}

function ReadOnlyReviewDemo() {
  return (
    <GalleryCard title="Read-only Review" description="No onClick on any step and no footer — every WorkflowStepperStep renders as a plain, non-interactive div.">
      <WorkflowStepper header={<WorkflowStepperHeader name="Order #10236 (archived)" type="Commerce" />}>
        <div className="flex items-start pt-4">
          <WorkflowStepperStep index={1} label="Order placed" status="completed" />
          <WorkflowStepperConnector status="complete" />
          <WorkflowStepperStep index={2} label="Payment failed" status="failed" />
          <WorkflowStepperConnector status="pending" />
          <WorkflowStepperStep index={3} label="Fulfillment" status="cancelled" />
        </div>
      </WorkflowStepper>
    </GalleryCard>
  );
}

function CompletedWorkflowDemo() {
  return (
    <GalleryCard title="Completed Workflow" description="Every step Completed — Next relabels itself Finish automatically on the last step.">
      <WorkflowStepper
        header={<WorkflowStepperHeader name="Brand kit setup" type="Publishing" />}
        footer={
          <WorkflowStepperFooter>
            <WorkflowStepperNavigation currentStep={3} totalSteps={3} onBack={() => {}} onNext={() => {}} />
          </WorkflowStepperFooter>
        }
      >
        <WorkflowStepperProgress currentStep={3} totalSteps={3} />
        <div className="flex items-start pt-4">
          <WorkflowStepperStep index={1} label="Logo" status="completed" />
          <WorkflowStepperConnector status="complete" />
          <WorkflowStepperStep index={2} label="Colors" status="completed" />
          <WorkflowStepperConnector status="complete" />
          <WorkflowStepperStep index={3} label="Fonts" status="completed" />
        </div>
      </WorkflowStepper>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each composed from real component props — not a static screenshot. */
export function WorkflowStepperGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <LinearWizardDemo />
      <ProductSetupDemo />
      <PublishingWizardDemo />
      <CommerceSetupDemo />
      <ApprovalWizardDemo />
      <ResumeLaterDemo />
      <ReadOnlyReviewDemo />
      <CompletedWorkflowDemo />
    </div>
  );
}
