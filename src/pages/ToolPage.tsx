import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ClaimCategorySection from '../components/ClaimCategorySection';
import OtherItemsSection from '../components/OtherItemsSection';
import Disclaimer from '../components/Disclaimer';
import MedicalDetailsTable from '../components/MedicalDetailsTable';

import { CategoryType } from '../types';
import { ClipboardList, Stethoscope, Eye, User, Trash2 } from 'lucide-react';
import SEO from '../components/SEO';
import { useClaimContext } from '../context/ClaimContext';

const ToolPage: React.FC = () => {
    const navigate = useNavigate();
    // Edit Mode State (Summary vs Medical)
    const [editMode, setEditMode] = useState<'summary' | 'medical'>('summary');

    const {
        formState,
        setFormState,
        errors,
        setErrors,
        totalClaimAmount,
        handleAmountChange,
        handleMedicalEntryChange,
        handleAddMedicalRow,
        handleRemoveMedicalRow,
        handleCustomItemsUpdate,
        handleReset,
        validateBasicInfo
    } = useClaimContext();

    const categories = Object.values(CategoryType);

    const handleGoToPreview = () => {
        if (validateBasicInfo()) {
            navigate('/preview');
        } else {
            // Find the first error and scroll to it if possible, or just alert
            const firstError = document.querySelector('.text-red-500');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            else window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const onResetClick = () => {
        if (handleReset()) {
            setEditMode('summary');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-brand-background)] text-[var(--color-brand-secondary)] flex flex-col">
            <SEO />
            <div className="no-print">
                <Header />
            </div>

            <main className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-6 py-4 md:py-8 flex flex-col gap-6">

                {/* Editor Sub-Tabs */}
                <div className="bg-white p-1.5 rounded-xl shadow-sm border border-stone-200 flex flex-shrink-0 sticky top-4 z-20">
                    <button
                        onClick={() => setEditMode('summary')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${editMode === 'summary' ? 'bg-[var(--color-brand-primary)] text-white shadow-md' : 'text-[var(--color-brand-muted)] hover:text-[var(--color-brand-secondary)] hover:bg-stone-50'}`}
                    >
                        <ClipboardList size={18} /> 求償項目
                    </button>
                    <button
                        onClick={() => setEditMode('medical')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${editMode === 'medical' ? 'bg-[var(--color-brand-primary)] text-white shadow-md' : 'text-[var(--color-brand-muted)] hover:text-[var(--color-brand-secondary)] hover:bg-stone-50'}`}
                    >
                        <Stethoscope size={18} /> 醫療明細
                    </button>
                </div>

                <div className="flex-1">
                    {editMode === 'summary' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            {/* Basic Info */}
                            <section className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold flex items-center gap-2"><User size={18} /> 基本資訊</h3>
                                    <button onClick={onResetClick} className="text-xs text-stone-400 hover:text-red-500 flex items-center gap-1"><Trash2 size={12} /> 清除</button>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-xs font-bold text-stone-500 mb-1.5">姓名 <span className="text-red-500">*</span></label>
                                        <input className={`w-full p-2.5 rounded-lg border ${errors.claimantName ? 'border-red-300 bg-red-50' : 'border-stone-200'}`} value={formState.claimantName} onChange={e => {
                                            setFormState(p => ({ ...p, claimantName: e.target.value }));
                                            if (e.target.value) setErrors(p => ({ ...p, claimantName: undefined }));
                                        }} />
                                        {errors.claimantName && <p className="text-red-500 text-xs mt-1">{errors.claimantName}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-stone-500 mb-1.5">事故日期 <span className="text-red-500">*</span></label>
                                        <input type="date" className={`w-full p-2.5 rounded-lg border ${errors.accidentDate ? 'border-red-300 bg-red-50' : 'border-stone-200'}`} value={formState.accidentDate} onChange={e => {
                                            setFormState(p => ({ ...p, accidentDate: e.target.value }));
                                            if (e.target.value) setErrors(p => ({ ...p, accidentDate: undefined }));
                                        }} />
                                        {errors.accidentDate && <p className="text-red-500 text-xs mt-1">{errors.accidentDate}</p>}
                                    </div>
                                </div>
                            </section>

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

                            <Disclaimer />

                        </div>
                    )}

                    {editMode === 'medical' && (
                        <div className="animate-in slide-in-from-right-4 duration-300">
                            <MedicalDetailsTable
                                entries={formState.medicalEntries}
                                onEntryChange={handleMedicalEntryChange}
                                onAddRow={handleAddMedicalRow}
                                onRemoveRow={handleRemoveMedicalRow}
                                onBack={() => setEditMode('summary')}
                            />
                        </div>
                    )}
                </div>

            </main>

            {/* Sticky Summary & Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-stone-200 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] flex justify-between items-center z-50 safe-area-bottom">
                <div className="flex flex-col">
                    <div className="text-xs text-stone-500 font-bold">預估總額</div>
                    <div className="text-2xl font-black text-[var(--color-brand-primary)] tabular-nums">NT$ {totalClaimAmount.toLocaleString()}</div>
                </div>
                <button
                    onClick={handleGoToPreview}
                    className="bg-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-primary)] text-white px-8 py-3 rounded-xl font-bold text-base shadow-lg transition-all flex items-center gap-2"
                >
                    <Eye size={18} /> 預覽並輸出
                </button>
            </div>

            {/* Add padding to prevent content from being hidden by fixed footer */}
            <div className="h-24"></div>

        </div>
    );
};

export default ToolPage;
