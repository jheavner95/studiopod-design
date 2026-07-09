export interface AccessibilityLink {
  label: string;
  href: string;
}

export interface AccessibilityGuidance {
  label: string;
  text: string;
  links?: AccessibilityLink[];
}

export const ACCESSIBILITY_GUIDANCE: AccessibilityGuidance[] = [
  {
    label: "Keyboard navigation",
    text: "Arrow keys move focus between cards or rows in reading order; Space toggles selection; Enter opens the focused object.",
  },
  {
    label: "Focus order",
    text: "Follows the same order the objects visually read in — left to right, top to bottom in Grid; top to bottom in Table and List.",
  },
  {
    label: "Selection feedback",
    text: "Never color alone — a checkmark icon and a text-readable state accompany every selected object's visual highlight.",
  },
  {
    label: "Screen reader guidance",
    text: "Each object announces its Title, Status, and selected state together, so a screen reader user gets the same \"is this the one\" answer a sighted user gets from the card.",
  },
  {
    label: "Grid accessibility",
    text: "Uses grid or gridcell roles (or an equivalent list semantic) so assistive technology understands the two-dimensional layout, not just a flat list of images.",
  },
  {
    label: "Table accessibility",
    text: "Real table markup with row and column headers — the same requirement the design system's other data tables already follow.",
    links: [{ label: "Coverage Matrix", href: "/application-components/coverage" }],
  },
];
