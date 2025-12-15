import React, { useState } from 'react';
import { Terminal, Play, CheckCircle, Code, ChevronRight, Loader2, Server, Globe, Shield, FileJson } from 'lucide-react';

interface Endpoint {
  id: number;
  method: string;
  path: string;
  label: string;
  description: string;
  defaultBody: string;
}

const endpoints: Endpoint[] = [
  { 
    id: 0,
    method: 'POST', 
    path: '/v1/transactions/report', 
    label: 'Report Transaction',
    description: 'Submit a single real-time transaction for fraud analysis and reporting.',
    defaultBody: JSON.stringify({
      amount: 150.00,
      currency: "USD",
      merchant_id: "mer_88329",
      timestamp: "2024-03-15T10:30:00Z"
    }, null, 2)
  },
  { 
    id: 1,
    method: 'POST', 
    path: '/v1/merchants/{id}/compliance', 
    label: 'Check Compliance',
    description: 'Validate a merchant ID against global sanction lists and regulatory standards.',
    defaultBody: JSON.stringify({
      region: "EU",
      check_type: "kyb_enhanced",
      include_adverse_media: true
    }, null, 2)
  },
  { 
    id: 2,
    method: 'POST', 
    path: '/v1/transactions/report', 
    label: 'Batch Report',
    description: 'High-throughput endpoint for submitting batched transaction logs (up to 500 records).',
    defaultBody: JSON.stringify({
      batch_id: "batch_9921",
      transactions: [
        { id: "txn_1", amount: 50 },
        { id: "txn_2", amount: 120 }
      ]
    }, null, 2)
  },
  { 
    id: 3,
    method: 'POST', 
    path: '/v1/tax-rates', 
    label: 'Get Tax Rates',
    description: 'Retrieve applicable tax vectors based on origin and destination jurisdictions.',
    defaultBody: JSON.stringify({
      origin_country: "US",
      dest_country: "DE",
      product_category: "digital_service"
    }, null, 2)
  }
];

const mockResponses: Record<number, object> = {
  0: { status: "success", risk_score: 0.05, recommendation: "approve", trace_id: "req_7721a" },
  1: { status: "verified", compliance_level: "Tier 1", flags: [], last_audit: "2024-02-01" },
  2: { status: "queued", batch_status: "processing", items_received: 2, est_completion: "400ms" },
  3: { country: "DE", vat_rate: 0.19, reduced_rate: false, currency: "EUR" }
};

export const ApiEndpoints: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [requestBody, setRequestBody] = useState(endpoints[0].defaultBody);

  const activeEndpoint = endpoints.find(e => e.id === selectedId) || endpoints[0];

  const handleSelect = (endpoint: Endpoint) => {
    setSelectedId(endpoint.id);
    setRequestBody(endpoint.defaultBody);
    setResponse(null);
  };

  const handleTest = () => {
    setLoading(true);
    setResponse(null);
    // Simulate network delay
    setTimeout(() => {
      setResponse(JSON.stringify(mockResponses[activeEndpoint.id], null, 2));
      setLoading(false);
    }, 800);
  };

  return (
    <section className="min-h-screen pt-32 pb-20 bg-[#050508] relative overflow-hidden flex flex-col">
      {/* Background Decor */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-blue-900/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full flex-grow flex flex-col">
        <div className="flex items-center gap-3 mb-10 animate-fade-in">
          <Terminal className="w-8 h-8 text-gra-highlight" />
          <h2 className="text-3xl font-bold text-white">API Developer Console</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:h-[650px] animate-slide-up">
          
          {/* Sidebar: API List */}
          <div className="lg:col-span-4 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar bg-[#0a0a0f] rounded-xl border border-white/5 p-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 pl-2">Available Endpoints</h3>
            {endpoints.map((api) => (
              <button
                key={api.id}
                onClick={() => handleSelect(api)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 group relative overflow-hidden ${
                  selectedId === api.id
                    ? 'bg-white/10 border-gra-highlight shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    selectedId === api.id ? 'bg-gra-highlight text-black' : 'bg-white/10 text-gray-400'
                  }`}>
                    {api.method}
                  </span>
                  {selectedId === api.id && <ChevronRight className="w-4 h-4 text-gra-highlight animate-pulse" />}
                </div>
                <div className={`font-mono text-sm mb-1 relative z-10 truncate ${selectedId === api.id ? 'text-white' : 'text-gray-300'}`}>
                  {api.path}
                </div>
                <div className="text-xs text-gray-500 relative z-10 font-medium">
                  {api.label}
                </div>
                {/* Subtle highlight effect */}
                {selectedId === api.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gra-highlight/10 to-transparent opacity-50" />
                )}
              </button>
            ))}
          </div>

          {/* Main Area: Console */}
          <div className="lg:col-span-8 bg-[#0d0d14] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
            {/* Console Header */}
            <div className="bg-black/50 border-b border-white/5 p-4 flex justify-between items-center">
               <div className="flex items-center gap-3">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                 </div>
                 <span className="font-mono text-sm text-gray-400 ml-2">{activeEndpoint.path}</span>
               </div>
               <div className="text-xs text-gray-500 font-mono">HTTPS // GRA-API-V1</div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* Request Panel */}
              <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-white/5 flex flex-col min-h-[300px]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                    <FileJson className="w-4 h-4 text-blue-400" /> Request Body
                  </h3>
                  <button 
                    onClick={handleTest}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-1.5 bg-gra-highlight hover:bg-cyan-400 text-black text-sm font-bold rounded transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                    Send
                  </button>
                </div>
                
                <div className="flex-1 relative">
                  <textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    className="w-full h-full bg-[#050508] text-gray-300 font-mono text-sm p-4 rounded-lg border border-white/10 focus:outline-none focus:border-gra-highlight/50 resize-none custom-scrollbar"
                    spellCheck="false"
                  />
                </div>
                <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                  {activeEndpoint.description}
                </p>
              </div>

              {/* Response Panel */}
              <div className="flex-1 p-6 flex flex-col bg-[#08080c] min-h-[300px]">
                <div className="flex items-center gap-2 mb-4">
                  <Server className="w-4 h-4 text-green-500" />
                  <h3 className="text-sm font-bold text-gray-300">Response</h3>
                  {response && (
                    <span className="ml-auto text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20">
                      200 OK
                    </span>
                  )}
                </div>

                <div className="flex-1 bg-[#050508] rounded-lg border border-white/5 p-4 font-mono text-sm overflow-auto custom-scrollbar relative">
                   {!response && !loading && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
                        <Code className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-xs">Waiting for request...</span>
                     </div>
                   )}
                   
                   {loading && (
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-gra-highlight animate-spin" />
                     </div>
                   )}

                   {response && (
                     <pre className="text-green-400/90 whitespace-pre-wrap">
                       {response}
                     </pre>
                   )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </section>
  );
};