
import React from 'react';
import { ShieldCheck, Calculator, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  onStart: () => void;
}

const PreviewLanding: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[var(--color-brand-surface)] flex flex-col items-center justify-center p-4 animate-in fade-in duration-700">
      <div className="max-w-2xl w-full bg-[var(--color-brand-card)] rounded-[2rem] shadow-2xl shadow-[var(--color-brand-muted)]/10 border border-[var(--color-brand-border)] overflow-hidden">
        {/* Top Decorative Banner - Friendly White Theme */}
        <div className="bg-white p-10 text-center relative border-b border-stone-100">

          <div className="absolute top-0 right-0 p-6 opacity-5 text-stone-900">
            <Calculator size={140} />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-[var(--color-brand-primary)] rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-[var(--color-brand-muted)]/20 transform -rotate-3 transition-transform hover:rotate-0 duration-500">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-3 text-[var(--color-brand-primary)] tracking-tight uppercase">
              Car Compensation<br />
              <span className="text-[var(--color-brand-secondary)]">Expert</span>
            </h1>
            <div className="h-1.5 w-16 bg-stone-900 rounded-full my-4"></div>
            <p className="text-[var(--color-brand-muted)] text-lg font-bold tracking-wide">
              車禍求償小幫手 2026
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="flex gap-4 p-6 rounded-3xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] items-start group hover:border-[var(--color-brand-secondary)] hover:shadow-lg transition-all duration-300">
              <div className="bg-[var(--color-brand-card)] p-3 rounded-xl text-[var(--color-brand-secondary)] shrink-0 border border-[var(--color-brand-border)] shadow-sm group-hover:scale-110 transition-transform">
                <Calculator size={24} />
              </div>
              <div>
                <h3 className="font-black text-[var(--color-brand-primary)] text-lg mb-1">精準試算</h3>
                <p className="text-sm text-[var(--color-brand-muted)] font-medium leading-relaxed">涵蓋醫療、薪資、交通及精神慰撫金完整計算。</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 rounded-3xl bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] items-start group hover:border-[var(--color-brand-secondary)] hover:shadow-lg transition-all duration-300">
              <div className="bg-[var(--color-brand-card)] p-3 rounded-xl text-[var(--color-brand-primary)] shrink-0 border border-[var(--color-brand-border)] shadow-sm group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-black text-[var(--color-brand-primary)] text-lg mb-1">專家把關</h3>
                <p className="text-sm text-[var(--color-brand-muted)] font-medium leading-relaxed">內建 2026 最新法規數據與實務判決建議。</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-10 pl-2">
            <div className="flex items-center gap-3 text-[var(--color-brand-primary)] group">
              <CheckCircle2 size={22} className="text-emerald-500 fill-emerald-50" />
              <span className="font-bold text-lg">符合實務常見請求項目分類</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--color-brand-primary)] group">
              <CheckCircle2 size={22} className="text-emerald-500 fill-emerald-50" />
              <span className="font-bold text-lg">附帶詳細醫療費用計算功能</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--color-brand-primary)] group">
              <ShieldCheck size={22} className="text-[var(--color-brand-muted)]/50" />
              <span className="font-medium text-[var(--color-brand-muted)]">隱私安全：所有計算均在本地完成，不儲存資料</span>
            </div>
          </div>

          <button
            onClick={onStart}
            className="w-full bg-[var(--color-brand-primary)] hover:bg-black text-white py-6 rounded-2xl font-black text-2xl shadow-2xl shadow-[var(--color-brand-muted)]/20 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group tracking-wider"
          >
            立即開始試算 <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-stone-400 text-xs mt-6 font-medium">
            本工具僅供試算參考，具體請求請諮詢法律專業人士
          </p>
        </div>
      </div>

      <div className="mt-8 text-stone-400 text-sm font-bold tracking-widest uppercase">
        © {new Date().getFullYear()} Car Compensation Expert
      </div>
    </div>
  );
};

export default PreviewLanding;
