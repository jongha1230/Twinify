import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twinify",
  description: "Twinify 음악 공유 사이트, 이성찬, 유수지, 박민서, 남수빈, 최예진, 임종하",
  icons: {
    icon: "/twinify.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
