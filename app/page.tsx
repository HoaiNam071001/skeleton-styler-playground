// src/app/page.tsx
import { Metadata } from "next";
import { HomeView } from "../components/HomeView";

const APP_URL = "https://skeleton-styler.vercel.app"; // Thay bằng domain của bạn

export const metadata: Metadata = {
  title: {
    default: "SkeletonStyler | Fluent API for UI Loading",
    template: "%s | SkeletonStyler", // Giúp các trang con tự động nối tên thương hiệu
  },
  // Description chứa nhiều cụm từ tìm kiếm (dưới 160 ký tự)
  description:
    "Create professional skeleton screens & content placeholders with a fluent, type-safe API. Lightweight & framework-agnostic. Perfect for React, Next.js, Angular, Vue, and Vanilla JS. Make beautiful, animated loading skeletons that automatically adapt to your app.",

  // Keywords: Bao phủ mọi ngóc ngách mà dev có thể tìm kiếm
  keywords: [
    "skeleton library",
    "skeleton for web",
    "react loading skeleton",
    "spinner",
    "react",
    "angular",
    "vue",
    "skeleton loading",
    "shimmer effect",
    "UI loading states",
    "skeleton screen",
    "content placeholders",
    "fluent API",
    "ghost elements UI",
    "react skeleton loader",
    "nextjs loading skeleton",
    "angular loading placeholder",
    "vue skeleton component",
    "typescript skeleton library",
    "web performance",
    "frontend skeleton tool",
    "vanilla js skeleton",
    "customizable loading skeletons",
  ],

  // Tác giả
  authors: [{ name: "Nguyen Hoai Nam" }],

  alternates: {
    canonical: APP_URL,
  },

  // OpenGraph (Khi share link qua Facebook, Zalo, LinkedIn)
  openGraph: {
    title: "SkeletonStyler - The Fluent Way to Style Skeletons",
    description:
      "Build complex loading states without writing messy CSS. Optimized for modern web frameworks.",
    url: APP_URL,
    siteName: "SkeletonStyler Documentation",
    images: [
      // {
      //   url: `${APP_URL}/og-image.png`, // Bạn nên tạo 1 ảnh og-image 1200x630
      //   width: 1200,
      //   height: 630,
      //   alt: "SkeletonStyler Preview",
      // },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card (Khi share link qua X/Twitter)
  twitter: {
    card: "summary_large_image",
    title: "SkeletonStyler | Fast & Fluent Skeleton Loader Library",
    description:
      "Stop maintaining complex CSS for loading states. Use a type-safe API instead.",
    // images: [`${APP_URL}/og-image.png`],
  },

  // Robots (Cho phép Google index)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* HomeView bây giờ chỉ nhận prop điều hướng sang URL /playground */}
      <HomeView />
    </main>
  );
}
