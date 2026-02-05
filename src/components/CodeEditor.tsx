import React, { useState, useEffect } from "react";

interface CodeEditorProps {
  code: string;
  onRun: (currentCode: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onRun }) => {
  const [localCode, setLocalCode] = useState<string>(code);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLocalCode(code);
  }, [code]);

  const handleRunClick = () => {
    onRun(localCode);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(localCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="w-[50%] flex flex-col bg-[#1e1e1e] border-r border-slate-700">
      {/* Header */}
      <div className="h-[40px] bg-[#252526] flex items-center justify-between px-4 border-b border-[#333] shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Input Code</span>
        </div>
        <button
          onClick={handleRunClick}
          className="bg-emerald-500 hover:bg-emerald-600 active:translate-y-[1px] text-white border-none px-4 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          RUN CODE
        </button>
      </div>

      {/* Editor Area with Copy Button */}
      <div className="flex-1 relative group">
        <textarea
          id="code-input"
          spellCheck={false}
          value={localCode}
          onChange={(e) => setLocalCode(e.target.value)}
          className="w-full h-full bg-[#1e1e1e] text-[#d4d4d4] border-none p-4 font-mono text-sm leading-relaxed resize-none outline-none whitespace-pre"
        />

        {/* Copy Button - Chỉ hiện khi hover vào vùng editor */}
        <button
          onClick={handleCopy}
          className={`absolute top-0 right-4 p-2 rounded-md border border-slate-600 bg-[#2d2d2d] text-slate-300
            opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[#3d3d3d] hover:text-white
            flex items-center gap-1.5 text-xs font-medium
            ${copied ? "border-emerald-500 text-emerald-500 opacity-100" : ""}`}
          title="Copy code"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
