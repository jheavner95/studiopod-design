import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** picsum.photos — the placeholder image source used by the Asset Browser gallery's demo data (src/app/application-components/asset-browser). */
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;
