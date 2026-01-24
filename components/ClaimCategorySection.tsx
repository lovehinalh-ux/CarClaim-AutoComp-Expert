
import React from 'react';
import { CategoryType, ClaimItem } from '../types';
import { HelpCircle, AlertCircle } from 'lucide-react';
import ExpertTip from './ExpertTip';

interface Props {
  category: CategoryType;
  items: ClaimItem[];
  onAmountChange: (id: string, value: number) => void;
  errors?: Record<string, string>;
}

const ClaimCategorySection: React.FC<Props> = ({ category, items, onAmountChange, errors }) => {
  return (
    <section className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden mb-8">
      <div className="bg-stone-50 px-8 py-5 border-b border-stone-200 flex items-center gap-3">
        <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
        <h2 className="text-xl font-black text-stone-900 tracking-tight">{category}</h2>
      </div>
      <div className="divide-y divide-stone-100">
        {items.map((item) => {
          const hasError = errors && errors[item.id];
          return (
            <div key={item.id} className={`p-6 md:p-8 transition-colors hover:bg-stone-50/80 ${hasError ? 'bg-red-50/50' : ''}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-lg font-bold ${hasError ? 'text-red-700' : 'text-stone-900'}`}>{item.name}</span>
                    <div className="group relative">
                      <HelpCircle size={18} className="text-stone-300 hover:text-stone-500 cursor-help transition-colors" />
                      <div className="absolute left-0 bottom-full mb-2 w-72 bg-stone-900 text-white text-sm rounded-xl p-4 opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10 shadow-xl leading-relaxed transform translate-y-2 group-hover:translate-y-0">
                        <div className="font-bold mb-1 text-stone-200">{item.hint}</div>
                        {item.description && (
                          <div className="mt-2 text-stone-400 text-xs border-t border-stone-700 pt-2 leading-relaxed">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-base text-stone-500 font-medium hidden md:block">
                    {item.hint}
                  </p>

                  {/* Expert Authority Integration */}
                  {item.description && item.description.length > 20 && (
                    <div className="mt-3">
                      <ExpertTip content={item.description} />
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-3 w-full md:w-auto bg-stone-50 rounded-xl p-1 border border-stone-200 focus-within:border-stone-900 focus-within:ring-1 focus-within:ring-stone-900 transition-all">
                    <span className={`pl-4 font-black text-lg ${hasError ? 'text-red-500' : 'text-stone-400'}`}>NT$</span>
                    <input
                      type="number"
                      min="0"
                      className={`w-full md:w-40 bg-transparent px-4 py-2 text-right font-black text-xl md:text-2xl focus:outline-none placeholder-stone-200 ${hasError
                        ? 'text-red-700'
                        : 'text-stone-900'
                        }`}
                      placeholder="0"
                      value={item.amount || ''}
                      onChange={(e) => onAmountChange(item.id, parseFloat(e.target.value))}
                    />
                  </div>
                  {hasError && (
                    <p className="text-red-600 text-xs font-bold flex items-center gap-1">
                      <AlertCircle size={12} /> {errors[item.id]}
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
