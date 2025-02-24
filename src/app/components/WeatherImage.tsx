import { WeatherData } from "@/types";
import Image from "next/image";
import rany from "../../../public/rany.jpg";
import snow from "../../../public/snow.jpg";
import sunny from "../../../public/sunny.jpg";
import cloud from "../../../public/cloud.jpg"
import PartyCloudeNight from "../../../public/partly-cloudy-night.jpg"
import PartyCloudeDay from "../../../public/partly-cloudy-day.jpg"
import Error from "../../../public/Error.jpg"
import wind from "../../../public/wind.jpg"
import fog from "../../../public/fog.jpg"
import clearNight from "../../../public/clear-night.jpg"

interface ShowDisplayDataProps {
  weatherData: WeatherData | undefined ;
}


export default function WeatherImage({ weatherData }:ShowDisplayDataProps) {
    const weatherSource=weatherData?.currentConditions?.icon;

    let imageSource;
  if(weatherSource==='rain'){
    imageSource=rany
  }else if(weatherSource==='cloudy'){
    imageSource=cloud
  }else if(weatherSource==='snow'){
    imageSource=snow
  }else if(weatherSource==='partly-cloudy-day'){
    imageSource=PartyCloudeDay
  }else if(weatherSource==='partly-cloudy-night'){
    imageSource=PartyCloudeNight
  }else if(weatherSource==='clear-day'){
    imageSource=sunny
  }else if(weatherSource==='clear-night'){
    imageSource=clearNight
  }else if(weatherSource==='wind'){
    imageSource=wind
  }else if(weatherSource==='fog'){
    imageSource=fog
  }else if(weatherSource==='partly-cloudy-night'){
    imageSource=PartyCloudeNight
  }else{
    imageSource=Error
  }
    
  return (
    <>
    <div className="absolute w-[150px] top-40 mt-2 lg:top-1/4">
      <Image className="rounded-lg " src={imageSource} alt="weather" />
      <p className="flex justify-center mt-2">{weatherData?.currentConditions?.conditions}</p>
    </div>
    </>
  );
}
