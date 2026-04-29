'use client';

import { useState, useEffect } from 'react';
import { getBusinessDays } from '@/lib/calculator';
import { useRecentCalculations } from '@/hooks/useRecentCalculations';
import { Share2, Check, BookmarkPlus } from 'lucide-react';
import { format } from 'date-fns';

import { useTranslations } from 'next-intl';

export function BusinessDays() {
    const t = useTranslations('Calculator');
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
        const timeout = setTimeout(() => {
            if (!start && !end) return;
            const url = new URL(window.location.href);
            if (start) url.searchParams.set('start', start);
            if (end) url.searchParams.set('end', end);
            window.history.replaceState({}, '', url);
        }, 300);
        return () => clearTimeout(timeout);
    }, [start, end]);

    const calculate = () => {
        if (!start || !end) return null;
        return getBusinessDays(new Date(start), new Date(end));
    };

    const result = calculate();

    const handleSave = () => {
        if (result !== null) {
            addCalculation({
                type: 'business_days',
                title: `${t('businessDays')}: ${format(new Date(start), 'dd.MM')} - ${format(new Date(end), 'dd.MM')}`,
                result: `${Math.abs(result)} ${t('days')}`
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
                    <label className="text-sm font-medium text-white/80">{t('startDate')}</label>
                    <input
                        type="date"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">{t('endDate')}</label>
                    <input
                        type="date"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                    />
                </div>
            </div>

            {result !== null && (
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-neon/30 shadow-[0_0_30px_rgba(255,0,85,0.05)] space-y-4 relative">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-medium text-white/80">{t('businessDays')}</h3>
                            <p className="text-3xl mt-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon to-neon-blue">
                                {Math.abs(result)} {t('days')}
                            </p>
                            <p className="text-sm text-white/50 mt-1">Excl. Sat & Sun.</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={handleSave} className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-xl transition-colors tooltip" title={t('save')}>
                                <BookmarkPlus className="w-5 h-5 text-neon-blue" />
                            </button>
                            <button onClick={shareUrl} className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-xl transition-colors tooltip" title={t('share')}>
                                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Share2 className="w-5 h-5 text-neon" />}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
