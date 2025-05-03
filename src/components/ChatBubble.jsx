import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';
import logo from '../assets/images/logo.png';

const ChatBubble = ({ text, from, messageId, animate = true }) => {
  const isUser = from === 'user';
  // Remove hasAnimated state and directly use a ref to track animation
  const hasAnimatedRef = useRef(false);
  const { displayedText, isTyping } = useTypewriter(
    text, 
    messageId, // Pass unique message ID
    30, 
    // Only animate if not already shown
    !hasAnimatedRef.current && !isUser && animate
  );

  // Update ref when typing is complete
  useEffect(() => {
    if (!isTyping) {
      hasAnimatedRef.current = true;
    }
  }, [isTyping]);

  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const BotIcon = () => (
    <img 
      src={logo} 
      alt="Bot" 
      className="w-5 h-5 object-contain"
    />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "backOut" }}
      className={`group flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div className={`flex items-end gap-2 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full flex-shrink-0 ${
          isUser 
            ? 'bg-gradient-to-br from-violet-500 to-violet-600' 
            : 'bg-gradient-to-br from-violet-100 to-violet-200 dark:from-violet-500/20 dark:to-violet-500/30'
        } flex items-center justify-center shadow-sm`}>
          {isUser ? (
            <span className="text-white font-medium">U</span>
          ) : (
            <div className="w-5 h-5 flex items-center justify-center">
              <img 
                src={logo} 
                alt="Bot" 
                className="w-4 h-4 object-contain"
              />
            </div>
          )}
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`px-4 py-3 rounded-2xl relative ${
            isUser 
              ? 'bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500 text-white rounded-br-none shadow-lg' 
              : 'bg-white dark:bg-gray-800 rounded-bl-none shadow-sm'
          }`}
        >
          <div className="relative">
            <p className={`text-[15px] leading-normal ${!isUser && 'text-gray-800 dark:text-white'}`}>
              {/* Show full text if user message or already animated */}
              {isUser || hasAnimatedRef.current ? text : displayedText}
              {!isUser && animate && !hasAnimatedRef.current && isTyping && (
                <span className="ml-1 animate-pulse">▊</span>
              )}
            </p>
            
            <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className={`text-xs ${isUser ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                {timestamp}
              </span>
            </div>
          </div>

          {/* Action buttons with improved positioning */}
          <div className={`absolute top-1/2 -translate-y-1/2 ${
            isUser ? '-left-24' : '-right-24'  // Increased distance from bubble
          } opacity-0 group-hover:opacity-100 transition-opacity flex gap-2.5`}  // Increased gap between buttons
          >
            <button className="p-2 hover:bg-violet-100 dark:hover:bg-gray-700 rounded-full 
              transition-colors duration-200 bg-white dark:bg-gray-800 shadow-sm"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>
            <button className="p-2 hover:bg-violet-100 dark:hover:bg-gray-700 rounded-full 
              transition-colors duration-200 bg-white dark:bg-gray-800 shadow-sm"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChatBubble;
