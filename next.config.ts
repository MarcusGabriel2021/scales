import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/scales", 
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
