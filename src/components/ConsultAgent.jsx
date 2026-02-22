import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const agentsData = {
    architect: {
        name: "The Architect (Strategy)",
        icon: "📐",
        color: "blue",
        prompts: [
            {
                q: "What's your philosophy on ROAS vs. Contribution Margin?",
                a: "ROAS is a vanity metric if it's not tied to marginal profitability. I optimize for Contribution Margin (CM) because I've seen brands scale ROAS to the moon while actually losing money on variable costs. By ingesting true margin data into our bidding clusters, we ensure that every ad dollar drives actual cash to the business, not just top-line revenue."
            },
            {
                q: "How do you structure a Go-To-Market plan?",
                a: "A strong GTM isn't just an ad budget; it's an 'Engineered System'. I align supply chain capacity, unit economics, and creative sequencing before spending a dollar. We start with absolute business truth in the CRM, build predictive audience models, and wrap it in a Feed-Driven creative layer that reacts to real-time market conditions."
            }
        ]
    },
    analyst: {
        name: "The Analyst (Media Buying)",
        icon: "📊",
        color: "purple",
        prompts: [
            {
                q: "How do you handle Performance Max (PMax)?",
                a: "PMax requires strict governance, otherwise Google will spend your budget on low-value brand terms and display junk. I enforce strict negative keyword lists, use account-level brand exclusions, and feed PMax only high-intent offline conversion data (OCT) to train the algorithm on business value, not just shallow lead forms."
            },
            {
                q: "Can you explain Feed-Driven DCO?",
                a: "Instead of manually building hundreds of ad variants, I connect the ad platform directly to the client's inventory or capacity feed. If a national service firm has no capacity in a specific market, the feed automatically pauses ads for that region. It's real-time budget efficiency at scale."
            }
        ]
    },
    watchdog: {
        name: "The Watchdog (Compliance)",
        icon: "🛡️",
        color: "emerald",
        prompts: [
            {
                q: "How do you ensure brand safety in AI marketing?",
                a: "Brand safety isn't an afterthought; it's built into the system prompt of our creative engines. Before any generative copy goes live, it's run through a strict compliance checklist checking for regulatory violations (like TCPA or UDAAP in finance and legal). If a claim can't be substantiated, the system flags it for human review."
            }
        ]
    },
    artisan: {
        name: "The Artisan (Creative)",
        icon: "🎨",
        color: "amber",
        prompts: [
            {
                q: "How does AI fit into your creative process?",
                a: "I don't use AI to replace creatives; I use it to scale relevance. The Artisan agent takes the high-LTV audience segments identified by The Architect and generates hyper-personalized ad variants. It allows us to speak directly to 50 different micro-segments simultaneously, maintaining our brand voice across all of them."
            }
        ]
    }
};

const colorMap = {
    blue: {
        border: "border-blue-200 dark:border-blue-800/50",
        borderSolid: "border-blue-200 dark:border-blue-800",
        bgLight: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-700 dark:text-blue-400",
        textDefault: "text-blue-600 dark:text-blue-400",
        bgSolid: "bg-blue-500",
        bgPing: "bg-blue-400",
        hoverText: "group-hover:text-blue-500"
    },
    purple: {
        border: "border-purple-200 dark:border-purple-800/50",
        borderSolid: "border-purple-200 dark:border-purple-800",
        bgLight: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-700 dark:text-purple-400",
        textDefault: "text-purple-600 dark:text-purple-400",
        bgSolid: "bg-purple-500",
        bgPing: "bg-purple-400",
        hoverText: "group-hover:text-purple-500"
    },
    emerald: {
        border: "border-emerald-200 dark:border-emerald-800/50",
        borderSolid: "border-emerald-200 dark:border-emerald-800",
        bgLight: "bg-emerald-100 dark:bg-emerald-900/30",
        text: "text-emerald-700 dark:text-emerald-400",
        textDefault: "text-emerald-600 dark:text-emerald-400",
        bgSolid: "bg-emerald-500",
        bgPing: "bg-emerald-400",
        hoverText: "group-hover:text-emerald-500"
    },
    amber: {
        border: "border-amber-200 dark:border-amber-800/50",
        borderSolid: "border-amber-200 dark:border-amber-800",
        bgLight: "bg-amber-100 dark:bg-amber-900/30",
        text: "text-amber-700 dark:text-amber-400",
        textDefault: "text-amber-600 dark:text-amber-400",
        bgSolid: "bg-amber-500",
        bgPing: "bg-amber-400",
        hoverText: "group-hover:text-amber-500"
    }
};

const TypewriterText = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText("");
        let i = 0;
        const speed = 15; // ms per character

        const typeWriter = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(typeWriter);
                if (onComplete) onComplete();
            }
        }, speed);

        return () => clearInterval(typeWriter);
    }, [text, onComplete]);

    return <span>{displayedText}</span>;
};

export default function ConsultAgent() {
    const [activeAgentId, setActiveAgentId] = useState("architect");
    const [chatHistory, setChatHistory] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const activeAgent = agentsData[activeAgentId];
    const styles = colorMap[activeAgent.color];

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isTyping]);

    const handlePromptClick = (prompt) => {
        if (isTyping) return;

        // Add user question
        setChatHistory(prev => [...prev, { role: "user", text: prompt.q }]);
        setIsTyping(true);

        // Simulate thinking delay
        setTimeout(() => {
            setChatHistory(prev => [...prev, { role: "agent", text: prompt.a }]);
        }, 600);
    };

    const handleAgentSwitch = (id) => {
        if (isTyping) return;
        setActiveAgentId(id);
        setChatHistory([]); // Clear chat when switching agents
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900/.5 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row h-[600px]">
            {/* Sidebar: Agent Selection */}
            <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex-shrink-0 flex flex-col">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Consult The Swarm</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible">
                    {Object.entries(agentsData).map(([id, agent]) => {
                        const isActive = activeAgentId === id;
                        const agentStyles = colorMap[agent.color];
                        return (
                            <button
                                key={id}
                                onClick={() => handleAgentSwitch(id)}
                                disabled={isTyping}
                                className={`flex items-center gap-3 w-full p-3 rounded-xl min-w-[180px] md:min-w-0 text-left transition-all ${isActive
                                        ? `${agentStyles.bgLight} border ${agentStyles.border}`
                                        : "hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent"
                                    } ${isTyping ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <span className="text-2xl">{agent.icon}</span>
                                <div className="truncate">
                                    <div className={`font-semibold text-sm ${isActive ? agentStyles.text : "text-slate-700 dark:text-slate-300"}`}>
                                        {agent.name.split(" ")[1].replace(/[()]/g, '')}
                                    </div>
                                    <div className="text-xs text-slate-500 truncate">
                                        {agent.name.split(" ")[0]} {agent.name.split(" ")[1]}
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-50/50 dark:bg-slate-950/50 relative">
                {/* Header */}
                <div className={`p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-white dark:bg-slate-900`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${styles.bgLight} ${styles.textDefault} text-xl border ${styles.borderSolid}`}>
                        {activeAgent.icon}
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-900 dark:text-white">{activeAgent.name}</h2>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${styles.bgPing}`}></span>
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${styles.bgSolid}`}></span>
                            </span>
                            <span className="text-xs text-slate-500 italic">Agent online and ready for queries...</span>
                        </div>
                    </div>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                    {chatHistory.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                            <span className="text-4xl mb-4 grayscale opacity-50">{activeAgent.icon}</span>
                            <p className="text-slate-500 max-w-sm">Select a quick prompt below to interrogate {activeAgent.name.split(" ")[0]} {activeAgent.name.split(" ")[1]}.</p>
                        </div>
                    )}

                    <AnimatePresence>
                        {chatHistory.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 ${msg.role === "user"
                                    ? "bg-slate-800 text-white rounded-tr-sm"
                                    : `bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-tl-sm shadow-sm`
                                    }`}>
                                    {msg.role === "user" ? (
                                        <div className="text-sm font-medium">{msg.text}</div>
                                    ) : (
                                        <div className="text-sm leading-relaxed prose prose-sm dark:prose-invert">
                                            {/* If it is the last message and typing is active, use Typewriter */}
                                            {idx === chatHistory.length - 1 && isTyping ? (
                                                <TypewriterText text={msg.text} onComplete={() => setIsTyping(false)} />
                                            ) : (
                                                <span>{msg.text}</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Loading Indicator */}
                    {isTyping && chatHistory[chatHistory.length - 1]?.role === "user" && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="flex justify-start w-full"
                        >
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 rounded-tl-sm shadow-sm flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${styles.bgSolid} animate-bounce cursor-default`} style={{ animationDelay: "0ms" }} />
                                <div className={`w-2 h-2 rounded-full ${styles.bgSolid} animate-bounce cursor-default`} style={{ animationDelay: "150ms" }} />
                                <div className={`w-2 h-2 rounded-full ${styles.bgSolid} animate-bounce cursor-default`} style={{ animationDelay: "300ms" }} />
                            </div>
                        </motion.div>
                    )}

                    <div ref={chatEndRef} />
                </div>

                {/* Quick Prompts */}
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Suggested Queries</p>
                    <div className="flex flex-col gap-2">
                        {activeAgent.prompts.map((prompt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handlePromptClick(prompt)}
                                disabled={isTyping}
                                className={`text-left text-sm py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 font-medium flex items-center justify-between group ${isTyping ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <span className="truncate pr-4">{prompt.q}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-slate-400 ${styles.hoverText} transform group-hover:translate-x-1 transition-transform shrink-0`}>
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
