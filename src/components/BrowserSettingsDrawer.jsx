import React, { useState } from "react";
import { XMarkIcon, AdjustmentsHorizontalIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const BrowserSettingsDrawer = ({ isOpen, onClose }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
          Settings
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Settings List */}
      <div className="p-4 space-y-4 overflow-y-auto h-full">
        {/* Dark mode toggle */}
        <div className="flex items-center justify-between">
          <span className="text-gray-800 font-medium flex items-center gap-2">
            {darkMode ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
            Dark Mode
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 flex items-center rounded-full transition ${
              darkMode ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                darkMode ? "translate-x-6" : "translate-x-1"
              }`}
            ></span>
          </button>
        </div>

        {/* Example settings */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Startup</h3>
          <select className="border rounded px-2 py-1 w-full">
            <option>Open New Tab</option>
            <option>Continue where you left off</option>
            <option>Open specific pages</option>
          </select>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Search Engine</h3>
          <select className="border rounded px-2 py-1 w-full">
            <option>Google</option>
            <option>Bing</option>
            <option>DuckDuckGo</option>
            <option>Yahoo</option>
          </select>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Privacy</h3>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4" />
            <span>Send Do Not Track Requests</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default BrowserSettingsDrawer;
