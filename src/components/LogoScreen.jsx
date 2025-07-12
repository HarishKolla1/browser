import React from 'react';
import HomeSearchBar from './HomeSearchBar';
import WebsiteShortcuts from './WebsiteShortcuts';
import WeatherWidget from './WeatherWidget';
import NewsSection from './NewsSection';

const LogoScreen = ({ onSearch, onShortcutClick }) => {
  return (
    <div className="flex flex-col items-center justify-start h-full bg-gray-50 pt-4 overflow-auto">
      {/* Weather widget first, aligned left */}
      <div className="w-full flex">
        <WeatherWidget />
      </div>

      <div className="bg-white p-4 rounded shadow mt-4">
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"         
          alt='Logo'
          className='w-40 mb-4'
        />
        <p className='text-gray-500 text-lg'>Search with AI-powered browser</p>
      </div>

      <HomeSearchBar onSearch={onSearch} />
      <WebsiteShortcuts onShortcutClick={onShortcutClick} />

      <NewsSection />
    </div>
  );
};

export default LogoScreen;
