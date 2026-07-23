import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const tools = [
    { name: '保障健診工具', href: 'https://insurance-checklist.pages.dev/' },
    { name: '保險理賠文件彙整', href: 'https://claimhelper.pages.dev/' },
    { name: '車禍求償試算工具', href: 'https://carclaim-autocomp-expert.pages.dev/' },
    { name: '各家保險公司官網與理賠連結', href: 'https://insurance-company-list.pages.dev/' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-navy)] border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
              className="w-8 h-8 rounded-full bg-[var(--color-brand-primary)] flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            >
              3
            </div>
            <div>
              <div style={{ fontFamily: '"DM Serif Display", Georgia, serif' }} className="text-base font-bold text-white leading-tight">Mr. Three</div>
              <div className="text-xs text-white/45 leading-none">車禍求償試算工具</div>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="https://personal-one-page-blue-pro-type.lovehinalh.workers.dev/" className="text-sm text-white/80 hover:text-white transition-colors">← 回到工具箱</a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/80 hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[var(--color-navy)] border-t border-white/10 px-4 py-3 space-y-1">
          {tools.map(t => (
            <a key={t.name} href={t.href} className="block py-2.5 text-sm text-white/80 hover:text-white transition-colors">
              {t.name}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10">
            <a href="https://personal-one-page-blue-pro-type.lovehinalh.workers.dev/" className="block py-2.5 text-sm text-[var(--color-brand-primary)] font-medium">← 回到工具箱</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
