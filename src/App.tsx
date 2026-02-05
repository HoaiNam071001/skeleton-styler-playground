import React, { useState, useEffect, useRef, useCallback } from "react";
// Import trực tiếp từ source nhờ cấu hình alias ở trên

import CodeEditor from "./components/CodeEditor";
import PreviewPane from "./components/PreviewPane";
import { getCodeTemplates } from "./constants/templates";
import { ElementBuilder, SkeletonAnimation, SkeletonTemplate, StyleBuilder } from "skeleton-styler";

// --- Types Definitions ---
interface MethodInfo {
  name: string;
  args: string;
}

interface DocCategories {
  style: MethodInfo[];
  builder: MethodInfo[];
  staticMethods: MethodInfo[];
}

interface ToastState {
  msg: string;
  show: boolean;
}

// --- Constants ---
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

const App: React.FC = () => {
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
      // 2. THÊM "SkeletonTemplate" VÀO DANH SÁCH THAM SỐ CỦA new Function
      const executeUserCode = new Function(
        "ElementBuilder",
        "SkeletonAnimation",
        "StyleBuilder",
        "SkeletonTemplate", // <--- Thêm dòng này
        `return (function() {
          ${code.trim().startsWith(".") ? "return new ElementBuilder().markAsSkeleton()" + code : "return " + code}
        })()`,
      );

      // 3. TRUYỀN GIÁ TRỊ SkeletonTemplate VÀO HÀM THỰC THI
      const result = executeUserCode(
        ElementBuilder,
        SkeletonAnimation,
        StyleBuilder,
        SkeletonTemplate, // <--- Thêm dòng này
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    const timer = setTimeout(() => runCode(), 0);
    return () => clearTimeout(timer);
  }, [runCode]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToast({ msg: `Copied: ${text}`, show: true });
      setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2000);
    });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 text-slate-700 font-sans">
      <header className="h-[60px] bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
          🦴 SkeletonStyler
          <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full font-semibold">
            ^5.0.2
          </span>
        </div>
        <div className="text-sm text-slate-500">API & Playground</div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        {/* --- LEFT SIDEBAR: TEMPLATES --- */}
        <aside className="w-[220px] bg-white border-r border-slate-200 overflow-y-auto shrink-0 flex flex-col">
          <div className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
            Templates
          </div>
          <div className="flex-1">
            {getCodeTemplates().map((template) => (
              <button
                key={template.name}
                onClick={() => setCode(template.code)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors border-b border-slate-50 hover:bg-slate-50 ${
                  code === template.code
                    ? "bg-sky-50 text-sky-700 font-semibold border-r-2 border-r-sky-500"
                    : "text-slate-600"
                }`}
              >
                {template.name}
              </button>
            ))}
          </div>
        </aside>

        {/* --- EDITOR & PREVIEW --- */}
        <div className="flex flex-1 overflow-hidden">
          <CodeEditor code={code} onRun={setCode} />
          <PreviewPane previewRef={previewContainerRef} error={error} />
        </div>
      </main>

      {/* --- BOTTOM: API DOCS --- */}
      <div className="h-[40vh] bg-white border-t border-slate-200 flex flex-col shrink-0 mb-4">
        <div className="px-6 py-3 font-semibold text-sm border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <span>API Reference</span>
          <span className="font-normal text-xs text-slate-400">
            Click to copy function signature
          </span>
        </div>
        <div className="flex flex-1 overflow-hidden divide-x divide-slate-200">
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
        className={`fixed bottom-8 right-8 bg-slate-800 text-white px-6 py-3 rounded-md text-sm shadow-lg transition-all duration-300 pointer-events-none z-50 ${toast.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        {toast.msg}
      </div>
    </div>
  );
};

// --- Sub-component for Doc Column ---
const DocColumn: React.FC<{
  title: string;
  methods: MethodInfo[];
  prefix: string;
  onCopy: (text: string) => void;
}> = ({ title, methods, prefix, onCopy }) => {
  // 1. State lưu từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Logic lọc danh sách method (không phân biệt hoa thường)
  const filteredMethods = methods.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto flex flex-col min-w-[250px]">
      {/* Header Sticky chứa Title và Input Search */}
      <div className="sticky top-0 bg-white/95 backdrop-blur px-4 py-3 border-b border-slate-100 z-10 shadow-sm">
        <div className="text-xs font-bold text-slate-500 mb-2">{title}</div>

        {/* Ô Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Filter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-100 text-slate-600 text-xs border border-transparent focus:border-sky-400 focus:bg-white rounded px-2 py-1.5 outline-none transition-all placeholder:text-slate-400"
          />
          {/* Nút X để clear search (hiện khi có text) */}
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Danh sách method sau khi lọc */}
      <div className="py-2">
        {filteredMethods.length > 0 ? (
          filteredMethods.map((method) => (
            <div
              key={method.name}
              onClick={() => onCopy(`${prefix}${method.name}${method.args}`)}
              className="group font-mono px-4 py-1.5 cursor-pointer text-teal-600 hover:text-blue-600 hover:bg-sky-50 text-[13px] flex justify-between items-center transition-colors"
            >
              <span className="truncate">
                {/* Highlight phần prefix cho dễ nhìn */}
                <span className="text-slate-400">{prefix}</span>
                {method.name}
                <span className="text-slate-400 text-xs">{method.args}</span>
              </span>
              <span className="opacity-0 group-hover:opacity-100 text-xs text-slate-400 shrink-0 ml-2">
                📋
              </span>
            </div>
          ))
        ) : (
          // Hiển thị khi không tìm thấy kết quả
          <div className="px-4 py-4 text-center text-xs text-slate-400 italic">
            No methods found
          </div>
        )}
      </div>
    </div>
  );
};
export default App;
