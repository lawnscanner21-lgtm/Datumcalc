import { CANONICAL_QUERIES } from './queryModel';

/**
 * Sitemap Engine Configuration
 * Defines logic for which programmatic pages are injected into sitemaps.
 */

// Define standard buckets to generate dynamic sitemaps
export const BASE_URL = 'https://datumsrechner.app'; // Replace with actual domain

export function getCoreSitemapUrls() {
    return [
        { url: `${BASE_URL}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
        { url: `${BASE_URL}/en`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
        { url: `${BASE_URL}/ratgeber`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ];
}

export function getSEOSitemapUrls() {
    const urls: any[] = [];
    Object.entries(CANONICAL_QUERIES).forEach(([slug, def]) => {
        if (def.isIndexable && def.priority === 'High' && def.intentType !== 'Informational') {
            urls.push({
                url: `${BASE_URL}/${def.calcMode === 'add_subtract' ? 'addieren' : 'differenz'}/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8
            });
        }
    });

    // Generate numeric loop for strictly indexed numbers to expand dynamically
    const strictlyIndexedNumbers = [30, 45, 60, 90, 100, 120, 180, 365, 500, 1000];
    for (const num of strictlyIndexedNumbers) {
        // Skip if already hardcoded in CANONICAL_QUERIES above
        if (!CANONICAL_QUERIES[`${num}-tage-ab-heute`]) {
            urls.push({
                url: `${BASE_URL}/addieren/${num}-tage-ab-heute`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7
            });
        }
    }

    return urls;
}

export function getEventsSitemapUrls() {
    const urls: any[] = [];
    Object.entries(CANONICAL_QUERIES).forEach(([slug, def]) => {
        if (def.isIndexable && def.priority === 'High' && def.intentType === 'Informational') {
             urls.push({
                url: `${BASE_URL}/differenz/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.9
            });
        }
    });
    return urls;
}
