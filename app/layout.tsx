// src/app/layout.tsx
import { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Header } from "../components/Header";

export const metadata: Metadata = {
  title: {
    default: "SkeletonStyler | Fluent API for UI Loading",
    template: "%s | SkeletonStyler", // Giúp các trang con tự động nối tên thương hiệu
  },
  description: "Fluent API for Web Skeletons",
  // Thêm đoạn này vào
  icons: {
    icon: "/logo.svg", // Next.js sẽ tự tìm trong thư mục public
    apple: "/logo.svg", // Dùng luôn cho icon trên iPhone/iPad nếu muốn
  },
  metadataBase: new URL("https://skeleton-styler.vercel.app"),
  authors: [{ name: "Nguyen Hoai Nam" }],
  publisher: "Nguyen Hoai Nam",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "SkeletonStyler | Fluent API for UI Loading",
    description: "Fluent API for Web Skeletons",
    url: "https://skeleton-styler.vercel.app",
    siteName: "SkeletonStyler",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "SkeletonStyler Preview",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};
const GG_ANALYTICS_KEY = "G-RCEC15NC73";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Header sẽ tự nhận diện path để highlight nút tương ứng */}
        <Header />
        {children}
        <GoogleAnalytics gaId={GG_ANALYTICS_KEY} />
      </body>
    </html>
  );
}
