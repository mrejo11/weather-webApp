import SunriseSunset from "./sunriseSunset";
import { WeatherData } from "@/types";
import TemperatureCurveChart from "./TemperatureCurveChart";
interface ShowDisplayDataRight {
  weatherData: WeatherData | undefined;
}

export default function RightSideApp({ weatherData }: ShowDisplayDataRight) {
  const sunRise = weatherData?.currentConditions?.sunrise ?? "";
  const sunSet = weatherData?.currentConditions?.sunset ?? "";
  const sunsetEpoch = weatherData?.currentConditions?.sunsetEpoch ?? 0;
  // const tempMax = weatherData?.days?.tempmax ?? 0;
  // const labels = weatherData?.days?.datetime ?? "";
  // const tempMin = weatherData?.days?.tempmin ?? 0;
  return (
    <>
      <div className="absolute bottom-14 m-5 w-auto h-auto lg:top-0 ">
        <SunriseSunset
          sunriseTime={sunRise}
          sunsetTime={sunSet}
          sunsetEpoch={sunsetEpoch}
        />
      </div>
      <div className="relative">
        <div className="absolute  mb-3 translate-y-[800px]  -translate-x-4 flex items-center justify-center  lg:h-full  lg:left-[60vh] lg:w-[600px] lg:top-60 lg:translate-y-0">
          <TemperatureCurveChart weatherData={weatherData} />
        </div>
      </div>
    </>
  );
}
