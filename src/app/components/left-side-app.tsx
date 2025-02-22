"use client";
import { WeatherResponse } from "@/types";
import { Button, Input } from "@chakra-ui/react";
import * as actions from "@/actions";
import { useActionState } from "react";
import ShowDisplayData from "./show-display-data";

export default function LeftSide() {
  const [formState, action] = useActionState<WeatherResponse|null>(
    actions.getWeather,
    null
  );
  console.log("FormState:", formState);

  // const weatherDataToday=formState?.data?.days?.[0]
  const weatherData = formState?.data;
  return (
    <div className="relative w-full h-screen">
      <div className="absolute left-0 top-0 w-[40vh] h-full bg-gray-200 rounded-l-lg p-4">
        <div className="flex flex-col items-center">
          <form action={action}>
            <Input
              name="city"
              className="mx-auto mt-4"
              placeholder="Search City"
              htmlSize={12}
              width={"auto"}
              borderColor={"black"}
            />
            <Button type="submit" colorScheme="blue" className="mt-2">
              Click
            </Button>
          </form>
        <ShowDisplayData weatherData={weatherData}/>
        </div>
      </div>
    </div>
  );
}
