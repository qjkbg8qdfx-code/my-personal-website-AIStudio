import React, { useState } from 'react';
import { ArrowRight, Loader2, Check, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProgressiveForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'error'>('idle');
  const [formData, setFormData] = useState({ email: '', name: '', details: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    
    if (step === 1) {
      if (formData.email) setStep(2);
    } else {
      setLoading(true);
      
      try {
        const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setCompleted(true);
        } else {
          throw new Error("Transmission Protocol Failed");
        }
      } catch (error) {
        setStatus('error');
      } finally {
        setLoading(false);
      }
    }
  };

  if (completed) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-secondary/50">
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4 border-2 border-foreground shadow-neo">
          <Check className="text-white" size={24} strokeWidth={3} />
        </div>
        <h3 className="text-xl font-bold">SYSTEM INITIATED</h3>
        <p className="text-sm mt-2">Audit scheduled. Check your inbox: {formData.email}</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between" id="contact">
      <div>
        <h3 className="text-2xl font-bold mb-1">INITIATE AUDIT</h3>
        <p className="text-sm text-foreground/70 mb-6">Progressive profiling active.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AnimatePresence mode="wait">
            {step === 1 ? (
                <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-2"
                >
                    <label className="text-xs font-bold uppercase ml-1">Work Email</label>
                    <input 
                        type="email" 
                        required
                        placeholder="you@company.com"
                        className="w-full bg-background border-2 border-foreground p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </motion.div>
            ) : (
                <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                >
                     <div className="space-y-1">
                        <label className="text-xs font-bold uppercase ml-1">Full Name</label>
                        <input 
                            type="text" 
                            required
                            placeholder="Alex System"
                            className="w-full bg-background border-2 border-foreground p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold uppercase ml-1">Workflow Bottleneck</label>
                        <textarea 
                            rows={2}
                            placeholder="Describe your manual process..."
                            className="w-full bg-background border-2 border-foreground p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            value={formData.details}
                            onChange={(e) => setFormData({...formData, details: e.target.value})}
                        />
                     </div>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="flex flex-col gap-2">
            <button 
                type="submit" 
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-foreground text-background font-bold py-3 mt-2 border-2 border-transparent hover:bg-background hover:text-foreground hover:border-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
            >
                {loading ? <Loader2 className="animate-spin" /> : (
                    <>
                        {step === 1 ? 'CONTINUE' : 'DEPLOY REQUEST'}
                        <ArrowRight size={18} />
                    </>
                )}
            </button>
            
            {status === 'error' && (
                <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-xs text-red-500 font-bold bg-red-50 p-2 border border-red-200"
                >
                    <AlertTriangle size={14} />
                    <span>TRANSMISSION FAILED. VERIFY CONNECTION.</span>
                </motion.div>
            )}
        </div>
      </form>
    </div>
  );
};