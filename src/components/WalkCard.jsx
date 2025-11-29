import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getWalkParticipants } from '../api/walkParticipation';
import { useAuth } from '../hooks/useAuth';
import { formatDateTime } from '../utils/formatters';

// iconos de leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function WalkCard({ walk }) {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [participantsCount, setParticipantsCount] = useState(0);
  const [loadingParticipants, setLoadingParticipants] = useState(true);

  useEffect(() => {
    const loadParticipants = async () => {
      try {
        const participants = await getWalkParticipants(walk.id, token);
        setParticipantsCount(participants.length);
      } catch (err) {
        console.error('Error al cargar participantes:', err);
        setParticipantsCount(0);
      } finally {
        setLoadingParticipants(false);
      }
    };

    if (walk.id && token) {
      loadParticipants();
    }
  }, [walk.id, token]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      SCHEDULED: { bg: 'bg-info', text: 'Programado' },
      COMPLETED: { bg: 'bg-success', text: 'Completado' },
      CANCELLED: { bg: 'bg-danger', text: 'Cancelado' }
    };
    
    const config = statusConfig[status] || { bg: 'bg-secondary', text: status };
    return config;
  };

  const statusConfig = getStatusBadge(walk.status);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{walk.title}</h5>

        {walk.latitude && walk.longitude && (
          <div className="rounded overflow-hidden mb-3" style={{ height: '150px' }}>
            <MapContainer 
              center={[walk.latitude, walk.longitude]} 
              zoom={14} 
              className="h-100 w-100"
              zoomControl={false}
              dragging={false}
              scrollWheelZoom={false}
              doubleClickZoom={false}
              touchZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[walk.latitude, walk.longitude]} />
            </MapContainer>
          </div>
        )}

        <p className="card-text">
          <strong><i className="bi bi-calendar-event me-1"></i>Inicio:</strong> {formatDateTime(walk.startTime)}<br />
          <strong><i className="bi bi-people-fill me-1"></i>Perros:</strong> {loadingParticipants ? '...' : `${participantsCount} / ${walk.maxDogs}`}<br />
          <strong><i className="bi bi-person-fill me-1"></i>Creado por:</strong> {walk.creator?.displayName || walk.creator?.username || 'Usuario'}<br />
          <span className={`badge ${statusConfig.bg}`}>
            {statusConfig.text}
          </span>
        </p>
        <button 
          className="btn btn-info btn-sm"
          onClick={() => navigate(`/walks/${walk.id}`)}
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
}
