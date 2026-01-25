
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
    <section className="bg-[var(--color-brand-surface)] rounded-3xl shadow-sm border border-[var(--color-brand-border)] overflow-hidden mb-8">
      <div className="bg-[var(--color-brand-surface)] px-8 py-5 border-b border-[var(--color-brand-border)] flex items-center gap-3">
        <div className="w-1.5 h-6 bg-[var(--color-brand-primary)] rounded-full"></div>
        <h2 className="text-xl font-bold text-[var(--color-brand-secondary)] tracking-tight">{category}</h2>
      </div>
      <div className="divide-y divide-stone-100">
        {items.map((item) => {
          const hasError = errors && errors[item.id];
          return (
            <div key={item.id} className={`p-6 md:p-8 transition-colors hover:bg-[var(--color-brand-background)]/50 ${hasError ? 'bg-amber-50/50' : ''}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-lg font-bold ${hasError ? 'text-amber-800' : 'text-[var(--color-brand-secondary)]'}`}>{item.name}</span>
                    <div className="group relative">
                      <HelpCircle size={18} className="text-[var(--color-brand-muted)]/50 hover:text-[var(--color-brand-secondary)] cursor-help transition-colors" />
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
                  <p className="text-base text-[var(--color-brand-muted)] font-medium hidden md:block">
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
                  <div className="flex items-center gap-3 w-full md:w-auto bg-[var(--color-brand-background)] rounded-xl p-1 border border-[var(--color-brand-border)] focus-within:border-[var(--color-brand-secondary)] focus-within:ring-1 focus-within:ring-[var(--color-brand-secondary)] transition-all">
                    <span className={`pl-4 font-bold text-lg ${hasError ? 'text-amber-600' : 'text-[var(--color-brand-muted)]'}`}>NT$</span>
                    <input
                      type="number"
                      min="0"
                      className={`w-full md:w-40 bg-transparent px-4 py-2 text-right font-bold text-xl md:text-2xl focus:outline-none placeholder-[var(--color-brand-border)] ${hasError
                        ? 'text-amber-800'
                        : 'text-[var(--color-brand-secondary)]'
                        }`}
                      placeholder="0"
                      value={item.amount || ''}
                      onChange={(e) => onAmountChange(item.id, parseFloat(e.target.value))}
                    />
                  </div>
                  {hasError && (
                    <p className="text-amber-700 text-xs font-bold flex items-center gap-1">
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
