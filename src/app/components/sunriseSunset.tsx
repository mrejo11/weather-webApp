'use client'
import { useState, useEffect } from "react";

interface SunriseSunsetProps {
  sunriseTime: string|undefined; 
  sunsetTime: string; 
  sunsetEpoch:number;
}

function SunriseSunset({ sunriseTime, sunsetTime,sunsetEpoch }: SunriseSunsetProps) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit",hour12:false }));
  const now=new Date()
  const currentTimeEpoch=Math.floor(now.getTime()/1000)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit",hour12:false }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col  translate-y-52 w-[40vh] h-full items-center justify-center lg:w-[50vh] lg:h-[40vh] lg:translate-y-0 bg-gray-100 rounded-lg shadow-md p-4">
      <div className="relative w-full h-[50vw] flex items-center justify-center">
        {/* مسیر منحنی حرکت خورشید */}
        <svg className="absolute inset-0 w-full h-full " viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet">
          <path
            d="M 10 40 Q 50 5 90 40"
            fill="none"
            stroke="#facc15" // رنگ زرد
            strokeWidth="1"
            strokeDasharray="2"
          />
          {/* خورشید */}
          <circle cx="50" cy="10" r="5" fill={sunsetEpoch===currentTimeEpoch?"#494444":"#facc15"} />
        </svg>

        {/* نمایش طلوع، زمان فعلی، غروب */}
        <div className="absolute left-4 bottom-4 text-sm sm:text-lg text-gray-600 font-medium">🌅 {sunriseTime}</div>
        <div className="absolute top-4 text-base sm:text-xl font-bold text-gray-800">⏳ {currentTime}</div>
        <div className="absolute right-4 bottom-4 text-sm sm:text-lg text-gray-600 font-medium">🌇 {sunsetTime}</div>
      </div>
    </div>
  );
}

export default SunriseSunset;

