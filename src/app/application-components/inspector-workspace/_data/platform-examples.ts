export interface PlatformExample {
  id: string;
  title: string;
  primaryObject: string;
  uniqueInfo: string;
  sharedAnatomy: string;
}

export const PLATFORM_EXAMPLES: PlatformExample[] = [
  {
    id: "artwork-project",
    title: "Artwork Project Inspector",
    primaryObject: "An Artwork Project.",
    uniqueInfo: "Relationships lists every Ratio and Export Preset generated from this project.",
    sharedAnatomy: "Full eight-region anatomy, Relationships-heavy.",
  },
  {
    id: "publishing-job",
    title: "Publishing Job Inspector",
    primaryObject: "A Publishing Job.",
    uniqueInfo: "Health leads with live Publishing Status; Inspector Actions centers on Retry and Cancel.",
    sharedAnatomy: "Validation gates Inspector Actions, per the Publishing Inspector variant's own rule.",
  },
  {
    id: "commerce-order",
    title: "Commerce Order Inspector",
    primaryObject: "A Commerce Order.",
    uniqueInfo: "Activity is order-specific (payment, fulfillment, shipping events) rather than generic edit history.",
    sharedAnatomy: "Identity includes order number and channel, the Commerce Inspector variant's own convention.",
  },
  {
    id: "product",
    title: "Product Inspector",
    primaryObject: "A Product.",
    uniqueInfo: "Relationships spans Publishing Targets and Commerce listings simultaneously — a genuinely cross-platform object.",
    sharedAnatomy: "Properties includes pricing, per the Commerce Inspector variant.",
  },
  {
    id: "style",
    title: "Style Inspector",
    primaryObject: "A Style (a Product's design or pattern variant).",
    uniqueInfo: "Relationships shows every Ratio derived from this Style, and the Product it belongs to.",
    sharedAnatomy: "Parent/Children relationships are the dominant content, same as Artwork Project Inspector.",
  },
  {
    id: "generation-profile",
    title: "Generation Profile Inspector",
    primaryObject: "A Generation Profile (an AI Model configuration).",
    uniqueInfo: "Properties is almost entirely model configuration; Health reflects the underlying AI Model's Provider Status.",
    sharedAnatomy: "Close to the Provider Inspector variant's own Health-dominant shape.",
  },
];
