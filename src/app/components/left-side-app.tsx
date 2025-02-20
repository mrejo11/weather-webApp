"use client";

import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import * as actions from "@/actions";
import { useActionState  } from "react";

interface weatherShowProps {
  temp?: number;
  humidity?: number;
  description?: string;
  error?: string;
  visibility?: number;

}
export default function LeftSide() {
    const [formState,action]=useActionState<weatherShowProps>(actions.getWeather,null)
    
//   const [weather, setWeather] = useState<weatherShowProps | null>(null);
  //   const name=formData.get('city')
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
            <div>
                {formState?.description}
            </div>
            <Button type="submit" colorScheme="blue" className="mt-2">
              Click
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
