import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// iconos de leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function WalkMapCard({ latitude, longitude, height = '300px' }) {
  if (!latitude || !longitude) {
    return null;
  }

  return (
    <div className="card">
      <div className="card-body">
        <strong><i className="bi bi-geo-alt-fill me-1"></i>Ubicación:</strong>
        <div className="rounded overflow-hidden mt-2" style={{ height }}>
          <MapContainer 
            center={[latitude, longitude]} 
            zoom={15} 
            className="h-100 w-100"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
