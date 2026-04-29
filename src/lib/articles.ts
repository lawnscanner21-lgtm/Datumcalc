export interface Article {
    slug: string;
    title: string;
    description: string;
    content: string;
    publishedAt: string;
    readTime: string;
}

export const articles: Record<string, Article[]> = {
    de: [
        {
            slug: 'schaltjahre-erklaert',
            title: 'Schaltjahre einfach erklärt: Warum es den 29. Februar gibt',
            description: 'Alles, was du über Schaltjahre wissen musst. Erfahre, warum unser Kalender alle vier Jahre einen zusätzlichen Tag benötigt und wie das berechnet wird.',
            publishedAt: '24. März 2024',
            readTime: '3 min',
            content: `
          <h2>Was ist ein Schaltjahr?</h2>
          <p>Ein Schaltjahr hat 366 statt der üblichen 365 Tage. Der zusätzliche Tag wird ans Ende des Februars angehängt – der 29. Februar. Dies ist notwendig, um unseren Kalender mit dem Sonnenjahr (der Zeit, die die Erde braucht, um die Sonne zu umkreisen) zu synchronisieren.</p>
          
          <h2>Warum brauchen wir Schaltjahre?</h2>
          <p>Die Erde benötigt nicht genau 365 Tage für einen Umlauf um die Sonne, sondern etwa 365,2422 Tage. Wenn wir jedes Jahr streng auf 365 Tage setzen würden, würde sich unser Kalender alle vier Jahre um fast einen ganzen Tag verschieben. Nach 100 Jahren wären das 24 Tage! Der Sommer im Juli würde irgendwann im tiefsten Winter stattfinden.</p>
          
          <h2>Die Schaltjahr-Regel</h2>
          <p>Die Berechnung ist nicht ganz so einfach wie "alle vier Jahre". Die genaue globale Regel lautet:</p>
          <ul>
            <li>Ein Jahr ist ein Schaltjahr, wenn es durch 4 teilbar ist.</li>
            <li><strong>Ausnahme:</strong> Wenn das Jahr durch 100 teilbar ist, ist es <em>kein</em> Schaltjahr.</li>
            <li><strong>Ausnahme der Ausnahme:</strong> Wenn das Jahr durch 400 teilbar ist, ist es doch wieder ein Schaltjahr.</li>
          </ul>
          <p>Deshalb war das Jahr 2000 ein Schaltjahr, das Jahr 1900 jedoch nicht.</p>
        `
        },
        {
            slug: 'arbeitstage-berechnen',
            title: 'Wie berechnet man Arbeitstage und Werktage?',
            description: 'Der Unterschied zwischen Kalendertagen, Werktagen und Arbeitstagen. Ein Guide für rechtliche Fristen und die Projektplanung.',
            publishedAt: '22. März 2024',
            readTime: '4 min',
            content: `
          <h2>Arbeitstage vs. Werktage</h2>
          <p>In Deutschland, Österreich und der Schweiz gibt es rechtliche und praktische Unterschiede zwischen diesen wichtigen Begriffen:</p>
          <ul>
            <li><strong>Kalendertage:</strong> Jeder Tag im Jahr, von Montag bis Sonntag.</li>
            <li><strong>Werktage:</strong> Alle Tage von Montag bis Samstag (ausgenommen gesetzliche Feiertage). So ist es oft im Zivil- und Mietrecht geregelt.</li>
            <li><strong>Arbeitstage:</strong> Üblicherweise Montag bis Freitag (ausgenommen gesetzliche Feiertage). Das ist die klassische 5-Tage-Woche im Büro.</li>
          </ul>
    
          <h2>Warum ist die genaue Berechnung wichtig?</h2>
          <p>Bei Kündigungsfristen, Lieferzeiten oder Projektmeilensteinen macht es einen gewaltigen Unterschied. Wenn ein Vertrag eine Frist von "10 Arbeitstagen" vorsieht, bedeutet das faktisch zwei volle Kalenderwochen inklusive der übersprungenen Wochenenden.</p>
          
          <h2>Automatische Berechnung</h2>
          <p>Die manuelle Zählung im Kalender ist fehleranfällig, insbesondere wenn Monate den Jahreswechsel kreuzen. Unser in die Plattform integrierter <strong>Arbeitstage-Rechner</strong> filtert automatisch die Wochenenden (Samstag und Sonntag) heraus, damit du stets die exakte Anzahl der Netto-Arbeitstage erhältst.</p>
        `
        },
        {
            slug: 'wochen-im-jahr',
            title: 'Wie viele Wochen hat ein Jahr?',
            description: 'Hat ein Jahr immer 52 Wochen? Erfahre mehr über ISO-Wochen, Schaltjahre und warum manche Jahre 53 Wochen haben.',
            publishedAt: '20. März 2024',
            readTime: '2 min',
            content: `
          <h2>Die 52-Wochen-Regel</h2>
          <p>Normalerweise geht man von 52 Wochen pro Jahr aus. Teilt man 365 durch 7 (Tage pro Woche), erhält man exakt 52,14. Ein normales Jahr hat also 52 volle Wochen und einen restlichen Tag. Ein Schaltjahr hat 52 Wochen und 2 restliche Tage.</p>
    
          <h2>Wann gibt es eine 53. Kalenderwoche?</h2>
          <p>In Europa richtet sich die Wochenzählung nach der strikten DIN-Norm (ISO 8601). Diese besagt auf internationaler Ebene:</p>
          <blockquote style="border-left: 4px solid #ff0055; padding-left: 1rem; margin-top: 1rem; margin-bottom: 1rem; font-style: italic; background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 0.5rem;">
            Die Kalenderwoche 1 ist diejenige Woche, die den ersten Donnerstag des Jahres enthält.
          </blockquote>
          <p>Dadurch kommt es vor, dass ein Jahr 53 Kalenderwochen hat. Dies passiert immer dann, wenn ein gewöhnliches Jahr an einem Donnerstag beginnt (oder ein Schaltjahr an einem Mittwoch oder Donnerstag ansetzt).</p>
    
          <h2>Fazit zur Planung</h2>
          <p>Für die Gehaltsabrechnung, Urlaubsplanung oder Projektsteuerung ist die Kalenderwoche ein essenzielles Maß. Mit unserem Datumsrechner kannst du dir jegliche Kalender-Metriken jederzeit genau anzeigen lassen.</p>
        `
        },
        {
            slug: 'was-ist-ein-arbeitstag',
            title: 'Was ist ein Arbeitstag? Definition und gesetzliche Regelungen',
            description: 'Erfahre alles über den Begriff des Arbeitstags, wie er sich vom Werktag unterscheidet und was bei der Fristenberechnung zu beachten ist.',
            publishedAt: '25. März 2024',
            readTime: '3 min',
            content: `
          <h2>Definition: Arbeitstag</h2>
          <p>Ein Arbeitstag ist ein Tag, an dem üblicherweise gearbeitet wird. Im Gegensatz zum Kalendertag oder Werktag werden hierbei Wochenenden und gesetzliche Feiertage grundsätzlich ausgeschlossen.</p>
          
          <h2>Unterscheidung zum Werktag</h2>
          <p>Oft werden diese Begriffe verwechselt. Nach dem Bundesurlaubsgesetz gelten alle Kalendertage, die nicht Sonn- oder gesetzliche Feiertage sind, als Werktage (also auch der Samstag). Ein Arbeitstag hingegen bezieht sich meist auf die individuelle 5-Tage-Woche (Montag bis Freitag).</p>
          
          <h2>Relevanz für Fristen</h2>
          <p>Wenn im Arbeitsvertrag von "Arbeitstagen" die Rede ist, zählen Samstage nicht mit. Steht dort jedoch "Werktage", muss der Samstag bei der Fristberechnung berücksichtigt werden. Mit unserem Rechner kannst du beide Varianten präzise unterscheiden.</p>
        `
        },
        {
            slug: 'iso-8601-erklaert',
            title: 'ISO 8601 erklärt: Der internationale Standard für Datum und Zeit',
            description: 'Warum ISO 8601 der wichtigste Standard für die digitale Zeitmessung ist und wie man ihn richtig anwendet.',
            publishedAt: '26. März 2024',
            readTime: '4 min',
            content: `
          <h2>Was ist ISO 8601?</h2>
          <p>ISO 8601 ist der internationale Standard der ISO für die Darstellung von Datum und Uhrzeit. Er sorgt dafür, dass Zeitangaben weltweit eindeutig und maschinenlesbar sind.</p>
          
          <h2>Formatierung (YYYY-MM-DD)</h2>
          <p>Das bekannteste Merkmal ist die absteigende Sortierung: Jahr, Monat, Tag. Das Format <code>2024-03-24</code> ist absolut eindeutig und vermeidet Verwechslungen zwischen dem US-Format (MM/DD/YYYY) und dem europäischen Format (DD.MM.YYYY).</p>
          
          <h2>Warum wir ISO 8601 nutzen</h2>
          <p>Für Informatiker und Mathematiker ist dieser Standard essenziell, da Datumsangaben so lexikographisch korrekt sortiert werden können. Unser Datumsrechner basiert intern vollständig auf diesen standardisierten Zeitstempeln, um höchste mathematische Präzision zu garantieren.</p>
        `
        }
    ],
    en: [
        {
            slug: 'leap-years-explained',
            title: 'Leap Years Explained: Why February 29th Exists',
            description: 'Everything you need to know about leap years. Learn why our calendar needs an extra day every four years and how it is calculated.',
            publishedAt: 'March 24, 2024',
            readTime: '3 min',
            content: `
          <h2>What is a Leap Year?</h2>
          <p>A leap year has 366 days instead of the usual 365. The extra day is added to the end of February – February 29th. This is necessary to synchronize our calendar with the solar year (the time it takes for the Earth to orbit the Sun).</p>
          
          <h2>Why do we need Leap Years?</h2>
          <p>The Earth takes approximately 365.2422 days to complete one orbit around the Sun. If we strictly used 365 days every year, our calendar would shift by nearly a full day every four years. After 100 years, that would be 24 days! Summer in July would eventually occur in the middle of winter.</p>
          
          <h2>The Leap Year Rule</h2>
          <p>The calculation is not as simple as "every four years." The exact global rule is:</p>
          <ul>
            <li>A year is a leap year if it is divisible by 4.</li>
            <li><strong>Exception:</strong> If the year is divisible by 100, it is <em>not</em> a leap year.</li>
            <li><strong>Exception to the exception:</strong> If the year is divisible by 400, it <em>is</em> a leap year after all.</li>
          </ul>
          <p>That's why the year 2000 was a leap year, but the year 1900 was not.</p>
        `
        },
        {
            slug: 'calculating-business-days',
            title: 'How to Calculate Business Days and Working Days?',
            description: 'The difference between calendar days, working days, and business days. A guide for legal deadlines and project planning.',
            publishedAt: 'March 22, 2024',
            readTime: '4 min',
            content: `
          <h2>Business Days vs. Working Days</h2>
          <p>There are legal and practical differences between these important terms:</p>
          <ul>
            <li><strong>Calendar Days:</strong> Every day of the year, from Monday to Sunday.</li>
            <li><strong>Working Days:</strong> Usually all days from Monday to Saturday (excluding public holidays). This is common in various legal contexts.</li>
            <li><strong>Business Days:</strong> Typically Monday to Friday (excluding public holidays). This is the standard 5-day week for most companies.</li>
          </ul>
    
          <h2>Why is Precise Calculation Important?</h2>
          <p>For notice periods, delivery times, or project milestones, it makes a huge difference. If a contract specifies a period of "10 business days," it effectively means two full calendar weeks including the skipped weekends.</p>
          
          <h2>Automatic Calculation</h2>
          <p>Manual counting on a calendar is prone to errors, especially when periods cross month or year boundaries. Our integrated <strong>Business Days Calculator</strong> automatically filters out weekends so you always get the exact number of net business days.</p>
        `
        },
        {
            slug: 'weeks-in-a-year',
            title: 'How Many Weeks are in a Year?',
            description: 'Does a year always have 52 weeks? Learn about ISO weeks, leap years, and why some years have 53 weeks.',
            publishedAt: 'March 20, 2024',
            readTime: '2 min',
            content: `
          <h2>The 52-Week Rule</h2>
          <p>Normally, a year is assumed to have 52 weeks. If you divide 365 by 7 (days per week), you get exactly 52.14. A standard year has 52 full weeks and one remaining day. A leap year has 52 weeks and 2 remaining days.</p>
    
          <h2>When is there a 53rd Calendar Week?</h2>
          <p>The week numbering follows the strict ISO 8601 standard. This states internationally:</p>
          <blockquote style="border-left: 4px solid #ff0055; padding-left: 1rem; margin-top: 1rem; margin-bottom: 1rem; font-style: italic; background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 0.5rem;">
            Week 1 is the week that contains the first Thursday of the year.
          </blockquote>
          <p>Because of this, it happens that a year has 53 calendar weeks. This occurs whenever a common year begins on a Thursday (or a leap year starts on a Wednesday or Thursday).</p>
    
          <h2>Planning Summary</h2>
          <p>Calendar weeks are essential for payroll, vacation planning, and project management. Our date calculator allows you to display any calendar metrics precisely at any time.</p>
        `
        },
        {
            slug: 'what-is-a-business-day',
            title: 'What is a Business Day? Definition and Global Standards',
            description: 'Learn everything about the term business day, how it differs from a working day, and what to consider when calculating deadlines.',
            publishedAt: 'March 25, 2024',
            readTime: '3 min',
            content: `
          <h2>Definition: Business Day</h2>
          <p>A business day is a day on which work is normally performed. Unlike calendar days or working days, weekends and public holidays are excluded by default.</p>
          
          <h2>Difference from Working Day</h2>
          <p>These terms are often confused. In many regions, working days include all calendar days except Sundays and public holidays (thus including Saturdays). A business day, on the other hand, usually refers to the 5-day week (Monday to Friday).</p>
          
          <h2>Relevance for Deadlines</h2>
          <p>If an employment contract refers to "business days," Saturdays are not counted. However, if it says "working days," Saturday must be included in the deadline calculation. With our calculator, you can precisely distinguish between both variants.</p>
        `
        },
        {
            slug: 'iso-8601-explained',
            title: 'ISO 8601 Explained: The International Standard for Date and Time',
            description: 'Why ISO 8601 is the most important standard for digital time measurement and how to apply it correctly.',
            publishedAt: 'March 26, 2024',
            readTime: '4 min',
            content: `
          <h2>What is ISO 8601?</h2>
          <p>ISO 8601 is the international standard for representing date and time. It ensures that time specifications are unique and machine-readable worldwide.</p>
          
          <h2>Formatting (YYYY-MM-DD)</h2>
          <p>The most famous feature is the descending order: Year, Month, Day. The format <code>2024-03-24</code> is absolutely unambiguous and avoids confusion between the US format (MM/DD/YYYY) and European format (DD.MM.YYYY).</p>
          
          <h2>Why We Use ISO 8601</h2>
          <p>For programmers and mathematicians, this standard is essential because date information can be sorted lexicographically correct. Our date calculator is internally based entirely on these standardized timestamps to guarantee the highest mathematical precision.</p>
        `
        }
    ]
};

export function getArticles(locale: string): Article[] {
    return articles[locale] || articles['de'];
}

export function getArticleBySlug(slug: string, locale: string = 'de') {
    // 1. Try requested locale
    let article = articles[locale]?.find(a => a.slug === slug);
    if (article) return article;

    // 2. Fallback: Search ALL locales (essential for GSC remediation)
    const allArticles = Object.values(articles).flat();
    return allArticles.find(a => a.slug === slug);
}
