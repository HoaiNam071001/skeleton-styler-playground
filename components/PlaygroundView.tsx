"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { ElementBuilder, SkeletonAnimation, SkeletonTemplate, StyleBuilder } from "skeleton-styler";
import { DocColumn } from "./DocColumn";
import CodeEditor from "./CodeEditor";
import PreviewPane from "./PreviewPane";
import { TEMPLATE_GROUPS } from '../constants/templates';
import { DocCategories, MethodInfo, ToastState } from "../types";

const DEFAULT_CODE = `new ElementBuilder()
  .s_flex()
  .s_gap("16px")
  .append(
     new ElementBuilder().s_w(60).s_h(60).s_roundedFull().markAsSkeleton(),
     new ElementBuilder().s_flex1().s_flexColumn().s_gap(8).append(
        new ElementBuilder().s_w("80%").s_h(20).markAsSkeleton(),
        new ElementBuilder().s_w("50%").s_h(15).markAsSkeleton()
     )
  )`;

export const PlaygroundView: React.FC = () => {
  // --- State ---
  const [code, setCode] = useState<string>(DEFAULT_CODE);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>({ msg: "", show: false });
  const [docs, setDocs] = useState<DocCategories>({
    style: [],
    builder: [],
    staticMethods: [],
  });

  const previewContainerRef = useRef<HTMLDivElement>(null);

  const runCode = useCallback(() => {
    if (!previewContainerRef.current) return;
    previewContainerRef.current.innerHTML = "";
    setError(null);
    if (!code.trim()) return;

    try {
      const executeUserCode = new Function(
        "ElementBuilder",
        "SkeletonAnimation",
        "StyleBuilder",
        "SkeletonTemplate",
        `return (function() {
          ${code.trim().startsWith(".") ? "return new ElementBuilder().markAsSkeleton()" + code : "return " + code}
        })()`,
      );

      const result = executeUserCode(
        ElementBuilder,
        SkeletonAnimation,
        StyleBuilder,
        SkeletonTemplate,
      );

      if (result instanceof HTMLElement) {
        previewContainerRef.current.appendChild(result);
      } else if (result && typeof result.generate === "function") {
        previewContainerRef.current.appendChild(result.generate());
      }
    } catch (err: any) {
      console.error(err);
      setError(`Runtime Error: ${err.message}`);
    }
  }, [code]);

  // --- Logic: Generate Docs (Reflection) ---
  useEffect(() => {
    const getProtoMethods = (obj: any) => {
      const props = new Set<string>();
      let currentObj = obj;
      while (currentObj && currentObj !== Object.prototype) {
        Object.getOwnPropertyNames(currentObj).forEach((item) =>
          props.add(item),
        );
        currentObj = Object.getPrototypeOf(currentObj);
      }
      return Array.from(props);
    };

    const dummyInstance = new ElementBuilder();

    const instanceKeys = Object.keys(dummyInstance);
    const protoKeys = getProtoMethods(ElementBuilder.prototype);

    const allMethods = Array.from(new Set([...instanceKeys, ...protoKeys]));

    const extractArgs = (func: any, name: string): string => {
      try {
        if (!func) return "()";
        const str = func.toString();
        let args = "()";
        const argMatch = str.slice(str.indexOf("("), str.indexOf(")") + 1);
        if (argMatch) args = argMatch;

        if (!str.startsWith("function") && !str.startsWith(name)) {
          const arrowArgs = str.split("=>")[0].trim();
          if (arrowArgs)
            args = arrowArgs.startsWith("(") ? arrowArgs : `(${arrowArgs})`;
        }
        return args.length > 20 ? "(...)" : args;
      } catch {
        return "()";
      }
    };

    const processMethods = (
      names: string[],
      source: any,
      _isStatic = false,
    ): MethodInfo[] => {
      return names
        .map((name) => {
          const func = source[name];
          return {
            name,
            args: extractArgs(func, name),
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
    };

    const styleMethodsRaw = allMethods.filter((m) => m.startsWith("s_"));
    const builderMethodsRaw = allMethods.filter(
      (m) =>
        (!m.startsWith("s_") &&
          !m.startsWith("_") &&
          m !== "constructor" &&
          typeof (dummyInstance as any)[m] === "function") ||
        typeof (ElementBuilder.prototype as any)[m] === "function",
    );

    const staticMethodsRaw = Object.getOwnPropertyNames(ElementBuilder).filter(
      (m) =>
        typeof (ElementBuilder as any)[m] === "function" &&
        !["length", "name", "prototype", "fromJSON"].includes(m),
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDocs({
      style: processMethods(styleMethodsRaw, dummyInstance),
      builder: processMethods(builderMethodsRaw, dummyInstance),
      staticMethods: processMethods(staticMethodsRaw, ElementBuilder, true),
    });
  }, []);

  // --- Run code on mount ---
  useEffect(() => {
    const timer = setTimeout(() => runCode(), 0);
    return () => clearTimeout(timer);
  }, [runCode]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToast({ msg: `Copied: ${text}`, show: true });
      setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2000);
    });
  };

  const renderSidebar = () => (
    <aside className="w-full md:w-[220px] bg-white border-b md:border-b-0 md:border-r border-slate-200 overflow-y-auto shrink-0 flex flex-col max-h-[25vh] md:max-h-none md:h-full">
      <div className="sticky top-0 p-4 text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 bg-slate-50 z-10">
        Templates Library
      </div>
      <div className="flex-1 pb-4">
        {TEMPLATE_GROUPS.map((group, groupIdx) => (
          <div key={groupIdx} className="mb-2">
            <div className="px-4 py-2 mt-2 text-[11px] font-bold text-slate-400 uppercase tracking-wide">
              {group.group}
            </div>
            {group.items.map((item) => (
              <button
                key={item.name}
                onClick={() => setCode(item.code)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors md:border-l-2 ${
                  code === item.code
                    ? "md:border-sky-500 bg-sky-50 text-sky-700 font-medium"
                    : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );

  return (
    <div className="flex flex-col h-[calc(100dvh-64px)] md:h-[calc(100vh-64px)] overflow-hidden bg-slate-50 text-slate-700 font-sans animate-fade-in">
      <main className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* --- LEFT SIDEBAR: TEMPLATES --- */}
        {renderSidebar()}

        {/* --- EDITOR & PREVIEW --- */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden relative">
          <CodeEditor code={code} onRun={setCode} />
          <PreviewPane previewRef={previewContainerRef} error={error} />
        </div>
      </main>

      {/* --- BOTTOM: API DOCS --- */}
      <div className="h-[35vh] md:h-[40vh] bg-white border-t border-slate-200 flex flex-col shrink-0 mb-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="px-4 md:px-6 py-3 font-semibold text-sm border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <span>API Reference</span>
          <span className="font-normal text-[10px] md:text-xs text-slate-400">
            Click to copy function signature
          </span>
        </div>
        {/* Đổi thành overflow-x-auto để vuốt ngang trên Mobile */}
        <div className="flex flex-row flex-1 overflow-x-auto overflow-y-hidden divide-x divide-slate-200">
          <DocColumn
            title="🎨 Style Methods"
            methods={docs.style}
            prefix="."
            onCopy={copyToClipboard}
          />
          <DocColumn
            title="🏗️ Builder Methods"
            methods={docs.builder}
            prefix="."
            onCopy={copyToClipboard}
          />
          <DocColumn
            title="⚙️ Static Methods"
            methods={docs.staticMethods}
            prefix="ElementBuilder."
            onCopy={copyToClipboard}
          />
        </div>
      </div>

      {/* TOAST UI */}
      <div
        className={`fixed bottom-4 left-4 right-4 md:bottom-8 md:right-8 md:left-auto text-center md:text-left bg-slate-800 text-white px-6 py-3 rounded-md text-sm shadow-lg transition-all duration-300 pointer-events-none z-50 ${toast.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        {toast.msg}
      </div>
    </div>
  );
};
