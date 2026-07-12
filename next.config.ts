import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** picsum.photos — the placeholder image source used by the Asset Browser gallery's demo data (src/app/application-components/asset-browser). */
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
  async redirects() {
    return [
      {
        // /design-system was a legacy interactive showcase that predated the
        // DS-7.1 docs IA and largely duplicated content now owned by /tokens
        // (raw + semantic color, typography, spacing, radius, shadow), with
        // its remaining unique material (accessibility notes) folded into
        // /core-components. Kept permanent since this is a settled IA move,
        // not a temporary reroute.
        source: "/design-system",
        destination: "/tokens",
        permanent: true,
      },
      // The Quality section's per-tier certification pages restated claims
      // that already live on each tier's own architecture page — redirected
      // to those genuine canonical successors rather than left to 404.
      {
        source: "/application-components/foundation-audit",
        destination: "/docs/foundation",
        permanent: true,
      },
      {
        source: "/application-components/operational-certification",
        destination: "/docs/operational",
        permanent: true,
      },
      {
        source: "/application-components/workflow-certification",
        destination: "/docs/workflow",
        permanent: true,
      },
      {
        source: "/application-components/platform-certification",
        destination: "/application-components/platform-architecture",
        permanent: true,
      },
      {
        source: "/application-components/workspace-certification",
        destination: "/docs/workspace",
        permanent: true,
      },
      {
        source: "/docs/application-composition-certification",
        destination: "/docs/application-composition",
        permanent: true,
      },
      {
        // Accessibility Certification's real, standing conventions were
        // rewritten and merged into the About & Principles page's own
        // Accessibility section.
        source: "/application-components/accessibility-certification",
        destination: "/documentation#accessibility",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
