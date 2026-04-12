import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import { INTENT_TRANSLATIONS } from '@/lib/seo/translations';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Common.titles' });
    const siteUrl = "https://datums-rechner.com";
    const locSlug = INTENT_TRANSLATIONS[locale]['datenschutz'];
    const fullUrl = `${siteUrl}/${locale}/${locSlug}`;

    // Build hreflang alternates
    const languages: Record<string, string> = {};
    locales.forEach(loc => {
        languages[loc] = `${siteUrl}/${loc}/${INTENT_TRANSLATIONS[loc]['datenschutz']}`;
    });
    languages['x-default'] = `${siteUrl}/de/datenschutz`;

    return {
        title: `${t('privacy')} - Datumsrechner`,
        description: `Datenschutzerklärung von datums-rechner.com. Erfahren Sie, wie wir mit Ihren Daten gemäß DSGVO umgehen.`,
        alternates: {
            canonical: fullUrl,
            languages
        },
        openGraph: {
            title: `${t('privacy')} - Datumsrechner`,
            url: fullUrl,
            type: 'website',
            locale: locale,
        }
    };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Common.titles' });

    return (
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight">
                {t('privacy')}
            </h1>

            <div className="prose prose-invert prose-lg max-w-none space-y-12">
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">1. Datenschutz auf einen Blick</h2>
                    <h3 className="text-xl font-semibold text-white/90 mb-2">Allgemeine Hinweise</h3>
                    <p className="text-white/70 leading-relaxed">
                        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">2. Datenerfassung auf dieser Website</h2>
                    <h3 className="text-xl font-semibold text-white/90 mb-2">Cookies und Tracking</h3>
                    <p className="text-white/70 leading-relaxed">
                        Unsere Website nutzt Cookies, um die Benutzererfahrung zu verbessern. Diese werden lokal in Ihrem Browser gespeichert. Wir nutzen keine Tracking-Tools, die Ihr Verhalten ohne Ihre ausdrückliche Zustimmung analysieren.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">3. Ihre Rechte</h2>
                    <p className="text-white/70 leading-relaxed">
                        Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">4. Hosting</h2>
                    <p className="text-white/70 leading-relaxed">
                        Wir hosten die Inhalte unserer Website bei einem Cloud-Anbieter. Personenbezogene Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Dabei handelt es sich v. a. um IP-Adressen, Kontaktanfragen und Meta- und Kommunikationsdaten.
                    </p>
                </section>
            </div>
        </main>
    );
}
