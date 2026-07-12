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
    ];
  },
};

export default nextConfig;
