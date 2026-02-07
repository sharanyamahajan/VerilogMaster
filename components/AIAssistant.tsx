
import React, { useState } from 'react';
import { explainVerilog, generateVerilogModule } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'explain' | 'generate'>('explain');

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');
    
    let result = '';
    if (mode === 'explain') {
      result = await explainVerilog(input);
    } else {
      result = await generateVerilogModule(input);
    }
    
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="glass-panel rounded-3xl p-8 md:p-12 shadow-2xl mt-32 relative overflow-hidden group">
      {/* Background glow effect */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 blur-[100px] pointer-events-none group-hover:bg-indigo-600/20 transition-all duration-700"></div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 relative z-10">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9l-.707.707M12 21v-1m0-11a3 3 0 110-6 3 3 0 010 6z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tighter">Neural Logic Core</h2>
            <p className="text-slate-400 text-sm mt-1">Accelerate architectural decisions via generative intelligence.</p>
          </div>
        </div>

        <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 self-start">
          <button 
            onClick={() => setMode('explain')}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'explain' ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}
          >
            Explain Logic
          </button>
          <button 
            onClick={() => setMode('generate')}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'generate' ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}
          >
            Generate Unit
          </button>
        </div>
      </div>

      <div className="relative z-10">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'explain' ? "// Paste hardware logic for deep analysis..." : "// Describe the target architecture (e.g. 32-bit RISC ALU)..."}
          className="w-full h-40 bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none transition-all placeholder:text-slate-600 font-mono"
        />

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)]"
          >
            {loading ? 'Synthesizing...' : 'Execute Request'}
          </button>
        </div>
      </div>

      {response && (
        <div className="mt-12 p-8 bg-white/[0.02] rounded-2xl border border-white/10 animate-in fade-in duration-700 relative z-10">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
             <h3 className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">Core Analysis Result</h3>
          </div>
          <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed prose prose-invert prose-sm max-w-none">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
