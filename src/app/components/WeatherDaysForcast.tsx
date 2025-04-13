"use client";
import { WeatherData } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { WiDaySunny, WiNightClear, WiRain, WiSnow, WiCloudy, WiFog, WiStrongWind } from "react-icons/wi";

interface WeatherDaysForcastProps {
  weatherData: WeatherData | undefined;
}

export default function WeatherDaysForcast({ weatherData }: WeatherDaysForcastProps) {
  const [activeTab, setActiveTab] = useState<'daily' | 'hourly'>('daily');

  if (!weatherData || !weatherData.days || weatherData.days.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-60 bg-gray-100 rounded-lg">
        <p className="text-xl p-4 text-gray-600">No forecast data available. Please enter a city to view forecast.</p>
      </div>
    );
  }

  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case 'clear-day':
        return <WiDaySunny className="w-10 h-10 text-yellow-500" />;
      case 'clear-night':
        return <WiNightClear className="w-10 h-10 text-indigo-400" />;
      case 'rain':
        return <WiRain className="w-10 h-10 text-blue-500" />;
      case 'snow':
        return <WiSnow className="w-10 h-10 text-blue-300" />;
      case 'cloudy':
        return <WiCloudy className="w-10 h-10 text-gray-500" />;
      case 'partly-cloudy-day':
        return <WiDaySunny className="w-10 h-10 text-yellow-400" />;
      case 'partly-cloudy-night':
        return <WiNightClear className="w-10 h-10 text-indigo-300" />;
      case 'wind':
        return <WiStrongWind className="w-10 h-10 text-gray-400" />;
      case 'fog':
        return <WiFog className="w-10 h-10 text-gray-300" />;
      default:
        return <WiDaySunny className="w-10 h-10 text-yellow-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const firstDay = weatherData.days[0];
  const hasHourlyData = firstDay && firstDay.hours && Array.isArray(firstDay.hours) && firstDay.hours.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Weather Forecast</h3>
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'daily' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('daily')}
          >
            Daily
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'hourly' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('hourly')}
          >
            Hourly
          </button>
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-4 min-w-max">
          {activeTab === 'daily' ? (
            weatherData.days.map((day, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-36 bg-gradient-to-b from-blue-50 to-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 mb-2">{formatDate(day.datetime)}</p>
                  <div className="flex justify-center mb-2">
                    {getWeatherIcon(day.icon)}
                  </div>
                  <div className="flex justify-center items-center space-x-2">
                    <span className="text-lg font-bold text-gray-800">{day.tempmax ? Math.round(day.tempmax) : 'N/A'}°</span>
                    <span className="text-sm text-gray-500">{day.tempmin ? Math.round(day.tempmin) : 'N/A'}°</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{day.conditions || 'N/A'}</p>
                </div>
              </div>
            ))
          ) : hasHourlyData && firstDay.hours ? (
            firstDay.hours.map((hour, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-28 bg-gradient-to-b from-blue-50 to-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow"
              >
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 mb-2">{formatTime(hour.datetime)}</p>
                  <div className="flex justify-center mb-2">
                    {getWeatherIcon(hour.icon)}
                  </div>
                  <p className="text-lg font-bold text-gray-800">{hour.temp ? Math.round(hour.temp) : 'N/A'}°</p>
                  <p className="text-xs text-gray-500 mt-1">{hour.conditions || 'N/A'}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-40">
              <p className="text-gray-500">No hourly data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
