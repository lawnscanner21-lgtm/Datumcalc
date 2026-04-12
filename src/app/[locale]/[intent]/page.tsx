import { CANONICAL_QUERIES } from '@/lib/seo/queryModel';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; intent: string }> }) {
    const { intent } = await params;
    
    return {
        title: `${intent.charAt(0).toUpperCase() + intent.slice(1)} - Datumsrechner Hub ✓`,
        description: `Nutzen Sie unsere Sammlung an präzisen Rechnern für ${intent}. Schnelle Antworten für alle Datums-Szenarien.`
    };
}

export default async function IntentHubPage({ params }: { params: Promise<{ locale: string; intent: string }> }) {
    const { locale, intent } = await params;
    
    // Allow only configured intents
    const intentMap: Record<string, string> = { 'addieren': 'add_subtract', 'differenz': 'difference' };
    if (!intentMap[intent.toLowerCase()]) {
        notFound();
    }

    const calcMode = intentMap[intent.toLowerCase()];
    
    // Group known queries for this hub
    const activeQueries = Object.entries(CANONICAL_QUERIES).filter(([slug, def]) => def.calcMode === calcMode && def.isIndexable);
    
    // Split into events vs generic for nicely grouped navigation
    const informational = activeQueries.filter(([slug, def]) => def.intentType === 'Informational');
    const transactional = activeQueries.filter(([slug, def]) => def.intentType === 'Transactional');

    return (
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight capitalize py-2">
                    Kategorie: {intent}
                </h1>
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                    Alle Berechnungen rund um das Thema {intent}. Wählen Sie Ihr gewünschtes Szenario aus der Navigation für exakte Ergebnisse.
                </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Generic Numbers - Transactional */}
                {transactional.length > 0 && (
                    <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
                        <h2 className="text-2xl font-bold mb-6 text-neon-blue">Häufige Berechnungen</h2>
                        <ul className="space-y-3">
                            {transactional.map(([slug]) => (
                                <li key={slug}>
                                    <Link href={`/${locale}/${intent}/${slug}`} className="text-white hover:text-neon flex items-center justify-between group p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                        <span>{slug.replace(/-/g, ' ')}</span>
                                        <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Events - Informational */}
                {informational.length > 0 && (
                    <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
                        <h2 className="text-2xl font-bold mb-6 text-neon-blue">Meilensteine & Events</h2>
                        <ul className="space-y-3">
                            {informational.map(([slug]) => (
                                <li key={slug}>
                                    <Link href={`/${locale}/${intent}/${slug}`} className="text-white hover:text-neon flex items-center justify-between group p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                        <span className="capitalize">{slug.replace(/-/g, ' ')}</span>
                                        <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </main>
    );
}

import { locales } from '@/i18n/routing';

export function generateStaticParams() {
    return locales.flatMap(locale => [
        { locale, intent: 'addieren' },
        { locale, intent: 'differenz' }
    ]);
}
