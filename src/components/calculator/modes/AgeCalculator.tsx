'use client';

import { useState, useEffect } from 'react';
import { calculateAge } from '@/lib/calculator';
import { useRecentCalculations } from '@/hooks/useRecentCalculations';
import { Share2, Check, BookmarkPlus } from 'lucide-react';
import { format } from 'date-fns';

import { useTranslations } from 'next-intl';

export function AgeCalculator() {
    const t = useTranslations('Calculator');
    const [birthdate, setBirthdate] = useState<string>('');
    const [copied, setCopied] = useState(false);
    const { addCalculation } = useRecentCalculations();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('dob')) setBirthdate(params.get('dob')!);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!birthdate) return;
            const url = new URL(window.location.href);
            url.searchParams.set('dob', birthdate);
            window.history.replaceState({}, '', url);
        }, 500);
        return () => clearTimeout(timeout);
    }, [birthdate]);

    const calculate = () => {
        if (!birthdate) return null;
        return calculateAge(new Date(birthdate));
    };

    const result = calculate();

    const handleSave = () => {
        if (result && birthdate) {
            addCalculation({
                type: 'age',
                title: `${t('birthDate')}: ${format(new Date(birthdate), 'dd.MM.yyyy')}`,
                result: `${result.years} ${t('years')}`
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
                    <label className="text-sm font-medium text-white/80">{t('birthDate')}</label>
                    <input
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                    />
                </div>
            </div>

            {result && (
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-neon/30 shadow-[0_0_30px_rgba(255,0,85,0.05)] space-y-6 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-medium text-white/80">{t('currentAge')}</h3>
                            <p className="text-4xl mt-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon to-neon-blue">
                                {result.years} {t('years')}
                            </p>
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

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                        <div>
                            <p className="text-sm text-white/50">{t('months')}</p>
                            <p className="font-medium text-white">{result.months}</p>
                        </div>
                        <div>
                            <p className="text-sm text-white/50">{t('days')}</p>
                            <p className="font-medium text-white">{result.days}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm text-white/50">Total Life Days</p>
                            <p className="font-medium text-white">{result.totalDays} {t('days')}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
