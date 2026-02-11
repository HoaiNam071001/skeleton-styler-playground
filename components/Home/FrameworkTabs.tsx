"use client";

import React, { useState } from "react";
import { Terminal, Atom, Blocks, LayoutTemplate, FileCode } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Data tĩnh có thể để ở đây hoặc tách ra file constant
const INTEGRATION_TABS = [
  {
    id: "vanilla",
    label: "Vanilla JS",
    icon: Terminal,
    desc: "Direct DOM manipulation. Zero dependencies.",
    lang: "javascript",
    fileName: "main.js",
    code: `import { ElementBuilder } from 'skeleton-styler';

// 1. Create a builder instance
const builder = new ElementBuilder()
  .s_w("100%").s_h(200)
  .s_rounded(12)
  .markAsSkeleton();

const container = document.getElementById('app');

// 2. Logic to toggle skeleton
function renderContent(isLoading) {
  if (isLoading) {
     // Generate & append
     container.replaceChildren(builder.generate());
  } else {
     container.innerHTML = '<div>Real Content Loaded</div>';
  }
}

// Initial render
renderContent(true);`,
  },
  {
    id: "react",
    label: "React",
    icon: Atom,
    desc: "Wrapper component with hooks.",
    lang: "tsx",
    fileName: "SkeletonWrapper.tsx",
    code: `import React, { useEffect, useRef } from "react";
import { ElementBuilder } from "skeleton-styler";

interface WrapperProps {
  loading: boolean;
  instance: ElementBuilder;
  children: React.ReactNode;
}

const SkeletonWrapper: React.FC<WrapperProps> = ({ loading, children, instance }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (loading && el) {
      // Generate DOM node directly
      const skeleton = instance.generate();
      el.replaceChildren(skeleton);
    }
  }, [loading, instance]);

  if (!loading) return <>{children}</>;
  
  return <div ref={ref} />;
};

export default SkeletonWrapper;`,
  },
  {
    id: "angular",
    label: "Angular",
    icon: Blocks,
    desc: "Standalone component with OnChanges.",
    lang: "typescript",
    fileName: "skeleton-wrapper.component.ts",
    code: `import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ElementBuilder } from 'skeleton-styler';

@Component({
  selector: 'app-skeleton-wrapper',
  template: '<ng-content *ngIf="!loading"></ng-content>',
  standalone: true
})
export class SkeletonWrapperComponent implements OnChanges {
  @Input() loading = false;
  @Input() instance!: ElementBuilder;

  constructor(private elRef: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges) {
    const container = this.elRef.nativeElement;
    
    if (this.loading && this.instance) {
      const skeleton = this.instance.generate();
      // Direct DOM manipulation safely within the element
      container.innerHTML = ''; 
      container.appendChild(skeleton);
    } else if (!this.loading) {
      // Clear skeleton when loading finishes
      // ng-content handles the real content
      if(container.firstChild && !container.querySelector('ng-content')) {
         // Cleanup if needed logic
      }
    }
  }
}`,
  },
  {
    id: "vue",
    label: "Vue 3",
    icon: LayoutTemplate,
    desc: "Composition API with Watchers.",
    lang: "html", // HTML syntax highlighting looks good for Vue SFC
    fileName: "SkeletonWrapper.vue",
    code: `<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { ElementBuilder } from 'skeleton-styler';

const props = defineProps<{
  loading: boolean;
  instance: ElementBuilder;
}>();

const container = ref<HTMLElement | null>(null);

const renderSkeleton = () => {
  if (container.value && props.instance) {
    const el = props.instance.generate();
    container.value.replaceChildren(el);
  }
};

watch(() => props.loading, (newVal) => {
  if (newVal) renderSkeleton();
}, { immediate: true });

onMounted(() => {
  if (props.loading) renderSkeleton();
});
</script>

<template>
  <div v-if="loading" ref="container"></div>
  <slot v-else />
</template>`,
  },
];

export const FrameworkTabs = () => {
  const [activeTab, setActiveTab] = useState("vanilla");
  const activeFeature = INTEGRATION_TABS.find((t) => t.id === activeTab) || INTEGRATION_TABS[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Navigation */}
      <div className="md:col-span-4 flex flex-col gap-3">
        {INTEGRATION_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-200 border group ${
                isActive ? "bg-slate-50 border-sky-200 shadow-md translate-x-2" : "bg-transparent border-transparent hover:bg-slate-50"
              }`}
            >
              <div className={`p-2.5 rounded-lg shrink-0 transition-colors ${isActive ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-500 group-hover:text-slate-700"}`}>
                <Icon size={20} />
              </div>
              <div>
                <h3 className={`font-bold text-base mb-0.5 ${isActive ? "text-slate-900" : "text-slate-600"}`}>{tab.label}</h3>
                <p className="text-xs text-slate-500 leading-snug">{tab.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Code Window */}
      <div className="md:col-span-8 h-full min-h-[300px]">
        <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#1e1e1e] shadow-2xl flex flex-col h-full w-full">
            <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-black/20 shrink-0">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono opacity-80">
                <FileCode size={12} />
                {activeFeature.fileName}
            </div>
            <div className="w-10"></div>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar relative">
            <SyntaxHighlighter
                language={activeFeature.lang}
                style={vscDarkPlus}
                customStyle={{ margin: 0, padding: "1.5rem", fontSize: "13px", background: "transparent", minHeight: "100%" }}
                showLineNumbers={true}
                wrapLines={true}
            >
                {activeFeature.code}
            </SyntaxHighlighter>
            </div>
        </div>
      </div>
    </div>
  );
};