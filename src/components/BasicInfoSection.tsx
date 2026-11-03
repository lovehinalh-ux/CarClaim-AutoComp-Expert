import React from 'react';
import { User, Trash2, CheckCircle2 } from 'lucide-react';
import { useClaimContext } from '../context/claimContextCore';

interface Props {
  onReset: () => void;
}

const inputBase = 'w-full min-h-11 px-3 py-2.5 rounded-lg border text-base';

const BasicInfoSection: React.FC<Props> = ({ onReset }) => {
  const { formState, setFormState, errors, setErrors, hasData, saveOk } = useClaimContext();

  return (
    <section className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
      <div className="flex justify-between items-center gap-3 mb-1">
        <h2 className="font-bold flex items-center gap-2"><User size={18} aria-hidden="true" /> 基本資訊</h2>
        <div className="flex items-center gap-1">
          {hasData && saveOk && (
            <span className="flex items-center gap-1 text-xs text-[var(--color-brand-muted)]" role="status">
              <CheckCircle2 size={14} aria-hidden="true" /> 已自動儲存
            </span>
          )}
          <button
            type="button"
            onClick={onReset}
            className="min-h-11 px-3 -mr-3 text-sm text-stone-600 hover:text-red-700 hover:bg-stone-50 rounded-lg flex items-center gap-1"
          >
            <Trash2 size={14} aria-hidden="true" /> 清除
          </button>
        </div>
      </div>
      <p className="text-xs text-[var(--color-brand-muted)] mb-4 md:text-right">資料只存在這台裝置的瀏覽器，用共用電腦請記得清除。</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="claimant-name" className="block text-xs font-bold text-stone-600 mb-1.5">姓名 <span className="text-red-700" aria-hidden="true">*</span><span className="sr-only">（必填）</span></label>
          <input
            id="claimant-name"
            autoComplete="name"
            aria-invalid={Boolean(errors.claimantName) || undefined}
            aria-describedby={errors.claimantName ? 'claimant-name-err' : undefined}
            className={`${inputBase} ${errors.claimantName ? 'border-red-300 bg-red-50' : 'border-stone-200'}`}
            value={formState.claimantName}
            onChange={e => {
              const v = e.target.value;
              setFormState(p => ({ ...p, claimantName: v }));
              if (v) setErrors(p => ({ ...p, claimantName: undefined }));
            }}
          />
          {errors.claimantName && <p id="claimant-name-err" data-error className="text-red-700 text-xs mt-1">{errors.claimantName}</p>}
        </div>
        <div>
          <label htmlFor="accident-date" className="block text-xs font-bold text-stone-600 mb-1.5">事故日期 <span className="text-red-700" aria-hidden="true">*</span><span className="sr-only">（必填）</span></label>
          <input
            id="accident-date"
            type="date"
            aria-invalid={Boolean(errors.accidentDate) || undefined}
            aria-describedby={errors.accidentDate ? 'accident-date-err' : undefined}
            className={`${inputBase} ${errors.accidentDate ? 'border-red-300 bg-red-50' : 'border-stone-200'}`}
            value={formState.accidentDate}
            onChange={e => {
              const v = e.target.value;
              setFormState(p => ({ ...p, accidentDate: v }));
              if (v) setErrors(p => ({ ...p, accidentDate: undefined }));
            }}
          />
          {errors.accidentDate && <p id="accident-date-err" data-error className="text-red-700 text-xs mt-1">{errors.accidentDate}</p>}
        </div>
      </div>
    </section>
  );
};

export default BasicInfoSection;
