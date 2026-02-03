import React from 'react';
import { Home, ChevronDown, LayoutGrid } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-[var(--color-brand-surface)] border-b border-[var(--color-brand-border)] flex items-center justify-between px-4 md:px-6 shadow-sm sticky top-0 z-50 animate-in fade-in slide-in-from-top-2 duration-500">
      <div className="flex items-center gap-3">
        <div className="bg-[var(--color-brand-primary)] p-1.5 rounded-lg text-white">
          <LayoutGrid size={20} />
        </div>
        <h1 className="text-lg md:text-xl font-bold text-[var(--color-brand-secondary)] tracking-tight">
          Mr. Three 保險工具箱 <span className="hidden md:inline text-[var(--color-brand-muted)] mx-2">|</span> <span className="hidden md:inline">車禍求償試算工具</span>
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <button className="flex items-center gap-1 text-sm font-bold text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-primary)] transition-colors py-2 focus:outline-none">
            工具庫
            <ChevronDown size={14} />
          </button>
          {/* Dropdown menu */}
          <div className="absolute right-0 mt-0 w-64 rounded-xl shadow-xl bg-white ring-1 ring-[#DED6CC] ring-opacity-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50 top-full p-1">
            <div className="py-1">
              <a href="https://simple-insurance-check.zeabur.app/" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-sm text-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-background)] hover:text-[var(--color-brand-primary)] transition-colors rounded-lg mb-0.5">快速保險檢視器</a>
              <a href="https://claimhelper.zeabur.app/" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-sm text-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-background)] hover:text-[var(--color-brand-primary)] transition-colors rounded-lg mb-0.5">保險理賠文件準備工具</a>
              <a href="https://carclaim-autocomp.zeabur.app/" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-sm text-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-background)] hover:text-[var(--color-brand-primary)] transition-colors rounded-lg mb-0.5">車禍求償試算工具</a>
              <a href="https://insurance-companies.zeabur.app/" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-sm text-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-background)] hover:text-[var(--color-brand-primary)] transition-colors rounded-lg">各家保險公司官網與理賠連結</a>
            </div>
          </div>
        </div>

        <a
          href="https://personal-intro-blue.zeabur.app/"
          className="flex items-center gap-2 text-white bg-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-primary)] px-4 py-2 rounded-xl transition-all font-bold text-sm shadow-sm"
        >
          <Home size={16} />
          <span className="hidden md:inline">回到首頁</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
