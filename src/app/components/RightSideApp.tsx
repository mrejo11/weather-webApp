import SunriseSunset from "./sunriseSunset";
import { WeatherData } from "@/types";
import TemperatureCurveChart from "./TemperatureCurveChart";
import WeatherDaysForcast from "./WeatherDaysForcast";
interface ShowDisplayDataRight {
  weatherData: WeatherData | undefined;
}

export default function RightSideApp({ weatherData }: ShowDisplayDataRight) {
  const sunRise = weatherData?.currentConditions?.sunrise ?? "";
  const sunSet = weatherData?.currentConditions?.sunset ?? "";
  const sunsetEpoch = weatherData?.currentConditions?.sunsetEpoch ?? 0;
  if (!weatherData) {
    return (
      <div className="hidden lg:flex  absolute justify-center lg:w-[600px] lg:h-[300px] p-4  lg:top-[25vh] lg:left-[40vh] bg-gray-200 lg:rounded-xl lg:text-xl text-orange-500">
        <div className="text-xl text-orange-600 translate-y-[120px]">
          For see To show Data Please Enter a city
        </div>
      </div>
    );
  }
  // const tempMax = weatherData?.days?.tempmax ?? 0;
  // const labels = weatherData?.days?.datetime ?? "";
  // const tempMin = weatherData?.days?.tempmin ?? 0;
  return (
    <>
      <div className="absolute lg:left-[165vh] lg:top-[5vh]
      
        xl:left-[130vh] xl:top-[5vh]">
        <div className="">
        <SunriseSunset
          sunriseTime={sunRise}
          sunsetTime={sunSet}
          sunsetEpoch={sunsetEpoch}
        />
      </div>
      </div>

      <div className="relative">
        <div className=" ">
          <TemperatureCurveChart weatherData={weatherData} />
        </div>
      </div>
        <div>
          <div className="">
            <h1 className="text-2xl font-bold text-center">Daily Forecast</h1>
          </div>
          <WeatherDaysForcast weatherData={weatherData} />
          </div>
    </>
  );
}
