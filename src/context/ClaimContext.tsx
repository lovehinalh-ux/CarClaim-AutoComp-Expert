import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { FormState, CustomItem } from '../types';
import { INITIAL_ITEMS, INITIAL_MEDICAL_ENTRIES } from '../constants';

interface ValidationErrors {
    claimantName?: string;
    accidentDate?: string;
    items?: Record<string, string>;
}

interface ClaimContextType {
    formState: FormState;
    setFormState: React.Dispatch<React.SetStateAction<FormState>>;
    errors: ValidationErrors;
    setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
    medicalTotal: number;
    totalClaimAmount: number;
    handleAmountChange: (id: string, value: number) => void;
    handleMedicalEntryChange: (id: string, field: 'date' | 'amount', value: string | number) => void;
    handleAddMedicalRow: () => void;
    handleRemoveMedicalRow: (id: string) => void;
    handleCustomItemsUpdate: (newItems: CustomItem[]) => void;
    handleReset: () => void;
    validateBasicInfo: () => boolean;
}

const ClaimContext = createContext<ClaimContextType | undefined>(undefined);

export const ClaimProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

    // Calculate total claim amount
    const totalClaimAmount = useMemo(() => {
        const standardTotal = formState.items.reduce((sum, item) => sum + item.amount, 0);
        const customTotal = formState.customItems.reduce((sum, item) => sum + (item.amount || 0), 0);
        return standardTotal + customTotal;
    }, [formState.items, formState.customItems]);

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
            medicalTotal,
            totalClaimAmount,
            handleAmountChange,
            handleMedicalEntryChange,
            handleAddMedicalRow,
            handleRemoveMedicalRow,
            handleCustomItemsUpdate,
            handleReset,
            validateBasicInfo
        }}>
            {children}
        </ClaimContext.Provider>
    );
};

export const useClaimContext = () => {
    const context = useContext(ClaimContext);
    if (!context) {
        throw new Error('useClaimContext must be used within a ClaimProvider');
    }
    return context;
};
