"use client";

import { useState } from "react";
import { Card, Body, Badge, Button } from "@/components/ui";
import {
  AdminWorkspace,
  AdminHeader,
  AdminUsers,
  AdminPermissions,
  AdminConfiguration,
  AdminAudit,
  AdminEnrollment,
  AdminInspector,
  AdminMetrics,
  AdminSummary,
  AdminActions,
} from "@/components/platform/admin";
import { WorkflowFooter, ApprovalStep } from "@/components/workflow";
import { InspectorHeader, PropertyRow, PropertyToggle, PropertySelect } from "@/components/operational";
import type { DataGridColumn } from "@/components/operational";
import type { StateHistoryEntry } from "@/components/workflow";

function GalleryCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-body-md font-medium text-ink-primary">{title}</span>
      <Body size="sm" muted>
        {description}
      </Body>
      <div className="h-[440px] overflow-hidden rounded-lg border border-border-subtle">{children}</div>
    </Card>
  );
}

interface UserRow {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Pending" | "Disabled";
}

const USER_ROWS: UserRow[] = [
  { id: "1", name: "A. Rivera", email: "a.rivera@studio.example", status: "Active" },
  { id: "2", name: "J. Chen", email: "j.chen@studio.example", status: "Pending" },
  { id: "3", name: "M. Osei", email: "m.osei@studio.example", status: "Disabled" },
];

function userTone(status: UserRow["status"]) {
  return status === "Active" ? "success" : status === "Pending" ? "accent" : "neutral";
}

function UserManagementDemo() {
  const columns: DataGridColumn<UserRow>[] = [
    { id: "name", header: "Name", accessor: (row) => row.name },
    { id: "email", header: "Email", accessor: (row) => row.email },
    {
      id: "status",
      header: "Status",
      accessor: (row) => (
        <Badge tone={userTone(row.status)} size="sm">
          {row.status}
        </Badge>
      ),
    },
  ];
  return (
    <GalleryCard title="User Management" description="AdminUsers is Operational's own DataGrid, re-exported — real rows over real columns.">
      <AdminWorkspace header={<AdminHeader name="Studio team" type="Admin" />}>
        <div className="p-2">
          <AdminUsers<UserRow> columns={columns} rows={USER_ROWS} getRowId={(row) => row.id} caption="Team members" />
        </div>
      </AdminWorkspace>
    </GalleryCard>
  );
}

interface RoleRow {
  id: string;
  role: string;
  canPublish: string;
  canManageUsers: string;
}

const ROLE_ROWS: RoleRow[] = [
  { id: "1", role: "Owner", canPublish: "Yes", canManageUsers: "Yes" },
  { id: "2", role: "Editor", canPublish: "Yes", canManageUsers: "No" },
  { id: "3", role: "Viewer", canPublish: "No", canManageUsers: "No" },
];

function RoleManagementDemo() {
  const columns: DataGridColumn<RoleRow>[] = [
    { id: "role", header: "Role", accessor: (row) => row.role },
    { id: "canPublish", header: "Can publish", accessor: (row) => row.canPublish },
    { id: "canManageUsers", header: "Can manage users", accessor: (row) => row.canManageUsers },
  ];
  return (
    <GalleryCard title="Role Management" description="AdminPermissions is Operational's own DataGrid, re-exported — a role roster, not a single-role editor.">
      <div className="h-full overflow-y-auto p-2">
        <AdminPermissions<RoleRow> columns={columns} rows={ROLE_ROWS} getRowId={(row) => row.id} caption="Roles and permissions" />
      </div>
    </GalleryCard>
  );
}

function ConfigurationDemo() {
  const [requireApproval, setRequireApproval] = useState(true);
  const [defaultRole, setDefaultRole] = useState("viewer");
  return (
    <GalleryCard title="Configuration" description="AdminConfiguration is Operational's own PropertyPanel, re-exported — real controlled fields, not a mock form.">
      <AdminConfiguration header={<InspectorHeader name="Studio settings" type="Configuration" />}>
        <PropertyRow editor={<PropertyToggle label="Require approval for new members" checked={requireApproval} onChange={setRequireApproval} />} />
        <PropertyRow
          editor={
            <PropertySelect
              label="Default role"
              value={defaultRole}
              onChange={setDefaultRole}
              options={[
                { value: "viewer", label: "Viewer" },
                { value: "editor", label: "Editor" },
              ]}
            />
          }
        />
      </AdminConfiguration>
    </GalleryCard>
  );
}

function AuditLogDemo() {
  const entries: StateHistoryEntry[] = [
    { id: "1", title: "Role changed to Editor", actor: "A. Rivera", timestamp: "10 min ago", status: "completed" },
    { id: "2", title: "New member invited", actor: "A. Rivera", timestamp: "1 hour ago", status: "completed" },
    { id: "3", title: "Configuration updated", actor: "System", timestamp: "3 hours ago", status: "completed" },
  ];
  return (
    <GalleryCard title="Audit Log" description="AdminAudit is State Machine's own StateHistory, re-exported — a chronological record, not a mock feed.">
      <div className="h-full overflow-y-auto p-2">
        <AdminAudit entries={entries} />
      </div>
    </GalleryCard>
  );
}

function EnrollmentDemo() {
  return (
    <GalleryCard title="Enrollment" description="AdminEnrollment composes Approval & Review's own ApprovalStage/ApprovalStep — the caller arranges step content, the shell doesn't.">
      <AdminWorkspace header={<AdminHeader name="New member — J. Chen" type="Admin" />}>
        <div className="flex flex-col gap-3 p-2">
          <AdminEnrollment title="Account created">
            <ApprovalStep label="Invite accepted" status="approved" />
          </AdminEnrollment>
          <AdminEnrollment title="Manager review">
            <ApprovalStep label="Awaiting manager sign-off" status="pending" />
          </AdminEnrollment>
          <AdminEnrollment title="Workspace access">
            <ApprovalStep label="Not yet granted" status="pending" />
          </AdminEnrollment>
        </div>
      </AdminWorkspace>
    </GalleryCard>
  );
}

function AdminDashboardDemo() {
  return (
    <GalleryCard title="Admin Dashboard" description="AdminSummary (overview row) and AdminMetrics (measured numbers) composed together.">
      <AdminWorkspace header={<AdminHeader name="This week's administration" type="Admin" />}>
        <div className="flex flex-col gap-4 p-2">
          <AdminSummary items={[{ value: "42", label: "Active users" }, { value: "3", label: "Pending invites" }]} columns={2} />
          <AdminMetrics items={[{ value: "12", label: "Config changes" }, { value: "1.2d", label: "Avg. enrollment time" }]} columns={2} />
        </div>
      </AdminWorkspace>
    </GalleryCard>
  );
}

function GovernanceReviewDemo() {
  return (
    <GalleryCard title="Governance Review" description="AdminInspector showing a single team member's own lifecycle detail.">
      <AdminInspector
        name="A. Rivera"
        type="Admin"
        status="active"
        properties={[
          { id: "1", label: "Role", value: "Owner" },
          { id: "2", label: "Joined", value: "8 months ago" },
        ]}
      />
    </GalleryCard>
  );
}

function CompletedAdministrationDemo() {
  return (
    <GalleryCard title="Completed Administration" description="A team member across their full lifecycle, AdminActions available in the footer.">
      <AdminWorkspace
        header={<AdminHeader name="M. Osei" type="Admin" />}
        footer={
          <WorkflowFooter>
            <AdminActions>
              <Button variant="secondary" size="sm">
                Archive
              </Button>
            </AdminActions>
          </WorkflowFooter>
        }
      >
        <div className="flex flex-wrap gap-2 p-2">
          <Badge tone="success" size="sm">
            Active
          </Badge>
          <Badge tone="accent" size="sm">
            Pending
          </Badge>
          <Badge tone="neutral" size="sm">
            Disabled
          </Badge>
          <Badge tone="accent" size="sm">
            Configured
          </Badge>
          <Badge tone="success" size="sm">
            Completed
          </Badge>
          <Badge tone="neutral" size="sm">
            Archived
          </Badge>
        </div>
      </AdminWorkspace>
    </GalleryCard>
  );
}

/** Every named gallery variant in this system, each composed from real component props — not a static screenshot. */
export function AdminPlatformGallery() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <UserManagementDemo />
      <RoleManagementDemo />
      <ConfigurationDemo />
      <AuditLogDemo />
      <EnrollmentDemo />
      <AdminDashboardDemo />
      <GovernanceReviewDemo />
      <CompletedAdministrationDemo />
    </div>
  );
}
