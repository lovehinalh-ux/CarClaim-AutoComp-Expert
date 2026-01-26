import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-[var(--color-brand-surface)] border-b border-[var(--color-brand-border)] flex items-center justify-between px-4 md:px-6 shadow-sm sticky top-0 z-50 animate-in fade-in slide-in-from-top-2 duration-500">
      <div className="flex items-center gap-3">
        <div className="bg-[var(--color-brand-primary)] p-1.5 rounded-lg text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="M12 11h4" />
            <path d="M12 16h4" />
            <path d="M8 11h.01" />
            <path d="M8 16h.01" />
          </svg>
        </div>
        <h1 className="text-lg md:text-xl font-bold text-[var(--color-brand-secondary)] tracking-tight">
          Mr. Three 保險工具箱 <span className="hidden md:inline text-[var(--color-brand-muted)] mx-2">|</span> <span className="hidden md:inline">車禍求償試算工具</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://personal-intro-blue.zeabur.app/#tools"
          className="flex items-center gap-2 text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-primary)] transition-colors font-medium text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="hidden md:inline">回到首頁</span>
        </a>

        <div className="hidden md:flex items-center gap-2 text-[var(--color-brand-secondary)] font-bold text-xs bg-white px-3 py-1.5 rounded-full border border-[var(--color-brand-border)]">
          <div
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)]"
            style={{ animation: 'pulse-light 2.8s ease-in-out infinite' }}
          ></div>
          SECURE & ONLINE
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
