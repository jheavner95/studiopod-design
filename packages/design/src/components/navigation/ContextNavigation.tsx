import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { NavigationItem } from "./NavigationItem";

export interface ContextNavigationLink {
  id: string;
  label: string;
  href: string;
}

interface ContextNavigationProps {
  /** What object or scope this strip is currently about — an asset name, a platform, a record. */
  label: ReactNode;
  icon?: ReactNode;
  links?: ContextNavigationLink[];
  className?: string;
}

/**
 * A contextual "where am I, and what's related" strip — the current object plus its related
 * destinations. Distinct from Breadcrumbs, which is path-based (A > B > C): this is
 * object-based, matching the Context region already documented on Workspace Header
 * ("surfacing relationships and related links for the current object").
 */
export function ContextNavigation({ label, icon, links = [], className }: ContextNavigationProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4 border-b border-border-subtle pb-3", className)}>
      <div className="flex min-w-0 items-center gap-2 text-body-sm font-medium text-ink-primary">
        {icon ? (
          <span className="shrink-0" aria-hidden>
            {icon}
          </span>
        ) : null}
        <span className="truncate">{label}</span>
      </div>
      {links.length > 0 ? (
        <nav aria-label="Related" className="flex flex-wrap items-center gap-3">
          {links.map((link) => (
            <NavigationItem key={link.id} href={link.href} className="w-auto gap-1 rounded-md bg-transparent px-0 py-0 text-caption hover:bg-transparent">
              {link.label}
            </NavigationItem>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
