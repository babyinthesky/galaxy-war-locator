import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { useAppTrunkDispatch, useAppSelector } from '../redux/hooks';
import { selectMemberShortList } from '../redux/memberShortListSlice';
import MemberMapMarker from './MemberLocationMarker';
import MyLocationMarker from './MyLocationMarker';

const Map = () => {
  const { list: memberShortList, isLoading, hasError } = useAppSelector(selectMemberShortList);
  console.log(memberShortList)

  return (
    <div className="flex min-h-[90%] w-full flex-1">
      <MapContainer 
        center={[0, 0]} 
        zoom={1}
        scrollWheelZoom={false}
        className="w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!isLoading && memberShortList.map((memberInfo) => (
          <MemberMapMarker 
            markerData={{
              id: memberInfo.id,
              lat: parseFloat(memberInfo.lat),
              long: parseFloat(memberInfo.long),
            }}
          />
        ))}
        <MyLocationMarker />
      </MapContainer>
    </div>
  )
}

export default Map;
function setSelectedPosition(arg0: any[]) {
  throw new Error('Function not implemented.');
}

