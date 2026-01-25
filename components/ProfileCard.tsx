import React from 'react';
import { UserCheck, MessageCircle, Phone, ArrowRight } from 'lucide-react';

const ProfileCard: React.FC = () => {
  return (
    <div className="bg-[var(--color-brand-surface)] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden text-[var(--color-brand-secondary)] mt-12 mb-8 border border-[var(--color-brand-border)] relative group">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand-background)] rounded-full blur-3xl opacity-60 -mr-32 -mt-32"></div>

      <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
        {/* Avatar / Brand Image */}
        <div className="shrink-0 relative">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-[var(--color-brand-secondary)] rounded-full flex items-center justify-center overflow-hidden shadow-2xl relative z-10 transition-transform group-hover:scale-105 duration-500">
            <UserCheck size={48} className="text-[var(--color-brand-surface)]" />
          </div>
          <div className="absolute -inset-4 bg-[var(--color-brand-border)]/50 rounded-full blur-xl animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left space-y-5">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-brand-background)] border border-[var(--color-brand-border)] text-[var(--color-brand-primary)] text-xs font-bold tracking-wider uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)] animate-pulse"></span>
              Available for Consultation
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-brand-secondary)] mb-3 tracking-tight">
              試算結果太複雜？讓專家為您把關
            </h3>
            <p className="text-[var(--color-brand-muted)] leading-relaxed max-w-xl mx-auto md:mx-0 text-lg font-medium">
              車禍理賠魔鬼藏在細節裡。我們提供一對一的個人化諮詢，協助您檢視對方保險公司的報價是否合理，確保您的權益不被低估。
            </p>
          </div>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#06c755] hover:bg-[#05b54c] text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-green-100 active:scale-95 group/btn">
              <MessageCircle size={22} />
              加入 LINE 官方帳號諮詢
              <ArrowRight size={18} className="opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-stone-800 hover:text-stone-900 hover:bg-stone-50 px-8 py-4 rounded-2xl font-bold transition-all shadow-sm active:scale-95 border-2 border-stone-200">
              <Phone size={20} />
              預約電話評估
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
