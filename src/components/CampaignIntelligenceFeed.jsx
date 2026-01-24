import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data Generator
const eventTypes = [
    { type: 'BID_OPT', label: 'BID ADJUSTMENT', color: 'emerald', icon: '⚡' },
    { type: 'CREATIVE_GEN', label: 'CREATIVE GEN', color: 'purple', icon: '🎨' },
    { type: 'ANOMALY_DETECT', label: 'ANOMALY DETECTED', color: 'red', icon: '🛡️' },
    { type: 'DATA_INGEST', label: 'DATA SYNC', color: 'blue', icon: '🔄' },
];

const campaigns = ['Search_Alpha_v2', 'Social_Retargeting_Q1', 'PMax_Asset_Group_B', 'Video_TopFunnel_GenZ'];
const metrics = ['ROAS', 'CPC', 'CPA', 'CTR'];

const generateEvent = () => {
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const campaign = campaigns[Math.floor(Math.random() * campaigns.length)];

    let description = '';
    if (eventType.type === 'BID_OPT') {
        const adjustment = (Math.random() * 20 - 5).toFixed(1);
        description = `Bid ${adjustment > 0 ? 'increased' : 'decreased'} by ${Math.abs(adjustment)}% on [${campaign}] based on conversion probability.`;
    } else if (eventType.type === 'CREATIVE_GEN') {
        description = `Generating 3 new headline variants for [${campaign}] using high-performing n-grams.`;
    } else if (eventType.type === 'ANOMALY_DETECT') {
        description = `Sudden CPA spike detected in [${campaign}]. Auto-throttling spend until stabilization.`;
    } else {
        description = `Ingested 450+ offline conversion signals from CRM for [${campaign}].`;
    }

    return {
        id: Date.now() + Math.random(),
        ...eventType,
        description,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
};

export default function CampaignIntelligenceFeed() {
    const [events, setEvents] = useState([]);

    // Initial Population
    useEffect(() => {
        const initialEvents = Array.from({ length: 4 }).map(generateEvent);
        setEvents(initialEvents);
    }, []);

    // Live Feed Simulation
    useEffect(() => {
        const interval = setInterval(() => {
            const newEvent = generateEvent();
            setEvents(prev => [newEvent, ...prev].slice(0, 6)); // Keep detailed history short for visual clarity
        }, 2500); // New event every 2.5s

        return () => clearInterval(interval);
    }, []);

    const getColorClasses = (color) => {
        const map = {
            emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
            purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
            red: 'text-red-500 bg-red-500/10 border-red-500/20',
            blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
        };
        return map[color] || map.blue;
    };

    return (
        <div className="w-full bg-slate-900 border-y border-slate-800 overflow-hidden relative">

            {/* Background Texture - Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">

                    {/* Header / Title Area */}
                    <div className="lg:col-span-1 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <h3 className="text-white font-bold tracking-wider text-sm uppercase">System Status</h3>
                        </div>
                        <h2 className="text-2xl font-bold text-white leading-tight">
                            Intelligence <span className="text-blue-500">Active</span>
                        </h2>
                        <p className="text-slate-400 text-sm">
                            Real-time optimization across all active client portfolios.
                        </p>
                    </div>

                    {/* Feed Area */}
                    <div className="lg:col-span-3">
                        <div className="relative h-64 overflow-hidden mask-gradient-b">
                            {/* Mask gradient for fade out effect at bottom is handled by custom CSS or inline style if easier */}
                            <div className="space-y-3">
                                <AnimatePresence initial={false}>
                                    {events.map((event) => (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                            layout
                                            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3 flex items-start gap-4"
                                        >
                                            <div className={`shrink-0 p-2 rounded border font-mono text-xs font-bold w-24 text-center ${getColorClasses(event.color)}`}>
                                                {event.label}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <p className="text-slate-200 text-sm font-medium truncate-2-lines">
                                                        {event.description.split('[').map((part, i) =>
                                                            i === 0 ? part : <><span className="text-white font-bold bg-slate-700/50 px-1 rounded mx-0.5">{part.substring(0, part.indexOf(']'))}</span>{part.substring(part.indexOf(']') + 1)}</>
                                                        )}
                                                    </p>
                                                    <span className="text-xs text-slate-500 font-mono whitespace-nowrap ml-2 opacity-50">
                                                        {event.timestamp}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Fade to transparent at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
