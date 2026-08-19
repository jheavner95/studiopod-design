import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The documentation application's own class-name merge.
 *
 * `@jheavner95/design` exports a `cn` with the same implementation, and this
 * app used to reach into its source for it. It cannot consume the published
 * one: the package's root entry carries a `"use client"` directive — it has
 * to, because index.js re-exports hooks, context providers and framer-motion
 * primitives — and that makes *every* root export a client reference,
 * including pure functions. Calling the published `cn()` from a server
 * component fails at prerender with "Attempted to call cn() from the server
 * but cn is on the client."
 *
 * That is a real defect in the package, not a quirk of this app: any consumer
 * with a server component hits it. DH-2 found it precisely because the split
 * turned this site into a genuine consumer, and DH-2 did not fix it — the fix
 * is to stop marking the whole root entry as client, which is a build change
 * outside this package's scope. Recorded in docs/certification/DH-2.md
 * § Unexpected discoveries and left as an open conformance gap.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
