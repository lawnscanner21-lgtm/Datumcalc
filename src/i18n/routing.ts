import { defineRouting } from 'next-intl/routing';


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
        '/sitemap': { de: '/sitemap', en: '/sitemap', es: '/sitemap', fr: '/sitemap', it: '/sitemap', pt: '/sitemap' },
        '/addieren': { de: '/addieren', en: '/add', es: '/sumar', fr: '/ajouter', it: '/aggiungere', pt: '/adicionar' },
        '/differenz': { de: '/differenz', en: '/difference', es: '/diferencia', fr: '/difference', it: '/differenza', pt: '/diferenca' },
        '/arbeitstage': { de: '/arbeitstage', en: '/business', es: '/laborables', fr: '/ouvrables', it: '/lavorativi', pt: '/uteis' },
        '/alter': { de: '/alter', en: '/age', es: '/edad', fr: '/age', it: '/eta', pt: '/idade' },
        '/ratgeber': { de: '/ratgeber', en: '/guide', es: '/guia', fr: '/guide', it: '/guida', pt: '/guia' },
        '/ratgeber/[slug]': { de: '/ratgeber/[slug]', en: '/guide/[slug]', es: '/guia/[slug]', fr: '/guide/[slug]', it: '/guida/[slug]', pt: '/guia/[slug]' },
        '/addieren/[...slug]': { de: '/addieren/[...slug]', en: '/add/[...slug]', es: '/sumar/[...slug]', fr: '/ajouter/[...slug]', it: '/aggiungere/[...slug]', pt: '/adicionar/[...slug]' },
        '/differenz/[...slug]': { de: '/differenz/[...slug]', en: '/difference/[...slug]', es: '/diferencia/[...slug]', fr: '/difference/[...slug]', it: '/differenza/[...slug]', pt: '/diferenca/[...slug]' },
        '/arbeitstage/[...slug]': { de: '/arbeitstage/[...slug]', en: '/business/[...slug]', es: '/laborables/[...slug]', fr: '/ouvrables/[...slug]', it: '/lavorativi/[...slug]', pt: '/uteis/[...slug]' },
        '/alter/[...slug]': { de: '/alter/[...slug]', en: '/age/[...slug]', es: '/edad/[...slug]', fr: '/age/[...slug]', it: '/eta/[...slug]', pt: '/idade/[...slug]' }
    }
});

