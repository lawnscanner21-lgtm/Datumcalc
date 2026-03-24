import { CalculatorCore } from '@/components/calculator/CalculatorCore';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SEOContentBlock } from '@/components/seo/SEOContentBlock';
import { FAQBlock } from '@/components/seo/FAQBlock';
import { InternalLinksBlock } from '@/components/seo/InternalLinksBlock';
import { AffiliateCard } from '@/components/monetization/AffiliateCard';

const intentToModeMap: Record<string, string> = {
    'differenz': 'difference',
    'difference': 'difference',
    'addieren': 'add_subtract',
    'add': 'add_subtract',
    'arbeitstage': 'business_days',
    'business': 'business_days',
    'alter': 'age',
    'age': 'age'
};
export const revalidate = 86400; // 24 hours ISR revalidation

export default async function ProgrammaticPage({
    params
}: {
    params: Promise<{ locale: string; intent: string; slug: string[] }>
}) {
    const { locale, intent, slug } = await params;
    const mode = intentToModeMap[intent.toLowerCase()];

    if (!mode) {
        notFound();
    }

    const slugStr = slug.join('-');

    return (
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12 space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight capitalize">
                    {intent} {slugStr.replace(/-/g, ' ')}
                </h1>
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                    Nutze unseren Rechner für {intent} {slugStr.replace(/-/g, ' ')}
                </p>
            </div>

            <div className="w-full max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 md:p-8 min-h-[400px] shadow-2xl mb-12">
                <CalculatorCore initialMode={mode as any} />
            </div>

            <div className="max-w-4xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                <AffiliateCard
                    title="Fristen niemals verpassen"
                    description="Lassen Sie sich rechtzeitig an alle Termine erinnern. Kostenlose Kalender."
                    url="https://affiliate/calendar"
                    ctaText="App herunterladen"
                />
                <AffiliateCard
                    title="Projektplanung leicht gemacht"
                    description="Das Tool für Teams, die ihre Meilensteine und Sprints tracken wollen."
                    url="https://affiliate/management"
                    ctaText="Kostenlos testen"
                />
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
                <SEOContentBlock intent={intent} slug={slugStr} />
                <InternalLinksBlock locale={locale} intent={intent} />
                <FAQBlock intent={intent} slug={slugStr} />
            </div>
        </main>
    );
}

export function generateStaticParams() {
    const topNumbers = ['30', '60', '90', '100'];
    const intents = ['differenz', 'addieren'];
    const locales = ['de', 'en'];
    const params = [];

    for (const locale of locales) {
        for (const intent of intents) {
            for (const num of topNumbers) {
                params.push({
                    locale,
                    intent,
                    slug: [num, 'tage', 'ab', 'heute']
                });
            }
        }
    }
    return params;
}
