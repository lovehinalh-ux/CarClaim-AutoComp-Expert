import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ClaimCategorySection from './components/ClaimCategorySection';
import OtherItemsSection from './components/OtherItemsSection';
import Disclaimer from './components/Disclaimer';
import MedicalDetailsTable from './components/MedicalDetailsTable';
import ProfileCard from './components/ProfileCard';
import PreviewLanding from './components/PreviewLanding';
import PDFPreview from './components/PDFPreview';
import { CategoryType, ClaimItem, FormState, MedicalEntry, CustomItem } from './types';
import { INITIAL_ITEMS, INITIAL_MEDICAL_ENTRIES } from './constants';
import { Download, Calculator, User, ClipboardList, Stethoscope, Eye, AlertCircle, Trash2, ArrowLeft } from 'lucide-react';
import SEO from './components/SEO';

type ViewMode = 'landing' | 'summary' | 'medical' | 'preview';

interface ValidationErrors {
  claimantName?: string;
  accidentDate?: string;
  items?: Record<string, string>;
}

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [formState, setFormState] = useState<FormState>({
    claimantName: '',
    accidentDate: '',
    items: INITIAL_ITEMS,
    medicalEntries: INITIAL_MEDICAL_ENTRIES,
    customItems: [
      { id: 'custom-1', name: '', amount: 0 },
      { id: 'custom-2', name: '', amount: 0 },
    ]
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  // Calculate medical total
  const medicalTotal = useMemo(() => {
    return formState.medicalEntries.reduce((sum, entry) => sum + entry.amount, 0);
  }, [formState.medicalEntries]);

  // Sync medical total to the "Medical Expenses" item in the list
  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === '1' ? { ...item, amount: medicalTotal } : item
      ),
    }));
  }, [medicalTotal]);

  const validateBasicInfo = (): boolean => {
    const newErrors: ValidationErrors = {};
    if (!formState.claimantName.trim()) {
      newErrors.claimantName = '請輸入求償人姓名';
    }
    if (!formState.accidentDate) {
      newErrors.accidentDate = '請選擇事故發生日期';
    }
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleAmountChange = (id: string, value: number) => {
    const itemErrors = { ...errors.items };
    if (isNaN(value) || value < 0) {
      itemErrors[id] = '金額必須為大於或等於 0 的數字';
    } else {
      delete itemErrors[id];
    }

    setErrors(prev => ({ ...prev, items: itemErrors }));
    setFormState((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, amount: isNaN(value) ? 0 : value } : item
      ),
    }));
  };

  const handleMedicalEntryChange = (id: string, field: 'date' | 'amount', value: string | number) => {
    setFormState((prev) => ({
      ...prev,
      medicalEntries: prev.medicalEntries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      ),
    }));
  };

  const handleAddMedicalRow = () => {
    const newId = `med-${Date.now()}`;
    setFormState((prev) => ({
      ...prev,
      medicalEntries: [...prev.medicalEntries, { id: newId, date: '', amount: 0 }],
    }));
  };

  const handleRemoveMedicalRow = (id: string) => {
    setFormState((prev) => ({
      ...prev,
      medicalEntries: prev.medicalEntries.filter((entry) => entry.id !== id),
    }));
  };

  const handleCustomItemsUpdate = (newItems: CustomItem[]) => {
    setFormState(prev => ({ ...prev, customItems: newItems }));
  };

  const handleReset = () => {
    if (window.confirm('確定要清除所有已填寫的資料嗎？此操作無法復原。')) {
      setFormState({
        claimantName: '',
        accidentDate: '',
        items: INITIAL_ITEMS.map(item => ({ ...item, amount: 0 })),
        medicalEntries: INITIAL_MEDICAL_ENTRIES.map(entry => ({ ...entry, date: '', amount: 0 })),
        customItems: [
          { id: `custom-${Date.now()}-1`, name: '', amount: 0 },
          { id: `custom-${Date.now()}-2`, name: '', amount: 0 },
        ]
      });
      setErrors({});
      setViewMode('summary');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const totalClaimAmount = useMemo(() => {
    const standardTotal = formState.items.reduce((sum, item) => sum + item.amount, 0);
    const customTotal = formState.customItems.reduce((sum, item) => sum + (item.amount || 0), 0);
    return standardTotal + customTotal;
  }, [formState.items, formState.customItems]);

  const categories = Object.values(CategoryType);

  const handleExportPDF = () => {
    window.print();
  };

  const navigateTo = (mode: ViewMode) => {
    if (mode === 'preview' || mode === 'medical') {
      if (!validateBasicInfo()) {
        const firstError = document.querySelector('.text-amber-700');
        firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
    setViewMode(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (viewMode === 'landing') {
    return <PreviewLanding onStart={() => setViewMode('summary')} />;
  }

  return (
    <div className="min-h-screen pb-40 bg-[var(--color-brand-background)] text-[var(--color-brand-secondary)]">
      <SEO />
      <div className="no-print">
        <Header />
      </div>

      <main className="max-w-4xl mx-auto px-6 md:px-8 py-8">
        {/* Navigation Tabs (Swiss Style Refined) */}
        <div className="flex bg-[var(--color-brand-surface)] p-1.5 rounded-2xl mb-10 no-print border border-[var(--color-brand-border)]">
          <button
            onClick={() => navigateTo('summary')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all text-lg ${viewMode === 'summary' ? 'bg-[var(--color-brand-background)] border border-[var(--color-brand-border)] text-[var(--color-brand-secondary)]' : 'text-[var(--color-brand-muted)] hover:text-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-background)]'}`}
          >
            <ClipboardList size={20} /> 求償一覽表
          </button>
          <button
            onClick={() => navigateTo('medical')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all text-lg ${viewMode === 'medical' ? 'bg-[var(--color-brand-background)] border border-[var(--color-brand-border)] text-[var(--color-brand-secondary)]' : 'text-[var(--color-brand-muted)] hover:text-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-background)]'}`}
          >
            <Stethoscope size={20} /> 醫療明細
          </button>
          <button
            onClick={() => navigateTo('preview')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all text-lg ${viewMode === 'preview' ? 'bg-[var(--color-brand-background)] border border-[var(--color-brand-border)] text-[var(--color-brand-secondary)]' : 'text-[var(--color-brand-muted)] hover:text-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-background)]'}`}
          >
            <Eye size={20} /> 預覽輸出
          </button>
        </div>

        {viewMode === 'summary' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            {/* Basic Info Section */}
            <section className="bg-[var(--color-brand-surface)] rounded-2xl border border-[var(--color-brand-border)] shadow-sm overflow-hidden no-print">
              <div className="px-8 py-5 border-b border-[var(--color-brand-border)] flex justify-between items-center">
                <h2 className="text-xl font-bold text-[var(--color-brand-secondary)] flex items-center gap-3">
                  <User size={24} className="text-[var(--color-brand-primary)]" /> 基本資訊
                </h2>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[var(--color-brand-muted)] hover:text-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-background)] rounded-lg border border-[var(--color-brand-border)] transition-all"
                >
                  <Trash2 size={16} /> 清除重填
                </button>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`bg-[var(--color-brand-background)] p-6 rounded-xl border transition-all ${errors.claimantName ? 'border-amber-300 ring-1 ring-amber-300' : 'border-[var(--color-brand-border)]'}`}>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-secondary)] mb-3">
                    求償人姓名 <span className="text-[var(--color-brand-primary)]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="請輸入姓名"
                    className={`w-full bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all text-[var(--color-brand-secondary)] placeholder-[var(--color-brand-muted)]/50 ${errors.claimantName ? 'border-amber-400 bg-amber-50' : ''}`}
                    value={formState.claimantName}
                    onChange={(e) => {
                      setFormState(prev => ({ ...prev, claimantName: e.target.value }));
                      if (e.target.value.trim()) setErrors(prev => ({ ...prev, claimantName: undefined }));
                    }}
                  />
                  {errors.claimantName && (
                    <p className="text-amber-700 text-xs mt-2 flex items-center gap-1 font-bold">
                      <AlertCircle size={14} /> {errors.claimantName}
                    </p>
                  )}
                </div>

                <div className={`bg-[var(--color-brand-background)] p-6 rounded-xl border transition-all ${errors.accidentDate ? 'border-amber-300 ring-1 ring-amber-300' : 'border-[var(--color-brand-border)]'}`}>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-secondary)] mb-3">
                    事故日期 <span className="text-[var(--color-brand-primary)]">*</span>
                  </label>
                  <input
                    type="date"
                    className={`w-full bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all text-[var(--color-brand-secondary)] ${errors.accidentDate ? 'border-amber-400 bg-amber-50' : ''}`}
                    value={formState.accidentDate}
                    onChange={(e) => {
                      setFormState(prev => ({ ...prev, accidentDate: e.target.value }));
                      if (e.target.value) setErrors(prev => ({ ...prev, accidentDate: undefined }));
                    }}
                  />
                  {errors.accidentDate && (
                    <p className="text-amber-700 text-xs mt-2 flex items-center gap-1 font-bold">
                      <AlertCircle size={14} /> {errors.accidentDate}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <div className="flex justify-end no-print">
              <button
                onClick={() => navigateTo('medical')}
                className="text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-primary)] text-base font-bold flex items-center gap-2 group bg-[var(--color-brand-surface)] px-5 py-3 rounded-xl border border-[var(--color-brand-border)] transition-all hover:border-[var(--color-brand-primary)] shadow-sm"
              >
                <Calculator size={18} />
                進入醫療明細計算機
                <ArrowLeft size={18} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Categories */}
            {categories.map((cat) => (
              <ClaimCategorySection
                key={cat}
                category={cat}
                items={formState.items.filter((item) => item.category === cat)}
                onAmountChange={handleAmountChange}
                errors={errors.items}
              />
            ))}

            <OtherItemsSection
              items={formState.customItems}
              onUpdate={handleCustomItemsUpdate}
            />

            <div className="pt-8 border-t-2 border-stone-200">
              <Disclaimer />
            </div>

            <div className="no-print">
              <ProfileCard />
            </div>
          </div>
        )}

        {viewMode === 'medical' && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <MedicalDetailsTable
              entries={formState.medicalEntries}
              onEntryChange={handleMedicalEntryChange}
              onAddRow={handleAddMedicalRow}
              onRemoveRow={handleRemoveMedicalRow}
              onBack={() => navigateTo('summary')}
            />
            <div className="mt-8 p-6 bg-stone-100 rounded-2xl text-stone-600 text-base font-medium flex items-center gap-3">
              <AlertCircle size={20} />
              填寫完畢後，總金額將自動帶入「求償一覽表」中的醫療費用欄位。
            </div>
          </div>
        )}

        {viewMode === 'preview' && (
          <div className="pb-10">
            <PDFPreview
              claimantName={formState.claimantName}
              accidentDate={formState.accidentDate}
              items={formState.items}
              customItems={formState.customItems}
              totalAmount={totalClaimAmount}
              medicalEntries={formState.medicalEntries}
              onBack={() => navigateTo('summary')}
              onPrint={handleExportPDF}
            />
          </div>
        )}

        {/* Print Styles */}
        <style>{`
          @media print {
            header, .no-print, button, .group, .help-icon, nav, .fixed { display: none !important; }
            body { background: white !important; -webkit-print-color-adjust: exact; }
            main { padding: 0 !important; max-width: none !important; margin: 0 !important; }
          }
        `}</style>
      </main>

      {/* Sticky Summary Bar (Warm Amber Redesign) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[var(--color-brand-surface)]/95 backdrop-blur-xl border-t border-[var(--color-brand-border)] shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] p-4 md:p-6 z-40 no-print transition-all duration-500">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 bg-[var(--color-brand-background)] px-6 py-3 rounded-2xl border border-[var(--color-brand-border)] w-full md:w-auto justify-center md:justify-start">
            <span className="text-[var(--color-brand-muted)] font-bold text-sm uppercase tracking-wider">
              {viewMode === 'medical' ? '醫療總計' : '求償總額'}
            </span>
            <span className="text-3xl font-black tabular-nums tracking-tighter text-[var(--color-brand-secondary)]">
              <span className="text-sm font-bold mr-1 text-[var(--color-brand-muted)]/60">NT$</span>
              {(viewMode === 'medical' ? medicalTotal : totalClaimAmount).toLocaleString()}
            </span>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            {viewMode === 'summary' ? (
              <button
                onClick={() => navigateTo('preview')}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[var(--color-brand-primary)] text-white px-8 py-3.5 rounded-xl font-bold text-lg transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-[var(--color-brand-primary)]/10"
              >
                <Eye size={20} /> 預覽並輸出
              </button>
            ) : viewMode === 'medical' ? (
              <button
                onClick={() => navigateTo('summary')}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[var(--color-brand-primary)] text-white px-8 py-3.5 rounded-xl font-bold text-lg transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-[var(--color-brand-primary)]/10"
              >
                完成計算
              </button>
            ) : (
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => navigateTo('summary')}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[var(--color-brand-background)] border border-[var(--color-brand-border)] text-[var(--color-brand-muted)] hover:text-[var(--color-brand-secondary)] hover:border-[var(--color-brand-secondary)] px-6 py-3.5 rounded-xl font-bold transition-all"
                >
                  <ArrowLeft size={20} /> 修改
                </button>
                <button
                  onClick={handleExportPDF}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-primary)] text-white px-10 py-3.5 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-xl shadow-[var(--color-brand-secondary)]/10"
                >
                  <Download size={20} /> 下載 PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
