import React from 'react';
import { BentoItemProps } from '../types';

export const BentoGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-4 p-4 max-w-7xl mx-auto pb-24 md:pb-4">
      {children}
    </div>
  );
};

export const BentoItem: React.FC<BentoItemProps> = ({ 
  children, 
  className = "", 
  title, 
  colSpan = 1, 
  rowSpan = 1 
}) => {
  // Map props to Tailwind grid classes
  const colSpanClass = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
  }[colSpan];

  const rowSpanClass = {
    1: "md:row-span-1",
    2: "md:row-span-2",
    3: "md:row-span-3",
  }[rowSpan];

  return (
    <div className={`
      relative group overflow-hidden
      bg-background border-2 border-foreground 
      shadow-neo transition-transform duration-300 hover:-translate-y-1 hover:shadow-neo-sm
      flex flex-col
      ${colSpanClass} ${rowSpanClass} ${className}
    `}>
      {title && (
        <div className="absolute top-0 left-0 bg-foreground text-background px-3 py-1 text-xs font-bold font-mono tracking-wider z-10">
          {title.toUpperCase()}
        </div>
      )}
      <div className="flex-1 flex flex-col p-6 h-full">
        {children}
      </div>
    </div>
  );
};