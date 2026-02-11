export const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-auto">
    <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="text-sm">
        © 2026 <span className="text-sky-400 font-semibold">SkeletonStyler</span>. Open Source Project.
      </div>
      <div className="flex gap-6 text-sm font-medium">
        <a href="https://www.npmjs.com/package/skeleton-styler" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">NPM</a>
      </div>
    </div>
  </footer>
);