/**
 * Framework capabilities Design needs but does not own. See ./types.ts for the
 * reasoning, including why these are props rather than a provider.
 *
 * DH-4 note: when the tier layout lands (gap 8), this folds into `theme/`.
 * It is its own directory today because `theme/` does not exist yet and
 * `lib/` is a banned name that DH-3 must not extend.
 */
export type { LinkComponent, LinkComponentProps, ImageComponent, ImageComponentProps } from "./types";
