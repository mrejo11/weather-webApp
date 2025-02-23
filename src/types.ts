// @/types/index.ts
export interface WeatherData {
    resolvedAddress?: string;
    currentConditions?: {
      datetimeEpoch?: number;
      temp?: number;
      conditions?: string;
      icon:string;
      humidity?:number;
      dew?:number;
      cloudcover?:number;
      pressure?:number;
      uvindex?:number;
      windspeed?:number;
      feelslike?:number;
    };
    days?: {
      datetimeEpoch?: number;
      temp?: number;
      conditions?: string;
      feelslike?:number;
    };
  }
  
  export interface WeatherResponse {
    data?: WeatherData;
  
    error?: string
  }




//this in type union that I use for mix type safty