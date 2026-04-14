import { CalculatorCore } from '@/components/calculator/CalculatorCore';
import { getTranslations } from 'next-intl/server';
import { SmartInputBar } from '@/components/SmartInputBar';
import { HomepageSEO } from '@/components/seo/HomepageSEO';
import { locales } from '@/i18n/routing';
import { SITE_URL } from "@/lib/constants";

export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Header' });
    const siteUrl = SITE_URL;
    
    // Build hreflang alternates
    const languages: Record<string, string> = {};
    locales.forEach(loc => {
        languages[loc] = `${siteUrl}/${loc}`;
    });
    languages['x-default'] = `${siteUrl}/de`;

    return {
        title: locale === 'de' 
            ? "Datumsrechner online | Differenz berechnen & Tage addieren ✓" 
            : "Date Calculator Online | Count Days & Add Dates Precisely ✓",
        description: locale === 'de' 
            ? "Exakte Zeitberechnung online: Ermitteln Sie Datumsdifferenzen, addieren Sie Fristen oder berechnen Sie Arbeitstage nach ISO 8601 Standard."
            : "Exact time calculation online: determine date differences, add deadlines or calculate business days and working days per ISO 8601.",
        alternates: {
            canonical: `${siteUrl}/${locale}`,
            languages
        },
        openGraph: {
            title: locale === 'de' ? "Der präzise Datumsrechner online" : "The precise date calculator online",
            description: locale === 'de' ? "Kostenlose Tools für Zeitspannen und Fristen." : "Free tools for time spans and deadlines.",
            url: `${siteUrl}/${locale}`,
            type: 'website',
        }
    };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Header' });

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            {/* Semantic Hero Header */}
            <header className="text-center mb-16 space-y-6 animate-slide-up-fade">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-neon-blue mb-4">
                    <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" aria-hidden="true"></span>
                    {locale === 'de' ? 'Exakte Datumsberechnung für Profis' : 'Exact Date Calculation for Professionals'}
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
                    {t('title')}
                </h1>
                <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto font-light leading-relaxed">
                    {locale === 'de' 
                        ? 'Berechnen Sie exakte Zeitspannen, addieren Sie Tage oder ermitteln Sie Netto-Arbeitstage. Schnell, präzise und 100% kostenlos.'
                        : 'Calculate exact time spans, add days or determine net business days. Fast, precise and 100% free.'}
                </p>
            </header>

            {/* Smart Input Search */}
            <section aria-label={locale === 'de' ? "Schnellsuche" : "Quick Search"} className="mb-12 animate-slide-up-fade" style={{ animationDelay: '0.1s' }}>
                <SmartInputBar />
            </section>

            {/* Core Calculator Hub */}
            <section aria-label={locale === 'de' ? "Hauptrechner" : "Main Calculator"} className="w-full max-w-5xl mx-auto rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-3xl p-6 md:p-10 min-h-[400px] shadow-[0_0_50px_rgba(0,0,0,0.5)] mb-24 animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
                <CalculatorCore />
            </section>

            {/* Semantic SEO & Content Blocks */}
            <HomepageSEO locale={locale} />
        </div>
    );
}

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}
