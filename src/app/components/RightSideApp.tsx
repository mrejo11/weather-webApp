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
  if(!weatherData){
    return <div className="hidden lg:flex  absolute justify-center lg:w-[600px] lg:h-[300px] p-4  lg:top-[25vh] lg:left-[40vh] bg-gray-200 lg:rounded-xl lg:text-xl text-orange-500">
      <div className="text-xl text-orange-600 translate-y-[120px]">For see To show Data Please Enter a city</div>
    </div>
  }
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
        <div className="absolute lg:-translate-x-12 lg:scale-75 xl:scale-100 mb-3 translate-y-[800px]  flex items-center justify-center lg:h-full  lg:left-[60vh] lg:w-[600px] lg:top-52 lg:translate-y-0 ">
          <TemperatureCurveChart weatherData={weatherData} />
        </div>
      </div>
    <div className="relative">
      <div className="absolute lg:top-[250] xl:top-[350px] lg:-translate-x-36 xl:translate-x-0 lg:scale-75 xl:scale-100">
        <div className="absolute top-[200px] mt-16 lg:mt-7 lg:top-16 lg:m-5 ">
        <h1 className="text-2xl font-bold ">Daily Forcast</h1>
        </div>
        <WeatherDaysForcast weatherData={weatherData}/>
      </div>
      </div>
      {/* <div className="absolute top-[2100px]">all copy Right</div> */}
    </>
  );
}
