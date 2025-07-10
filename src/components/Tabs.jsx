import React, {useState} from "react";

const Tabs = ({tabs, activeTabId,onTabClick, onNewTab}) => {
  return(
    <div className="bg-gray-100 border-b p2 flex space-x-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabClick(tab.id)}
          className={`px-4 py-1 rounded ${tab.id === activeTabId ? 'bg-white border-b-2 border-blue-500' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          {tab.title}
        </button>
      ))}
      <button onClick={onNewTab} className="px-4 py-1 rounded bg-neutral-400 hover:bg-neutral-500 text-white rounded">
        +
      </button>
    </div>
  );
};

export default Tabs;