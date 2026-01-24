import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function AudienceSimulator() {
    const [leadScore, setLeadScore] = useState(65);
    const [intentSignal, setIntentSignal] = useState('medium'); // low, medium, high
    const [crmStatus, setCrmStatus] = useState('new'); // new, contacted, qualified, closed

    const [decision, setDecision] = useState({ action: 'OBSERVE', color: 'amber', description: 'Gathering data...' });

    useEffect(() => {
        // Algorithmic Logic
        if (crmStatus === 'closed') {
            setDecision({
                action: 'MAX BID',
                color: 'emerald',
                description: 'Confirmed Revenue: Maximize Impression Share.'
            });
        } else if (crmStatus === 'qualified') {
            setDecision({
                action: 'BID UP (+50%)',
                color: 'emerald',
                description: 'High Value Prospect: Increase aggressive bidding.'
            });
        } else if (leadScore > 80 && intentSignal !== 'low') {
            setDecision({
                action: 'BID UP (+20%)',
                color: 'blue',
                description: 'Strong Signals: Enter auction with priority.'
            });
        } else if (leadScore < 30 || intentSignal === 'low') {
            setDecision({
                action: 'SUPPRESS',
                color: 'red',
                description: 'Low Quality: Exclude from auction to save budget.'
            });
        } else {
            setDecision({
                action: 'OBSERVE',
                color: 'slate',
                description: 'Insufficient Data: Maintain base bid and monitor.'
            });
        }
    }, [leadScore, intentSignal, crmStatus]);

    const getColorClasses = (color) => {
        const map = {
            emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
            blue: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
            red: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
            amber: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
            slate: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
        };
        return map[color] || map.slate;
    };

    return (
        <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
            {/* Header */}
            <div className="bg-slate-100 dark:bg-slate-950 px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Algorithm Simulator v1.0</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono hidden sm:block">ID: LEAD_{Math.floor(Math.random() * 9000) + 1000}</div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Controls (Input) */}
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Lead Score (CRM)</label>
                            <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{leadScore}/100</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={leadScore}
                            onChange={(e) => setLeadScore(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Intent Signal (Browse Behavior)</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['low', 'medium', 'high'].map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setIntentSignal(level)}
                                    className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wide transition-all border ${intentSignal === level
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-md transform scale-105'
                                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Lifecycle Stage (Salesforce)</label>
                        <select
                            value={crmStatus}
                            onChange={(e) => setCrmStatus(e.target.value)}
                            className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="new">New Lead</option>
                            <option value="contacted">Attempting Contact</option>
                            <option value="qualified">Qualified Opportunity</option>
                            <option value="closed">Closed / Won</option>
                        </select>
                    </div>
                </div>

                {/* Output (Decision Engine) */}
                <div className="flex flex-col justify-center">
                    <div className="relative">
                        {/* Connecting Line Visual */}
                        <div className="absolute top-1/2 left-0 -ml-6 w-6 h-0.5 border-t-2 border-dashed border-slate-300 dark:border-slate-700 hidden lg:block"></div>

                        <div className="bg-white dark:bg-slate-950 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">Algorithm Output</span>

                            <motion.div
                                key={decision.action}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`inline-block px-5 py-2 rounded-lg border-2 font-mono font-bold text-lg mb-3 ${getColorClasses(decision.color)}`}
                            >
                                {decision.action}
                            </motion.div>

                            <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                                "{decision.description}"
                            </p>
                        </div>

                        {/* Data Payload Visual */}
                        <div className="mt-4 bg-slate-100 dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-800 font-mono text-[10px] text-slate-500 overflow-x-auto whitespace-nowrap">
                            <span className="text-blue-500">POST</span> /api/bidding/adjust <br />
                            {`{ "u_id": "xyz", "score": ${leadScore}, "signal": "${intentSignal}", "action": "${decision.action}" }`}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
