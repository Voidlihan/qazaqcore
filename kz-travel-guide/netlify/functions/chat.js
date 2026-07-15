export const handler = async (event) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405 };
  
    const { messages } = JSON.parse(event.body); // messages приходят с фронтенда
  
    // 1. Твоя База Знаний
    const knowledgeBase = `
      Ты — QC1, гид по Астане. 
      Факты о проекте: 
      - Проект называется Qazaq Core. 
      - Создатель: Алихан, разработчик и создатель контента. 
      - Астана: красивая столица, Байтерек — 97 метров, Хазрет Султан — огромная мечеть. 
      - Стиль: дружелюбный, короткие ответы.
      - Если спрашивают курс валют или погоду — используй актуальные данные, если они есть.
    `;
  
    // 2. Собираем массив, где первым идет System Prompt
    const fullMessages = [
      { role: 'system', content: knowledgeBase },
      ...messages // Добавляем историю переписки (вопрос пользователя)
    ];
  
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3-8b-instruct:free',
        messages: fullMessages, // Вот наш склеенный массив
      }),
    });
  
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  };