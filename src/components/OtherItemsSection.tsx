import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CustomItem } from '../types';
import AmountInput from './AmountInput';
import { formatNT } from '../utils/amount';
import { createId } from '../utils/id';

interface OtherItemsSectionProps {
    items: CustomItem[];
    onUpdate: (items: CustomItem[]) => void;
}

const fieldBox =
    'border border-[var(--color-brand-border)] bg-white rounded-lg min-h-11 focus-within:ring-2 focus-within:ring-[var(--color-brand-primary)]/50 focus-within:border-[var(--color-brand-primary)] transition-all';

const OtherItemsSection: React.FC<OtherItemsSectionProps> = ({ items, onUpdate }) => {
    const handleAddItem = () => {
        onUpdate([...items, { id: createId('custom'), name: '', amount: 0 }]);
    };

    const handleRemoveItem = (id: string) => {
        onUpdate(items.filter(item => item.id !== id));
    };

    const handleChange = (id: string, patch: Partial<CustomItem>) => {
        onUpdate(items.map(item => (item.id === id ? { ...item, ...patch } : item)));
    };

    const totalAmount = items.reduce((sum, item) => sum + (item.amount || 0), 0);

    return (
        <section className="bg-[var(--color-brand-surface)] rounded-2xl shadow-xs border border-[var(--color-brand-border)] overflow-hidden mb-6 transition-all hover:shadow-md">
            <div className="bg-[var(--color-brand-surface)] px-6 py-4 border-b border-[var(--color-brand-border)] flex justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-[var(--color-brand-background)] p-2 rounded-lg text-[var(--color-brand-primary)]" aria-hidden="true">
                        <Plus size={20} />
                    </div>
                    <div>
                        <h2 className="font-bold text-[var(--color-brand-secondary)] text-lg">其他求償項目</h2>
                        <p className="text-xs text-[var(--color-brand-muted)] mt-0.5">可自定義新增其他未列出的求償項目</p>
                    </div>
                </div>
                <div className="text-right shrink-0">
                    <p className="text-xs text-[var(--color-brand-muted)] mb-1">本項小計</p>
                    <p className="text-xl font-bold text-[var(--color-brand-primary)] tabular-nums whitespace-nowrap">
                        {formatNT(totalAmount)}
                    </p>
                </div>
            </div>

            <div className="p-4 md:p-6 space-y-4">
                {items.map((item, index) => (
                    <div key={item.id} className="flex gap-2 md:gap-4 items-end">
                        <div className="flex-1 min-w-0">
                            <label htmlFor={`custom-name-${item.id}`} className="text-xs font-bold text-[var(--color-brand-muted)] mb-1 block">項目名稱（{index + 1}）</label>
                            <input
                                id={`custom-name-${item.id}`}
                                type="text"
                                placeholder="例：輔具費"
                                className={`${fieldBox} w-full px-3 py-2 text-base text-[var(--color-brand-secondary)] focus:outline-hidden`}
                                value={item.name}
                                onChange={(e) => handleChange(item.id, { name: e.target.value })}
                            />
                        </div>
                        <div className="w-[38%] md:w-1/3 min-w-0">
                            <label htmlFor={`custom-amount-${item.id}`} className="text-xs font-bold text-[var(--color-brand-muted)] mb-1 block">金額（{index + 1}）</label>
                            <div className={`${fieldBox} flex items-center`}>
                                <span className="pl-2.5 text-sm font-bold text-[var(--color-brand-muted)]" aria-hidden="true">NT$</span>
                                <AmountInput
                                    id={`custom-amount-${item.id}`}
                                    value={item.amount}
                                    onValueChange={(v) => handleChange(item.id, { amount: v })}
                                    className="w-full min-w-0 bg-transparent px-2.5 py-2 text-base font-bold tabular-nums text-right text-[var(--color-brand-secondary)] focus:outline-hidden"
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="w-11 h-11 shrink-0 flex items-center justify-center text-[var(--color-brand-muted)] hover:text-red-700 hover:bg-[var(--color-brand-background)] rounded-lg transition-colors"
                            aria-label={`移除第 ${index + 1} 個項目`}
                        >
                            <Trash2 size={18} aria-hidden="true" />
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddItem}
                    className="w-full min-h-11 py-3 border-2 border-dashed border-[var(--color-brand-border)] rounded-xl text-[var(--color-brand-primary)] font-bold hover:border-[var(--color-brand-primary)]/50 hover:bg-[var(--color-brand-background)]/50 transition-all flex items-center justify-center gap-2 mt-4"
                >
                    <Plus size={18} aria-hidden="true" />
                    新增求償項目
                </button>
            </div>
        </section>
    );
};

export default OtherItemsSection;
