import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { chatWithAI } from '../utils/zhipuAI';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const AIChatWidget = () => {
  const [panelSize, setPanelSize] = useState<'closed' | 'normal' | 'maximized'>('closed');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: '你好！我是 ZLION 的 AI 助手，代表预见未来社区的观点。这里可以聊关于前沿科技、创意设计、政治哲学。欢迎你和我联系，我的wechat是iamzlion，WhatsApp是+86 19313023693，邮箱为z3531908677@gmail.com' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithAI(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，AI 服务暂时不可用。请稍后重试。'
      }]);
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

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setPanelSize(panelSize === 'closed' ? 'normal' : 'closed')}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center shadow-[0_0_30px_rgba(0,242,255,0.4)] group"
      >
        <MessageCircle className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
        <span className="absolute -top-10 right-0 bg-black border border-white/10 px-3 py-1 rounded text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          AI Chat
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {panelSize !== 'closed' && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-16 sm:bottom-20 right-3 sm:right-4 z-50 bg-black/95 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] ${
              panelSize === 'normal'
                ? 'w-[300px] h-[460px] sm:w-[340px] sm:h-[480px]'
                : 'w-[340px] h-[580px] sm:w-[440px] sm:h-[620px]'
            } max-w-[calc(100vw-2rem)] max-h-[70dvh] sm:max-h-[85vh]`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-white">AI Assistant</h3>
                  <p className="text-[10px] text-gray-500">智谱AI · 在线</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <button
                  onClick={() => setPanelSize(panelSize === 'normal' ? 'maximized' : 'normal')}
                  className="p-1.5 rounded hover:bg-white/10 transition-colors text-gray-500 hover:text-white"
                  title={panelSize === 'normal' ? '放大' : '缩小'}
                >
                  {panelSize === 'normal' ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setPanelSize('closed')}
                  className="p-1.5 hover:text-neon-blue transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-neon-blue/20 text-white border border-neon-blue/30'
                        : 'bg-white/5 text-gray-300 border border-white/10'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl">
                    <Loader2 className="w-5 h-5 text-neon-blue animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="输入消息..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-12 h-12 rounded-full bg-neon-blue flex items-center justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;