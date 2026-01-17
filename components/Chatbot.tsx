"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Sparkles } from 'lucide-react';
import useChat from '../hooks/useChat';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, sendMessage, loading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const message = input;
    setInput('');
    await sendMessage(message);
  };

  return (
    <>
        {/* Chat Interface */}
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-28 right-6 sm:right-10 z-[120] w-[calc(100vw-3rem)] sm:w-[400px] bg-stone-950 rounded-2xl shadow-2xl shadow-black/50 border border-stone-800 overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-black/50 backdrop-blur-md px-6 py-4 border-b border-stone-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center border border-gold/20 text-gold">
                                <Bot size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-serif text-sm tracking-wide">Digitaler Assistent</h3>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                    <span className="text-stone-500 text-[10px] font-bold uppercase tracking-widest">Online</span>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-stone-500 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="h-[400px] overflow-y-auto p-6 space-y-6 bg-stone-950 scrollbar-thin scrollbar-thumb-stone-800">
                        {messages.map((msg, idx) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={idx} 
                                className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${
                                    msg.role === 'user' 
                                        ? 'bg-stone-800 border-stone-700 text-stone-400' 
                                        : 'bg-gold/10 border-gold/20 text-gold'
                                }`}>
                                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                </div>
                                <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[80%] ${
                                    msg.role === 'user' 
                                        ? 'bg-stone-800 text-stone-200 rounded-tr-none' 
                                        : 'bg-black/50 border border-stone-800 text-stone-300 rounded-tl-none'
                                }`}>
                                    {msg.content}
                                </div>
                            </motion.div>
                        ))}
                        {loading && (
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 text-gold flex items-center justify-center flex-shrink-0">
                                    <Bot size={14} />
                                </div>
                                <div className="p-4 bg-black/50 rounded-2xl rounded-tl-none border border-stone-800">
                                    <div className="flex gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-black/50 border-t border-stone-800">
                        <form onSubmit={handleSend} className="relative">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ihre Nachricht..."
                                className="w-full pl-5 pr-12 py-4 bg-stone-900 border border-stone-800 rounded-xl text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
                            />
                            <button 
                                type="submit"
                                disabled={!input.trim() || loading}
                                className="absolute right-2 top-2 p-2 bg-gold text-black rounded-lg hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Toggle Button */}
        <div className="fixed bottom-10 right-10 z-[100]">
           <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-black transition-all duration-300 hover:scale-105 active:scale-95 group relative border-2 border-transparent ${isOpen ? 'bg-stone-900 text-white border-stone-700 rotate-90' : 'bg-gold hover:shadow-gold/20'}`}
           >
              {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
              
              {!isOpen && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-black"></span>
              )}

              {!isOpen && (
                  <div className="absolute right-full mr-6 px-4 py-2 bg-stone-900 text-white rounded-lg shadow-xl font-bold text-[10px] uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none border border-stone-800 translate-x-2 group-hover:translate-x-0">
                     Chat starten
                  </div>
              )}
           </button>
        </div>
    </>
  );
};

export default Chatbot;