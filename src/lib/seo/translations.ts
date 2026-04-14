import { cache } from 'react';
import { SITE_URL } from '@/lib/constants';

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

// Pre-compiled regex and lookup maps for performance
const TRANSLATION_MAPS: Record<string, { regex: RegExp, map: Record<string, string> }[]> = {};
const REVERSE_MAPS: Record<string, { regex: RegExp, map: Record<string, string> }[]> = {};

// Initialize maps once
Object.keys(SLUG_TOKEN_TRANSLATIONS).forEach(locale => {
    if (locale === 'de') return;
    
    TRANSLATION_MAPS[locale] = Object.entries(SLUG_TOKEN_TRANSLATIONS['de']).map(([key, deVal]) => ({
        regex: new RegExp(`\\b${deVal}\\b`, 'g'),
        map: { [deVal]: SLUG_TOKEN_TRANSLATIONS[locale][key] }
    }));

    REVERSE_MAPS[locale] = Object.entries(SLUG_TOKEN_TRANSLATIONS[locale]).map(([key, locVal]) => ({
        regex: new RegExp(`\\b${locVal}\\b`, 'g'),
        map: { [locVal]: SLUG_TOKEN_TRANSLATIONS['de'][key] }
    }));
});

/**
 * Translates a German slug into a localized one.
 */
export const translateSlug = cache((slug: string, locale: string): string => {
    if (locale === 'de' || !TRANSLATION_MAPS[locale]) return slug;

    let localized = slug;
    TRANSLATION_MAPS[locale].forEach(({ regex, map }) => {
        const deVal = Object.keys(map)[0];
        localized = localized.replace(regex, map[deVal]);
    });
    return localized;
});

/**
 * Reverses a localized slug back to its German canonical version.
 */
export const reverseTranslateSlug = cache((slug: string, locale: string): string => {
    if (locale === 'de' || !REVERSE_MAPS[locale]) return slug;

    let canonical = slug;
    REVERSE_MAPS[locale].forEach(({ regex, map }) => {
        const locVal = Object.keys(map)[0];
        canonical = canonical.replace(regex, map[locVal]);
    });
    return canonical;
});

/**
 * Gets a fully localized URL for a calculator page.
 */
export const getLocalizedCalculatorUrl = cache((locale: string, intent: string, slug: string): string => {
    const siteUrl = SITE_URL;
    const locIntent = INTENT_TRANSLATIONS[locale][intent] || intent;
    const locSlug = translateSlug(slug, locale);
    return `${siteUrl}/${locale}/${locIntent}/${locSlug}`;
});

