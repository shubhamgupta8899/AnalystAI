import React from 'react';

const SwotSection = ({ type, items, color, icon = "•" }) => (
  <div className={`p-4 rounded-xl border-2 ${color} backdrop-blur-sm`}>
    <div className="flex items-center gap-2 mb-3">
      <span className="text-base">{icon}</span>
      <h4 className="text-sm font-bold uppercase tracking-wide opacity-90">{type}</h4>
    </div>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-sm flex items-start gap-2">
          <span className="w-1.5 h-1.5 bg-current rounded-full mt-2 opacity-60 flex-shrink-0" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default SwotSection;