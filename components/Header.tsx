import React from 'react';
import { Terminal, Mail } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b-2 border-foreground">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-foreground text-background">
            <Terminal size={20} strokeWidth={3} />
          </div>
          <span className="font-bold text-lg tracking-tight">SYSTEM_AUTH</span>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a href="#contact" className="hidden md:flex items-center gap-2 font-bold hover:underline decoration-2 underline-offset-4">
            <Mail size={18} />
            <span>CONTACT</span>
          </a>
        </div>
      </div>
    </header>
  );
};