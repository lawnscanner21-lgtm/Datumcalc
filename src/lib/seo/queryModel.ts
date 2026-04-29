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
    // Top volume days
    '7-tage-ab-heute': { canonicalSlug: '7-tage-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '14-tage-ab-heute': { canonicalSlug: '14-tage-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '21-tage-ab-heute': { canonicalSlug: '21-tage-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '30-tage-ab-heute': { canonicalSlug: '30-tage-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '45-tage-ab-heute': { canonicalSlug: '45-tage-ab-heute', intentType: 'Transactional', priority: 'Medium', calcMode: 'add_subtract', isIndexable: true },
    '60-tage-ab-heute': { canonicalSlug: '60-tage-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '90-tage-ab-heute': { canonicalSlug: '90-tage-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '100-tage-ab-heute': { canonicalSlug: '100-tage-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '120-tage-ab-heute': { canonicalSlug: '120-tage-ab-heute', intentType: 'Transactional', priority: 'Medium', calcMode: 'add_subtract', isIndexable: true },
    '180-tage-ab-heute': { canonicalSlug: '180-tage-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '365-tage-ab-heute': { canonicalSlug: '365-tage-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '500-tage-ab-heute': { canonicalSlug: '500-tage-ab-heute', intentType: 'Transactional', priority: 'Medium', calcMode: 'add_subtract', isIndexable: true },
    '1000-tage-ab-heute': { canonicalSlug: '1000-tage-ab-heute', intentType: 'Transactional', priority: 'Medium', calcMode: 'add_subtract', isIndexable: true },

    // Top volume months
    '1-monat-ab-heute': { canonicalSlug: '1-monat-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '2-monate-ab-heute': { canonicalSlug: '2-monate-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '3-monate-ab-heute': { canonicalSlug: '3-monate-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '6-monate-ab-heute': { canonicalSlug: '6-monate-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '12-monate-ab-heute': { canonicalSlug: '12-monate-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },

    // Top volume years
    '1-jahr-ab-heute': { canonicalSlug: '1-jahr-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '2-jahre-ab-heute': { canonicalSlug: '2-jahre-ab-heute', intentType: 'Transactional', priority: 'High', calcMode: 'add_subtract', isIndexable: true },
    '5-jahre-ab-heute': { canonicalSlug: '5-jahre-ab-heute', intentType: 'Transactional', priority: 'Medium', calcMode: 'add_subtract', isIndexable: true },
    '10-jahre-ab-heute': { canonicalSlug: '10-jahre-ab-heute', intentType: 'Transactional', priority: 'Medium', calcMode: 'add_subtract', isIndexable: true },
    
    // Top Events
    'tage-bis-weihnachten': { canonicalSlug: 'tage-bis-weihnachten', intentType: 'Informational', priority: 'High', calcMode: 'difference', isIndexable: true },
    'tage-bis-silvester': { canonicalSlug: 'tage-bis-silvester', intentType: 'Informational', priority: 'High', calcMode: 'difference', isIndexable: true },
    'tage-bis-ostern': { canonicalSlug: 'tage-bis-ostern', intentType: 'Informational', priority: 'High', calcMode: 'difference', isIndexable: true },
    'tage-bis-sommeranfang': { canonicalSlug: 'tage-bis-sommeranfang', intentType: 'Informational', priority: 'High', calcMode: 'difference', isIndexable: true },
    'tage-bis-winteranfang': { canonicalSlug: 'tage-bis-winteranfang', intentType: 'Informational', priority: 'Medium', calcMode: 'difference', isIndexable: true },
    'tage-bis-fruehlingsanfang': { canonicalSlug: 'tage-bis-fruehlingsanfang', intentType: 'Informational', priority: 'Medium', calcMode: 'difference', isIndexable: true },
    'tage-bis-herbstanfang': { canonicalSlug: 'tage-bis-herbstanfang', intentType: 'Informational', priority: 'Medium', calcMode: 'difference', isIndexable: true },

    // Business & Special
    'arbeitstage-jahr': { canonicalSlug: 'arbeitstage-jahr', intentType: 'Informational', priority: 'High', calcMode: 'business_days', isIndexable: true },
};

// Aliases -> Canonical (Cannibalization control)
export const QUERY_ALIASES: Record<string, string> = {
    '100-tage-von-heute': '100-tage-ab-heute',
    'datum-nach-100-tagen': '100-tage-ab-heute',
    'wie-viele-tage-bis-weihnachten': 'tage-bis-weihnachten',
    'arbeitstage-in-diesem-jahr': 'arbeitstage-jahr'
};

/**
 * Resolves an incoming slug to its canonical version.
 * Strictly enforces indexable variations to maintain the 220-page limit.
 */
export const resolveCanonicalQuery = cache((slugStr: string): { canonicalSlug: string; isExact: boolean, def?: QueryDefinition } => {
    // 1. Direct match in canonical map
    if (CANONICAL_QUERIES[slugStr]) {
        return { canonicalSlug: slugStr, isExact: true, def: CANONICAL_QUERIES[slugStr] };
    }
    
    // 2. Alias resolution
    if (QUERY_ALIASES[slugStr]) {
        const canonical = QUERY_ALIASES[slugStr];
        return { canonicalSlug: canonical, isExact: false, def: CANONICAL_QUERIES[canonical] };
    }

    // 3. Dynamic pattern - All others are marked as noindex to prevent GSC bloat
    const match = slugStr.match(/^(\d+)-(tage|monate|jahre)-ab-heute$/);
    if (match) {
        return {
            canonicalSlug: slugStr,
            isExact: true,
            def: {
                canonicalSlug: slugStr,
                intentType: 'Transactional',
                priority: 'Low',
                calcMode: 'add_subtract',
                isIndexable: false // Strict enforcement: only explicit variations are indexed
            }
        };
    }

    return { canonicalSlug: '', isExact: false };
});
