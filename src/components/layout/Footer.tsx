import { Link } from '@/i18n/navigation';

import { ROUTES } from '@/lib/routes';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ShieldCheck, Calculator, CalendarClock } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export function Footer() {
    const locale = useLocale();
    const t = useTranslations('Header');
    const tCommon = useTranslations('Common');
    const isDe = locale === 'de';

    return (
        <footer className="w-full border-t border-white/5 bg-[#020202] py-16 mt-auto relative z-10 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent"></div>

            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Top: Semantic Clusters & Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    
                    {/* Brand & E-E-A-T */}
                    <div className="col-span-1 lg:col-span-2 space-y-6">
                        <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 flex items-center gap-2">
                            <CalendarClock className="w-6 h-6 text-neon" />
                            {isDe ? 'Datumsrechner' : 'Date Calculator'}
                        </span>
                        <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                            {isDe 
                                ? 'Ihr präzises Werkzeug für Datumsberechnungen, Fristen und Zeitspannen. Entwickelt für höchste mathematische Genauigkeit.'
                                : 'Your precise tool for date calculations, deadlines, and time spans. Developed for maximum mathematical accuracy.'}
                        </p>
                        <div className="flex items-center gap-3 text-xs font-medium text-white/40 bg-white/5 w-fit px-4 py-2 rounded-full border border-white/5">
                            <ShieldCheck className="w-4 h-4 text-green-400" />
                            {isDe ? 'Mathematisch geprüft & ISO 8601 konform' : 'Mathematically verified & ISO 8601 compliant'}
                        </div>
                    </div>

                    {/* Cluster 1 */}
                    <nav aria-label="Footer Beliebte Rechner">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Calculator className="w-4 h-4 text-neon-blue" />
                            {isDe ? 'Werkzeuge' : 'Tools'}
                        </h3>
                        <ul className="space-y-3 text-sm text-white/50">
                            <li><Link href={ROUTES.differenz} className="hover:text-white transition-colors">{isDe ? 'Tage zählen (Differenz)' : 'Count Days (Difference)'}</Link></li>
                            <li><Link href={ROUTES.addieren} className="hover:text-white transition-colors">{isDe ? 'Datum addieren' : 'Add to Date'}</Link></li>
                            <li><Link href={ROUTES.arbeitstage} className="hover:text-white transition-colors">{isDe ? 'Arbeitstage berechnen' : 'Calculate Business Days'}</Link></li>
                            <li><Link href={ROUTES.alter} className="hover:text-white transition-colors">{isDe ? 'Alter berechnen' : 'Calculate Age'}</Link></li>
                        </ul>
                    </nav>

                    {/* Cluster 2 */}
                    <nav aria-label="Footer Ratgeber">
                        <h3 className="text-white font-bold mb-4">{isDe ? 'Wissen' : 'Knowledge'}</h3>
                        <ul className="space-y-3 text-sm text-white/50">
                            <li><Link href={ROUTES.getRatgeber(isDe ? 'schaltjahre-erklaert' : 'leap-years-explained')} className="hover:text-white transition-colors">{isDe ? 'Schaltjahre erklärt' : 'Leap Years Explained'}</Link></li>
                            <li><Link href={ROUTES.getRatgeber(isDe ? 'arbeitstage-berechnen' : 'calculating-business-days')} className="hover:text-white transition-colors">{isDe ? 'Was ist ein Arbeitstag?' : 'What is a Business Day?'}</Link></li>
                            <li><Link href={ROUTES.getRatgeber(isDe ? 'wochen-im-jahr' : 'weeks-in-a-year')} className="hover:text-white transition-colors">{isDe ? 'Wochen im Jahr' : 'Weeks in a Year'}</Link></li>
                        </ul>
                    </nav>
                </div>

                {/* Middle: Language Selection */}
                <div className="w-full py-8 border-t border-white/5 border-b mb-8 text-center bg-gradient-to-r from-transparent via-white/[0.02] to-transparent">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/30">Sprache wählen / Select Language</p>
                    <LanguageSwitcher />
                </div>

                {/* Bottom: Legal */}
                <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6 text-sm text-white/40">
                    <p className="order-2 md:order-1">© {new Date().getFullYear()} Datumsrechner. Alle Rechte vorbehalten.</p>
                    
                    <nav aria-label="Footer Legal" className="flex flex-wrap justify-center gap-x-6 gap-y-4 order-1 md:order-2 font-medium">
                        <Link href={ROUTES.about} className="hover:text-white transition-colors">{tCommon('titles.about')}</Link>
                        <Link href={ROUTES.sitemap} className="hover:text-white transition-colors">{tCommon('titles.sitemap')}</Link>
                        <Link href={ROUTES.datenschutz} className="hover:text-white transition-colors">{tCommon('titles.privacy')}</Link>
                        <Link href={ROUTES.agb} className="hover:text-white transition-colors">{tCommon('titles.terms')}</Link>
                        <Link href={ROUTES.impressum} className="hover:text-white transition-colors">{tCommon('titles.imprint')}</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
