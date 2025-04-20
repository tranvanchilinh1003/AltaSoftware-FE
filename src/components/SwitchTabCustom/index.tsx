import React from 'react';
import { Tab, SwitchTabCustomProps } from './type';

const SwitchTabCustom = ({ className, tabs, activeTab, onTabChange }: SwitchTabCustomProps) => {
  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center bg-gray-100 rounded-full p-1 w-fit">
        {tabs.map((tab: Tab) => (
          <button
            key={tab.value}
            className={`px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap ${className} ${
              activeTab === tab.value ? 'bg-black text-white shadow-md' : 'text-gray-500'
            }`}
            onClick={() => onTabChange?.(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* 
      Trang cha thêm đoạn
      <div className="mt-4">{tabs.find((tab) => tab.value === activeTab)?.content}</div> 
      */}
    </div>
  );
};

export default SwitchTabCustom;
