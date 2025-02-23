
import { WeatherData } from "@/types";
import WeatherImage from "./WeatherImage";
interface ShowDisplayDataProps {
  weatherData: WeatherData | undefined;
 
}

export default function ShowDisplayData({ weatherData }: ShowDisplayDataProps) {
  const temperature = weatherData?.currentConditions?.temp ?? 0;
  const dewPoint = weatherData?.currentConditions?.dew ?? 20;
  const pressure = weatherData?.currentConditions?.pressure ?? 1013;
  const cloudCover = weatherData?.currentConditions?.cloudcover ?? 0;
  const windSpeed = weatherData?.currentConditions?.windspeed ?? 0;
  const feelsLike=weatherData?.days?.feelslike ??0
  const rainChance = Math.abs(
    (dewPoint - temperature) * 3 +
      0.2 * cloudCover -
      0.01 * (pressure - 1013) +
      0.1 * windSpeed
  );

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
      <WeatherImage weatherData={weatherData}/>

      <div className="absolute flex  top-1/2 -translate-y-5 translate-x-6 text-4xl text-orange-500">
        {temperature>=0 ?`+${Math.round(temperature)}`:`${Math.round(temperature)}`}
        <span className=" text-xl">°C</span>
        <p className="relative right-16 text-xs mt-4 translate-y-8 text-gray-700 ">feelsLike {feelsLike>=0?`${Math.floor(temperature)}`:`${Math.floor(temperature)}`}</p>
      </div>
    </div>
  );
}
