// src/app/page.tsx
import { Metadata } from "next";
import { HomeView } from '../components/HomeView';

const APP_URL = "https://skeleton-styler.vercel.app"; // Thay bằng domain của bạn

export const metadata: Metadata = {
  // Title tối ưu từ khóa (dưới 60 ký tự)
  title: "SkeletonStyler | Fluent API for High-Performance UI Loading Skeletons",
  
  // Description chứa nhiều cụm từ tìm kiếm (dưới 160 ký tự)
  description: "Create beautiful, type-safe skeleton loading screens in seconds. A lightweight, framework-agnostic library for React, Angular, Vue, and Vanilla JS.",
  
  // Keywords (Dù Google ít dùng nhưng các công cụ khác vẫn quét)
  keywords: [
    "skeleton loading", "skeleton screen", "placeholder animation", 
    "UI loading states", "fluent api", "frontend development tool", 
    "react skeleton loader", "angular loading placeholder", "vue skeleton components",
    "web performance", "typescript library", "skeleton"
  ],

  // Tác giả
  authors: [{ name: "Nguyen Hoai Nam" }],

  alternates: {
    canonical: APP_URL,
  },

  // OpenGraph (Khi share link qua Facebook, Zalo, LinkedIn)
  openGraph: {
    title: "SkeletonStyler - The Fluent Way to Style Skeletons",
    description: "Build complex loading states without writing messy CSS. Optimized for modern web frameworks.",
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
    description: "Stop maintaining complex CSS for loading states. Use a type-safe API instead.",
    // images: [`${APP_URL}/og-image.png`],
  },

  // Robots (Cho phép Google index)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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