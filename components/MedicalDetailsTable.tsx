
import React from 'react';
import { MedicalEntry } from '../types';
import { ChevronLeft, Plus, Trash2, Calendar, AlertCircle } from 'lucide-react';

interface Props {
  entries: MedicalEntry[];
  onEntryChange: (id: string, field: 'date' | 'amount', value: string | number) => void;
  onAddRow: () => void;
  onRemoveRow: (id: string) => void;
  onBack: () => void;
}

const MedicalDetailsTable: React.FC<Props> = ({ entries, onEntryChange, onAddRow, onRemoveRow, onBack }) => {
  const total = entries.reduce((sum, entry) => sum + entry.amount, 0);

  // Function to trigger native date picker
  const handleDateIconClick = (id: string) => {
    const input = document.getElementById(`date-input-${id}`) as HTMLInputElement;
    if (input && 'showPicker' in HTMLInputElement.prototype) {
      try {
        input.showPicker();
      } catch {
        input.focus();
      }
    } else if (input) {
      input.focus();
    }
  };

  return (
    <div className="bg-[var(--color-brand-surface)] rounded-2xl shadow-xl border border-[var(--color-brand-border)] overflow-hidden">
      <div className="bg-[var(--color-brand-secondary)] p-6 flex items-center justify-between text-white">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            title="返回一覽表"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-bold">醫療費用明細計算表</h2>
        </div>
        <div className="text-right">
          <p className="text-white/70 text-xs uppercase tracking-wider mb-1">目前總計</p>
          <p className="text-2xl font-bold text-[var(--color-brand-primary)]">NT$ {total.toLocaleString()}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--color-brand-surface)] border-b border-[var(--color-brand-border)]">
              <th className="px-6 py-4 text-left text-sm font-bold text-[var(--color-brand-muted)] w-16">序號</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-[var(--color-brand-muted)]">就醫日期</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-[var(--color-brand-muted)]">就醫金額 (NT$)</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-[var(--color-brand-muted)] w-24">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-brand-border)]">
            {entries.map((entry, index) => {
              const amountInvalid = entry.amount < 0;
              const dateMissing = entry.amount > 0 && !entry.date;

              return (
                <tr key={entry.id} className={`hover:bg-[var(--color-brand-surface)] transition-colors ${(amountInvalid || dateMissing) ? 'bg-amber-50/50' : ''}`}>
                  <td className="px-6 py-4 text-[var(--color-brand-muted)] text-sm font-medium">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="relative group/date flex items-center">
                        <button
                          type="button"
                          onClick={() => handleDateIconClick(entry.id)}
                          className={`absolute left-0 pl-3 flex items-center h-full z-10 transition-colors ${dateMissing ? 'text-amber-600' : 'text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-primary)]'}`}
                        >
                          <Calendar size={18} />
                        </button>
                        <input
                          id={`date-input-${entry.id}`}
                          type="date"
                          className={`w-full border rounded-lg pl-11 pr-3 py-2 text-[var(--color-brand-primary)] focus:outline-none transition-all cursor-pointer shadow-sm ${dateMissing
                            ? 'border-amber-300 bg-amber-50 focus:ring-2 focus:ring-amber-500'
                            : 'bg-white border-[var(--color-brand-border)] focus:ring-2 focus:ring-[var(--color-brand-secondary)] hover:border-[var(--color-brand-muted)]'
                            }`}
                          value={entry.date}
                          onChange={(e) => onEntryChange(entry.id, 'date', e.target.value)}
                        />
                      </div>
                      {dateMissing && (
                        <p className="text-amber-600 text-[10px] font-bold flex items-center gap-1">
                          <AlertCircle size={10} /> 有金額時必須選擇日期
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-end gap-1">
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        className={`w-full border rounded-lg px-4 py-2 text-right font-medium shadow-sm transition-all focus:outline-none ${amountInvalid
                          ? 'border-amber-300 bg-amber-50 text-amber-800 focus:ring-2 focus:ring-amber-500'
                          : 'bg-white border-[var(--color-brand-border)] text-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-secondary)] hover:border-[var(--color-brand-muted)]'
                          }`}
                        value={entry.amount || ''}
                        onChange={(e) => onEntryChange(entry.id, 'amount', parseFloat(e.target.value) || 0)}
                      />
                      {amountInvalid && (
                        <p className="text-amber-600 text-[10px] font-bold flex items-center gap-1">
                          <AlertCircle size={10} /> 金額不可小於 0
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onRemoveRow(entry.id)}
                      className="text-[var(--color-brand-muted)]/30 hover:text-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-background)] rounded-full transition-all p-2"
                      title="刪除此列"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-[var(--color-brand-surface)] border-t border-[var(--color-brand-border)] flex justify-between items-center">
        <button
          onClick={onAddRow}
          className="flex items-center gap-2 bg-[var(--color-brand-card)] text-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-surface)] px-4 py-2 rounded-lg font-bold transition-all border border-[var(--color-brand-border)] shadow-sm"
        >
          <Plus size={20} /> 新增欄位
        </button>
        <button
          onClick={onBack}
          className="bg-[var(--color-brand-primary)] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-[var(--color-brand-secondary)] transition-all shadow-md active:scale-95"
        >
          完成並返回一覽表
        </button>
      </div>
    </div>
  );
};

export default MedicalDetailsTable;
