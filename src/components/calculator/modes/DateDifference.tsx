'use client';

import { useState, useEffect } from 'react';
import { calculateDateDifference } from '@/lib/calculator';
import { useRecentCalculations } from '@/hooks/useRecentCalculations';
import { TimelineVisualization } from '../TimelineVisualization';
import { Copy, Share2, Check, BookmarkPlus } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

export function DateDifference() {
    const [start, setStart] = useState<string>('');
    const [end, setEnd] = useState<string>('');
    const [copied, setCopied] = useState(false);
    const { addCalculation } = useRecentCalculations();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('start')) setStart(params.get('start')!);
        if (params.get('end')) setEnd(params.get('end')!);
    }, []);

    useEffect(() => {
        if (!start && !end) return;
        const url = new URL(window.location.href);
        if (start) url.searchParams.set('start', start);
        if (end) url.searchParams.set('end', end);
        window.history.replaceState({}, '', url);
    }, [start, end]);

    const calculate = () => {
        if (!start || !end) return null;
        return calculateDateDifference(new Date(start), new Date(end));
    };

    const result = calculate();

    const handleSave = () => {
        if (result) {
            addCalculation({
                type: 'differenz',
                title: `${format(new Date(start), 'dd.MM.yyyy')} bis ${format(new Date(end), 'dd.MM.yyyy')}`,
                result: `${Math.abs(result.totalDays)} Tage`
            });
        }
    };

    const shareUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Startdatum</label>
                    <input
                        type="date"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Enddatum</label>
                    <input
                        type="date"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                    />
                </div>
            </div>

            {result && (
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-neon/30 shadow-[0_0_30px_rgba(255,0,85,0.05)] space-y-6 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-medium text-white/80">Ergebnis</h3>
                            <p className="text-4xl mt-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon to-neon-blue">
                                {Math.abs(result.totalDays)} Tage
                            </p>
                            <p className="text-sm text-white/50 mt-1">
                                ≈ {result.yearsMonthsDays.months} Monate und {result.yearsMonthsDays.days} Tage
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-xl transition-colors tooltip flex items-center gap-2"
                                title="Speichern"
                            >
                                <BookmarkPlus className="w-5 h-5 text-neon-blue" />
                            </button>
                            <button
                                onClick={shareUrl}
                                className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-xl transition-colors tooltip flex items-center gap-2"
                                title="Ergebnis teilen / Link kopieren"
                            >
                                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Share2 className="w-5 h-5 text-neon" />}
                            </button>
                        </div>
                    </div>

                    <TimelineVisualization
                        percentage={100}
                        labelStart={format(new Date(start), 'dd. MMM yyyy', { locale: de })}
                        labelEnd={format(new Date(end), 'dd. MMM yyyy', { locale: de })}
                    />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                        <div>
                            <p className="text-sm text-white/50">Wochen</p>
                            <p className="font-medium text-white">{result.weeksAndDays.weeks} w, {result.weeksAndDays.days} t</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm text-white/50">Jahre, Monate, Tage</p>
                            <p className="font-medium text-white">{result.yearsMonthsDays.years} j, {result.yearsMonthsDays.months} m, {result.yearsMonthsDays.days} t</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
