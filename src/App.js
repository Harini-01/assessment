import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './contexts/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import ChatBubble from './components/ChatBubble';
import TypingBubble from './components/TypingBubble';
import ResizeHandle from './components/ResizeHandle';
import ChatHistoryItem from './components/ChatHistoryItem';
import EmptyState from './components/EmptyState';
import logo from './assets/images/logo.png';

// Minimum and maximum sidebar widths
const MIN_SIDEBAR_WIDTH = 200;
const MAX_SIDEBAR_WIDTH = 480;
const DEFAULT_SIDEBAR_WIDTH = 260;

function App() {
  // Theme and state management
  const { theme, isDark, toggleTheme } = useTheme();
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  
  // Refs
  const messagesEndRef = useRef(null);
  const sidebarRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Resize event handlers
  useEffect(() => {
    if (!isResizing) return;

    const handleResize = (e) => {
      const newWidth = e.clientX;
      if (newWidth > MIN_SIDEBAR_WIDTH && newWidth < MAX_SIDEBAR_WIDTH) {
        setSidebarWidth(newWidth);
      }
    };

    const handleResizeEnd = () => setIsResizing(false);

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);

    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing]);

  const handleResizeStart = () => {
    setIsResizing(true);
  };

  const handleDeleteChat = (chatId) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    
    if (currentChatId === chatId) {
      setCurrentChatId(null);
      setMessages([]);
      setInput('');
      setIsTyping(false);
    }
  };

  // Chat management functions
  const handleNewChat = () => {
    const newChatId = Date.now();
    const newChat = {
      id: newChatId,
      title: `Chat ${chatHistory.length + 1}`,
      messages: [{ from: 'bot', text: 'Hi! How can I help you today?' }]
    };
    
    setChatHistory(prev => [...prev, newChat]);
    setCurrentChatId(newChatId);
    setMessages(newChat.messages);
    setInput('');
    setIsTyping(false);
  };

  const switchChat = (chatId) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
      setInput('');
      setIsTyping(false);
    }
  };

  // Message handling
  const handleSend = () => {
    if (!input.trim()) return;
    
    if (!currentChatId) {
      initializeNewChat();
      return;
    }

    sendMessage();
  };

  const initializeNewChat = () => {
    const newChatId = Date.now();
    const newChat = {
      id: newChatId,
      title: `Chat ${chatHistory.length + 1}`,
      messages: [
        { from: 'bot', text: 'Hi! How can I help you today?' },
        { from: 'user', text: input }
      ]
    };
    
    updateChatState(newChat, newChatId);
    simulateBotResponse(newChat, newChatId);
  };

  const sendMessage = () => {
    const userMsg = { from: 'user', text: input };
    const updatedMessages = [...messages, userMsg];
    
    updateChatState({ messages: updatedMessages }, currentChatId);
    simulateBotResponse({ messages: updatedMessages }, currentChatId);
  };

  // Helper functions
  const updateChatState = (chat, chatId) => {
    if (!chat.id) {
      setMessages(chat.messages);
      setChatHistory(prev => prev.map(c => 
        c.id === chatId ? { ...c, messages: chat.messages } : c
      ));
    } else {
      setChatHistory(prev => [...prev, chat]);
      setCurrentChatId(chatId);
      setMessages(chat.messages);
    }
    
    setInput('');
    setIsTyping(true);
  };

  const simulateBotResponse = (chat, chatId) => {
    setTimeout(() => {
      const botResponse = { from: 'bot', text: 'This is a dummy bot response.' };
      const finalMessages = [...chat.messages, botResponse];
      
      setMessages(finalMessages);
      setChatHistory(prev => prev.map(c => 
        c.id === chatId ? { ...c, messages: finalMessages } : c
      ));
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="h-screen flex bg-[#F5F3FF] dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar with dynamic width */}
      <div 
        ref={sidebarRef}
        style={{ width: isSidebarOpen ? `${sidebarWidth}px` : '0px' }}
        className={`fixed md:relative inset-y-0 left-0 transform
        transition-all duration-200 ease-in-out overflow-hidden
        bg-[#F5F3FF] dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col 
        border-r border-violet-200 dark:border-gray-700 z-30 relative`}
      >
        <div className={`h-full flex flex-col`} style={{ width: `${sidebarWidth}px` }}>
          <div className="p-4 border-b border-violet-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <button 
              onClick={handleNewChat}
              className="w-full bg-violet-100 hover:bg-violet-200 dark:bg-violet-500/10 dark:hover:bg-violet-500/20 rounded-lg p-3 flex items-center gap-3 transition-colors duration-200 text-violet-700 dark:text-violet-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New Chat
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-3">
              Chat History {chatHistory.length > 0 && `(${chatHistory.length})`}
            </h2>
            <div className="space-y-1">
              <AnimatePresence>
                {chatHistory.map(chat => (
                  <ChatHistoryItem
                    key={chat.id}
                    chat={chat}
                    isActive={currentChatId === chat.id}
                    onClick={() => switchChat(chat.id)}
                    onDelete={handleDeleteChat}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Add resize handle */}
        {isSidebarOpen && <ResizeHandle onMouseDown={handleResizeStart} />}
      </div>

      {/* Add visual feedback during resize */}
      {isResizing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 cursor-col-resize" />
      )}

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-200 ease-in-out">
        {/* Header */}
        <header className="h-14 border-b border-violet-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm flex items-center px-4">
          <div className="flex items-center gap-3">
            {/* Hamburger menu button - visible on all screen sizes */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-violet-50 dark:hover:bg-gray-700 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-5 h-5 text-violet-600 dark:text-violet-400">
                {isSidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
            <img 
              src={logo} 
              alt="Chatbot Logo" 
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-violet-500 via-violet-500 to-violet-400 bg-clip-text text-transparent dark:from-violet-400 dark:via-violet-400 dark:to-violet-300">
              Genoshi Chat
            </h1>
          </div>
          <div className="flex-1 flex items-center justify-end">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-violet-50 dark:hover:bg-gray-700">
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-violet-200">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-violet-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto bg-[#F5F3FF] dark:bg-gray-900">
          <AnimatePresence mode="wait">
            {!currentChatId ? (
              <EmptyState key="empty" />
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto p-4 space-y-4"
              >
                {messages.map((msg, index) => (
                  <ChatBubble 
                    key={index}
                    text={msg.text} 
                    from={msg.from} 
                    animate={msg.from === 'bot'}
                  />
                ))}
                {isTyping && <TypingBubble />}
                <div ref={messagesEndRef} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className={`border-t border-violet-200 dark:border-gray-700 bg-white/50 
          dark:bg-gray-800/50 backdrop-blur-sm p-4 transition-opacity duration-200
          ${!currentChatId ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                className="w-full rounded-lg border border-violet-200 dark:border-gray-700 pl-4 pr-12 py-3 
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                          focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500
                          transition-colors duration-200"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              />
              <button
                className={`absolute right-2 top-1/2 -translate-y-1/2 
                           ${input.trim() 
                             ? 'text-violet-500 dark:text-violet-400' 
                             : 'text-gray-400 dark:text-gray-500'
                           } transition-colors duration-200`}
                onClick={handleSend}
                disabled={!input.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
