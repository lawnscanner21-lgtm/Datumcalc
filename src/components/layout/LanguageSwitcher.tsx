'use client';

import { useLocale, useTranslations } from 'next-intl';
import { locales } from '@/i18n/routing';
import { usePathname, useRouter } from '@/i18n/navigation';

import { useParams } from 'next/navigation';

export function LanguageSwitcher() {
    const t = useTranslations('Common.languages');
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();

    const handleLocaleChange = (newLocale: string) => {
        // @ts-expect-error - next-intl's router.replace typing has issues with template pathnames in global components, but this is the recommended "safe" approach
        router.replace({ pathname, params }, { locale: newLocale as 'de' | 'en' | 'es' | 'fr' | 'it' | 'pt' });
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
