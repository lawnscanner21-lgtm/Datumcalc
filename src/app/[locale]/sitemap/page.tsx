import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link, locales } from '@/i18n/routing';
import { 
    Calculator, 
    BookOpen, 
    Shield, 
    Globe, 
    ArrowRight,
    CalendarClock,
    FileText,
    Info,
    Mail
} from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Common.titles' });
    return {
        title: `${t('sitemap')} - Datumsrechner`,
        description: `Übersicht aller Tools, Ratgeber und rechtlichen Informationen von datums-rechner.com.`
    };
}

export default function SitemapPage() {
    const t = useTranslations('Header');
    const tCommon = useTranslations('Common');
    const tNav = useTranslations('Header.Nav');

    const sections = [
        {
            title: tNav('ariaLabel'),
            icon: Calculator,
            color: 'text-neon',
            links: [
                { href: '/differenz', label: tNav('differenz'), desc: tNav('differenzDesc') },
                { href: '/addieren', label: tNav('addieren'), desc: tNav('addierenDesc') },
                { href: '/arbeitstage', label: tNav('arbeitstage'), desc: tNav('arbeitstageDesc') },
                { href: '/alter', label: 'Alter berechnen', desc: 'Genaues Alter in Tagen, Monaten und Jahren' },
            ]
        },
        {
            title: tNav('ratgeber'),
            icon: BookOpen,
            color: 'text-neon-blue',
            links: [
                { href: '/ratgeber/schaltjahre-erklaert', label: 'Schaltjahre erklärt', desc: 'Warum gibt es den 29. Februar?' },
                { href: '/ratgeber/arbeitstage-berechnen', label: 'Arbeitstage berechnen', desc: 'Wie Netto-Arbeitstage ermittelt werden' },
                { href: '/ratgeber/wochen-im-jahr', label: 'Wochen im Jahr', desc: 'Wieviele Wochen hat ein Jahr wirklich?' },
                { href: '/ratgeber/iso-8601-erklaert', label: 'Was ist ISO 8601?', desc: 'Der internationale Standard für Zeitangaben' },
            ]
        },
        {
            title: 'Rechtliches & Info',
            icon: Shield,
            color: 'text-purple-400',
            links: [
                { href: '/ueber-uns', label: tCommon('titles.about') },
                { href: '/datenschutz', label: tCommon('titles.privacy') },
                { href: '/agb', label: tCommon('titles.terms') },
                { href: '/impressum', label: tCommon('titles.imprint') },
            ]
        }
    ];

    return (
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <header className="text-center mb-16 space-y-4 animate-slide-up-fade">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-4">
                    <CalendarClock className="w-8 h-8 text-neon" />
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                    {tCommon('titles.sitemap')}
                </h1>
                <p className="text-white/50 text-lg max-w-2xl mx-auto">
                    Alle Funktionen und Informationen von datums-rechner.com auf einen Blick.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sections.map((section, idx) => (
                    <section 
                        key={idx} 
                        className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 group"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className={`p-3 rounded-xl bg-white/5 ${section.color}`}>
                                <section.icon className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-white">{section.title}</h2>
                        </div>

                        <ul className="space-y-4">
                            {section.links.map((link, lIdx) => (
                                <li key={lIdx}>
                                    <Link 
                                        href={link.href}
                                        className="block p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200 group/link"
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-white/80 group-hover/link:text-white transition-colors">
                                                {link.label}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-white/20 group-hover/link:text-neon transition-all -translate-x-2 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                                        </div>
                                        {('desc' in link && link.desc) && (
                                            <p className="text-sm text-white/40 group-hover/link:text-white/60 transition-colors">
                                                {link.desc as string}
                                            </p>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>

            {/* Language Section */}
            <section className="mt-16 p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 animate-slide-up-fade" style={{ animationDelay: '0.1s' }}>
                <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
                            <Globe className="w-6 h-6 text-neon-blue" />
                            {t('Nav.languageLabel')}
                        </h2>
                        <p className="text-white/50">Wählen Sie Ihre bevorzugte Sprache für alle Berechnungen.</p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-3">
                        {locales.map((loc) => (
                            <Link
                                key={loc}
                                locale={loc}
                                href="/sitemap"
                                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-white/60 hover:text-white hover:bg-white/10 transition-all"
                            >
                                {tCommon(`languages.${loc}`)}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
