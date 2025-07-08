import { ArrowPathIcon, BookmarkIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, Cog6ToothIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import SearchBar from './SearchBar';

const BrowserNavBar = () => {
  return (
    <div className='flex items-center gap-2 px-4 py-2  bg-white border-b shadow-sm'>
        {/* Navigation Buttons */}
        <button className='p-2 rounded hover:bg-gray-200 transition'>
            <ChevronLeftIcon className='h-5 w-5' />
        </button>

        <button className='p-2 rounded hover:bg-gray-200 transition'>
            <ChevronRightIcon className='h-5 w-5' />
        </button>

        <button className='p-2 rounded hover:bg-gray-200 transition'>
            <ArrowPathIcon className='h-5 w-5' />
        </button>

        {/* Search Bar */}
        <div className='flex flex-1 items-center gap-2'>
            <SearchBar 
                onSearch={(query) => {
                    console.log("Search:", query);
                }}
            />

            {/* Search engine selector */}

            <button className='flex items-center px-3 py-2 border rounded-full hover:bg-gray-100 transition'>
                <span className='text-sm'>Google</span>
                <ChevronDownIcon className='h-4 w-4 ml-1' />
            </button>
        </div>

        {/* Right side icons */}
        <button className='p-2 rounded hover:bg-gray-200 transition'>
            <UserCircleIcon className='h-5 w-5' />
        </button>

        <button className='p-2 rounded hover:bg-gray-200 transition'>
            <Cog6ToothIcon className='h-5 w-5' />
        </button>

        <button className='p-2 rounded hover:bg-gray-200 transition'>
            <BookmarkIcon className='h-5 w-5' />
        </button>
    </div>
  )
}

export default BrowserNavBar;