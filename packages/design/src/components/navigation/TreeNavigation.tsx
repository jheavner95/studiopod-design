"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TreeNode {
  id: string;
  label: string;
  icon?: ReactNode;
  children?: TreeNode[];
}

interface TreeNavigationProps {
  nodes: TreeNode[];
  activeId?: string;
  onSelect?: (id: string) => void;
  defaultExpandedIds?: string[];
  "aria-label"?: string;
  className?: string;
}

/**
 * Rows that can contain nested child rows, expandable in place — the ARIA tree pattern
 * (role="tree"/"treeitem"/"group"): Down/Up move between visible items, Right expands
 * a collapsed item or moves into its first child, Left collapses an expanded item or
 * moves to its parent, Enter/Space selects.
 */
export function TreeNavigation({ nodes, activeId, onSelect, defaultExpandedIds = [], "aria-label": ariaLabel = "Tree", className }: TreeNavigationProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(defaultExpandedIds));
  // Single-tab-stop roving tabindex per the ARIA tree pattern: only the "current" item
  // (the one the user last moved to, or the active selection) is a real Tab stop —
  // every other treeitem gets tabIndex=-1 and is reached by arrow keys, not Tab.
  const [focusedId, setFocusedId] = useState<string | undefined>(activeId ?? nodes[0]?.id);
  // Adjust state during render (per React docs) instead of an effect, so an
  // activeId change is reflected in the same commit rather than a follow-up render.
  const [prevActiveId, setPrevActiveId] = useState(activeId);
  if (activeId !== prevActiveId) {
    setPrevActiveId(activeId);
    if (activeId) setFocusedId(activeId);
  }

  function toggle(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function focusElement(element: HTMLElement | null | undefined) {
    if (!element) return;
    element.focus();
    const id = element.dataset.nodeId;
    if (id) setFocusedId(id);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>, node: TreeNode) {
    const hasChildren = !!node.children?.length;
    const expanded = expandedIds.has(node.id);
    const treeItem = event.currentTarget;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (hasChildren && !expanded) {
        toggle(node.id);
      } else if (hasChildren && expanded) {
        const li = treeItem.parentElement;
        const firstChild = li?.querySelector<HTMLElement>(':scope > ul[role="group"] > li > [role="treeitem"]');
        focusElement(firstChild);
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (hasChildren && expanded) {
        toggle(node.id);
      } else {
        const parentGroup = treeItem.closest('ul[role="group"]');
        const parentItem = parentGroup?.parentElement?.querySelector<HTMLElement>(':scope > [role="treeitem"]');
        focusElement(parentItem);
      }
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const tree = treeItem.closest('[role="tree"]');
      if (!tree) return;
      const allItems = Array.from(tree.querySelectorAll<HTMLElement>('[role="treeitem"]'));
      const currentIndex = allItems.indexOf(treeItem);
      const nextIndex = event.key === "ArrowDown" ? Math.min(currentIndex + 1, allItems.length - 1) : Math.max(currentIndex - 1, 0);
      focusElement(allItems[nextIndex]);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect?.(node.id);
      setFocusedId(node.id);
      if (hasChildren) toggle(node.id);
    }
  }

  function renderNode(node: TreeNode, level: number) {
    const hasChildren = !!node.children?.length;
    const expanded = expandedIds.has(node.id);
    const active = node.id === activeId;

    return (
      <li key={node.id} role="none">
        <div
          role="treeitem"
          aria-expanded={hasChildren ? expanded : undefined}
          aria-selected={active}
          tabIndex={node.id === focusedId ? 0 : -1}
          data-node-id={node.id}
          onClick={() => {
            onSelect?.(node.id);
            setFocusedId(node.id);
            if (hasChildren) toggle(node.id);
          }}
          onKeyDown={(event) => handleKeyDown(event, node)}
          style={{ paddingLeft: `${8 + level * 16}px` }}
          className={cn(
            "focus-ring flex cursor-pointer items-center gap-1.5 rounded-md py-1.5 pr-2 text-body-sm transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
            active ? "bg-accent-soft/30 text-accent-300" : "text-ink-tertiary hover:bg-surface-hover hover:text-ink-primary",
          )}
        >
          {hasChildren ? (
            <ChevronRight className={cn("size-3.5 shrink-0 transition-transform duration-[var(--duration-fast)]", expanded && "rotate-90")} aria-hidden />
          ) : (
            <span className="size-3.5 shrink-0" aria-hidden />
          )}
          {node.icon ? (
            <span className="shrink-0" aria-hidden>
              {node.icon}
            </span>
          ) : null}
          <span className="min-w-0 flex-1 truncate">{node.label}</span>
        </div>
        {hasChildren && expanded ? (
          <ul role="group" className="flex flex-col">
            {node.children!.map((child) => renderNode(child, level + 1))}
          </ul>
        ) : null}
      </li>
    );
  }

  return (
    <ul role="tree" aria-label={ariaLabel} className={cn("flex flex-col gap-0.5", className)}>
      {nodes.map((node) => renderNode(node, 0))}
    </ul>
  );
}
