import React, { useState, useEffect, useMemo, useSyncExternalStore, ReactNode } from 'react';
import { FormState, CustomItem } from '../types';
import { MEDICAL_ITEM_ID, createInitialState, createMedicalEntry } from '../constants';
import { applyFault, clampInt } from '../utils/amount';
import { getSaveStatus, hasAnyData, loadState, saveState, subscribeSaveStatus } from '../utils/storage';
import { ClaimContext, ValidationErrors } from './claimContextCore';

export const ClaimProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [formState, setFormState] = useState<FormState>(loadState);
    const [errors, setErrors] = useState<ValidationErrors>({});

    const medicalTotal = useMemo(
        () => formState.medicalEntries.reduce((sum, entry) => sum + entry.amount, 0),
        [formState.medicalEntries]
    );

    // The hand-typed 醫療費用 stays in state untouched; while 明細 has amounts,
    // the 明細 sum takes its place everywhere it is displayed or totalled.
    const effectiveItems = useMemo(
        () => formState.items.map((item) =>
            item.id === MEDICAL_ITEM_ID && medicalTotal > 0 ? { ...item, amount: medicalTotal } : item
        ),
        [formState.items, medicalTotal]
    );

    const totalClaimAmount = useMemo(() => {
        const standardTotal = effectiveItems.reduce((sum, item) => sum + item.amount, 0);
        const customTotal = formState.customItems.reduce((sum, item) => sum + (item.amount || 0), 0);
        return standardTotal + customTotal;
    }, [effectiveItems, formState.customItems]);

    const netClaimAmount = applyFault(totalClaimAmount, formState.faultPercent);
    const hasData = hasAnyData(formState);
    const saveOk = useSyncExternalStore(subscribeSaveStatus, getSaveStatus);
    const missingDateId = formState.medicalEntries.find((e) => e.amount > 0 && !e.date)?.id ?? null;
    const isComplete = hasData && formState.claimantName.trim() !== '' && formState.accidentDate !== '' && !missingDateId;
    const medicalError = missingDateId ? errors.medical : undefined;

    useEffect(() => {
        saveState(hasData ? formState : null);
    }, [formState, hasData]);

    const validateBasicInfo = (): boolean => {
        const newErrors: ValidationErrors = {};
        if (!formState.claimantName.trim()) newErrors.claimantName = '請輸入求償人姓名';
        if (!formState.accidentDate) newErrors.accidentDate = '請選擇事故發生日期';
        setErrors(prev => ({ ...prev, ...newErrors }));
        return Object.keys(newErrors).length === 0;
    };

    const findMedicalRowMissingDate = (): string | null => missingDateId;

    const handleAmountChange = (id: string, value: number) => {
        setFormState((prev) => ({
            ...prev,
            items: prev.items.map((item) => (item.id === id ? { ...item, amount: clampInt(value) } : item)),
        }));
    };

    const handleMedicalEntryChange = (id: string, field: 'date' | 'amount', value: string | number) => {
        const next = field === 'amount' ? clampInt(Number(value)) : String(value);
        setFormState((prev) => ({
            ...prev,
            medicalEntries: prev.medicalEntries.map((entry) => (entry.id === id ? { ...entry, [field]: next } : entry)),
        }));
    };

    const handleAddMedicalRow = () => {
        setFormState((prev) => ({ ...prev, medicalEntries: [...prev.medicalEntries, createMedicalEntry()] }));
    };

    const handleRemoveMedicalRow = (id: string) => {
        setFormState((prev) => {
            const rest = prev.medicalEntries.filter((entry) => entry.id !== id);
            return { ...prev, medicalEntries: rest.length ? rest : [createMedicalEntry()] };
        });
    };

    const handleCustomItemsUpdate = (newItems: CustomItem[]) => {
        setFormState(prev => ({
            ...prev,
            customItems: newItems.map((item) => ({ ...item, amount: clampInt(item.amount) })),
        }));
    };

    const handleFaultChange = (value: number) => {
        setFormState((prev) => ({ ...prev, faultPercent: clampInt(value, 100) }));
    };

    const handleReset = () => {
        if (window.confirm('確定要清除所有已填寫的資料嗎？此操作無法復原。')) {
            setFormState(createInitialState());
            setErrors({});
            saveState(null);
            return true;
        }
        return false;
    };

    return (
        <ClaimContext.Provider value={{
            formState,
            setFormState,
            errors,
            setErrors,
            effectiveItems,
            medicalTotal,
            totalClaimAmount,
            netClaimAmount,
            hasData,
            saveOk,
            isComplete,
            medicalError,
            handleAmountChange,
            handleMedicalEntryChange,
            handleAddMedicalRow,
            handleRemoveMedicalRow,
            handleCustomItemsUpdate,
            handleFaultChange,
            handleReset,
            validateBasicInfo,
            findMedicalRowMissingDate,
        }}>
            {children}
        </ClaimContext.Provider>
    );
};
