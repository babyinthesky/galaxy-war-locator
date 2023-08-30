import { useState } from 'react';
import { divIcon } from "leaflet";
import { Marker, Tooltip, useMapEvents } from "react-leaflet";
import starMarker from '../../assets/svgs/map-marker-star';

const svgIcon = divIcon({
  html: starMarker,
  className: "svg-icon",
  iconSize: [32, 35], // TODO: move to config
  iconAnchor: [16, 35] // TODO: calculation function
});


const MyLocationMarker = ()  => {
  const [myLocation, setMyLocation] = useState({lat: 0, long: 0})
  useMapEvents({
    click: (e) => {
      setMyLocation({
        lat: e.latlng.lat,
        long: e.latlng.lng,
      })
    },         
  });
  return (
    <Marker position={[myLocation.lat, myLocation.long]} icon={svgIcon}>
      <Tooltip>
        {myLocation.lat}
        {myLocation.long}
      </Tooltip>
    </Marker>
  )
}

export default MyLocationMarker;