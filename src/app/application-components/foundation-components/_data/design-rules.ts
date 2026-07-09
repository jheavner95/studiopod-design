export interface DesignRule {
  title: string;
  explanation: string;
}

export const FOUNDATION_DESIGN_RULES: DesignRule[] = [
  {
    title: "Foundation components must be boring, reliable, and accessible",
    explanation: "A Button that surprises anyone is a Button that failed at its one job — foundation layer components earn trust through predictability, not novelty.",
  },
  {
    title: "Operational components compose foundations; they do not reinvent them",
    explanation: "A Queue Table is a Table plus domain data — never a bespoke table implementation written from scratch inside the Workflow package.",
  },
  {
    title: "Marketing and app may style differently through tokens, but should share behavior",
    explanation: "A Button's keyboard behavior, focus handling, and disabled logic are identical everywhere — only the tokens driving its color and spacing differ by context.",
  },
  {
    title: "Components must support keyboard, focus, disabled, loading, and error states where relevant",
    explanation: "Not every component needs every state — a static Divider has none of them — but any component that can plausibly need a state and doesn't support it isn't Production Ready yet.",
  },
  {
    title: "Any component used by more than one operational family belongs in the foundation layer",
    explanation: "The moment a second DS-2.x package needs the same pattern a first one already built, that pattern graduates out of the package and into this catalog — the same generalization rule DS-1.9's Workspace Evolution Process already established.",
  },
];
