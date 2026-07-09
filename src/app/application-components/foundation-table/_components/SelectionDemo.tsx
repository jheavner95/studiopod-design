"use client";

import { useState } from "react";
import { Archive } from "lucide-react";
import { Button, Body, Caption } from "@/components/ui";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead, TableSelectionCell, TableToolbar } from "@/components/table";

interface Item {
  id: string;
  name: string;
  type: string;
}

const ITEMS: Item[] = [
  { id: "1", name: "Homepage Banner", type: "Artwork Project" },
  { id: "2", name: "Q4 Campaign", type: "Style" },
  { id: "3", name: "Spring Catalog", type: "Ratio Set" },
  { id: "4", name: "Product Photography", type: "Asset" },
  { id: "5", name: "Summer Lookbook", type: "Artwork Project" },
  { id: "6", name: "Email Header", type: "Asset" },
];

/**
 * A genuinely interactive selectable table — single click toggles one
 * row, shift-click selects the range since the last-clicked row, the
 * header checkbox selects/clears all with a real indeterminate state,
 * and the Toolbar switches to a bulk-action bar the moment anything is
 * selected. Every row checkbox is a native input, so Space-to-toggle
 * keyboard selection works without any extra wiring.
 */
export function SelectionDemo() {
  const [selected, setSelected] = useState<string[]>([]);
  const [lastIndex, setLastIndex] = useState<number | null>(null);

  const allSelected = selected.length === ITEMS.length;
  const someSelected = selected.length > 0 && !allSelected;

  function toggleRow(index: number, shiftKey: boolean) {
    const id = ITEMS[index].id;
    if (shiftKey && lastIndex !== null) {
      const [start, end] = [lastIndex, index].sort((a, b) => a - b);
      const rangeIds = ITEMS.slice(start, end + 1).map((item) => item.id);
      setSelected((prev) => Array.from(new Set([...prev, ...rangeIds])));
    } else {
      setSelected((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
    }
    setLastIndex(index);
  }

  return (
    <div className="flex flex-col gap-3">
      {selected.length > 0 ? (
        <TableToolbar bulk>
          <Body size="sm">{selected.length} selected</Body>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">
              <Archive className="size-3.5" aria-hidden />
              Archive
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setSelected([])}>
              Clear
            </Button>
          </div>
        </TableToolbar>
      ) : (
        <TableToolbar>
          <Body size="sm" muted>
            {ITEMS.length} items
          </Body>
          <Caption className="text-ink-tertiary">Shift-click a row to select a range</Caption>
        </TableToolbar>
      )}

      <Table caption="Selectable demo items">
        <TableHeader>
          <TableRow>
            <TableSelectionCell
              as="th"
              checked={allSelected}
              indeterminate={someSelected}
              label="Select all rows"
              onChange={(checked) => setSelected(checked ? ITEMS.map((item) => item.id) : [])}
            />
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ITEMS.map((item, index) => (
            <TableRow key={item.id} selected={selected.includes(item.id)} interactive onClick={(event) => toggleRow(index, event.shiftKey)}>
              <TableSelectionCell checked={selected.includes(item.id)} label={`Select ${item.name}`} onChange={() => toggleRow(index, false)} />
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
