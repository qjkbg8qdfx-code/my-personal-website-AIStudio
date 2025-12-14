import React from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { BentoGrid, BentoItem } from './components/BentoGrid';
import { Hero } from './components/Hero';
import { VisualEvidence } from './components/VisualEvidence';
import { Methodology } from './components/Methodology';
import { ProgressiveForm } from './components/ProgressiveForm';
import { WallOfLove } from './components/WallOfLove';
import JsonLd from './components/JsonLd';
import { MoveRight, Globe, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-accent selection:text-black">
      <JsonLd />
      <Header />
      
      <main className="pt-6 pb-20 md:pb-12 px-2 md:px-6">
        <BentoGrid>
          {/* Hero Section - Takes 2x2 space on desktop */}
          <BentoItem colSpan={2} rowSpan={2} title="Mission Control">
            <Hero />
          </BentoItem>

          {/* Visual Evidence - Trust Shortcut */}
          <BentoItem colSpan={2} rowSpan={1} title="Live Metrics" className="min-h-[250px]">
            <VisualEvidence />
          </BentoItem>

          {/* Methodology - For AI Agents & Humans */}
          <BentoItem colSpan={1} rowSpan={2} title="Methodology">
            <Methodology />
          </BentoItem>

          {/* Social Proof */}
          <BentoItem colSpan={1} rowSpan={1} title="Testimonials">
            <WallOfLove />
          </BentoItem>

          {/* KPI/Stat Block - Small trust signal */}
          <BentoItem colSpan={1} rowSpan={1} className="bg-primary text-white border-primary" title="Scale">
             <div className="flex flex-col items-center justify-center h-full text-center">
                <Globe size={32} className="mb-2 opacity-80" />
                <span className="text-4xl font-extrabold">50+</span>
                <span className="text-xs font-mono uppercase tracking-widest opacity-80">Systems Deployed</span>
             </div>
          </BentoItem>

          {/* Conversion Form - Sticky or Prominent */}
          <BentoItem colSpan={1} rowSpan={2} title="Deploy" className="border-primary md:col-start-4 md:row-start-1">
            <ProgressiveForm />
          </BentoItem>
          
          {/* Services Quick View */}
          <BentoItem colSpan={2} rowSpan={1} title="Capabilities">
            <div className="grid grid-cols-2 gap-4 h-full" id="services">
                <div className="flex flex-col justify-center gap-1 border-r-2 border-foreground/10 pr-4">
                    <ShieldCheck className="text-primary mb-1" size={24} />
                    <h4 className="font-bold">Security First</h4>
                    <p className="text-xs text-foreground/70">Enterprise-grade encryption on all automated workflows.</p>
                </div>
                <div className="flex flex-col justify-center gap-1">
                    <MoveRight className="text-accent mb-1" size={24} />
                    <h4 className="font-bold">Rapid Integration</h4>
                    <p className="text-xs text-foreground/70">Plug-and-play architecture for existing tech stacks.</p>
                </div>
            </div>
          </BentoItem>

        </BentoGrid>
      </main>

      <BottomNav />
      
      <footer className="hidden md:block py-12 text-center text-sm font-mono text-foreground/50">
        <p>&copy; 2025 SYSTEMATIC AUTHORITY. ALL RIGHTS RESERVED.</p>
        <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-foreground transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-foreground transition-colors">TERMS</a>
            <a href="#" className="hover:text-foreground transition-colors">SITEMAP</a>
        </div>
      </footer>
    </div>
  );
};

export default App;