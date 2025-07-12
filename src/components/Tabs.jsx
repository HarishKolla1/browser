import React, {useState} from "react";

const Tabs = ({tabs, activeTabId,onTabClick, onNewTab}) => {
  return(
    <div className="bg-zinc-700 border-b p2 flex justify-between items-center" 
    style={{WebkitAppRegion: 'drag'}}>

      <div className="flex space-x-1" style={{WebkitAppRegion: 'no-drag'}}>
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
      <div className="flex space-x-1" style={{WebkitAppRegion: 'no-drag'}}>
        <button onClick={() => window.electronAPI.minimize()}
        className="w-8 h-8 text-white hover:bg-gray-600 rounded">
          -
        </button>

        <button onClick={() => window.electronAPI.maximize()} className="w-8 h-8 text-white hover:bg-gray-600 rounded">
          o
        </button>

        <button onClick={() => window.electronAPI.close()} className="w-8 h-8 text-red-400 hover:bg-red-600 rounded">
          ✕
        </button>
      </div>
    </div>
  );
};

export default Tabs;