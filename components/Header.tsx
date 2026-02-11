"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const pathname = usePathname();

  // Hàm kiểm tra xem Link có đang active hay không
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50 transition-all duration-300">
      {/* Logo - Bọc trong Link để về trang chủ */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-sky-500/30 group-hover:scale-105 transition-transform">
          S
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-slate-900 leading-tight group-hover:text-sky-600 transition-colors">
            SkeletonStyler
          </span>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
            Library
          </span>
        </div>
      </Link>

      {/* Thanh điều hướng */}
      <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
        <Link
          href="/"
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
            isActive("/")
              ? "bg-white text-sky-600 shadow-sm"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
          }`}
        >
          Home
        </Link>
        <Link
          href="/playground"
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
            isActive("/playground")
              ? "bg-white text-sky-600 shadow-sm"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
          }`}
        >
          Playground
        </Link>
      </nav>

      {/* Version Tag */}
      <div className="hidden md:block text-xs bg-sky-50 text-sky-700 px-3 py-1 rounded-full font-bold border border-sky-100">
        ^v5.0.2
      </div>
    </header>
  );
};