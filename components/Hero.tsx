import React from 'react';
import { ArrowRight, Cpu, Zap } from 'lucide-react';

import { useDomesticTrust } from '../hooks/useDomesticTrust';

export const Hero: React.FC = () => {
  const { country } = useDomesticTrust();

  return (
    <div className="flex flex-col justify-center h-full gap-6">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 border-2 border-foreground px-3 py-1 rounded-full text-xs font-bold bg-secondary w-fit">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          AVAILABLE FOR Q4 2025
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[0.95] tracking-tighter">
          SCALING {country ? `${country.toUpperCase()} ` : ''}SME EFFICIENCY THROUGH <span className="bg-foreground text-background px-2">AI SYSTEMS</span>
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 font-medium max-w-prose leading-relaxed">
          We replace manual operational overhead with autonomous neuro-symbolic frameworks. Automate 80% of your workflow in 30 days.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <a
          href="#contact"
          className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-6 border-2 border-foreground shadow-neo hover:translate-y-0.5 hover:shadow-none transition-all active:translate-y-1"
        >
          <Zap size={20} />
          DEPLOY SYSTEMS
        </a>
        <a
          href="#methodology"
          className="flex items-center justify-center gap-2 bg-background text-foreground font-bold py-3 px-6 border-2 border-foreground shadow-neo hover:translate-y-0.5 hover:shadow-none transition-all active:translate-y-1"
        >
          <Cpu size={20} />
          VIEW ARCHITECTURE
        </a>
      </div>
    </div>
  );
};