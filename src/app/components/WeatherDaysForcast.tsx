import { WeatherData } from "@/types";
import Image from "next/image";
interface ShowWeatherForcastProps {
  weatherData: WeatherData | undefined;
}

export default function WeatherDaysForcast({
  weatherData,
}: ShowWeatherForcastProps) {
  if (!weatherData || !weatherData.days) {
    return <div></div>;
  }

  function formatDate(dateString: string) {
    const [ ,month, day] = dateString.split("-").map(Number);

    const date = new Date(new Date().getFullYear(), month - 1, day); 

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
    }).format(date);
  }

  const dataDays = weatherData.days.slice(1, 11).map((day) => {
    return (
      <div
        key={day.datetime}
        className="p-4 ml-3 bg-gray-200 rounded-lg shadow-lg text-center lg:w-[200px] w-[300px] "
      >
        <p className="text-xl font-bold">{formatDate(day.datetime)}</p>
        <p >Max Temp: {day.tempmax}°C</p>
        <p>Min Temp: {day.tempmin}°C</p>
        <div className="flex justify-center mt-2">
          {" "}
          <p>
            {day.icon === "partly-cloudy-day" ? (
              <Image
                src="/partly-cloudy-day.jpg"
                alt="Description of image"
                width={100}
                height={50}
                className="rounded"
              />
            ) : day.icon === "snow" ? (
              <Image
                src="/snow.jpg"
                alt="Description of image"
                width={100}
                height={50}
                className="rounded"
              />
            ) : day.icon === "rain" ? (
              <Image
                src="/rany.jpg"
                alt="Description of image"
                width={100}
                height={50}
                className="rounded"
              />
            ) : day.icon === "clear-day" ? (
              <Image
                src="/sunny.jpg"
                alt="Description of image"
                width={100}
                height={50}
                className="rounded"
              />
            ) : day.icon === "cloudy" ? (
              <Image
                src="/cloud.jpg"
                alt="Description of image"
                width={100}
                height={50}
                className="rounded"
              />
            ) : (
              "Image not found"
            )}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className=" translate-y-[680px] translate-x-3 grid grid-cols-1  gap-y-2  
    lg:grid lg:grid-cols-5 lg:gap-x-72 lg:gap-y-10 3xl:gap-y-10 lg:p-4 lg:justify-center lg:scale-[0.6]  lg:translate-y-12  3xl:translate-y-24 3xl:scale-90">
      {dataDays}
    </div>
  );
}
