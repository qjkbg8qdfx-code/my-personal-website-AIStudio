import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const initialData = [
  { name: 'Jan', efficiency: 40, cost: 80 },
  { name: 'Feb', efficiency: 45, cost: 75 },
  { name: 'Mar', efficiency: 55, cost: 70 },
  { name: 'Apr', efficiency: 70, cost: 55 },
  { name: 'May', efficiency: 85, cost: 40 },
  { name: 'Jun', efficiency: 95, cost: 25 },
];

export const VisualEvidence: React.FC = () => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(currentData =>
        currentData.map(item => ({
          ...item,
          // Wiggle efficiency significantly but keep trend high for later months
          efficiency: Math.min(99, Math.max(30, item.efficiency + (Math.random() * 10 - 4))),
          cost: Math.min(90, Math.max(10, item.cost + (Math.random() * 8 - 4)))
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Live Status Indicator */}
      <div className="absolute top-0 right-0 flex items-center gap-1.5 px-2 py-1 bg-background/80 border border-foreground/20 text-[10px] font-mono font-bold z-10 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        SYSTEM OPTIMAL
      </div>

      <div className="mb-4 pr-16">
        <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          SYSTEM UPTIME: 99.9%
          <Activity size={18} className="text-primary animate-pulse" />
        </h3>
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
            {/* isAnimationActive={true} is default */}
            <Area
              type="monotone"
              dataKey="efficiency"
              stroke="var(--primary)"
              strokeWidth={3}
              fill="var(--primary)"
              fillOpacity={0.2}
              animationDuration={1000}
            />
            <Area
              type="monotone"
              dataKey="cost"
              stroke="var(--accent)"
              strokeWidth={3}
              fill="var(--accent)"
              fillOpacity={0.2}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between text-xs font-mono mt-2 border-t border-foreground/10 pt-2">
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