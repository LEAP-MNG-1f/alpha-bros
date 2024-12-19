"use client";
import { TPlaces } from "@/types/DataTypes";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";

export const CategoryMap = ({ places }: { places: TPlaces[] }) => {
  return (
    <APIProvider
      apiKey={"AIzaSyBeK6kNAnqtWp2xZpPHmcXOjESpg5cu6ek"}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <Map
        defaultZoom={13}
        defaultCenter={{ lat: 47.918788, lng: 106.917612 }}
        mapId="85f71dc247c7d76c"
      >
        {/* 47.918788, 106.917612 */}
        <PoiMarkers places={places} />
      </Map>
    </APIProvider>
  );
};

const PoiMarkers = ({ places }: { places: TPlaces[] }) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  // const [circleCenter, setCircleCenter] = useState(null);
  const clusterer = useRef<MarkerClusterer | null>(null);
  const handleClick = useCallback((ev: google.maps.MapMouseEvent) => {
    if (!map) return;
    if (!ev.latLng) return;
    console.log("marker clicked:", ev.latLng.toString());
    map.panTo(ev.latLng);
    // setCircleCenter(ev.latLng);
  }, []);
  // Initialize MarkerClusterer, if the map has changed
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  // Update markers, if the markers array has changed
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {places.map((place: TPlaces) => (
        <AdvancedMarker
          key={place?._id}
          position={{
            lat: Number(place?.location?.latitude),
            lng: Number(place?.location?.longitude),
          }}
          ref={(marker) => setMarkerRef(marker, place._id)}
          clickable={true}
          onClick={handleClick}
        >
          <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};
