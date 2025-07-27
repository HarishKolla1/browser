import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const AboutDrawer = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">About</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* About Content */}
      <div className="p-4 space-y-4">
        <p className="text-gray-700">
          <strong>My Browser</strong> v1.0.0
        </p>
        <p className="text-gray-600">
          This browser is built using React, Electron, and Tailwind CSS.
        </p>
        <p className="text-gray-600">
          © 2025 My Browser Project. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AboutDrawer;
