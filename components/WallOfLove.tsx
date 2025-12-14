import React from 'react';
import { Quote } from 'lucide-react';
import { Testimonial } from '../types';

export const WallOfLove: React.FC = () => {
  const reviews: Testimonial[] = [
    { id: '1', author: 'Sarah J.', role: 'CTO', company: 'FinTech scaleup', text: "Reduced our operational latency by 60% within 2 weeks. The systems are bulletproof." },
    { id: '2', author: 'Marcus R.', role: 'Founder', company: 'Logistics Co', text: "Not just automation, but intelligent reasoning. It feels like hiring 10 senior ops managers." },
  ];

  return (
    <div className="h-full flex flex-col">
       <div className="flex items-center gap-2 mb-4">
          <Quote className="text-accent fill-accent" size={24} />
          <h3 className="text-lg font-bold">TRUST SIGNALS</h3>
       </div>
       <div className="flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar">
          {reviews.map((r) => (
             <div key={r.id} className="bg-secondary p-4 border-l-4 border-foreground">
                <p className="text-sm italic mb-2">"{r.text}"</p>
                <div className="text-xs font-bold">
                   {r.author} // <span className="text-foreground/70">{r.role} @ {r.company}</span>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};