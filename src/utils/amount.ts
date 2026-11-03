export const MAX_AMOUNT = 100_000_000;

/** Clamp any number to an integer within [0, max]. NaN becomes 0. */
export const clampInt = (value: number, max: number = MAX_AMOUNT): number => {
    if (!Number.isFinite(value)) return value > 0 ? max : 0;
    return Math.min(max, Math.max(0, Math.round(value)));
};

/**
 * Parse user-typed text into a clamped integer. Non-digits (minus signs,
 * commas, decimals, letters) are dropped, so negatives cannot be entered.
 * Returns the clamped value and whether clamping to max happened.
 */
/** Digits only, after folding full-width digits (e.g. from a Zhuyin IME) to ASCII. */
export const toDigits = (text: string): string => text.normalize('NFKC').replace(/\D/g, '');

export const parseAmountText = (text: string, max: number = MAX_AMOUNT): { value: number; capped: boolean } => {
    const digits = toDigits(text);
    if (!digits) return { value: 0, capped: false };
    // Long digit strings exceed max anyway; avoid float overflow on parse.
    if (digits.length > String(max).length) return { value: max, capped: true };
    const n = parseInt(digits, 10);
    return { value: clampInt(n, max), capped: n > max };
};

export const formatAmount = (value: number): string => (value > 0 ? value.toLocaleString('en-US') : '');

export const formatNT = (value: number): string => `NT$ ${value.toLocaleString('en-US')}`;

/** Amount after deducting the claimant's own fault share. */
export const applyFault = (total: number, faultPercent: number): number =>
    Math.round((total * (100 - clampInt(faultPercent, 100))) / 100);
