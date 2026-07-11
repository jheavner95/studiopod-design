import { Tabs, TabsList, Tab } from "@/components/navigation";
import type { ProductionView } from "../_hooks/useProductionWorkspace";

interface ProductionFeatureNavigationProps {
  view: ProductionView;
  onViewChange: (view: ProductionView) => void;
}

/**
 * Feature-level view switching — the Business Feature's own responsibility
 * per DS-5.2's own Feature Structure, composing Foundation Navigation's own
 * Tabs rather than a bespoke switcher.
 */
export function ProductionFeatureNavigation({ view, onViewChange }: ProductionFeatureNavigationProps) {
  return (
    <Tabs value={view} onValueChange={(value) => onViewChange(value as ProductionView)}>
      <TabsList aria-label="Production workspace view">
        <Tab value="pipeline">Pipeline</Tab>
        <Tab value="queue">Queue</Tab>
        <Tab value="dashboard">Dashboard</Tab>
      </TabsList>
    </Tabs>
  );
}
