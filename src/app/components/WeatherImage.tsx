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
  weatherData: WeatherData | undefined;
}

export default function WeatherImage({ weatherData }: ShowDisplayDataProps) {
  const weatherSource = weatherData?.currentConditions?.icon;
  const conditions = weatherData?.currentConditions?.conditions || "Unknown";

  let imageSource;
  if (weatherSource === 'rain') {
    imageSource = rany;
  } else if (weatherSource === 'cloudy') {
    imageSource = cloud;
  } else if (weatherSource === 'snow') {
    imageSource = snow;
  } else if (weatherSource === 'partly-cloudy-day') {
    imageSource = PartyCloudeDay;
  } else if (weatherSource === 'partly-cloudy-night') {
    imageSource = PartyCloudeNight;
  } else if (weatherSource === 'clear-day') {
    imageSource = sunny;
  } else if (weatherSource === 'clear-night') {
    imageSource = clearNight;
  } else if (weatherSource === 'wind') {
    imageSource = wind;
  } else if (weatherSource === 'fog') {
    imageSource = fog;
  } else {
    imageSource = Error;
  }
    
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 rounded-full overflow-hidden shadow-lg">
        <Image 
          src={imageSource} 
          alt={conditions} 
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-full"></div>
    </div>
  );
}
