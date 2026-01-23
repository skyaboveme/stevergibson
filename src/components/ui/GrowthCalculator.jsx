import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function GrowthCalculator() {
    const [adSpend, setAdSpend] = useState(10000);
    const [roas, setRoas] = useState(3.0);
    const [growthRate, setGrowthRate] = useState(30);

    // Calculations
    const currentMonthlyRevenue = adSpend * roas;
    const projectedMonthlyRevenue = currentMonthlyRevenue * (1 + growthRate / 100);
    const monthlyLift = projectedMonthlyRevenue - currentMonthlyRevenue;
    const annualLift = monthlyLift * 12;

    // Format currency
    const formatMoney = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">

                    {/* Inputs */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Monthly Ad Spend
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                <input
                                    type="number"
                                    value={adSpend}
                                    onChange={(e) => setAdSpend(Number(e.target.value))}
                                    className="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white font-mono"
                                />
                            </div>
                            <input
                                type="range"
                                min="1000"
                                max="100000"
                                step="1000"
                                value={adSpend}
                                onChange={(e) => setAdSpend(Number(e.target.value))}
                                className="w-full mt-3 accent-blue-600"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Current ROAS (Return on Ad Spend)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">x</span>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={roas}
                                    onChange={(e) => setRoas(Number(e.target.value))}
                                    className="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white font-mono"
                                />
                            </div>
                            <input
                                type="range"
                                min="0.5"
                                max="10"
                                step="0.1"
                                value={roas}
                                onChange={(e) => setRoas(Number(e.target.value))}
                                className="w-full mt-3 accent-blue-600"
                            />
                        </div>
                    </div>

                    {/* Results Visual */}
                    <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">

                        {/* Background decorative blob */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>

                        <div>
                            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                                The Gibson Effect
                            </h3>
                            <div className="text-xs text-slate-400 dark:text-slate-500 mb-6">
                                Based on 30% Avg. Efficiency Gain
                            </div>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">Monthly Revenue Uplift</div>
                                <motion.div
                                    className="text-3xl font-bold text-blue-600 dark:text-blue-400"
                                    key={monthlyLift}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    +{formatMoney(monthlyLift)}
                                </motion.div>
                            </div>

                            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Annual Revenue Uplift</div>
                                <motion.div
                                    className="text-4xl font-black text-slate-900 dark:text-white"
                                    key={annualLift}
                                    initial={{ scale: 0.95 }}
                                    animate={{ scale: 1 }}
                                >
                                    +{formatMoney(annualLift)}
                                </motion.div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex gap-3 text-sm text-blue-800 dark:text-blue-200">
                    <span className="text-xl">💡</span>
                    <p>
                        <strong>Revenue Engineering:</strong> By optimizing funnel efficiency and negative match logic, we don't just spend more—we make every dollar work 30% harder.
                    </p>
                </div>

            </div>
        </div>
    );
}
