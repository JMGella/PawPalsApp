import { useNavigate } from 'react-router-dom';
import defaultDogImage from '../assets/default_dog.png';

export function ParticipantCard({ 
  participant, 
  isCreator, 
  isMyDog, 
  isWalkScheduled,
  onStatusChange, 
  onRemove 
}) {
  const navigate = useNavigate();

  const getParticipantStatus = (status) => {
    const statusTranslations = {
      REQUESTED: 'Solicitado',
      JOINED: 'Apuntado',
      DECLINED: 'Rechazado',
      CANCELLED: 'Cancelado'
    };
    
    return statusTranslations[status] || status;
  };

  return (
    <div className="col-12 mb-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img 
                src={participant.dog?.profileImageUrl?.trim() ? participant.dog.profileImageUrl : defaultDogImage}
                alt={participant.dog?.name}
                onClick={() => navigate(`/dogs/${participant.dog?.id}`)}
                className="rounded me-3"
                style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
              />
              <div>
                <h5 className="mb-1">{participant.dog?.name}</h5>
                <p className="text-muted mb-0">
                  <small>{participant.dog?.breed}</small>
                </p>
                {/* estado o dropdown si soy creador */}
                {isWalkScheduled && isCreator ? (
                  <select 
                    className="form-select form-select-sm mt-2 w-auto"
                    value={participant.status}
                    onChange={(e) => onStatusChange(participant.id, e.target.value)}
                  >
                    <option value="REQUESTED">Solicitado</option>
                    <option value="JOINED">Apuntado</option>
                    <option value="DECLINED">Rechazado</option>
                    <option value="CANCELLED">Cancelado</option>
                  </select>
                ) : (
                  participant.status && (
                    <span className="badge bg-secondary mt-1">
                      {getParticipantStatus(participant.status)}
                    </span>
                  )
                )}
              </div>
            </div>
            {/* botones */}
            <div className="d-flex gap-2">
              {/* boton desapuntar */}
              {isWalkScheduled && isMyDog && (
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => onRemove(participant.id)}
                >
                  Desapuntar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
