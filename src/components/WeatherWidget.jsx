import React from 'react';

const WeatherWidget = () => {
  // Mock data for now
  const city = "Hyderabad";
  const temperature = "32°C";
  const icon = "☀️";

  return (
    <div className="ml-4 mt-4 bg-white/80 backdrop-blur-md border rounded-lg shadow p-3 flex items-center space-x-2 w-48">
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="font-medium">{temperature}</p>
        <p className="text-sm text-gray-600">{city}</p>
      </div>
    </div>
  );
};

export default WeatherWidget;
