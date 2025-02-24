import { WeatherData } from "@/types";
import { WiRaindrop,  } from "react-icons/wi";
import { GoDotFill } from "react-icons/go";



interface ShowDisplayDataProps {
  weatherData: WeatherData | undefined;
}
export default function ShowDeatilData({ weatherData }: ShowDisplayDataProps) {
  const temperature = weatherData?.currentConditions?.temp ?? 0;
  const dewPoint = weatherData?.currentConditions?.dew ?? 20;
  const pressure = weatherData?.currentConditions?.pressure ?? 1013;
  const cloudCover = weatherData?.currentConditions?.cloudcover ?? 0;
  const windSpeed = weatherData?.currentConditions?.windspeed ?? 0;
const humidity=weatherData?.currentConditions?.humidity??0;
const uvIndex=weatherData?.currentConditions?.uvindex??0;
  const rainChance = Math.abs(
    (dewPoint - temperature) * 3 +
      0.2 * cloudCover -
      0.01 * (pressure - 1013) +
      0.1 * windSpeed
  );
  return (
    <>
      <div className="absolute flex gap-20 top-1/2 ml-4 translate-y-16 lg:translate-y-20">
          <div className="translate-x-2  text-xl">
            Rain Chanse
          </div>
          <div className="flex items-center translate-x-4 lg:translate-x-4 text-xl"> < WiRaindrop className={rainChance>=50?" flex items-center w-6 h-6 text-blue-500":"flex items-center w-6 h-6 text-gray-500"} />{`${Math.floor(rainChance)}%`}</div>
      </div>

      <div className="absolute flex gap-20 top-1/2 ml-4 translate-y-28 lg:mt-4 lg:translate-y-28">
          <div className="translate-x-2  text-xl">
            Speed Wind
          </div>
          <div className="flex items-center translate-x-4  lg:translate-x-4 text-xl"><GoDotFill className="flex items-center w-6 h-6 text-green-600"/>{`${windSpeed}km/h`}</div>
      </div>

      <div className="absolute flex gap-20 top-1/2 ml-3 mt-3 translate-y-36 lg:mt-7 lg:translate-y-36">
          <div className="translate-x-3  text-xl">
            Hiumidity
          </div>
          <div className="flex items-center translate-x-10 lg:translate-x-10 text-xl"><GoDotFill className="flex items-center w-6 h-6 text-yellow-500"/>{`${humidity}%`}</div>
      </div>

      <div className="absolute flex gap-20 top-1/2 ml-3 mt-6 translate-y-44 lg:mt-10 lg:translate-y-44">
          <div className="translate-x-3  text-xl">
            UV Index
          </div>
          <div className="flex items-center translate-x-11 lg:translate-x-11 text-xl"><GoDotFill className={uvIndex<=5?" flex items-center w-6 h-6 text-green-500":"flex items-center w-6 h-6 text-red-800"}/>{`${uvIndex}`}</div>
      </div>

      <div className="absolute flex gap-20 top-1/2 ml-3 mt-8 translate-y-52 lg:mt-14 lg:translate-y-52">
          <div className="translate-x-3  text-xl">
            Pressure
          </div>
          <div className="flex items-center translate-x-12 lg:translate-x-12 text-xl"><GoDotFill className="flex items-center w-6 h-6 text-blue-500"/>{`${pressure}mb`}</div>
      </div>
    </>
  );
}
