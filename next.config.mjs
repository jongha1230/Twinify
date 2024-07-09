/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.namu.wiki",
      },
    ],
    domains: ["i.scdn.co"],
  },
};

export default nextConfig;
