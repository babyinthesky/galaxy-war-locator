import { divIcon } from "leaflet";
import { Marker, Tooltip } from "react-leaflet";
import personFilledMarker from '../../svgs/location-person-filled';

type MarkerData = {
  id: string;
  lat: number,
  long: number,
}

interface Props {
  markerData: MarkerData;
}

const svgIcon = divIcon({
  html: personFilledMarker,
  className: "svg-icon",
  iconSize: [30, 35], // TODO: move to config
  iconAnchor: [15, 35] // TODO: calculation function
});

const MemberLocationMarker = ({ markerData } : Props)  => {
  return (
    <Marker position={[markerData.lat, markerData.long]} icon={svgIcon}>
      <Tooltip>
        {`${markerData.id}\n
        ${markerData.lat} \n
        ${markerData.long}`}
      </Tooltip>
    </Marker>
  )
}

export default MemberLocationMarker;
