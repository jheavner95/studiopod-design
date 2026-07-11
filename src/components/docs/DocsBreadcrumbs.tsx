import { Breadcrumbs } from "@/components/navigation";
import { getBreadcrumbTrail, type NavEntry } from "@/lib/design-system-navigation";

interface DocsBreadcrumbsProps {
  entry: NavEntry;
  className?: string;
}

/** Design System > Section > Group > Current page — derived entirely from the registry, never hand-written per page. */
export function DocsBreadcrumbs({ entry, className }: DocsBreadcrumbsProps) {
  return <Breadcrumbs items={getBreadcrumbTrail(entry)} className={className} />;
}
