import React from 'react';
import { Quote, BadgeCheck } from 'lucide-react'; // Import BadgeCheck
import { Testimonial } from '../types';

export const WallOfLove: React.FC = () => {
  const reviews: Testimonial[] = [
    { id: '1', author: 'Sarah J.', role: 'CTO', company: 'FinTech scaleup', text: "Reduced our operational latency by 60% within 2 weeks. The systems are bulletproof." },
    { id: '2', author: 'Marcus R.', role: 'Founder', company: 'Logistics Co', text: "Not just automation, but intelligent reasoning. It feels like hiring 10 senior ops managers." },
  ];

  return (
    <div className="h-full flex flex-col">
       <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Quote className="text-accent fill-accent" size={24} />
            <h3 className="text-lg font-bold">TRUST SIGNAL</h3>
          </div>
          {/* Social Proof Aggregate */}
          <div className="text-[10px] font-mono opacity-60 border-b border-foreground">
            100% VERIFIED CLIENTS
          </div>
       </div>
       
       <div className="flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar">
          {reviews.map((r) => (
             <div key={r.id} className="bg-secondary p-4 border-l-4 border-foreground group hover:bg-background transition-colors relative">
                {/* Verification Badge */}
                <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-100 transition-opacity">
                    <BadgeCheck size={16} className="text-primary" />
                </div>
                
                <p className="text-sm italic mb-2 leading-relaxed">"{r.text}"</p>
                <div className="flex flex-col">
                   <span className="text-xs font-bold uppercase">{r.author}</span>
                   <span className="text-[10px] text-foreground/70 font-mono">{r.role} @ {r.company}</span>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};