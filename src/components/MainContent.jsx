import React from 'react';
import LogoScreen from './LogoScreen';

const MainContent = ({ query, url, onSearch }) => {

    if (query && query.trim() !== "") {
        return (
            <div className='flex items-center justify-center h-full'>
                <p className='text-gray-600 text-lg'>Loading: <span className='font-medium'>{query}</span></p>
            </div>
        );
    }

    if (url && url.trim() !== "") {
      return (
        <div className='flex items-center justify-center h-full'>
          <p className='text-gray-600 text-lg'>Opening URL: <span className='font-medium'>{url}</span></p>
        </div>
      );
    }

  return (
    <LogoScreen onSearch={onSearch} />
  );
};

export default MainContent;