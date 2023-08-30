import { MapContainer, TileLayer } from 'react-leaflet';
import { useAppSelector } from '../../redux/hooks';
import { selectMemberShortList } from '../../redux/slices/memberShortListSlice';
import MemberMapMarker from './MemberLocationMarker';
import MyLocationMarker from './MyLocationMarker';

const Map = () => {
  const { list: memberShortList, isLoading, hasError } = useAppSelector(selectMemberShortList);

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
            key={memberInfo.id}
            markerData={{
              id: memberInfo.id,
              lat: memberInfo.lat,
              long: memberInfo.long,
            }}
          />
        ))}
        <MyLocationMarker />
      </MapContainer>
    </div>
  )
}

export default Map;


