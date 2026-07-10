"use client";

import { useState } from "react";
import { Card, Body, Button } from "@/components/ui";
import {
  ApprovalFlow,
  ApprovalStage,
  ApprovalStep,
  ApprovalRequest,
  ApprovalDecision,
  ApprovalActions,
  ReviewPanel,
  ReviewComment,
  ReviewChecklist,
  ReviewSummary,
  ReviewHistory,
  WorkflowTransition,
  type ApprovalStateValue,
  type ReviewChecklistItem,
  type ReviewHistoryEntry,
} from "@/components/workflow";
import { InspectorHeader, InspectorFooter } from "@/components/operational";

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

function SingleApprovalDemo() {
  const [status, setStatus] = useState<ApprovalStateValue>("in-review");

  return (
    <GalleryCard title="Single Approval" description="One request, one decision — click Approve or Reject in the footer.">
      <ApprovalFlow
        header={<ApprovalRequest title="Homepage banner swap" requester="Jane" requestedAt="2 hours ago" status={status} />}
        footer={
          status === "in-review" ? (
            <InspectorFooter>
              <ApprovalActions>
                <Button variant="secondary" size="sm" onClick={() => setStatus("rejected")}>
                  Reject
                </Button>
                <Button size="sm" onClick={() => setStatus("approved")}>
                  Approve
                </Button>
              </ApprovalActions>
            </InspectorFooter>
          ) : undefined
        }
      >
        {status !== "in-review" ? <ApprovalDecision status={status} reason={status === "approved" ? "Looks good, ship it." : "Wrong image dimensions."} actor="Sam" timestamp="just now" /> : null}
      </ApprovalFlow>
    </GalleryCard>
  );
}

function MultiStageApprovalDemo() {
  return (
    <GalleryCard title="Multi-stage Approval" description="Two ApprovalStages, each with its own steps and a WorkflowTransition between them.">
      <ApprovalFlow header={<ApprovalRequest title="New product listing" requester="Priya" requestedAt="Yesterday" status="in-review" />}>
        <div className="flex flex-col gap-4">
          <ApprovalStage title="Content review" status="completed">
            <ApprovalStep label="Copy reviewed" status="approved" />
          </ApprovalStage>
          <WorkflowTransition status="complete" />
          <ApprovalStage title="Pricing review" status="running">
            <ApprovalStep label="Margin check" status="approved" />
            <ApprovalStep label="Tax settings" status="in-review" />
          </ApprovalStage>
        </div>
      </ApprovalFlow>
    </GalleryCard>
  );
}

function PublishingReviewDemo() {
  const [comment, setComment] = useState("");

  return (
    <GalleryCard title="Publishing Review" description="ReviewPanel composing a comment field and the Approve/Reject actions.">
      <ReviewPanel
        header={<InspectorHeader name="Spring lookbook launch" type="Publishing" status={{ label: "In Review", tone: "accent" }} />}
        footer={
          <InspectorFooter>
            <ApprovalActions>
              <Button variant="secondary" size="sm">
                Request Changes
              </Button>
              <Button size="sm">Approve</Button>
            </ApprovalActions>
          </InspectorFooter>
        }
      >
        <ReviewComment value={comment} onChange={setComment} label="Editorial notes" placeholder="Any notes before this goes live?" />
      </ReviewPanel>
    </GalleryCard>
  );
}

function ProductionQAReviewDemo() {
  const [items, setItems] = useState<ReviewChecklistItem[]>([
    { id: "1", label: "Geometry validated", checked: true },
    { id: "2", label: "Safe zones checked", checked: true },
    { id: "3", label: "Color profile correct", checked: false },
    { id: "4", label: "File size under limit", checked: false },
  ]);

  return (
    <GalleryCard title="Production QA Review" description="A validation checklist gating a QA sign-off.">
      <ReviewPanel header={<InspectorHeader name="Product render #4821" type="Production" status={{ label: "In Review", tone: "accent" }} />}>
        <ReviewChecklist items={items} onToggle={(id, checked) => setItems((prev) => prev.map((item) => (item.id === id ? { ...item, checked } : item)))} />
      </ReviewPanel>
    </GalleryCard>
  );
}

function CommerceApprovalDemo() {
  const [status, setStatus] = useState<ApprovalStateValue>("in-review");

  return (
    <GalleryCard title="Commerce Approval" description="A discount request — Reject routes to Changes Requested instead of a hard rejection.">
      <ApprovalFlow
        header={<ApprovalRequest title="Discount request" requester="Alex" requestedAt="1 hour ago" status={status} />}
        footer={
          status === "in-review" ? (
            <InspectorFooter>
              <ApprovalActions>
                <Button variant="secondary" size="sm" onClick={() => setStatus("changes-requested")}>
                  Request Changes
                </Button>
                <Button size="sm" onClick={() => setStatus("approved")}>
                  Approve
                </Button>
              </ApprovalActions>
            </InspectorFooter>
          ) : undefined
        }
      >
        {status !== "in-review" ? <ApprovalDecision status={status} reason={status === "approved" ? "Within standard margin." : "Discount exceeds 20% cap — resubmit with finance sign-off."} actor="Finance" timestamp="just now" /> : null}
      </ApprovalFlow>
    </GalleryCard>
  );
}

function ChecklistReviewDemo() {
  const [items, setItems] = useState<ReviewChecklistItem[]>([
    { id: "1", label: "Terms accepted", checked: false, required: true },
    { id: "2", label: "Tax ID verified", checked: false, required: true },
    { id: "3", label: "Bank details confirmed", checked: false },
  ]);
  const allRequiredChecked = items.filter((item) => item.required).every((item) => item.checked);

  return (
    <GalleryCard title="Checklist Review" description="Approve stays disabled until every required item is checked — try checking them.">
      <ReviewPanel
        header={<InspectorHeader name="Vendor onboarding" type="Commerce" status={{ label: "In Review", tone: "accent" }} />}
        footer={
          <InspectorFooter>
            <ApprovalActions>
              <Button size="sm" disabled={!allRequiredChecked}>
                Approve
              </Button>
            </ApprovalActions>
          </InspectorFooter>
        }
      >
        <ReviewChecklist items={items} onToggle={(id, checked) => setItems((prev) => prev.map((item) => (item.id === id ? { ...item, checked } : item)))} />
      </ReviewPanel>
    </GalleryCard>
  );
}

const REJECTED_HISTORY: ReviewHistoryEntry[] = [
  { id: "1", title: "Request submitted", actor: "Jane", timestamp: "Mon 9:00 AM", status: "pending" },
  { id: "2", title: "Picked up for review", actor: "Sam", timestamp: "Mon 11:00 AM", status: "in-review" },
  { id: "3", title: "Rejected", description: "Wrong image dimensions.", actor: "Sam", timestamp: "Mon 11:20 AM", status: "rejected" },
];

function RejectedReviewDemo() {
  return (
    <GalleryCard title="Rejected Review" description="A read-only rejected request with its full decision history.">
      <ApprovalFlow header={<ApprovalRequest title="Homepage banner swap" requester="Jane" requestedAt="3 days ago" status="rejected" />}>
        <div className="flex flex-col gap-4">
          <ApprovalDecision status="rejected" reason="Wrong image dimensions." actor="Sam" timestamp="Mon 11:20 AM" />
          <ReviewHistory entries={REJECTED_HISTORY} />
        </div>
      </ApprovalFlow>
    </GalleryCard>
  );
}

const COMPLETED_HISTORY: ReviewHistoryEntry[] = [
  { id: "1", title: "Request submitted", actor: "Priya", timestamp: "Mon 9:00 AM", status: "pending" },
  { id: "2", title: "Content review approved", actor: "Sam", timestamp: "Mon 2:00 PM", status: "approved" },
  { id: "3", title: "Pricing review approved", actor: "Alex", timestamp: "Tue 10:00 AM", status: "approved" },
  { id: "4", title: "All stages complete", actor: "System", timestamp: "Tue 10:01 AM", status: "completed" },
];

function CompletedApprovalDemo() {
  return (
    <GalleryCard title="Completed Approval" description="Every stage approved — ReviewSummary totals plus the full ReviewHistory.">
      <ApprovalFlow header={<ApprovalRequest title="New product listing" requester="Priya" requestedAt="2 days ago" status="completed" />}>
        <div className="flex flex-col gap-4">
          <ReviewSummary items={[{ value: "2", label: "Stages" }, { value: "2", label: "Approvals" }]} columns={2} />
          <ReviewHistory entries={COMPLETED_HISTORY} />
        </div>
      </ApprovalFlow>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each composed from real component props — not a static screenshot. */
export function ApprovalReviewGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <SingleApprovalDemo />
      <MultiStageApprovalDemo />
      <PublishingReviewDemo />
      <ProductionQAReviewDemo />
      <CommerceApprovalDemo />
      <ChecklistReviewDemo />
      <RejectedReviewDemo />
      <CompletedApprovalDemo />
    </div>
  );
}
