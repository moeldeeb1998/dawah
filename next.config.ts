import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // disables built-in optimization
  },
  output: "standalone", // ensures production server runs cleanly
};

export default nextConfig;
