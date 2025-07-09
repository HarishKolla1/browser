import { ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';


const HomeSearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (onSearch && query.trim() !== "") {
            onSearch(query);
            setQuery(""); // Clear the input after search
        }
    };

  return (
    <div className='relative w-full max-w-xl mt-6 px-4'>
        <input 
            type='text'
            placeholder='Search or enter url'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            }}
            className='w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base'
        />
        <MagnifyingGlassIcon className='absolute left-10 top-1/2 h-5 w-5 text-gray-400 transform -translate-1/2' />
        {query.trim() !== '' && (
            <button 
                type='button'
                onClick={handleSearch}
                className='absolute right-6 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700'
            >
                <ArrowRightIcon className='h-5 w-5' />
            </button>
        )}
    </div>
  );
};

export default HomeSearchBar;