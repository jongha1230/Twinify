/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.scdn.co",
      },
      {
        hostname: "eqfrqwypxsanknqhkvsq.supabase.co",
      },
    ],
  },
};

export default nextConfig;
