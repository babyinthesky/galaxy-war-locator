import React, { useRef, useEffect } from 'react';
import { divIcon, Marker as MarkerType } from "leaflet";
import { Marker } from "react-leaflet";
import personFilledMarker from '../../assets/svgs/location-person-filled';
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { selectHighlightedMemberId, setIsModalOpen, setSelectedMemberDetails } from "@/app/redux/slices/userEventDataSlice";
import MarkerTooltip from './MarkerTooltip';
import { MemberInfo } from '@/app/redux/types';

interface Props {
  memberInfo: MemberInfo;
}

const svgIcon = divIcon({
  html: personFilledMarker,
  className: "svg-icon",
  iconSize: [30, 35], // TODO: move to config
  iconAnchor: [15, 35] // TODO: calculation function
});

const MemberLocationMarker = ({ memberInfo } : Props)  => {
  const dispatch = useAppDispatch();
  const highlightedMemberId = useAppSelector(selectHighlightedMemberId);
  const markerRef = useRef<MarkerType<any> | null>(null);
  
  useEffect(() => {
    if (markerRef.current) {
      if (memberInfo.id === highlightedMemberId) {
        markerRef.current.openTooltip();
      } else {
        markerRef.current.closeTooltip();
      }
    }
  }, [highlightedMemberId, markerRef])

  return (
    <Marker
      ref={markerRef}
      position={[memberInfo.lat, memberInfo.long]}
      icon={svgIcon}
      eventHandlers={{
        mousedown: () => {
          dispatch(setIsModalOpen(true));
          dispatch(setSelectedMemberDetails(memberInfo));
        }
      }}
    >
      <MarkerTooltip
        memberInfo={memberInfo}
      />
    </Marker>
  )
}

export default MemberLocationMarker;
