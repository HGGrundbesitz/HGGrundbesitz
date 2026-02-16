import { useState } from 'react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Willkommen. Wie kann ich Ihnen bei Ihrem Immobilienverkauf behilflich sein?' }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message: string) => {
    // Optimistic update
    const newMessages = [...messages, { role: 'user' as const, content: message }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiHistory = messages
        .filter((msg, index) => !(index === 0 && msg.role === 'assistant'))
        .map(m => ({
          role: m.role,
          content: m.content,
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          history: apiHistory,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es später erneut." }]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
};

export default useChat;