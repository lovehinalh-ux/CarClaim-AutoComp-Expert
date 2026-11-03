import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const TOOLBOX_URL = 'https://personal-one-page-blue-pro-type.lovehinalh.workers.dev/';

const tools = [
  { name: '保障健診工具', href: 'https://insurance-checklist.pages.dev/' },
  { name: '保險理賠文件彙整', href: 'https://claimhelper.pages.dev/' },
  { name: '車禍求償試算工具', href: 'https://carclaim-autocomp-expert.pages.dev/' },
  { name: '各家保險公司官網與理賠連結', href: 'https://insurance-company-list.pages.dev/' },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <header ref={headerRef} className="relative z-50 bg-[var(--color-navy)] border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div
              style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
              className="w-8 h-8 rounded-full bg-[var(--color-brand-primary)] flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              aria-hidden="true"
            >
              3
            </div>
            <div>
              <div style={{ fontFamily: '"DM Serif Display", Georgia, serif' }} className="text-base font-bold text-white leading-tight">Mr. Three</div>
              <h1 className="text-xs font-normal text-white/75 leading-none">車禍求償試算工具</h1>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href={TOOLBOX_URL} className="text-sm text-white/80 hover:text-white transition-colors">← 回到工具箱</a>
          </div>

          <button
            type="button"
            className="md:hidden w-11 h-11 -mr-2 flex items-center justify-center text-white/80 hover:text-white rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? '關閉選單' : '開啟選單'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="其他工具" className="md:hidden absolute inset-x-0 top-full bg-[var(--color-navy)] border-t border-white/10 px-4 py-3 space-y-1 shadow-lg">
          {tools.map(t => (
            <a key={t.name} href={t.href} onClick={close} className="flex items-center min-h-11 text-sm text-white/80 hover:text-white transition-colors">
              {t.name}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10">
            <a href={TOOLBOX_URL} onClick={close} className="flex items-center min-h-11 text-sm text-[var(--color-brand-gold-light)] font-medium">← 回到工具箱</a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
