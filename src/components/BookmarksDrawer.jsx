import React from "react";
import { XMarkIcon, BookmarkIcon } from "@heroicons/react/24/outline";

const sampleBookmarks = [
  { name: "Google", url: "https://google.com" },
  { name: "YouTube", url: "https://youtube.com" },
  { name: "GitHub", url: "https://github.com" }
];

const BookmarksDrawer = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <BookmarkIcon className="h-5 w-5" /> Bookmarks
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Bookmarks list */}
      <div className="p-4 space-y-3 overflow-y-auto h-full">
        {sampleBookmarks.map((bookmark, index) => (
          <div
            key={index}
            className="border rounded-lg p-3 hover:bg-gray-50 transition cursor-pointer"
            onClick={() => window.electronAPI.openURL(bookmark.url)}
          >
            <p className="font-medium text-gray-800">{bookmark.name}</p>
            <p className="text-sm text-blue-600">{bookmark.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarksDrawer;
