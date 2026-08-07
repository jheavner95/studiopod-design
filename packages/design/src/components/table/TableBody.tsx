import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export function TableBody({ children, className }: TableBodyProps) {
  return <tbody className={cn(className)}>{children}</tbody>;
}
