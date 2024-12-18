import { TPlaces } from "@/types/DataTypes";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
export const PlaceMap = ({ place }: { place: TPlaces }) => {
  return (
    <APIProvider apiKey={"AIzaSyBeK6kNAnqtWp2xZpPHmcXOjESpg5cu6ek"}>
      <div className="w-full h-full">
        <Map
          defaultZoom={18}
          defaultCenter={{
            lat: Number(place?.location?.latitude) || 47.91886435753692,
            lng: Number(place?.location?.longitude || 106.91756731548396),
          }}
          mapId="85f71dc247c7d76c"
        >
          <AdvancedMarker
            position={{
              lat: Number(place?.location?.latitude) || 47.91886435753692,
              lng: Number(place?.location?.longitude || 106.91756731548396),
            }}
            clickable={true}
          >
            <Pin background={"red"} glyphColor={"#000"} borderColor={"#000"} />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};
