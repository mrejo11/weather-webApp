import SunriseSunset from "./sunriseSunset"

interface SunriseSunsetProps{
    sunRise:string;
    sunSet:string
}

export default function RightSideApp({sunRise,sunSet}:SunriseSunsetProps){
  return (
    <div className="absolute bottom-24 m-5 w-auto h-auto lg:top-0 ">
      <SunriseSunset sunriseTime={sunRise} sunsetTime={sunSet}/>
    </div>
  )
}