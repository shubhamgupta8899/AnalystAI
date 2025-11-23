import React from 'react';
import { X } from 'lucide-react';

const SettingsModal = ({ apiKey, setApiKey, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 w-full max-w-xs sm:max-w-md md:max-w-lg rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 transform transition-all scale-100 mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">
            Agent Settings
          </h3>
          <button 
            onClick={onClose}
            className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
              Gemini API Key
            </label>
            <input 
              type="password" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste your API Key here..."
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 sm:mt-3 leading-relaxed">
              Leave empty to use <strong className="text-gray-700 dark:text-gray-300">Simulation Mode</strong> (perfect for demos and testing).
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <button 
              onClick={onClose}
              className="flex-1 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm sm:text-base transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Save Configuration
            </button>
            <button 
              onClick={onClose}
              className="flex-1 py-2.5 sm:py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;