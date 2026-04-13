/**
 * A strongly typed version of Object.entries that preserves key and value types.
 */
export function typedEntries<T extends Record<string, any>>(obj: T) {
    return Object.entries(obj) as {
        [K in keyof T]: [K, T[K]];
    }[keyof T][];
}
