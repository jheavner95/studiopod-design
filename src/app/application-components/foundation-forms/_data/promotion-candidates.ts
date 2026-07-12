export interface FormPromotionCandidate {
  id: string;
  title: string;
  files: string[];
  count: number;
  lineTotal: number;
  findingCommand: string;
  description: string;
  migrationEffort: "Low" | "Medium" | "High";
  migrationNote: string;
}

/**
 * Real findings against this repository at the time this page was
 * written — every count is grep-verifiable with findingCommand. Same
 * methodology Foundation Table's and Foundation Metadata's own
 * Promotion Candidates sections used.
 */
export const FORM_PROMOTION_CANDIDATES: FormPromotionCandidate[] = [
  {
    id: "control-docks",
    title: "Near-duplicate playground control docks",
    files: [
      "platforms/_components/ControlDock.tsx",
      "capabilities/_components/ControlDock.tsx",
      "workflows/_components/ControlDock.tsx",
      "motion/_components/ControlDock.tsx",
      "production/_components/ControlDock.tsx",
    ],
    count: 5,
    lineTotal: 377,
    findingCommand: 'grep -rl "ToggleSwitch" src/app/*/_components/ControlDock.tsx',
    description: "Five separate ControlDock.tsx files (74–81 lines each), each wiring two ToggleSwitch controls to a local setToggle(key, checked) state pattern — the exact \"configuration panel\" and \"toggle examples\" shape SwitchField is meant to replace.",
    migrationEffort: "Low",
    migrationNote: "Each ToggleSwitch call site is already the shape SwitchField wraps — swapping is close to mechanical, though the shared setToggle state pattern itself is out of Form System scope.",
  },
  {
    id: "form-controls-showcase",
    title: "Design system form-controls showcase",
    files: ["design-system/_sections/FormControlsSection.tsx"],
    count: 1,
    lineTotal: 331,
    findingCommand: 'grep -rl "ToggleSwitch" src/app/design-system/_sections/',
    description: "The original showcase of TextInput, Select, ToggleSwitch, and Checkbox together — the single largest existing \"input examples\" and \"select examples\" surface in the repository, predating the Form System.",
    migrationEffort: "Medium",
    migrationNote: "It's a display gallery, not a real editing form, so migrating it means demonstrating the same controls via the new *Field wrappers rather than a like-for-like swap.",
  },
  {
    id: "property-editor-gap",
    title: "Property Editor catalogued but never built",
    files: ["inventory/_data/inventory.ts", "foundation-components/_data/catalog.ts", "_data/families.ts", "inspector-workspace/_data/regions.ts"],
    count: 4,
    lineTotal: 0,
    findingCommand: 'grep -rln "Property Editor" src/app/application-components/',
    description: "\"Property Editor\" has been tracked as a Needed gap since the DS-0.2 inventory (citing FieldGroup.tsx as the closest building block) and referenced by name in four separate data files since — but no Inspector page in this repository has ever rendered a real editing form, only read-only anatomy documentation.",
    migrationEffort: "Low",
    migrationNote: "Not a migration — PropertyEditor.tsx is net-new coverage for a gap that had been documented but left empty for some time.",
  },
];

export function totalPromotionLines(): number {
  return FORM_PROMOTION_CANDIDATES.reduce((sum, candidate) => sum + candidate.lineTotal, 0);
}
