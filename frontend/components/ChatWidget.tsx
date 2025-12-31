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

  // DON'T load chat history - always start fresh
  useEffect(() => {
    if (isOpen) {
      // Clear messages for fresh start
      setMessages([]);
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
        message: 'Error: ' + (error.message || 'Failed to send message'),
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
    { label: 'Show tasks', action: 'Show my tasks', icon: '📋' },
    { label: 'Add task', action: 'Add task ', icon: '➕' },
    { label: 'Help', action: 'help', icon: '❓' },
  ];

  return (
    <>
      {/* Toggle Button - ULTRA DARK BLUE! */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-6 rounded-full shadow-2xl z-50 border-4 border-blue-900/40 bg-gradient-to-br from-[#00080f] via-[#000c15] to-[#000510]"
        whileHover={{ scale: 1.15, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            '0 0 30px rgba(15, 40, 90, 0.6)',
            '0 0 60px rgba(20, 50, 100, 0.8)',
            '0 0 30px rgba(15, 40, 90, 0.6)',
          ],
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity },
          default: { type: "spring", stiffness: 400, damping: 10 }
        }}
      >
        <motion.span
          className="text-4xl"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {isOpen ? '✕' : '🤖'}
        </motion.span>
      </motion.button>

      {/* Chat Window - ULTRA DARK BLUE THEME! */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-28 right-6 w-[450px] h-[700px] rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden backdrop-blur-xl border-2 border-blue-900/50"
            style={{
              background: 'linear-gradient(to bottom right, rgba(0, 8, 15, 0.98), rgba(0, 5, 16, 0.98))',
              boxShadow: '0 0 80px rgba(15, 40, 90, 0.6), 0 0 40px rgba(20, 50, 100, 0.5)'
            }}
          >
            {/* Header - ULTRA DARK BLUE GRADIENT */}
            <div className="relative p-6 rounded-t-3xl overflow-hidden bg-gradient-to-r from-[#001020] via-[#000c18] to-[#001020] border-b-2 border-blue-900/40">
              {/* Animated background orbs */}
              <div className="absolute inset-0 opacity-30">
                <motion.div
                  className="absolute w-40 h-40 rounded-full -top-16 -left-16 blur-3xl"
                  style={{ background: 'radial-gradient(circle, rgba(15, 40, 90, 0.4) 0%, transparent 70%)' }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute w-32 h-32 rounded-full -bottom-12 -right-12 blur-2xl"
                  style={{ background: 'radial-gradient(circle, rgba(20, 50, 100, 0.3) 0%, transparent 70%)' }}
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.6, 0.4]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />
              </div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-14 h-14 bg-blue-900/30 rounded-2xl flex items-center justify-center backdrop-blur-md border-2 border-blue-800/40 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <span className="text-3xl">🤖</span>
                  </motion.div>
                  <div>
                    <h3 className="font-black text-xl text-white tracking-wide">AI Assistant</h3>
                    <p className="text-xs text-blue-300 font-bold">FREE • Instant • Smart</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-blue-200 hover:bg-blue-900/30 rounded-xl p-2.5 transition-all backdrop-blur-sm border border-blue-800/30"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Messages - ULTRA DARK SCROLLING AREA */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ background: 'linear-gradient(to bottom, rgba(0, 5, 15, 0.5), rgba(0, 8, 15, 0.8))' }}>
              {messages.length === 0 && (
                <motion.div
                  className="text-center mt-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="text-7xl mb-6"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    👋
                  </motion.div>
                  <h2 className="font-black text-2xl text-white mb-3">Welcome!</h2>
                  <p className="text-blue-200/80 mb-2">I'm your AI task assistant</p>
                  <motion.div
                    className="inline-block px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-800 rounded-full text-white text-sm font-black mt-4 border border-blue-700/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    Try: "Add task buy groceries"
                  </motion.div>
                </motion.div>
              )}

              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.isUser ? 20 : -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl shadow-xl backdrop-blur-md ${
                      msg.isUser
                        ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white rounded-br-md border-2 border-blue-700/50'
                        : 'bg-gradient-to-br from-[#00080f]/90 to-[#000510]/90 text-blue-100 rounded-bl-md border-2 border-blue-900/40'
                    }`}
                  >
                    <p className="text-sm font-bold leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-2 font-mono">
                      {new Date(msg.created_at || '').toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gradient-to-br from-[#00080f]/90 to-[#000510]/90 p-5 rounded-2xl shadow-xl border-2 border-blue-900/40 rounded-bl-md backdrop-blur-md">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-blue-200 font-black">AI thinking</div>
                      <div className="flex space-x-1.5">
                        <motion.div
                          className="w-2.5 h-2.5 bg-blue-500 rounded-full"
                          animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.4, 1, 0.4],
                            y: [0, -8, 0]
                          }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2.5 h-2.5 bg-blue-400 rounded-full"
                          animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.4, 1, 0.4],
                            y: [0, -8, 0]
                          }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2.5 h-2.5 bg-cyan-400 rounded-full"
                          animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.4, 1, 0.4],
                            y: [0, -8, 0]
                          }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions - DARK BLUE CHIPS */}
            {messages.length === 0 && !isLoading && (
              <motion.div
                className="px-6 py-4 border-t-2 border-blue-900/30"
                style={{ background: 'linear-gradient(to right, rgba(0, 5, 15, 0.8), rgba(0, 8, 15, 0.9))' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-xs text-blue-300 mb-3 font-black uppercase tracking-wider">Quick Actions</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((qa, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setInput(qa.action)}
                      className="text-sm bg-gradient-to-r from-blue-900/40 to-blue-800/40 border-2 border-blue-800/50 px-4 py-2.5 rounded-xl hover:from-blue-900/60 hover:to-blue-800/60 transition-all text-white font-black shadow-lg backdrop-blur-sm"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="mr-2">{qa.icon}</span>
                      {qa.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input Area - ULTRA DARK & SLEEK */}
            <div className="p-6 border-t-2 border-blue-900/30 backdrop-blur-md" style={{ background: 'linear-gradient(to right, rgba(0, 5, 15, 0.9), rgba(0, 8, 15, 0.95))' }}>
              <div className="flex items-center space-x-3">
                {/* Voice Button */}
                <motion.button
                  onClick={startVoiceRecognition}
                  disabled={isListening}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3.5 rounded-xl transition-all shadow-lg backdrop-blur-md border-2 ${
                    isListening
                      ? 'bg-gradient-to-r from-red-900 to-red-800 border-red-700 animate-pulse shadow-red-900/60'
                      : 'bg-gradient-to-r from-[#00080f] to-[#000510] border-blue-900/50 hover:from-[#000c15] hover:to-[#00080f]'
                  }`}
                  title="Voice input"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </motion.button>

                {/* Text Input */}
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isListening ? 'Listening...' : 'Type your message...'}
                  disabled={isLoading || isListening}
                  className="flex-1 px-5 py-3.5 bg-[#00080f]/80 border-2 border-blue-900/40 rounded-xl text-white placeholder-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 disabled:bg-[#000510]/40 disabled:cursor-not-allowed backdrop-blur-sm font-bold transition-all"
                />

                {/* Send Button */}
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white p-3.5 rounded-xl hover:from-blue-800 hover:via-blue-700 hover:to-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg border-2 border-blue-700/50"
                  style={{
                    boxShadow: !input.trim() ? 'none' : '0 0 20px rgba(15, 40, 90, 0.6)'
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
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
