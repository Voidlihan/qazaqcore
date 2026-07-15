interface NavbarProps {
    currentTab: string;
    setCurrentTab: (tab: string) => void;
  }
  
  export default function Navbar({ currentTab, setCurrentTab }: NavbarProps) {
    // Список наших будущих разделов
    const navigationItems = [
      { id: 'slang', name: 'Сленг & Мемы' },
      { id: 'quiz', name: 'Интерактивный Квиз' },
      { id: 'survival', name: 'Survival Guide' },
      { id: 'gallery', name: 'Галерея' },
      { id: 'about', name: 'Об авторе' },
      { id: 'donate', name: 'Поддержать' },
    ];
  
    return (
      <nav className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* LOGO */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('slang')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center font-black text-slate-900 text-sm tracking-wider">
              KZ
            </div>
            <span className="font-black text-xl tracking-tight text-white">
              QAZAQ <span className="text-teal-400">CORE</span>
            </span>
          </div>
  
          {/* NAVIGATION LINKS */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800/60">
            {navigationItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
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
  
          {/* STATUS BADGE (Добавим веса для резюме — типа мультиязычность в будущем) */}
          <div className="hidden md:flex items-center gap-2 bg-slate-800/40 px-3 py-1.5 rounded-full border border-slate-700/50">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-slate-400">v1.0.0-beta / EN-RU</span>
          </div>
  
        </div>
      </nav>
    );
  }