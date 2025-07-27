import React, { useState } from "react";
import {
  XMarkIcon,
  PlusIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  PuzzlePieceIcon,
  InformationCircleIcon,
  BookmarkIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";

import HistoryDrawer from "./HistoryDrawer";
import DownloadsDrawer from "./DownloadsDrawer";
import BookmarksDrawer from "./BookmarksDrawer";
import ExtensionsDrawer from "./ExtensionsDrawer";
import BrowserSettingsDrawer from "./BrowserSettingsDrawer";
import AboutDrawer from "./AboutDrawer";

const menuItems = [
  { name: "New Tab", icon: <PlusIcon className="h-5 w-5" /> },
  { name: "History", icon: <ClockIcon className="h-5 w-5" /> },
  { name: "Downloads", icon: <ArrowDownTrayIcon className="h-5 w-5" /> },
  { name: "Bookmarks", icon: <BookmarkIcon className="h-5 w-5" /> },
  { name: "Extensions", icon: <PuzzlePieceIcon className="h-5 w-5" /> },
  { name: "Settings", icon: <Cog6ToothIcon className="h-5 w-5" /> },
  { name: "About", icon: <InformationCircleIcon className="h-5 w-5" /> }
];

const SettingsDrawer = ({ open, onClose, onSelect }) => {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [extensionsOpen, setExtensionsOpen] = useState(false);
  const [browserSettingsOpen, setBrowserSettingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);

  const currentTabs = [
    { title: "Google", url: "https://google.com" },
    { title: "YouTube", url: "https://youtube.com" }
  ];
  const recentlyClosed = [{ title: "StackOverflow", url: "https://stackoverflow.com" }];
  const historyData = [
    { title: "React Docs", url: "https://react.dev" },
    { title: "Tailwind Docs", url: "https://tailwindcss.com" }
  ];

  if (historyOpen) {
    return (
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        currentTabs={currentTabs}
        recentlyClosed={recentlyClosed}
        history={historyData}
        onTabClick={(tab) => console.log("Open tab:", tab)}
        onRestoreClosed={(tab) => console.log("Restore tab:", tab)}
        onHistoryClick={(item) => console.log("History item:", item)}
      />
    );
  }

  if (downloadsOpen) {
    return <DownloadsDrawer isOpen={downloadsOpen} onClose={() => setDownloadsOpen(false)} />;
  }

  if (bookmarksOpen) {
    return <BookmarksDrawer isOpen={bookmarksOpen} onClose={() => setBookmarksOpen(false)} />;
  }

  if (extensionsOpen) {
    return <ExtensionsDrawer isOpen={extensionsOpen} onClose={() => setExtensionsOpen(false)} />;
  }

  if (browserSettingsOpen) {
    return <BrowserSettingsDrawer isOpen={browserSettingsOpen} onClose={() => setBrowserSettingsOpen(false)} />;
  }

  if (aboutOpen) {
  return <AboutDrawer isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />;
}

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Menu Buttons */}
      <div className="p-4 space-y-2">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition"
            onClick={() => {
              if (item.name === "History") setHistoryOpen(true);
              else if (item.name === "Downloads") setDownloadsOpen(true);
              else if (item.name === "Bookmarks") setBookmarksOpen(true);
              else if (item.name === "Extensions") setExtensionsOpen(true);
              else if (item.name === "Settings") setBrowserSettingsOpen(true);
              else if (item.name === "About") setAboutOpen(true);
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
