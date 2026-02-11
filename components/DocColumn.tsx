"use client"

import { useState } from "react";
import { MethodInfo } from '../types/index';

export const DocColumn: React.FC<{
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
