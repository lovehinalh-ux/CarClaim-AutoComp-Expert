
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ClaimCategorySection from './components/ClaimCategorySection';
import Disclaimer from './components/Disclaimer';
import MedicalDetailsTable from './components/MedicalDetailsTable';
import ProfileCard from './components/ProfileCard';
import PreviewLanding from './components/PreviewLanding';
import PDFPreview from './components/PDFPreview';
import { CategoryType, ClaimItem, FormState, MedicalEntry } from './types';
import { INITIAL_ITEMS, INITIAL_MEDICAL_ENTRIES } from './constants';
import { Download, Calculator, User, Calendar, ClipboardList, Stethoscope, Eye, AlertCircle, Trash2, ArrowLeft } from 'lucide-react';
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

  const handleReset = () => {
    if (window.confirm('確定要清除所有已填寫的資料嗎？此操作無法復原。')) {
      setFormState({
        claimantName: '',
        accidentDate: '',
        items: INITIAL_ITEMS.map(item => ({ ...item, amount: 0 })),
        medicalEntries: INITIAL_MEDICAL_ENTRIES.map(entry => ({ ...entry, date: '', amount: 0 })),
      });
      setErrors({});
      setViewMode('summary');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const totalClaimAmount = useMemo(() => {
    return formState.items.reduce((sum, item) => sum + item.amount, 0);
  }, [formState.items]);

  const categories = Object.values(CategoryType);

  const handleExportPDF = () => {
    window.print();
  };

  const navigateTo = (mode: ViewMode) => {
    if (mode === 'preview' || mode === 'medical') {
      if (!validateBasicInfo()) {
        const firstError = document.querySelector('.text-red-500');
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
    <div className="min-h-screen pb-40 bg-slate-50">
      <SEO />
      <div className="no-print">
        <Header />
      </div>

      <main className="max-w-4xl mx-auto px-4">
        {/* Navigation Tabs (Mobile-friendly) */}
        <div className="flex bg-slate-200/50 p-1 rounded-xl mb-8 no-print shadow-inner">
          <button
            onClick={() => navigateTo('summary')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${viewMode === 'summary' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:bg-white/50'}`}
          >
            <ClipboardList size={18} /> 求償一覽表
          </button>
          <button
            onClick={() => navigateTo('medical')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${viewMode === 'medical' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:bg-white/50'}`}
          >
            <Stethoscope size={18} /> 醫療明細試算
          </button>
          <button
            onClick={() => navigateTo('preview')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${viewMode === 'preview' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:bg-white/50'}`}
          >
            <Eye size={18} /> 查看預覽
          </button>
        </div>

        {viewMode === 'summary' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Action Bar */}
            <div className="flex justify-between items-center no-print">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <User size={20} className="text-blue-600" /> 基本資訊與項目填寫
              </h2>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-bold border border-red-100 shadow-sm"
              >
                <Trash2 size={16} /> 一鍵清除
              </button>
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col md:flex-row gap-6 relative">
              <div className="flex-1 space-y-2">
                <label className={`flex items-center gap-2 text-sm font-bold ${errors.claimantName ? 'text-red-600' : 'text-slate-700'}`}>
                  求償人姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="請輸入姓名"
                  className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 transition-all ${errors.claimantName ? 'border-red-300 bg-red-50 focus:ring-red-500' : 'border-slate-200 focus:ring-blue-500'}`}
                  value={formState.claimantName}
                  onChange={(e) => {
                    setFormState(prev => ({ ...prev, claimantName: e.target.value }));
                    if (e.target.value.trim()) setErrors(prev => ({ ...prev, claimantName: undefined }));
                  }}
                />
                {errors.claimantName && (
                  <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle size={12} /> {errors.claimantName}
                  </p>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <label className={`flex items-center gap-2 text-sm font-bold ${errors.accidentDate ? 'text-red-600' : 'text-slate-700'}`}>
                  事故發生日期 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 transition-all ${errors.accidentDate ? 'border-red-300 bg-red-50 focus:ring-red-500' : 'border-slate-200 focus:ring-blue-500'}`}
                  value={formState.accidentDate}
                  onChange={(e) => {
                    setFormState(prev => ({ ...prev, accidentDate: e.target.value }));
                    if (e.target.value) setErrors(prev => ({ ...prev, accidentDate: undefined }));
                  }}
                />
                {errors.accidentDate && (
                  <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle size={12} /> {errors.accidentDate}
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex justify-end no-print">
              <button
                onClick={() => navigateTo('medical')}
                className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1 group bg-blue-50/50 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors"
              >
                <Calculator size={14} className="group-hover:rotate-12 transition-transform" />
                點擊此處計算詳細醫療明細
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

            <Disclaimer />

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
            <div className="mt-6 text-slate-500 text-sm italic">
              * 填寫完畢後，總金額將自動帶入「求償一覽表」中的醫療費用欄位。
            </div>
          </div>
        )}

        {viewMode === 'preview' && (
          <div className="pb-10">
            <PDFPreview
              claimantName={formState.claimantName}
              accidentDate={formState.accidentDate}
              items={formState.items}
              totalAmount={totalClaimAmount}
              onBack={() => navigateTo('summary')}
              onPrint={handleExportPDF}
            />
          </div>
        )}

        {/* Print Styles */}
        <style>{`
          @media print {
            body { background: white !important; margin: 0; padding: 0; }
            header, .no-print, button, .group, .help-icon, nav, .fixed { display: none !important; }
            .print-only { display: block !important; }
            .max-w-4xl { max-width: 100% !important; margin: 0 !important; width: 100% !important; }
            main { padding: 0 !important; margin-top: 0 !important; }
            .shadow-2xl, .shadow-sm, .shadow-xl, .shadow-inner { box-shadow: none !important; }
            .border { border: 1px solid #e2e8f0 !important; }
            .min-h-screen { min-height: auto !important; }
            .bg-slate-50 { background: white !important; }
            .bg-white { background: white !important; }
            .rounded-lg, .rounded-2xl { border-radius: 0 !important; }
            input { border: none !important; appearance: none !important; padding: 0 !important; background: transparent !important; }
          }
        `}</style>
      </main>

      {/* Floating Bottom Bar */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl p-4 md:p-6 z-40 no-print transition-all duration-500`}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span className="text-slate-500 font-medium">
              {viewMode === 'medical' ? '醫療明細總計：' : '預估總求償金額：'}
            </span>
            <span className={`text-3xl font-black ${viewMode === 'medical' ? 'text-blue-500' : 'text-blue-700'}`}>
              NT$ {(viewMode === 'medical' ? medicalTotal : totalClaimAmount).toLocaleString()}
            </span>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            {viewMode === 'summary' ? (
              <button
                onClick={() => navigateTo('preview')}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#8B4513] text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-orange-200"
              >
                <Eye size={20} /> 生成預覽並輸出
              </button>
            ) : viewMode === 'medical' ? (
              <button
                onClick={() => navigateTo('summary')}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                完成計算並返回
              </button>
            ) : (
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => navigateTo('summary')}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-xl font-bold transition-all shadow-sm"
                >
                  <ArrowLeft size={18} /> 返回修改內容
                </button>
                <button
                  onClick={handleExportPDF}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#8B4513] text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-orange-200"
                >
                  <Download size={20} /> 確認輸出 PDF
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
