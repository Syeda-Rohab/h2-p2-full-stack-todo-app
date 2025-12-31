'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendChatMessage, getChatHistory, type ChatMessage } from '@/lib/chatApi';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history on mount
  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadHistory = async () => {
    const history = await getChatHistory(20);
    setMessages(history);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    const newUserMsg: ChatMessage = {
      message: userMessage,
      isUser: true,
      created_at: new Date().toISOString()
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      // Send to API
      const response = await sendChatMessage(userMessage);

      // Add bot response
      const botMsg: ChatMessage = {
        message: response.response,
        isUser: false,
        intent: response.action,
        created_at: new Date().toISOString()
      };
      setMessages((prev) => [...prev, botMsg]);

      // Trigger task refresh if needed
      if (response.action && response.action !== 'general') {
        // Emit custom event to refresh tasks
        window.dispatchEvent(new CustomEvent('taskUpdated'));
      }
    } catch (error: any) {
      const errorMsg: ChatMessage = {
        message: '❌ ' + (error.message || 'Failed to send message. Please check your OpenAI API key.'),
        isUser: false,
        created_at: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Voice recognition (basic browser API)
  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition not supported in your browser. Try Chrome.');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Voice recognition error:', event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  const quickActions = [
    { label: '📋 Show tasks', action: 'Show my tasks' },
    { label: '✅ Completed', action: 'Show completed tasks' },
    { label: '⏳ Pending', action: 'Show pending tasks' },
  ];

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white p-5 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all z-50 border-2 border-purple-400/30"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(168, 85, 247, 0.4)',
            '0 0 40px rgba(168, 85, 247, 0.6)',
            '0 0 20px rgba(168, 85, 247, 0.4)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-3xl">{isOpen ? '✕' : '🤖'}</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[420px] h-[650px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden border border-purple-500/30"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-5 rounded-t-3xl relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute w-32 h-32 bg-white rounded-full -top-10 -left-10 animate-pulse"></div>
                <div className="absolute w-24 h-24 bg-white rounded-full -bottom-10 -right-10 animate-pulse delay-700"></div>
              </div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">AI Assistant</h3>
                    <p className="text-xs text-purple-100">Powered by GPT-4o-mini</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition backdrop-blur-sm"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-900/50 to-gray-900">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-6xl mb-4"
                  >
                    👋
                  </motion.div>
                  <p className="font-medium text-lg text-white mb-2">Welcome!</p>
                  <p className="text-sm">I'm your AI assistant</p>
                  <p className="text-xs mt-3 text-purple-400">
                    Try: "Add task buy groceries"
                  </p>
                </div>
              )}

              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl shadow-lg ${
                      msg.isUser
                        ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-br-sm'
                        : 'bg-gradient-to-br from-gray-800 to-gray-700 text-gray-100 shadow-purple-500/10 rounded-bl-sm border border-gray-600/50'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                    <p className="text-xs opacity-60 mt-2">
                      {new Date(msg.created_at || '').toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-4 rounded-2xl shadow-lg border border-gray-600/50 rounded-bl-sm">
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-300 mr-2">AI is thinking</div>
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-purple-500 rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-indigo-500 rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 0 && !isLoading && (
              <div className="px-5 py-3 bg-gray-900/80 border-t border-gray-700/50">
                <p className="text-xs text-gray-400 mb-2 font-medium">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((qa, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInput(qa.action);
                      }}
                      className="text-xs bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 px-3 py-2 rounded-full hover:from-purple-600/30 hover:to-blue-600/30 transition text-gray-200"
                    >
                      {qa.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-5 bg-gray-900 border-t border-gray-700/50">
              <div className="flex items-center space-x-2">
                {/* Voice Button */}
                <motion.button
                  onClick={startVoiceRecognition}
                  disabled={isListening}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-full transition shadow-lg ${
                    isListening
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse shadow-red-500/50'
                      : 'bg-gradient-to-r from-gray-700 to-gray-600 text-gray-300 hover:from-gray-600 hover:to-gray-500'
                  }`}
                  title="Voice input"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </motion.button>

                {/* Text Input */}
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isListening ? '🎤 Listening...' : 'Type your message...'}
                  disabled={isLoading || isListening}
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-full text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-800/50 disabled:cursor-not-allowed"
                />

                {/* Send Button */}
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-full hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-purple-500/30"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
