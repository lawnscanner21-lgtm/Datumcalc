import { getSEOSitemapUrls } from './src/lib/seo/sitemapEngine';
console.log(getSEOSitemapUrls().filter(u => u.url.includes('365') || u.url.includes('6452')));
