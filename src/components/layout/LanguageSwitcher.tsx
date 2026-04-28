'use client';

import { useLocale, useTranslations } from 'next-intl';
import { locales, usePathname, useRouter } from '@/i18n/routing';
import { useParams, usePathname as useNextPathname, useRouter as useNextRouter } from 'next/navigation';

import { translateSlug, reverseTranslateSlug, getCanonicalPath } from '@/lib/seo/translations';

export function LanguageSwitcher() {
    const t = useTranslations('Common.languages');
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();
    const nextPathname = useNextPathname();
    const nextRouter = useNextRouter();

    const handleLocaleChange = (newLocale: string) => {
        if (!nextPathname) return;

        // If we have dynamic SEO params (intent and slug), we MUST translate them to prevent malformed URLs.
        if (params && (params.intent || params.slug)) {
            // Handle Ratgeber specific routes
            if (nextPathname.includes('/ratgeber/') || nextPathname.includes('/guide/') || nextPathname.includes('/guia/') || nextPathname.includes('/a-propos/') || nextPathname.includes('/chi-siamo/')) {
                const guideIntent = newLocale === 'de' ? 'ratgeber' :
                    newLocale === 'en' ? 'guide' :
                    newLocale === 'es' ? 'guia' :
                    newLocale === 'fr' ? 'guide' :
                    newLocale === 'it' ? 'guida' : 'guia'; // pt
                
                const slugStr = Array.isArray(params.slug) ? params.slug.join('/') : (params.slug || '');
                const newPath = newLocale === 'de' ? `/${guideIntent}/${slugStr}` : `/${newLocale}/${guideIntent}/${slugStr}`;
                nextRouter.push(newPath === '' ? '/' : newPath);
                return;
            } else if (params.intent) {
                // Calculator mode routes with translated slugs
                const currentIntent = Array.isArray(params.intent) ? params.intent[0] : params.intent;
                const currentSlugArr = params.slug ? (Array.isArray(params.slug) ? params.slug : [params.slug]) : undefined;
                const currentSlugStr = currentSlugArr ? currentSlugArr.join('-') : undefined;

                if (currentSlugStr) {
                    const canonicalSlug = reverseTranslateSlug(currentSlugStr, locale);
                    const locSlug = translateSlug(canonicalSlug, newLocale);
                    const newPath = getCanonicalPath(newLocale, currentIntent, locSlug); // getCanonicalPath will resolve intent internally
                    nextRouter.push(newPath === '' ? '/' : newPath);
                    return;
                } else {
                    const newPath = getCanonicalPath(newLocale, currentIntent);
                    nextRouter.push(newPath === '' ? '/' : newPath);
                    return;
                }
            }
        }

        // Fallback robust path replacement for non-dynamic or complex cases
        let cleanPath = nextPathname;
        for (const loc of locales) {
            if (cleanPath === `/${loc}` || cleanPath.startsWith(`/${loc}/`)) {
                cleanPath = cleanPath.substring(loc.length + 1);
                break;
            }
        }
        
        if (!cleanPath.startsWith('/')) {
            cleanPath = `/${cleanPath}`;
        }

        let newPath = newLocale === 'de' ? cleanPath : `/${newLocale}${cleanPath}`;
        if (newPath.endsWith('/') && newPath.length > 1) {
            newPath = newPath.slice(0, -1);
        }
        
        nextRouter.push(newPath === '' ? '/' : newPath);
    };

    return (
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-xs font-medium uppercase tracking-widest">
            {locales.map((cur) => (
                <button
                    key={cur}
                    onClick={() => handleLocaleChange(cur)}
                    className={`transition-all duration-300 hover:text-white ${
                        locale === cur 
                            ? 'text-neon border-b border-neon/50 pb-0.5' 
                            : 'text-white/30 hover:text-white/60'
                    }`}
                >
                    {t(cur)}
                </button>
            ))}
        </div>
    );
}
