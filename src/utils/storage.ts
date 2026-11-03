import { ClaimItem, CustomItem, FormState, MedicalEntry } from '../types';
import { INITIAL_ITEMS, createInitialState } from '../constants';
import { clampInt } from './amount';
import { createId } from './id';

export const STORAGE_KEY = 'carclaim:v1';
/** Personal and medical data is dropped after this long without edits. */
export const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

type Loose = Record<string, unknown>;

const isObj = (v: unknown): v is Loose => typeof v === 'object' && v !== null && !Array.isArray(v);
const str = (v: unknown): string => (typeof v === 'string' ? v : '');
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const date = (v: unknown): string => (typeof v === 'string' && DATE_RE.test(v) ? v : '');
const num = (v: unknown, max?: number): number => (typeof v === 'number' ? clampInt(v, max) : 0);

/** React keys and DOM ids rely on unique ids; regenerate empty or repeated ones. */
const dedupeIds = <T extends { id: string }>(rows: T[], prefix: string): T[] => {
    const seen = new Set<string>();
    return rows.map((row) => {
        const id = row.id && !seen.has(row.id) ? row.id : createId(prefix);
        seen.add(id);
        return id === row.id ? row : { ...row, id };
    });
};

const mergeItems = (stored: unknown): ClaimItem[] => {
    const amounts = new Map<string, number>();
    if (Array.isArray(stored)) {
        stored.filter(isObj).forEach((it) => amounts.set(str(it.id), num(it.amount)));
    }
    // Metadata (name, hints, links) always comes from code; only amounts persist.
    return INITIAL_ITEMS.map((item) => ({ ...item, amount: amounts.get(item.id) ?? 0 }));
};

const mergeEntries = (stored: unknown): MedicalEntry[] | null => {
    if (!Array.isArray(stored)) return null;
    const rows = stored.filter(isObj).map((e) => ({
        id: str(e.id),
        date: date(e.date),
        amount: num(e.amount),
    }));
    return rows.length ? dedupeIds(rows, 'med') : null;
};

const mergeCustom = (stored: unknown): CustomItem[] | null => {
    if (!Array.isArray(stored)) return null;
    return dedupeIds(stored.filter(isObj).map((c) => ({
        id: str(c.id),
        name: str(c.name),
        amount: num(c.amount),
    })), 'custom');
};

export const loadState = (): FormState => {
    const base = createInitialState();
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return base;
        const parsed: unknown = JSON.parse(raw);
        if (!isObj(parsed)) return base;
        const savedAt = typeof parsed.savedAt === 'number' ? parsed.savedAt : 0;
        if (Date.now() - savedAt > MAX_AGE_MS) {
            window.localStorage.removeItem(STORAGE_KEY);
            return base;
        }
        return {
            claimantName: str(parsed.claimantName),
            accidentDate: date(parsed.accidentDate),
            items: mergeItems(parsed.items),
            medicalEntries: mergeEntries(parsed.medicalEntries) ?? base.medicalEntries,
            customItems: mergeCustom(parsed.customItems) ?? base.customItems,
            faultPercent: num(parsed.faultPercent, 100),
        };
    } catch {
        return base;
    }
};

// Last save outcome as a tiny external store, so the UI can show
// 「已自動儲存」 only when the write actually succeeded.
let lastSaveOk = true;
const listeners = new Set<() => void>();

export const subscribeSaveStatus = (fn: () => void) => {
    listeners.add(fn);
    return () => { listeners.delete(fn); };
};
export const getSaveStatus = () => lastSaveOk;

export const saveState = (state: FormState | null): boolean => {
    let ok = true;
    try {
        if (state) {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, savedAt: Date.now() }));
        } else {
            window.localStorage.removeItem(STORAGE_KEY);
        }
    } catch {
        // Storage may be unavailable (private mode / quota); the form still works.
        ok = false;
    }
    if (ok !== lastSaveOk) {
        lastSaveOk = ok;
        listeners.forEach((fn) => fn());
    }
    return ok;
};

export const hasAnyData = (s: FormState): boolean =>
    s.claimantName.trim() !== '' ||
    s.accidentDate !== '' ||
    s.faultPercent > 0 ||
    s.items.some((i) => i.amount > 0) ||
    s.medicalEntries.some((e) => e.amount > 0 || e.date !== '') ||
    s.customItems.some((c) => c.amount > 0 || c.name.trim() !== '');
