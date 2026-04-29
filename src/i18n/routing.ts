import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['de'] as const;

export const routing = defineRouting({
    locales,
    defaultLocale: 'de',
    localePrefix: 'as-needed',
    localeDetection: false,
    pathnames: {
        '/': '/',
        '/ueber-uns': '/ueber-uns',
        '/agb': '/agb',
        '/datenschutz': '/datenschutz',
        '/impressum': '/impressum',
        '/sitemap': '/sitemap',
        '/addieren': '/addieren',
        '/differenz': '/differenz',
        '/arbeitstage': '/arbeitstage',
        '/alter': '/alter',
        '/ratgeber': '/ratgeber',
        '/ratgeber/[slug]': '/ratgeber/[slug]',
        '/addieren/[...slug]': '/addieren/[...slug]',
        '/differenz/[...slug]': '/differenz/[...slug]',
        '/arbeitstage/[...slug]': '/arbeitstage/[...slug]',
        '/alter/[...slug]': '/alter/[...slug]'
    }
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
