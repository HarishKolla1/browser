import React from 'react';
import HomeSearchBar from './HomeSearchBar';

const LogoScreen = ({ onSearch }) => {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className="bg-white p-4 rounded shadow">
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"         
          alt='Logo'
          className='w-40 mb-4'
        />
        <p className='text-gray-500 text-lg'>Search with AI-powered browser</p>
      </div>

      {/* New home search bar below logo */}
      <HomeSearchBar onSearch={onSearch} />

    </div>
  );
};

export default LogoScreen;