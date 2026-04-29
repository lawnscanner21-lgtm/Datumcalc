const SLUG_TOKEN_TRANSLATIONS = {
    de: { 
        'tage': 'tage', 'monate': 'monate', 'jahre': 'jahre', 
        'ab-heute': 'ab-heute', 'tage-bis': 'tage-bis',
        'weihnachten': 'weihnachten', 'silvester': 'silvester', 
        'ostern': 'ostern', 'sommeranfang': 'sommeranfang'
    },
    en: { 
        'tage': 'days', 'monate': 'months', 'jahre': 'years', 
        'ab-heute': 'from-today', 'tage-bis': 'days-until',
        'weihnachten': 'christmas', 'silvester': 'new-year', 
        'ostern': 'easter', 'sommeranfang': 'summer-solstice'
    }
};

function translateSlug(slug, locale) {
    const tokens = locale === 'de' ? {} : SLUG_TOKEN_TRANSLATIONS[locale];
    if (!tokens) return slug;

    let localized = slug;
    const sortedKeys = Object.entries(SLUG_TOKEN_TRANSLATIONS['de'])
        .sort((a, b) => b[1].length - a[1].length);

    sortedKeys.forEach(([key, deVal]) => {
        const regex = new RegExp(`\\b${deVal}\\b`, 'g');
        localized = localized.replace(regex, tokens[key] || deVal);
    });
    return localized;
}

console.log(translateSlug('tage-bis-weihnachten', 'en'));
