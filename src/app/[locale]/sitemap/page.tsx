import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import { INTENT_TRANSLATIONS, translateSlug } from '@/lib/seo/translations';
import { CANONICAL_QUERIES } from '@/lib/seo/queryModel';
import { articles } from '@/lib/articles';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Common.titles' });
    const siteUrl = "https://datums-rechner.com";
    const locSlug = INTENT_TRANSLATIONS[locale]['sitemap'];
    const fullUrl = `${siteUrl}/${locale}/${locSlug}`;

    // Build hreflang alternates
    const languages: Record<string, string> = {};
    locales.forEach(loc => {
        languages[loc] = `${siteUrl}/${loc}/${INTENT_TRANSLATIONS[loc]['sitemap']}`;
    });
    languages['x-default'] = `${siteUrl}/de/sitemap`;

    return {
        title: `${t('sitemap')} - Datumsrechner`,
        description: `Übersicht aller Tools, Ratgeber und rechtlichen Informationen von datums-rechner.com.`,
        alternates: {
            canonical: fullUrl,
            languages
        },
        openGraph: {
            title: `${t('sitemap')} - Datumsrechner`,
            url: fullUrl,
            type: 'website',
            locale: locale,
        }
    };
}

export default async function SitemapPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Common.titles' });

    const calculatorIntents = [
        { id: 'addieren', icon: '➕' },
        { id: 'differenz', icon: '📅' },
        { id: 'arbeitstage', icon: '💼' },
        { id: 'alter', icon: '🎂' }
    ];

    const legalRoutes = ['ueber-uns', 'agb', 'datenschutz', 'impressum'];

    return (
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <header className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                    {t('sitemap')}
                </h1>
                <p className="text-xl text-white/60">
                    Alle Inhalte und Werkzeuge von datums-rechner.com auf einen Blick.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {/* 1. Calculator Categories & Tools */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-bold border-b border-white/10 pb-4 mb-6 flex items-center gap-3">
                        <span className="text-neon">01.</span> Rechner & Tools
                    </h2>
                    {calculatorIntents.map(intent => {
                        const locIntent = INTENT_TRANSLATIONS[locale][intent.id] || intent.id;
                        const queries = Object.entries(CANONICAL_QUERIES).filter(([_, def]) => 
                            (intent.id === 'addieren' && def.calcMode === 'add_subtract') ||
                            (intent.id === 'differenz' && def.calcMode === 'difference') ||
                            (intent.id === 'arbeitstage' && def.calcMode === 'business_days') ||
                            (intent.id === 'alter' && def.calcMode === 'age')
                        );

                        return (
                            <div key={intent.id} className="space-y-4">
                                <Link href={`/${locale}/${locIntent}`} className="text-lg font-bold hover:text-neon flex items-center gap-2">
                                    <span>{intent.icon}</span>
                                    <span className="capitalize">{locIntent}</span>
                                </Link>
                                <ul className="pl-8 space-y-2 border-l border-white/5">
                                    {queries.slice(0, 10).map(([slug]) => (
                                        <li key={slug}>
                                            <Link href={`/${locale}/${locIntent}/${translateSlug(slug, locale)}`} className="text-white/50 hover:text-white transition-colors text-sm">
                                                {translateSlug(slug, locale).replace(/-/g, ' ')}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </section>

                {/* 2. Guides & Articles */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-bold border-b border-white/10 pb-4 mb-6 flex items-center gap-3">
                        <span className="text-neon">02.</span> Ratgeber
                    </h2>
                    <ul className="space-y-4">
                        {articles.map(article => (
                            <li key={article.slug}>
                                <Link 
                                    href={`/${locale}/${INTENT_TRANSLATIONS[locale]['ratgeber']}/${article.slug}`} 
                                    className="block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon/30 transition-all"
                                >
                                    <h3 className="font-bold text-white mb-1">{article.title}</h3>
                                    <p className="text-xs text-white/40 line-clamp-2">{article.description}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* 3. Legal & Settings */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-bold border-b border-white/10 pb-4 mb-6 flex items-center gap-3">
                        <span className="text-neon">03.</span> Rechtliches
                    </h2>
                    <ul className="space-y-3">
                        {legalRoutes.map(route => (
                            <li key={route}>
                                <Link 
                                    href={`/${locale}/${INTENT_TRANSLATIONS[locale][route] || route}`} 
                                    className="text-white/60 hover:text-neon flex items-center justify-between group py-2"
                                >
                                    <span className="capitalize">{(INTENT_TRANSLATIONS[locale][route] || route).replace(/-/g, ' ')}</span>
                                    <div className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-neon transition-colors"></div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-neon/10 to-transparent border border-neon/20">
                        <h3 className="font-bold text-white mb-2 italic">ISO 8601 zertifiziert</h3>
                        <p className="text-xs text-white/50 leading-relaxed">
                            Alle Berechnungen auf dieser Website unterliegen strikten mathematischen Kontrollen und halten den internationalen Standard für Datums- und Zeitangaben ein.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
