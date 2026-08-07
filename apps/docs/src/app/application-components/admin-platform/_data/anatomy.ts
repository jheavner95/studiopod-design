export interface AdminAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const ADMIN_ANATOMY: AdminAnatomyRegion[] = [
  { name: "Workspace", description: "The panel shell everything else renders inside.", component: "AdminWorkspace (Workflow Framework's own Workflow, re-exported)" },
  { name: "Header", description: "What administrative view is open, and its current state.", component: "AdminHeader (Workflow Framework's own WorkflowHeader, re-exported)" },
  { name: "Sidebar", description: "Contextual side content — filters, a team list, related views.", component: "AdminSidebar (Workflow Framework's own WorkflowSidebar, re-exported)" },
  { name: "Users", description: "The tabular listing of user accounts.", component: "AdminUsers (Operational's own DataGrid, re-exported)" },
  { name: "Permissions", description: "The tabular listing of roles and their granted permissions.", component: "AdminPermissions (Operational's own DataGrid, re-exported)" },
  { name: "Configuration", description: "System settings — toggles, dropdowns, structured fields — edited in place.", component: "AdminConfiguration (Operational's own PropertyPanel, re-exported)" },
  { name: "Audit", description: "A chronological record of administrative actions.", component: "AdminAudit (State Machine's own StateHistory, re-exported)" },
  { name: "Enrollment", description: "A titled stage group for a multi-step onboarding process with an approval gate.", component: "AdminEnrollment (Approval & Review's own ApprovalStage, re-exported)" },
  { name: "Inspector", description: "A single selected administrative item's own lifecycle detail.", component: "AdminInspector (State Machine's own StateInspector, re-exported)" },
  { name: "Metrics", description: "Measured administrative numbers and an at-a-glance overview row.", component: "AdminMetrics, AdminSummary (Pipeline Components' own PipelineMetrics/PipelineSummary, re-exported)" },
  { name: "Actions", description: "What can be done right now — Approve, Disable, Archive.", component: "AdminActions (Workflow Framework's own WorkflowActions, re-exported)" },
];
