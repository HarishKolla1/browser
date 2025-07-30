import React, { useState } from "react";
import {
  XMarkIcon,
  PlusIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  PuzzlePieceIcon,
  InformationCircleIcon,
  BookmarkIcon,
  Cog6ToothIcon,
  PhotoIcon // <-- ADD THIS ICON
} from "@heroicons/react/24/outline";

import HistoryDrawer from "./HistoryDrawer";
import DownloadsDrawer from "./DownloadsDrawer";
import BookmarksDrawer from "./BookmarksDrawer";
import ExtensionsDrawer from "./ExtensionsDrawer";
import BackgroundManager from "./BackgroundManager"; // <-- IMPORT

const menuItems = [
  { name: "New Tab", icon: <PlusIcon className="h-5 w-5" /> },
  { name: "History", icon: <ClockIcon className="h-5 w-5" /> },
  { name: "Downloads", icon: <ArrowDownTrayIcon className="h-5 w-5" /> },
  { name: "Bookmarks", icon: <BookmarkIcon className="h-5 w-5" /> },
  { name: "Extensions", icon: <PuzzlePieceIcon className="h-5 w-5" /> },
  { name: "Change Background", icon: <PhotoIcon className="h-5 w-5" /> }, // <-- NEW
  { name: "Settings", icon: <Cog6ToothIcon className="h-5 w-5" /> },
  { name: "About", icon: <InformationCircleIcon className="h-5 w-5" /> }
];

const SettingsDrawer = ({ open, onClose, onSelect, onSetBackground }) => {
  const [backgroundOpen, setBackgroundOpen] = useState(false);

  if (backgroundOpen) {
    return (
      <BackgroundManager
        isOpen={backgroundOpen}
        onClose={() => setBackgroundOpen(false)}
        onSetBackground={onSetBackground}
      />
    );
  }

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="p-4 space-y-2">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition"
            onClick={() => {
              if (item.name === "Change Background") setBackgroundOpen(true);
              else if (onSelect) onSelect(item.name);
            }}
          >
            {item.icon}
            <span className="text-gray-800 font-medium">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsDrawer;
