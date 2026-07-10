"use client";

import { useState, type ReactNode } from "react";
import { Image as ImageIcon, Palette, Megaphone, ShoppingBag, Settings2, FileText } from "lucide-react";
import { Card, Body, Button } from "@/components/ui";
import {
  PropertyPanel,
  PropertySection,
  PropertyGroup,
  PropertyRow,
  PropertyEditor,
  PropertyToggle,
  PropertySelect,
  PropertyNumber,
  PropertyColor,
  PropertyActions,
  InspectorHeader,
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

function BasicPropertiesDemo() {
  const [name, setName] = useState("Hero banner.png");

  return (
    <GalleryCard title="Basic Properties" description="A single section, a mix of read-only and one editable row.">
      <PropertyPanel header={<InspectorHeader icon={<ImageIcon className="size-4" />} name={name} type="Image" />}>
        <PropertySection title="Details" collapsible={false}>
          <PropertyGroup columns={1}>
            <PropertyEditor field={{ id: "name", type: "text", label: "Name", value: name, onChange: setName }} />
            <PropertyRow label="Size" value="2.4 MB" />
            <PropertyRow label="Uploaded" value="2h ago" />
          </PropertyGroup>
        </PropertySection>
      </PropertyPanel>
    </GalleryCard>
  );
}

function GroupedPropertiesDemo() {
  return (
    <GalleryCard title="Grouped Properties" description="One section, two PropertyGroups clustering related fields separately.">
      <PropertyPanel header={<InspectorHeader icon={<FileText className="size-4" />} name="Press release.pdf" type="Document" />}>
        <PropertySection title="Document">
          <PropertyGroup title="General">
            <PropertyRow label="Author" value="Jordan Lee" />
            <PropertyRow label="Pages" value="4" />
          </PropertyGroup>
          <PropertyGroup title="Metadata">
            <PropertyRow label="Language" value="English" />
            <PropertyRow label="License" value="Internal use" />
          </PropertyGroup>
        </PropertySection>
      </PropertyPanel>
    </GalleryCard>
  );
}

function AppearanceDemo() {
  const [color, setColor] = useState("#7c5cff");
  const [darkMode, setDarkMode] = useState(true);

  return (
    <GalleryCard title="Appearance" description="PropertyColor's swatch+hex editor alongside a PropertyToggle.">
      <PropertyPanel header={<InspectorHeader icon={<Palette className="size-4" />} name="Brand theme" type="Theme" />}>
        <PropertySection title="Appearance" collapsible={false}>
          <PropertyGroup columns={1}>
            <PropertyColor label="Accent color" value={color} onChange={setColor} />
            <PropertyToggle label="Dark mode" checked={darkMode} onChange={setDarkMode} />
          </PropertyGroup>
        </PropertySection>
      </PropertyPanel>
    </GalleryCard>
  );
}

function PublishingDemo() {
  const [platform, setPlatform] = useState("instagram");
  const [autoPublish, setAutoPublish] = useState(false);

  return (
    <GalleryCard title="Publishing" description="PropertySelect for a platform choice, PropertyToggle for automation.">
      <PropertyPanel header={<InspectorHeader icon={<Megaphone className="size-4" />} name="Q3 Launch — Instagram" type="Publishing target" status={{ label: "Scheduled", tone: "accent" }} />}>
        <PropertySection title="Publishing" collapsible={false}>
          <PropertyGroup columns={1}>
            <PropertySelect
              label="Platform"
              value={platform}
              onChange={setPlatform}
              options={[
                { value: "instagram", label: "Instagram" },
                { value: "tiktok", label: "TikTok" },
                { value: "facebook", label: "Facebook" },
              ]}
            />
            <PropertyToggle label="Auto-publish when approved" checked={autoPublish} onChange={setAutoPublish} />
          </PropertyGroup>
        </PropertySection>
      </PropertyPanel>
    </GalleryCard>
  );
}

function CommerceDemo() {
  const defaultPrice = 48;
  const [price, setPrice] = useState(defaultPrice);
  const [active, setActive] = useState(true);

  return (
    <GalleryCard title="Commerce" description="PropertyNumber for price, with PropertyReset appearing once the value differs from default.">
      <PropertyPanel
        header={<InspectorHeader icon={<ShoppingBag className="size-4" />} name="Studio Tee — Black / M" type="Product variant" status={{ label: "Active", tone: "success" }} />}
        footer={
          <InspectorFooter>
            <PropertyActions>
              <Button size="sm">Save</Button>
            </PropertyActions>
          </InspectorFooter>
        }
      >
        <PropertySection title="Pricing" collapsible={false}>
          <PropertyGroup columns={1}>
            <PropertyRow
              editor={<PropertyNumber label="Price (USD)" value={price} onChange={setPrice} min={0} step={1} />}
              modified={price !== defaultPrice}
              onReset={() => setPrice(defaultPrice)}
            />
            <PropertyToggle label="Available for purchase" checked={active} onChange={setActive} />
          </PropertyGroup>
        </PropertySection>
      </PropertyPanel>
    </GalleryCard>
  );
}

function AdvancedSettingsDemo() {
  return (
    <GalleryCard title="Advanced Settings" description="A PropertySection defaulting to collapsed — progressive disclosure for rarely-touched fields.">
      <PropertyPanel header={<InspectorHeader icon={<Settings2 className="size-4" />} name="Encoding profile" type="System setting" />}>
        <PropertySection title="Common" collapsible={false}>
          <PropertyGroup>
            <PropertyRow label="Format" value="MP4" />
            <PropertyRow label="Resolution" value="1080p" />
          </PropertyGroup>
        </PropertySection>
        <PropertySection title="Advanced" defaultOpen={false}>
          <PropertyGroup columns={1}>
            <PropertyRow label="Bitrate cap" value="12 Mbps" />
            <PropertyRow label="Keyframe interval" value="2s" />
          </PropertyGroup>
        </PropertySection>
      </PropertyPanel>
    </GalleryCard>
  );
}

function ReadOnlyDemo() {
  return (
    <GalleryCard title="Read-only" description="Every row is PropertyLabel/PropertyValue — no editors, no footer actions.">
      <PropertyPanel header={<InspectorHeader icon={<FileText className="size-4" />} name="Audit Log Entry" type="System record" />}>
        <PropertySection title="Details" collapsible={false}>
          <PropertyGroup>
            <PropertyRow label="Actor" value="System" />
            <PropertyRow label="Action" value="Auto-archived" />
            <PropertyRow label="Reason" value="90 days inactive" />
            <PropertyRow label="Timestamp" value="Jul 9, 2026, 3:14 AM" />
          </PropertyGroup>
        </PropertySection>
      </PropertyPanel>
    </GalleryCard>
  );
}

function MixedEditorsDemo() {
  const [title, setTitle] = useState("Summer Sale");
  const [quantity, setQuantity] = useState(10);
  const [category, setCategory] = useState("apparel");
  const [featured, setFeatured] = useState(false);
  const [color, setColor] = useState("#22c55e");

  return (
    <GalleryCard title="Mixed Editors" description="All five PropertyEditor field types together — text, number, select, switch, color.">
      <PropertyPanel header={<InspectorHeader icon={<Settings2 className="size-4" />} name="Campaign template" type="Template" />}>
        <PropertySection title="Fields" collapsible={false}>
          <PropertyGroup columns={1}>
            <PropertyEditor field={{ id: "title", type: "text", label: "Title", value: title, onChange: setTitle }} />
            <PropertyEditor field={{ id: "quantity", type: "number", label: "Quantity", value: quantity, onChange: setQuantity, min: 0 }} />
            <PropertyEditor
              field={{
                id: "category",
                type: "select",
                label: "Category",
                value: category,
                onChange: setCategory,
                options: [
                  { value: "apparel", label: "Apparel" },
                  { value: "accessories", label: "Accessories" },
                ],
              }}
            />
            <PropertyEditor field={{ id: "featured", type: "switch", label: "Featured", value: featured, onChange: setFeatured }} />
            <PropertyEditor field={{ id: "color", type: "color", label: "Tag color", value: color, onChange: setColor }} />
          </PropertyGroup>
        </PropertySection>
      </PropertyPanel>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each with real state and real interaction — not a static screenshot. */
export function PropertyPanelGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <BasicPropertiesDemo />
      <GroupedPropertiesDemo />
      <AppearanceDemo />
      <PublishingDemo />
      <CommerceDemo />
      <AdvancedSettingsDemo />
      <ReadOnlyDemo />
      <MixedEditorsDemo />
    </div>
  );
}
