"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotion, useMotionEnabled, useOutsideClick, useEscapeKey, useFocusTrap } from "@/hooks";
import { transition } from "@/motion/utils";
import { Portal } from "./Portal";
import { useAnchoredPosition, type AnchorPlacement, type AnchorAlign } from "./useAnchoredPosition";
import type { MenuItemProps } from "./MenuItem";

interface MenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: RefObject<HTMLElement | null>;
  children: ReactNode;
  placement?: AnchorPlacement;
  align?: AnchorAlign;
  className?: string;
}

function textOf(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

/**
 * A list of actions anchored to a trigger, following the ARIA menu pattern: roving
 * highlight moved by Up/Down (wrapping), Home/End jump to the ends, type-ahead jumps
 * to the next item starting with the typed letter, Enter/Space selects, Escape and
 * outside click dismiss. Composed with MenuItem children, matching TableRow/TableCell's
 * JSX-composition style rather than a data-list prop.
 */
export function Menu({ open, onOpenChange, triggerRef, children, placement = "bottom", align = "start", className }: MenuProps) {
  const contentRef = useRef<HTMLUListElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [wasOpen, setWasOpen] = useState(open);
  const typeAheadBuffer = useRef("");
  const typeAheadTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();

  const items = Children.toArray(children).filter((child): child is ReactElement<MenuItemProps> => isValidElement(child));

  const position = useAnchoredPosition(triggerRef, contentRef as unknown as RefObject<HTMLElement | null>, open, {
    placement,
    align,
    offset: 4,
  });

  function close() {
    onOpenChange(false);
  }

  useOutsideClick(contentRef as unknown as RefObject<HTMLElement | null>, close, open);
  useEscapeKey(close, open);
  // Handles initial focus (the roving-tabindex item with tabIndex 0, i.e. index 0 on
  // open — see the reset below), Tab-trapping so focus can't leak out of this portaled
  // list, and focus restoration on close — the same machinery Dialog/Drawer/Popover
  // already share, rather than the hand-rolled previouslyFocusedRef this used to keep
  // separately (which tracked focus but never actually trapped Tab).
  useFocusTrap(contentRef as unknown as RefObject<HTMLElement | null>, open);

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setHighlightedIndex(0);
  }

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;
    container.querySelectorAll<HTMLLIElement>('[role="menuitem"]')[highlightedIndex]?.focus();
  }, [highlightedIndex]);

  function moveTo(index: number) {
    const count = items.length;
    setHighlightedIndex(((index % count) + count) % count);
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLUListElement>) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        moveTo(highlightedIndex + 1);
        return;
      case "ArrowUp":
        event.preventDefault();
        moveTo(highlightedIndex - 1);
        return;
      case "Home":
        event.preventDefault();
        moveTo(0);
        return;
      case "End":
        event.preventDefault();
        moveTo(items.length - 1);
        return;
      case "Enter":
      case " ": {
        event.preventDefault();
        const current = items[highlightedIndex];
        if (current && !current.props.disabled) {
          current.props.onSelect?.();
          close();
        }
        return;
      }
      default:
        break;
    }

    if (event.key.length === 1) {
      typeAheadBuffer.current += event.key.toLowerCase();
      clearTimeout(typeAheadTimeout.current);
      typeAheadTimeout.current = setTimeout(() => {
        typeAheadBuffer.current = "";
      }, 500);
      const matchIndex = items.findIndex((item) => textOf(item.props.children).toLowerCase().startsWith(typeAheadBuffer.current));
      if (matchIndex >= 0) setHighlightedIndex(matchIndex);
    }
  }

  return (
    <Portal>
      <AnimatePresence>
        {open ? (
          <motion.ul
            ref={contentRef}
            role="menu"
            onKeyDown={handleKeyDown}
            style={{ position: "fixed", top: position.top, left: position.left, zIndex: "var(--z-dropdown)" }}
            initial={motionEnabled ? { opacity: 0, scale: 0.96 } : undefined}
            animate={motionEnabled ? { opacity: 1, scale: 1 } : undefined}
            exit={motionEnabled ? { opacity: 0, scale: 0.96 } : undefined}
            transition={motionEnabled ? transition({ duration: "fast", ease: "standard", speed }) : undefined}
            className={cn(
              "flex min-w-44 flex-col gap-0.5 rounded-lg border border-border-subtle bg-surface p-1.5 shadow-[var(--shadow-lg)]",
              className,
            )}
          >
            {items.map((item, index) =>
              cloneElement(item, {
                highlighted: index === highlightedIndex,
                tabIndex: index === highlightedIndex ? 0 : -1,
                onMouseEnter: () => setHighlightedIndex(index),
                onSelect: () => {
                  item.props.onSelect?.();
                  close();
                },
              }),
            )}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </Portal>
  );
}
