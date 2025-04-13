'use client'
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

interface SunriseSunsetProps {
  sunriseTime: string|undefined; 
  sunsetTime: string; 
  sunsetEpoch: number;
}

function SunriseSunset({ sunriseTime, sunsetTime, sunsetEpoch }: SunriseSunsetProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isDaytime, setIsDaytime] = useState<boolean>(true);
  const [sunPosition, setSunPosition] = useState<number>(50);

  useEffect(() => {
    // Set initial values
    const updateTimeAndPosition = () => {
      const now = new Date();
      const currentTimeEpoch = Math.floor(now.getTime()/1000);
      
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
      setIsDaytime(currentTimeEpoch < sunsetEpoch);
      
      // Calculate sun position
      if (sunriseTime && sunsetTime) {
        const sunriseParts = sunriseTime.split(':');
        const sunsetParts = sunsetTime.split(':');
        
        const sunriseMinutes = parseInt(sunriseParts[0]) * 60 + parseInt(sunriseParts[1]);
        const sunsetMinutes = parseInt(sunsetParts[0]) * 60 + parseInt(sunsetParts[1]);
        
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        
        if (currentMinutes < sunriseMinutes) {
          setSunPosition(0);
        } else if (currentMinutes > sunsetMinutes) {
          setSunPosition(100);
        } else {
          const totalDayMinutes = sunsetMinutes - sunriseMinutes;
          const elapsedMinutes = currentMinutes - sunriseMinutes;
          setSunPosition((elapsedMinutes / totalDayMinutes) * 100);
        }
      }
    };
    
    // Initial update
    updateTimeAndPosition();
    
    // Set up interval for updates
    const interval = setInterval(updateTimeAndPosition, 60000);
    
    return () => clearInterval(interval);
  }, [sunriseTime, sunsetTime, sunsetEpoch]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Sun Schedule</h3>
      
      <div className="relative h-48 mb-6">
        {/* Sky gradient background */}
        <div className={`absolute inset-0 rounded-lg ${isDaytime ? 'bg-gradient-to-b from-blue-100 to-blue-200' : 'bg-gradient-to-b from-indigo-900 to-blue-900'}`}></div>
        
        {/* Sun path */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-1 bg-yellow-200/30 rounded-full"></div>
        </div>
        
        {/* Sun */}
        <div 
          className="absolute w-8 h-8 rounded-full bg-yellow-400 shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
          style={{ 
            left: `${sunPosition}%`,
            top: '50%',
            boxShadow: isDaytime ? '0 0 20px 5px rgba(255, 255, 0, 0.5)' : '0 0 20px 5px rgba(255, 255, 255, 0.3)',
            backgroundColor: isDaytime ? '#fbbf24' : '#f3f4f6'
          }}
        ></div>
        
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-800 to-green-600 rounded-b-lg"></div>
      </div>
      
      {/* Time indicators */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center">
          <FaSun className="text-yellow-500 text-xl mb-1" />
          <p className="text-sm text-gray-600">Sunrise</p>
          <p className="font-medium text-gray-800">{sunriseTime || '--:--'}</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-600 mb-1">Current</div>
          <p className="font-medium text-gray-800">{currentTime || '--:--'}</p>
        </div>
        
        <div className="flex flex-col items-center">
          <FaMoon className="text-indigo-400 text-xl mb-1" />
          <p className="text-sm text-gray-600">Sunset</p>
          <p className="font-medium text-gray-800">{sunsetTime || '--:--'}</p>
        </div>
      </div>
    </div>
  );
}

export default SunriseSunset;


