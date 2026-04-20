/**
 * URL Translation Engine
 * Maps internal SEO tokens to localized URL segments.
 */

export const INTENT_TRANSLATIONS: Record<string, Record<string, string>> = {
    de: { 
        addieren: 'addieren', differenz: 'differenz', arbeitstage: 'arbeitstage', alter: 'alter', 
        ratgeber: 'ratgeber', 'ueber-uns': 'ueber-uns', agb: 'agb', datenschutz: 'datenschutz', impressum: 'impressum', sitemap: 'sitemap' 
    },
    en: { 
        addieren: 'add', differenz: 'difference', arbeitstage: 'business', alter: 'age', 
        ratgeber: 'guide', 'ueber-uns': 'about-us', agb: 'terms', datenschutz: 'privacy', impressum: 'imprint', sitemap: 'sitemap' 
    },
    es: { 
        addieren: 'sumar', differenz: 'diferencia', arbeitstage: 'laborables', alter: 'edad', 
        ratgeber: 'guia', 'ueber-uns': 'sobre-nosotros', agb: 'terminos', datenschutz: 'privacidad', impressum: 'aviso-legal', sitemap: 'sitemap' 
    },
    fr: { 
        addieren: 'ajouter', differenz: 'difference', arbeitstage: 'ouvrables', alter: 'age', 
        ratgeber: 'guide', 'ueber-uns': 'a-propos', agb: 'conditions', datenschutz: 'confidentialite', impressum: 'mentions-legales', sitemap: 'sitemap' 
    },
    it: { 
        addieren: 'aggiungere', differenz: 'differenza', arbeitstage: 'lavorativi', alter: 'eta', 
        ratgeber: 'guida', 'ueber-uns': 'chi-siamo', agb: 'condizioni', datenschutz: 'privacy', impressum: 'note-legali', sitemap: 'sitemap' 
    },
    pt: { 
        addieren: 'adicionar', differenz: 'diferenca', arbeitstage: 'uteis', alter: 'idade', 
        ratgeber: 'guia', 'ueber-uns': 'sobre-nos', agb: 'termos', datenschutz: 'privacidade', impressum: 'aviso-legal', sitemap: 'sitemap' 
    }
};

export const SLUG_TOKEN_TRANSLATIONS: Record<string, Record<string, string>> = {
    de: { 
        'tage': 'tage', 'monate': 'monate', 'jahre': 'jahre', 
        'ab-heute': 'ab-heute', 'tage-bis': 'tage-bis',
        'weihnachten': 'weihnachten', 'silvester': 'silvester', 
        'ostern': 'ostern', 'sommeranfang': 'sommeranfang'
    },
    en: { 
        'tage': 'days', 'monate': 'months', 'jahre': 'years', 
        'ab-heute': 'from-today', 'tage-bis': 'days-until',
        'weihnachten': 'christmas', 'silvester': 'new-year', 
        'ostern': 'easter', 'sommeranfang': 'summer-solstice'
    },
    es: { 
        'tage': 'dias', 'monate': 'meses', 'jahre': 'anos', 
        'ab-heute': 'desde-hoy', 'tage-bis': 'dias-hasta',
        'weihnachten': 'navidad', 'silvester': 'nochevieja', 
        'ostern': 'pascua', 'sommeranfang': 'solsticio-de-verano'
    },
    fr: { 
        'tage': 'jours', 'monate': 'mois', 'jahre': 'annees', 
        'ab-heute': 'a-partir-d-aujourd-hui', 'tage-bis': 'jours-jusqu-a',
        'weihnachten': 'noel', 'silvester': 'nouvel-an', 
        'ostern': 'paques', 'sommeranfang': 'solstice-d-ete'
    },
    it: { 
        'tage': 'giorni', 'monate': 'mesi', 'jahre': 'anni', 
        'ab-heute': 'da-oggi', 'tage-bis': 'giorni-fino-a',
        'weihnachten': 'natale', 'silvester': 'capodanno', 
        'ostern': 'pasqua', 'sommeranfang': 'solstizio-d-estate'
    },
    pt: { 
        'tage': 'dias', 'monate': 'meses', 'jahre': 'anos', 
        'ab-heute': 'a-partir-de-hoje', 'tage-bis': 'dias-ate',
        'weihnachten': 'natal', 'silvester': 'ano-novo', 
        'ostern': 'pascoa', 'sommeranfang': 'solsticio-de-verao'
    }
};

/**
 * Translates a German slug into a localized one.
 */
export function translateSlug(slug: string, locale: string): string {
    const tokens = locale === 'de' ? {} : SLUG_TOKEN_TRANSLATIONS[locale];
    if (!tokens) return slug;

    let localized = slug;
    Object.entries(SLUG_TOKEN_TRANSLATIONS['de']).forEach(([key, deVal]) => {
        const regex = new RegExp(`\\b${deVal}\\b`, 'g');
        localized = localized.replace(regex, tokens[key] || deVal);
    });
    return localized;
}

/**
 * Reverses a localized slug back to its German canonical version.
 * Greedily searches across ALL locales to handle "mixed" URLs from GSC.
 */
export function reverseTranslateSlug(slug: string, locale?: string): string {
    // 1. Try specified locale first (Performance)
    let canonical = slug;
    if (locale && locale !== 'de' && SLUG_TOKEN_TRANSLATIONS[locale]) {
        Object.entries(SLUG_TOKEN_TRANSLATIONS[locale]).forEach(([key, locVal]) => {
            const regex = new RegExp(`\\b${locVal}\\b`, 'g');
            canonical = canonical.replace(regex, SLUG_TOKEN_TRANSLATIONS['de'][key]);
        });
    }

    // 2. If it still looks non-German or we want exhaustive search, check ALL locales
    // This handles cases where a bot puts a French word in a Spanish URL
    const allLocales = Object.keys(SLUG_TOKEN_TRANSLATIONS);
    allLocales.forEach(loc => {
        if (loc === 'de') return;
        const tokens = SLUG_TOKEN_TRANSLATIONS[loc];
        Object.entries(tokens).forEach(([key, locVal]) => {
            // Only replace if the target canonical token isn't already there 
            // (prevents double translation issues if words overlap)
            const regex = new RegExp(`\\b${locVal}\\b`, 'g');
            canonical = canonical.replace(regex, SLUG_TOKEN_TRANSLATIONS['de'][key]);
        });
    });

    return canonical;
}

import { SITE_URL } from '@/lib/constants';

/**
 * Generates the canonical path for a page, respecting the 'as-needed' locale prefix rules.
 * Default locale 'de' avoids prefix, others include it.
 */
export function getCanonicalPath(locale: string, intent: string, slug?: string): string {
    const prefix = locale === 'de' ? '' : `/${locale}`;
    
    // Normalize intent segment
    const internalIntent = Object.keys(INTENT_TRANSLATIONS[locale]).find(k => INTENT_TRANSLATIONS[locale][k] === intent);
    
    // Robust intent lookup
    let finalInternalIntent = internalIntent;
    if (!finalInternalIntent) {
        for (const loc of ['de', 'en', 'es', 'fr', 'it', 'pt']) {
            const found = Object.keys(INTENT_TRANSLATIONS[loc]).find(k => INTENT_TRANSLATIONS[loc][k] === intent);
            if (found) {
                finalInternalIntent = found;
                break;
            }
        }
    }
    
    const intentKey = finalInternalIntent || intent;
    const locIntent = INTENT_TRANSLATIONS[locale][intentKey] || intentKey;
    
    if (slug) {
        return `${prefix}/${locIntent}/${slug}`;
    }
    
    return `${prefix}/${locIntent}`;
}
