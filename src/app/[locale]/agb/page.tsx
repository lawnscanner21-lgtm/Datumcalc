import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import { INTENT_TRANSLATIONS } from '@/lib/seo/translations';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Common.titles' });
    const siteUrl = "https://datums-rechner.com";
    const locSlug = INTENT_TRANSLATIONS[locale]['agb'];
    const fullUrl = `${siteUrl}/${locale}/${locSlug}`;

    // Build hreflang alternates
    const languages: Record<string, string> = {};
    locales.forEach(loc => {
        languages[loc] = `${siteUrl}/${loc}/${INTENT_TRANSLATIONS[loc]['agb']}`;
    });
    languages['x-default'] = `${siteUrl}/de/agb`;

    return {
        title: `${t('terms')} - Datumsrechner`,
        description: `Allgemeine Geschäftsbedingungen und Nutzungsbestimmungen für datums-rechner.com.`,
        alternates: {
            canonical: fullUrl,
            languages
        },
        openGraph: {
            title: `${t('terms')} - Datumsrechner`,
            url: fullUrl,
            type: 'website',
            locale: locale,
        }
    };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Common.titles' });

    return (
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight">
                {t('terms')}
            </h1>

            <div className="prose prose-invert prose-lg max-w-none space-y-12">
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">1. Geltungsbereich</h2>
                    <p className="text-white/70 leading-relaxed">
                        Die folgenden Geschäftsbedingungen regeln die Nutzung der Online-Tools auf datums-rechner.com. Mit dem Zugriff auf unsere Website erklären Sie sich mit diesen Bedingungen einverstanden.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">2. Dienstleistungsbeschreibung</h2>
                    <p className="text-white/70 leading-relaxed">
                        datums-rechner.com stellt kostenlose Rechen-Tools zur Verfügung, um Datumsdifferenzen, Zeitspannen und Arbeitstage zu berechnen. Die Ergebnisse dienen ausschließlich Informationszwecken.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">3. Haftungsausschluss</h2>
                    <p className="text-white/70 leading-relaxed underline decoration-neon/20">
                        Obwohl wir größte Sorgfalt bei der Entwicklung unserer Algorithmen walten lassen, übernehmen wir keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der bereitgestellten Ergebnisse. Eine Haftung für Schäden, die aus der Nutzung der Website entstehen, ist ausgeschlossen.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">4. Urheberrecht</h2>
                    <p className="text-white/70 leading-relaxed">
                        Sämtliche Inhalte und Funktionen auf dieser Website unterliegen dem Schutz des Urheberrechts. Die Vervielfältigung oder Verwendung von Grafiken, Texten oder Code ist ohne ausdrückliche Genehmigung des Betreibers nicht gestattet.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">5. Änderungen</h2>
                    <p className="text-white/70 leading-relaxed">
                        Der Betreiber behält sich das Recht vor, die bereitgestellten Dienste jederzeit ohne Vorankündigung einzustellen oder zu verändern.
                    </p>
                </section>
            </div>
        </main>
    );
}
