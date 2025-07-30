import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

const predefinedWallpapers = [
    "https://source.unsplash.com/1600x900/?nature,water",
  "https://source.unsplash.com/1600x900/?mountains",
  "https://source.unsplash.com/1600x900/?city,night",
  "https://source.unsplash.com/1600x900/?forest",
  "https://source.unsplash.com/1600x900/?technology",
];

const BackgroundManager = ({ isOpen, onClose, onSetBackground }) => {
    const [customImage, setCustomImage] = useState("");

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCustomImage(event.target.result);
                onSetBackground(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

  return (
    <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
            isOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
        
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b'>
            <h2 className='text-lg font-semibold'>Change Background</h2>
            <button onClick={onClose} className='p-2 hover:bg-gray-100 rounded'>
                <XMarkIcon className='h-6 w-6 text-gray-600' />
            </button>
        </div>

        {/*content*/}
        <div className='p-4 space-y-4'>
            <h3 className='font-medium text-gray-700'>Predefined Wallpapers</h3>
            <div className='gird grid-cols-2 gap-3'>
                {predefinedWallpapers.map((url, idx) =>(
                    <button 
                        key={idx}
                        className='rounded overflow-hidden hover:opacity-80 transition'
                        onClick={() => onSetBackground(url)}
                    >
                        <img src={url} alt='Wallpaper' className='w-full h-20 object-cover' />
                    </button>
                )
                )}
            </div>

        <div>
            <label className='block text-gray-700 font-medium mb-2'>Upload Custom Image</label>
            <input type="file" accept='image/*' onChange={handleFileUpload} className='w-full' />
        </div>

        <button 
            onClick={() => onSetBackground("")}
            className='flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition'
        >
            <ArrowPathIcon className='h-5 w-5' />
            Reset Background
        </button>
        </div>
    </div>
  );
};

export default BackgroundManager;