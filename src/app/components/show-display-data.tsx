import { WeatherData } from "@/types";
import WeatherImage from "./WeatherImage";

interface ShowDisplayDataProps {
  weatherData: WeatherData | undefined;
}

export default function ShowDisplayData({ weatherData }: ShowDisplayDataProps) {
  const temperature = weatherData?.currentConditions?.temp ?? 0;
  const feelsLike = weatherData?.currentConditions?.feelslike ??0;

  return (
    <div className="flex items-center justify-center">
      <div className="m-5 p-2 bg-green-300 rounded-xl shadow-lg">
        {weatherData?.resolvedAddress?.split(",")[0]}
      </div>
      <div className="p-2 bg-green-300 rounded-xl shadow-lg">
        {weatherData?.currentConditions?.datetimeEpoch
          ? `Today, ${new Date(
              weatherData?.currentConditions?.datetimeEpoch * 1000
            ).toLocaleString("en", {
              month: "long",
              day: "numeric",
            })}`
          : null}
      </div>
      <WeatherImage weatherData={weatherData} />

      <div className="absolute flex flex-col items-center top-[50vh] text-4xl text-orange-500">
        <div className="flex items-center gap-1">
          {temperature >= 0
            ? `+${Math.round(temperature)}`
            : `${Math.round(temperature)}`}
          <span className="text-xl">°C</span>
        </div>
        <p className="text-xs text-gray-700">
          feelsLike{" "}
          {feelsLike}
        </p>
      </div>
    </div>
  );
}
