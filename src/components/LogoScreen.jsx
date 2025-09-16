import React from "react";
import HomeSearchBar from "./HomeSearchBar";
import WebsiteShortcuts from "./WebsiteShortcuts";
import WeatherWidget from "./WeatherWidget";
import NewsSection from "./NewsSection";

const LogoScreen = ({ onSearch, onShortcutClick, background }) => {
  return (
    <div
      className="relative flex flex-col items-center justify-start h-full pt-4 overflow-auto"
      style={{
        backgroundImage: background ? `url(${background})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Weather widget pinned top-left */}
      <div className="absolute top-4 left-4 w-64 md:w-52 sm:w-40">
        <WeatherWidget />
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center w-full max-w-4xl">
        <div className="p-4 rounded shadow mt-16">
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt="Logo"
            className="w-40 mb-4"
          />
          <p className="text-gray-500 text-lg">
            Search with AI-powered browser
          </p>
        </div>

        <HomeSearchBar onSearch={onSearch} />
        {/* Shortcuts exactly centered with search bar */}
        <div className="mt-4 flex justify-center w-full">
          <div className="max-w-lg w-full flex justify-center">
            <WebsiteShortcuts onShortcutClick={onShortcutClick} />
          </div>
        </div>


        {/* News below shortcuts on small screens */}
        <div className="block lg:hidden w-full px-4 mt-6">
          <NewsSection />
        </div>
      </div>

      {/* News on left below weather (only large screens) */}
      <div className="hidden lg:block absolute top-44 left-4 w-[22rem]">
        <NewsSection />
      </div>
    </div>
  );
};

export default LogoScreen;
