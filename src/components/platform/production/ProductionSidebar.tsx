/**
 * Re-export, not a rebuild. Workflow Framework's own WorkflowSidebar
 * (header/children/collapsed — Surface/ScrollArea underneath) already
 * covers a Production workspace's own contextual side content, checked
 * directly against its full prop surface and found already fully generic.
 */
export { WorkflowSidebar as ProductionSidebar } from "@/components/workflow";
