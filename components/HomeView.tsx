import React from "react";
import Link from "next/link";
import { Footer } from "./Footer";
import {
  Rocket,
  Terminal,
  Box,
  ArrowRight,
  CheckCircle2,
  Atom,
  Zap,
  Blocks,
  Code2,
} from "lucide-react";
import { HeroDemo } from "./Home/HeroDemo";
import { FrameworkTabs } from "./Home/FrameworkTabs";
import { HtmlOutput } from "./Home/HtmlOutput";

// Component UI nhỏ (Tĩnh thì cứ để trong Server Component)
const SectionBadge = ({
  icon: Icon,
  children,
}: {
  icon: any;
  children: React.ReactNode;
}) => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-200 bg-sky-50 text-sky-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
    <Icon size={14} className="stroke-[3]" />
    <span>{children}</span>
  </div>
);

export const HomeView = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] animate-fade-in-up">
      {/* --- HERO SECTION (Server Rendering phần text & layout) --- */}
      <section className="relative flex-1 flex flex-col items-center pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 via-white to-white -z-10" />

        {/* <SectionBadge icon={Rocket}>v5.0.2 Stable Release</SectionBadge> */}

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight text-center max-w-5xl leading-[1.1]">
          Build Complex Skeletons <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">
            With Fluent Precision
          </span>
        </h1>

        <p className="max-w-2xl text-lg text-slate-600 mb-10 leading-relaxed text-center">
          <strong>skeleton-styler</strong> creates high-performance loading
          states using a type-safe Fluent API. Forget maintaining complex CSS
          files.
        </p>

        <div className="flex gap-4 mb-20 justify-center">
          {/* Dùng Link thay vì router.push để tối ưu SSR prefetching */}
          <Link
            href="/playground"
            className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-1 flex items-center gap-2"
          >
            <Terminal size={18} /> Try Playground
          </Link>
          <Link
            href="https://www.npmjs.com/package/skeleton-styler"
            target="_blank"
            className="px-8 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-full border border-slate-200 shadow-sm transition-all hover:-translate-y-1 flex items-center gap-2"
          >
            <Box size={18} /> Install Package
          </Link>
        </div>

        {/* Nhúng Component Client vào đây */}
        <HeroDemo />
      </section>

      {/* --- FRAMEWORK SECTION --- */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 flex items-center justify-center gap-3">
              <Blocks className="text-sky-500" /> Framework Agnostic
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Designed to be flexible. Whether you use modern frameworks or
              vanilla JavaScript, SkeletonStyler adapts to your stack.
            </p>
          </div>

          {/* Nhúng Component Client Tabs vào đây */}
          <FrameworkTabs />
        </div>
      </section>

      {/* ---  SECTION: HTML OUTPUT DEMO --- */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 flex items-center justify-center gap-3">
              <Code2 className="text-indigo-500" /> Zero Runtime Overhead
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              What you see is what you get. The library compiles down to
              standard, inline-styled HTML elements. No hidden CSS classes, no
              extra stylesheets.
            </p>
          </div>

          {/* Component mới được thêm vào đây */}
          <HtmlOutput />
        </div>
      </section>

      {/* --- FEATURES GRID (Hoàn toàn tĩnh -> Server Render) --- */}
      <section className="bg-slate-50 py-24 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fluent API",
                desc: "Chain methods like a natural sentence. Readable, maintainable, and fully typed.",
                icon: CheckCircle2,
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
              {
                title: "Full Customization",
                desc: "Control every CSS property, animation timing, and layout structure.",
                icon: Atom,
                color: "text-indigo-600",
                bg: "bg-indigo-50",
              },
              {
                title: "Ultra Lightweight",
                desc: "Zero heavy dependencies. Generated DOM nodes are optimized for performance.",
                icon: Zap,
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div
                  className={`mb-6 w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-100 ${f.bg} ${f.color}`}
                >
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                  {f.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 text-sky-600 font-bold hover:text-sky-700 hover:gap-3 transition-all"
            >
              Explore Documentation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
