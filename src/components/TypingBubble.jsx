import React from 'react';

const TypingBubble = () => (
  <div className="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2 p-3 xs:p-3.5 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl xs:rounded-2xl sm:rounded-3xl rounded-tl-none w-fit max-w-xs sm:max-w-sm">
    <div 
      className="w-1.5 h-1.5 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" 
      style={{ animationDelay: '0ms' }} 
    />
    <div 
      className="w-1.5 h-1.5 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" 
      style={{ animationDelay: '150ms' }} 
    />
    <div 
      className="w-1.5 h-1.5 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" 
      style={{ animationDelay: '300ms' }} 
    />
  </div>
);

export default TypingBubble;