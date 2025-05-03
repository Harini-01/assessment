import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo.png';

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="h-full flex flex-col items-center justify-center p-8 text-center"
  >
    <div className="w-32 h-32 mb-8 relative">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="w-full h-full rounded-full flex items-center justify-center"
      >
        <img 
          src={logo} 
          alt="Chatbot Logo" 
          className="w-24 h-24 object-contain"
        />
      </motion.div>
    </div>
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      Welcome to Genoshi Chat
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
      Start a new conversation by clicking the{' '}
      <span className="text-violet-600 dark:text-violet-400 font-medium">New Chat</span> button or continue with an existing chat. 
      {/* in the top left corner
      <motion.span
        animate={{ x: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="inline-block ml-2"
      >
        ←
      </motion.span> */}
    </p>
    {/* <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
      Your chat history will appear in the sidebar
    </div> */}
  </motion.div>
);

export default EmptyState;