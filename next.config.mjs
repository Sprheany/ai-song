/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "imagedelivery.net" },
      { hostname: "cdn1.suno.ai" },
    ],
  },
};

export default nextConfig;
