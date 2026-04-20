import { CANONICAL_QUERIES } from './queryModel';
import { locales } from '@/i18n/routing';
import { INTENT_TRANSLATIONS, translateSlug, getCanonicalPath } from './translations';
import { SITE_URL } from '@/lib/constants';

const CALC_MODE_TO_INTENT: Record<string, string> = {
    add_subtract: 'addieren',
    difference: 'differenz',
    business_days: 'arbeitstage',
    age: 'alter',
};

/**
 * Sitemap Engine Configuration
 * Defines logic for which programmatic pages are injected into sitemaps.
 */

// Define standard buckets to generate dynamic sitemaps
export const BASE_URL = SITE_URL; 
const STATIC_LASTMOD = new Date('2024-01-01T00:00:00Z');

function getLocalizedUrl(path: string, locale: string) {
    const prefix = locale === 'de' ? '' : `/${locale}`;
    const cleanPath = path === '/' ? '' : (path.startsWith('/') ? path : `/${path}`);
    return `${SITE_URL}${prefix}${cleanPath}` || `${SITE_URL}/`;
}

export function getCoreSitemapUrls() {
    const paths = ['', 'ratgeber', 'ueber-uns', 'datenschutz', 'impressum', 'agb'];
    const urls: any[] = [];

    locales.forEach(locale => {
        paths.forEach(path => {
            urls.push({
                url: getLocalizedUrl(path, locale),
                lastModified: STATIC_LASTMOD,
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
        Object.values(CANONICAL_QUERIES).forEach((def) => {
            if (def.isIndexable && def.priority !== 'Low' && def.intentType !== 'Informational') {
                const internalIntent = CALC_MODE_TO_INTENT[def.calcMode] || 'differenz';
                const locSlug = translateSlug(def.canonicalSlug, locale);
                const canonicalPath = getCanonicalPath(locale, internalIntent, locSlug);
                
                urls.push({
                    url: `${SITE_URL}${canonicalPath}`,
                    lastModified: STATIC_LASTMOD,
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
                const locSlug = translateSlug(canonicalSlug, locale);
                const canonicalPath = getCanonicalPath(locale, 'addieren', locSlug);
                
                urls.push({
                    url: `${SITE_URL}${canonicalPath}`,
                    lastModified: STATIC_LASTMOD,
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
        Object.values(CANONICAL_QUERIES).forEach((def) => {
            if (def.isIndexable && (def.priority === 'High' || def.priority === 'Medium') && def.intentType === 'Informational') {
                 const internalIntent = CALC_MODE_TO_INTENT[def.calcMode] || 'differenz';
                 const locSlug = translateSlug(def.canonicalSlug, locale);
                 const canonicalPath = getCanonicalPath(locale, internalIntent, locSlug);
                 
                 urls.push({
                    url: `${SITE_URL}${canonicalPath}`,
                    lastModified: STATIC_LASTMOD,
                    changeFrequency: 'monthly',
                    priority: 0.9
                });
            }
        });
    });
    
    return urls;
}
