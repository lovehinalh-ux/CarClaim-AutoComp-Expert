
import React from 'react';
import { ShieldCheck, Calculator, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  onStart: () => void;
}

const PreviewLanding: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 animate-in fade-in duration-700">
      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
        {/* Top Decorative Banner - Updated to Premium Dark/Gold Theme */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-center text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-[#B8860B]">
            <Calculator size={120} />
          </div>
          <div className="absolute top-0 left-0 p-4 opacity-5 text-[#B8860B]">
            <ShieldCheck size={80} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-3 relative z-10 font-serif tracking-wide">車禍求償小幫手</h1>
          <p className="text-[#F5F5DC] text-lg font-medium opacity-90 relative z-10 tracking-wide">
            結合科技試算與專家實務經驗，為您爭取應有的權益
          </p>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 items-start">
              <div className="bg-[#fffbf0] p-3 rounded-xl text-[#B8860B] shrink-0 border border-[#B8860B]/20">
                <Calculator size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">精準試算</h3>
                <p className="text-sm text-slate-600 leading-relaxed">涵蓋醫療、薪資、交通及精神慰撫金完整計算。</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 items-start">
              <div className="bg-[#fffbf0] p-3 rounded-xl text-[#B8860B] shrink-0 border border-[#B8860B]/20">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-1 font-serif">專家把關</h3>
                <p className="text-sm text-slate-600 leading-relaxed">內建 2026 最新法規數據與實務判決建議。</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-10 pl-2">
            <div className="flex items-center gap-3 text-slate-700 group">
              <CheckCircle2 size={20} className="text-[#B8860B] group-hover:scale-110 transition-transform" />
              <span className="font-medium">符合實務常見請求項目分類</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700 group">
              <CheckCircle2 size={20} className="text-[#B8860B] group-hover:scale-110 transition-transform" />
              <span className="font-medium">附帶詳細醫療費用計算功能</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700 group">
              <ShieldCheck size={20} className="text-[#B8860B] group-hover:scale-110 transition-transform" />
              <span className="font-medium">隱私安全：所有計算均在本地完成，不儲存資料</span>
            </div>
          </div>

          <button
            onClick={onStart}
            className="w-full bg-[#B8860B] hover:bg-[#966b04] text-white py-4 rounded-2xl font-black text-xl shadow-lg shadow-orange-100 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group tracking-wider"
          >
            立即開始試算 <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-slate-400 text-xs mt-6">
            本工具僅供試算參考，具體請求請諮詢法律專業人士
          </p>
        </div>
      </div>

      <div className="mt-8 text-slate-400 text-sm font-medium">
        © {new Date().getFullYear()} 車禍求償小幫手
      </div>
    </div>
  );
};

export default PreviewLanding;
