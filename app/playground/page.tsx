// src/app/playground/page.tsx
"use client";

import dynamic from "next/dynamic";

const PlaygroundView = dynamic(
  () => import("../../components/PlaygroundView").then((mod) => mod.PlaygroundView),
  { 
    ssr: false, 
    loading: () => (
      <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-slate-50 gap-4">
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">Initializing Editor...</p>
      </div>
    ) 
  }
);

export default function PlaygroundPage() {
  return (
    <main className=" bg-slate-50">
      <PlaygroundView />
    </main>
  );
}