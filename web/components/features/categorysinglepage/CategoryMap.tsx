"use client";
import { TPlaces } from "@/types/DataTypes";
import {
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import Image from "next/image";
import { roboto, roboto700 } from "@/app/fonts/fonts";

export const CategoryMap = ({ places }: { places: TPlaces[] }) => {
  return (
    <Map
      defaultZoom={13}
      defaultCenter={{ lat: 47.918788, lng: 106.917612 }}
      mapId="85f71dc247c7d76c"
    >
      {/* 47.918788, 106.917612 */}
      <PoiMarkers places={places} />
    </Map>
  );
};

const PoiMarkers = ({ places }: { places: TPlaces[] }) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const [currentMarkerId, setCurrentMarkerId] = useState<{
    id: string;
    number: number;
  }>({
    id: "",
    number: 0,
  });
  // const [circleCenter, setCircleCenter] = useState(null);
  const clusterer = useRef<MarkerClusterer | null>(null);
  const handleClick = useCallback(
    (ev: google.maps.MapMouseEvent, key: string) => {
      if (!map) return;
      if (!ev.latLng) return;
      map.panTo(ev.latLng);
      setCurrentMarkerId((pre) => {
        if (pre.id == key) {
          return { ...pre, number: pre.number + 1 };
        } else {
          return {
            ...pre,
            id: key,
            number: 1,
          };
        }
      });
    },
    []
  );
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
          onClick={(e) => {
            handleClick(e, place._id);
          }}
        >
          <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
          {currentMarkerId.id == place._id && currentMarkerId.number > 0 && (
            <InfoWindow
              position={{
                lat: Number(place?.location?.latitude) + 0.0001,
                lng: Number(place?.location?.longitude) + 0.0001,
              }}
            >
              <div className="h-[200px] w-[150px]">
                <div className="h-3/4 relative">
                  <Image
                    src={place.image[0]}
                    alt={place?.name}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>

                <p className={`p-1 ${roboto.className}`}>{place?.name}</p>
              </div>
            </InfoWindow>
          )}
        </AdvancedMarker>
      ))}
    </>
  );
};
