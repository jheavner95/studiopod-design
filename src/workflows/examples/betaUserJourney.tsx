import { UserPlus, LayoutGrid, Sparkles, UploadCloud, PackageCheck } from "lucide-react";
import type { Workflow } from "../types";

/** Parallel flow: Connect AI and Import Artwork are both reachable from Workspace and can happen in either order. */
export const betaUserJourney: Workflow = {
  id: "beta-user-journey",
  title: "Beta User Journey",
  description: "How a new beta user goes from signup to their first finished product.",
  pattern: "parallel",
  completion: 0.4,
  steps: [
    {
      id: "join-beta",
      title: "Join Beta",
      subtitle: "Sign up for early access",
      icon: <UserPlus className="size-5" />,
      completed: true,
      estimatedDuration: "~2 min",
      description: "Create an account and get access to the beta workspace.",
    },
    {
      id: "workspace",
      title: "Workspace",
      subtitle: "Set up your workspace",
      icon: <LayoutGrid className="size-5" />,
      completed: true,
      estimatedDuration: "~5 min",
      description: "Name the workspace and invite teammates.",
    },
    {
      id: "connect-ai",
      title: "Connect AI",
      subtitle: "Link an AI design tool",
      icon: <Sparkles className="size-5" />,
      active: true,
      estimatedDuration: "~3 min",
      description: "Connect an AI design tool to generate artwork directly into StudioPOD.",
    },
    {
      id: "import-artwork",
      title: "Import Artwork",
      subtitle: "Bring in existing designs",
      icon: <UploadCloud className="size-5" />,
      active: true,
      estimatedDuration: "~3 min",
      description: "Import artwork already created outside StudioPOD.",
    },
    {
      id: "first-product",
      title: "First Product",
      subtitle: "Create your first listing",
      icon: <PackageCheck className="size-5" />,
      estimatedDuration: "~10 min",
      description: "Turn either an AI-generated or imported design into a first product.",
    },
  ],
  connections: [
    { id: "join-workspace", source: "join-beta", target: "workspace" },
    { id: "workspace-connect-ai", source: "workspace", target: "connect-ai" },
    { id: "workspace-import-artwork", source: "workspace", target: "import-artwork" },
    { id: "connect-ai-first-product", source: "connect-ai", target: "first-product" },
    { id: "import-artwork-first-product", source: "import-artwork", target: "first-product" },
  ],
  branches: [
    {
      id: "workspace-branch",
      from: "workspace",
      to: ["connect-ai", "import-artwork"],
      label: "In parallel",
    },
  ],
};
