import { SITE_URL } from '@/lib/constants';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-core.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-events.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-seo.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
