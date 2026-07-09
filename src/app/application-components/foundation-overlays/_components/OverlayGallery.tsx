"use client";

import { useRef, useState } from "react";
import { Info, MoreVertical, Filter, Pencil, Copy, Trash2, Command } from "lucide-react";
import { CardGrid } from "@/components/layout";
import { Card, Button, Body, Caption } from "@/components/ui";
import {
  Dialog,
  Drawer,
  type DrawerEdge,
  Popover,
  Menu,
  MenuItem,
  Tooltip,
  CommandPalette,
  type CommandPaletteItem,
} from "@/components/overlay";

function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Dialog</span>
      <Body size="sm" muted>
        A focused, modal surface — focus trapped inside, Escape and backdrop click both close it.
      </Body>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)} className="w-fit">
        Open confirmation dialog
      </Button>
      <Dialog open={open} onOpenChange={setOpen} size="sm" labelledBy="demo-dialog-title" describedBy="demo-dialog-body">
        <span id="demo-dialog-title" className="text-body-md font-medium text-ink-primary">
          Delete this asset?
        </span>
        <div id="demo-dialog-body">
          <Body size="sm" muted>
            This can&rsquo;t be undone. The asset will be removed from every platform it&rsquo;s published to.
          </Body>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={() => setOpen(false)}>
            Delete
          </Button>
        </div>
      </Dialog>
    </Card>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  const [edge, setEdge] = useState<DrawerEdge>("right");

  function openWith(nextEdge: DrawerEdge) {
    setEdge(nextEdge);
    setOpen(true);
  }

  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Drawer</span>
      <Body size="sm" muted>
        Slides in from an edge without fully blocking the page — Right edge and Bottom edge variants.
      </Body>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={() => openWith("right")}>
          Open right drawer
        </Button>
        <Button variant="secondary" size="sm" onClick={() => openWith("bottom")}>
          Open bottom drawer
        </Button>
      </div>
      <Drawer open={open} onOpenChange={setOpen} edge={edge} labelledBy="demo-drawer-title">
        <span id="demo-drawer-title" className="text-body-md font-medium text-ink-primary">
          Asset details
        </span>
        <Body size="sm" muted>
          The {edge} edge variant — docked to the {edge} of the viewport, focus trapped while open.
        </Body>
      </Drawer>
    </Card>
  );
}

function PopoverDemo() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);

  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Popover</span>
      <Body size="sm" muted>
        A small, anchored surface — dismissed by Escape or an outside click, focus returns to the trigger.
      </Body>
      <span ref={triggerRef} className="inline-flex w-fit">
        <Button variant="secondary" size="sm" onClick={() => setOpen((value) => !value)} leadingIcon={<Filter className="size-4" />}>
          Filter
        </Button>
      </span>
      <Popover open={open} onOpenChange={setOpen} triggerRef={triggerRef}>
        <div className="flex flex-col gap-2">
          <Caption className="text-ink-tertiary">Status</Caption>
          <Body size="sm">Used, Partial, and Planned filters would live here.</Body>
        </div>
      </Popover>
    </Card>
  );
}

function MenuDemo() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);

  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Menu</span>
      <Body size="sm" muted>
        ARIA menu pattern — arrow keys move the highlight, typing jumps to a match, destructive items are visually separated.
      </Body>
      <span ref={triggerRef} className="inline-flex w-fit">
        <Button variant="secondary" size="sm" onClick={() => setOpen((value) => !value)} leadingIcon={<MoreVertical className="size-4" />}>
          Actions
        </Button>
      </span>
      <Menu open={open} onOpenChange={setOpen} triggerRef={triggerRef}>
        <MenuItem icon={<Pencil className="size-4" />} onSelect={() => {}}>
          Edit
        </MenuItem>
        <MenuItem icon={<Copy className="size-4" />} onSelect={() => {}}>
          Duplicate
        </MenuItem>
        <MenuItem icon={<Trash2 className="size-4" />} destructive onSelect={() => {}}>
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
}

function TooltipDemo() {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Tooltip</span>
      <Body size="sm" muted>
        Revealed on hover or focus — never hover-only, so tabbing to the trigger shows the same label.
      </Body>
      <Tooltip label="Additional information about this field">
        <button type="button" className="focus-ring flex size-8 items-center justify-center rounded-full border border-border text-ink-tertiary hover:text-ink-primary">
          <Info className="size-4" />
        </button>
      </Tooltip>
    </Card>
  );
}

const COMMAND_PALETTE_ITEMS: CommandPaletteItem[] = [
  { id: "new-asset", label: "Create new asset", group: "Actions", onSelect: () => {} },
  { id: "publish", label: "Publish to platform", group: "Actions", onSelect: () => {} },
  { id: "invite", label: "Invite a teammate", group: "Actions", onSelect: () => {} },
  { id: "go-library", label: "Go to Library", group: "Navigation destinations", onSelect: () => {} },
  { id: "go-queue", label: "Go to Publishing Queue", group: "Navigation destinations", onSelect: () => {} },
  { id: "go-settings", label: "Go to Settings", group: "Navigation destinations", onSelect: () => {} },
];

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">Command Palette</span>
      <Body size="sm" muted>
        Searchable and keyboard-first — try the global shortcut, or the button below.
      </Body>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)} className="w-fit" leadingIcon={<Command className="size-4" />}>
        Open (⌘K / Ctrl+K)
      </Button>
      <CommandPalette open={open} onOpenChange={setOpen} items={COMMAND_PALETTE_ITEMS} />
    </Card>
  );
}

/** Every component in this system, each with a real trigger and real open/close state — not a static screenshot. */
export function OverlayGallery() {
  return (
    <CardGrid columns={3}>
      <DialogDemo />
      <DrawerDemo />
      <PopoverDemo />
      <MenuDemo />
      <TooltipDemo />
      <CommandPaletteDemo />
    </CardGrid>
  );
}
