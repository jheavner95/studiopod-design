"use client";

import { useState, type ReactNode } from "react";
import { Image as ImageIcon, Package, Megaphone, ShoppingBag } from "lucide-react";
import { Card, Body, Button } from "@/components/ui";
import { InputField, SwitchField } from "@/components/form";
import {
  InspectorPanel,
  InspectorHeader,
  InspectorSection,
  InspectorGroup,
  InspectorProperty,
  InspectorTabs,
  InspectorTabPanel,
  InspectorValidation,
  InspectorStatus,
  InspectorHistory,
  InspectorActions,
  InspectorFooter,
} from "@/components/operational";

function GalleryCard({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">{title}</span>
      <Body size="sm" muted>
        {description}
      </Body>
      <div className="h-96 overflow-hidden rounded-lg border border-border-subtle">{children}</div>
    </Card>
  );
}

function SimpleInspectorDemo() {
  return (
    <GalleryCard title="Simple Inspector" description="Header, one section, a footer action — the minimum real composition.">
      <InspectorPanel
        header={<InspectorHeader icon={<ImageIcon className="size-4" />} name="Hero banner.png" type="Image" status={{ label: "Published", tone: "success" }} />}
        footer={
          <InspectorFooter>
            <InspectorActions>
              <Button size="sm" variant="secondary">
                Close
              </Button>
            </InspectorActions>
          </InspectorFooter>
        }
      >
        <InspectorSection title="Identity">
          <InspectorGroup>
            <InspectorProperty label="ID" value="ast_4821" />
            <InspectorProperty label="Owner" value="Jordan Lee" />
            <InspectorProperty label="Created" value="Mar 12, 2026" />
          </InspectorGroup>
        </InspectorSection>
      </InspectorPanel>
    </GalleryCard>
  );
}

function AssetInspectorDemo() {
  const [name, setName] = useState("Hero banner.png");
  const [featured, setFeatured] = useState(true);

  return (
    <GalleryCard title="Asset Inspector" description="Read-only Identity plus editable Properties — fields edit in place, no separate edit mode.">
      <InspectorPanel
        header={<InspectorHeader icon={<ImageIcon className="size-4" />} name={name} type="Image" status={{ label: "Published", tone: "success" }} />}
        footer={
          <InspectorFooter>
            <InspectorActions>
              <Button size="sm" variant="ghost">
                Archive
              </Button>
              <Button size="sm">Save</Button>
            </InspectorActions>
          </InspectorFooter>
        }
      >
        <InspectorSection title="Identity" collapsible={false}>
          <InspectorGroup>
            <InspectorProperty label="Size" value="2.4 MB" />
            <InspectorProperty label="Uploaded" value="2h ago" />
          </InspectorGroup>
        </InspectorSection>
        <InspectorSection title="Properties">
          <InspectorGroup columns={1}>
            <InspectorProperty>
              <InputField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </InspectorProperty>
            <InspectorProperty>
              <SwitchField label="Featured on homepage" checked={featured} onChange={setFeatured} />
            </InspectorProperty>
          </InspectorGroup>
        </InspectorSection>
      </InspectorPanel>
    </GalleryCard>
  );
}

function PublishingInspectorDemo() {
  return (
    <GalleryCard title="Publishing Inspector" description="A Status section — read-only operational awareness for the selected object.">
      <InspectorPanel header={<InspectorHeader icon={<Megaphone className="size-4" />} name="Q3 Launch — Instagram" type="Publishing target" />}>
        <InspectorSection title="Status">
          <InspectorStatus
            items={[
              { label: "Sync", status: "success" },
              { label: "Publishing", status: "active" },
              { label: "Provider", status: "idle" },
            ]}
          />
        </InspectorSection>
        <InspectorSection title="Identity">
          <InspectorGroup>
            <InspectorProperty label="Platform" value="Instagram" />
            <InspectorProperty label="Scheduled" value="Jul 14, 9:00 AM" />
          </InspectorGroup>
        </InspectorSection>
      </InspectorPanel>
    </GalleryCard>
  );
}

function CommerceInspectorDemo() {
  const [price, setPrice] = useState("48.00");
  const [active, setActive] = useState(true);

  return (
    <GalleryCard title="Commerce Inspector" description="Editable pricing/availability alongside read-only identity.">
      <InspectorPanel
        header={<InspectorHeader icon={<ShoppingBag className="size-4" />} name="Studio Tee — Black / M" type="Product variant" status={{ label: "Active", tone: "success" }} />}
        footer={
          <InspectorFooter>
            <InspectorActions>
              <Button size="sm">Save</Button>
            </InspectorActions>
          </InspectorFooter>
        }
      >
        <InspectorSection title="Properties">
          <InspectorGroup columns={1}>
            <InspectorProperty>
              <InputField label="Price (USD)" value={price} onChange={(e) => setPrice(e.target.value)} />
            </InspectorProperty>
            <InspectorProperty>
              <SwitchField label="Available for purchase" checked={active} onChange={setActive} />
            </InspectorProperty>
          </InspectorGroup>
        </InspectorSection>
        <InspectorSection title="Identity" collapsible={false}>
          <InspectorGroup>
            <InspectorProperty label="SKU" value="TEE-BLK-M" />
            <InspectorProperty label="Inventory" value="142 units" />
          </InspectorGroup>
        </InspectorSection>
      </InspectorPanel>
    </GalleryCard>
  );
}

function ValidationInspectorDemo() {
  return (
    <GalleryCard title="Validation Inspector" description="Panel-wide errors/warnings via InspectorValidation, separate from any one field's own state.">
      <InspectorPanel header={<InspectorHeader icon={<Package className="size-4" />} name="Winter Collection" type="Product" status={{ label: "Draft", tone: "neutral" }} />}>
        <InspectorSection title="Validation">
          <InspectorValidation
            items={[
              { field: "Description", message: "is required before publishing", severity: "error" },
              { field: "Tags", message: "should have at least one entry", severity: "warning" },
            ]}
          />
        </InspectorSection>
        <InspectorSection title="Identity">
          <InspectorGroup>
            <InspectorProperty label="Category" value="Apparel" />
          </InspectorGroup>
        </InspectorSection>
      </InspectorPanel>
    </GalleryCard>
  );
}

function HistoryInspectorDemo() {
  return (
    <GalleryCard title="History Inspector" description="Newest first, collapsed to recent entries by default — try &ldquo;Show more&rdquo;.">
      <InspectorPanel header={<InspectorHeader icon={<ImageIcon className="size-4" />} name="Hero banner.png" type="Image" />}>
        <InspectorSection title="Activity">
          <InspectorHistory
            entries={[
              { id: "h1", description: "Published to Instagram", actor: "Jordan Lee", timestamp: "2h ago" },
              { id: "h2", description: "Cropped to 4:5", actor: "Jordan Lee", timestamp: "5h ago" },
              { id: "h3", description: "Uploaded", actor: "Jordan Lee", timestamp: "1d ago" },
              { id: "h4", description: "Tagged \"campaign\"", actor: "Sam Rivera", timestamp: "1d ago" },
              { id: "h5", description: "Created from template", actor: "Sam Rivera", timestamp: "2d ago" },
            ]}
          />
        </InspectorSection>
      </InspectorPanel>
    </GalleryCard>
  );
}

function ReadOnlyInspectorDemo() {
  return (
    <GalleryCard title="Read-only Inspector" description="Every property is a MetadataField — no edit controls, no footer actions.">
      <InspectorPanel header={<InspectorHeader icon={<Package className="size-4" />} name="Audit Log Entry" type="System record" />}>
        <InspectorSection title="Details" collapsible={false}>
          <InspectorGroup>
            <InspectorProperty label="Actor" value="System" />
            <InspectorProperty label="Action" value="Auto-archived" />
            <InspectorProperty label="Reason" value="90 days inactive" />
            <InspectorProperty label="Timestamp" value="Jul 9, 2026, 3:14 AM" />
          </InspectorGroup>
        </InspectorSection>
      </InspectorPanel>
    </GalleryCard>
  );
}

function MultiSectionInspectorDemo() {
  const [tab, setTab] = useState("details");

  return (
    <GalleryCard title="Multi-section Inspector" description="InspectorTabs switching between panel views, each holding its own Sections.">
      <InspectorPanel
        header={<InspectorHeader icon={<Megaphone className="size-4" />} name="Q3 Launch Campaign" type="Campaign" status={{ label: "Active", tone: "success" }} />}
        tabs={
          <InspectorTabs
            value={tab}
            onValueChange={setTab}
            tabs={[
              { id: "details", label: "Details" },
              { id: "validation", label: "Validation", count: 1 },
            ]}
          >
            <InspectorTabPanel value="details">
              <InspectorSection title="Identity" collapsible={false}>
                <InspectorGroup>
                  <InspectorProperty label="Owner" value="Jordan Lee" />
                  <InspectorProperty label="Platforms" value="Instagram, TikTok" />
                </InspectorGroup>
              </InspectorSection>
            </InspectorTabPanel>
            <InspectorTabPanel value="validation">
              <InspectorValidation items={[{ field: "Budget", message: "exceeds monthly cap", severity: "warning" }]} />
            </InspectorTabPanel>
          </InspectorTabs>
        }
      />
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each with real state and real interaction — not a static screenshot. */
export function InspectorPanelGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <SimpleInspectorDemo />
      <AssetInspectorDemo />
      <PublishingInspectorDemo />
      <CommerceInspectorDemo />
      <ValidationInspectorDemo />
      <HistoryInspectorDemo />
      <ReadOnlyInspectorDemo />
      <MultiSectionInspectorDemo />
    </div>
  );
}
