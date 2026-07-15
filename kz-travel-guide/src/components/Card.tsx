import { useState } from 'react';
import type { SlangItem } from '../data/content';

interface CardProps {
  item: SlangItem;
}

export default function Card({ item }: CardProps) {
  // Состояние: перевернута ли карточка (true - обратная сторона, false - лицевая)
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-full h-64 cursor-pointer [perspective:1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full text-center duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ЛИЦЕВАЯ СТОРОНА */}
        <div className="absolute my-rotate-y-0 w-full h-full bg-slate-800 text-white rounded-2xl p-6 flex flex-col justify-between shadow-xl border border-slate-700 [backface-visibility:hidden]">
          <div className="flex justify-between items-center text-xs text-teal-400 font-mono">
            <span>SLANG_ID: 0{item.id}</span>
            <span className="bg-teal-950 px-2 py-0.5 rounded-full border border-teal-800/50">Click to flip</span>
          </div>
          <div className="my-auto">
            <h3 className="text-3xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
              {item.word}
            </h3>
          </div>
          <div className="text-left text-xs text-slate-500">
            Казахстан / Живой язык
          </div>
        </div>

        {/* ОБРАТНАЯ СТОРОНА */}
        <div className="absolute [transform:rotateY(180deg)] w-full h-full bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between shadow-xl border border-teal-500/30 [backface-visibility:hidden]">
          <div className="text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block mb-1">Literal Translation:</span>
            <p className="text-lg font-bold text-slate-200">{item.translation}</p>
          </div>
          
          <div className="text-left bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 my-2 overflow-y-auto max-h-32">
            <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Context / Survival Tip:</span>
            <p className="text-sm text-slate-300 leading-relaxed">{item.context}</p>
          </div>

          <div className="text-center text-[10px] text-slate-500 uppercase font-mono">
            Got it, bro
          </div>
        </div>
      </div>
    </div>
  );
}