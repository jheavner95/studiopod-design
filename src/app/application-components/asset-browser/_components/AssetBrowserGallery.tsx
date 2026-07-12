"use client";

import { useState } from "react";
import { Image as ImageIcon, Palette, FileText, Music, Video } from "lucide-react";
import { Card, Body, Badge, Button } from "@/components/ui";
import {
  AssetBrowser,
  type AssetGridRenderer,
  type AssetViewMode,
  useAssetSelection,
  InspectorPanel,
  InspectorHeader,
  InspectorSection,
  InspectorGroup,
  InspectorProperty,
} from "@/components/operational";

interface Asset {
  id: string;
  name: string;
  type: "Image" | "Video" | "Audio" | "Document" | "Style";
  status: "Published" | "Draft" | "Archived" | "Processing";
  size: string;
  updatedAt: string;
  thumbnail?: string;
}

const STATUS_TONE: Record<Asset["status"], "success" | "neutral" | "warning" | "accent"> = {
  Published: "success",
  Draft: "neutral",
  Archived: "neutral",
  Processing: "accent",
};

const TYPE_ICON: Record<Asset["type"], typeof ImageIcon> = {
  Image: ImageIcon,
  Video: Video,
  Audio: Music,
  Document: FileText,
  Style: Palette,
};

/** The three canonical products, cycled for procedural name generation below. */
const PRODUCT_NAMES = ["Trailhead mug wrap", "Studio Tee — Black / M", "Sunset ridge tee — front print"];

/** Per-category StudioPOD-flavored naming patterns, keyed by the makeAssets() seed prefix. */
const NAME_GENERATORS: Record<string, (index: number) => string> = {
  "hero-banner": (index) => `Launch campaign — hero banner #${4000 + index}`,
  artwork: (index) => `Artwork Project #${2000 + index}`,
  "product-shot": (index) => `${PRODUCT_NAMES[index % PRODUCT_NAMES.length]} — product shot ${index + 1}`,
  "brand-style": (index) => `Style recipe #${String(index + 1).padStart(2, "0")}`,
  brief: (index) => `Creative Brief #${300 + index}`,
  photo: (index) => `${PRODUCT_NAMES[index % PRODUCT_NAMES.length]} — production photo ${index + 1}`,
  clip: (index) => `Launch campaign — promo clip ${index + 1}`,
  track: (index) => `Holiday collection — audio track ${index + 1}`,
  doc: (index) => `Production Package — spec ${index + 1}`,
  asset: (index) => `Production Artifact #${5000 + index}`,
};

function makeAssets(seedPrefix: string, count: number, type: Asset["type"], withThumbnails: boolean): Asset[] {
  const statuses: Asset["status"][] = ["Published", "Draft", "Archived", "Processing"];
  const nameFor = NAME_GENERATORS[seedPrefix] ?? ((index: number) => `${seedPrefix} ${index + 1}`);
  return Array.from({ length: count }, (_, index) => ({
    id: `${seedPrefix}-${index}`,
    name: nameFor(index),
    type,
    status: statuses[index % statuses.length],
    size: `${(index % 20) + 1} MB`,
    updatedAt: `${(index % 14) + 1}d ago`,
    thumbnail: withThumbnails ? `https://picsum.photos/seed/${seedPrefix}-${index}/300/300` : undefined,
  }));
}

const IMAGE_ASSETS = makeAssets("hero-banner", 10, "Image", true);
const ARTWORK_ASSETS = makeAssets("artwork", 9, "Image", true);
const PRODUCT_ASSETS = makeAssets("product-shot", 8, "Image", true);
const STYLE_ASSETS = makeAssets("brand-style", 6, "Style", false);
const DOCUMENT_ASSETS = makeAssets("brief", 7, "Document", false);
const MIXED_ASSETS: Asset[] = [
  ...makeAssets("photo", 3, "Image", true),
  ...makeAssets("clip", 2, "Video", false),
  ...makeAssets("track", 2, "Audio", false),
  ...makeAssets("doc", 2, "Document", false),
];
const LARGE_ASSETS = makeAssets("asset", 40, "Image", true);

function renderer(withThumbnail: boolean): AssetGridRenderer<Asset> {
  return {
    getId: (row) => row.id,
    getName: (row) => row.name,
    getSecondary: (row) => [row.type, row.size, row.updatedAt],
    getThumbnailSrc: withThumbnail ? (row) => row.thumbnail : undefined,
    getThumbnailFallbackIcon: (row) => {
      const Icon = TYPE_ICON[row.type];
      return <Icon className="size-5" />;
    },
    getStatus: (row) => (
      <Badge tone={STATUS_TONE[row.status]} size="sm">
        {row.status}
      </Badge>
    ),
  };
}

function GalleryCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">{title}</span>
      <Body size="sm" muted>
        {description}
      </Body>
      <div className="h-[28rem] overflow-y-auto rounded-lg border border-border-subtle p-4">{children}</div>
    </Card>
  );
}

function ImageLibraryDemo() {
  const [viewMode, setViewMode] = useState<AssetViewMode>("grid");
  const [search, setSearch] = useState("");
  const rows = IMAGE_ASSETS.filter((row) => row.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <GalleryCard title="Image Library" description="Grid view with search — try filtering by name.">
      <AssetBrowser
        caption="Image library"
        rows={rows}
        render={renderer(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search images"
        emptyVariant="no-results"
      />
    </GalleryCard>
  );
}

function ArtworkLibraryDemo() {
  const [viewMode, setViewMode] = useState<AssetViewMode>("grid");
  const [status, setStatus] = useState<string | null>(null);
  const rows = ARTWORK_ASSETS.filter((row) => (status ? row.status === status : true));

  return (
    <GalleryCard title="Artwork Library" description="Grid view with an AssetFilters status dimension.">
      <AssetBrowser
        caption="Artwork library"
        rows={rows}
        render={renderer(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        filters={[{ key: "status", label: "Status", options: [...new Set(ARTWORK_ASSETS.map((row) => row.status))].map((value) => ({ value, label: value })) }]}
        activeFilters={{ status }}
        onFilterChange={(_key, value) => setStatus(value)}
        onFilterReset={() => setStatus(null)}
        emptyVariant="no-results"
      />
    </GalleryCard>
  );
}

function ProductLibraryDemo() {
  const [viewMode, setViewMode] = useState<AssetViewMode>("grid");
  const { selectedIds, setSelectedIds, clear } = useAssetSelection();

  return (
    <GalleryCard title="Product Library" description="Grid view with selection — check a card to reveal bulk actions in the toolbar.">
      <AssetBrowser
        caption="Product library"
        rows={PRODUCT_ASSETS}
        render={renderer(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        bulkActions={
          <>
            <Button size="sm" variant="secondary" onClick={clear}>
              Archive
            </Button>
            <Button size="sm" variant="ghost" onClick={clear}>
              Delete
            </Button>
          </>
        }
      />
    </GalleryCard>
  );
}

function StyleLibraryDemo() {
  const [viewMode, setViewMode] = useState<AssetViewMode>("grid");

  return (
    <GalleryCard title="Style Library" description="No thumbnails — every card falls back to a type icon.">
      <AssetBrowser caption="Style library" rows={STYLE_ASSETS} render={renderer(false)} viewMode={viewMode} onViewModeChange={setViewMode} />
    </GalleryCard>
  );
}

function DocumentLibraryDemo() {
  const [viewMode, setViewMode] = useState<AssetViewMode>("list");

  return (
    <GalleryCard title="Document Library" description="List view by default — better suited to comparing fields across rows.">
      <AssetBrowser caption="Document library" rows={DOCUMENT_ASSETS} render={renderer(false)} viewMode={viewMode} onViewModeChange={setViewMode} />
    </GalleryCard>
  );
}

function MixedAssetsDemo() {
  const [viewMode, setViewMode] = useState<AssetViewMode>("grid");

  return (
    <GalleryCard title="Mixed Assets" description="Images, video, audio, and documents together — try the view toggle in the toolbar.">
      <AssetBrowser caption="Mixed assets" rows={MIXED_ASSETS} render={renderer(true)} viewMode={viewMode} onViewModeChange={setViewMode} />
    </GalleryCard>
  );
}

function GridViewDemo() {
  const [viewMode, setViewMode] = useState<AssetViewMode>("grid");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const pageCount = Math.ceil(LARGE_ASSETS.length / pageSize);
  const rows = LARGE_ASSETS.slice((page - 1) * pageSize, page * pageSize);

  return (
    <GalleryCard title="Grid View" description="40 assets, paginated at 8 per page — only one page's worth ever renders at once.">
      <AssetBrowser
        caption="Large library"
        rows={rows}
        render={renderer(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        pagination={{ page, pageCount, pageSize, totalCount: LARGE_ASSETS.length, onPageChange: setPage }}
      />
    </GalleryCard>
  );
}

function ListViewDemo() {
  const [viewMode, setViewMode] = useState<AssetViewMode>("list");
  const { selectedIds, setSelectedIds } = useAssetSelection();
  const selectedId = [...selectedIds][0];
  const selected = IMAGE_ASSETS.find((row) => row.id === selectedId);

  return (
    <GalleryCard title="List View" description="Select a row to see an Inspector Panel appear alongside — a real composition, not a built-in fourth panel.">
      <AssetBrowser
        caption="Image library"
        rows={IMAGE_ASSETS}
        render={renderer(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        inspector={
          selected ? (
            <InspectorPanel header={<InspectorHeader icon={<ImageIcon className="size-4" />} name={selected.name} type={selected.type} status={{ label: selected.status, tone: STATUS_TONE[selected.status] }} />}>
              <InspectorSection title="Details" collapsible={false}>
                <InspectorGroup columns={1}>
                  <InspectorProperty label="Size" value={selected.size} />
                  <InspectorProperty label="Updated" value={selected.updatedAt} />
                </InspectorGroup>
              </InspectorSection>
            </InspectorPanel>
          ) : (
            <Card className="flex h-full items-center justify-center p-6 text-center">
              <Body size="sm" muted>
                Select an asset to inspect it.
              </Body>
            </Card>
          )
        }
      />
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each with real state and real interaction — not a static screenshot. */
export function AssetBrowserGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <ImageLibraryDemo />
      <ArtworkLibraryDemo />
      <ProductLibraryDemo />
      <StyleLibraryDemo />
      <DocumentLibraryDemo />
      <MixedAssetsDemo />
      <GridViewDemo />
      <div className="xl:col-span-2">
        <ListViewDemo />
      </div>
    </div>
  );
}
