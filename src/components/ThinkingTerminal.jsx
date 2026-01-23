import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const logs = [
    { text: "Initializing Neural Interface...", type: "system" },
    { text: "Connecting to CRM Data Source...", type: "info" },
    { text: "Ingesting 40,000+ Lead Records...", type: "process" },
    { text: "Analyzing Behavioral Signals...", type: "process" },
    { text: "Pattern Detected: High Intent Cluster", type: "success" },
    { text: "Optimizing Bid Strategy...", type: "info" },
    { text: "Deploying Dynamic Creative Assets...", type: "info" },
    { text: "Conversion Loop Active.", type: "success" },
    { text: "Monitoring Real-Time ROAS...", type: "system" },
];

export default function ThinkingTerminal() {
    const [lines, setLines] = useState([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (currentLineIndex < logs.length) {
            const timeout = setTimeout(() => {
                setLines((prev) => [...prev, logs[currentLineIndex]]);
                setCurrentLineIndex((prev) => prev + 1);
            }, Math.random() * 800 + 400); // Random delay between 400ms and 1200ms

            return () => clearTimeout(timeout);
        } else {
            // Reset loop after a pause
            const resetTimeout = setTimeout(() => {
                setLines([]);
                setCurrentLineIndex(0);
            }, 5000);
            return () => clearTimeout(resetTimeout);
        }
    }, [currentLineIndex]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <div className="font-mono text-xs md:text-sm bg-slate-950/80 backdrop-blur-md rounded-lg border border-slate-800 p-4 h-64 overflow-hidden flex flex-col shadow-2xl w-full max-w-lg mx-auto">
            <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <span className="text-slate-500 ml-2">ai_agent.py</span>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
                <AnimatePresence>
                    {lines.map((log, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`${getColor(log.type)}`}
                        >
                            <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric" })}]</span>
                            <TypingEffect text={log.text} />
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div className="h-4 w-2 bg-slate-500 animate-pulse mt-1"></div>
            </div>
        </div>
    );
}

function TypingEffect({ text }) {
    return <span>{text}</span>;
}

function getColor(type) {
    switch (type) {
        case "error": return "text-red-400";
        case "success": return "text-emerald-400";
        case "info": return "text-blue-400";
        case "process": return "text-amber-400";
        default: return "text-slate-300";
    }
}
