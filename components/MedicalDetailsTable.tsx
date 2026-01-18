
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
      } catch (e) {
        input.focus();
      }
    } else if (input) {
      input.focus();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-slate-800 p-6 flex items-center justify-between text-white">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-700 rounded-full transition-colors"
            title="返回一覽表"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-bold">醫療費用明細計算表</h2>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">目前總計</p>
          <p className="text-2xl font-black text-blue-400">NT$ {total.toLocaleString()}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-600 w-16">序號</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-600">就醫日期</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-slate-600">就醫金額 (NT$)</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-slate-600 w-24">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {entries.map((entry, index) => {
              const amountInvalid = entry.amount < 0;
              const dateMissing = entry.amount > 0 && !entry.date;

              return (
                <tr key={entry.id} className={`hover:bg-blue-50/30 transition-colors ${(amountInvalid || dateMissing) ? 'bg-red-50/30' : ''}`}>
                  <td className="px-6 py-4 text-slate-400 text-sm font-medium">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="relative group/date flex items-center">
                        <button
                          type="button"
                          onClick={() => handleDateIconClick(entry.id)}
                          className={`absolute left-0 pl-3 flex items-center h-full z-10 transition-colors ${dateMissing ? 'text-red-500' : 'text-blue-500 hover:text-blue-700'}`}
                        >
                          <Calendar size={18} />
                        </button>
                        <input
                          id={`date-input-${entry.id}`}
                          type="date"
                          className={`w-full border rounded-lg pl-11 pr-3 py-2 text-slate-700 focus:outline-none transition-all cursor-pointer shadow-sm ${
                            dateMissing 
                              ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500' 
                              : 'bg-white border-slate-200 focus:ring-2 focus:ring-blue-500 hover:border-slate-300'
                          }`}
                          value={entry.date}
                          onChange={(e) => onEntryChange(entry.id, 'date', e.target.value)}
                        />
                      </div>
                      {dateMissing && (
                        <p className="text-red-500 text-[10px] font-bold flex items-center gap-1">
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
                        className={`w-full border rounded-lg px-4 py-2 text-right font-medium shadow-sm transition-all focus:outline-none ${
                          amountInvalid 
                            ? 'border-red-300 bg-red-50 text-red-800 focus:ring-2 focus:ring-red-500' 
                            : 'bg-white border-slate-200 text-slate-800 focus:ring-2 focus:ring-blue-500 hover:border-slate-300'
                        }`}
                        value={entry.amount || ''}
                        onChange={(e) => onEntryChange(entry.id, 'amount', parseFloat(e.target.value) || 0)}
                      />
                      {amountInvalid && (
                        <p className="text-red-500 text-[10px] font-bold flex items-center gap-1">
                          <AlertCircle size={10} /> 金額不可小於 0
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => onRemoveRow(entry.id)}
                      className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all p-2"
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

      <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
        <button
          onClick={onAddRow}
          className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-bold transition-all border border-blue-200 shadow-sm"
        >
          <Plus size={20} /> 新增欄位
        </button>
        <button
          onClick={onBack}
          className="bg-slate-800 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-slate-900 transition-all shadow-md active:scale-95"
        >
          完成並返回一覽表
        </button>
      </div>
    </div>
  );
};

export default MedicalDetailsTable;
