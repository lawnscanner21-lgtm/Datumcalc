export interface Article {
    slug: string;
    title: string;
    description: string;
    publishedAt: string;
    readTime: string;
    content: string;
}

export const articles: Record<string, Article[]> = {
    de: [
        {
            slug: 'schaltjahre-erklaert',
            title: 'Schaltjahre erklärt: Warum es den 29. Februar gibt',
            description: 'Alles was man über Schaltjahre wissen muss. Erfahre warum unser Kalender alle vier Jahre einen extra Tag braucht und wie man ihn berechnet.',
            publishedAt: '24. März 2024',
            readTime: '3 min',
            content: `
          <h2>Was ist ein Schaltjahr?</h2>
          <p>Ein Schaltjahr hat 366 Tage statt der üblichen 365. Der zusätzliche Tag wird am Ende des Februars als 29. Februar eingefügt. Dies ist notwendig, um unseren Kalender mit dem Sonnenjahr (der Zeit, die die Erde für eine Umkreisung der Sonne benötigt) zu synchronisieren.</p>
          
          <h2>Warum brauchen wir Schaltjahre?</h2>
          <p>Die Erde benötigt etwa 365,2422 Tage, um die Sonne einmal komplett zu umrunden. Würden wir strikt jedes Jahr 365 Tage nutzen, würde sich unser Kalender alle vier Jahre um fast einen ganzen Tag verschieben. Nach 100 Jahren wären das schon 24 Tage! Der Sommer im Juli würde irgendwann mitten in den Winter fallen.</p>
          
          <h2>Die Schaltjahr-Regel</h2>
          <p>Die Berechnung ist nicht so simpel wie "alle vier Jahre". Die genaue weltweite Regel lautet:</p>
          <ul>
            <li>Ein Jahr ist ein Schaltjahr, wenn es restlos durch 4 teilbar ist.</li>
            <li><strong>Ausnahme:</strong> Ist das Jahr durch 100 teilbar, ist es <em>kein</em> Schaltjahr.</li>
            <li><strong>Ausnahme von der Ausnahme:</strong> Ist das Jahr durch 400 teilbar, ist es <em>doch</em> wieder ein Schaltjahr.</li>
          </ul>
          <p>Deshalb war das Jahr 2000 ein Schaltjahr, das Jahr 1900 jedoch nicht.</p>
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
            slug: 'wochen-im-jahr',
            title: 'Wie viele Wochen hat ein Jahr?',
            description: 'Hat ein Jahr immer 52 Wochen? Erfahre mehr über ISO-Wochen, Schaltjahre und warum manche Jahre 53 Wochen haben.',
            publishedAt: '20. März 2024',
            readTime: '2 min',
            content: `
          <h2>Die 52-Wochen-Regel</h2>
          <p>Normalerweise geht man davon aus, dass ein Jahr 52 Wochen hat. Teilt man 365 durch 7 (Tage pro Woche), erhält man exakt 52,14. Ein normales Jahr hat also 52 volle Wochen und einen Resttag. Ein Schaltjahr hat 52 Wochen und 2 Resttage.</p>
    
          <h2>Wann gibt es eine 53. Kalenderwoche?</h2>
          <p>Die Zählweise der Wochen folgt dem strengen ISO 8601 Standard. Dieser besagt international:</p>
          <blockquote style="border-left: 4px solid #ff0055; padding-left: 1rem; margin-top: 1rem; margin-bottom: 1rem; font-style: italic; background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 0.5rem;">
            Woche 1 ist diejenige Woche, die den ersten Donnerstag des Jahres enthält.
          </blockquote>
          <p>Aufgrund dessen kommt es vor, dass ein Jahr 53 Kalenderwochen hat. Das passiert immer dann, wenn ein Gemeinjahr an einem Donnerstag beginnt (oder ein Schaltjahr an einem Mittwoch oder Donnerstag startet).</p>
    
          <h2>Zusammenfassung für die Planung</h2>
          <p>Kalenderwochen sind unerlässlich für Lohnabrechnungen, Urlaubsplanung und Projektmanagement. Mit unserem Datumsrechner kannst du dir für jede beliebige Zeitspanne auch die exakten Kalender-Metriken anzeigen lassen.</p>
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
    ]
};

export function getArticles(locale: string): Article[] {
    return articles['de'];
}

export function getArticleBySlug(slug: string, locale: string = 'de') {
    return articles['de']?.find(a => a.slug === slug);
}
