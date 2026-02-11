"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FileCode, Code2, ArrowRight, FileJson } from "lucide-react";

const JS_CODE = `new ElementBuilder()
  .s_flex()
  .s_gap("16px")
  .append(
     new ElementBuilder()
       .s_w(60).s_h(60).s_roundedFull()
       .markAsSkeleton(),
     new ElementBuilder()
       .s_flex1().s_flexColumn().s_gap(8)
       .append(
          new ElementBuilder()
            .s_w("80%").s_h(20)
            .markAsSkeleton(),
          new ElementBuilder()
            .s_w("50%").s_h(15)
            .markAsSkeleton()
       )
  )`;

// Format lại HTML string để hiển thị đẹp hơn (có xuống dòng)
const HTML_CODE = `<div style="display: flex; gap: 16px;">
  <div style="width: 60px; height: 60px; border-radius: 9999px; background: rgb(227, 227, 227); animation: 2.5s ease 0s infinite normal none running pulse;"></div>
  
  <div style="flex: 1 1 auto; display: flex; flex-direction: column; gap: 8px;">
    <div style="width: 80%; height: 20px; background: rgb(227, 227, 227); border-radius: 4px; animation: 2.5s ease 0s infinite normal none running pulse;"></div>
    <div style="width: 50%; height: 15px; background: rgb(227, 227, 227); border-radius: 4px; animation: 2.5s ease 0s infinite normal none running pulse;"></div>
  </div>
</div>`;

const SimpleWindow = ({ title, code, lang, icon: Icon }: any) => (
  <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#1e1e1e] shadow-2xl flex flex-col h-full w-full">
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-black/20 shrink-0">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono opacity-80">
        <Icon size={14} />
        {title}
      </div>
      <div className="w-8" />
    </div>

    {/* Content với Scrollbar */}
    <div className="flex-1 overflow-hidden relative group">
      {/* Lớp phủ scrollbar tùy chỉnh */}
      <div className="absolute inset-0 overflow-auto custom-scrollbar p-4">
        <SyntaxHighlighter
          language={lang}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: 0, // Padding đã được xử lý ở div cha
            fontSize: "13px",
            lineHeight: "1.6",
            background: "transparent",
            height: "100%",
          }}
          showLineNumbers={true}
          wrapLines={true} // Bắt buộc xuống dòng
          lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }} // CSS ép xuống dòng nếu quá dài
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  </div>
);

export const HtmlOutput = () => {
  return (
    // THÊM: min-w-0 vào các div con để tránh Grid blowout
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-8 items-center">
      
      {/* 1. Input: JS */}
      <div className="flex flex-col gap-4 w-full min-w-0">
        <div className="text-center lg:text-left mb-2">
            <h3 className="text-lg font-bold text-slate-900 flex items-center justify-center lg:justify-start gap-2">
                <Code2 className="text-sky-600"/> Fluent Builder
            </h3>
            <p className="text-slate-500 text-sm">You write clean, chainable TypeScript.</p>
        </div>
        <div className="h-[350px]">
             <SimpleWindow title="builder.ts" code={JS_CODE} lang="typescript" icon={FileCode} />
        </div>
      </div>

      {/* 2. Arrow Indicator */}
      <div className="flex justify-center text-slate-300 py-4 lg:py-0 shrink-0">
        <ArrowRight size={32} className="rotate-90 lg:rotate-0" />
      </div>

      {/* 3. Output: HTML */}
      <div className="flex flex-col gap-4 w-full min-w-0">
        <div className="text-center lg:text-left mb-2">
            <h3 className="text-lg font-bold text-slate-900 flex items-center justify-center lg:justify-start gap-2">
                <FileJson className="text-emerald-600"/> Standard DOM
            </h3>
            <p className="text-slate-500 text-sm">It generates pure, inline-styled HTML.</p>
        </div>
        <div className="h-[350px]">
            <SimpleWindow title="output.html" code={HTML_CODE} lang="html" icon={FileCode} />
        </div>
      </div>
    </div>
  );
};