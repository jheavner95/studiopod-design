/**
 * Deliberately empty. `tsup` (via `postcss-load-config`) walks up from its
 * `cwd` looking for a PostCSS config and will otherwise find the repo
 * root's `postcss.config.mjs` (the documentation app's `@tailwindcss/postcss`
 * setup) and silently run this package's `styles.css` entry through
 * Tailwind's compiler in isolation — which strips the entire `@theme` block
 * as "unused" since there are no content files to scan. This package ships
 * plain concatenated token CSS and must never be compiled by Tailwind
 * itself (see README.md's CSS section) — an empty local config here is
 * found first and shadows the root config for this build only.
 */
const config = {
  plugins: {},
};

export default config;
