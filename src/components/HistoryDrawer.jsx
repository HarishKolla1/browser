import React from "react";

const HistoryDrawer = ({
  isOpen,
  onClose,
  currentTabs = [],
  recentlyClosed = [],
  history = [],
  onTabClick,
  onRestoreClosed,
  onHistoryClick,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Tabs & History</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          ✖
        </button>
      </div>

      <div className="p-4 space-y-6 overflow-y-auto h-full">
        {/* Current Tabs */}
        <div>
          <h3 className="text-md font-semibold mb-2">Current Tabs</h3>
          {currentTabs.length ? (
            <ul className="space-y-2">
              {currentTabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => onTabClick(tab)}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                  >
                    {tab.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No open tabs</p>
          )}
        </div>

        {/* Recently Closed */}
        <div>
          <h3 className="text-md font-semibold mb-2">Recently Closed</h3>
          {recentlyClosed.length ? (
            <ul className="space-y-2">
              {recentlyClosed.map((tab, index) => (
                <li key={index} className="flex justify-between">
                  <button
                    onClick={() => onRestoreClosed(tab)}
                    className="text-left px-3 py-2 flex-1 rounded hover:bg-gray-100"
                  >
                    {tab.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recently closed tabs</p>
          )}
        </div>

        {/* History */}
        <div>
          <h3 className="text-md font-semibold mb-2">Browsing History</h3>
          {history.length ? (
            <ul className="space-y-2">
              {history.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => onHistoryClick(item)}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                  >
                    {item.title || item.url}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No browsing history</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryDrawer;
