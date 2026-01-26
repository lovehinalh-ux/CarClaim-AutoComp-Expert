import React from 'react';
import { Plus, Trash2, HelpCircle } from 'lucide-react';
import { CustomItem } from '../types';

interface OtherItemsSectionProps {
    items: CustomItem[];
    onUpdate: (items: CustomItem[]) => void;
}

const OtherItemsSection: React.FC<OtherItemsSectionProps> = ({ items, onUpdate }) => {
    const handleAddItem = () => {
        const newItem: CustomItem = {
            id: `custom-${Date.now()}`,
            name: '',
            amount: 0,
        };
        onUpdate([...items, newItem]);
    };

    const handleRemoveItem = (id: string) => {
        onUpdate(items.filter(item => item.id !== id));
    };

    const handleChange = (id: string, field: 'name' | 'amount', value: string | number) => {
        onUpdate(items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const totalAmount = items.reduce((sum, item) => sum + (item.amount || 0), 0);

    return (
        <section className="bg-[var(--color-brand-surface)] rounded-2xl shadow-sm border border-[var(--color-brand-border)] overflow-hidden mb-6 transition-all hover:shadow-md">
            <div className="bg-[var(--color-brand-surface)] px-6 py-4 border-b border-[var(--color-brand-border)] flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-[var(--color-brand-background)] p-2 rounded-lg text-[var(--color-brand-primary)]">
                        <Plus size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-[var(--color-brand-secondary)] text-lg">其他求償項目</h3>
                        <p className="text-xs text-[var(--color-brand-muted)] mt-0.5">可自定義新增其他未列出的求償項目</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-[var(--color-brand-muted)] mb-1">本項小計</p>
                    <p className="text-xl font-bold text-[var(--color-brand-primary)] font-mono">
                        {totalAmount.toLocaleString()}
                    </p>
                </div>
            </div>

            <div className="p-6 space-y-4">
                {items.map((item, index) => (
                    <div key={item.id} className="flex gap-4 items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex-1">
                            <label className="text-xs font-bold text-[var(--color-brand-muted)] mb-1 block">項目名稱 ({index + 1})</label>
                            <input
                                type="text"
                                placeholder="請輸入項目名稱"
                                className="w-full border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] rounded-lg px-3 py-2 text-sm text-[var(--color-brand-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/50 focus:border-[var(--color-brand-primary)] transition-all placeholder-[var(--color-brand-muted)]/30"
                                value={item.name}
                                onChange={(e) => handleChange(item.id, 'name', e.target.value)}
                            />
                        </div>
                        <div className="w-1/3">
                            <label className="text-xs font-bold text-[var(--color-brand-muted)] mb-1 block">金額</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-brand-muted)]/50">$</span>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    className="w-full border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] rounded-lg pl-6 pr-3 py-2 text-sm font-mono text-right text-[var(--color-brand-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/50 focus:border-[var(--color-brand-primary)] transition-all placeholder-[var(--color-brand-muted)]/30"
                                    value={item.amount || ''}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value) || 0;
                                        handleChange(item.id, 'amount', Math.max(0, val));
                                    }}
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="mt-6 p-2 text-[var(--color-brand-muted)]/30 hover:text-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-background)] rounded-lg transition-colors"
                            title="移除此項目"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}

                <button
                    onClick={handleAddItem}
                    className="w-full py-3 border-2 border-dashed border-[var(--color-brand-border)] rounded-xl text-[var(--color-brand-primary)] font-bold hover:border-[var(--color-brand-primary)]/50 hover:bg-[var(--color-brand-background)]/50 transition-all flex items-center justify-center gap-2 mt-4"
                >
                    <Plus size={18} />
                    新增求償項目
                </button>
            </div>
        </section>
    );
};

export default OtherItemsSection;
