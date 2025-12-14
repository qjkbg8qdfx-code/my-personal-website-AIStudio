import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', efficiency: 40, cost: 80 },
  { name: 'Feb', efficiency: 45, cost: 75 },
  { name: 'Mar', efficiency: 55, cost: 70 },
  { name: 'Apr', efficiency: 70, cost: 55 },
  { name: 'May', efficiency: 85, cost: 40 },
  { name: 'Jun', efficiency: 95, cost: 25 },
];

export const VisualEvidence: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-2xl font-bold">IMPACT VELOCITY</h3>
        <p className="text-sm text-foreground/70 font-mono">Real-time optimization metrics</p>
      </div>
      <div className="flex-1 w-full min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} stroke="currentColor" />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--background)', 
                borderColor: 'var(--foreground)', 
                borderWidth: '2px',
                borderRadius: '0px',
                boxShadow: '4px 4px 0px 0px var(--shadow-color)',
                fontFamily: 'monospace'
              }}
              itemStyle={{ color: 'var(--foreground)' }}
            />
            <Area type="monotone" dataKey="efficiency" stroke="var(--primary)" strokeWidth={3} fill="var(--primary)" fillOpacity={0.2} />
            <Area type="monotone" dataKey="cost" stroke="var(--accent)" strokeWidth={3} fill="var(--accent)" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between text-xs font-mono mt-2">
        <div className="flex items-center gap-2">
           <span className="w-3 h-3 bg-primary/20 border border-primary"></span>
           EFFICIENCY
        </div>
        <div className="flex items-center gap-2">
           <span className="w-3 h-3 bg-accent/20 border border-accent"></span>
           COST
        </div>
      </div>
    </div>
  );
};