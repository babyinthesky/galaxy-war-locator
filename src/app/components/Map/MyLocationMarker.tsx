import { useState } from 'react';
import { divIcon } from "leaflet";
import { Marker, Tooltip, useMapEvents } from "react-leaflet";
import starMarker from '../../assets/svgs/map-marker-star';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectMemberShortList } from '../../redux/slices/memberShortListSlice';
import { setSortedMemberList } from '../../redux/slices/memberListSlice';
import { MemberShortInfoForSorting, Location } from '../../redux/types';
import MarkerTooltip from './MarkerTooltip';

type MemberWithDistance = MemberShortInfoForSorting & {distance: number};

type MemberListWithDistance = MemberWithDistance[];

const svgIcon = divIcon({
  html: starMarker,
  className: "svg-icon",
  iconSize: [32, 35], // TODO: move to config
  iconAnchor: [16, 35] // TODO: calculation function
});

const sortListByDistance = (listToSort: MemberListWithDistance, sortedList: MemberListWithDistance) => {
  const listLength = listToSort.length;
  listToSort.forEach((member) => {
    if (sortedList.length === 0) {
      sortedList.push(member);
    } else {
      for (let j = 0; j < listLength; j = j + 1) {
        if (sortedList[j]) {
          if (member.distance <= sortedList[j].distance) {
            sortedList.splice(j, 0, member);
            break;
          }
            continue;
        } else {
          sortedList.push(member);
          break;
        }
      }
    }
  });
}

const MyLocationMarker = ()  => {
  const [myLocation, setMyLocation] = useState<null | Location>();
  const { list: memberList } = useAppSelector(selectMemberShortList);
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
      const sortedList = [] as MemberListWithDistance;
      sortListByDistance(memberListWithDistance, sortedList);
      dispatch(setSortedMemberList(sortedList));
    },         
  });

  if (!myLocation) {
    return null;
  }

  return (
    <Marker position={[myLocation.lat, myLocation.long]} icon={svgIcon}>
      <MarkerTooltip
        markerData={myLocation}
      />
    </Marker>
  )
}

export default MyLocationMarker;