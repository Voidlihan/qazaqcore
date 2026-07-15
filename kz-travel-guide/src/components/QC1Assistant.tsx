import React, { useState, useRef, useEffect } from 'react';
import styles from '../QC1Assistant.module.css';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

const HF_API_KEY = import.meta.env.VITE_HF_API_KEY || "";

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

  // Автоматический скролл вниз при добавлении сообщений
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

    // 1. Добавляем сообщение пользователя на экран
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
  
        const apiMessages = [
          { role: 'system', content: systemPrompt },
          ...updatedMessages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          }))
        ];
  
        console.log("Отправляем токен:", HF_API_KEY ? "Токен есть (начинается на " + HF_API_KEY.slice(0, 5) + ")" : "Токена НЕТ!");
  
        // Стучимся на оригинальный прямой адрес
        const response = await fetch('https://api-inference.huggingface.co/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HF_API_KEY.trim()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'Qwen/Qwen2.5-72B-Instruct',
            messages: apiMessages,
            max_tokens: 500,
          }),
        });
  
        if (!response.ok) {
          // Вытягиваем детальный текст ошибки от Hugging Face
          const errorText = await response.text();
          throw new Error(`Код ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        console.log("Ответ напрямую от HF:", data);
        
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
          const replyText = data.choices[0].message.content;
          setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), text: replyText, sender: 'bot' },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), text: 'Странный формат ответа от ИИ.', sender: 'bot' },
          ]);
        }
      } catch (error: any) {
      console.error('Ошибка связи с QC1 напрямую:', error);
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
      {/* Кнопка вызова чата */}
      <div className={styles.chatTrigger} onClick={toggleChat}>
        <span>💬</span>
        <span className={styles.chatBadge}>QC1</span>
      </div>

      {/* Окно чата */}
      <div className={`${styles.chatWindow} ${!isOpen ? styles.hidden : ''}`}>
        <div className={styles.chatHeader}>
          <div className={styles.statusDot}></div>
          <h3>QC1 Assistant</h3>
          <button className={styles.closeBtn} onClick={toggleChat}>
            ×
          </button>
        </div>

        <div className={styles.chatMessages}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${
                msg.sender === 'bot' ? styles.bot : styles.user
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className={`${styles.message} ${styles.bot}`}>
              QC1 думает...
            </div>
          )}
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
          <button className={styles.sendBtn} onClick={handleSend}>
            Отправить
          </button>
        </div>
      </div>
    </>
  );
};