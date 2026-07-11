export interface PreSessionFix {
  title: string;
  detail: string;
}

/**
 * What this session fixed directly, before the Foundation/Operational audit
 * pass (tracked separately in findings.ts) ever ran. Every item here was
 * independently re-verified present in code during this certification —
 * re-reading the actual source, not trusting the earlier session's own
 * claim — since the Foundation tier's own "Pass" verdicts on Focus
 * management and Live region coverage (see scorecard.ts) depend on these
 * primitives actually existing.
 */
export const PRE_SESSION_FIXES: PreSessionFix[] = [
  {
    title: "Shared LiveRegionProvider / useAnnounce primitive",
    detail: "src/components/feedback/LiveRegion.tsx — the first first-party aria-live announcement primitive in the codebase, closing a gap every earlier tier certification (Operational, Workflow, Platform) had disclosed but left unresolved. Re-verified present; still not yet wired into every consumer that needs it — see the Operational tier's own Live region coverage findings below.",
  },
  {
    title: "useBodyLock hook plus #app-root inert wrapper",
    detail: "src/hooks/useBodyLock.ts and the #app-root wrapper in src/app/layout.tsx — makes background content genuinely inert (not just visually obscured) while a modal overlay is open. Re-verified both present in code.",
  },
  {
    title: "Focus-trap / body-lock ordering bug, found and fixed",
    detail: "Menu, Dialog, Drawer, and CommandPalette all call useBodyLock before useFocusTrap, with an explicit comment in Dialog.tsx and Drawer.tsx explaining why the order matters (useBodyLock's cleanup, which removes #app-root's inert attribute, must run after useFocusTrap's cleanup releases focus, or focus can be released into an already-inert tree). Re-verified this ordering and its documenting comment are present in all four overlay components.",
  },
  {
    title: "Popover aria-modal",
    detail: "Popover renders role=\"dialog\" aria-modal=\"true\" — re-verified present. This certification's own Foundation-tier audit built on top of this fix by adding the labelledBy/aria-label props Popover was still missing (see Resolved findings below).",
  },
  {
    title: "Breadcrumbs keyboard navigation",
    detail: "Breadcrumbs' overflow trigger composes the existing Menu component (which owns its own focus trap and roving keyboard handling) rather than reimplementing keyboard behavior locally — re-verified in src/components/navigation/Breadcrumbs.tsx.",
  },
  {
    title: "TreeNavigation roving tabindex",
    detail: "Single-tab-stop roving tabindex per the ARIA tree pattern — only the current item gets tabIndex=0, every other treeitem gets tabIndex=-1 and is reached by arrow keys — re-verified present in src/components/navigation/TreeNavigation.tsx.",
  },
  {
    title: "Toast assertive escalation",
    detail: "Toast computes aria-live=\"assertive\" when the lead toast's tone is \"error\", \"polite\" otherwise — re-verified present in src/components/feedback/Toast.tsx.",
  },
  {
    title: "Notification role",
    detail: "Notification passes tone through the same feedbackRole() helper Alert and FieldError use, rather than a separate local mapping — re-verified present in src/components/feedback/Notification.tsx.",
  },
  {
    title: "FieldError / Alert feedbackRole consolidation",
    detail: "feedbackRole(tone) lives once in src/components/feedback/Alert.tsx and is imported by FieldError.tsx and Notification.tsx — re-verified present. This certification's own Foundation-tier audit found and fixed one place this consolidation hadn't yet reached (ValidationSummary.tsx — see Resolved findings below).",
  },
  {
    title: "aria-describedby wiring across 7 ui/ primitives and 9 form/ field wrappers",
    detail: "Error/helper text association wired through aria-describedby across the base ui/ input primitives and the form/ field wrapper components — re-verified present at a sample of call sites. Not independently re-audited component-by-component in this pass; the Tooltip fix below (Resolved findings) closed a related but distinct gap this same wiring pattern didn't cover, since Tooltip's label is not a field's error/helper text.",
  },
];
