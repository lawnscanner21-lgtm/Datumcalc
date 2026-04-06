import { Link } from '@/i18n/routing';
import { CANONICAL_QUERIES } from '@/lib/seo/queryModel';

export function InternalLinksBlock({ locale, intent, slug }: { locale: string; intent: string; slug: string }) {
    // Dynamically build related links (±10% numeric variations, 1 event, 1 use case)
    const links: { label: string; urlSlug: string; type: string }[] = [];
    
    const match = slug.match(/^(\d+)-/);
    const numValue = match ? parseInt(match[1]) : 0;

    if (numValue > 0) {
        // +-10% logic approx
        const plus10 = Math.round(numValue * 1.1);
        const minus10 = Math.round(numValue * 0.9);
        links.push({ label: `${minus10} Tage ab heute`, urlSlug: `addieren/${minus10}-tage-ab-heute`, type: 'Variation' });
        links.push({ label: `${plus10} Tage ab heute`, urlSlug: `addieren/${plus10}-tage-ab-heute`, type: 'Variation' });
    } else {
        links.push({ label: '30 Tage ab heute', urlSlug: 'addieren/30-tage-ab-heute', type: 'Beliebt' });
        links.push({ label: '90 Tage ab heute', urlSlug: 'addieren/90-tage-ab-heute', type: 'Beliebt' });
    }

    // Add 1 event link
    links.push({ label: 'Tage bis Weihnachten', urlSlug: 'differenz/tage-bis-weihnachten', type: 'Event' });
    
    // Add 1 authority guide
    links.push({ label: 'Was ist ein Arbeitstag?', urlSlug: 'ratgeber/was-ist-ein-arbeitstag', type: 'Ratgeber' });

    return (
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-12">
            <h2 className="text-xl font-bold mb-6 text-white">Verwandte Berechnungen & Themen</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {links.map((link, i) => (
                    <li key={i}>
                        <Link
                            href={`/${link.urlSlug}`}
                            className="block p-4 rounded-xl bg-black/40 border border-white/5 hover:border-neon-blue/50 hover:bg-neon-blue/5 transition-all group"
                        >
                            <span className="text-xs font-medium text-neon uppercase tracking-wider mb-2 block">{link.type}</span>
                            <span className="text-white/80 group-hover:text-white flex items-center gap-2">
                                {link.label}
                                <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
