import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[var(--color-brand-surface)] text-[var(--color-brand-secondary)] py-10 px-6 md:px-8 border-b border-[var(--color-brand-border)] shadow-sm mb-10 relative overflow-hidden animate-in fade-in duration-300">
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-secondary)]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative z-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 leading-none text-[var(--color-brand-secondary)]">
            車禍求償試算工具
          </h1>
          <div className="h-1.5 w-20 bg-[var(--color-brand-secondary)] mb-4 mx-auto md:mx-0 rounded-full"></div>
          <p className="text-[var(--color-brand-muted)] text-lg font-bold tracking-wide">
            2026｜醫療・薪資・交通・慰撫金
          </p>
        </div>
        <div className="hidden md:block">
          <div className="flex flex-col items-center md:items-end">
            <div className="text-[10px] font-black text-[var(--color-brand-muted)] mb-2 uppercase tracking-[0.2em]">System Reliability</div>
            <div className="flex items-center gap-3 text-[var(--color-brand-secondary)] font-bold bg-[var(--color-brand-surface)] px-4 py-2 rounded-2xl text-sm border border-[var(--color-brand-border)] shadow-sm">
              <div
                className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]"
                style={{ animation: 'pulse-light 2.8s ease-in-out infinite' }}
              ></div>
              SECURE & ONLINE
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pulse-light {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.06); opacity: 0.75; }
        }
      `}</style>
    </header>
  );
};

export default Header;
