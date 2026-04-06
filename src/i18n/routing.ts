import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['de', 'en', 'es', 'fr', 'it', 'pt'] as const;

export const routing = defineRouting({
    locales,
    defaultLocale: 'de',
    localePrefix: 'as-needed'
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
