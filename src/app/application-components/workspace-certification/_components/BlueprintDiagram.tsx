"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, Body, Caption, Heading } from "@/components/ui";
import { Activate } from "@/motion";
import { BLUEPRINT_NODES, BLUEPRINT_SUPPORTING_PAGES, type BlueprintNode } from "../_data/blueprint";

function Connector() {
  return (
    <div className="flex justify-center py-1" aria-hidden>
      <ArrowDown className="size-4 text-ink-tertiary" />
    </div>
  );
}

interface NodeCardProps {
  node: BlueprintNode;
  selected: boolean;
  onSelect: () => void;
}

function NodeCard({ node, selected, onSelect }: NodeCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      aria-pressed={selected}
      className="focus-ring block w-full cursor-pointer rounded-lg"
    >
      <Activate state={selected ? "active" : "inactive"} className="rounded-lg">
        <Card
          padding="md"
          className={cn(
            "flex h-full flex-col items-center gap-1 text-center",
            selected && "border-accent-500/60 bg-accent-soft/30",
          )}
        >
          <span className="text-body-md font-medium text-ink-primary">{node.name}</span>
          <Body size="sm" muted className="line-clamp-1">
            {node.purpose}
          </Body>
        </Card>
      </Activate>
    </div>
  );
}

/** The full six-tier canonical blueprint, tier 4 rendered as a three-up peer row — click any node to see its full detail below, or open its documentation directly. */
export function BlueprintDiagram() {
  const [selectedId, setSelectedId] = useState(BLUEPRINT_NODES[0].id);
  const selected = BLUEPRINT_NODES.find((node) => node.id === selectedId) ?? BLUEPRINT_NODES[0];

  const globalNav = BLUEPRINT_NODES.find((n) => n.id === "global-navigation")!;
  const header = BLUEPRINT_NODES.find((n) => n.id === "workspace-header")!;
  const toolbar = BLUEPRINT_NODES.find((n) => n.id === "workspace-toolbar")!;
  const row = BLUEPRINT_NODES.filter((n) => n.tier === 4);
  const status = BLUEPRINT_NODES.find((n) => n.id === "status-workspace")!;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1 rounded-xl border border-border-subtle bg-surface/40 p-6 sm:p-10">
        <NodeCard node={globalNav} selected={selectedId === globalNav.id} onSelect={() => setSelectedId(globalNav.id)} />
        <Connector />
        <NodeCard node={header} selected={selectedId === header.id} onSelect={() => setSelectedId(header.id)} />
        <Connector />
        <NodeCard node={toolbar} selected={selectedId === toolbar.id} onSelect={() => setSelectedId(toolbar.id)} />
        <Connector />
        <div className="grid grid-cols-1 gap-3 rounded-lg border border-dashed border-border-subtle p-3 sm:grid-cols-3">
          {row.map((node) => (
            <NodeCard key={node.id} node={node} selected={selectedId === node.id} onSelect={() => setSelectedId(node.id)} />
          ))}
        </div>
        <Connector />
        <NodeCard node={status} selected={selectedId === status.id} onSelect={() => setSelectedId(status.id)} />
      </div>

      <Card padding="lg" className="flex flex-col gap-4">
        <Heading level={3}>{selected.name}</Heading>
        <Body muted>{selected.purpose}</Body>
        <div className="flex flex-col gap-1.5 border-t border-border-subtle pt-4">
          <Caption className="text-ink-tertiary">Relationship</Caption>
          <Body size="sm" muted>
            {selected.relationship}
          </Body>
        </div>
        {selected.href ? (
          <Link
            href={selected.href}
            className="focus-ring flex w-fit items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
          >
            Open documentation
            <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        ) : null}
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <Caption className="text-ink-tertiary">Governs every tier above:</Caption>
        {BLUEPRINT_SUPPORTING_PAGES.map((support) => (
          <Link
            key={support.id}
            href={support.href}
            title={support.role}
            className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
          >
            {support.name}
            <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        ))}
      </div>
    </div>
  );
}
