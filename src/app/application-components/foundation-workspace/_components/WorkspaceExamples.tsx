"use client";

import { Boxes, Home, Layers, Settings, ShieldCheck, Sliders } from "lucide-react";
import {
  Workspace,
  WorkspaceHeader,
  WorkspaceToolbar,
  WorkspaceBody,
  WorkspaceNavigation,
  WorkspaceContent,
  WorkspaceInspector,
  WorkspaceFooter,
} from "@/components/layout";
import { DescriptionList } from "@/components/metadata";
import { Button, Badge, Body, Caption, SearchInput } from "@/components/ui";
import { CANONICAL_PRODUCTS, CANONICAL_JOBS, CANONICAL_PEOPLE } from "@/lib/canonical";

/**
 * DS-2 Part 6 — six representative compositions, each built from the real
 * Workspace family plus real UI kit primitives (never decorative markup
 * standing in for a real region). Every example renders `fullHeight={false}`
 * inside a fixed-height, bordered frame — the "contained" mode `Workspace`'s
 * own docs already describe for exactly this embedding case.
 */
function DemoFrame({ children, height = "22rem" }: { children: React.ReactNode; height?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border" style={{ height }}>
      {children}
    </div>
  );
}

function NavList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-0.5 p-2">
      {items.map((item, i) => (
        <li key={item}>
          <div
            className={
              i === 0
                ? "rounded-md bg-accent-soft/30 px-2.5 py-1.5 text-body-sm font-medium text-accent-300"
                : "rounded-md px-2.5 py-1.5 text-body-sm text-ink-secondary"
            }
          >
            {item}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** 1. Two-panel — the minimal real shape: Header + Navigation + Content. */
export function TwoPanelExample() {
  return (
    <DemoFrame>
      <Workspace>
        <WorkspaceHeader>
          <Body size="sm" className="font-medium text-ink-primary">
            Catalog
          </Body>
        </WorkspaceHeader>
        <WorkspaceBody>
          <WorkspaceNavigation label="Product groups" width="12rem">
            <NavList items={["All products", "Apparel", "Drinkware", "Collections"]} />
          </WorkspaceNavigation>
          <WorkspaceContent label="Product list" scroll padded>
            <div className="flex flex-col gap-2">
              {CANONICAL_PRODUCTS.map((p) => (
                <div key={p.id} className="rounded-md border border-border-subtle p-2.5">
                  <Body size="sm" className="text-ink-primary">
                    {p.name}
                  </Body>
                  <Caption className="text-ink-tertiary">{p.sku}</Caption>
                </div>
              ))}
            </div>
          </WorkspaceContent>
        </WorkspaceBody>
      </Workspace>
    </DemoFrame>
  );
}

/** 2. Three-panel — the canonical Tier 4 peer set: Navigation, Content, Inspector. */
export function ThreePanelExample() {
  return (
    <DemoFrame>
      <Workspace>
        <WorkspaceHeader>
          <Body size="sm" className="font-medium text-ink-primary">
            Batch run #204
          </Body>
        </WorkspaceHeader>
        <WorkspaceBody>
          <WorkspaceNavigation label="Batches" width="10rem">
            <NavList items={["#204", "#203", "#202"]} />
          </WorkspaceNavigation>
          <WorkspaceContent label="Batch items" scroll padded>
            <div className="flex flex-col gap-2">
              {CANONICAL_JOBS.slice(0, 3).map((job) => (
                <div key={job.id} className="flex items-center justify-between rounded-md border border-border-subtle p-2.5">
                  <Body size="sm" className="text-ink-primary">
                    {job.name} {job.ref}
                  </Body>
                  <Badge tone="accent" size="sm">
                    Queued
                  </Badge>
                </div>
              ))}
            </div>
          </WorkspaceContent>
          <WorkspaceInspector label="Selected job" width="14rem" hideBelowLg={false}>
            <div className="flex flex-col gap-3 p-3">
              <Body size="sm" className="font-medium text-ink-primary">
                {CANONICAL_JOBS[0].name} {CANONICAL_JOBS[0].ref}
              </Body>
              <DescriptionList
                items={[
                  { label: "Assignee", value: CANONICAL_PEOPLE[0].name },
                  { label: "Status", value: "Queued" },
                ]}
                bordered={false}
              />
            </div>
          </WorkspaceInspector>
        </WorkspaceBody>
      </Workspace>
    </DemoFrame>
  );
}

/** 3. Inspector layout — the selection-drives-detail pattern, Inspector as the point. */
export function InspectorLayoutExample() {
  return (
    <DemoFrame>
      <Workspace>
        <WorkspaceHeader>
          <Body size="sm" className="font-medium text-ink-primary">
            {CANONICAL_PRODUCTS[1].name}
          </Body>
        </WorkspaceHeader>
        <WorkspaceBody>
          <WorkspaceContent label="Preview" scroll padded>
            <div className="flex h-full items-center justify-center rounded-md border border-dashed border-border text-ink-tertiary">
              <Caption>Canvas / preview area</Caption>
            </div>
          </WorkspaceContent>
          <WorkspaceInspector label="Properties" width="16rem" hideBelowLg={false} scroll>
            <div className="flex flex-col gap-3 p-3">
              <Caption className="text-ink-tertiary">Properties</Caption>
              <DescriptionList
                items={[
                  { label: "SKU", value: CANONICAL_PRODUCTS[1].sku },
                  { label: "Kind", value: CANONICAL_PRODUCTS[1].kind },
                  { label: "Status", value: "In review" },
                ]}
                bordered={false}
              />
            </div>
          </WorkspaceInspector>
        </WorkspaceBody>
      </Workspace>
    </DemoFrame>
  );
}

/** 4. Collapsed navigation — the icon-only rail `collapsed` produces. */
export function CollapsedNavigationExample() {
  const items = [
    { icon: Home, label: "Overview" },
    { icon: Boxes, label: "Products" },
    { icon: Layers, label: "Batches" },
    { icon: ShieldCheck, label: "Validation" },
    { icon: Settings, label: "Settings" },
  ];
  return (
    <DemoFrame>
      <Workspace>
        <WorkspaceHeader>
          <Body size="sm" className="font-medium text-ink-primary">
            Production
          </Body>
        </WorkspaceHeader>
        <WorkspaceBody>
          <WorkspaceNavigation label="Primary" collapsed>
            <ul className="flex flex-col items-center gap-1 p-2">
              {items.map(({ icon: Icon, label }, i) => (
                <li key={label}>
                  <div
                    className={
                      i === 0
                        ? "flex size-9 items-center justify-center rounded-md bg-accent-soft/30 text-accent-300"
                        : "flex size-9 items-center justify-center rounded-md text-ink-tertiary"
                    }
                    aria-label={label}
                  >
                    <Icon className="size-4" aria-hidden />
                  </div>
                </li>
              ))}
            </ul>
          </WorkspaceNavigation>
          <WorkspaceContent label="Main content" padded>
            <Caption className="text-ink-tertiary">
              Navigation is collapsed to a 3.5rem icon rail — the consumer owns the toggle and the icon-only content;
              Workspace only owns the width and the `data-collapsed` attribute.
            </Caption>
          </WorkspaceContent>
        </WorkspaceBody>
      </Workspace>
    </DemoFrame>
  );
}

/** 5. Responsive mobile layout — Navigation/Inspector's hideBelowLg at a narrow width. */
export function ResponsiveMobileExample() {
  return (
    <div className="mx-auto" style={{ width: "22rem" }}>
      <DemoFrame height="20rem">
        <Workspace>
          <WorkspaceHeader>
            <Body size="sm" className="font-medium text-ink-primary">
              Orders
            </Body>
          </WorkspaceHeader>
          <WorkspaceBody>
            <WorkspaceNavigation label="Primary" width="12rem" hideBelowLg>
              <NavList items={["All orders", "Pending", "Fulfilled"]} />
            </WorkspaceNavigation>
            <WorkspaceContent label="Order list" scroll padded>
              <Caption className="text-ink-tertiary">
                At this width, `hideBelowLg` removes Navigation and Inspector from layout and the focus order —
                Content gets the full column. A real app would offer a drawer or menu instead; this primitive
                doesn&apos;t invent one for you.
              </Caption>
            </WorkspaceContent>
            <WorkspaceInspector label="Details" width="14rem">
              <div className="p-3">
                <Caption>Details</Caption>
              </div>
            </WorkspaceInspector>
          </WorkspaceBody>
        </Workspace>
      </DemoFrame>
    </div>
  );
}

/** 6. Dense production workspace — the full six-region anatomy at compact density. */
export function DenseProductionExample() {
  return (
    <DemoFrame height="26rem">
      <Workspace density="compact">
        <WorkspaceHeader>
          <Body size="sm" className="font-medium text-ink-primary">
            Publishing queue
          </Body>
          <Badge tone="success" size="sm" className="ml-auto">
            Healthy
          </Badge>
        </WorkspaceHeader>
        <WorkspaceToolbar>
          <SearchInput value="" onChange={() => {}} placeholder="Search listings…" className="max-w-[12rem]" />
          <Button size="sm" variant="secondary" leadingIcon={<Sliders className="size-3.5" />}>
            Filter
          </Button>
          <Button size="sm" className="ml-auto">
            Publish selected
          </Button>
        </WorkspaceToolbar>
        <WorkspaceBody>
          <WorkspaceNavigation label="Channels" width="10rem">
            <NavList items={["All channels", "Etsy", "Shopify", "Amazon"]} />
          </WorkspaceNavigation>
          <WorkspaceContent label="Listings" scroll padded>
            <div className="flex flex-col gap-1.5">
              {CANONICAL_JOBS.map((job) => (
                <div key={job.id} className="flex items-center justify-between rounded-md border border-border-subtle px-2.5 py-1.5">
                  <Body size="sm" className="text-ink-primary">
                    {job.name} {job.ref}
                  </Body>
                  <Badge tone="neutral" size="sm">
                    Draft
                  </Badge>
                </div>
              ))}
            </div>
          </WorkspaceContent>
          <WorkspaceInspector label="Selected listing" width="13rem" hideBelowLg={false}>
            <div className="flex flex-col gap-2 p-2.5">
              <DescriptionList items={[{ label: "Owner", value: CANONICAL_PEOPLE[1].name }]} bordered={false} />
            </div>
          </WorkspaceInspector>
        </WorkspaceBody>
        <WorkspaceFooter>
          <Caption className="text-ink-tertiary">3 jobs queued</Caption>
          <Caption className="ml-auto text-ink-tertiary">All providers connected</Caption>
        </WorkspaceFooter>
      </Workspace>
    </DemoFrame>
  );
}
