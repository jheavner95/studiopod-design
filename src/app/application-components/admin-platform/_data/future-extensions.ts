export interface AdminFutureExtension {
  title: string;
  description: string;
}

export const ADMIN_FUTURE_EXTENSIONS: AdminFutureExtension[] = [
  { title: "SSO administration", description: "Real single-sign-on configuration and identity-provider management — this audit confirmed no real authentication/session-management logic exists anywhere in the repo (see Migration Notes below), so this is genuinely greenfield, deferred pending real usage. Platform Component Architecture's own template already scopes this to Business Features." },
  { title: "Organization management", description: "Multi-tenant/team hierarchy administration above AdminUsers' own flat user roster — deferred pending real usage, the same stance every prior Platform package's own future-extensions already took on unbuilt structural concepts." },
  { title: "Policy engine", description: "Real permission-evaluation and access-control-decision logic behind AdminPermissions' own role listing — this audit confirmed no RBAC/permission-checking logic exists anywhere in the repo, so this is genuinely greenfield, deferred pending real usage." },
  { title: "Audit analytics", description: "Trend analysis and historical reporting across AdminAudit's own action log — belongs to the Intelligence platform template's own architecture, not this one; deferred here rather than duplicated." },
  { title: "Compliance reporting", description: "Exportable compliance reports generated from AdminAudit's own chronological record — depends on real audit-log persistence existing first; deferred pending that groundwork." },
  { title: "AI administration assistant", description: "Automated anomaly detection or policy-violation suggestions across AdminPermissions and AdminAudit — a genuinely different capability layer (external AI service calls) from this package's own single-user, prop-driven components; deferred pending real usage, the same stance Operations Platform's own \"AI operations assistant\" extension already took." },
];
