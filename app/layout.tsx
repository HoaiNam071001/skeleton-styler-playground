// src/app/layout.tsx
import { Metadata } from "next";
import { Header } from "../components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkeletonStyler",
  description: "Fluent API for Web Skeletons",
  // Thêm đoạn này vào
  icons: {
    icon: "/logo.svg", // Next.js sẽ tự tìm trong thư mục public
    apple: "/logo.svg", // Dùng luôn cho icon trên iPhone/iPad nếu muốn
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Header sẽ tự nhận diện path để highlight nút tương ứng */}
        <Header /> 
        {children}
      </body>
    </html>
  );
}