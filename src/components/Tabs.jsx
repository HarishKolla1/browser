import React, {useState} from "react";

const Tabs = ({tabs, activeTabId,onTabClick, onNewTab}) => {
  return(
    <div className="bg-zinc-700 border-b p2 flex space-x-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabClick(tab.id)}
          className={`px-4 py-1 rounded ${tab.id === activeTabId ? 'bg-slate-300 border-b-2 border-slate-500' : 'bg-slate-300 hover:bg-slate-500'}`}
        >
          {tab.title}
        </button>
      ))}
      <button onClick={onNewTab} className="px-4 py-1 bg-neutral-400 hover:bg-neutral-500 text-white rounded">
        +
      </button>
    </div>
  );
};

export default Tabs;