import React, { useState, useRef, useEffect } from 'react';
import styles from '../QC1Assistant.module.css';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

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

    // Добавляем сообщение пользователя на экран
    const userMessageId = Date.now().toString();
    setMessages((prev) => [...prev, { id: userMessageId, text, sender: 'user' }]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Запрос к нашей Netlify Function (или Next.js API route)
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: 'Привет! Расскажи о проекте Qazaq Core.' }
          ]
        }),
      });
      
      const data = await response.json();
      console.log(data.choices[0].message.content);

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: data.reply, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Ошибка связи с QC1:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: 'Ой, связь прервалась. Попробуй еще раз, брат.',
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