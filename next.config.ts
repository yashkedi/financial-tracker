import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    // Enable styled-components SWC transform for consistent SSR/CSR classnames
    styledComponents: true,
  },
};

export default nextConfig;
