"use client";
import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { TMap, TSetLat, TSetLng } from "@/data/DataTypes";
export function Map({
  lat,
  lng,
  setLat,
  setLng,
}: {
  lat: number;
  lng: number;
  setLat: TSetLat;
  setLng: TSetLng;
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<TMap | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: "AIzaSyBeK6kNAnqtWp2xZpPHmcXOjESpg5cu6ek",
        version: "weekly",
      });
      const { Map, InfoWindow } = await loader.importLibrary("maps");

      const mapOptions = {
        center: {
          lat: lat,
          lng: lng,
        },
        zoom: 12,
        mapId: "MY_NEXTJS_MAPID",
      };
      if (mapRef.current && !mapInstance.current) {
        mapInstance.current = new Map(mapRef.current, mapOptions);
        const marker = new google.maps.Marker({
          position: { lat: lat, lng: lng },
          draggable: true,
          map: mapInstance.current,
        });

        marker.addListener("dragend", () => {
          const position = marker.getPosition();
          if (position) {
            const lat = position.lat();
            const lng = position.lng();
            setLat(lat);
            setLng(lng);
          }
        });
      }
    };

    initMap();
  }, []);

  return <div ref={mapRef} className="rounded-2xl w-full h-[350px]"></div>;
}
