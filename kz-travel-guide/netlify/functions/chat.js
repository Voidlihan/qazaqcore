import axios from 'axios';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages } = JSON.parse(event.body);
    const apiKey = process.env.VITE_HF_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'HF_API_KEY is missing in Netlify variables' }),
      };
    }

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

    // Делаем запрос через надежный axios
    const response = await axios.post(
      'https://router.huggingface.co/v1/chat/completions',
      {
        model: 'Qwen/Qwen2.5-72B-Instruct',
        messages: fullMessages,
        max_tokens: 500,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey.trim()}`,
          'Content-Type': 'application/json',
        },
        timeout: 15000 // таймаут 15 секунд, чтобы запрос не висел вечно
      }
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    // Вытаскиваем детальную ошибку из axios, если она есть
    const errorResponse = error.response ? JSON.stringify(error.response.data) : error.message;
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ error: `Axios fetch failed: ${errorResponse}` }),
    };
  }
};