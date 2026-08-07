export interface InspectorPrinciple {
  title: string;
  explanation: string;
}

export const INSPECTOR_PRINCIPLES: InspectorPrinciple[] = [
  {
    title: "Always contextual",
    explanation: "The Inspector has no meaning without a selection — it never has its own independent navigation, unlike every other region in the workspace anatomy.",
  },
  {
    title: "Identity first",
    explanation: "The very first thing the Inspector shows is what the object is, before anything about its state or its connections.",
  },
  {
    title: "Editing follows inspection",
    explanation: "Properties comes after Identity, never before it — you recognize an object before you're offered to change it.",
  },
  {
    title: "Relationships before actions",
    explanation: "Understanding what an object connects to comes before deciding what to do to it.",
  },
  {
    title: "Validation is visible",
    explanation: "Errors and Warnings surface without a click — the same rule the Workspace Header's own Status region follows, applied to one object instead of a platform.",
  },
  {
    title: "Health is passive",
    explanation: "Health reports, it doesn't act — see the Health region's own read-only rule.",
  },
  {
    title: "Activity is chronological",
    explanation: "The one region where reordering isn't a customization option — see the Activity region's own chronological-presentation rule.",
  },
  {
    title: "Actions belong last",
    explanation: "By the time a user reaches Inspector Actions, they've already seen identity, properties, relationships, validation, health, and activity — enough context to act correctly.",
  },
];
