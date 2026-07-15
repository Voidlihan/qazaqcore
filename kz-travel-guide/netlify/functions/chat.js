export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages } = JSON.parse(event.body);
    const apiKey = process.env.HF_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'HF_API_KEY is missing in Netlify variables' }),
      };
    }

    // Системный промпт (база знаний)
    const systemPrompt = `
      You are QC1, an AI assistant for the Qazaq Core project (interactive guide to Astana).
      Creator: Alihan, developer and content creator.
      Tone: Friendly, helpful, brief.
      Instructions:
      1. Detect the user's language and respond in the same language (Kazakh, English, or Russian).
      2. If asked about places in Astana, suggest: Baiterek, Hazret Sultan Mosque, or Khan Shatyr.
    `;

    const fullMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    // Используем выделенный отказоустойчивый роутер Hugging Face
    const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Добавляем флаг :auto, чтобы система сама выбрала живой сервер для Qwen
        model: 'Qwen/Qwen2.5-72B-Instruct:auto', 
        messages: fullMessages,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Hugging Face API error: ${errorText}` }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};