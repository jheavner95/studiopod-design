import { defineConfig, devices } from "@playwright/test";

/**
 * Visual regression + real-browser interaction infrastructure. Runs against
 * a production build (not `next dev`) so snapshots never pick up the dev
 * mode indicator badge or unminified output — see docs/TESTING.md
 * "Visual regression" for why there's no Storybook here: the site's own
 * component-gallery playground pages (already built for every component
 * family — /core-components, /motion, /illustrations, /workflows, ...)
 * already serve as the isolated-rendering surface a Storybook instance
 * would otherwise exist to provide.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["html", { open: "never" }]],
  use: {
    // A dedicated port, not 3000: this machine may already have an
    // unrelated app running there (the actual StudioPOD product, not this
    // design-system repo), and `reuseExistingServer` would silently attach
    // to whatever it finds — proving the wrong app's pages pass, or 404ing
    // like this port did the first time it was wired up.
    baseURL: "http://localhost:3100",
    trace: "retain-on-failure",
  },
  // Dark is the only theme this design system currently ships (see
  // docs/TESTING.md "Single theme today") — one project, not a light/dark
  // matrix, until a real light theme exists to snapshot.
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } },
    { name: "mobile", use: { ...devices["Desktop Chrome"], viewport: { width: 375, height: 812 } } },
  ],
  webServer: {
    command: "npm run build && npm run start -- -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
