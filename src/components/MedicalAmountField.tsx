import React from 'react';
import { ListPlus, PencilLine } from 'lucide-react';
import AmountInput from './AmountInput';
import { formatNT } from '../utils/amount';

interface Props {
  inputId: string;
  manualAmount: number;
  medicalTotal: number;
  onManualChange: (value: number) => void;
  onOpenDetails: () => void;
}

const linkBtn =
  'inline-flex items-center gap-1.5 min-h-11 px-3 rounded-lg text-sm font-bold text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-background)] underline underline-offset-4 decoration-[var(--color-brand-primary)]/40 whitespace-nowrap';

/** 醫療費用: manual entry, or a read-only sum once 明細 has amounts. */
const MedicalAmountField: React.FC<Props> = ({ inputId, manualAmount, medicalTotal, onManualChange, onOpenDetails }) => {
  if (medicalTotal > 0) {
    return (
      <div className="flex flex-col items-stretch md:items-end gap-1 w-full md:w-auto">
        <div
          id={inputId}
          role="group"
          aria-label="醫療費用（由明細加總）"
          className="flex items-center justify-between md:justify-end gap-3 rounded-xl border border-dashed border-[var(--color-brand-border)] bg-[var(--color-brand-background)] px-4 py-2.5"
        >
          <span className="text-xs font-bold text-[var(--color-brand-muted)] whitespace-nowrap">由明細加總</span>
          <span className="font-bold text-xl md:text-2xl tabular-nums text-[var(--color-brand-secondary)]">{formatNT(medicalTotal)}</span>
        </div>
        <button type="button" onClick={onOpenDetails} className={`${linkBtn} self-end`}>
          <PencilLine size={16} aria-hidden="true" /> 編輯明細
        </button>
        {manualAmount > 0 && (
          <p className="text-xs text-[var(--color-brand-muted)] md:text-right max-w-xs self-end">
            您先前手動輸入的 {formatNT(manualAmount)} 已保留，清空明細後會恢復。
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-stretch md:items-end gap-1 w-full md:w-auto">
      <div className="flex items-center gap-3 w-full md:w-auto bg-[var(--color-brand-surface)] rounded-xl p-1 border border-[var(--color-brand-border)] focus-within:border-[var(--color-brand-primary)] focus-within:ring-1 focus-within:ring-[var(--color-brand-primary)] transition-all">
        <span className="pl-4 font-bold text-lg text-[var(--color-brand-muted)]" aria-hidden="true">NT$</span>
        <AmountInput
          id={inputId}
          aria-label="醫療費用金額（新台幣）"
          value={manualAmount}
          onValueChange={onManualChange}
          className="w-full md:w-40 bg-transparent px-4 py-2 text-right font-bold text-xl md:text-2xl tabular-nums focus:outline-hidden text-[var(--color-brand-secondary)]"
        />
      </div>
      <button type="button" onClick={onOpenDetails} className={`${linkBtn} self-end`}>
        <ListPlus size={16} aria-hidden="true" /> 填寫明細 →
      </button>
    </div>
  );
};

export default MedicalAmountField;
