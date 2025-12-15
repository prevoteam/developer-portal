import React from 'react';
import { Cpu, Globe, Shield, BarChart3, Cloud, UserCheck } from 'lucide-react';

const features = [
  {
    icon: <Cpu className="w-8 h-8 text-gra-highlight" />,
    title: "Adaptive Algorithms",
    description: "Self-correcting strategic models that evolve with market conditions in real-time."
  },
  {
    icon: <Globe className="w-8 h-8 text-blue-500" />,
    title: "Global Scalability",
    description: "Infrastructure designed to expand instantly across borders without latency."
  },
  {
    icon: <Shield className="w-8 h-8 text-indigo-500" />,
    title: "Fortified Security",
    description: "Enterprise-grade protection utilizing predictive threat neutralization."
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-cyan-500" />,
    title: "Data Alchemy",
    description: "Transform raw data lakes into actionable crystal-clear insights."
  },
  {
    icon: <Cloud className="w-8 h-8 text-purple-500" />,
    title: "Cloud Sovereignty",
    description: "Hybrid cloud architectures that ensure you own your digital destiny."
  },
  {
    icon: <UserCheck className="w-8 h-8 text-pink-500" />,
    title: "Human-Centric Design",
    description: "Technology that amplifies human potential rather than replacing it."
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-gra-card relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Core Capabilities</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our suite of dynamic tools allows your business to reshape itself around opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-xl bg-white/5 border border-white/5 hover:border-gra-highlight/50 transition-colors group">
              <div className="mb-6 bg-black/40 w-16 h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gra-highlight transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};