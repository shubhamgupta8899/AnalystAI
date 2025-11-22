import React from 'react';
import { ChevronRight } from 'lucide-react';

const ChatOptions = ({ options, onSelect }) => (
  <div className="flex flex-wrap gap-2 mt-2 animate-in fade-in slide-in-from-bottom-1">
    {options.map((option, idx) => (
      <button
        key={idx}
        onClick={() => onSelect(option)}
        className="px-4 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full transition-colors flex items-center gap-1"
      >
        {option} <ChevronRight className="w-3 h-3 opacity-50" />
      </button>
    ))}
  </div>
);

export default ChatOptions;