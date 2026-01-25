import React from 'react';
import { UserCheck } from 'lucide-react';

interface Props {
    content: string;
    source?: string;
}

const ExpertTip: React.FC<Props> = ({ content, source }) => {
    return (
        <div className="relative mt-4 mb-6 group">
            <div className="absolute -left-2 top-0 bottom-0 w-1 bg-[var(--color-brand-primary)] rounded-full" />
            <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-primary)]/10 rounded-r-xl p-4 pl-6 relative">
                <div className="absolute -top-3 -left-2 bg-[var(--color-brand-surface)] rounded-full p-1 border border-[var(--color-brand-primary)]/20 shadow-sm">
                    <UserCheck size={16} className="text-[var(--color-brand-primary)]" />
                </div>
                <p className="text-[var(--color-brand-secondary)] text-sm leading-relaxed font-medium">
                    <span className="text-[var(--color-brand-primary)] font-bold block mb-1 text-xs uppercase tracking-wider">Expert Tip</span>
                    {content}
                </p>
                {source && (
                    <div className="mt-2 text-[10px] text-[var(--color-brand-muted)] font-mono border-t border-[var(--color-brand-border)] pt-2 flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-[var(--color-brand-background)] rounded text-[var(--color-brand-muted)]">Source</span>
                        {source}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpertTip;
