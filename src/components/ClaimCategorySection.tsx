import React from 'react';
import { CategoryType, ClaimItem } from '../types';
import { HelpCircle, ExternalLink } from 'lucide-react';
import ExpertTip from './ExpertTip';
import AmountInput from './AmountInput';
import MedicalAmountField from './MedicalAmountField';
import { MEDICAL_ITEM_ID } from '../constants';

interface Props {
  category: CategoryType;
  items: ClaimItem[];
  onAmountChange: (id: string, value: number) => void;
  medicalTotal: number;
  onOpenMedical: () => void;
}

const ClaimCategorySection: React.FC<Props> = ({ category, items, onAmountChange, medicalTotal, onOpenMedical }) => {
  return (
    <section className="bg-[var(--color-brand-surface)] rounded-3xl shadow-xs border border-[var(--color-brand-border)] overflow-hidden mb-8">
      <div className="bg-[var(--color-brand-surface)] px-6 md:px-8 py-5 border-b border-[var(--color-brand-border)] flex items-center gap-3">
        <div className="w-1.5 h-6 bg-[var(--color-brand-primary)] rounded-full" aria-hidden="true"></div>
        <h2 className="text-xl font-bold text-[var(--color-brand-secondary)] tracking-tight">{category}</h2>
      </div>
      <div className="divide-y divide-[var(--color-brand-border)]">
        {items.map((item) => {
          const inputId = `amount-${item.id}`;
          return (
            <div key={item.id} className="p-6 md:p-8 transition-colors hover:bg-[var(--color-brand-background)]/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <label htmlFor={item.id === MEDICAL_ITEM_ID && medicalTotal > 0 ? undefined : inputId} className="text-lg font-semibold text-[var(--color-brand-secondary)]">{item.name}</label>
                    <div className="group relative">
                      <HelpCircle size={18} aria-hidden="true" className="text-[var(--color-brand-muted)]/50 hover:text-[var(--color-brand-secondary)] cursor-help transition-colors" />
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

                  {item.description && item.description.length > 20 && (
                    <div className="mt-3">
                      <ExpertTip content={item.description} />
                    </div>
                  )}

                  {item.link && (
                    <a
                      href={item.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 min-h-11 text-sm font-bold text-[var(--color-brand-primary)] underline underline-offset-4 decoration-[var(--color-brand-primary)]/40 hover:decoration-[var(--color-brand-primary)]"
                    >
                      {item.link.label}
                      <ExternalLink size={14} aria-hidden="true" />
                      <span className="sr-only">（另開新視窗）</span>
                    </a>
                  )}
                </div>

                {item.id === MEDICAL_ITEM_ID ? (
                  <MedicalAmountField
                    inputId={inputId}
                    manualAmount={item.amount}
                    medicalTotal={medicalTotal}
                    onManualChange={(v) => onAmountChange(item.id, v)}
                    onOpenDetails={onOpenMedical}
                  />
                ) : (
                  <div className="flex items-center gap-3 w-full md:w-auto bg-[var(--color-brand-surface)] rounded-xl p-1 border border-[var(--color-brand-border)] focus-within:border-[var(--color-brand-primary)] focus-within:ring-1 focus-within:ring-[var(--color-brand-primary)] transition-all">
                    <span className="pl-4 font-bold text-lg text-[var(--color-brand-muted)]" aria-hidden="true">NT$</span>
                    <AmountInput
                      id={inputId}
                      value={item.amount}
                      onValueChange={(v) => onAmountChange(item.id, v)}
                      className="w-full md:w-40 bg-transparent px-4 py-2 text-right font-bold text-xl md:text-2xl tabular-nums focus:outline-hidden text-[var(--color-brand-secondary)]"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ClaimCategorySection;
