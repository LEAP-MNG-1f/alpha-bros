"use client";

import { APIProvider } from "@vis.gl/react-google-maps";

export const APIProviderMap = ({ children }: { children: React.ReactNode }) => {
  return (
    <APIProvider
      apiKey={"AIzaSyBeK6kNAnqtWp2xZpPHmcXOjESpg5cu6ek"}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      {children}
    </APIProvider>
  );
};
