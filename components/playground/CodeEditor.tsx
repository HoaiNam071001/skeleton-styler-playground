"use client";

import React, { useRef, useState, useEffect } from "react";
import Editor, { OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  globalCode: string; // Thêm prop cho code global
  onRun: (currentCode: string, currentGlobalCode: string) => void; // Update hàm onRun
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, globalCode, onRun }) => {
  const editorRef = useRef<any>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"main" | "global">("main");

  // State local để giữ nội dung code khi chuyển tab mà chưa cần bấm Run
  const [localCode, setLocalCode] = useState(code);
  const [localGlobalCode, setLocalGlobalCode] = useState(globalCode);

  // Đồng bộ lại khi prop từ parent thay đổi (ví dụ: người dùng chọn template mới)
  useEffect(() => {
    setLocalCode(code);
  }, [code]);
  useEffect(() => {
    setLocalGlobalCode(globalCode);
  }, [globalCode]);

  const handleEditorDidMount: OnMount = async (editor, monaco) => {
    editorRef.current = editor;

    // 1. Cấu hình compiler cho Monaco Editor để hiểu module NodeJS
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      allowNonTsExtensions: true,
    });

    try {
      // 2. Gọi API để lấy danh sách các file định nghĩa type (.d.ts)
      const res = await fetch("/api/types");

      if (res.ok) {
        const typeFiles = await res.json();

        // 3. Tiêm từng file type vào hệ thống ảo của Monaco
        typeFiles.forEach((file: { path: string; content: string }) => {
          monaco.languages.typescript.javascriptDefaults.addExtraLib(
            file.content,
            file.path,
          );
        });

        // 4. KHAI BÁO GLOBAL (Quan trọng để xóa lỗi gạch đỏ)
        // Kéo các class từ file index của thư viện ra môi trường toàn cục (global)
        const globalDeclarations = `
          // Bỏ đuôi .d.ts đi, và dùng alias để tránh trùng tên
          import {
            ElementBuilder as EB,
            SkeletonAnimation as SA,
            StyleBuilder as SB,
            SkeletonTemplate as ST
          } from './node_modules/skeleton-styler/dist/index';

          declare global {
            var ElementBuilder: typeof EB;
            var SkeletonAnimation: typeof SA;
            var StyleBuilder: typeof SB;
            var SkeletonTemplate: typeof ST;
          }
        `;

        monaco.languages.typescript.javascriptDefaults.addExtraLib(
          globalDeclarations,
          'file:///global-types.d.ts'
        );

        console.log("✅ Đã tải và cấu hình xong types cho skeleton-styler!");
      } else {
        console.error("❌ Lỗi khi fetch types: API trả về status", res.status);
      }
    } catch (err) {
      console.error("❌ Lỗi khi tải types:", err);
    }

    // 5. Bật kiểm tra lỗi (sẽ báo đỏ nếu gõ sai tên hàm, sai tham số)
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false, // Để false để Monaco bắt lỗi logic/type
      noSyntaxValidation: false,
    });
  };

  const handleRunClick = () => {
    // Truyền cả 2 code lên cho parent xử lý
    onRun(localCode, localGlobalCode);
  };

  const handleCopy = async () => {
    try {
      const textToCopy = activeTab === "main" ? localCode : localGlobalCode;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="md:max-w-[50%] flex-1 min-h-0 flex flex-col bg-[#1e1e1e] border-b lg:border-b-0 lg:border-r border-slate-700">
      {/* Header with Tabs */}
      <div className="h-[40px] bg-[#252526] flex items-center justify-between pl-0 pr-3 md:pr-4 border-b border-[#333] shrink-0">
        <div className="flex items-center h-full">
          {/* Nút Tab: Main Code */}
          <button
            onClick={() => setActiveTab("main")}
            className={`h-full px-4 text-[10px] md:text-xs font-medium uppercase tracking-wider transition-colors border-t-2 flex items-center
              ${activeTab === "main" ? "bg-[#1e1e1e] text-white border-emerald-500" : "text-gray-400 border-transparent hover:text-gray-200 hover:bg-[#2a2a2b]"}`}
          >
            Main Code
          </button>
          {/* Nút Tab: Global Config */}
          <button
            onClick={() => setActiveTab("global")}
            className={`h-full px-4 text-[10px] md:text-xs font-medium uppercase tracking-wider transition-colors border-t-2 flex items-center
              ${activeTab === "global" ? "bg-[#1e1e1e] text-white border-sky-500" : "text-gray-400 border-transparent hover:text-gray-200 hover:bg-[#2a2a2b]"}`}
          >
            Global Config
          </button>
        </div>

        <div className="flex gap-2">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`px-2 md:px-3 py-1 rounded text-[10px] md:text-xs font-medium transition-all
              ${copied ? "text-emerald-400" : "text-gray-400 hover:text-white"}`}
            title="Copy code"
          >
            {copied ? "Copied!" : "Copy"}
          </button>

          {/* Run Button */}
          <button
            onClick={handleRunClick}
            className="bg-emerald-600 hover:bg-emerald-500 text-white border-none px-2 md:px-3 py-1 rounded text-[10px] md:text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            RUN
          </button>
        </div>
      </div>

      {/* Monaco Editor Container */}
      <div className="flex-1 relative overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={activeTab === "main" ? localCode : localGlobalCode}
          onChange={(val) => {
            if (activeTab === "main") setLocalCode(val || "");
            else setLocalGlobalCode(val || "");
          }}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            wordWrap: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            fontFamily: "'Fira Code', 'Consolas', monospace",
            formatOnPaste: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
