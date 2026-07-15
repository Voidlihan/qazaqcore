// Описываем типы для сленга
export interface SlangItem {
    id: number;
    word: string;
    translation: string;
    context: string; // Твой фирменный комментарий
}
  
  // Описываем типы для вопросов квиза
export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number; // Индекс правильного ответа в массиве options
    explanation: string;  // Объяснение, почему именно так (с юмором)
}
  
  // База данных сленга
export const slangData: SlangItem[] = [
    {
      id: 1,
      word: "Базар жок",
      translation: "No market / Absolutely true / 100%",
      context: "Используется, когда ты полностью согласен с собеседником или восхищен чем-то. Буквально означает, что торговаться здесь не о чем, всё и так чётко."
    },
    {
      id: 2,
      word: "Шешес...",
      translation: "The ultimate emotional exclamation",
      context: "Крайне экспрессивное выражение. Иностранцам лучше не произносить без присмотра местных, иначе можно случайно запустить катализатор локального конфликта."
    }
  ];
  
  // База данных для квиза
  export const quizData: QuizQuestion[] = [
    {
      id: 1,
      question: "Вам в гостях налили чай ровно до краев пиалы. Что это значит?",
      options: [
        "Вас здесь очень уважают и ценят",
        "Хозяин дома просто щедрый человек",
        "Вам тонко намекают, что вы засиделись и пора бы валить домой"
      ],
      correctAnswer: 2,
      explanation: "Полная пиала в Казахстане — это знак 'сыйламау' (неуважения) или намёк на то, что чай должен быстро остыть, и вам пора уходить. Настоящий уважительный чай наливают на донышке, чтобы он всегда был горячим, а хозяйка подливала его снова и снова."
    }
];

// Описываем тип для карточки гайда
export interface SurvivalSection {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  rules: { title: string; text: string; memeFactor?: string }[];
}

// Добавляем массив с данными гайда
export const survivalData: SurvivalSection[] = [
  {
    id: "finance",
    title: "Финансы & Kaspi Экосистема",
    icon: "💳",
    shortDesc: "Забудь про Apple Pay и бумажные деньги. Добро пожаловать в матрицу.",
    rules: [
      {
        title: "БЕРИ Каспи СРАЗУ",
        text: "В Казахстане нет фразы 'скинь на карту'. Здесь все говорят 'Закинь на Каспи'. Этой картой можно оплатить всё: от батона в магазине у дома до государственной пошлины и покупки машины.",
        memeFactor: "Купишь семечки у бабушки на улице — у неё всё равно будет QR-код."
      },
      {
        title: "Терминалы",
        text: "Если видишь человека, который стоит у большого автомата (обычно красного) и пихает туда пачку кэша — он либо платит кредит, либо закидывает деньги на Kaspi, чтобы сразу их потратить через телефон.",
      }
    ]
  },
  {
    id: "food",
    title: "Бешбармак Протокол",
    icon: "🥩",
    shortDesc: "Как выжить на казахском застолье и не умереть от переедания.",
    rules: [
      {
        title: "Работа руками",
        text: "Настоящий бешбармак (или просто 'ет') едят руками. Если ты попросишь вилку, дедушка в углу комнаты тяжело вздохнет, а атмосфера станет натянутой. Просто расслабься и хватай сочни. Хотя, можно есть и вилкой, это достаточно гигиенично, но без культурной души",
        memeFactor: "Помыл руки перед едой — считай, получил визу."
      },
      {
        title: "Чайный бесконечный цикл",
        text: "Твоя пиала никогда не должна быть пустой, но если ты выпьешь её до дна, тебе сразу нальют еще. Чтобы остановить этот конвейер, положи пиалу боком или накрой её ладонью.",
      }
    ]
  },
  {
    id: "transport",
    title: "Транспортная Рулетка",
    icon: "🚕",
    shortDesc: "Как передвигаться по городу и не переплатить в 5 раз.",
    rules: [
      {
        title: "InDrive vs Яндекс",
        text: "Официальное такси — это ок, но для междугородних поездок или в час пик все включают InDrive. Суть: ты сам предлагаешь цену за поездку, а водители торгуются с тобой в реальном времени. Насчет цен в дождь или пробки не спрашивайте, мы сами незаем логику агрегаторов",
        memeFactor: "Поездка Алматы-Астана на попутке — это 12 часов жизненной философии от водителя."
      }
    ]
  }
];

export interface GalleryImage {
  id: number;
  url: string;
  title: string;
  location: string;
}

export const galleryData: GalleryImage[] = [
  { id: 1, url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80", title: "Чарынский Каньон", location: "Алматинская область" },
  { id: 2, url: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=1200&q=80", title: "Озеро Каинды", location: "Тянь-Шань" },
  { id: 3, url: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80", title: "Высокогорный каток Медеу", location: "Алматы" },
  { id: 4, url: "https://sun9-17.userapi.com/s/v1/ig2/9M4J_TgZps9KCDY_iSHjhROkFCq1I0tlPvkH2E0wrdaAacy2VUbqILCe5i3YFnH38b0fmc4UrOGqV4tfLJ5-k1xR.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2560x1920&from=bu&u=oI8U1vPZNknE_AmutMfL52NI-jw4fthR_wTLm8fpo7k&cs=2560x0", title: "Набережная Астаны", location: "Астана" },
  { id: 5, url: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=800&q=80", title: "Степные просторы", location: "Центральный Казахстан" },
  { id: 6, url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", title: "Горы Заилийского Алатау", location: "Алматы" },
];