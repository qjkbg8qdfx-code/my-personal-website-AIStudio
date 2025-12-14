import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('system_auth_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (choice: 'accepted' | 'rejected') => {
    localStorage.setItem('system_auth_consent', choice);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-background border-2 border-foreground shadow-neo p-4 md:flex md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-3 mb-4 md:mb-0">
              <ShieldCheck className="text-primary shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-sm uppercase mb-1">Privacy Protocol</h4>
                <p className="text-xs text-foreground/80 max-w-prose font-mono">
                  We use cookies to quantify system performance. Zero third-party data trading. Trust is our currency.
                </p>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => handleConsent('rejected')}
                className="px-4 py-2 text-xs font-bold border-2 border-foreground hover:bg-secondary transition-colors uppercase"
              >
                Opt-out
              </button>
              <button
                onClick={() => handleConsent('accepted')}
                className="px-4 py-2 text-xs font-bold bg-foreground text-background border-2 border-foreground hover:bg-background hover:text-foreground transition-colors uppercase shadow-neo-sm hover:shadow-none hover:translate-y-0.5 active:translate-y-1"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};