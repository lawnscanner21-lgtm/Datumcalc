import { Link } from '@/i18n/routing';

export function HomepageSEO() {
    const topQueries = [
        { title: '30 Tage ab heute', url: '/addieren/30-tage-ab-heute' },
        { title: '60 Tage ab heute', url: '/addieren/60-tage-ab-heute' },
        { title: '90 Tage ab heute', url: '/addieren/90-tage-ab-heute' },
        { title: '100 Tage ab heute', url: '/addieren/100-tage-ab-heute' },
        { title: '6 Monate ab heute', url: '/addieren/6-monate-ab-heute' },
    ];

    const eventQueries = [
        { title: 'Tage bis Weihnachten', url: '/differenz/tage-bis-weihnachten' },
        { title: 'Tage bis Silvester', url: '/differenz/tage-bis-silvester' },
        { title: 'Tage bis Ostern', url: '/differenz/tage-bis-ostern' },
        { title: 'Tage bis Sommeranfang', url: '/differenz/tage-bis-sommeranfang' },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto mt-24 mb-16 space-y-24">

            {/* 1. Internal Linking Mesh */}
            <section className="space-y-8 animate-in fade-in duration-700">
                <h2 className="text-3xl font-bold border-b border-white/10 pb-4">Entdecke den Datumsrechner</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div>
                        <h3 className="text-neon font-semibold text-lg mb-4">Beliebte Fristen</h3>
                        <ul className="space-y-3">
                            {topQueries.map((q, i) => (
                                <li key={i}><Link href={q.url} className="text-white/60 hover:text-white transition-colors">{q.title}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-neon-blue font-semibold text-lg mb-4">Countdown zu Ereignissen</h3>
                        <ul className="space-y-3">
                            {eventQueries.map((q, i) => (
                                <li key={i}><Link href={q.url} className="text-white/60 hover:text-white transition-colors">{q.title}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Ratgeber & Artikel</h3>
                        <ul className="space-y-3">
                            <li><Link href="/ratgeber/schaltjahre-erklaert" className="text-white/60 hover:text-white transition-colors">Schaltjahre einfach erklärt</Link></li>
                            <li><Link href="/ratgeber/arbeitstage-berechnen" className="text-white/60 hover:text-white transition-colors">Wie berechnet man Arbeitstage?</Link></li>
                            <li><Link href="/ratgeber/wochen-im-jahr" className="text-white/60 hover:text-white transition-colors">Wie viele Wochen hat ein Jahr?</Link></li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 2. SEO Content Block */}
            <section className="prose prose-invert max-w-4xl mx-auto bg-gradient-to-br from-white/5 to-transparent rounded-[2.5rem] p-10 md:p-14 border border-white/5 shadow-2xl">
                <h2 className="text-3xl font-bold mb-6">Der ultimative Datumsrechner für Profis und Alltag</h2>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                    Egal ob du Projektfristen planen, dein genaues Alter in Tagen berechnen oder wissen möchtest, an welchem Wochentag ein bestimmtes Datum liegt – unser Datumsrechner liefert Sekunden schnelle, präzise Antworten. Die Ergebnisse sind perfekt für Kalender, Countdowns und rechtliche Fristen.
                </p>
                <p className="text-white/70 text-lg leading-relaxed">
                    Unser System berücksichtigt dank fortschrittlicher Kalender-Algorithmen komplexe Faktoren wie Schaltjahre (z.B. den 29. Februar) sowie unregelmäßige Monatslängen völlig automatisch. Speichere Berechnungen direkt im Browser ab und teile die Ergebnisse mit nur einem Klick über teilbare URLs.
                </p>
            </section>

            {/* 3. FAQ Schema UI */}
            <section className="max-w-4xl mx-auto space-y-8">
                <h2 className="text-3xl font-bold text-center mb-8">Häufig gestellte Fragen (FAQ)</h2>
                <div className="space-y-4">
                    <details className="bg-[#1a1a1a]/50 border border-white/5 rounded-2xl p-6 group cursor-pointer hover:border-white/20 transition-colors">
                        <summary className="font-semibold text-lg list-none flex justify-between items-center">
                            Sind die Berechnungen zeitzonenunabhängig?
                            <span className="text-neon group-open:rotate-180 transition-transform text-xs">▼</span>
                        </summary>
                        <p className="text-white/60 mt-4 leading-relaxed cursor-text">
                            Ja. Die interne Logik unseres Datumsrechners greift auf lokalisierte und neutralisierte UTC-Zeitstempel zurück. Die Dauer zwischen zwei Daten bleibt unabhängig von Ihrer aktuellen Zeitzone exakt identisch.
                        </p>
                    </details>
                    <details className="bg-[#1a1a1a]/50 border border-white/5 rounded-2xl p-6 group cursor-pointer hover:border-white/20 transition-colors">
                        <summary className="font-semibold text-lg list-none flex justify-between items-center">
                            Werden Feiertage bei den Arbeitstagen berücksichtigt?
                            <span className="text-neon group-open:rotate-180 transition-transform text-xs">▼</span>
                        </summary>
                        <p className="text-white/60 mt-4 leading-relaxed cursor-text">
                            In der aktuellen Basisversion werden reguläre Wochenenden (Samstag und Sonntag) sicher herausgefiltert. Die Unterstützung für länderspezifische gesetzliche Feiertage (z.B. Weihnachten, Ostern) wird in Kürze in den Einstellungen konfigurierbar sein.
                        </p>
                    </details>
                    <details className="bg-[#1a1a1a]/50 border border-white/5 rounded-2xl p-6 group cursor-pointer hover:border-white/20 transition-colors">
                        <summary className="font-semibold text-lg list-none flex justify-between items-center">
                            Werden Schaltjahre wie der 29. Februar korrekt berechnet?
                            <span className="text-neon group-open:rotate-180 transition-transform text-xs">▼</span>
                        </summary>
                        <p className="text-white/60 mt-4 leading-relaxed cursor-text">
                            Absolut. Unsere Core-Engine basiert auf ISO-Standards und berechnet Schaltjahre, Schaltsekunden und wechselnde Monatslängen auf den Tag genau, ohne Rundungsfehler.
                        </p>
                    </details>
                </div>
            </section>

        </div>
    );
}
