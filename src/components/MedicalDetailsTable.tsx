import React from 'react';
import { MedicalEntry } from '../types';
import { ChevronLeft, Plus, Trash2, AlertCircle } from 'lucide-react';
import AmountInput from './AmountInput';
import { formatNT } from '../utils/amount';
import { medicalDateId, medicalRowId } from '../utils/domIds';

interface Props {
  entries: MedicalEntry[];
  onEntryChange: (id: string, field: 'date' | 'amount', value: string | number) => void;
  onAddRow: () => void;
  onRemoveRow: (id: string) => void;
  onBack: () => void;
  error?: string;
}


// One DOM for both layouts: a card per row on mobile, a 4-column grid on desktop.
const ROW_GRID = 'md:grid md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1fr)_3.5rem] md:items-start md:gap-4';

const MedicalDetailsTable: React.FC<Props> = ({ entries, onEntryChange, onAddRow, onRemoveRow, onBack, error }) => {
  const total = entries.reduce((sum, entry) => sum + entry.amount, 0);

  return (
    <div className="bg-[var(--color-brand-surface)] rounded-2xl shadow-xl border border-[var(--color-brand-border)] overflow-hidden">
      <div className="bg-[var(--color-brand-secondary)] p-4 md:p-6 flex items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <button
            type="button"
            onClick={onBack}
            className="w-11 h-11 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors shrink-0"
            aria-label="返回求償項目"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <h2 className="text-lg md:text-xl font-bold">醫療費用明細</h2>
        </div>
        <div className="text-right shrink-0">
          <p className="text-white/75 text-xs mb-1">目前總計</p>
          <p className="text-xl md:text-2xl font-bold tabular-nums text-[var(--color-brand-gold-light)]">{formatNT(total)}</p>
        </div>
      </div>

      {error && (
        <div role="alert" className="mx-4 md:mx-6 mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          <AlertCircle size={18} className="shrink-0 mt-0.5" aria-hidden="true" /> {error}
        </div>
      )}

      <div className={`hidden ${ROW_GRID} px-6 pt-5 pb-2 text-sm font-bold text-[var(--color-brand-muted)] whitespace-nowrap`} aria-hidden="true">
        <span>序號</span>
        <span>就醫日期</span>
        <span className="text-right">就醫金額（NT$）</span>
        <span className="text-center">刪除</span>
      </div>

      <ol className="p-4 md:px-6 md:py-2 space-y-3 md:space-y-0 md:divide-y md:divide-[var(--color-brand-border)]">
        {entries.map((entry, index) => {
          const dateMissing = entry.amount > 0 && !entry.date;
          const n = index + 1;
          return (
            <li
              key={entry.id}
              id={medicalRowId(entry.id)}
              className={`scroll-mt-28 rounded-xl border md:border-0 md:rounded-none p-3 md:px-0 md:py-3 ${ROW_GRID} ${dateMissing ? 'border-amber-300 bg-amber-50/60' : 'border-[var(--color-brand-border)] bg-white md:bg-transparent'}`}
            >
              <div className="flex items-center justify-between md:block mb-2 md:mb-0 md:pt-2.5">
                <span className="text-sm font-bold text-[var(--color-brand-muted)] whitespace-nowrap">
                  <span className="md:hidden">第 {n} 筆</span>
                  <span className="hidden md:inline">{n}</span>
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveRow(entry.id)}
                  className="md:hidden w-11 h-11 -my-2 -mr-2 flex items-center justify-center text-[var(--color-brand-muted)] hover:text-red-700 hover:bg-[var(--color-brand-background)] rounded-full transition-colors"
                  aria-label={`刪除第 ${n} 筆`}
                >
                  <Trash2 size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-2 md:contents">
                <div className="min-w-0">
                  <label htmlFor={medicalDateId(entry.id)} className="md:sr-only block text-xs font-bold text-[var(--color-brand-muted)] mb-1">
                    就醫日期<span className="hidden md:inline">（第 {n} 筆）</span>
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id={medicalDateId(entry.id)}
                      type="date"
                      aria-invalid={dateMissing || undefined}
                      aria-describedby={dateMissing ? `${medicalDateId(entry.id)}-err` : undefined}
                      className={`w-full min-w-0 min-h-11 border rounded-lg px-3 py-2 text-base text-[var(--color-brand-secondary)] focus:outline-hidden transition-all cursor-pointer ${dateMissing
                        ? 'border-amber-400 bg-white focus:ring-2 focus:ring-amber-500'
                        : 'bg-white border-[var(--color-brand-border)] focus:ring-2 focus:ring-[var(--color-brand-secondary)] hover:border-[var(--color-brand-muted)]'
                        }`}
                      value={entry.date}
                      onChange={(e) => onEntryChange(entry.id, 'date', e.target.value)}
                    />
                  </div>
                  {dateMissing && (
                    <p id={`${medicalDateId(entry.id)}-err`} className="text-amber-800 text-xs font-bold flex items-center gap-1 mt-1">
                      <AlertCircle size={12} aria-hidden="true" /> 有金額時必須選擇日期
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label htmlFor={`med-amount-${entry.id}`} className="md:sr-only block text-xs font-bold text-[var(--color-brand-muted)] mb-1">
                    金額<span className="hidden md:inline">（第 {n} 筆）</span>
                  </label>
                  <div className="flex items-center min-h-11 border rounded-lg bg-white border-[var(--color-brand-border)] focus-within:ring-2 focus-within:ring-[var(--color-brand-secondary)]">
                    <span className="pl-2.5 text-sm font-bold text-[var(--color-brand-muted)]" aria-hidden="true">NT$</span>
                    <AmountInput
                      id={`med-amount-${entry.id}`}
                      value={entry.amount}
                      onValueChange={(v) => onEntryChange(entry.id, 'amount', v)}
                      className="w-full min-w-0 bg-transparent px-2.5 py-2 text-right text-base font-bold tabular-nums text-[var(--color-brand-secondary)] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="hidden md:flex justify-center">
                <button
                  type="button"
                  onClick={() => onRemoveRow(entry.id)}
                  className="w-11 h-11 flex items-center justify-center text-[var(--color-brand-muted)] hover:text-red-700 hover:bg-[var(--color-brand-background)] rounded-full transition-colors"
                  aria-label={`刪除第 ${n} 筆`}
                >
                  <Trash2 size={18} aria-hidden="true" />
                </button>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="p-4 md:p-6 bg-[var(--color-brand-surface)] border-t border-[var(--color-brand-border)] flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3">
        <button
          type="button"
          onClick={onAddRow}
          className="flex items-center justify-center gap-2 min-h-11 bg-white text-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-background)] px-4 py-2 rounded-lg font-bold transition-all border border-[var(--color-brand-border)] shadow-xs whitespace-nowrap"
        >
          <Plus size={20} aria-hidden="true" /> 新增一筆
        </button>
        <button
          type="button"
          onClick={onBack}
          className="min-h-11 bg-[var(--color-brand-primary)] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-[var(--color-brand-secondary)] transition-all shadow-md active:scale-95 whitespace-nowrap"
        >
          完成並返回一覽表
        </button>
      </div>
    </div>
  );
};

export default MedicalDetailsTable;
