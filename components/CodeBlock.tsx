
import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightVerilog = (text: string) => {
    const keywords = /\b(module|endmodule|input|output|reg|wire|always|initial|begin|end|assign|case|endcase|if|else|posedge|negedge|default)\b/g;
    const comments = /(\/\/.*|\/\*[\s\S]*?\*\/)/g;
    const numbers = /\b(\d+'b[01zX]+|\d+'h[0-9a-fA-F]+|\d+)\b/g;

    let highlighted = text
      .replace(comments, '<span class="text-slate-500 italic">$1</span>')
      .replace(keywords, '<span class="text-indigo-400 font-bold">$1</span>')
      .replace(numbers, '<span class="text-amber-400">$1</span>');

    return highlighted;
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-white/5 bg-hardware-900 shadow-2xl">
      <div className="bg-white/[0.02] px-6 py-3 border-b border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">
            {title || "Hardware Source"}
          </span>
        </div>
        <button 
          onClick={handleCopy}
          className="text-[10px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors"
        >
          {copied ? 'Captured' : 'Capture Code'}
        </button>
      </div>
      <div className="p-8 overflow-x-auto bg-hardware-950/50">
        <pre className="text-sm font-mono leading-relaxed text-slate-300"
             dangerouslySetInnerHTML={{ __html: highlightVerilog(code) }} />
      </div>
    </div>
  );
};

export default CodeBlock;
