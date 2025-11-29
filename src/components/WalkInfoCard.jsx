export function WalkInfoCard({ walk, isCreator, onStatusChange, onEdit }) {
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
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">{walk.title}</h2>
        
        <div className="mb-3">
          {/* badge o dropdown según creador */}
          {isCreator ? (
            <select 
              className="form-select form-select-sm w-auto"
              value={walk.status}
              onChange={(e) => onStatusChange(e.target.value)}
            >
              <option value="SCHEDULED">Programado</option>
              <option value="COMPLETED">Completado</option>
              <option value="CANCELLED">Cancelado</option>
            </select>
          ) : (
            <span className={`badge ${statusConfig.bg}`}>
              {statusConfig.text}
            </span>
          )}
        </div>

        <p className="card-text">
          <strong><i className="bi bi-calendar-event me-1"></i>Inicio:</strong> {formatDateTime(walk.startTime)}<br />
          <strong><i className="bi bi-flag-fill me-1"></i>Fin:</strong> {formatDateTime(walk.endTime)}<br />
          <strong><i className="bi bi-people-fill me-1"></i>Perros:</strong> {walk.participantsCount} / {walk.maxDogs}<br />
          {walk.creator && (
            <>
              <strong><i className="bi bi-person-fill me-1"></i>Creado por:</strong> {walk.creator.displayName} (@{walk.creator.username})<br />
            </>
          )}
        </p>

        {walk.description && (
          <div className="mb-3">
            <strong>Descripción:</strong>
            <p className="text-muted">{walk.description}</p>
          </div>
        )}

        {/* boton editar */}
        {isCreator && (
          <button 
            className="btn btn-outline-info btn-sm"
            onClick={onEdit}
          >
            <i className="bi bi-pencil-fill me-1"></i>Editar paseo
          </button>
        )}
      </div>
    </div>
  );
}
