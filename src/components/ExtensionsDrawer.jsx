import React from "react";
import { XMarkIcon, PuzzlePieceIcon } from "@heroicons/react/24/outline";

const sampleExtensions = [
  { name: "Adblock Plus", description: "Blocks ads and trackers" },
  { name: "Grammarly", description: "Grammar and spell checker" },
  { name: "React Developer Tools", description: "Debug React apps easily" }
];

const ExtensionsDrawer = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <PuzzlePieceIcon className="h-5 w-5" /> Extensions
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Extensions list */}
      <div className="p-4 space-y-3 overflow-y-auto h-full">
        {sampleExtensions.map((ext, index) => (
          <div
            key={index}
            className="border rounded-lg p-3 hover:bg-gray-50 transition cursor-pointer"
          >
            <p className="font-medium text-gray-800">{ext.name}</p>
            <p className="text-sm text-gray-600">{ext.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtensionsDrawer;
