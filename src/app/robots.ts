import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/', 
        '/admin/',
        '/_next/',
        '/static/'
      ],
    },
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap-core.xml`,
      `${SITE_URL}/sitemap-seo.xml`,
      `${SITE_URL}/sitemap-events.xml`,
    ],
  };
}
