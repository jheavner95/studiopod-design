"use client";

import { useState } from "react";
import { Boxes, Image as ImageIcon, FileText, Folder, Home, Info } from "lucide-react";
import { Card, Body } from "@/components/ui";
import { CardGrid } from "@/components/layout";
import {
  Tabs,
  TabsList,
  Tab,
  TabPanel,
  SegmentedControl,
  Breadcrumbs,
  Pagination,
  Stepper,
  SideNavigation,
  TopNavigation,
  NavigationRail,
  TreeNavigation,
  CommandNavigation,
  ContextNavigation,
  NavigationSection,
  NavigationGroup,
  NavigationItem,
  NavigationDivider,
  type TreeNode,
} from "@/components/navigation";
import type { CommandPaletteItem } from "@/components/overlay";

function TabsDemo() {
  const [value, setValue] = useState("overview");
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Tabs</span>
      <Tabs value={value} onValueChange={setValue}>
        <TabsList aria-label="Asset detail views">
          <Tab value="overview">Overview</Tab>
          <Tab value="history" count={3}>
            History
          </Tab>
          <Tab value="settings" disabled>
            Settings
          </Tab>
        </TabsList>
        <TabPanel value="overview">
          <Body size="sm" muted>
            Overview content — arrow keys move between tabs and activate immediately.
          </Body>
        </TabPanel>
        <TabPanel value="history">
          <Body size="sm" muted>
            3 recent changes would list here.
          </Body>
        </TabPanel>
      </Tabs>
    </Card>
  );
}

/**
 * DS-5O — the same tab bar at both densities. `size` is set once on `Tabs` and
 * reaches every `Tab` through context; `sm` (28px) is the operational density
 * for workspace headers and inspector panes.
 */
function TabsSizeDemo() {
  const [md, setMd] = useState("overview");
  const [sm, setSm] = useState("overview");
  return (
    <Card className="flex flex-col gap-4">
      <span className="text-body-md font-medium text-ink-primary">Tabs — size</span>
      <div className="flex flex-col gap-1">
        <Body size="sm" muted>
          md (default) — 38px
        </Body>
        <Tabs value={md} onValueChange={setMd}>
          <TabsList aria-label="Sections at md">
            <Tab value="overview">Overview</Tab>
            <Tab value="history" count={3}>
              History
            </Tab>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex flex-col gap-1">
        <Body size="sm" muted>
          sm — 28px, for dense workspace headers
        </Body>
        <Tabs value={sm} onValueChange={setSm} size="sm">
          <TabsList aria-label="Sections at sm">
            <Tab value="overview">Overview</Tab>
            <Tab value="history" count={3}>
              History
            </Tab>
          </TabsList>
        </Tabs>
      </div>
    </Card>
  );
}

function SegmentedControlDemo() {
  const [value, setValue] = useState<"day" | "week" | "month">("week");
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Segmented Control</span>
      <Body size="sm" muted>
        Re-exported from src/components/ui/SegmentedControl.tsx — a choice input, not a view switcher.
      </Body>
      <SegmentedControl
        aria-label="Time range"
        value={value}
        onChange={setValue}
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
      />
      <Body size="sm" muted>
        DS-5O — size: md (above, unchanged) and sm (below, 28px). At sm the segment takes an explicit
        height and the track tightens, since track padding and border sit outside the segment.
      </Body>
      <SegmentedControl
        aria-label="Time range, compact"
        size="sm"
        value={value}
        onChange={setValue}
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
      />
    </Card>
  );
}

function BreadcrumbsDemo() {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Breadcrumbs</span>
      <Body size="sm" muted>
        6 real levels, maxVisible=4 — the middle collapses behind an overflow Menu.
      </Body>
      <Breadcrumbs
        maxVisible={4}
        items={[
          { label: "Library", href: "#" },
          { label: "Campaigns", href: "#" },
          { label: "Q3 Launch", href: "#" },
          { label: "Social", href: "#" },
          { label: "Instagram", href: "#" },
          { label: "Hero banner" },
        ]}
      />
    </Card>
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(4);
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Pagination</span>
      <Body size="sm" muted>
        Numbered variant, 12 pages — try the ellipsis behavior near the ends.
      </Body>
      <Pagination page={page} pageCount={12} onPageChange={setPage} variant="numbered" />
    </Card>
  );
}

function StepperDemo() {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Stepper</span>
      <Body size="sm" muted>
        4 steps, horizontal, currently on step 3.
      </Body>
      <Stepper
        currentIndex={2}
        steps={[
          { id: "draft", label: "Draft", description: "Content created" },
          { id: "review", label: "Review", description: "Awaiting approval" },
          { id: "scheduled", label: "Scheduled", description: "Queued to publish" },
          { id: "live", label: "Live", description: "Published" },
        ]}
      />
    </Card>
  );
}

function SideNavigationDemo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-body-md font-medium text-ink-primary">Side Navigation</span>
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="focus-ring rounded-md border border-border px-2 py-1 text-caption text-ink-tertiary hover:text-ink-primary"
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>
      <Body size="sm" muted>
        With section grouping — try Collapse to see labels move into a Tooltip.
      </Body>
      <div className="h-72 overflow-hidden rounded-lg border border-border-subtle">
        <SideNavigation collapsed={collapsed} aria-label="Demo workspace">
          <NavigationSection title="Workspace">
            <NavigationGroup label="Library">
              <NavigationItem icon={<Home className="size-4" />} active>
                Overview
              </NavigationItem>
              <NavigationItem icon={<ImageIcon className="size-4" />}>Assets</NavigationItem>
            </NavigationGroup>
            <NavigationGroup label="Operations">
              <NavigationItem icon={<FileText className="size-4" />}>Reports</NavigationItem>
            </NavigationGroup>
          </NavigationSection>
        </SideNavigation>
      </div>
    </Card>
  );
}

function TopNavigationDemo() {
  const items = [
    { id: "assets", label: "Assets", href: "#" },
    { id: "queue", label: "Queue", href: "#" },
    { id: "reports", label: "Reports", href: "#" },
  ];
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Top Navigation</span>
      <Body size="sm" muted>
        Generalizes this design system&rsquo;s own GlobalNav — brand slot, item row, trailing slot.
      </Body>
      <div className="overflow-hidden rounded-lg border border-border-subtle">
        <TopNavigation
          sticky={false}
          brand={
            <span className="flex items-center gap-2 text-body-sm font-semibold text-ink-primary">
              <Boxes className="size-4 text-accent-400" aria-hidden />
              Demo App
            </span>
          }
          items={items}
          activeHref="#assets"
          trailing={<CommandNavigation items={COMMAND_ITEMS} />}
        />
      </div>
    </Card>
  );
}

function NavigationRailDemo() {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Navigation Rail</span>
      <Body size="sm" muted>
        A compact icon rail — pass scrollSpy to track in-page sections instead.
      </Body>
      <NavigationRail
        orientation="horizontal"
        aria-label="Demo rail"
        items={[
          { id: "home", label: "Home", href: "#", icon: <Home className="size-4" /> },
          { id: "assets", label: "Assets", href: "#", icon: <ImageIcon className="size-4" /> },
          { id: "reports", label: "Reports", href: "#", icon: <FileText className="size-4" /> },
        ]}
      />
    </Card>
  );
}

const TREE_NODES: TreeNode[] = [
  {
    id: "assets",
    label: "Assets",
    icon: <Folder className="size-4" />,
    children: [
      { id: "images", label: "Images", icon: <ImageIcon className="size-4" /> },
      { id: "documents", label: "Documents", icon: <FileText className="size-4" /> },
    ],
  },
  { id: "reports", label: "Reports", icon: <Folder className="size-4" /> },
];

function TreeNavigationDemo() {
  const [activeId, setActiveId] = useState("images");
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Tree Navigation</span>
      <Body size="sm" muted>
        Arrow keys expand/collapse and move between visible rows.
      </Body>
      <TreeNavigation nodes={TREE_NODES} activeId={activeId} onSelect={setActiveId} defaultExpandedIds={["assets"]} aria-label="Demo file tree" />
    </Card>
  );
}

const COMMAND_ITEMS: CommandPaletteItem[] = [
  { id: "new-asset", label: "Create new asset", group: "Actions", onSelect: () => {} },
  { id: "go-library", label: "Go to Library", group: "Navigation destinations", onSelect: () => {} },
  { id: "go-reports", label: "Go to Reports", group: "Navigation destinations", onSelect: () => {} },
];

function CommandNavigationDemo() {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Command Navigation</span>
      <Body size="sm" muted>
        Pairs with the Overlay System&rsquo;s CommandPalette — try ⌘K / Ctrl+K.
      </Body>
      <CommandNavigation items={COMMAND_ITEMS} />
    </Card>
  );
}

function ContextNavigationDemo() {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Context Navigation</span>
      <Body size="sm" muted>
        The current object plus its related destinations — not a path.
      </Body>
      <ContextNavigation
        icon={<ImageIcon className="size-4 text-accent-400" />}
        label="Hero banner — Instagram"
        links={[
          { id: "campaign", label: "Q3 Launch campaign", href: "#" },
          { id: "platform", label: "Instagram platform settings", href: "#" },
        ]}
      />
    </Card>
  );
}

function TooltipHint() {
  return (
    <span className="flex items-center gap-1 text-caption text-ink-tertiary">
      <Info className="size-3.5" aria-hidden />
      Collapsed items keep their label in a Tooltip.
    </span>
  );
}

/** DS-5E: previously undocumented anywhere in this docs site despite being a public, exported primitive. */
function NavigationDividerDemo() {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Navigation Divider</span>
      <Body size="sm" muted>
        A plain separator between groups or sections, for when no group heading is needed.
      </Body>
      <div className="flex flex-col">
        <span className="text-body-sm text-ink-secondary">Library</span>
        <NavigationDivider />
        <span className="text-body-sm text-ink-secondary">Operations</span>
      </div>
      <div className="flex h-8 items-center">
        <span className="text-body-sm text-ink-secondary">Assets</span>
        <NavigationDivider orientation="vertical" />
        <span className="text-body-sm text-ink-secondary">Reports</span>
      </div>
    </Card>
  );
}

/** Every named component in this system, each with real state and real interaction — not a static screenshot. */
export function NavigationGallery() {
  return (
    <div className="flex flex-col gap-6">
      <CardGrid columns={2}>
        <TabsDemo />
        <TabsSizeDemo />
        <SegmentedControlDemo />
        <BreadcrumbsDemo />
        <PaginationDemo />
        <StepperDemo />
        <NavigationRailDemo />
      </CardGrid>
      <CardGrid columns={2}>
        <SideNavigationDemo />
        <TopNavigationDemo />
      </CardGrid>
      <CardGrid columns={2}>
        <TreeNavigationDemo />
        <ContextNavigationDemo />
      </CardGrid>
      <CardGrid columns={2}>
        <CommandNavigationDemo />
        <NavigationDividerDemo />
      </CardGrid>
      <CardGrid columns={2}>
        <Card className="flex flex-col justify-center gap-2">
          <TooltipHint />
        </Card>
      </CardGrid>
    </div>
  );
}
