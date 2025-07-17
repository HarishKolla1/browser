import React, {useEffect, useState} from "react";

const Tabs = ({ tabs, activeTabId,setActiveTabId}) => {

  const handleTabSwitch =(id) =>{
    window.electronAPI?.switchTab(id);
    setActiveTabId(id);
  }

  const handleTabClose =(e,id) =>{
    e.stopPropagation();
    window.electronAPI?.closeTab(id);
  }

  return(
    <div className="bg-zinc-700 border-b p-2 flex justify-between items-center" 
    style={{WebkitAppRegion: 'drag'}}>

      <div className="flex space-x-1" style={{WebkitAppRegion: 'no-drag'}}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabSwitch(tab.id)}
            className={`px-4 py-1 rounded ${tab.id === activeTabId ? 'bg-slate-300 border-b-2 border-slate-500' : 'bg-slate-300 hover:bg-slate-500'}`}
          >
            {tab.title || "New Tab"}
            <span className="ml-2 text-red-400 hover:text-red-600" onClick={(e) => {
              handleTabClose(e,tab.id)
            }}>✕</span>
          </button>
        ))}
        <button onClick={() => window.electronAPI.newTab()} className="px-4 py-1 bg-neutral-400 hover:bg-neutral-500 text-white rounded">
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