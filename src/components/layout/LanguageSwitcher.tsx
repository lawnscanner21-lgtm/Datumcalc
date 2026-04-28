'use client';

import { useLocale, useTranslations } from 'next-intl';
import { locales, usePathname, useRouter } from '@/i18n/routing';
import { useParams, usePathname as useNextPathname, useRouter as useNextRouter } from 'next/navigation';

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
