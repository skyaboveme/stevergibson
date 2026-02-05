import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const agents = [
    {
        id: "watchdog",
        name: "The Watchdog",
        role: "Compliance & Brand Safety",
        icon: "🛡️",
        color: "emerald",
        systemPrompt: `ROLE: Guardianship
INSTRUCTION: Scan all outgoing ad copy for regulatory violations (TCPA, UDAAP). Verify brand tone consistency.
IF violation_detected: HALT publication and flag for human review.
ELSE: Approve for distribution.`,
        tools: ["Regex Scanner", "Sentiment Analysis API", "Legal Checklist DB"],
    },
    {
        id: "architect",
        name: "The Architect",
        role: "Strategy & Segmentation",
        icon: "📐",
        color: "blue",
        systemPrompt: `ROLE: Strategic Planning
INSTRUCTION: Analyze CRM data clusters to identify high-LTV segments. Construct lookalike modeling parameters.
OUTPUT: JSON configuration for Campaign Audience settings.`,
        tools: ["CRM Connector", "Clustering Algorithm", "Audience Builder"],
    },
    {
        id: "analyst",
        name: "The Analyst",
        role: "Performance & Bidding",
        icon: "📊",
        color: "purple",
        systemPrompt: `ROLE: Revenue Optimization
INSTRUCTION: Monitor CPQL (Cost Per Qualified Lead) in real-time.
IF current_cpql > target_cpql: Adjust bid down by 10%.
IF current_cpql < target_cpql: Scale budget by 15%.`,
        tools: ["Bid Manager API", "Real-time Analytics Stream", "Trend Forecaster"],
    },
    {
        id: "artisan",
        name: "The Artisan",
        role: "Creative Generation",
        icon: "🎨",
        color: "amber",
        systemPrompt: `ROLE: Content Synthesis
INSTRUCTION: Generate ad variants based on "The Architect's" segment data.
CONSTRAINT: Must adhere to "The Watchdog's" safety guidelines.
OUTPUT: 5 Headline/Description pairs per segment.`,
        tools: ["Generative Text Engine", "Image Composer", "A/B Test Framework"],
    },
];

export default function AgentTeam() {
    const [selectedAgent, setSelectedAgent] = useState(null);

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {agents.map((agent) => (
                    <motion.div
                        key={agent.id}
                        layoutId={`card-${agent.id}`}
                        onClick={() => setSelectedAgent(agent)}
                        className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-${agent.color}-500/50`}
                        whileHover={{ y: -5 }}
                    >
                        <div
                            className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity text-${agent.color}-500`}
                        >
                            <svg
                                className="w-24 h-24 transform rotate-12 translate-x-8 translate-y-[-2rem]"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                            </svg>
                        </div>

                        <div className={`text-4xl mb-4 bg-${agent.color}-100 dark:bg-${agent.color}-900/30 w-16 h-16 flex items-center justify-center rounded-xl`}>
                            {agent.icon}
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                            {agent.name}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">
                            {agent.role}
                        </p>

                        <div className="mt-6 flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                            Ispect Logic <span className="ml-2">→</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedAgent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedAgent(null)}>
                        <motion.div
                            layoutId={`card-${selectedAgent.id}`}
                            className="bg-white dark:bg-slate-950 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-700"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={`h-2 w-full bg-${selectedAgent.color}-500/50`} />

                            <div className="p-8">
                                <div className="flex items-start justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className={`text-4xl bg-${selectedAgent.color}-100 dark:bg-${selectedAgent.color}-900/30 p-3 rounded-xl`}>
                                            {selectedAgent.icon}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                                {selectedAgent.name}
                                            </h2>
                                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                                {selectedAgent.role}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedAgent(null)}
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 font-mono text-sm shadow-inner group">
                                        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                            <span className="ml-2 text-slate-500 text-xs">system_instruction.yaml</span>
                                        </div>
                                        <div className="text-emerald-400/90 whitespace-pre-wrap leading-relaxed">
                                            {selectedAgent.systemPrompt}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                                            Integrated Toolset
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedAgent.tools.map((tool) => (
                                                <span key={tool} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300">
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
