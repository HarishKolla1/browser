import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const menuItems = [
  { name: "New Tab" },
  { name: "History" },
  {  name: "Bookmarks" },
  { name: "Downloads" },
  { name: "Extensions" },
    { name: "Settings" },
  { name: "About" }
];

const SettingsDrawer = ({ open, onClose, onSelect }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Settings</h2>
        <button onClick={onClose}>
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <div className="p-4 space-y-2">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className="w-full text-left px-2 py-2 rounded hover:bg-gray-100 transition"
            onClick={() => onSelect(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsDrawer;
