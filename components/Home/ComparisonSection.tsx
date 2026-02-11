"use client";

import React from "react";
import { Check, X, Minus, HelpCircle, Code2, Layers, Cpu, Globe } from "lucide-react";

// --- Dữ liệu so sánh ---
const FEATURES = [
  {
    name: "Syntax Style",
    icon: Code2,
    styler: "Fluent API (Chainable)",
    rcl: "SVG Coordinates (Complex)",
    rls: "Props / Component",
  },
  {
    name: "Framework Support",
    icon: Globe,
    styler: "All (React, Vue, Angular, Vanilla)",
    rcl: "React / React Native",
    rls: "React Only",
  },
  {
    name: "Tech Stack",
    icon: Layers,
    styler: "Standard HTML/CSS",
    rcl: "SVG (Heavy DOM)",
    rls: "HTML/CSS",
  },
  {
    name: "Custom Shapes",
    icon: null,
    styler: true, // Có (qua border-radius, width, height)
    rcl: true,  // Rất mạnh
    rls: false, // Hạn chế
  },
  {
    name: "Animation Control",
    icon: null,
    styler: "Full (Duration, Easing, Type)",
    rcl: "Limited props",
    rls: "Basic",
  },
];

export const ComparisonTable = () => {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          How we stack up
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          See why developers are switching from complex SVG loaders to our Fluent Builder.
        </p>
      </div>

      <div className="overflow-x-auto pb-4">
        <table className="w-full min-w-[700px] border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="p-4 border-b-2 border-slate-100 min-w-[200px]"></th>
              {/* SkeletonStyler Column (Highlight) */}
              <th className="p-4 border-b-2 border-sky-500 bg-sky-50/50 rounded-t-xl text-sky-700 text-lg font-bold w-[25%]">
                SkeletonStyler
                <div className="text-[10px] font-normal uppercase tracking-wider mt-1 text-sky-600/70">
                  Recommended
                </div>
              </th>
              {/* Competitors */}
              <th className="p-4 border-b-2 border-slate-100 text-slate-500 font-semibold w-[25%]">
                React Content Loader
              </th>
              <th className="p-4 border-b-2 border-slate-100 text-slate-500 font-semibold w-[25%]">
                React Loading Skeleton
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {FEATURES.map((feature, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                {/* Feature Name */}
                <td className="p-4 font-medium text-slate-700 flex items-center gap-2">
                  {feature.icon && <feature.icon size={16} className="text-slate-400" />}
                  {feature.name}
                </td>

                {/* SkeletonStyler Value */}
                <td className="p-4 bg-sky-50/30 font-bold text-slate-800 border-x border-sky-100 shadow-[inset_0_0_20px_rgba(224,242,254,0.2)]">
                  {typeof feature.styler === "boolean" ? (
                    feature.styler ? <Check className="text-emerald-500" /> : <X className="text-red-400" />
                  ) : (
                    feature.styler
                  )}
                </td>

                {/* RCL Value */}
                <td className="p-4 text-slate-500">
                  {typeof feature.rcl === "boolean" ? (
                    feature.rcl ? <Check className="text-emerald-500" /> : <X className="text-red-400" />
                  ) : (
                    feature.rcl
                  )}
                </td>

                {/* RLS Value */}
                <td className="p-4 text-slate-500">
                  {typeof feature.rls === "boolean" ? (
                    feature.rls ? <Check className="text-emerald-500" /> : <X className="text-red-400" />
                  ) : (
                    feature.rls
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary / Verdict */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                When to use <span className="text-slate-500">others</span>?
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
                If you need to draw <strong>artistic, complex vector illustrations</strong> as loaders (like a map or a very specific logo shape), 
                <em>React Content Loader</em> is still the king of SVGs.
            </p>
        </div>
        <div className="p-6 rounded-2xl bg-sky-50 border border-sky-100">
            <h4 className="font-bold text-sky-900 mb-2 flex items-center gap-2">
                When to use <span className="text-sky-600">SkeletonStyler</span>?
            </h4>
            <p className="text-sm text-sky-800 leading-relaxed">
                When you need to build <strong>UI layouts quickly</strong> (Cards, Lists, Profiles) that are responsive, 
                lightweight, and work across <strong>any project/framework</strong> without learning new props API.
            </p>
        </div>
      </div>
    </div>
  );
};