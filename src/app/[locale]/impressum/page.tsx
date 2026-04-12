import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import { INTENT_TRANSLATIONS } from '@/lib/seo/translations';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Common.titles' });
    const siteUrl = "https://datums-rechner.com";
    const locSlug = INTENT_TRANSLATIONS[locale]['impressum'];
    const fullUrl = `${siteUrl}/${locale}/${locSlug}`;

    // Build hreflang alternates
    const languages: Record<string, string> = {};
    locales.forEach(loc => {
        languages[loc] = `${siteUrl}/${loc}/${INTENT_TRANSLATIONS[loc]['impressum']}`;
    });
    languages['x-default'] = `${siteUrl}/de/impressum`;

    return {
        title: `${t('imprint')} - Datumsrechner`,
        description: `Impressum und rechtliche Anbieterkennzeichnung für datums-rechner.com.`,
        alternates: {
            canonical: fullUrl,
            languages
        },
        openGraph: {
            title: `${t('imprint')} - Datumsrechner`,
            url: fullUrl,
            type: 'website',
            locale: locale,
        }
    };
}

export default async function ImprintPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Common.titles' });

    return (
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight">
                {t('imprint')}
            </h1>

            <div className="prose prose-invert prose-lg max-w-none space-y-12">
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Angaben gemäß § 5 TMG</h2>
                    <p className="text-white/70 leading-relaxed font-bold">
                        Betreiber der Website:<br />
                        Sheikh Farooq <br />
                        [Deine Straße / Hausnummer] <br />
                        [Deine PLZ / Stadt]
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Kontakt</h2>
                    <p className="text-white/70 leading-relaxed">
                        E-Mail: info@datums-rechner.com <br />
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                    <p className="text-white/70 leading-relaxed">
                        Sheikh Farooq <br />
                        [Adresse siehe oben]
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Haftung für Inhalte</h2>
                    <p className="text-white/70 leading-relaxed italic">
                        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
                    </p>
                </section>
            </div>
        </main>
    );
}
