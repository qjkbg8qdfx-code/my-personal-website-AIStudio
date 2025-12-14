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
        <div className="h-full flex flex-col relative overflow-hidden bg-background">
            {/* Header */}
            <div className="mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Terminal size={20} className="text-primary" />
                    TRUST ENGINE
                </h3>
                <p className="text-xs text-foreground/60 font-mono">AI-POWERED MATURITY AUDIT</p>
            </div>

            <div className="flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                    {status === 'input' && (
                        <motion.form
                            key="input"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleSubmit}
                            className="flex-1 flex flex-col justify-between gap-4"
                        >
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase ml-1">Industry Sector</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Fintech, SaaS, Logistics"
                                        className="w-full bg-background border-2 border-foreground/20 focus:border-primary p-2 font-mono text-sm focus:outline-none transition-all"
                                        value={formData.industry}
                                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase ml-1">Biggest Bottleneck</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Manual Data Entry, Lead Qual"
                                        className="w-full bg-background border-2 border-foreground/20 focus:border-primary p-2 font-mono text-sm focus:outline-none transition-all"
                                        value={formData.bottleneck}
                                        onChange={(e) => setFormData({ ...formData, bottleneck: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-foreground text-background font-bold py-3 border-2 border-transparent hover:bg-background hover:text-foreground hover:border-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                RUN DIAGNOSTIC
                                <Zap size={18} fill="currentColor" />
                            </button>
                        </motion.form>
                    )}

                    {status === 'processing' && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 flex flex-col items-center justify-center text-center space-y-4"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
                                <Loader2 size={48} className="animate-spin text-primary relative z-10" />
                            </div>
                            <div className="space-y-1 font-mono text-sm">
                                <p className="animate-pulse">ANALYZING WORKFLOW TOPOLOGY...</p>
                                <p className="text-xs text-foreground/50">Querying Neural Knowledge Base</p>
                            </div>
                        </motion.div>
                    )}

                    {status === 'result' && result && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex-1 flex flex-col h-full"
                        >
                            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                                <div className="flex items-center justify-between border-b-2 border-foreground/10 pb-2">
                                    <span className="text-xs font-bold uppercase text-foreground/60">Maturity Score</span>
                                    <div className="flex items-center gap-2">
                                        <BarChart3 size={16} className="text-primary" />
                                        <span className="text-2xl font-black">{result.score}/100</span>
                                    </div>
                                </div>

                                <div className="bg-secondary/30 p-3 border-l-4 border-primary">
                                    <span className="text-xs font-bold uppercase text-primary flex items-center gap-1 mb-1">
                                        <Target size={12} />
                                        DIAGNOSIS
                                    </span>
                                    <p className="text-xs font-bold leading-snug">
                                        {result.analysis}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-[10px] font-bold uppercase text-foreground/50">Tactical Implementations</span>
                                    {result.recommendations.map((rec, i) => (
                                        <div key={i} className="flex gap-2 items-start text-xs border border-foreground/10 p-2 bg-background">
                                            <CheckCircle2 size={12} className="text-accent mt-0.5 shrink-0" />
                                            <span>{rec}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-3">
                                <button className="w-full group bg-primary text-white font-bold py-2.5 px-4 flex items-center justify-between border-2 border-primary hover:bg-transparent hover:text-primary transition-colors text-sm">
                                    <span>GET FULL ROADMAP</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
