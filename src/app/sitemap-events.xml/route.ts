import { getEventsSitemapUrls } from '@/lib/seo/sitemapEngine';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
    const urls = getEventsSitemapUrls();
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(u => `
    <url>
        <loc>${u.url}</loc>
        <lastmod>${u.lastModified.toISOString()}</lastmod>
        <changefreq>${u.changeFrequency}</changefreq>
        <priority>${u.priority}</priority>
    </url>`).join('')}
</urlset>`;

    return new Response(xml, { 
        status: 200, 
        headers: { 
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
        } 
    });
}
