import type { ReactNode } from "react";
import { Activate } from "@/motion";

interface SelectionRingProps {
  selected?: boolean;
  children: ReactNode;
  className?: string;
}

/** A persistent emphasis ring around a selected node — built directly on Activate, no separate ring logic. */
export function SelectionRing({ selected = false, children, className }: SelectionRingProps) {
  return (
    <Activate state={selected ? "active" : "inactive"} duration="fast" className={className}>
      {children}
    </Activate>
  );
}
