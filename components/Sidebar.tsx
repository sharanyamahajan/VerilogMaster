
import React from 'react';
import { TUTORIALS, CIRCUITS } from '../constants';
import { TopicCategory, ViewType } from '../types';

interface SidebarProps {
  currentId: string;
  onSelect: (id: string, type: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentId, onSelect }) => {
  const categories: TopicCategory[] = ['Basics', 'Core Concepts', 'Modeling', 'Verification'];

  return (
    <aside className="w-full md:w-80 flex-shrink-0 bg-hardware-900 border-r border-white/5 h-full overflow-y-auto">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-12 cursor-pointer group" onClick={() => onSelect('intro', 'tutorial')}>
          <div className="w-10 h-10 bg-white text-black rounded flex items-center justify-center font-black text-2xl tracking-tighter transition-transform group-hover:scale-110">
            V
          </div>
          <h1 className="text-xl font-bold tracking-tighter text-white">VerilogMaster</h1>
        </div>

        <nav className="space-y-10">
          <div>
            <h2 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-6 px-2">Knowledge Base</h2>
            {categories.map(cat => (
              <div key={cat} className="mb-8">
                <h3 className="text-xs font-bold text-slate-400 mb-3 px-2 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
                  {cat}
                </h3>
                <ul className="space-y-1">
                  {TUTORIALS.filter(t => t.category === cat).map(tutorial => (
                    <li key={tutorial.id}>
                      <button
                        onClick={() => onSelect(tutorial.id, 'tutorial')}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all ${
                          currentId === tutorial.id 
                            ? 'bg-white/5 text-white font-bold border border-white/10' 
                            : 'text-slate-500 hover:text-white hover:bg-white/[0.02]'
                        }`}
                      >
                        {tutorial.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-8">
            <h2 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-6 px-2">Silicon Blueprints</h2>
            <ul className="space-y-1">
              {CIRCUITS.map(circuit => (
                <li key={circuit.id}>
                  <button
                    onClick={() => onSelect(circuit.id, 'circuit')}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all ${
                      currentId === circuit.id 
                        ? 'bg-white/5 text-white font-bold border border-white/10' 
                        : 'text-slate-500 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    {circuit.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
