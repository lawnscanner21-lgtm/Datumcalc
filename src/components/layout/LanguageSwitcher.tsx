'use client';

import { useLocale, useTranslations } from 'next-intl';
import { locales, usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';

export function LanguageSwitcher() {
    const t = useTranslations('Common.languages');
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();

    const handleLocaleChange = (newLocale: string) => {
        // Create a clean params object for next-intl
        const cleanParams = { ...params };
        if ('locale' in cleanParams) delete cleanParams.locale;

        try {
            // @ts-expect-error - dynamic pathnames typing
            router.replace({ pathname, params: cleanParams }, { locale: newLocale as any });
        } catch (e) {
            router.push(`/${newLocale === 'de' ? '' : newLocale}`);
        }
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
