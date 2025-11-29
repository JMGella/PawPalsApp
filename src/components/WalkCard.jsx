import { useNavigate } from 'react-router-dom';

export function WalkCard({ walk }) {
  const navigate = useNavigate();

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
        <p className="card-text">
          <strong>📍 Lugar:</strong> {walk.location}<br />
          <strong>📅 Fecha:</strong> {formatDateTime(walk.dateTime)}<br />
          <strong>⏱️ Duración:</strong> {walk.duration} minutos<br />
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
