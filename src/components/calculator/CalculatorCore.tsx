'use client';

import { useState, Suspense, useEffect } from 'react';
import { DateDifference } from './modes/DateDifference';
import { AddSubtractTime } from './modes/AddSubtractTime';
import { BusinessDays } from './modes/BusinessDays';
import { AgeCalculator } from './modes/AgeCalculator';
import { useRecentCalculations } from '@/hooks/useRecentCalculations';

type Mode = 'difference' | 'add_subtract' | 'business_days' | 'age';

interface CalculatorCoreProps {
    initialMode?: Mode;
}

import { useTranslations } from 'next-intl';

export function CalculatorCore({ initialMode = 'difference' }: CalculatorCoreProps) {
    const t = useTranslations('Modes');
    const [activeMode, setActiveMode] = useState<Mode>(initialMode);

    const tabs: { id: Mode; label: string }[] = [
        { id: 'difference', label: t('dateDifference') },
        { id: 'add_subtract', label: t('addSubtract') },
        { id: 'business_days', label: t('businessDays') },
        { id: 'age', label: t('ageCalculator') },
    ];

    return (
        <div className="w-full">
            {/* Tabs Menu */}
            <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-black/50 rounded-2xl border border-white/5">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveMode(tab.id)}
                        className={`flex-1 min-w-[120px] px-4 py-3 text-[15px] font-medium rounded-xl transition-all ${activeMode === tab.id
                            ? 'bg-gradient-to-r from-[#ff0055] to-[#00d2ff] text-white shadow-[0_0_15px_rgba(255,0,85,0.3)]'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Calculator Body */}
            <div className="min-h-[300px]">
                <Suspense fallback={<div className="animate-pulse h-64 bg-white/5 rounded-2xl"></div>}>
                    {activeMode === 'difference' && <DateDifference />}
                    {activeMode === 'add_subtract' && <AddSubtractTime />}
                    {activeMode === 'business_days' && <BusinessDays />}
                    {activeMode === 'age' && <AgeCalculator />}
                </Suspense>
            </div>

            {/* Recent Calculations */}
            <RecentCalculationsBlock />
        </div>
    );
}

function RecentCalculationsBlock() {
    const t = useTranslations('SmartInput');
    const { history, clearHistory, removeCalculation } = useRecentCalculations();
    // avoid hydration mismatch by not rendering server side
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || history.length === 0) return null;

    return (
        <div className="mt-12 pt-8 border-t border-white/10 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">{t('history') || 'Recent Calculations'}</h3>
                <button onClick={clearHistory} className="text-sm text-white/40 hover:text-white transition-colors">{t('clearHistory') || 'Clear History'}</button>
            </div>
            <div className="space-y-3">
                {history.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                        <div>
                            <p className="text-sm font-medium text-white/60 mb-1">{item.title}</p>
                            <p className="text-lg font-bold text-white">{item.result}</p>
                        </div>
                        <button onClick={() => removeCalculation(item.id)} className="text-white/30 hover:text-white transition-colors px-3 py-1 text-2xl">&times;</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
