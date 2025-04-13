import SunriseSunset from "./sunriseSunset";
import { WeatherData } from "@/types";
import TemperatureCurveChart from "./TemperatureCurveChart";
import WeatherDaysForcast from "./WeatherDaysForcast";
import { WiRaindrop, WiStrongWind, WiHumidity, WiDaySunny, WiBarometer } from "react-icons/wi";
import { FaTemperatureHigh, FaTemperatureLow, FaCloudRain, FaWind, FaSun, FaMoon } from "react-icons/fa";
import { MdVisibility, MdWaterDrop } from "react-icons/md";
import { TbUvIndex } from "react-icons/tb";

interface ShowDisplayDataRight {
  weatherData: WeatherData | undefined;
}

export default function RightSideApp({ weatherData }: ShowDisplayDataRight) {
  const sunRise = weatherData?.currentConditions?.sunrise ?? "";
  const sunSet = weatherData?.currentConditions?.sunset ?? "";
  const sunsetEpoch = weatherData?.currentConditions?.sunsetEpoch ?? 0;
  
  // Extract current weather data
  const currentTemp = weatherData?.currentConditions?.temp ?? 0;
  const feelsLike = weatherData?.currentConditions?.feelslike ?? 0;
  const humidity = weatherData?.currentConditions?.humidity ?? 0;
  const windSpeed = weatherData?.currentConditions?.windspeed ?? 0;
  const pressure = weatherData?.currentConditions?.pressure ?? 0;
  const uvIndex = weatherData?.currentConditions?.uvindex ?? 0;
  const cloudCover = weatherData?.currentConditions?.cloudcover ?? 0;
  const conditions = weatherData?.currentConditions?.conditions ?? "";
  
  // Calculate rain chance
  const dewPoint = weatherData?.currentConditions?.dew ?? 20;
  const rainChance = Math.abs(
    (dewPoint - currentTemp) * 3 +
    0.2 * cloudCover -
    0.01 * (pressure - 1013) +
    0.1 * windSpeed
  );

  if(!weatherData){
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center text-gray-600 py-12">
          <p className="text-xl">Please enter a city to view weather data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Weather Card */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Current Weather</h2>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-5xl font-bold">{Math.round(currentTemp)}°C</p>
            <p className="text-lg">Feels like {Math.round(feelsLike)}°C</p>
          </div>
          <div className="text-4xl">
            {conditions.toLowerCase().includes('rain') ? <FaCloudRain /> : 
             conditions.toLowerCase().includes('cloud') ? <FaCloudRain /> : 
             <WiDaySunny />}
          </div>
        </div>
        <p className="text-xl mb-2">{conditions}</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center">
            <WiHumidity className="text-2xl mr-2" />
            <span>Humidity: {humidity}%</span>
          </div>
          <div className="flex items-center">
            <WiStrongWind className="text-2xl mr-2" />
            <span>Wind: {windSpeed} km/h</span>
          </div>
          <div className="flex items-center">
            <WiBarometer className="text-2xl mr-2" />
            <span>Pressure: {pressure} mb</span>
          </div>
          <div className="flex items-center">
            <TbUvIndex className="text-2xl mr-2" />
            <span>UV Index: {uvIndex}</span>
          </div>
        </div>
      </div>

      {/* Sunrise/Sunset Card */}
      <SunriseSunset
        sunriseTime={sunRise}
        sunsetTime={sunSet}
        sunsetEpoch={sunsetEpoch}
      />

      {/* Temperature Chart */}
      <TemperatureCurveChart weatherData={weatherData} />

      {/* Daily Forecast */}
      <WeatherDaysForcast weatherData={weatherData} />
    </div>
  );
}
