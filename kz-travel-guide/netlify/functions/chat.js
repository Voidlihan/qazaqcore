export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { messages } = JSON.parse(event.body);
    const apiKey = process.env.OPENROUTER_API_KEY;

    // Быстрая проверка на сервере: если ключа нет в окружении, сразу вернем ошибку
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key is missing in Netlify environment variables' }),
      };
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://qazaq-core.netlify.app/',
        'X-Title': 'Qazaq Core',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemma-2-9b-it:free',
        messages: messages,
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error: ' + error.message }),
    };
  }
};