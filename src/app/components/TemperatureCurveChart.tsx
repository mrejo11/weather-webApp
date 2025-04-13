"use client";
import { WeatherData } from "@/types";
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from "recharts";
import { TooltipProps } from "recharts/types/component/Tooltip";
import { useState } from "react";

interface ShowDisplayDataRight {
  weatherData: WeatherData | undefined;
}

export default function TemperatureChart({ weatherData }: ShowDisplayDataRight) {
  const [activeTab, setActiveTab] = useState<'temp' | 'feels'>('temp');

  if (!weatherData || !weatherData.days) {
    return (
      <div className="flex items-center justify-center w-full h-60 bg-gray-100 rounded-lg">
        <p className="text-xl p-4 text-gray-600">No data available. Please enter a city to view temperature data.</p>
      </div>
    );
  }

  // Format the data for the chart
  const chartData = weatherData.days.map((day) => ({
    date: new Date(day.datetime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    temp: day.temp || 0,
    feelsLike: day.feelslike || 0,
    maxTemp: day.tempmax || 0,
    minTemp: day.tempmin || 0,
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-blue-600">Temperature: {payload[0].value}°C</p>
          <p className="text-purple-600">Feels Like: {payload[1].value}°C</p>
          <p className="text-green-600">Max: {payload[2].value}°C</p>
          <p className="text-red-600">Min: {payload[3].value}°C</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Temperature Forecast</h3>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 rounded-md text-sm ${activeTab === 'temp' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('temp')}
          >
            Temperature
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm ${activeTab === 'feels' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('feels')}
          >
            Feels Like
          </button>
        </div>
      </div>
      
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorFeels" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey={activeTab === 'temp' ? "temp" : "feelsLike"} 
              stroke={activeTab === 'temp' ? "#3b82f6" : "#8b5cf6"} 
              fillOpacity={1} 
              fill={activeTab === 'temp' ? "url(#colorTemp)" : "url(#colorFeels)"} 
              strokeWidth={2}
              name={activeTab === 'temp' ? "Temperature" : "Feels Like"}
            />
            <Line 
              type="monotone" 
              dataKey="maxTemp" 
              stroke="#10b981" 
              strokeWidth={1.5} 
              dot={false}
              name="Max Temperature"
            />
            <Line 
              type="monotone" 
              dataKey="minTemp" 
              stroke="#ef4444" 
              strokeWidth={1.5} 
              dot={false}
              name="Min Temperature"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
