import React from 'react';
import { Eye } from 'lucide-react';
import { formatNT } from '../utils/amount';

interface Props {
  total: number;
  net: number;
  faultPercent: number;
  onPreview: () => void;
}

const BottomBar: React.FC<Props> = ({ total, net, faultPercent, onPreview }) => (
  <div className="fixed bottom-0 inset-x-0 bg-white border-t border-stone-200 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] z-40 pb-[env(safe-area-inset-bottom)]">
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center gap-3">
      <div className="flex flex-col min-w-0">
        {faultPercent > 0 ? (
          <>
            <div className="text-xs text-stone-600 font-bold">預估可請求（扣除肇責 {faultPercent}%）</div>
            <div className="text-xl md:text-2xl font-bold text-[var(--color-brand-primary)] tabular-nums truncate">{formatNT(net)}</div>
            <div className="text-xs text-stone-600 tabular-nums truncate">總額 {formatNT(total)}</div>
          </>
        ) : (
          <>
            <div className="text-xs text-stone-600 font-bold">預估總額</div>
            <div className="text-xl md:text-2xl font-bold text-[var(--color-brand-primary)] tabular-nums truncate">{formatNT(total)}</div>
          </>
        )}
      </div>
      <button
        type="button"
        onClick={onPreview}
        className="shrink-0 min-h-11 bg-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-primary)] text-white px-5 md:px-8 py-3 rounded-xl font-bold text-base shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
      >
        <Eye size={18} aria-hidden="true" /> 預覽並輸出
      </button>
    </div>
  </div>
);

export default BottomBar;
