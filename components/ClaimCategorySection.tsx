
import React from 'react';
import { CategoryType, ClaimItem } from '../types';
import { Info, HelpCircle, AlertCircle } from 'lucide-react';

interface Props {
  category: CategoryType;
  items: ClaimItem[];
  onAmountChange: (id: string, value: number) => void;
  errors?: Record<string, string>;
}

const ClaimCategorySection: React.FC<Props> = ({ category, items, onAmountChange, errors }) => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-2">
        <h2 className="text-lg font-bold text-slate-800">{category}</h2>
      </div>
      <div className="divide-y divide-slate-100">
        {items.map((item) => {
          const hasError = errors && errors[item.id];
          return (
            <div key={item.id} className={`p-6 transition-colors hover:bg-slate-50/50 ${hasError ? 'bg-red-50/30' : ''}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-semibold ${hasError ? 'text-red-700' : 'text-slate-700'}`}>{item.name}</span>
                    <div className="group relative">
                      <HelpCircle size={16} className="text-slate-400 cursor-help" />
                      <div className="absolute left-0 bottom-full mb-2 w-64 bg-slate-800 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg leading-relaxed">
                        {item.hint}
                        <div className="mt-1 text-blue-300 italic border-t border-slate-600 pt-1">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 hidden md:block">
                    {item.hint}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-3">
                    <span className={`font-medium ${hasError ? 'text-red-400' : 'text-slate-400'}`}>NT$</span>
                    <input
                      type="number"
                      min="0"
                      className={`w-full md:w-48 bg-white border rounded-lg px-4 py-2 text-right font-medium focus:outline-none transition-all ${
                        hasError 
                          ? 'border-red-300 text-red-800 focus:ring-2 focus:ring-red-500' 
                          : 'border-slate-200 text-slate-800 focus:ring-2 focus:ring-blue-500'
                      }`}
                      placeholder="0"
                      value={item.amount || ''}
                      onChange={(e) => onAmountChange(item.id, parseFloat(e.target.value))}
                    />
                  </div>
                  {hasError && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors[item.id]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ClaimCategorySection;
