import React, { createContext, useContext } from 'react';
import { ClaimItem, CustomItem, FormState } from '../types';

export interface ValidationErrors {
    claimantName?: string;
    accidentDate?: string;
    medical?: string;
}

export interface ClaimContextType {
    formState: FormState;
    setFormState: React.Dispatch<React.SetStateAction<FormState>>;
    errors: ValidationErrors;
    setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
    /** Items with 醫療費用 replaced by the 明細 sum when 明細 has amounts. */
    effectiveItems: ClaimItem[];
    medicalTotal: number;
    totalClaimAmount: number;
    netClaimAmount: number;
    hasData: boolean;
    /** True when the last write to localStorage succeeded. */
    saveOk: boolean;
    /** Ready for preview: has data, name, accident date, and every 明細 amount has a date. */
    isComplete: boolean;
    /** 明細 error message, shown only while a row still has an amount without a date. */
    medicalError?: string;
    handleAmountChange: (id: string, value: number) => void;
    handleMedicalEntryChange: (id: string, field: 'date' | 'amount', value: string | number) => void;
    handleAddMedicalRow: () => void;
    handleRemoveMedicalRow: (id: string) => void;
    handleCustomItemsUpdate: (newItems: CustomItem[]) => void;
    handleFaultChange: (value: number) => void;
    handleReset: () => boolean;
    validateBasicInfo: () => boolean;
    /** Returns the id of the first 明細 row that has an amount but no date. */
    findMedicalRowMissingDate: () => string | null;
}

export const ClaimContext = createContext<ClaimContextType | undefined>(undefined);

export const useClaimContext = (): ClaimContextType => {
    const context = useContext(ClaimContext);
    if (!context) {
        throw new Error('useClaimContext must be used within a ClaimProvider');
    }
    return context;
};
