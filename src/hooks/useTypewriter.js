import { useState, useEffect } from 'react';

/**
 * Custom hook for creating a typewriter effect
 * @param {string} text - The text to animate
 * @param {number} speed - The speed of typing in milliseconds
 * @param {boolean} shouldAnimate - Whether to animate the text
 */
export const useTypewriter = (text, speed = 30, shouldAnimate = true) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    let i = 0;
    setDisplayedText('');
    setIsTyping(true);

    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, shouldAnimate]);

  return { displayedText, isTyping };
};