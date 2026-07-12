export interface AdminFutureExtension {
  title: string;
  description: string;
}

export const ADMIN_FUTURE_EXTENSIONS: AdminFutureExtension[] = [
  { title: "SSO administration", description: "Real single-sign-on configuration and identity-provider management is not yet implemented. No real authentication/session-management logic exists anywhere in the repo yet — Platform's own scope keeps this in Business Features." },
  { title: "Organization management", description: "Multi-tenant/team hierarchy administration above AdminUsers' own flat user roster is not yet implemented." },
  { title: "Policy engine", description: "Real permission-evaluation and access-control-decision logic behind AdminPermissions' own role listing is not yet implemented. No RBAC/permission-checking logic exists anywhere in the repo yet." },
  { title: "Audit analytics", description: "Trend analysis and historical reporting across AdminAudit's own action log belongs to the Intelligence platform's own components, not this platform's." },
  { title: "Compliance reporting", description: "Exportable compliance reports generated from AdminAudit's own chronological record depend on real audit-log persistence existing first." },
  { title: "AI administration assistant", description: "Automated anomaly detection or policy-violation suggestions across AdminPermissions and AdminAudit — a genuinely different capability layer (external AI service calls) from this package's own single-user, prop-driven components. Not yet implemented." },
];
