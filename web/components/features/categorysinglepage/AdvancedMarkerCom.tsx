// import { TPlaces } from "@/types/DataTypes";
// import { AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";

// export const AdvancedMarkerCom = ({place}:{place:TPlaces}) => {
//   return <AdvancedMarker
//   key={place?._id}
//   position={{
//     lat: Number(place?.location?.latitude),
//     lng: Number(place?.location?.longitude),
//   }}
//   ref={(marker) => setMarkerRef(marker, place._id)}
//   clickable={true}
//   onClick={handleClick}
// >
//   <Pin
//     background={"#FBBC04"}
//     glyphColor={"#000"}
//     borderColor={"#000"}
//   />
//   <InfoWindow
//     position={{
//       lat: Number(place?.location?.latitude),
//       lng: Number(place?.location?.longitude),
//     }}
//   >
//     <div>
//       <p>Hello from the InfoWindow!</p>
//     </div>
//   </InfoWindow>
// </AdvancedMarker>
// };
