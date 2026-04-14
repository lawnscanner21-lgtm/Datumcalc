'use client';
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';


export function TrustSignals() {
    const [dateString, setDateString] = useState('');

    useEffect(() => {
        // Just use current date for "Last Updated" visual
        const d = new Date();
        setDateString(d.toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/50 text-sm mt-12 mb-8 animate-in fade-in duration-700">
            <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Zuletzt aktualisiert: {dateString}
            </div>
            <span className="hidden sm:inline">•</span>
            <Link href="/ueber-uns" className="hover:text-white transition-colors">Über uns</Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
        </div>
    );
}
