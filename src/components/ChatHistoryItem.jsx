import React from 'react';
import { motion } from 'framer-motion';

const ChatHistoryItem = ({ chat, isActive, onClick, onDelete }) => {
  // Get the last message for preview
  const lastMessage = chat.messages[chat.messages.length - 1];
  const preview = lastMessage ? lastMessage.text : 'No messages';
  
  // Truncate preview text
  const truncatedPreview = preview.length > 30 
    ? preview.substring(0, 30) + '...' 
    : preview;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="group relative"
    >
      <button
        onClick={onClick}
        className={`w-full text-left p-3 rounded-lg transition-all duration-200 
          group hover:bg-violet-50 dark:hover:bg-violet-500/10 
          ${isActive ? 'bg-violet-100 dark:bg-violet-500/20' : ''}`}
      >
        <div className="flex flex-col gap-1">
          <span className={`font-medium ${
            isActive ? 'text-violet-700 dark:text-violet-300' : 'text-gray-700 dark:text-gray-300'
          }`}>{chat.title}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {truncatedPreview}
          </span>
        </div>
      </button>
      
      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(chat.id);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100
          p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-500/10
          text-red-500 dark:text-red-400 transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
          strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
};

export default ChatHistoryItem;