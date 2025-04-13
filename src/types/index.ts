export interface WeatherData {
  days: {
    datetime: string;
    icon: string;
    temp?: number;
    conditions?: string;
    feelslike?: number;
    tempmax?: number;
    tempmin?: number;
    datetimeEpoch?: number;
    hours?: {
      datetime: string;
      icon: string;
      temp?: number;
      conditions?: string;
    }[];
  }[];
} 