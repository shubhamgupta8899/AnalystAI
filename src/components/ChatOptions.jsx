import React from 'react';
import { ChevronRight } from 'lucide-react';

const ChatOptions = ({ options, onSelect }) => (
  <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 animate-in fade-in slide-in-from-bottom-1">
    {options.map((option, idx) => (
      <button
        key={idx}
        onClick={() => onSelect(option)}
        className="
          w-full sm:w-auto
          px-3 sm:px-4 
          py-2 sm:py-2
          bg-blue-50 hover:bg-blue-100 
          dark:bg-blue-900/20 dark:hover:bg-blue-900/40 
          border border-blue-200 dark:border-blue-800 
          text-blue-700 dark:text-blue-300 
          text-sm sm:text-xs
          font-medium 
          rounded-lg sm:rounded-full
          transition-colors 
          flex items-center justify-between sm:justify-center
          gap-1 sm:gap-2
        "
      >
        <span className="flex-1 sm:flex-none text-left sm:text-center">{option}</span>
        <ChevronRight className="w-3 h-3 sm:w-3 sm:h-3 opacity-50 flex-shrink-0" />
      </button>
    ))}
  </div>
);

export default ChatOptions;