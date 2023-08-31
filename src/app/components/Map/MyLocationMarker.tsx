import { useState } from 'react';
import { divIcon } from "leaflet";
import { Marker, useMapEvents } from "react-leaflet";
import starMarker from '../../assets/svgs/map-marker-star';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { sortMemberList } from '../../redux/slices/memberListSlice';
import { Location, MemberListWithDistance } from '../../redux/types';
import { selectMemberList } from '../../redux/slices/memberListSlice';

const svgIcon = divIcon({
  html: starMarker,
  className: "svg-icon",
  iconSize: [32, 35], // TODO: move to config
  iconAnchor: [16, 35] // TODO: calculation function
});

const MyLocationMarker = ()  => {
  const [myLocation, setMyLocation] = useState<null | Location>();
  const memberList = useAppSelector(selectMemberList);
  const dispatch = useAppDispatch();

  const map = useMapEvents({
    click: (e) => {
      setMyLocation({
        lat: e.latlng.lat,
        long: e.latlng.lng,
      });

      const memberListWithDistance = memberList.map((member) => ({
        ...member,
        distance: map.distance([e.latlng.lat, e.latlng.lng], [member.lat, member.long])
      })) as MemberListWithDistance;

      dispatch(sortMemberList(memberListWithDistance));
    },         
  });

  if (!myLocation) {
    return null;
  }

  return (
    <Marker position={[myLocation.lat, myLocation.long]} icon={svgIcon} />
  )
}

export default MyLocationMarker;