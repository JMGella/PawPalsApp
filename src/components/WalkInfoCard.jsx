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
          {/* Mostrar badge o desplegable según si eres el creador */}
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
          <strong>📅 Inicio:</strong> {formatDateTime(walk.startTime)}<br />
          <strong>🏁 Fin:</strong> {formatDateTime(walk.endTime)}<br />
          <strong>🐕 Perros:</strong> {walk.participantsCount} / {walk.maxDogs}<br />
          {walk.creator && (
            <>
              <strong>👤 Creado por:</strong> {walk.creator.displayName} (@{walk.creator.username})<br />
            </>
          )}
        </p>

        {walk.description && (
          <div className="mb-3">
            <strong>Descripción:</strong>
            <p className="text-muted">{walk.description}</p>
          </div>
        )}

        {/* Boton de editar si eres el creador del paseo */}
        {isCreator && (
          <button 
            className="btn btn-outline-info btn-sm"
            onClick={onEdit}
          >
            ✏️ Editar paseo
          </button>
        )}
      </div>
    </div>
  );
}
