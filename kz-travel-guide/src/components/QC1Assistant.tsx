import React, { useState, useRef, useEffect } from 'react';
import styles from '../QC1Assistant.module.css';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

// Читаем из переменной или вставляем напрямую для тестов
const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY || "";

export const QC1Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Салам! Я QC1 — твой цифровой гид по Астане. Чем могу помочь?',
      sender: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMessageId = Date.now().toString();
    const updatedMessages: Message[] = [...messages, { id: userMessageId, text, sender: 'user' }];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const systemPrompt = `
        You are QC1, an AI assistant for the Qazaq Core project (interactive guide to Astana).
        Creator: Alihan, developer and content creator.
        Tone: Friendly, helpful, brief, and polite.
        Instructions:
        1. Detect the user's language and respond in the same language (Kazakh, English, or Russian).
        2. If asked about places in Astana, suggest: Baiterek, Hazret Sultan Mosque, or Khan Shatyr.
      `;

      // Форматируем историю для Cohere (они используют структуру role: USER / CHATBOT)
      const chatHistory = updatedMessages.slice(1, -1).map(msg => ({
        role: msg.sender === 'user' ? 'USER' : 'CHATBOT',
        message: msg.text
      }));

      // Запрос к официальному API Cohere
      const response = await fetch('https://api.cohere.com/v1/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${COHERE_API_KEY.trim()}`,
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({
          model: 'command-light', // Топовая модель от Cohere
          message: text,
          preamble: systemPrompt, // Системный промпт в Cohere задается здесь
          chat_history: chatHistory,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Код ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log("Ответ от Cohere:", data);
      
      if (data && data.text) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), text: data.text, sender: 'bot' },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), text: 'Странный формат ответа от Cohere.', sender: 'bot' },
        ]);
      }
    } catch (error: any) {
      console.error('Ошибка связи с Cohere:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: `Ошибка связи: ${error.message || 'попробуй еще раз, брат.'}`,
          sender: 'bot',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <div className={styles.chatTrigger} onClick={toggleChat}>
        <span>💬</span>
        <span className={styles.chatBadge}>QC1</span>
      </div>

      <div className={`${styles.chatWindow} ${!isOpen ? styles.hidden : ''}`}>
        <div className={styles.chatHeader}>
          <div className={styles.statusDot}></div>
          <h3>QC1 Assistant</h3>
          <button className={styles.closeBtn} onClick={toggleChat}>×</button>
        </div>

        <div className={styles.chatMessages}>
          {messages.map((msg) => (
            <div key={msg.id} className={`${styles.message} ${msg.sender === 'bot' ? styles.bot : styles.user}`}>
              {msg.text}
            </div>
          ))}
          {isLoading && <div className={`${styles.message} ${styles.bot}`}>QC1 думает...</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.chatInputArea}>
          <input
            type="text"
            className={styles.chatInput}
            placeholder="Спроси меня о чем-нибудь..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className={styles.sendBtn} onClick={handleSend}>Отправить</button>
        </div>
      </div>
    </>
  );
};