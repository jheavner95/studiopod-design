export interface HealthAccessibilityTopic {
  label: string;
  text: string;
}

export const HEALTH_ACCESSIBILITY_TOPICS: HealthAccessibilityTopic[] = [
  {
    label: "ARIA",
    text: "HealthScore's role=\"progressbar\" and aria-valuenow come from Foundation Feedback's own ProgressRing unchanged; StatusTimeline inherits InspectorHistory's plain, semantic <ul>/<li> list structure.",
  },
  {
    label: "Announcements",
    text: "HealthIndicator now announces its own state changing (e.g. \"Status changed to Critical.\") through the shared LiveRegionProvider mounted at the app root whenever its value prop transitions — critical assertively, everything else politely — no longer an opt-in region a screen has to wrap it in itself.",
  },
  {
    label: "Status changes",
    text: "OperationalAlertPanel's role comes from Alert's own feedbackRole(tone) helper (role=\"alert\" for error, role=\"status\" for the rest) — a critical alert is announced assertively without this family inventing a second severity-to-role mapping.",
  },
  {
    label: "Color independence",
    text: "HealthIndicator always pairs its dot with a text label (\"Healthy\", \"Critical\", ...) — color is never the only signal, the same rule StatusIndicator's own docs already establish. HealthIssueList pairs severity with both an icon and text, not color alone.",
  },
  {
    label: "Keyboard",
    text: "Every interactive piece in this family (InspectorSection's expand trigger, Alert's dismiss button, DataGrid's own sortable headers inside ProviderHealthPanel) is a real, native button reachable by Tab — nothing here introduces a custom keyboard handler.",
  },
  {
    label: "Focus",
    text: "Nothing in this family traps or redirects focus — StatusPanel inherits whatever focus behavior the context it's placed in already provides (e.g. a Drawer's own focus trap, if shown there).",
  },
];
