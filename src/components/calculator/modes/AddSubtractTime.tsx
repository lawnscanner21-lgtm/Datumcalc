'use client';

import { useState, useEffect } from 'react';
import { calculateOffsetDate, TimeUnit, Operation } from '@/lib/calculator';
import { format } from 'date-fns';
import { useRecentCalculations } from '@/hooks/useRecentCalculations';
import { Copy, Share2, Check, BookmarkPlus } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import * as dateLocales from 'date-fns/locale';

export function AddSubtractTime() {
    const t = useTranslations('Calculator');
    const locale = useLocale();
    const dateLocale = (dateLocales as any)[locale] || dateLocales.de;

    const [baseDate, setBaseDate] = useState<string>('');
    const [amount, setAmount] = useState<number | ''>('');
    const [unit, setUnit] = useState<TimeUnit>('days');
    const [operation, setOperation] = useState<Operation>('add');
    const [copied, setCopied] = useState(false);
    const { addCalculation } = useRecentCalculations();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('base')) setBaseDate(params.get('base')!);
        if (params.get('amount')) setAmount(Number(params.get('amount')));
        if (params.get('unit')) setUnit(params.get('unit') as TimeUnit);
        if (params.get('op')) setOperation(params.get('op') as Operation);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!baseDate && amount === '') return;
            const url = new URL(window.location.href);
            if (baseDate) url.searchParams.set('base', baseDate);
            if (amount !== '') url.searchParams.set('amount', amount.toString());
            url.searchParams.set('unit', unit);
            url.searchParams.set('op', operation);
            window.history.replaceState({}, '', url);
        }, 300);
        return () => clearTimeout(timeout);
    }, [baseDate, amount, unit, operation]);

    const calculate = () => {
        if (!baseDate || amount === '' || isNaN(amount)) return null;
        return calculateOffsetDate(new Date(baseDate), Number(amount), unit, operation);
    };

    const result = calculate();

    const handleSave = () => {
        if (result) {
            addCalculation({
                type: 'add_subtract',
                title: `${format(new Date(baseDate), 'dd.MM')} ${operation === 'add' ? '+' : '-'} ${amount} ${t(unit)}`,
                result: format(result, 'dd.MM.yyyy')
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2 md:col-span-1">
                    <label className="text-sm font-medium text-white/80">{t('action')}</label>
                    <select
                        value={operation}
                        onChange={(e) => setOperation(e.target.value as Operation)}
                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors appearance-none"
                    >
                        <option value="add">{t('add')}</option>
                        <option value="subtract">{t('subtract')}</option>
                    </select>
                </div>

                <div className="space-y-2 md:col-span-1">
                    <label className="text-sm font-medium text-white/80">{t('amount')}</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value === '' ? '' : parseInt(e.target.value))}
                        min="0"
                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                    />
                </div>

                <div className="space-y-2 md:col-span-1">
                    <label className="text-sm font-medium text-white/80">{t('unit')}</label>
                    <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value as TimeUnit)}
                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors appearance-none"
                    >
                        <option value="days">{t('days')}</option>
                        <option value="weeks">{t('weeks')}</option>
                        <option value="months">{t('months')}</option>
                        <option value="years">{t('years')}</option>
                    </select>
                </div>

                <div className="space-y-2 md:col-span-1">
                    <label className="text-sm font-medium text-white/80">{t('startDate')}</label>
                    <input
                        type="date"
                        value={baseDate}
                        onChange={(e) => setBaseDate(e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                    />
                </div>
            </div>

            {result && (
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-neon/30 shadow-[0_0_30px_rgba(255,0,85,0.05)] space-y-4 relative">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-medium text-white/80">{t('result')}</h3>
                            <p className="text-3xl mt-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon to-neon-blue">
                                {format(result, 'EEEE, dd. MMMM yyyy', { locale: dateLocale })}
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
                </div>
            )}
        </div>
    );
}
