import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getWalkParticipants } from '../api/walkParticipation';
import { useAuth } from '../hooks/useAuth';

// Configurar iconos de Leaflet
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

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
        
        {/* Minimapa */}
        {walk.latitude && walk.longitude && (
          <div style={{ height: '150px', marginBottom: '15px', borderRadius: '4px', overflow: 'hidden' }}>
            <MapContainer 
              center={[walk.latitude, walk.longitude]} 
              zoom={14} 
              style={{ height: '100%', width: '100%' }}
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
          <strong>📅 Inicio:</strong> {formatDateTime(walk.startTime)}<br />
          <strong>🐕 Perros:</strong> {loadingParticipants ? '...' : `${participantsCount} / ${walk.maxDogs}`}<br />
          {walk.description && (
            <>
              <strong>Descripción:</strong> {walk.description}<br />
            </>
          )}
          <strong>Estado:</strong> {' '}
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
