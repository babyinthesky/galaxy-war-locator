import { MapContainer, TileLayer } from 'react-leaflet';
import { useAppSelector } from '../../redux/hooks';
import MemberMapMarker from './MemberLocationMarker';
import MyLocationMarker from './MyLocationMarker';
import { selectMemberList } from '@/app/redux/slices/memberListSlice';

const LocationMap = () => {
  const memberList = useAppSelector(selectMemberList);

  return (
    <div className="h-80 lg:h-96 w-full">
      <MapContainer
        center={[0, 0]} 
        zoom={1}
        scrollWheelZoom={false}
        className="w-full h-full z-[1]"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {memberList.map((memberInfo) => (
          <MemberMapMarker
            key={memberInfo.id}
            memberInfo={memberInfo}
          />
        ))}
        <MyLocationMarker />
      </MapContainer>
    </div>
  )
}

export default LocationMap;


