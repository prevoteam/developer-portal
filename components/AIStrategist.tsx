import React, { useState } from 'react';
import { generateBusinessStrategy } from '../services/geminiService';
import { StrategyResponse } from '../types';
import { Loader2, Sparkles, Target, ArrowRightCircle } from 'lucide-react';

export const AIStrategist: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [challenge, setChallenge] = useState('');
  const [result, setResult] = useState<StrategyResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry || !challenge) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await generateBusinessStrategy(industry, challenge);
      setResult(data);
    } catch (err) {
      setError('System overload. Please retry the simulation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-engine" className="py-24 bg-gra-dark relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gra-highlight/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 text-gra-highlight font-mono text-sm tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Gemini 2.5</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">GRA Insight Engine</h2>
          <p className="text-gray-400">
            Deploy our AI to generate an instant adaptation roadmap for your specific challenge.
          </p>
        </div>

        <div className="glass-panel p-8 md:p-12 rounded-2xl shadow-2xl">
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Target Industry</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Fintech, Healthcare, Retail"
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white placeholder-gray-600 focus:outline-none focus:border-gra-highlight focus:ring-1 focus:ring-gra-highlight transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Core Obstacle</label>
                <input
                  type="text"
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  placeholder="e.g. High customer churn, Legacy tech"
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white placeholder-gray-600 focus:outline-none focus:border-gra-highlight focus:ring-1 focus:ring-gra-highlight transition-all"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading || !industry || !challenge}
              className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                loading || !industry || !challenge
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-gra-highlight text-white hover:shadow-lg hover:shadow-gra-highlight/20'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Computing Strategy...
                </>
              ) : (
                <>
                  Generate Roadmap <ArrowRightCircle />
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-900/20 border border-red-500/50 text-red-400 rounded-lg text-center">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-12 animate-fade-in space-y-8 border-t border-white/10 pt-8">
              <div className="text-center">
                 <h3 className="text-2xl font-bold text-white mb-2">{result.title}</h3>
                 <p className="text-gra-highlight italic">{result.summary}</p>
              </div>

              <div className="space-y-6">
                {result.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gra-highlight text-black font-bold flex items-center justify-center">
                        {index + 1}
                      </div>
                      {index < result.steps.length - 1 && (
                        <div className="w-0.5 h-full bg-white/10 my-2"></div>
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="text-sm text-gray-500 font-mono uppercase mb-1">{step.phase}</div>
                      <h4 className="text-lg font-bold text-white mb-2">{step.action}</h4>
                      <div className="flex items-start gap-2 text-gray-400 text-sm bg-white/5 p-3 rounded">
                        <Target className="w-4 h-4 mt-0.5 text-gra-highlight" />
                        <span>{step.impact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};