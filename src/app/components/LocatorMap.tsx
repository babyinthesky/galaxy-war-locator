
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const Map = () => {
  return (
    <div className="flex min-h-[90%] w-full flex-1">
      <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={false} className="w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  )
}

export default Map;
