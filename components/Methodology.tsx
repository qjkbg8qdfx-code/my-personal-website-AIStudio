import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const Methodology: React.FC = () => {
  const steps = [
    {
      title: "Audit & Decomposition",
      desc: "We deconstruct your current workflow into atomic units of operation."
    },
    {
      title: "Neuro-Symbolic Integration",
      desc: "Hybrid AI architecture combining LLM reasoning with deterministic code execution."
    },
    {
      title: "Autonomous Deployment",
      desc: "Self-healing agent swarms that monitor and optimize without human intervention."
    }
  ];

  return (
    <div className="flex flex-col h-full justify-between" id="methodology">
      <div>
        <h3 className="text-xl font-bold mb-4 border-b-2 border-foreground pb-2">CORE PROTOCOL</h3>
        <ul className="space-y-4">
          {steps.map((step, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <CheckCircle2 className="shrink-0 text-primary mt-0.5" size={20} />
              <div>
                <strong className="block text-sm font-bold uppercase">{step.title}</strong>
                <span className="text-sm text-foreground/80 leading-tight">{step.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};