import React from 'react';

const SwotSection = ({ type, items, color, icon = "•" }) => (
  <div className={`p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border-2 ${color} backdrop-blur-sm hover:shadow-md transition-all duration-300`}>
    <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
      <span className="text-sm sm:text-base md:text-lg">{icon}</span>
      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wide opacity-90 truncate">
        {type}
      </h4>
    </div>
    <ul className="space-y-1.5 sm:space-y-2 md:space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="text-xs sm:text-sm flex items-start gap-2 sm:gap-3">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-current rounded-full mt-1.5 sm:mt-2 opacity-60 flex-shrink-0" />
          <span className="leading-relaxed sm:leading-loose flex-1">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default SwotSection;