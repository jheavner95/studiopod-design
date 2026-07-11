export interface AdminPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dedicated audit searched the entire repo for real implementations
 * across the six subdomains this package's own work order names —
 * Admin platform, Users, Permissions, Configuration, Audit, Enrollment —
 * plus Governance, before a single Admin platform component was written.
 * No speculative findings: every entry below traces to a specific file
 * this audit actually read. Unlike every prior Platform package, Admin has
 * no dedicated directory, no diagram component, and no static fixture
 * module of its own anywhere in the repo — its only footprint is a single
 * planning-schema row in Platform Component Architecture's own templates.
 */
export const ADMIN_PROMOTION_CANDIDATES: AdminPromotionCandidate[] = [];

export const ADMIN_CLEAN_FINDINGS: string[] = [
  "Admin platform (whole-platform level): does not exist, re-confirmed directly. No src/admin/ or *admin*-named directory exists anywhere. Platform Component Architecture's own adoption audit already carries an explicit \"does-not-exist\" verdict, and Operations Platform's own audit independently found the same zero-hit result for permission/audit-log/role-based/access-control search terms. The only Admin-adjacent code anywhere is a planning-only template row describing what a future Admin platform template would compose from other packages — its own extensionBoundary states plainly that real authentication, session management, and SSO logic stay in Business Features.",
  "Users: does not exist as real logic. A targeted search for real user-entity identifiers (UserAccount, UserProfile, UserRole, UserManagement, UserRepository, createUser/updateUser/deleteUser) returns zero matches anywhere in the repo. The only substantive \"user\" hit is a static onboarding fixture (a Workflow object with plain label/description/icon fields feeding the Workflow Diagram Library) — illustration data, not a signup form or account record.",
  "Permissions: does not exist as real logic. Every \"role\" hit beyond generic ARIA role= attributes is either Foundation's own accessibility-role documentation, an architectural-tier \"role\" field describing this design system's own layer structure, or the Admin template's own planning-only businessObjects list. No RBAC or permission-checking logic exists anywhere.",
  "Configuration: does not exist as real logic, separate from this repo's own build/tooling configuration (next.config.ts, tsconfig.json, etc — excluded as out of scope). Every \"config\"/\"configuration\" hit is UI-pattern prose describing a form-first workspace mode, demo/label strings, or incidental local-variable naming for style lookups — no system-configuration persistence or management logic exists anywhere.",
  "Audit: does not exist as real logic, separate from this design system's own extensive self-referential \"duplication audit\" methodology (the very discipline this package's own audit performs). The one \"audit trail\" mention outside prose is a static demo-label string on an unrelated State Machine gallery illustration — no code writes to any audit log anywhere.",
  "Enrollment/Governance: does not exist. A repo-wide search for \"enroll\" returns zero hits of any kind — no prose, no code, no fixture. The only \"governance\" hits describe this design system's own architectural-governance documentation (how the design system's own architecture is allowed to change), unrelated to an Admin platform's tenant/access governance.",
];
