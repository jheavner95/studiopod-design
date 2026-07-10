"use client";

import { useMemo, useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { Card, Body, Badge } from "@/components/ui";
import {
  SearchField,
  SearchScope,
  SearchSuggestions,
  SearchHistory,
  FilterBar,
  FilterGroup,
  FilterSummary,
  SavedFilter,
  SortControl,
  ResultSummary,
  ActiveFilterList,
  ClearFilters,
  InspectorPanel,
  InspectorHeader,
  InspectorSection,
  InspectorGroup,
  InspectorProperty,
  type SavedFilterEntry,
} from "@/components/operational";
import type { SortDirection } from "@/components/table";

interface Item {
  id: string;
  name: string;
  type: "Image" | "Document" | "Video";
  status: "Draft" | "Published" | "Archived";
  updatedAt: string;
}

const ITEMS: Item[] = [
  { id: "1", name: "Hero banner", type: "Image", status: "Published", updatedAt: "1d ago" },
  { id: "2", name: "Product shot A", type: "Image", status: "Draft", updatedAt: "2d ago" },
  { id: "3", name: "Brand guidelines", type: "Document", status: "Published", updatedAt: "3d ago" },
  { id: "4", name: "Launch teaser", type: "Video", status: "Archived", updatedAt: "4d ago" },
  { id: "5", name: "Social carousel", type: "Image", status: "Draft", updatedAt: "5d ago" },
  { id: "6", name: "Onboarding script", type: "Document", status: "Published", updatedAt: "6d ago" },
  { id: "7", name: "Style reference", type: "Image", status: "Archived", updatedAt: "1w ago" },
  { id: "8", name: "Demo walkthrough", type: "Video", status: "Published", updatedAt: "2w ago" },
];

function GalleryCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">{title}</span>
      <Body size="sm" muted>
        {description}
      </Body>
      <div className="rounded-lg border border-border-subtle p-4">{children}</div>
    </Card>
  );
}

function SimpleSearchDemo() {
  const [query, setQuery] = useState("");
  const rows = ITEMS.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <GalleryCard title="Simple Search" description="A SearchField alone, paired with a ResultSummary that tracks the filtered count.">
      <div className="flex flex-col gap-3">
        <SearchField value={query} onChange={setQuery} placeholder="Search items" />
        <ResultSummary totalCount={rows.length} itemLabel="items" />
      </div>
    </GalleryCard>
  );
}

function GlobalSearchDemo() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<"all" | "name" | "type">("all");
  const [open, setOpen] = useState(false);
  const suggestions = useMemo(
    () =>
      query
        ? ITEMS.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).map((item) => ({ id: item.id, label: item.name, description: item.type }))
        : [],
    [query],
  );

  return (
    <GalleryCard title="Global Search" description="Search with a scope selector and a live suggestions dropdown — type to see completions.">
      <div className="flex flex-col gap-3">
        <SearchScope
          value={scope}
          onChange={setScope}
          options={[
            { value: "all", label: "Everywhere" },
            { value: "name", label: "Name" },
            { value: "type", label: "Type" },
          ]}
        />
        <div className="relative">
          <SearchField
            value={query}
            onChange={(value) => {
              setQuery(value);
              setOpen(true);
            }}
            placeholder="Search StudioPOD"
          />
          <SearchSuggestions open={open && query.length > 0} suggestions={suggestions} onSelect={(s) => { setQuery(s.label as string); setOpen(false); }} />
        </div>
      </div>
    </GalleryCard>
  );
}

function LibrarySearchDemo() {
  const [query, setQuery] = useState("");
  const [types, setTypes] = useState<Set<string>>(new Set());
  const rows = ITEMS.filter((item) => (query ? item.name.toLowerCase().includes(query.toLowerCase()) : true)).filter((item) => (types.size ? types.has(item.type) : true));

  return (
    <GalleryCard title="Library Search" description="FilterBar composing search with one FilterGroup dimension — the everyday library-browsing shape.">
      <div className="flex flex-col gap-3">
        <FilterBar
          search={{ value: query, onChange: setQuery, placeholder: "Search library" }}
          hasActiveFilters={types.size > 0 || query.length > 0}
          onClearAll={() => {
            setQuery("");
            setTypes(new Set());
          }}
        >
          <FilterGroup
            label="Type"
            selected={types}
            onChange={setTypes}
            options={[
              { value: "Image", label: "Image" },
              { value: "Document", label: "Document" },
              { value: "Video", label: "Video" },
            ]}
          />
        </FilterBar>
        <ResultSummary totalCount={rows.length} itemLabel="items" />
      </div>
    </GalleryCard>
  );
}

function QueueSearchDemo() {
  const [statuses, setStatuses] = useState<Set<string>>(new Set());
  const [sortValue, setSortValue] = useState<string | null>("updatedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const rows = ITEMS.filter((item) => (statuses.size ? statuses.has(item.status) : true));

  return (
    <GalleryCard title="Queue Search" description="Filters paired with a SortControl — the shape a publishing or commerce queue needs.">
      <div className="flex flex-col gap-3">
        <FilterBar>
          <FilterGroup
            label="Status"
            selected={statuses}
            onChange={setStatuses}
            options={[
              { value: "Draft", label: "Draft" },
              { value: "Published", label: "Published" },
              { value: "Archived", label: "Archived" },
            ]}
          />
          <SortControl
            options={[
              { value: "name", label: "Name" },
              { value: "updatedAt", label: "Last updated" },
            ]}
            value={sortValue}
            direction={sortDirection}
            onChange={(value, direction) => {
              setSortValue(value);
              setSortDirection(direction);
            }}
          />
        </FilterBar>
        <ResultSummary totalCount={rows.length} itemLabel="items queued" />
      </div>
    </GalleryCard>
  );
}

function InspectorSearchDemo() {
  const [query, setQuery] = useState("");
  const properties = [
    { label: "Name", value: "Hero banner" },
    { label: "Type", value: "Image" },
    { label: "Status", value: "Published" },
    { label: "Size", value: "2 MB" },
    { label: "Updated", value: "1d ago" },
  ].filter((property) => property.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <GalleryCard title="Inspector Search" description="A compact SearchField narrowing an Inspector Panel's own property list.">
      <InspectorPanel header={<InspectorHeader icon={<ImageIcon className="size-4" />} name="Hero banner" type="Image" status={{ label: "Published", tone: "success" }} />}>
        <div className="p-3">
          <SearchField value={query} onChange={setQuery} placeholder="Search properties" />
        </div>
        <InspectorSection title="Details" collapsible={false}>
          <InspectorGroup columns={1}>
            {properties.map((property) => (
              <InspectorProperty key={property.label} label={property.label} value={property.value} />
            ))}
          </InspectorGroup>
        </InspectorSection>
      </InspectorPanel>
    </GalleryCard>
  );
}

function AdvancedFilteringDemo() {
  const [types, setTypes] = useState<Set<string>>(new Set(["Image"]));
  const [statuses, setStatuses] = useState<Set<string>>(new Set());
  const activeCount = (types.size > 0 ? 1 : 0) + (statuses.size > 0 ? 1 : 0);
  const rows = ITEMS.filter((item) => (types.size ? types.has(item.type) : true)).filter((item) => (statuses.size ? statuses.has(item.status) : true));

  const entries = [
    ...[...types].map((value) => ({ id: `type-${value}`, label: `Type: ${value}`, onRemove: () => setTypes((prev) => { const next = new Set(prev); next.delete(value); return next; }) })),
    ...[...statuses].map((value) => ({ id: `status-${value}`, label: `Status: ${value}`, onRemove: () => setStatuses((prev) => { const next = new Set(prev); next.delete(value); return next; }) })),
  ];

  return (
    <GalleryCard title="Advanced Filtering" description="Two independent FilterGroup dimensions plus FilterSummary and a removable ActiveFilterList.">
      <div className="flex flex-col gap-3">
        <FilterBar
          hasActiveFilters={activeCount > 0}
          onClearAll={() => {
            setTypes(new Set());
            setStatuses(new Set());
          }}
        >
          <FilterGroup label="Type" selected={types} onChange={setTypes} options={[{ value: "Image", label: "Image" }, { value: "Document", label: "Document" }, { value: "Video", label: "Video" }]} />
          <FilterGroup label="Status" selected={statuses} onChange={setStatuses} options={[{ value: "Draft", label: "Draft" }, { value: "Published", label: "Published" }, { value: "Archived", label: "Archived" }]} />
        </FilterBar>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <FilterSummary count={activeCount} />
          <ResultSummary totalCount={rows.length} itemLabel="items" />
        </div>
        <ActiveFilterList entries={entries} />
      </div>
    </GalleryCard>
  );
}

function SavedFiltersDemo() {
  const [entries, setEntries] = useState<SavedFilterEntry[]>([
    { id: "1", name: "My drafts" },
    { id: "2", name: "Published this week" },
  ]);
  const [activeId, setActiveId] = useState<string | null>("1");

  return (
    <GalleryCard title="Saved Filters" description="Named filter combinations — apply one, or save the current state as a new entry.">
      <SavedFilter
        entries={entries}
        activeId={activeId}
        onApply={(entry) => setActiveId(entry.id)}
        onDelete={(entry) => {
          setEntries((prev) => prev.filter((e) => e.id !== entry.id));
          if (activeId === entry.id) setActiveId(null);
        }}
        onSave={() => {
          const id = `${entries.length + 1}`;
          setEntries((prev) => [...prev, { id, name: `Saved view ${id}` }]);
          setActiveId(id);
        }}
      />
    </GalleryCard>
  );
}

function CombinedSearchFilterDemo() {
  const [query, setQuery] = useState("");
  const [statuses, setStatuses] = useState<Set<string>>(new Set());
  const [sortValue, setSortValue] = useState<string | null>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [historyEntries, setHistoryEntries] = useState([
    { id: "1", query: "hero" },
    { id: "2", query: "brand" },
  ]);
  const [historyOpen, setHistoryOpen] = useState(false);

  const rows = ITEMS.filter((item) => (query ? item.name.toLowerCase().includes(query.toLowerCase()) : true))
    .filter((item) => (statuses.size ? statuses.has(item.status) : true))
    .sort((a, b) => {
      const dir = sortDirection === "desc" ? -1 : 1;
      if (sortValue === "updatedAt") return a.updatedAt.localeCompare(b.updatedAt) * dir;
      return a.name.localeCompare(b.name) * dir;
    });

  const entries = [...statuses].map((value) => ({
    id: `status-${value}`,
    label: `Status: ${value}`,
    onRemove: () => setStatuses((prev) => { const next = new Set(prev); next.delete(value); return next; }),
  }));

  return (
    <GalleryCard title="Combined Search + Filter" description="Every region working together — search with history, a filter dimension, sort, active filters, and a result count.">
      <div className="flex flex-col gap-3">
        <div className="relative">
          <FilterBar
            search={{ value: query, onChange: (value) => { setQuery(value); setHistoryOpen(value.length === 0); }, placeholder: "Search items" }}
            hasActiveFilters={statuses.size > 0 || query.length > 0}
            onClearAll={() => {
              setQuery("");
              setStatuses(new Set());
            }}
          >
            <FilterGroup label="Status" selected={statuses} onChange={setStatuses} options={[{ value: "Draft", label: "Draft" }, { value: "Published", label: "Published" }, { value: "Archived", label: "Archived" }]} />
            <SortControl
              options={[{ value: "name", label: "Name" }, { value: "updatedAt", label: "Last updated" }]}
              value={sortValue}
              direction={sortDirection}
              onChange={(value, direction) => {
                setSortValue(value);
                setSortDirection(direction);
              }}
            />
          </FilterBar>
          {historyOpen ? (
            <SearchHistory
              entries={historyEntries}
              onSelect={(entry) => {
                setQuery(entry.query);
                setHistoryOpen(false);
              }}
              onRemove={(entry) => setHistoryEntries((prev) => prev.filter((e) => e.id !== entry.id))}
              onClear={() => setHistoryEntries([])}
            />
          ) : null}
        </div>
        <ActiveFilterList entries={entries} />
        <div className="flex items-center justify-between gap-3">
          <ResultSummary totalCount={rows.length} itemLabel="items" />
          {entries.length > 0 ? <ClearFilters onClick={() => setStatuses(new Set())} /> : null}
        </div>
        <div className="flex flex-col gap-1">
          {rows.map((row) => (
            <div key={row.id} className="flex items-center justify-between gap-3 rounded-md border border-border-subtle px-3 py-2">
              <span className="text-body-sm text-ink-primary">{row.name}</span>
              <Badge size="sm" tone="neutral">
                {row.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each with real state and real interaction — not a static screenshot. */
export function FilterSearchGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <SimpleSearchDemo />
      <GlobalSearchDemo />
      <LibrarySearchDemo />
      <QueueSearchDemo />
      <InspectorSearchDemo />
      <AdvancedFilteringDemo />
      <SavedFiltersDemo />
      <CombinedSearchFilterDemo />
    </div>
  );
}
