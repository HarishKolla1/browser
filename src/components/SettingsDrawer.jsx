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
  PhotoIcon,
} from "@heroicons/react/24/outline";

import HistoryDrawer from "./HistoryDrawer";
import DownloadsDrawer from "./DownloadsDrawer";
import BookmarksDrawer from "./BookmarksDrawer";
import ExtensionsDrawer from "./ExtensionsDrawer";
import BackgroundManager from "./BackgroundManager";

const SettingsPanel = ({ isOpen, onClose }) => (
  <div
    className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div className="flex items-center justify-between p-4 border-b">
      <h2 className="text-lg font-semibold">Settings</h2>
      <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
        <XMarkIcon className="h-6 w-6 text-gray-600" />
      </button>
    </div>
    <div className="p-4">
      <p className="text-gray-700">Settings content goes here...</p>
    </div>
  </div>
);

const AboutDrawer = ({ isOpen, onClose }) => (
  <div
    className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div className="flex items-center justify-between p-4 border-b">
      <h2 className="text-lg font-semibold">About</h2>
      <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
        <XMarkIcon className="h-6 w-6 text-gray-600" />
      </button>
    </div>
    <div className="p-4">
      <p className="text-gray-700">This is a custom browser built with Electron & React.</p>
    </div>
  </div>
);

const menuItems = [
  { name: "New Tab", icon: <PlusIcon className="h-5 w-5" /> },
  { name: "History", icon: <ClockIcon className="h-5 w-5" /> },
  { name: "Downloads", icon: <ArrowDownTrayIcon className="h-5 w-5" /> },
  { name: "Bookmarks", icon: <BookmarkIcon className="h-5 w-5" /> },
  { name: "Extensions", icon: <PuzzlePieceIcon className="h-5 w-5" /> },
  { name: "Change Background", icon: <PhotoIcon className="h-5 w-5" /> },
  { name: "Settings", icon: <Cog6ToothIcon className="h-5 w-5" /> },
  { name: "About", icon: <InformationCircleIcon className="h-5 w-5" /> },
];

const SettingsDrawer = ({ open, onClose, onSetBackground }) => {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [extensionsOpen, setExtensionsOpen] = useState(false);
  const [backgroundOpen, setBackgroundOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const currentTabs = [
    { title: "Google", url: "https://google.com" },
    { title: "YouTube", url: "https://youtube.com" },
  ];
  const recentlyClosed = [{ title: "StackOverflow", url: "https://stackoverflow.com" }];
  const historyData = [
    { title: "React Docs", url: "https://react.dev" },
    { title: "Tailwind Docs", url: "https://tailwindcss.com" },
  ];

  return (
    <>
      {/* Main Settings Drawer */}
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
                if (item.name === "History") setHistoryOpen(true);
                else if (item.name === "Downloads") setDownloadsOpen(true);
                else if (item.name === "Bookmarks") setBookmarksOpen(true);
                else if (item.name === "Extensions") setExtensionsOpen(true);
                else if (item.name === "Change Background") setBackgroundOpen(true);
                else if (item.name === "Settings") setSettingsOpen(true);
                else if (item.name === "About") setAboutOpen(true);
              }}
            >
              {item.icon}
              <span className="text-gray-800 font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Nested Drawers */}
      {historyOpen && (
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
      )}

      {downloadsOpen && (
        <DownloadsDrawer isOpen={downloadsOpen} onClose={() => setDownloadsOpen(false)} />
      )}

      {bookmarksOpen && (
        <BookmarksDrawer isOpen={bookmarksOpen} onClose={() => setBookmarksOpen(false)} />
      )}

      {extensionsOpen && (
        <ExtensionsDrawer isOpen={extensionsOpen} onClose={() => setExtensionsOpen(false)} />
      )}

      {backgroundOpen && (
        <BackgroundManager
          isOpen={backgroundOpen}
          onClose={() => setBackgroundOpen(false)}
          onSetBackground={onSetBackground}
        />
      )}

      {/* {settingsOpen && (
        < isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      )} */}

      {aboutOpen && (
        <AboutDrawer isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
      )}
    </>
  );
};

export default SettingsDrawer;
