import React from 'react';
import { Home, Layers, ScrollText, User, Mail } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navItems = [
    { icon: <Home size={20} />, label: "Home", href: "#hero" },
    { icon: <Layers size={20} />, label: "Services", href: "#services" },
    { icon: <ScrollText size={20} />, label: "Methods", href: "#methodology" },
    { icon: <Mail size={20} />, label: "Contact", href: "#contact" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t-2 border-foreground z-50 pb-safe">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col items-center justify-center w-full h-full text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors"
          >
            {item.icon}
            <span className="text-[10px] font-bold mt-1 uppercase">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};