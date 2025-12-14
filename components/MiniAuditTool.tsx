import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateAudit, AuditResponse } from '../services/geminiService';
import { Loader2, Terminal, ArrowRight, Zap, Target, BarChart3, CheckCircle2 } from 'lucide-react';

export const MiniAuditTool: React.FC = () => {
    const [status, setStatus] = useState<'input' | 'processing' | 'result'>('input');
    const [formData, setFormData] = useState({ industry: '', bottleneck: '' });
    const [result, setResult] = useState<AuditResponse | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.industry || !formData.bottleneck) return;

        setStatus('processing');

        const startTime = Date.now();

        try {
            const auditData = await generateAudit(formData.industry, formData.bottleneck);

            const elapsedTime = Date.now() - startTime;
            const minDuration = 2000;

            if (elapsedTime < minDuration) {
                await new Promise(resolve => setTimeout(resolve, minDuration - elapsedTime));
            }

            setResult(auditData);
            setStatus('result');
        } catch (e) {
            console.error(e);
            setStatus('input');
        }
    };

    return (
        <div className="h-full flex flex-col relative overflow-hidden bg-[#09090b] text-white p-6 selection:bg-white selection:text-black">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2 font-mono tracking-tighter">
                        <Terminal size={20} className="text-white" />
                        TRUST_ENGINE.exe
                    </h3>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-1">v2.0.4 // SYSTEM_READY</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            </div>

            <div className="flex-1 flex flex-col font-mono relative">
                <AnimatePresence mode="wait">
                    {status === 'input' && (
                        <motion.form
                            key="input"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, filter: "blur(4px)" }}
                            onSubmit={handleSubmit}
                            className="flex-1 flex flex-col justify-between"
                        >
                            <div className="space-y-6">
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-bold uppercase text-zinc-500 group-focus-within:text-white transition-colors">
                                        &gt; INPUT_SECTOR
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Fintech..."
                                        className="w-full bg-zinc-900/50 text-white placeholder:text-zinc-700 p-3 text-sm focus:outline-none focus:bg-zinc-900 transition-all border-b border-zinc-800 focus:border-white"
                                        value={formData.industry}
                                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-bold uppercase text-zinc-500 group-focus-within:text-white transition-colors">
                                        &gt; IDENTIFY_BOTTLENECK
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Data Redundancy..."
                                        className="w-full bg-zinc-900/50 text-white placeholder:text-zinc-700 p-3 text-sm focus:outline-none focus:bg-zinc-900 transition-all border-b border-zinc-800 focus:border-white"
                                        value={formData.bottleneck}
                                        onChange={(e) => setFormData({ ...formData, bottleneck: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-4 bg-white text-black font-bold py-3 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
                            >
                                <Zap size={16} className="fill-black" />
                                Initiate_Diagnostic
                            </button>
                        </motion.form>
                    )}

                    {status === 'processing' && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
                        >
                            <div className="relative">
                                <Loader2 size={48} className="animate-spin text-white opacity-20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white animate-ping rounded-full"></div>
                                </div>
                            </div>
                            <div className="space-y-1 font-mono text-xs">
                                <p className="animate-pulse text-white">&gt; ANALYZING_TOPOLOGY...</p>
                                <p className="text-zinc-600">Reading neural parameters...</p>
                            </div>
                        </motion.div>
                    )}

                    {status === 'result' && result && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex-1 flex flex-col h-full"
                        >
                            <div className="flex-1 space-y-4 overflow-y-auto pr-1 custom-scrollbar">
                                <div className="flex items-end justify-between border-b border-white/10 pb-2">
                                    <span className="text-[10px] text-zinc-500 uppercase">Efficiency_Score</span>
                                    <span className="text-4xl font-black text-white">{result.score}<span className="text-lg text-zinc-600">/100</span></span>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-[10px] text-zinc-500 uppercase flex items-center gap-1">
                                        <Target size={10} />
                                        Primary_Diagnosis
                                    </span>
                                    <p className="text-sm font-bold leading-relaxed text-zinc-300 border-l-2 border-white pl-3">
                                        "{result.analysis}"
                                    </p>
                                </div>

                                <div className="space-y-2 pt-2">
                                    <span className="text-[10px] text-zinc-500 uppercase">Optimization_Protocol</span>
                                    {result.recommendations.map((rec, i) => (
                                        <div key={i} className="flex gap-3 items-start text-xs text-zinc-400 bg-white/5 p-3 hover:bg-white/10 transition-colors">
                                            <span className="text-white font-bold shrink-0">0{i + 1}</span>
                                            <span>{rec}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="w-full bg-white text-black font-bold py-3 mt-4 hover:bg-zinc-200 transition-colors flex items-center justify-between px-4 uppercase text-xs tracking-wider"
                            >
                                <span>Download_Report.pdf</span>
                                <ArrowRight size={14} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
