export interface StatusPrinciple {
  title: string;
  explanation: string;
}

export const STATUS_PRINCIPLES: StatusPrinciple[] = [
  {
    title: "Operational awareness should be passive",
    explanation: "The whole anatomy reports; almost none of it interrupts — see the Console region's own optional, advanced-only placement.",
  },
  {
    title: "Status should not interrupt work",
    explanation: "A background job completing doesn't steal focus from whatever the user is doing in the Primary Workspace.",
  },
  {
    title: "Notifications require prioritization",
    explanation: "Errors and Warnings earn a different visual weight than Success and Information — see the Notifications region's own severity rule.",
  },
  {
    title: "Background work remains visible",
    explanation: "A job the user can't see the progress of is a job they have to take on faith — see Background Jobs' own progress rule.",
  },
  {
    title: "Health indicators stay persistent",
    explanation: "Operational Health doesn't hide behind a click any more than the Inspector's own Health region does.",
  },
  {
    title: "Timelines tell the operational story",
    explanation: "Activity Timeline is the one place a user can reconstruct what actually happened across the whole workspace, in order.",
  },
  {
    title: "Diagnostics support troubleshooting",
    explanation: "Diagnostics exists specifically for the moment ambient awareness alone isn't enough — see the Diagnostics region's own purpose.",
  },
];
