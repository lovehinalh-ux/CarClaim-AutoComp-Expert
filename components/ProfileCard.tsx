
import React from 'react';
import { Instagram, MessageCircle, Globe, ExternalLink } from 'lucide-react';

const ProfileCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-inner">
          <span className="text-2xl font-bold">諮</span>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-bold text-slate-800 mb-1">專業諮詢與聯繫</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            我是本工具的維護者。若您在填寫過程中有任何疑問，或需要更進一步的車禍理賠法律諮詢與專業建議，歡迎透過社群軟體或個人網頁與我聯繫。
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a 
              href="https://line.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#06C755] text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-sm"
            >
              <MessageCircle size={18} /> LINE 聯繫
            </a>
            <a 
              href="https://instagram.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-sm"
            >
              <Instagram size={18} /> Instagram
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors border border-slate-200"
            >
              <Globe size={18} /> 個人網頁 <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
