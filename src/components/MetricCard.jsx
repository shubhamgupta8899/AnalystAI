import React from 'react';
import { DollarSign, PieChart, Briefcase, Globe, TrendingUp } from 'lucide-react';

const MetricCard = ({ label, value, trend, icon: Icon }) => {
  // Default icon if none provided
  const DefaultIcon = DollarSign;
  
  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider truncate pr-2">
          {label}
        </span>
        <div className="p-1.5 sm:p-2 bg-blue-50 dark:bg-blue-900/30 rounded-md sm:rounded-lg flex-shrink-0">
          {Icon ? (
            <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
          ) : (
            <DefaultIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
          )}
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white truncate">
          {value}
        </span>
        {trend && (
          <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex-shrink-0">
            <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600 dark:text-green-400" />
            <span className="text-xs font-semibold text-green-600 dark:text-green-400 hidden xs:inline">
              {trend}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;