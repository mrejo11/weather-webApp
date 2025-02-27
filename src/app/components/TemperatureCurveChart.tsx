"use client";
import { WeatherData } from "@/types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Label } from "recharts";

interface ShowDisplayDataRight {
  weatherData: WeatherData | undefined;
}

export default function TemperatureChart({ weatherData }: ShowDisplayDataRight) {
  if (!weatherData || !weatherData.days) {
    return <div className="flex items-center w-full h-60 translate-x-44"><p className="text-xl p-4 bg-cyan-300 items-center">There is no data For Show Please Enter a City</p></div>;
  }

  // in rechart js for get dynamic data to show on display we use this way remember
  const chartData = weatherData.days.map((day) => ({
    time: day.datetime || "Unknown",
    temp: day.temp || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey="time">
          <Label value="Date Time" offset={-5} position="insideBottom" style={{ textAnchor: "middle" }} />
        </XAxis>
        <XAxis dataKey="time" />
        <YAxis>
        <Label value="Tempreture" offset={-5} position="center" style={{ textAnchor: "middle" }} angle={-90}/>
        </YAxis>
        <Tooltip />
        <Line type="monotone" dataKey="temp" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
