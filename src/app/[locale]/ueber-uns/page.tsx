import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import { INTENT_TRANSLATIONS } from '@/lib/seo/translations';
import { CalculatorCore } from '@/components/calculator/CalculatorCore';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Common.titles' });
    const siteUrl = "https://datums-rechner.com";
    const locSlug = INTENT_TRANSLATIONS[locale]['ueber-uns'];
    const fullUrl = `${siteUrl}/${locale}/${locSlug}`;

    // Build hreflang alternates
    const languages: Record<string, string> = {};
    locales.forEach(loc => {
        languages[loc] = `${siteUrl}/${loc}/${INTENT_TRANSLATIONS[loc]['ueber-uns']}`;
    });
    languages['x-default'] = `${siteUrl}/de/ueber-uns`;

    return {
        title: `${t('about')} - Datumsrechner`,
        description: `Erfahren Sie mehr über die Mission und die Vision von datums-rechner.com – präzise Zeitberechnungen für alle.`,
        alternates: {
            canonical: fullUrl,
            languages
        },
        openGraph: {
            title: `${t('about')} - Datumsrechner`,
            url: fullUrl,
            type: 'website',
            locale: locale,
        }
    };
}

export default async function AboutUsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Common.titles' });

    return (
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-12 tracking-tight text-center">
                Wir machen Zeit <span className="text-neon underline decoration-neon/20">berechenbar</span>.
            </h1>

            <div className="prose prose-invert prose-lg max-w-4xl mx-auto space-y-16 mt-16 leading-relaxed">
                
                {/* Mission Section */}
                <section className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
                    <h2 className="text-3xl font-bold text-white mb-6">Unsere Mission</h2>
                    <p className="text-white/70 text-xl leading-relaxed">
                        In einer digitalisierten Welt sind exakte Zeitspannen und Fristen oft entscheidend – sei es für berufliche Projekte, rechtliche Zeitrahmen oder persönliche Meilensteine. Unsere Mission ist es, komplexe Datumsberechnungen für jeden zugänglich, schnell und mathematisch präzise zu machen.
                    </p>
                </section>

                {/* Authority & Trust Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Präzision ohne Kompromisse</h2>
                        <p className="text-white/60 mb-6">
                            Wir haben unsere Core-Engine so entwickelt, dass sie alle Eventualitäten des gregorianischen Kalenders abdeckt. Schaltjahre, unregelmäßige Monatslängen und Arbeitstage-Konfigurationen werden sekundenschnell ohne Rundungsfehler verarbeitet.
                        </p>
                        <p className="text-white/60">
                            Hinter datums-rechner.com steht ein Team aus Entwicklern und Daten-Enthusiasten, die überzeugt sind, dass einfache Web-Tools sowohl funktional als auch ästhetisch ansprechend sein können.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-neon/10 to-neon-blue/10 border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-center text-center">
                        <span className="text-5xl font-bold text-neon mb-2">100%</span>
                        <span className="text-sm font-bold uppercase tracking-widest text-white/40">Mathematisch exakt</span>
                    </div>
                </section>

                {/* EEAT Signals */}
                <section className="border-l-4 border-neon pl-10 space-y-6">
                    <h2 className="text-3xl font-bold text-white">Transparenz & Qualität</h2>
                    <p className="text-white/70 leading-relaxed italic text-lg">
                        Wir finanzieren dieses Projekt durch dezente Werbeanzeigen und Affiliate-Links, um den Dienst für unsere Nutzer dauerhaft kostenlos zu halten. Dabei legen wir größten Wert auf den Schutz Ihrer Privatsphäre und die Einhaltung höchster technischer Standards.
                    </p>
                </section>

                <section className="text-center bg-[#050505] rounded-[2.5rem] p-12 border border-white/10 mt-16 shadow-3xl">
                    <h2 className="text-2xl font-bold mb-8">Testen Sie unsere Engine</h2>
                    <div className="max-w-3xl mx-auto">
                        <CalculatorCore />
                    </div>
                </section>
            </div>
        </main>
    );
}
