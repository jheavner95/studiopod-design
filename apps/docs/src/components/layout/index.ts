/**
 * Documentation-site app shell chrome.
 *
 * GlobalNav and Footer used to sit in the library's layout family and were
 * kept out of the published package by a build-time barrel shim. They are
 * site chrome — they import the docs navigation config and the docs
 * component family — so DH-2 moved them here, where the exclusion is
 * structural rather than a resolver trick.
 *
 * Generic layout primitives (Container, Stack, Surface, Workspace, …) are
 * the library's and come from "@studiopod/design".
 */
export { GlobalNav } from "./GlobalNav";
export { Footer } from "./Footer";
