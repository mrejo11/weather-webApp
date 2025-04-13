import { WeatherData } from "@/types";
import { WiRaindrop, WiStrongWind, WiHumidity, WiBarometer } from "react-icons/wi";
import { TbUvIndex } from "react-icons/tb";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";

interface ShowDisplayDataProps {
  weatherData: WeatherData | undefined;
}

export default function ShowDeatilData({ weatherData }: ShowDisplayDataProps) {
  const temperature = weatherData?.currentConditions?.temp ?? 0;
  const dewPoint = weatherData?.currentConditions?.dew ?? 20;
  const pressure = weatherData?.currentConditions?.pressure ?? 1013;
  const cloudCover = weatherData?.currentConditions?.cloudcover ?? 0;
  const windSpeed = weatherData?.currentConditions?.windspeed ?? 0;
  const humidity = weatherData?.currentConditions?.humidity ?? 0;
  const uvIndex = weatherData?.currentConditions?.uvindex ?? 0;
  const maxTemp = weatherData?.days?.[0]?.tempmax ?? 0;
  const minTemp = weatherData?.days?.[0]?.tempmin ?? 0;

  // Calculate rain chance
  const rainChance = Math.abs(
    (dewPoint - temperature) * 3 +
    0.2 * cloudCover -
    0.01 * (pressure - 1013) +
    0.1 * windSpeed
  );

  return (
    <div className="p-6 bg-gradient-to-b from-white to-blue-50">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Weather Details</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Rain Chance */}
        <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-2">
            <WiRaindrop className={`w-6 h-6 ${rainChance >= 50 ? "text-blue-500" : "text-gray-400"} mr-2`} />
            <span className="font-medium text-gray-700">Rain Chance</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
              <div 
                className={`h-2.5 rounded-full ${rainChance >= 50 ? "bg-blue-500" : "bg-blue-300"}`} 
                style={{ width: `${Math.min(rainChance, 100)}%` }}
              ></div>
            </div>
            <span className="text-lg font-bold text-gray-800">{Math.floor(rainChance)}%</span>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-2">
            <WiStrongWind className="w-6 h-6 text-green-500 mr-2" />
            <span className="font-medium text-gray-700">Wind Speed</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{windSpeed} <span className="text-sm font-normal text-gray-500">km/h</span></p>
        </div>

        {/* Humidity */}
        <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-2">
            <WiHumidity className="w-6 h-6 text-blue-400 mr-2" />
            <span className="font-medium text-gray-700">Humidity</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
              <div 
                className="h-2.5 rounded-full bg-blue-400" 
                style={{ width: `${humidity}%` }}
              ></div>
            </div>
            <span className="text-lg font-bold text-gray-800">{humidity}%</span>
          </div>
        </div>

        {/* UV Index */}
        <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-2">
            <TbUvIndex className={`w-6 h-6 ${uvIndex <= 5 ? "text-green-500" : "text-red-500"} mr-2`} />
            <span className="font-medium text-gray-700">UV Index</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{uvIndex}</p>
          <p className="text-xs text-gray-500">
            {uvIndex <= 2 ? "Low" : 
             uvIndex <= 5 ? "Moderate" : 
             uvIndex <= 7 ? "High" : 
             uvIndex <= 10 ? "Very High" : "Extreme"}
          </p>
        </div>

        {/* Pressure */}
        <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-2">
            <WiBarometer className="w-6 h-6 text-indigo-500 mr-2" />
            <span className="font-medium text-gray-700">Pressure</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{pressure} <span className="text-sm font-normal text-gray-500">mb</span></p>
        </div>

        {/* Temperature Range */}
        <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-2">
            <div className="flex mr-2">
              <FaTemperatureHigh className="w-5 h-5 text-red-500" />
              <FaTemperatureLow className="w-5 h-5 text-blue-500" />
            </div>
            <span className="font-medium text-gray-700">Temperature Range</span>
          </div>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-xs text-gray-500">High</p>
              <p className="text-lg font-bold text-red-500">{Math.round(maxTemp)}°C</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Low</p>
              <p className="text-lg font-bold text-blue-500">{Math.round(minTemp)}°C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
