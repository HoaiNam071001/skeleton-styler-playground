// src/app/playground/page.tsx
"use client";

import dynamic from "next/dynamic";

// Import PlaygroundView và tắt SSR cho nó
const PlaygroundView = dynamic(
  () => import("../../components/PlaygroundView").then((mod) => mod.PlaygroundView),
  { ssr: false, loading: () => <div className="h-screen flex items-center justify-center">Loading Editor...</div> }
);

export default function PlaygroundPage() {
  return (
    <main className=" bg-slate-50">
      <PlaygroundView />
    </main>
  );
}