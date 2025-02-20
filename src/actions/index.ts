"use server";

interface weatherSuccess{
    temp: number;
    humidity: number
    description: string
    visibility:number
}
interface weatherDataError{
    error:string
}

type weatherData=weatherSuccess|weatherDataError  //this in type union


export async function getWeather(formState:unknown,formData:FormData):Promise<weatherData> {
  const location=formData.get('city') as string
  console.log("Location:", location);
  const API_KEY = "UT6XYSDRC6PYD5LBUFK5G3K84";
  const API_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=current&key=${API_KEY}&contentType=json`;



  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("cant find city");

    const data = await res.json();

    return {
      temp: data.currentConditions.temp,
      humidity: data.currentConditions.humidity,
      description: data.currentConditions.conditions,
      visibility:data.currentConditions.visibility
    };
  } catch (error) {
    return { error: (error as Error).message };
  }
    

}

