/** Unique-enough id for client-side rows: prefix + timestamp + random suffix. */
export const createId = (prefix: string): string =>
    `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
