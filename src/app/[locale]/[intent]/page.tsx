import { CANONICAL_QUERIES } from '@/lib/seo/queryModel';
import { Link } from '@/i18n/routing';
import { notFound, permanentRedirect } from 'next/navigation';
import { locales } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';

export const revalidate = 604800; // 7 days ISR revalidation
export const dynamicParams = true;
import { INTENT_TRANSLATIONS, translateSlug, getCanonicalPath } from '@/lib/seo/translations';
import { SITE_URL } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; intent: string }> }) {
    const { locale, intent } = await params;
    setRequestLocale(locale);
    
    // Resolve internal intent
    let internalIntent = Object.keys(INTENT_TRANSLATIONS[locale]).find(k => INTENT_TRANSLATIONS[locale][k] === intent);
    if (!internalIntent) {
        for (const loc of locales) {
            internalIntent = Object.keys(INTENT_TRANSLATIONS[loc]).find(k => INTENT_TRANSLATIONS[loc][k] === intent);
            if (internalIntent) break;
        }
    }
    const finalIntent = internalIntent || intent;
    
    const canonicalPath = getCanonicalPath(locale, finalIntent);
    const fullUrl = `${SITE_URL}${canonicalPath}`;
    
    // Build hreflang alternates
    const languages: Record<string, string> = {};
    locales.forEach(loc => {
        languages[loc] = `${SITE_URL}${getCanonicalPath(loc, finalIntent)}`;
    });
    languages['x-default'] = `${SITE_URL}${getCanonicalPath('de', finalIntent)}`;

    const title = locale === 'de' 
        ? `${intent.charAt(0).toUpperCase() + intent.slice(1)} - Datumsrechner Hub ✓`
        : `${intent.charAt(0).toUpperCase() + intent.slice(1)} - Date Calculator Hub ✓`;

    return {
        title,
        description: locale === 'de'
            ? `Nutzen Sie unsere Sammlung an präzisen Rechnern für ${intent}. Schnelle Antworten für alle Datums-Szenarien.`
            : `Use our collection of precise calculators for ${intent}. Fast answers for all date scenarios.`,
        alternates: {
            canonical: fullUrl,
            languages
        },
        openGraph: {
            title,
            url: fullUrl,
            type: 'website',
            locale: locale,
        }
    };
}

export default async function IntentHubPage({ params }: { params: Promise<{ locale: string; intent: string }> }) {
    const { locale, intent } = await params;
    setRequestLocale(locale);
    // Resolve internal intent across ALL locales (robust fallback)
    let internalIntent = Object.keys(INTENT_TRANSLATIONS[locale]).find(k => INTENT_TRANSLATIONS[locale][k] === intent);
    
    if (!internalIntent) {
        // Search other locales
        for (const loc of locales) {
            internalIntent = Object.keys(INTENT_TRANSLATIONS[loc]).find(k => INTENT_TRANSLATIONS[loc][k] === intent);
            if (internalIntent) break;
        }
    }

    if (!internalIntent) {
        notFound();
    }

    // NORMALIZE: Ensure strictly localized intent URL
    const correctPath = getCanonicalPath(locale, internalIntent);
    const correctIntent = INTENT_TRANSLATIONS[locale][internalIntent] || internalIntent;
    
    if (intent.toLowerCase() !== correctIntent.toLowerCase()) {
        permanentRedirect(correctPath);
    }

    const intentMap: Record<string, string> = { 
        'addieren': 'add_subtract',
        'differenz': 'difference',
        'arbeitstage': 'business_days',
        'alter': 'age'
    };

    if (!intentMap[internalIntent.toLowerCase()]) {
        notFound();
    }

    const calcMode = intentMap[internalIntent.toLowerCase()];
    
    // Group known queries for this hub
    const activeQueries = Object.values(CANONICAL_QUERIES).filter((def) => def.calcMode === calcMode && def.isIndexable);
    
    // Split into events vs generic for nicely grouped navigation
    const informational = activeQueries.filter((def) => def.intentType === 'Informational');
    const transactional = activeQueries.filter((def) => def.intentType === 'Transactional');

    return (
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight capitalize py-2">
                    {locale === 'de' ? 'Kategorie' : 'Category'}: {intent}
                </h1>
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                    {locale === 'de' 
                        ? `Alle Berechnungen rund um das Thema ${intent}. Wählen Sie Ihr gewünschtes Szenario für exakte Ergebnisse.`
                        : `All calculations related to ${intent}. Choose your desired scenario for exact results.`}
                </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Generic Numbers - Transactional */}
                {transactional.length > 0 && (
                    <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
                        <h2 className="text-2xl font-bold mb-6 text-neon-blue">
                            {locale === 'de' ? 'Häufige Berechnungen' : 'Popular Calculations'}
                        </h2>
                        <ul className="space-y-3">
                            {transactional.map((def) => {
                                const locSlug = translateSlug(def.canonicalSlug, locale);
                                const href = getCanonicalPath(locale, internalIntent!, locSlug);
                                return (
                                    <li key={def.canonicalSlug}>
                                        <Link href={href as any} className="text-white hover:text-neon flex items-center justify-between group p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                            <span>{locSlug.replace(/-/g, ' ')}</span>
                                            <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {/* Events - Informational */}
                {informational.length > 0 && (
                    <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
                        <h2 className="text-2xl font-bold mb-6 text-neon-blue">
                            {locale === 'de' ? 'Meilensteine & Events' : 'Milestones & Events'}
                        </h2>
                        <ul className="space-y-3">
                            {informational.map((def) => {
                                const locSlug = translateSlug(def.canonicalSlug, locale);
                                const href = getCanonicalPath(locale, internalIntent!, locSlug);
                                return (
                                    <li key={def.canonicalSlug}>
                                        <Link href={href as any} className="text-white hover:text-neon flex items-center justify-between group p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                            <span className="capitalize">{locSlug.replace(/-/g, ' ')}</span>
                                            <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </main>
    );
}

export function generateStaticParams() {
    return locales.flatMap(locale => {
        const intents = Object.values(INTENT_TRANSLATIONS[locale]);
        return intents.map(intent => ({ locale, intent }));
    });
}
