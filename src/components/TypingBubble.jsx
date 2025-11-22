import React from 'react';

const TypingBubble = () => (
  <div className="flex items-center space-x-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none w-fit">
    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
);

export default TypingBubble;