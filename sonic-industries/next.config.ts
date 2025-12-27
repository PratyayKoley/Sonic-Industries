import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "img.youtube.com",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "res.cloudinary.com",
    //     pathname: "/drkzz6pfx/**",
    //   }
    // ]
    domains: ['img.youtube.com', 'res.cloudinary.com'],
  }
};

export default nextConfig;