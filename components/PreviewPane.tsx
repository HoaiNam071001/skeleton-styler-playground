import React from "react";

interface PreviewPaneProps {
  previewRef: React.RefObject<HTMLDivElement | null>;
  error: string | null;
}

const PreviewPane: React.FC<PreviewPaneProps> = ({ previewRef, error }) => {
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white relative">
      <div className="px-3 md:px-4 py-2 bg-slate-50 border-b border-slate-200 font-semibold text-[10px] md:text-xs uppercase text-slate-500 flex justify-between shrink-0">
        Preview
        <span className="font-normal text-[9px] md:text-[10px]">Viewport: Responsive</span>
      </div>

      <div
        ref={previewRef}
        id="app-preview"
        className="flex-1 p-4 md:p-8 overflow-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]"
      >
        {/* DOM từ skeleton-styler sẽ được render tại đây */}
      </div>

      {error && (
        <div className="absolute bottom-0 left-0 right-0 max-h-[150px] overflow-auto bg-red-50 border-t border-red-100 p-3 md:p-4 text-red-500 font-mono text-xs md:text-sm shadow-lg z-20">
          {error}
        </div>
      )}
    </div>
  );
};

export default PreviewPane;
