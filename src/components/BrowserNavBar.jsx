import {
    ArrowPathIcon,
    BookmarkIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    Cog6ToothIcon,
    UserCircleIcon,
  } from '@heroicons/react/24/outline';
  import React from 'react';
  import SearchBar from './SearchBar';
  
  const BrowserNavBar = () => {
    return (
      <div className="flex flex-col w-full bg-zinc-500 border-b shadow-sm">
        <div className="flex items-center px-4 py-1.5 gap-2">
          {/* Navigation Buttons */}
          <button onClick={() => window.electronAPI.goBack()} className="p-1.5 rounded hover:bg-gray-200 transition">
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button onClick={() => window.electronAPI.goForward()} className="p-1.5 rounded hover:bg-gray-200 transition">
            <ChevronRightIcon className="h-5 w-5" />
          </button>
          <button onClick={() => window.electronAPI.reloadPage()} className="p-1.5 rounded hover:bg-gray-200 transition">
            <ArrowPathIcon className="h-5 w-5" />
          </button>
  
          {/* Search Bar container takes full remaining space */}
          <div className="flex items-center flex-1 min-w-0">
            <SearchBar
              onSearch={(query) => {
                console.log("Search:", query);
              }}
            />
  
            {/* Search engine selector button */}
            <button className="flex items-center px-3 py-1.5 border rounded-full hover:bg-gray-100 transition whitespace-nowrap ml-2 shrink-0">
              <span className="text-sm">Google</span>
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
  
          {/* Right side icons */}
          <button className="p-1.5 rounded hover:bg-gray-200 transition">
            <UserCircleIcon className="h-5 w-5" />
          </button>
          <button className="p-1.5 rounded hover:bg-gray-200 transition">
            <Cog6ToothIcon className="h-5 w-5" />
          </button>
          <button className="p-1.5 rounded hover:bg-gray-200 transition">
            <BookmarkIcon className="h-5 w-5" />
          </button>
        </div>
  
        {/* Placeholder bar */}
        <div className="w-full h-6 bg-zinc-500 flex items-center justify-center">
          <span className="text-gray-400 text-sm">[Placeholder for additional controls or information]</span>
        </div>
      </div>
    );
  };
  
  export default BrowserNavBar;
  