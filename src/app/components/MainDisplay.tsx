"use client";
// import { WeatherResponse } from "@/types";
import { Button, Input } from "@chakra-ui/react";
import * as actions from "@/actions";
import ShowDisplayData from "./show-display-data";
import { WeatherResponse } from "@/types";
import { useActionState } from "react";
import ShowDeatilData from "./ShowDeatilData";
import RightSideApp from "./RightSideApp";

export default function MainDisplay() {
  const initialState: WeatherResponse = {
    data: undefined,
    error: "some error",
  };
  const [formState, action] = useActionState(actions.getWeather, initialState);
  // console.log("FormState:", formState);
  // const weatherDataToday=formState?.data?.days?.[0]
  const weatherData = formState?.data;


  
  return (
    <div className="relative w-full h-screen">
      <div className="absolute left-0 top-0 w-full lg:w-[50vh] h-full bg-gray-200 rounded-l-lg p-4">
        <div className="flex flex-col items-center justify-center">
          <form
            action={action}
            className="flex  justify-center gap-2 items-center mt-2"
          >
            <Input
              name="city"
              placeholder="Search City"
              htmlSize={12}
              width={"auto"}
              borderColor={"black"}
            />
            <Button type="submit" colorScheme="blue">
              Go
            </Button>
          </form>
          <div>
            {!weatherData && (
              <div className="text-center text-gray-600 py-12">
                <p>Enter a city name to get the current weather</p>
              </div>
            )}
          </div>
          <ShowDisplayData weatherData={weatherData} />
        </div>
        <ShowDeatilData weatherData={weatherData} />
        <div className="lg:absolute lg:top-0 lg:right-0">
          <RightSideApp
            weatherData={weatherData}
          />
        </div>
      </div>
    </div>
  );
}
