import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['de', 'en'] as const;

export const routing = defineRouting({
    locales,
    defaultLocale: 'de',
    localePrefix: 'as-needed',
    localeDetection: false,
    pathnames: {
        '/': { de: '/', en: '/' },
        '/ueber-uns': { de: '/ueber-uns', en: '/about-us' },
        '/agb': { de: '/agb', en: '/terms' },
        '/datenschutz': { de: '/datenschutz', en: '/privacy' },
        '/impressum': { de: '/impressum', en: '/imprint' },
        '/sitemap': { de: '/sitemap', en: '/sitemap' },
        '/addieren': { de: '/addieren', en: '/add' },
        '/differenz': { de: '/differenz', en: '/difference' },
        '/arbeitstage': { de: '/arbeitstage', en: '/business' },
        '/alter': { de: '/alter', en: '/age' },
        '/ratgeber': { de: '/ratgeber', en: '/guide' },
        '/ratgeber/[slug]': { de: '/ratgeber/[slug]', en: '/guide/[slug]' },
        '/addieren/[...slug]': { de: '/addieren/[...slug]', en: '/add/[...slug]' },
        '/differenz/[...slug]': { de: '/differenz/[...slug]', en: '/difference/[...slug]' },
        '/arbeitstage/[...slug]': { de: '/arbeitstage/[...slug]', en: '/business/[...slug]' },
        '/alter/[...slug]': { de: '/alter/[...slug]', en: '/age/[...slug]' }
    }
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
