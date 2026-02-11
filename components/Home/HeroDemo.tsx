"use client";

import React, { useEffect, useRef } from "react";
import { ElementBuilder, SkeletonTemplate } from "skeleton-styler";
import { Zap, FileCode } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const DEMO_CODE = `new ElementBuilder()
  .s_w(340).s_p(20).s_bg("white").s_rounded(24)
  .s_shadow("lg").s_border("1px solid #e2e8f0")
  .s_flexColumn().s_gap(20)
  .append(
    SkeletonTemplate.Flex({ gap: 16 }).append(
      SkeletonTemplate.Avatar({ size: 48 }),
      new ElementBuilder().s_flexColumn().s_gap(8).append(
        SkeletonTemplate.Line({ w: 120, h: 14 }),
        SkeletonTemplate.Line({ w: 80, h: 12 })
      )
    ),
    new ElementBuilder().s_wFull().s_h(140).s_rounded(16).markAsSkeleton(),
    new ElementBuilder().s_flexColumn().s_gap(10).append(
      SkeletonTemplate.Line({ h: 14 }).s_randomWidth(40, 100, "%"),
      SkeletonTemplate.Line({ h: 14 }).s_randomWidth(40, 80, "%")
    )
  ).generate();`;

export const HeroDemo = () => {
  const demoPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (demoPreviewRef.current) {
      demoPreviewRef.current.innerHTML = "";
      const el = new ElementBuilder()
        .s_w(340).s_p(20).s_bg("white").s_rounded(24)
        .s_shadow("0 10px 15px -3px rgb(0 0 0 / 0.1)")
        .s_border("1px solid #e2e8f0")
        .s_flexColumn().s_gap(20)
        .append(
          SkeletonTemplate.Flex({ gap: 16 }).append(
            SkeletonTemplate.Avatar({ size: 48 }),
            new ElementBuilder().s_flexColumn().s_gap(8).append(
                SkeletonTemplate.Line({ w: 120, h: 14 }),
                SkeletonTemplate.Line({ w: 80, h: 12 })
            )
          ),
          new ElementBuilder().s_wFull().s_h(140).s_rounded(16).markAsSkeleton(),
          new ElementBuilder().s_flexColumn().s_gap(10).append(
              SkeletonTemplate.Line({ h: 14 }).s_randomWidth(40, 100, "%"),
              SkeletonTemplate.Line({ h: 14 }).s_randomWidth(40, 80, "%")
          )
        )
        .generate();
      demoPreviewRef.current.appendChild(el);
    }
  }, []);

  return (
    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Code Window */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative h-[420px] rounded-xl overflow-hidden border border-slate-800 bg-[#1e1e1e] shadow-2xl flex flex-col">
           <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-black/20 shrink-0">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
               <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
               <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
             </div>
             <div className="flex items-center gap-2 text-xs text-slate-400 font-mono opacity-80">
               <FileCode size={12} /> hero-demo.ts
             </div>
             <div className="w-10"></div>
           </div>
           <div className="flex-1 overflow-auto custom-scrollbar">
             <SyntaxHighlighter
               language="typescript"
               style={vscDarkPlus}
               customStyle={{ margin: 0, padding: "1.5rem", fontSize: "13px", background: "transparent" }}
               showLineNumbers={true}
               wrapLines={true}
             >
               {DEMO_CODE}
             </SyntaxHighlighter>
           </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="h-[420px] bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/80 px-4 py-1.5 rounded-full border border-slate-200 shadow-sm backdrop-blur-sm">
            <Zap size={14} className="fill-yellow-400 stroke-yellow-500" /> Live Render
          </div>
          <div ref={demoPreviewRef} className="transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl" />
        </div>
      </div>
    </div>
  );
};