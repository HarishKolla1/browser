import React from 'react';

const websites = [
    { name: 'Google', url: 'https://www.google.com', icon: '🌐' },
    { name: 'YouTube', url: 'https://www.youtube.com', icon: '▶️' },
    { name: 'GitHub', url: 'https://www.github.com', icon: '🐱' },
    { name: 'Twitter', url: 'https://www.twitter.com', icon: '🐦' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com', icon: '💼' },
    { name: 'Add Shortcut', url: '#', icon: '+' },
];

const WebsiteShortcuts = ({ onShortcutClick }) => {
  return (
    <div className='grid grid-cols-3 sm:grid-cols-6 gap-4 mt-8 px-4'>
      {websites.map((site) => (
        <button 
          key={site.name}
          onClick={() => {
              if (onShortcutClick && site.url !== '#'){
                  onShortcutClick(site.url);
              }
          }}
          className='flex flex-col items-center p-2 rounded hover:bg-gray-100 transition'
        >
            <div className='flex items-center justify-center w-14 h-14 rounded-full bg-gray-200 text-2xl'>
                {site.icon}
            </div>
            <span className='mt-2 text-sm text-gray-700 truncate'>{site.name}</span>
        </button>
      ))}
    </div>
  );
};

export default WebsiteShortcuts;
