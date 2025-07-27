import React from "react";
import { XMarkIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const sampleDownloads = [
  { name: "file1.pdf", size: "2.3 MB", status: "Completed" },
  { name: "video.mp4", size: "120 MB", status: "In Progress" },
  { name: "image.png", size: "3.1 MB", status: "Completed" }
];

const DownloadsDrawer = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ArrowDownTrayIcon className="h-5 w-5" /> Downloads
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Downloads list */}
      <div className="p-4 space-y-3 overflow-y-auto h-full">
        {sampleDownloads.map((file, index) => (
          <div
            key={index}
            className="border rounded-lg p-3 hover:bg-gray-50 transition"
          >
            <p className="font-medium text-gray-800">{file.name}</p>
            <p className="text-sm text-gray-500">
              {file.size} • {file.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadsDrawer;
