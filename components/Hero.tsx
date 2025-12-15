import React from 'react';
import { ArrowRight, Activity, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-gra-highlight/20 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gra-highlight text-xs font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-gra-highlight animate-pulse"></span>
            System Online
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Adapt or Perish. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gra-highlight to-blue-500">
              GRA API Connect.
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-xl leading-relaxed border-l-2 border-gra-highlight/30 pl-6">
            We architect resilience. Our adaptive intelligence systems empower organizations to thrive amidst chaos, transforming volatility into vector growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#ai-engine" className="flex items-center justify-center gap-2 px-8 py-4 bg-gra-highlight hover:bg-cyan-400 text-gra-dark font-bold rounded transition-all transform hover:scale-105">
              Launch Intelligence <Zap className="w-4 h-4" />
            </a>
            <a href="#features" className="flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded hover:bg-white/5 transition-colors">
              Explore Services
            </a>
          </div>
        </div>

        <div className="relative hidden md:block animate-fade-in">
          <div className="relative z-10 glass-panel rounded-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
             <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-500 font-mono">STATUS: OPTIMAL</div>
             </div>
             <div className="space-y-4">
                <div className="h-32 rounded bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center border border-white/5">
                    <Activity className="w-16 h-16 text-gra-highlight/50" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="h-20 rounded bg-white/5 border border-white/5 p-4">
                        <div className="text-2xl font-bold text-white">98%</div>
                        <div className="text-xs text-gray-500 uppercase mt-1">Efficiency</div>
                    </div>
                    <div className="h-20 rounded bg-white/5 border border-white/5 p-4">
                        <div className="text-2xl font-bold text-white">+24x</div>
                        <div className="text-xs text-gray-500 uppercase mt-1">Scale</div>
                    </div>
                    <div className="h-20 rounded bg-white/5 border border-white/5 p-4">
                        <div className="text-2xl font-bold text-white">0.4s</div>
                        <div className="text-xs text-gray-500 uppercase mt-1">Latency</div>
                    </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Predictive Analysis</span>
                        <span className="text-green-400">Active</span>
                    </div>
                </div>
             </div>
          </div>
          {/* Decorative grid behind */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
        </div>
      </div>
    </section>
  );
};