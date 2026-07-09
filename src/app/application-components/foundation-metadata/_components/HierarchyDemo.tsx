import { Image as ImageIcon } from "lucide-react";
import { Badge, Caption } from "@/components/ui";
import { Stack, Panel, Separator } from "@/components/layout";
import { IdentityBlock, PropertyGroup, MetadataField, RelationshipList, StatusSummary, HealthSummary, StatGroup, TagCollection } from "@/components/metadata";
import { INFORMATION_HIERARCHY } from "../_data/hierarchy";

const TIER_TONE = { primary: "accent", secondary: "neutral", operational: "warning", supporting: "neutral" } as const;

function TierLabel({ tierId }: { tierId: string }) {
  const tier = INFORMATION_HIERARCHY.find((t) => t.id === tierId);
  if (!tier) return null;
  return (
    <Caption className="text-ink-tertiary">
      <Badge tone={TIER_TONE[tierId as keyof typeof TIER_TONE]} size="sm" className="mr-2">
        {tier.name}
      </Badge>
    </Caption>
  );
}

/** All four tiers, composed in one real layout — the same components as the Component Gallery above, but shown together in the order and relative weight Information Hierarchy prescribes. */
export function HierarchyDemo() {
  return (
    <Panel header={<span className="text-body-sm font-medium text-ink-primary">Homepage Banner</span>} className="max-w-lg">
      <Stack gap="lg">
        <Stack gap="xs">
          <TierLabel tierId="primary" />
          <IdentityBlock icon={<ImageIcon className="size-4" aria-hidden />} name="Homepage Banner" type="Artwork Project" />
        </Stack>

        <Separator />

        <Stack gap="xs">
          <TierLabel tierId="secondary" />
          <PropertyGroup>
            <MetadataField label="Format" value="PNG" />
            <MetadataField label="Size" value="2.4 MB" />
          </PropertyGroup>
          <RelationshipList items={[{ label: "Spring Catalog", href: "#", meta: "Style" }]} />
        </Stack>

        <Separator />

        <Stack gap="xs">
          <TierLabel tierId="operational" />
          <StatusSummary items={[{ label: "Published", tone: "success" }]} />
          <HealthSummary metrics={[{ label: "Sync", state: "healthy" }]} />
        </Stack>

        <Separator />

        <Stack gap="xs">
          <TierLabel tierId="supporting" />
          <StatGroup columns={2} items={[{ value: "12", label: "Views today" }]} />
          <TagCollection tags={["Marketing", "Q4"]} />
        </Stack>
      </Stack>
    </Panel>
  );
}
