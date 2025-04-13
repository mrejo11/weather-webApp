import { WeatherData } from "@/types";
import WeatherImage from "./WeatherImage";

interface ShowDisplayDataProps {
  weatherData: WeatherData | undefined;
}

export default function ShowDisplayData({ weatherData }: ShowDisplayDataProps) {
  const temperature = weatherData?.currentConditions?.temp ?? 0;
  const feelsLike = weatherData?.currentConditions?.feelslike ?? 0;
  const conditions = weatherData?.currentConditions?.conditions ?? "Unknown";
  const humidity = weatherData?.currentConditions?.humidity ?? 0;
  const windSpeed = weatherData?.currentConditions?.windspeed ?? 0;
  const uvIndex = weatherData?.currentConditions?.uvindex ?? 0;

  return (
    <div className="relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-indigo-600/20 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Location and date */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {weatherData?.resolvedAddress?.split(",")[0] || "Location"}
          </h2>
          <p className="text-gray-600">
            {weatherData?.currentConditions?.datetimeEpoch
              ? new Date(weatherData.currentConditions.datetimeEpoch * 1000).toLocaleString("en", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })
              : "Today"}
          </p>
        </div>

        {/* Weather image and temperature */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-4">
            <WeatherImage weatherData={weatherData} />
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-5xl font-bold text-gray-800">
                {temperature >= 0 ? `+${Math.round(temperature)}` : `${Math.round(temperature)}`}
              </span>
              <span className="text-2xl text-gray-600">°C</span>
            </div>
            <p className="text-gray-600 mb-2">Feels like {Math.round(feelsLike)}°C</p>
            <p className="text-xl font-medium text-gray-700">{conditions}</p>
          </div>
        </div>

        {/* Weather details */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-50 rounded-lg p-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">UV Index</p>
              <p className="font-medium text-gray-800">{uvIndex}</p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Humidity</p>
              <p className="font-medium text-gray-800">{humidity}%</p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Conditions</p>
              <p className="font-medium text-gray-800">{conditions}</p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Wind Speed</p>
              <p className="font-medium text-gray-800">{windSpeed} km/h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
