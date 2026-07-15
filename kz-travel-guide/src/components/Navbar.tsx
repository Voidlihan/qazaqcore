import { useState } from 'react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Navbar({ currentTab, setCurrentTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Список разделов
  const navigationItems = [
    { id: 'slang', name: 'Сленг & Мемы' },
    { id: 'quiz', name: 'Интерактивный Квиз' },
    { id: 'survival', name: 'Survival Guide' },
    { id: 'gallery', name: 'Галерея' },
    { id: 'about', name: 'Об авторе' },
    { id: 'donate', name: 'Поддержать' },
  ];

  const handleTabSelect = (tabId: string) => {
    setCurrentTab(tabId);
    setIsOpen(false); // Закрываем меню после клика на мобилке
  };

  return (
    <nav className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <div className="flex items-center gap-3 cursor-pointer z-55" onClick={() => handleTabSelect('slang')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center font-black text-slate-900 text-sm tracking-wider">
            KZ
          </div>
          <span className="font-black text-xl tracking-tight text-white">
            QAZAQ <span className="text-teal-400">CORE</span>
          </span>
        </div>

        {/* ДЕСКТОПНАЯ НАВИГАЦИЯ (скрыта на мобильных) */}
        <div className="hidden lg:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800/60">
          {navigationItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabSelect(item.id)}
                className={`px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold shadow-lg shadow-teal-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* СТАТУС БЭДЖ (виден от md экрана) */}
        <div className="hidden md:flex items-center gap-2 bg-slate-800/40 px-3 py-1.5 rounded-full border border-slate-700/50">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-slate-400">v1.0.0-beta / EN-RU</span>
        </div>

        {/* КНОПКА БУРГЕРА (видна только на мобильных/планшетах) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50 focus:outline-none bg-slate-800/60 hover:bg-slate-800 p-1.5 rounded-lg border border-slate-700/50 transition-colors"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-slate-200 rounded transition-transform duration-300 ease-in-out ${
              isOpen ? 'transform rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-slate-200 rounded transition-opacity duration-300 ease-in-out ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-slate-200 rounded transition-transform duration-300 ease-in-out ${
              isOpen ? 'transform -rotate-45 -translate-y-1' : ''
            }`}
          />
        </button>

      </div>

      {/* МОБИЛЬНОЕ МЕНЮ (выпадает плавно при клике) */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[73px] bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden z-40 ${
          isOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-6 gap-3">
          {navigationItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabSelect(item.id)}
                className={`w-full text-left px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 text-teal-400 border border-teal-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent'
                }`}
              >
                {item.name}
              </button>
            );
          })}
          
          {/* Инфо-бэдж внутри мобилки */}
          <div className="mt-4 pt-4 border-t border-slate-900 flex items-center gap-2 px-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-slate-500">v1.0.0-beta / EN-RU</span>
          </div>
        </div>
      </div>
    </nav>
  );
}