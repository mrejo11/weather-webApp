import { WeatherData } from "@/types";

interface ShowDisplayDataProps {
  weatherData: WeatherData | undefined;
}

export default function ShowDisplayData({ weatherData }: ShowDisplayDataProps) {
  const temperature = weatherData?.currentConditions?.temp??20;
  const dewPoint = weatherData?.currentConditions?.dew??20;
  const pressure = weatherData?.currentConditions?.pressure??1013;
  const cloudCover = weatherData?.currentConditions?.cloudcover??0;
  const windSpeed=weatherData?.currentConditions?.windspeed??0;

  const rainChance = Math.abs(
    (dewPoint - temperature) * 3 +  // دما و نقطه شبنم
    (0.2 * cloudCover) -             // پوشش ابری
    (0.01 * (pressure - 1013)) +     // فشار
    (0.1 * windSpeed)               // سرعت باد
  );
  

  return (
    <div>
      Location:<div>{weatherData?.resolvedAddress}</div>
      <div>
        Date:
        {weatherData?.currentConditions?.datetimeEpoch
          ? `Today, ${new Date(
              weatherData?.currentConditions?.datetimeEpoch * 1000
            ).toLocaleString("en", {
              month: "long",
              day: "numeric",
            })}`
          : null}
      </div>
      <div>{weatherData?.currentConditions?.icon}</div>
      <div>Temperature: {weatherData?.currentConditions?.temp}</div>
      <div>FeelsLike: {weatherData?.currentConditions?.feelslike}</div>
      <div>Humidity:{weatherData?.currentConditions?.humidity}</div>
      <div>DewPoint: {weatherData?.currentConditions?.dew}</div>
      <div>{weatherData?.currentConditions?.pressure}</div>
      <div>زمخعی زخ{weatherData?.currentConditions?.cloudcover}</div>
      <div>windspeed: {weatherData?.currentConditions?.windspeed}</div>
      <div>RainChance:{rainChance | 0}</div>
    </div>
  );
}
