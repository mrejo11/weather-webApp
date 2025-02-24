import { WeatherData } from "@/types";
import { WiRaindrop } from "react-icons/wi";


interface ShowDisplayDataProps {
  weatherData: WeatherData | undefined;
}
export default function ShowDeatilData({ weatherData }: ShowDisplayDataProps) {
  const temperature = weatherData?.currentConditions?.temp ?? 0;
  const dewPoint = weatherData?.currentConditions?.dew ?? 20;
  const pressure = weatherData?.currentConditions?.pressure ?? 1013;
  const cloudCover = weatherData?.currentConditions?.cloudcover ?? 0;
  const windSpeed = weatherData?.currentConditions?.windspeed ?? 0;

  const rainChance = Math.abs(
    (dewPoint - temperature) * 3 +
      0.2 * cloudCover -
      0.01 * (pressure - 1013) +
      0.1 * windSpeed
  );
  return (
    <>
      <div className="absolute flex gap-20 top-1/2 ml-4 lg:translate-y-20">
          <div className="translate-x-3  text-xl">
            Rain Chanse
          </div>
          <div className="flex items-center translate-x-20 lg:translate-x-10 text-xl"> < WiRaindrop className=" flex items-center w-6 h-6 text-blue-500" />{`${Math.floor(rainChance)}%`}</div>
      </div>
    </>
  );
}
