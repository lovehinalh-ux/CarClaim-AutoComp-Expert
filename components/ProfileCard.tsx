import React from 'react';
import { UserCheck, MessageCircle, Phone, ArrowRight } from 'lucide-react';

const ProfileCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl overflow-hidden text-white mt-12 mb-8">
      <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Avatar / Brand Image */}
        <div className="shrink-0 relative">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-700 rounded-full border-4 border-slate-600 flex items-center justify-center overflow-hidden shadow-2xl relative z-10">
            <UserCheck size={48} className="text-slate-400" />
            {/* Placeholder for real headshot */}
            {/* <img src="/path-to-expert.jpg" alt="車禍理賠專家" className="w-full h-full object-cover" /> */}
          </div>
          <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 text-xs font-bold tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Available for Consultation
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-serif mb-2">
              試算結果太複雜？讓專家為您把關
            </h3>
            <p className="text-slate-300 leading-relaxed max-w-xl mx-auto md:mx-0">
              車禍理賠魔鬼藏在細節裡。我們提供一對一的個人化諮詢，協助您檢視對方保險公司的報價是否合理，確保您的權益不被低估。
            </p>
          </div>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#06c755] hover:bg-[#05b54c] text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg active:scale-95 group">
              <MessageCircle size={20} />
              加入 LINE 官方帳號諮詢
              <ArrowRight size={16} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100 px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg active:scale-95 border border-slate-200">
              <Phone size={18} />
              預約 15 分鐘電話評估
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
