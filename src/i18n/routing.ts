import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['de', 'en', 'es', 'fr', 'it', 'pt'] as const;

export const routing = defineRouting({
    locales,
    defaultLocale: 'de',
    localePrefix: 'as-needed',
    pathnames: {
        '/': '/',
        '/ueber-uns': { de: '/ueber-uns', en: '/about-us', es: '/sobre-nosotros', fr: '/a-propos', it: '/chi-siamo', pt: '/sobre-nos' },
        '/agb': { de: '/agb', en: '/terms', es: '/terminos', fr: '/conditions', it: '/condizioni', pt: '/termos' },
        '/datenschutz': { de: '/datenschutz', en: '/privacy', es: '/privacidad', fr: '/confidentialite', it: '/privacy', pt: '/privacidade' },
        '/impressum': { de: '/impressum', en: '/imprint', es: '/aviso-legal', fr: '/mentions-legales', it: '/note-legali', pt: '/aviso-legal' },
        '/sitemap': { de: '/sitemap', en: '/sitemap', es: '/sitemap', fr: '/sitemap', it: '/sitemap', pt: '/sitemap' }
    }
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
