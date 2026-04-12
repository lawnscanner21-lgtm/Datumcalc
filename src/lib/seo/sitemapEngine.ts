import { CANONICAL_QUERIES } from './queryModel';
import { locales } from '@/i18n/routing';
import { INTENT_TRANSLATIONS, translateSlug } from './translations';

/**
 * Sitemap Engine Configuration
 * Defines logic for which programmatic pages are injected into sitemaps.
 */

// Define standard buckets to generate dynamic sitemaps
export const BASE_URL = 'https://datums-rechner.com'; 

function getLocalizedUrl(path: string, locale: string) {
    const prefix = locale === 'de' ? '' : `/${locale}`;
    const cleanPath = path === '/' ? '' : (path.startsWith('/') ? path : `/${path}`);
    return `${BASE_URL}${prefix}${cleanPath}` || `${BASE_URL}/`;
}

export function getCoreSitemapUrls() {
    const paths = ['', 'ratgeber', 'ueber-uns', 'datenschutz', 'impressum', 'agb'];
    const urls: any[] = [];

    locales.forEach(locale => {
        paths.forEach(path => {
            urls.push({
                url: getLocalizedUrl(path, locale),
                lastModified: new Date(),
                changeFrequency: path === '' ? 'daily' : 'monthly',
                priority: path === '' ? 1.0 : 0.5
            });
        });
    });

    return urls;
}

export function getSEOSitemapUrls() {
    const urls: any[] = [];
    
    locales.forEach(locale => {
        Object.entries(CANONICAL_QUERIES).forEach(([slug, def]) => {
            if (def.isIndexable && def.priority !== 'Low' && def.intentType !== 'Informational') {
                const internalIntent = def.calcMode === 'add_subtract' ? 'addieren' : 'differenz';
                const locIntent = INTENT_TRANSLATIONS[locale][internalIntent] || internalIntent;
                const locSlug = translateSlug(slug, locale);
                
                urls.push({
                    url: getLocalizedUrl(`/${locIntent}/${locSlug}`, locale),
                    lastModified: new Date(),
                    changeFrequency: 'weekly',
                    priority: 0.8
                });
            }
        });

        // Generate numeric loop for strictly indexed numbers to expand dynamically
        const strictlyIndexedNumbers = [30, 45, 60, 90, 100, 120, 180, 365, 500, 1000];
        for (const num of strictlyIndexedNumbers) {
            const canonicalSlug = `${num}-tage-ab-heute`;
            // Skip if already hardcoded in CANONICAL_QUERIES above
            if (!CANONICAL_QUERIES[canonicalSlug]) {
                const locIntent = INTENT_TRANSLATIONS[locale]['addieren'] || 'addieren';
                const locSlug = translateSlug(canonicalSlug, locale);
                
                urls.push({
                    url: getLocalizedUrl(`/${locIntent}/${locSlug}`, locale),
                    lastModified: new Date(),
                    changeFrequency: 'weekly',
                    priority: 0.7
                });
            }
        }
    });

    return urls;
}

export function getEventsSitemapUrls() {
    const urls: any[] = [];
    
    locales.forEach(locale => {
        Object.entries(CANONICAL_QUERIES).forEach(([slug, def]) => {
            if (def.isIndexable && (def.priority === 'High' || def.priority === 'Medium') && def.intentType === 'Informational') {
                 const internalIntent = def.calcMode === 'add_subtract' ? 'addieren' : 'differenz';
                 const locIntent = INTENT_TRANSLATIONS[locale][internalIntent] || internalIntent;
                 const locSlug = translateSlug(slug, locale);
                 
                 urls.push({
                    url: getLocalizedUrl(`/${locIntent}/${locSlug}`, locale),
                    lastModified: new Date(),
                    changeFrequency: 'monthly',
                    priority: 0.9
                });
            }
        });
    });
    
    return urls;
}
