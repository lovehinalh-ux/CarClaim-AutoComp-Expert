import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[var(--color-brand-card)] text-[var(--color-brand-primary)] py-10 px-6 md:px-8 border-b border-[var(--color-brand-border)] shadow-sm mb-10 relative overflow-hidden">
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-secondary)]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative z-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3 uppercase leading-none">
            Car Compensation<br />
            <span className="text-[var(--color-brand-secondary)]">Calculator</span>
          </h1>
          <div className="h-1.5 w-20 bg-[var(--color-brand-secondary)] mb-4 mx-auto md:mx-0 rounded-full"></div>
          <p className="text-stone-500 text-lg font-bold tracking-wide">
            2026 車禍求償一覽表工具
          </p>
        </div>
        <div className="hidden md:block">
          <div className="flex flex-col items-center md:items-end">
            <div className="text-[10px] font-black text-stone-400 mb-2 uppercase tracking-[0.2em]">System Reliability</div>
            <div className="flex items-center gap-3 text-emerald-700 font-bold bg-emerald-50/80 px-4 py-2 rounded-2xl text-sm border border-emerald-100 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              SECURE & ONLINE
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
