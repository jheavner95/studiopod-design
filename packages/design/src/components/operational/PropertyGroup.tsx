/**
 * Re-export, not a rebuild. Inspector Panel's own InspectorGroup (itself a
 * re-export of Foundation Metadata's PropertyGroup, built in DS-2.5.2)
 * already covers this — a titled grid arranging whatever rows it's given.
 */
export { InspectorGroup as PropertyGroup } from "./InspectorGroup";
