import { WeatherData } from "@/types";
import WeatherImage from "./WeatherImage";

interface ShowDisplayDataProps {
  weatherData: WeatherData | undefined;
}

export default function ShowDisplayData({ weatherData }: ShowDisplayDataProps) {
  const temperature = weatherData?.currentConditions?.temp ?? 0;
  const feelsLike = weatherData?.days?.feelslike ?? 0;

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

      <div className="absolute flex top-1/3 translate-y-28  lg:top-1/2 lg:-translate-y-5 translate-x-6 text-4xl text-orange-500">
        {temperature >= 0
          ? `+${Math.round(temperature)}`
          : `${Math.round(temperature)}`}
        <span className=" text-xl">°C</span>
        <p className="relative right-16 text-xs mt-4 translate-y-8 text-gray-700 ">
          feelsLike{" "}
          {feelsLike >= 0
            ? `${Math.floor(temperature)}`
            : `${Math.floor(temperature)}`}
        </p>
      </div>
    </div>
  );
}
