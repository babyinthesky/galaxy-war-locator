import React, { useRef, useEffect } from 'react';
import { divIcon, Marker as MarkerType } from "leaflet";
import { Marker } from "react-leaflet";
import personFilledMarker from '../../assets/svgs/location-person-filled';
import { useAppSelector } from "@/app/redux/hooks";
import { selectHighlightedMemberId } from "@/app/redux/slices/userEventDataSlice";
import MarkerTooltip, { MarkerData } from './MarkerTooltip';

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
  const highlightedMemberId = useAppSelector(selectHighlightedMemberId);
  const markerRef = useRef<MarkerType<any> | null>(null);
  
  useEffect(() => {
    if (markerRef.current) {
      if (markerData.id === highlightedMemberId) {
        markerRef.current.openTooltip();
      } else {
        markerRef.current.closeTooltip();
      }
    }
  }, [highlightedMemberId, markerRef])

  return (
    <Marker
      ref={markerRef}
      position={[markerData.lat, markerData.long]}
      icon={svgIcon}
      eventHandlers={{
        mousedown: () => {
          // TODO: get http and open modal?
        }
      }}
    >
      <MarkerTooltip
        markerData={markerData}
      />
    </Marker>
  )
}

export default MemberLocationMarker;
