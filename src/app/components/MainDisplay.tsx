"use client";
// import { WeatherResponse } from "@/types";
import { Button, Input } from "@chakra-ui/react";
import * as actions from "@/actions";
import ShowDisplayData from "./show-display-data";
import { WeatherResponse } from "@/types";
import { useActionState } from "react";
import ShowDeatilData from "./ShowDeatilData";
import RightSideApp from "./RightSideApp";
import { useState } from "react";

export default function MainDisplay() {
  const initialState: WeatherResponse = {
    data: undefined,
    error: null,
  };

  const [formState, action] = useActionState(actions.getWeather, initialState);
  // console.log("FormState:", formState);
  // const weatherDataToday=formState?.data?.days?.[0]
  const weatherData = formState?.data;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    await action(formData);
    setIsLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header with search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Weather Forecast</h1>
          <form
            action={handleSubmit}
            className="flex flex-col sm:flex-row justify-center gap-4 items-center"
          >
            <Input
              name="city"
              placeholder="Search for a city..."
              size="lg"
              width={{ base: "100%", sm: "auto" }}
              maxW="400px"
              borderColor="blue.200"
              _hover={{ borderColor: "blue.300" }}
              _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
            />
            <Button 
              type="submit" 
              colorScheme="blue" 
              size="lg"
              isLoading={isLoading}
              loadingText="Searching..."
              width={{ base: "100%", sm: "auto" }}
            >
              Search
            </Button>
          </form>
        </div>

        {!weatherData && !isLoading && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-500 text-xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Enter a city name to get the current weather</p>
            </div>
          </div>
        )}

        {weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Current weather */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <ShowDisplayData weatherData={weatherData} />
                <ShowDeatilData weatherData={weatherData} />
              </div>
            </div>
            
            {/* Right column - Forecast and details */}
            <div className="lg:col-span-2">
              <RightSideApp weatherData={weatherData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
