import React, { useState } from 'react';
import { Icons } from './Icons';

interface ResultCardProps {
  title: string;
  icon: React.ReactNode;
  content: string | string[];
  type?: 'text' | 'tags' | 'list' | 'code';
  className?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ title, icon, content, type = 'text', className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    let textToCopy = '';
    if (Array.isArray(content)) {
      textToCopy = type === 'tags' ? content.join(', ') : content.join('\n');
    } else {
      textToCopy = content;
    }
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-800/50 rounded-lg text-indigo-400 group-hover:text-indigo-300 transition-colors">
            {icon}
          </div>
          <h3 className="font-bold text-lg text-slate-100">{title}</h3>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          title="نسخ المحتوى"
        >
          {copied ? <Icons.Check className="w-5 h-5 text-green-500" /> : <Icons.Copy className="w-5 h-5" />}
        </button>
      </div>

      <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/50 overflow-hidden">
        {type === 'list' && Array.isArray(content) && (
          <ul className="space-y-3">
            {content.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {type === 'tags' && Array.isArray(content) && (
          <div className="flex flex-wrap gap-2">
            {content.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-slate-800/50 text-slate-300 rounded-full text-sm border border-slate-700/50 hover:border-indigo-500/30 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        )}

        {type === 'text' && typeof content === 'string' && (
          <p className="whitespace-pre-wrap text-slate-300 leading-relaxed text-sm md:text-base">
            {content}
          </p>
        )}

        {type === 'code' && typeof content === 'string' && (
           <pre className="text-xs md:text-sm text-green-400 font-mono overflow-x-auto whitespace-pre-wrap break-all p-2">
             {content}
           </pre>
        )}
      </div>
    </div>
  );
};