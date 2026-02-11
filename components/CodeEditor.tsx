"use client"

import React, { useRef, useState, useEffect } from "react";
import Editor, { OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  onRun: (currentCode: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onRun }) => {
  const editorRef = useRef<any>(null);
  const [copied, setCopied] = useState(false);

  // Hàm xử lý khi Editor đã load xong
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Cấu hình thêm cho TypeScript/JavaScript (Optional)
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true, // Tắt check lỗi logic sâu để tránh báo đỏ các biến global chưa khai báo
      noSyntaxValidation: false, // Vẫn check lỗi cú pháp (thiếu ngoặc, phẩy...)
    });
  };

  const handleRunClick = () => {
    if (editorRef.current) {
      // Lấy giá trị trực tiếp từ editor
      onRun(editorRef.current.getValue());
    }
  };

  const handleCopy = async () => {
    if (!editorRef.current) return;
    try {
      await navigator.clipboard.writeText(editorRef.current.getValue());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="w-[50%] flex flex-col bg-[#1e1e1e] border-r border-slate-700 h-full">
      {/* Header */}
      <div className="h-[40px] bg-[#252526] flex items-center justify-between px-4 border-b border-[#333] shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
            TS / JS Editor
          </span>
        </div>

        <div className="flex gap-2">
           {/* Copy Button */}
           <button
            onClick={handleCopy}
            className={`px-3 py-1 rounded text-xs font-medium transition-all
              ${copied ? "text-emerald-400" : "text-gray-400 hover:text-white"}`}
            title="Copy code"
          >
            {copied ? "Copied!" : "Copy"}
          </button>

          {/* Run Button */}
          <button
            onClick={handleRunClick}
            className="bg-emerald-600 hover:bg-emerald-500 text-white border-none px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
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
          theme="vs-dark" // Theme giống VS Code
          value={code} // Giá trị từ prop (khi chọn template)
          onMount={handleEditorDidMount}
          // Các tùy chọn để editor gọn gàng hơn
          options={{
            minimap: { enabled: false }, // Tắt map nhỏ bên phải
            fontSize: 13,
            wordWrap: "on", // Tự xuống dòng
            scrollBeyondLastLine: false,
            automaticLayout: true, // Tự resize theo khung cha
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
