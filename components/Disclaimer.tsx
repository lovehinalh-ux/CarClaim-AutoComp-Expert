
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-12">
      <div className="flex items-start gap-4">
        <AlertTriangle className="text-amber-500 shrink-0 mt-1" size={24} />
        <div>
          <h3 className="font-bold text-amber-800 mb-2 text-lg">免責聲明與使用建議</h3>
          <ul className="text-amber-700 text-sm space-y-2 list-disc ml-4 leading-relaxed">
            <li>本工具所計算之結果僅供參考，不具法律效力。</li>
            <li>實際求償金額需視法院判決、肇事責任比例及相關證據之完整性而定。</li>
            <li>建議您收集並完整保留所有收據、發票、診斷證明、警察初判表等證據。</li>
            <li>若涉及重大傷亡或複雜法律爭議，建議尋求專業律師或法律顧問之意見。</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
