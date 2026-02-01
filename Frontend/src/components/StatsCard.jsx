import React from 'react';

const StatsCards = ({ stats }) => {
   const items = [
    {
      label: 'Total',
      value: stats.total,
      classes: 'bg-indigo-50 text-indigo-600'
    },
    {
      label: 'Pending',
      value: stats.todo,
      classes: 'bg-slate-50 text-slate-600'
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      classes: 'bg-blue-50 text-blue-600'
    },
    {
      label: 'Completed',
      value: stats.completed,
      classes: 'bg-emerald-50 text-emerald-600'
    }
  ];
 
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map(item => (
        <div
          key={item.label}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.classes}`}
          >
            <span className="font-bold text-lg">{item.value}</span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};


export default StatsCards;