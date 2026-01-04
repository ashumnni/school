
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/gemini';
import { Message } from '../types';
import { ADMISSIONS_FAQ } from '../constants';

export const AdmissionsAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to Lumina Admissions! I'm here to help you with the application process. What can I clarify for you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textOverride?: string) => {
    const userMsg = (textOverride || input).trim();
    if (!userMsg || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getGeminiResponse(userMsg, messages);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col h-[600px] overflow-hidden">
      {/* Header */}
      <div className="bg-emerald-600 p-6 text-white flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">Admissions AI Guide</h3>
          <p className="text-emerald-100 text-xs mt-1">Real-time assistance for prospective families</p>
        </div>
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-sm shadow-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none flex space-x-1 shadow-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      <div className="px-6 py-3 bg-white border-t border-slate-100 overflow-x-auto">
        <div className="flex space-x-2 whitespace-nowrap scrollbar-hide">
          {ADMISSIONS_FAQ.map((faq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(faq.q)}
              className="px-4 py-2 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full border border-emerald-100 hover:bg-emerald-100 transition-colors"
            >
              {faq.q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about admissions..."
            className="flex-grow px-5 py-3 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="bg-emerald-600 text-white px-6 rounded-xl font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
