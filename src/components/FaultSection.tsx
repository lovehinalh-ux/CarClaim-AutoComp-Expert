import React from 'react';
import { Scale, ExternalLink } from 'lucide-react';
import AmountInput from './AmountInput';
import { FAULT_CALC_URL } from '../constants';
import { formatNT } from '../utils/amount';

interface Props {
  faultPercent: number;
  total: number;
  net: number;
  onChange: (value: number) => void;
}

/** Optional own-fault share; shows the reduced, estimated claimable amount. */
const FaultSection: React.FC<Props> = ({ faultPercent, total, net, onChange }) => (
  <section className="bg-[var(--color-brand-surface)] rounded-2xl shadow-xs border border-[var(--color-brand-border)] p-5 md:p-6">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1">
        <h2 className="font-bold text-lg text-[var(--color-brand-secondary)] flex items-center gap-2">
          <Scale size={18} aria-hidden="true" />
          <label htmlFor="fault-percent">我方肇責比例</label>
          <span className="text-xs font-medium text-[var(--color-brand-muted)]">（選填）</span>
        </h2>
        <p className="text-sm text-[var(--color-brand-muted)] mt-1">若您也有部分責任，可請求的金額會依比例扣除。</p>
        <a
          href={FAULT_CALC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 min-h-11 text-sm font-bold text-[var(--color-brand-primary)] underline underline-offset-4 decoration-[var(--color-brand-primary)]/40 hover:decoration-[var(--color-brand-primary)]"
        >
          不確定比例？試算肇責 →
          <ExternalLink size={14} aria-hidden="true" />
          <span className="sr-only">（另開新視窗）</span>
        </a>
      </div>
      <div className="flex items-center w-full md:w-40 bg-white rounded-xl p-1 border border-[var(--color-brand-border)] focus-within:border-[var(--color-brand-primary)] focus-within:ring-1 focus-within:ring-[var(--color-brand-primary)]">
        <AmountInput
          id="fault-percent"
          plain
          max={100}
          value={faultPercent}
          onValueChange={onChange}
          aria-describedby="fault-result"
          className="w-full min-w-0 bg-transparent px-3 py-2 text-right font-bold text-xl tabular-nums focus:outline-hidden text-[var(--color-brand-secondary)]"
        />
        <span className="pr-4 font-bold text-lg text-[var(--color-brand-muted)]" aria-hidden="true">%</span>
      </div>
    </div>

    {faultPercent > 0 && (
      <div id="fault-result" className="mt-4 pt-4 border-t border-[var(--color-brand-border)]">
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-[var(--color-brand-muted)]">求償總額</dt>
          <dd className="font-bold text-lg tabular-nums text-[var(--color-brand-secondary)]">{formatNT(total)}</dd>
        </div>
        <div className="text-right">
          <dt className="text-[var(--color-brand-muted)]">預估可請求金額</dt>
          <dd className="font-bold text-lg tabular-nums text-[var(--color-brand-primary)]">{formatNT(net)}</dd>
        </div>
      </dl>
      <p className="mt-2 text-xs text-[var(--color-brand-muted)]">
        預估可請求金額 = 總額 × (1 − {faultPercent}%)，僅為估算，實際以調解或判決為準。
      </p>
      </div>
    )}
  </section>
);

export default FaultSection;
