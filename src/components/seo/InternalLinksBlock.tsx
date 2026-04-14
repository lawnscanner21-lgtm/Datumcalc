import { Link } from '@/i18n/navigation';

import { ROUTES } from '@/lib/routes';
import { translateSlug } from '@/lib/seo/translations';

export function InternalLinksBlock({ locale, intent, slug }: { locale: string; intent: string; slug: string }) {
    // Dynamically build related links (±10% numeric variations, 1 event, 1 use case)
    const links: { label: string; href: any; type: string }[] = [];
    
    const match = slug.match(/^(\d+)-/);
    const numValue = match ? parseInt(match[1]) : 0;

    const isDe = locale === 'de';
    
    if (numValue > 0) {
        // +-10%, +-20% logic approx
        const values = [
            Math.round(numValue * 0.8),
            Math.round(numValue * 0.9),
            Math.round(numValue * 1.1),
            Math.round(numValue * 1.2)
        ];
        
        values.forEach(v => {
            const label = isDe ? `${v} Tage ab heute` : `${v} ${translateSlug('tage ab-heute', locale)}`;
            links.push({ 
                label, 
                href: ROUTES.getAddieren(translateSlug(`${v}-tage-ab-heute`, locale)), 
                type: isDe ? 'Variation' : 'Variation' 
            });
        });
    } else {
        const standard = [30, 90, 100, 365];
        standard.forEach(v => {
            const label = isDe ? `${v} Tage ab heute` : `${v} ${translateSlug('tage ab-heute', locale)}`;
            links.push({ 
                label, 
                href: ROUTES.getAddieren(translateSlug(`${v}-tage-ab-heute`, locale)), 
                type: isDe ? 'Beliebt' : 'Popular' 
            });
        });
    }

    // Add more event & guide links
    const events = [
        { de: 'Tage bis Weihnachten', slug: 'tage-bis-weihnachten' },
        { de: 'Tage bis Silvester', slug: 'tage-bis-silvester' }
    ];

    events.forEach(e => {
        links.push({ 
            label: isDe ? e.de : translateSlug(e.slug, locale).replace(/-/g, ' '), 
            href: ROUTES.getDifferenz(translateSlug(e.slug, locale)), 
            type: isDe ? 'Event' : 'Event' 
        });
    });

    links.push({ 
        label: isDe ? 'Was ist ein Arbeitstag?' : 'What is a business day?', 
        href: ROUTES.getRatgeber(isDe ? 'was-ist-ein-arbeitstag' : 'what-is-a-business-day'), 
        type: isDe ? 'Ratgeber' : 'Guide' 
    });
    links.push({ 
        label: isDe ? 'Schaltjahre erklärt' : 'Leap years explained', 
        href: ROUTES.getRatgeber(isDe ? 'schaltjahre-erklaert' : 'leap-years-explained'), 
        type: isDe ? 'Ratgeber' : 'Guide' 
    });

    return (
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-12">
            <h2 className="text-xl font-bold mb-6 text-white">Verwandte Berechnungen & Themen</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {links.map((link, i) => (
                    <li key={i}>
                        <Link
                            href={link.href}
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
