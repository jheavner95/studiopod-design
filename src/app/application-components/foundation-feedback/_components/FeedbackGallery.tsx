"use client";

import { useState } from "react";
import { Card, Body, Button } from "@/components/ui";
import { CardGrid } from "@/components/layout";
import {
  Alert,
  Banner,
  Notification,
  InlineMessage,
  EmptyState,
  LoadingState,
  Skeleton,
  ProgressBar,
  ProgressRing,
  StatusIndicator,
  ValidationSummary,
  SuccessState,
  WarningState,
  ErrorState,
  InfoState,
  ToastProvider,
  useToast,
  type FeedbackTone,
} from "@/components/feedback";

function AlertDemo() {
  const [dismissed, setDismissed] = useState(false);
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Alert</span>
      <Body size="sm" muted>
        Boxed, section-level — stays in the layout until dismissed.
      </Body>
      <div className="flex flex-col gap-2">
        {!dismissed ? (
          <Alert tone="warning" title="Storage nearly full" onDismiss={() => setDismissed(true)}>
            You&rsquo;ve used 92% of your workspace quota.
          </Alert>
        ) : (
          <Alert tone="success">Dismissed — try reloading the gallery to bring it back.</Alert>
        )}
      </div>
    </Card>
  );
}

const TOAST_SAMPLES: { tone: FeedbackTone; title: string; message: string }[] = [
  { tone: "success", title: "Published", message: "Hero banner is now live on Instagram." },
  { tone: "error", title: "Upload failed", message: "The file exceeded the 50MB limit." },
  { tone: "info", title: "Heads up", message: "3 new comments on this asset." },
];

function ToastDemo() {
  const { show } = useToast();
  const [count, setCount] = useState(0);
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Toast</span>
      <Body size="sm" muted>
        Transient, self-dismissing — watch the bottom-right corner of this page.
      </Body>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          const sample = TOAST_SAMPLES[count % TOAST_SAMPLES.length];
          show(sample);
          setCount((c) => c + 1);
        }}
      >
        Show toast
      </Button>
    </Card>
  );
}

function BannerDemo() {
  return (
    <Card className="flex flex-col gap-3 overflow-hidden !p-0">
      <div className="flex flex-col gap-3 p-6 pb-0">
        <span className="text-body-md font-medium text-ink-primary">Banner</span>
        <Body size="sm" muted>
          Full-bleed, edge-to-edge — for page- or workspace-level announcements.
        </Body>
      </div>
      <Banner tone="info" className="border-t">
        A new design system release is available.
      </Banner>
    </Card>
  );
}

function NotificationDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Notification</span>
      <Body size="sm" muted>
        The presentational row Toast stacks — also reusable standalone for a future Notification Center.
      </Body>
      {visible ? (
        <Notification
          tone="success"
          title="Export complete"
          message="12 assets exported to Q3 Launch / Social."
          timestamp="2 minutes ago"
          onDismiss={() => setVisible(false)}
        />
      ) : (
        <Body size="sm" muted>
          Dismissed.
        </Body>
      )}
    </Card>
  );
}

function InlineMessageDemo() {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Inline Message</span>
      <Body size="sm" muted>
        A compact, borderless icon+text line — not attached to one form field.
      </Body>
      <div className="flex flex-col gap-2">
        <InlineMessage tone="success">Saved 2 minutes ago</InlineMessage>
        <InlineMessage tone="warning">This action can&rsquo;t be undone</InlineMessage>
      </div>
    </Card>
  );
}

function EmptyStateDemo() {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Empty State</span>
      <Body size="sm" muted>
        No data, no results, or a failed load — with illustration and a retry action.
      </Body>
      <EmptyState title="No assets yet" description="Upload your first file to get started." action={<Button size="sm">Upload asset</Button>} />
    </Card>
  );
}

function LoadingStateDemo() {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Loading State</span>
      <Body size="sm" muted>
        A full-region placeholder for an async region with no shape to preview yet.
      </Body>
      <LoadingState label="Fetching results…" />
    </Card>
  );
}

function SkeletonDemo() {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Skeleton</span>
      <Body size="sm" muted>
        Text line, Block, and Circle (avatar) variants — for previewing a known shape.
      </Body>
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" className="size-10" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton variant="text" className="w-2/3" />
          <Skeleton variant="text" className="w-full" />
        </div>
      </div>
    </Card>
  );
}

function ProgressBarDemo() {
  const [value, setValue] = useState(0.4);
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Progress Bar</span>
      <Body size="sm" muted>
        Determinate (a known value) and Indeterminate (no knowable duration).
      </Body>
      <ProgressBar value={value} label="Encoding" showPercentage />
      <ProgressBar indeterminate label="Uploading" tone="accent" />
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => setValue((v) => Math.max(0, v - 0.2))}>
          −20%
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setValue((v) => Math.min(1, v + 0.2))}>
          +20%
        </Button>
      </div>
    </Card>
  );
}

function ProgressRingDemo() {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Progress Ring</span>
      <Body size="sm" muted>
        The circular counterpart to Progress Bar, for compact dashboard summaries.
      </Body>
      <div className="flex items-center gap-4">
        <ProgressRing value={0.65} size={48} label="Render progress" />
        <ProgressRing indeterminate size={48} tone="accent" />
      </div>
    </Card>
  );
}

function StatusIndicatorDemo() {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Status Indicator</span>
      <Body size="sm" muted>
        A persistent, at-a-glance status dot + label — pulses only while live.
      </Body>
      <div className="flex flex-col gap-2">
        <StatusIndicator status="active" />
        <StatusIndicator status="success" />
        <StatusIndicator status="error" />
      </div>
    </Card>
  );
}

function ValidationSummaryDemo() {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Validation Summary</span>
      <Body size="sm" muted>
        Re-exported from src/components/form/ValidationSummary.tsx — an aggregate list of field errors.
      </Body>
      <ValidationSummary
        items={[
          { field: "Title", message: "is required", severity: "error" },
          { field: "Tags", message: "should have at least one entry", severity: "warning" },
        ]}
      />
    </Card>
  );
}

function ToneStatesDemo() {
  return (
    <Card className="flex flex-col gap-4">
      <span className="text-body-md font-medium text-ink-primary">Success · Warning · Error · Info</span>
      <Body size="sm" muted>
        Thin tone presets over EmptyState&rsquo;s same icon/title/description/action layout.
      </Body>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SuccessState title="Publish succeeded" description="Live on 3 platforms." />
        <WarningState title="Missing metadata" description="4 assets have no alt text." />
        <ErrorState title="Failed to load" description="Check your connection and retry." action={<Button size="sm">Retry</Button>} />
        <InfoState title="New feature available" description="Try the new bulk-export flow." />
      </div>
    </Card>
  );
}

/** Every named component in this system, each with real state and real interaction — not a static screenshot. */
export function FeedbackGallery() {
  return (
    <ToastProvider>
      <div className="flex flex-col gap-6">
        <CardGrid columns={2}>
          <AlertDemo />
          <ToastDemo />
        </CardGrid>
        <CardGrid columns={2}>
          <BannerDemo />
          <NotificationDemo />
        </CardGrid>
        <CardGrid columns={2}>
          <InlineMessageDemo />
          <EmptyStateDemo />
        </CardGrid>
        <CardGrid columns={2}>
          <LoadingStateDemo />
          <SkeletonDemo />
        </CardGrid>
        <CardGrid columns={2}>
          <ProgressBarDemo />
          <ProgressRingDemo />
        </CardGrid>
        <CardGrid columns={2}>
          <StatusIndicatorDemo />
          <ValidationSummaryDemo />
        </CardGrid>
        <ToneStatesDemo />
      </div>
    </ToastProvider>
  );
}
