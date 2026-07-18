"use client";

import { useState } from "react";
import { Filter, Search as SearchIcon, Trash2, Pencil } from "lucide-react";
import { Card, Body, Caption } from "@/components/ui";
import {
  TextInput,
  Select,
  Checkbox,
  ToggleSwitch,
  SearchInput,
  Combobox,
  IconButton,
} from "@/components/ui";
import { InputField, SelectField } from "@/components/form";

/**
 * DS-5M — the control/field two-tier split (DS-5L) shown in the five contexts
 * the application actually uses.
 *
 * Bare (no label/helperText) = the control only, intrinsically sized, at
 * `size="sm"` for operational density. Stacked (label/helperText) = the
 * traditional form field, unchanged.
 */

const STATUS = [
  { value: "all", label: "All statuses" },
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
];

const OWNERS = [
  { value: "priya", label: "Priya N." },
  { value: "sam", label: "Sam O." },
  { value: "lee", label: "Lee K." },
];

function Demo({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">{title}</span>
      <Body size="sm" muted>
        {description}
      </Body>
      {children}
    </Card>
  );
}

export function ControlTierDemo() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [owner, setOwner] = useState("");
  const [live, setLive] = useState(true);
  const [rows, setRows] = useState<Record<string, boolean>>({ a: false, b: true });

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* 1 — Toolbar */}
      <Demo title="Toolbar" description="Bare controls at sm sit inline with Buttons — sm is h-8, the same height Button's sm renders.">
        <div className="flex items-center gap-2">
          <SearchInput aria-label="Search templates" size="sm" value={query} onChange={setQuery} placeholder="Search…" />
          <ToggleSwitch aria-label="Live updates" size="sm" checked={live} onChange={setLive} />
          <Caption className="text-ink-tertiary">Live</Caption>
          <span className="flex-1" />
          <IconButton aria-label="Edit" size="sm" icon={<Pencil />} />
          <IconButton aria-label="Delete" size="sm" variant="destructive" icon={<Trash2 />} />
        </div>
      </Demo>

      {/* 2 — Filter bar */}
      <Demo title="Filter bar" description="Selects and comboboxes render bare and intrinsically sized — no stacked wrapper, no forced full width.">
        <div className="flex flex-wrap items-center gap-2">
          <Select aria-label="Filter by status" size="sm" options={STATUS} value={status} onChange={(e) => setStatus(e.target.value)} leadingIcon={<Filter />} />
          <Combobox aria-label="Filter by owner" size="sm" options={OWNERS} value={owner} onChange={setOwner} placeholder="Owner" leadingIcon={<SearchIcon />} />
        </div>
      </Demo>

      {/* 3 — Table */}
      <Demo title="Table" description="A bare Checkbox is just the box — the shape a row-select or select-all cell needs.">
        <table className="w-full text-body-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left">
              <th className="w-8 py-2">
                <Checkbox aria-label="Select all rows" size="sm" />
              </th>
              <th className="py-2 font-medium text-ink-secondary">Template</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: "a", name: "Poster proof #118" },
              { id: "b", name: "Trailhead mug wrap" },
            ].map((row) => (
              <tr key={row.id} className="border-b border-border-subtle/50">
                <td className="py-2">
                  <Checkbox
                    aria-label={`Select ${row.name}`}
                    size="sm"
                    checked={rows[row.id]}
                    onChange={(e) => setRows((p) => ({ ...p, [row.id]: e.target.checked }))}
                  />
                </td>
                <td className="py-2 text-ink-secondary">{row.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Demo>

      {/* 4 — Inspector */}
      <Demo title="Inspector" description="Dense property rows: a bare control beside its own label text, laid out by the consumer.">
        <div className="flex flex-col gap-2">
          {[
            { label: "Width", value: "1024" },
            { label: "Height", value: "768" },
          ].map((prop) => (
            <div key={prop.label} className="flex items-center justify-between gap-3">
              <Caption className="text-ink-tertiary">{prop.label}</Caption>
              <TextInput aria-label={prop.label} size="sm" defaultValue={prop.value} className="w-24" />
            </div>
          ))}
        </div>
      </Demo>

      {/* 5 — Traditional form */}
      <Demo title="Traditional form" description="Pass a label (or use a *Field wrapper) and you get the stacked field tier — unchanged by DS-5M.">
        <div className="flex flex-col gap-4">
          <InputField label="Template name" required placeholder="e.g. Homepage Banner" helperText="Shown across the workspace." />
          <SelectField label="Status" options={STATUS} error="Pick a status before publishing." />
        </div>
      </Demo>
    </div>
  );
}
