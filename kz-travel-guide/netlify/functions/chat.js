export const handler = async (event) => {
  // Разрешаем только POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages } = JSON.parse(event.body);
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Переменная OPENROUTER_API_KEY не найдена в Netlify' }),
      };
    }

    // Делаем запрос к OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.trim()}`, // Очищаем ключ от случайных пробелов
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://qazaq-core.netlify.app',
        'X-Title': 'Qazaq Core'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free', // Задаем стабильную модель
        messages: messages
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};