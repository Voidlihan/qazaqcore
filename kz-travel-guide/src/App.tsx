import { useState } from "react";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import { galleryData, slangData, survivalData } from "./data/content";
import Quiz from "./components/Quiz";
import { QC1Assistant } from "./components/QC1Assistant";

export default function App() {
  const [currentTab, setCurrentTab] = useState('slang');

  // Удваиваем массив для бесшовного зацикливания анимации кинопленки
  const doubleImages = [...galleryData, ...galleryData];
  const [activeImage, setActiveImage] = useState<{ url: string; title: string; location: string } | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000); // Скрываем через 2 секунды
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-teal-500 selection:text-slate-950 overflow-x-hidden">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* ГЛАВНЫЙ КОНТЕЙНЕР С КИНОПЛЕНКАМИ ПО БОКАМ */}
      <div className="w-full relative flex justify-center flex-grow">
        <QC1Assistant />
        {/* ЛЕВАЯ КИНОПЛЕНКА (Теперь жестко слева у края экрана) */}
        <div className="hidden 2xl:block w-32 h-[calc(100vh-120px)] overflow-hidden fixed left-6 top-24 opacity-10 hover:opacity-40 transition-opacity duration-500 pointer-events-auto z-0">
          <div className="flex flex-col gap-4 animate-scroll-up">
            {doubleImages.map((img, idx) => (
              <img key={`left-${idx}`} src={img.url} className="w-full h-44 object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-300 shadow-md" alt="" />
            ))}
          </div>
        </div>

        {/* ПРАВАЯ КИНОПЛЕНКА (Теперь жестко справа у края экрана) */}
        <div className="hidden 2xl:block w-32 h-[calc(100vh-120px)] overflow-hidden fixed right-6 top-24 opacity-10 hover:opacity-40 transition-opacity duration-500 pointer-events-auto z-0">
          <div className="flex flex-col gap-4 animate-scroll-down">
            {doubleImages.map((img, idx) => (
              <img key={`right-${idx}`} src={img.url} className="w-full h-44 object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-300 shadow-md" alt="" />
            ))}
          </div>
        </div>

        {/* ОСНОВНОЙ КОНТЕНТ */}
        <main className="flex-grow max-w-4xl w-full px-4 md:px-6 py-8 md:py-12 z-10 mx-auto">
          {currentTab === 'slang' && (
            <div>
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                  Казахский Сленг <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">без цензуры</span>
                </h1>
                <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
                  Кликай на карточки, чтобы узнать реальный смысл выражений, которые ты услышишь на улицах Алматы или Астаны.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {slangData.map((item) => <Card key={item.id} item={item} />)}
              </div>
            </div>
          )}

          {currentTab === 'quiz' && (
            <div>
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                  Проверь свой <span className="text-teal-400">IQ</span> на знание менталитета
                </h1>
                <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
                  Мини-тест на базовые культурные коды. Пойми, готов ли ты идти на казахский той.
                </p>
              </div>
              <Quiz />
            </div>
          )}

          {currentTab === 'survival' && (
            // Твой работающий код Survival Guide остается без изменений
            <div className="max-w-4xl mx-auto">
              {/* Код гайда выживания */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                  Гайд по <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Выживанию</span>
                </h1>
              </div>
              <div className="space-y-8">
                {survivalData.map((section) => (
                  <div key={section.id} className="bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-3xl p-3 bg-slate-950 rounded-xl border border-slate-800/80">{section.icon}</span>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white">{section.title}</h2>
                        <p className="text-xs md:text-sm text-slate-400">{section.shortDesc}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      {section.rules.map((rule, idx) => (
                        <div key={idx} className="bg-slate-950/60 p-5 rounded-xl border border-slate-900 flex flex-col justify-between">
                          <div><h4 className="text-sm font-mono text-amber-400 uppercase tracking-wider mb-2">#0{idx + 1} {rule.title}</h4><p className="text-sm text-slate-300 leading-relaxed">{rule.text}</p></div>
                          {rule.memeFactor && <div className="mt-4 pt-3 border-t border-slate-900/50 text-[11px] font-mono text-slate-500 italic">💡 Мем-факт: {rule.memeFactor}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ВКЛАДКА: ГАЛЕРЕЯ */}
          {currentTab === 'gallery' && (
            <div>
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                  Атмосфера <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">в кадрах</span>
                </h1>
                <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
                  Природа и локации, ради которых стоит сорваться и купить билет прямо сейчас. Кликни на фото, чтобы открыть во весь экран.
                </p>
              </div>

              {/* Сетка с альбомным соотношением сторон (aspect-video) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                  { id: 1, url: "https://sun9-17.userapi.com/s/v1/ig2/9M4J_TgZps9KCDY_iSHjhROkFCq1I0tlPvkH2E0wrdaAacy2VUbqILCe5i3YFnH38b0fmc4UrOGqV4tfLJ5-k1xR.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2560x1920&from=bu&u=oI8U1vPZNknE_AmutMfL52NI-jw4fthR_wTLm8fpo7k&cs=2560x0", title: "Набережная Астаны", location: "Астана" },
                  { id: 2, url: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=1200&q=80", title: "Степные просторы", location: "Центральный Казахстан" },
                  { id: 3, url: "https://images.unsplash.com/photo-1536152470836-b943b246224c?auto=format&fit=crop&w=1200&q=80", title: "Заилийский Алатау", location: "Алматы" },
                  { id: 4, url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", title: "Горные вершины", location: "Иле-Алатау" },
                  { id: 5, url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80", title: "Тянь-Шаньские ели", location: "Алматинская область" },
                  { id: 6, url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80", title: "Речные долины", location: "Восточный Казахстан" }
                ].map((img) => (
                  <div 
                    key={img.id} 
                    onClick={() => setActiveImage(img)}
                    className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800/80 group relative shadow-lg aspect-video flex flex-col justify-end cursor-pointer"
                  >
                    <img 
                      src={img.url} 
                      alt={img.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-0" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
                    
                    <div className="p-5 z-20 relative transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="text-white font-bold text-xl leading-tight drop-shadow-md">{img.title}</h4>
                      <p className="text-xs text-purple-400 font-mono mt-1 drop-shadow-sm">📍 {img.location}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* МОДАЛЬНОЕ ОКНО (LIGHTBOX) */}
              {activeImage && (
                <div 
                  className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[100] flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in cursor-zoom-out"
                  onClick={() => setActiveImage(null)}
                >
                  <button 
                    className="absolute top-6 right-6 text-slate-400 hover:text-white text-sm font-mono bg-slate-900 px-4 py-2 rounded-xl border border-slate-800"
                    onClick={() => setActiveImage(null)}
                  >
                    ESC / CLOSE
                  </button>
                  
                  <div className="max-w-5xl w-full max-h-[80vh] relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl cursor-default" onClick={(e) => e.stopPropagation()}>
                    <img 
                      src={activeImage.url} 
                      alt={activeImage.title} 
                      className="w-full h-auto max-h-[80vh] object-contain mx-auto"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-md p-6 border-t border-slate-900">
                      <h3 className="text-white font-black text-2xl">{activeImage.title}</h3>
                      <p className="text-purple-400 font-mono text-sm mt-1">📍 {activeImage.location}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ВКЛАДКА: ОБ АВТОРЕ */}
          {currentTab === 'about' && (
            <div className="max-w-3xl mx-auto space-y-12 animate-fade-in text-slate-300">
              
              {/* ЗАГОЛОВОК И СТАТУС-КАРТОЧКА */}
              <div className="flex flex-col md:flex-row gap-8 items-start border-b border-slate-900 pb-10">
                <div className="flex-grow space-y-4">
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Привет! Меня зовут <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Алихан</span>
                  </h1>
                  <br />
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Я разработчик и создатель этого проекта. Я родился и живу в Казахстане, и моя цель — сделать удобный цифровой путеводитель для людей, которые хотят ближе познакомиться с нашей страной.
                  </p>
                </div>

                {/* МИНИ-КАРТОЧКА АВТОРА */}
                <div className="w-full md:w-72 bg-slate-900/60 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col gap-3 font-mono text-xs">
                  <div className="text-slate-500 uppercase tracking-wider border-b border-slate-800 pb-2">Профиль создателя</div>
                  <div><span className="text-slate-500">Автор:</span> <span className="text-white font-bold">Алихан</span></div>
                  <div><span className="text-slate-500">Локация:</span> <span className="text-white">Казахстан 🇰🇿</span></div>
                  <div><span className="text-slate-500">Стек / Vector:</span> <span className="text-teal-400">IT, Web Dev, Digital Products</span></div>
                  <div><span className="text-slate-500">Интересы:</span> <span className="text-slate-300">Технологии, инновации, путешествия, визуальная культура</span></div>
                </div>
              </div>

              {/* МИССИЯ ПРОЕКТА */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-teal-500 rounded-full" /> Почему я создал этот проект?
                </h3>
                <p className="leading-relaxed">
                  Этот сайт появился из простой идеи: многие иностранные путешественники знают о Казахстане недостаточно, хотя у нашей страны есть уникальная культура, современная архитектура, невероятные природные места и богатая история. Перед поездкой люди часто ищут ответы на базовые вопросы:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm">
                  {["Куда стоит пойти?", "Какие места действительно интересны?", "Как выглядит город изнутри?", "Что подходит для первого знакомства?"].map((q, i) => (
                    <div key={i} className="bg-slate-900/40 border border-slate-800/60 p-3 rounded-xl flex items-center gap-3">
                      <span className="text-teal-500 font-mono">0{i+1}.</span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
                <p className="leading-relaxed pt-2">
                  Я решил решить эту проблему через интерактивный формат. Вместо обычного скучного списка достопримечательностей я создаю пространство, где можно изучить живые фотографии, посмотреть локации на карте, совершить виртуальную прогулку и заранее почувствовать атмосферу города.
                </p>
              </div>

              {/* БЭКГРАУНД И ПУТЬ */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-teal-500 rounded-full" /> Мой путь & Магистратура
                </h3>
                <p className="leading-relaxed">
                  Мой интерес к технологиям начался с детской мечты — создавать роботов и изобретать новые вещи. Со временем это переросло в изучение программирования, веб-разработки и цифровых систем. 
                </p>
                <br />
                <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                  <p className="text-sm text-slate-300 font-medium">
                    Сейчас я обучаюсь в магистратуре по направлению <span className="text-teal-400 font-mono">"Computer Technology"</span> в Китае, где глубоко изучаю не только техническую часть, но и создание полноценных продуктов:
                  </p>
                  <br />
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400">
                    <div>• Поиск пользовательских проблем</div>
                    <div>• Развитие бизнес-идей</div>
                    <div>• Управление проектами</div>
                    <div>• Инновационные подходы</div>
                  </div>
                </div>
              </div>

              {/* ТЕХНИЧЕСКИЙ ОПЫТ */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-teal-500 rounded-full" /> Опыт разработки
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl">
                    <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono text-teal-400">Web Development</h4>
                    <p className="text-sm mt-1 text-slate-400">Создание и поддержка сайтов, работа с хостингом, деплоем и оптимизацией кода под реальные задачи.</p>
                  </div>
                  <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl">
                    <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono text-teal-400">Виртуальные туры</h4>
                    <p className="text-sm mt-1 text-slate-400">Опыт создания интерактивных виртуальных прогулок для образовательных и культурных объектов. Работа с панорамными изображениями высокого разрешения.</p>
                  </div>
                  <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl">
                    <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono text-teal-400">Исследовательские проекты</h4>
                    <p className="text-sm mt-1 text-slate-400">Разработка отказоустойчивых систем (распределенное взаимодействие между сервером и резервной машиной с механизмом автоматического восстановления) и игровых проектов.</p>
                  </div>
                </div>
              </div>

              {/* ПОДХОД К РАБОТЕ */}
              <div className="bg-slate-900/20 border border-slate-800/80 p-6 rounded-2xl text-center space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-teal-500 bg-teal-950/40 px-2 py-0.5 rounded-full border border-teal-900/50">Формула разработки</span>
                <div className="text-lg md:text-xl font-mono text-white font-bold tracking-tight">
                  Проблема → Идея → Решение → Реализация → Ценность
                </div>
                <p className="text-sm text-slate-400 max-w-xl mx-auto">
                  Я считаю, что технологии должны решать реальные проблемы людей. Для меня этот проект — точка пересечения веб-разработки, фотографии, исследования городов и создания полезного сервиса.
                </p>
              </div>

              {/* ЧТО ДАЛЬШЕ & КОНТАКТЫ */}
              <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="space-y-2 max-w-md">
                  <h4 className="font-bold text-white">Что дальше?</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Проект активно развивается. В планах: добавление новых городов Казахстана, расширение базы виртуальных туров и запуск полезных интерактивных инструментов для путешественников.
                  </p>
                </div>
                <div className="space-y-2 w-full md:w-auto">
                  <h4 className="font-bold text-white">Контакты & Обратная связь</h4>
                  <p className="text-sm text-slate-400 mb-3">Есть классные идеи или локации на примете?</p>
                  <br />
                  <a 
                    href="mailto:your-email@example.com" 
                    className="inline-block text-xs font-mono bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white px-4 py-2.5 rounded-xl transition-all"
                  >
                    Написать: e.alihangt@gmail.com
                  </a>
                </div>
              </div>

            </div>
          )}

          {/* ВКЛАДКА: ПОДДЕРЖАТЬ */}
          {currentTab === 'donate' && (
            <div className="max-w-md mx-auto text-center">
              <div className="mb-10">
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                  Поддержать <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500">Автора</span>
                </h1>
                <p className="text-slate-400 text-sm">
                  Если проект помог тебе не выпить лишнюю пиалу чая или правильно использовать сленг на улице. Любой донат ускоряет разработку новых фич.
                </p>
              </div>

              {/* КИБЕР-КАРТА РЕКВИЗИТОВ */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden text-left mb-6">
                {/* Декоративный неоновый круг на бэкграунде */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xs font-mono tracking-widest text-rose-400 font-bold uppercase">Qazaq Core Card</span>
                  <div className="text-right text-[10px] font-mono text-slate-500">STATUS: ACTIVE</div>
                </div>

                {/* НОМЕР КАРТЫ */}
                <div 
                  onClick={() => handleCopy("4400 4303 7184 1112", "Номер карты")}
                  className="mb-6 cursor-pointer group p-2 -mx-2 rounded-xl hover:bg-slate-900/60 transition duration-200"
                >
                  <label className="text-[10px] font-mono text-slate-500 block mb-1 uppercase tracking-wider">Номер карты (Kaspi / Любой банк)</label>
                  <div className="flex justify-between items-center">
                    <span className="text-xl md:text-2xl font-mono font-bold text-white tracking-widest group-hover:text-rose-400 transition-colors">
                      4400 4303 7184 1112
                    </span>
                    <span className="text-xs font-mono text-slate-600 group-hover:text-slate-400">Copy</span>
                  </div>
                </div>

                {/* ТЕЛЕФОН / СБП */}
                <div 
                  onClick={() => handleCopy("+7 747 311 7378", "Номер телефона")}
                  className="mb-4 cursor-pointer group p-2 -mx-2 rounded-xl hover:bg-slate-900/60 transition duration-200"
                >
                  <label className="text-[10px] font-mono text-slate-500 block mb-1 uppercase tracking-wider">По номеру телефона / Перевод</label>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-mono font-bold text-slate-200 group-hover:text-rose-400 transition-colors">
                      +7 747 311 7378
                    </span>
                    <span className="text-xs font-mono text-slate-600 group-hover:text-slate-400">Copy</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-950 flex justify-between items-center text-xs font-mono text-slate-400">
                  <div>Получатель: <span className="text-white font-medium">Алихан Е.</span></div>
                  <div className="text-xs">KZT / RUB</div>
                </div>
              </div>

              {/* ПЛАВАЮЩИЙ АЛЕРТ УСПЕШНОГО КОПИРОВАНИЯ */}
              <div className="h-6">
                {copiedText && (
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-900/50 animate-pulse">
                    ✓ {copiedText} скопирован в буфер!
                  </span>
                )}
              </div>
            </div>
          )}

        </main>

      </div>

      <footer className="border-t border-slate-900 bg-slate-950/40 py-6 text-center text-xs text-slate-600 font-mono z-20">
        © 2026 QAZAQ CORE / Сделано Программным Кротом в Поднебесной.
      </footer>
    </div>
  );
}