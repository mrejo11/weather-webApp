// @/types/index.ts
export interface WeatherData {
  resolvedAddress?: string;
  currentConditions?: {
    datetimeEpoch?: number;
    temp?: number;
    conditions?: string;
    icon: string;
    humidity?: number;
    dew?: number;
    cloudcover?: number;
    pressure?: number;
    uvindex?: number;
    windspeed?: number;
    feelslike?: number;
    sunrise?: string;
    sunset?: string;
    sunsetEpoch?:number
  };
  days?:Array< {
    datetimeEpoch?: number;
    temp?: number;
    conditions?: string;
    feelslike?: number;
    tempmax?:number;
    tempmin?:number;
    datetime:string;
    icon: string;
  }>;
}

export interface WeatherResponse {
  data?: WeatherData;
  error?: string
}




//this in type union that I use for mix type safty