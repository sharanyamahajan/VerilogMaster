
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CodeBlock from './components/CodeBlock';
import AIAssistant from './components/AIAssistant';
import { TUTORIALS, CIRCUITS } from './constants';
import { Tutorial, Circuit, ViewType } from './types';

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<{ id: string; type: ViewType }>({
    id: 'intro',
    type: 'tutorial',
  });

  const [currentTutorial, setCurrentTutorial] = useState<Tutorial | null>(null);
  const [currentCircuit, setCurrentCircuit] = useState<Circuit | null>(null);

  useEffect(() => {
    if (activeItem.type === 'tutorial') {
      const found = TUTORIALS.find(t => t.id === activeItem.id);
      setCurrentTutorial(found || null);
      setCurrentCircuit(null);
    } else if (activeItem.type === 'circuit') {
      const found = CIRCUITS.find(c => c.id === activeItem.id);
      setCurrentCircuit(found || null);
      setCurrentTutorial(null);
    } else {
      setCurrentTutorial(null);
      setCurrentCircuit(null);
    }
  }, [activeItem]);

  const handleSelect = (id: string, type: ViewType) => {
    setActiveItem({ id, type });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHome = activeItem.id === 'intro' && activeItem.type === 'tutorial';

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-hardware-950 selection:bg-indigo-500/30">
      {/* Navigation Sidebar */}
      <Sidebar currentId={activeItem.type === 'page' ? '' : activeItem.id} onSelect={handleSelect} />

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto hardware-grid relative">
        {/* Subtle top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-indigo-600/10 blur-[120px] pointer-events-none"></div>

        {/* Top bar */}
        <nav className="h-20 px-8 flex items-center justify-between border-b border-white/5 sticky top-0 bg-hardware-950/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <button 
              onClick={() => handleSelect('docs', 'page')}
              className={`hover:text-indigo-400 transition-colors ${activeItem.id === 'docs' ? 'text-indigo-400' : ''}`}
            >
              Documentation
            </button>
            <button 
              onClick={() => handleSelect('lib', 'page')}
              className={`hover:text-indigo-400 transition-colors ${activeItem.id === 'lib' ? 'text-indigo-400' : ''}`}
            >
              Standard Lib
            </button>
            <button 
              onClick={() => handleSelect('sim', 'page')}
              className={`hover:text-indigo-400 transition-colors ${activeItem.id === 'sim' ? 'text-indigo-400' : ''}`}
            >
              Simulation
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
            <button 
              onClick={() => handleSelect('sim', 'page')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all"
            >
              Launch Simulator
            </button>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6 py-12 md:py-24 relative z-10">
          {isHome && (
            <div className="mb-24">
              <div className="flex flex-col gap-12 items-start mb-20">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-8">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    System Online
                  </div>
                  <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8">
                    Hardware-grade <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-600">HDL Mastery.</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light leading-relaxed mb-12">
                    Accelerate your hardware design journey with zero-compromise learning. Built for the next generation of silicon architects.
                  </p>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <button 
                      onClick={() => handleSelect('intro', 'tutorial')}
                      className="bg-white text-black px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                      Get Started
                    </button>
                    <div className="flex items-center gap-4 px-6 py-4 rounded-xl border border-white/10 text-slate-400 text-sm font-medium">
                      Verified by 5,000+ Students
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Grid Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                 <div className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                    <h3 className="text-xl text-white font-bold mb-4">Gate-Level Accuracy</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Model logic exactly as it translates to physical transistors. Our courses cover everything from NAND primitives to complex ALUs.</p>
                 </div>
                 <div className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                    <h3 className="text-xl text-white font-bold mb-4">Sequential Logic Flows</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Master the clock. Learn the intricacies of non-blocking assignments, flip-flops, and finite state machines.</p>
                 </div>
              </div>
            </div>
          )}

          {activeItem.id === 'docs' && activeItem.type === 'page' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
               <span className="text-indigo-400 font-black text-xs uppercase tracking-[0.3em]">System Reference</span>
               <h1 className="text-4xl md:text-6xl font-black text-white mt-2 mb-8 tracking-tighter">Documentation</h1>
               <div className="glass-panel rounded-3xl mb-12">
                 <div className="p-8 md:p-12">
                    <h3 className="text-xl text-white font-bold mb-4">Verilog HDL Specifications</h3>
                    <p className="text-slate-400 leading-relaxed mb-6">
                      Verilog (IEEE 1364) is a hardware description language used to model electronic systems. 
                      The standard defines the syntax and semantics of the language for synthesis, simulation, and verification.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-xs tracking-widest">Logic Values</h4>
                        <ul className="text-sm text-slate-300 space-y-2">
                          <li><span className="text-white font-bold">0:</span> Logic zero / False</li>
                          <li><span className="text-white font-bold">1:</span> Logic one / True</li>
                          <li><span className="text-white font-bold">X:</span> Unknown value</li>
                          <li><span className="text-white font-bold">Z:</span> High impedance / Tri-state</li>
                        </ul>
                      </div>
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-xs tracking-widest">History</h4>
                        <p className="text-sm text-slate-300">
                          Created by Phil Moorby at Gateway Design Automation in 1984. 
                          Later standardized as IEEE 1364 in 1995, with major updates in 2001 and 2005.
                        </p>
                      </div>
                    </div>
                 </div>
               </div>
             </div>
          )}

          {activeItem.id === 'lib' && activeItem.type === 'page' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
               <span className="text-indigo-400 font-black text-xs uppercase tracking-[0.3em]">Core Library</span>
               <h1 className="text-4xl md:text-6xl font-black text-white mt-2 mb-8 tracking-tighter">Standard Lib</h1>
               <div className="glass-panel p-8 md:p-12 rounded-3xl mb-12 relative overflow-hidden">
                 <h3 className="text-xl text-white font-bold mb-4">Built-in Primitives & Tasks</h3>
                 <div className="space-y-8">
                   <div>
                     <h4 className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-4">Logic Primitives</h4>
                     <div className="flex flex-wrap gap-3">
                       {['and', 'nand', 'or', 'nor', 'xor', 'xnor', 'buf', 'not'].map(p => (
                         <code key={p} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-indigo-300 font-mono text-sm">{p}</code>
                       ))}
                     </div>
                   </div>
                   <div>
                     <h4 className="text-amber-400 text-xs font-black uppercase tracking-widest mb-4">System Tasks</h4>
                     <ul className="space-y-3 text-sm text-slate-300">
                        <li><code className="text-white">$display</code>: Print formatted text to console.</li>
                        <li><code className="text-white">$monitor</code>: Auto-print when signal changes.</li>
                        <li><code className="text-white">$finish</code>: Terminate simulation.</li>
                        <li><code className="text-white">$time</code>: Current simulation time.</li>
                     </ul>
                   </div>
                 </div>
               </div>
             </div>
          )}

          {activeItem.id === 'sim' && activeItem.type === 'page' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
               <span className="text-indigo-400 font-black text-xs uppercase tracking-[0.3em]">Virtual Lab</span>
               <h1 className="text-4xl md:text-6xl font-black text-white mt-2 mb-8 tracking-tighter">Simulation</h1>
               <div className="glass-panel p-8 md:p-12 rounded-3xl mb-12">
                 <h3 className="text-xl text-white font-bold mb-4">Running Hardware Simulations</h3>
                 <p className="text-slate-400 leading-relaxed mb-8">
                   Simulation allows you to verify logic behavior before deploying to physical FPGAs or ASICs. 
                   A complete simulation environment typically requires a compiler and a waveform viewer.
                 </p>
                 <div className="bg-black/60 rounded-2xl p-6 border border-white/5 font-mono text-xs text-indigo-400 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                       <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                       SIMULATOR_CORE :: ICARUS_V12
                    </div>
                    <div className="space-y-1 relative z-10">
                       <p>[SYSTEM] Compiling design_unit.v...</p>
                       <p>[SYSTEM] Compiling testbench.v...</p>
                       <p>[SYSTEM] Generating vvp executable...</p>
                       <p className="text-white">[RUN] Beginning simulation at T=0...</p>
                       <p className="text-slate-500"># T=10: A=0, B=0, Y=0</p>
                       <p className="text-slate-500"># T=20: A=1, B=0, Y=0</p>
                       <p className="text-slate-500"># T=30: A=1, B=1, Y=1</p>
                       <p className="text-emerald-400">[DONE] Simulation finished with 0 errors.</p>
                    </div>
                 </div>
               </div>
             </div>
          )}

          {currentTutorial && !isHome && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-[1px] w-8 bg-indigo-500/50"></span>
                <span className="text-indigo-400 font-black text-xs uppercase tracking-[0.3em]">
                  {currentTutorial.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mt-2 mb-8 tracking-tighter">
                {currentTutorial.title}
              </h1>
              <div className="glass-panel rounded-3xl mb-12">
                <div className="p-8 md:p-12">
                  <p className="text-xl text-slate-300 leading-relaxed font-light">
                    {currentTutorial.content}
                  </p>
                </div>
              </div>
              
              {currentTutorial.codeSnippet && (
                <div className="mt-16">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Logic implementation</h3>
                    <div className="h-[1px] flex-1 mx-6 bg-white/5"></div>
                  </div>
                  <CodeBlock code={currentTutorial.codeSnippet} title={`${currentTutorial.title} Implementation`} />
                </div>
              )}
            </div>
          )}

          {currentCircuit && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-[1px] w-8 bg-emerald-500/50"></span>
                <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em]">
                  {currentCircuit.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mt-2 mb-8 tracking-tighter">
                {currentCircuit.name}
              </h1>
              <div className="glass-panel rounded-3xl mb-12">
                <div className="p-8 md:p-12">
                  <p className="text-xl text-slate-300 leading-relaxed font-light mb-8">
                    {currentCircuit.explanation}
                  </p>
                  
                  <div className="space-y-12">
                    <div>
                      <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-3">
                        <span className="w-1 h-4 bg-indigo-500 rounded"></span>
                        Module Definition
                      </h3>
                      <CodeBlock code={currentCircuit.verilogCode} title="Design Unit (DUT)" />
                    </div>
                    
                    {currentCircuit.testbenchCode && (
                      <div>
                        <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-3">
                          <span className="w-1 h-4 bg-emerald-500 rounded"></span>
                          Verification Suite
                        </h3>
                        <CodeBlock code={currentCircuit.testbenchCode} title="Testbench Stimulus" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Assistant - Rebranded as Neural Logic Core */}
          <AIAssistant />
          
          <footer className="mt-32 py-12 border-t border-white/5 text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em] flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white/5 rounded flex items-center justify-center">V</div>
              <span>VerilogMaster Core v3.0.42</span>
            </div>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer transition-colors">Architecture</span>
              <span className="hover:text-white cursor-pointer transition-colors">Security</span>
              <span className="hover:text-white cursor-pointer transition-colors">GPG Key</span>
            </div>
            <p>© {new Date().getFullYear()} Silicon Logic Labs</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;
