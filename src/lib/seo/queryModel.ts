import { cache } from 'react';

export type SearchIntentType = 'Informational' | 'Transactional' | 'Navigational';
export type PriorityLevel = 'High' | 'Medium' | 'Low';

export interface QueryDefinition {
    canonicalSlug: string;
    intentType: SearchIntentType;
    priority: PriorityLevel;
    calcMode: 'difference' | 'add_subtract' | 'business_days' | 'age';
    relatedEvents?: string[];
    isIndexable: boolean;
}

// Master map of how queries cluster
export const CANONICAL_QUERIES: Record<string, QueryDefinition> = {
    // Top volume dates
    '30-tage-ab-heute': { canonicalSlug: '30-tage-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '60-tage-ab-heute': { canonicalSlug: '60-tage-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '90-tage-ab-heute': { canonicalSlug: '90-tage-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '100-tage-ab-heute': { canonicalSlug: '100-tage-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '365-tage-ab-heute': { canonicalSlug: '365-tage-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    
    // Top Events
    'tage-bis-weihnachten': { canonicalSlug: 'tage-bis-weihnachten', intentType: 'Informational', priority: 'High', calcMode: 'difference', isIndexable: true },
    'tage-bis-silvester': { canonicalSlug: 'tage-bis-silvester', intentType: 'Informational', priority: 'High', calcMode: 'difference', isIndexable: true },
    'tage-bis-ostern': { canonicalSlug: 'tage-bis-ostern', intentType: 'Informational', priority: 'High', calcMode: 'difference', isIndexable: true },
    'tage-bis-sommeranfang': { canonicalSlug: 'tage-bis-sommeranfang', intentType: 'Informational', priority: 'High', calcMode: 'difference', isIndexable: true },

    // Business queries
    'arbeitstage-jahr': { canonicalSlug: 'arbeitstage-jahr', intentType: 'Informational', priority: 'High', calcMode: 'business_days', isIndexable: true },
};

// Aliases -> Canonical (Cannibalization control)
export const QUERY_ALIASES: Record<string, string> = {
    '100-tage-von-heute': '100-tage-ab-heute',
    'datum-nach-100-tagen': '100-tage-ab-heute',
    '3-monate-ab-heute': '90-tage-ab-heute', // Redirect approximation to exact
    'wie-viele-tage-bis-weihnachten': 'tage-bis-weihnachten',
    'arbeitstage-in-diesem-jahr': 'arbeitstage-jahr'
};

const DYNAMIC_QUERY_REGEX = /^(\d+)-(tage|monate|jahre)-ab-heute$/;

/**
 * Resolves an incoming slug to its canonical version.
 * If not found directly, tries to match regex patterns.
 * Wrapped in React cache to prevent duplicate processing in the same request.
 */
export const resolveCanonicalQuery = cache((slugStr: string): { canonicalSlug: string; isExact: boolean, def?: QueryDefinition } => {
    if (CANONICAL_QUERIES[slugStr]) {
        return { canonicalSlug: slugStr, isExact: true, def: CANONICAL_QUERIES[slugStr] };
    }
    
    if (QUERY_ALIASES[slugStr]) {
        const canonical = QUERY_ALIASES[slugStr];
        return { canonicalSlug: canonical, isExact: false, def: CANONICAL_QUERIES[canonical] };
    }

    // Dynamic extraction (e.g. 45-tage-ab-heute)
    const match = slugStr.match(DYNAMIC_QUERY_REGEX);
    if (match) {
        // Technically highly dynamic, we allow it but mark as indexable based on rules
        const num = parseInt(match[1]);
        const priority = num <= 365 && num % 10 === 0 ? 'Medium' : 'Low';
        
        return {
            canonicalSlug: slugStr,
            isExact: true,
            def: {
                canonicalSlug: slugStr,
                intentType: 'Transactional',
                priority,
                calcMode: 'add_subtract',
                isIndexable: priority !== 'Low' // Don't index every single random number
            }
        };
    }

    return { canonicalSlug: '', isExact: false };
});

