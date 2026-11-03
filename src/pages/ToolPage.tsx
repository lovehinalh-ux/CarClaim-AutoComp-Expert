import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BasicInfoSection from '../components/BasicInfoSection';
import ClaimCategorySection from '../components/ClaimCategorySection';
import OtherItemsSection from '../components/OtherItemsSection';
import FaultSection from '../components/FaultSection';
import Disclaimer from '../components/Disclaimer';
import MedicalDetailsTable from '../components/MedicalDetailsTable';
import BottomBar from '../components/BottomBar';
import SEO from '../components/SEO';
import { CategoryType } from '../types';
import { ClipboardList, Stethoscope } from 'lucide-react';
import { useClaimContext } from '../context/claimContextCore';
import { medicalDateId, medicalRowId } from '../utils/domIds';

type EditMode = 'summary' | 'medical';

const tabClass = (active: boolean) =>
    `flex-1 flex items-center justify-center gap-2 min-h-11 py-3 rounded-lg font-bold transition-all ${active ? 'bg-[var(--color-brand-primary)] text-white shadow-md' : 'text-[var(--color-brand-muted)] hover:text-[var(--color-brand-secondary)] hover:bg-stone-50'}`;

/** Router state PreviewPage sends when it bounces an incomplete form back here. */
export interface ToolPageLocationState {
    validate?: boolean;
}

const ToolPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [editMode, setEditMode] = useState<EditMode>('summary');

    const {
        formState,
        setErrors,
        medicalError,
        medicalTotal,
        totalClaimAmount,
        netClaimAmount,
        handleAmountChange,
        handleMedicalEntryChange,
        handleAddMedicalRow,
        handleRemoveMedicalRow,
        handleCustomItemsUpdate,
        handleFaultChange,
        handleReset,
        validateBasicInfo,
        findMedicalRowMissingDate,
    } = useClaimContext();

    const categories = Object.values(CategoryType);

    const switchMode = (mode: EditMode) => {
        setEditMode(mode);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const focusAfterRender = (fn: () => void) => window.setTimeout(fn, 60);

    /** Shows errors and focuses the first problem; returns true when ready to preview. */
    const validateAndFocus = (): boolean => {
        const badRow = findMedicalRowMissingDate();
        if (badRow) {
            setErrors((p) => ({ ...p, medical: '有金額的明細都需要選擇就醫日期，請補上日期後再輸出。' }));
            setEditMode('medical');
            focusAfterRender(() => {
                document.getElementById(medicalRowId(badRow))?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                document.getElementById(medicalDateId(badRow))?.focus({ preventScroll: true });
            });
            return false;
        }
        if (validateBasicInfo()) return true;
        setEditMode('summary');
        focusAfterRender(() => {
            const target = document.querySelector<HTMLInputElement>('[aria-invalid="true"]');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                target.focus({ preventScroll: true });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        return false;
    };

    const handleGoToPreview = () => {
        if (validateAndFocus()) navigate('/preview');
    };

    // Bounced back from /preview (reload, back/forward, direct link) with an
    // incomplete form: run the same checks once, then drop the router state.
    const validateRef = useRef(validateAndFocus);
    useEffect(() => {
        validateRef.current = validateAndFocus;
    });
    const bounced = Boolean((location.state as ToolPageLocationState | null)?.validate);
    useEffect(() => {
        if (!bounced) return;
        navigate('.', { replace: true, state: null });
        const id = window.setTimeout(() => validateRef.current(), 0);
        return () => window.clearTimeout(id);
    }, [bounced, navigate]);

    const onResetClick = () => {
        if (handleReset()) switchMode('summary');
    };

    return (
        <div className="min-h-screen bg-[var(--color-brand-background)] text-[var(--color-brand-secondary)] flex flex-col">
            <SEO />
            <div className="no-print">
                <Header />
            </div>

            <main className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-6 pb-4 md:pb-8 flex flex-col gap-4 md:gap-6">

                {/* Sticky tabs sit on a page-colored band so scrolled content never peeks around them. */}
                <div className="sticky top-0 z-30 -mx-4 md:-mx-6 px-4 md:px-6 pt-3 pb-2 md:pt-6 bg-[var(--color-brand-background)]">
                    <div role="group" aria-label="編輯區塊" className="bg-white p-1.5 rounded-xl shadow-xs border border-stone-200 flex">
                        <button type="button" aria-pressed={editMode === 'summary'} onClick={() => switchMode('summary')} className={tabClass(editMode === 'summary')}>
                            <ClipboardList size={18} aria-hidden="true" /> 求償項目
                        </button>
                        <button type="button" aria-pressed={editMode === 'medical'} onClick={() => switchMode('medical')} className={tabClass(editMode === 'medical')}>
                            <Stethoscope size={18} aria-hidden="true" /> 醫療明細
                        </button>
                    </div>
                </div>

                <div className="flex-1">
                    {editMode === 'summary' && (
                        <div className="space-y-6">
                            <BasicInfoSection onReset={onResetClick} />

                            {categories.map((cat) => (
                                <ClaimCategorySection
                                    key={cat}
                                    category={cat}
                                    items={formState.items.filter((item) => item.category === cat)}
                                    onAmountChange={handleAmountChange}
                                    medicalTotal={medicalTotal}
                                    onOpenMedical={() => switchMode('medical')}
                                />
                            ))}

                            <OtherItemsSection
                                items={formState.customItems}
                                onUpdate={handleCustomItemsUpdate}
                            />

                            <FaultSection
                                faultPercent={formState.faultPercent}
                                total={totalClaimAmount}
                                net={netClaimAmount}
                                onChange={handleFaultChange}
                            />

                            <Disclaimer />
                        </div>
                    )}

                    {editMode === 'medical' && (
                        <MedicalDetailsTable
                            entries={formState.medicalEntries}
                            onEntryChange={handleMedicalEntryChange}
                            onAddRow={handleAddMedicalRow}
                            onRemoveRow={handleRemoveMedicalRow}
                            onBack={() => switchMode('summary')}
                            error={medicalError}
                        />
                    )}
                </div>
            </main>

            <BottomBar
                total={totalClaimAmount}
                net={netClaimAmount}
                faultPercent={formState.faultPercent}
                onPreview={handleGoToPreview}
            />

            {/* Spacer so the fixed bar never covers the last content */}
            <div className={formState.faultPercent > 0 ? 'h-32' : 'h-24'} aria-hidden="true"></div>
        </div>
    );
};

export default ToolPage;
