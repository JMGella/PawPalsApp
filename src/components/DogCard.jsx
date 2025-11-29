import { useNavigate } from 'react-router-dom';
import defaultDogImage from '../assets/default_dog.png';

export function DogCard({ dog, onDelete, onEdit, onFollow, onUnfollow, isFollowing, actions = 'edit' }) {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const renderActions = () => {
    if (actions === 'edit') {
      return (
        <>
          <button 
            className="btn btn-info btn-sm me-2"
            onClick={() => onEdit(dog)}
          >
            Editar
          </button>
          <button 
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(dog.id)}
          >
            Eliminar
          </button>
        </>
      );
    }

    if (actions === 'follow') {
      return isFollowing ? (
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => onUnfollow(dog.id)}
        >
          Dejar de seguir
        </button>
      ) : (
        <button 
          className="btn btn-info btn-sm"
          onClick={() => onFollow(dog.id)}
        >
          Seguir
        </button>
      );
    }

    return null;
  };

  return (
    <div className="card h-100">
      <div 
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(`/dogs/${dog.id}`)}
      >
        <img 
          src={dog.profileImageUrl || defaultDogImage} 
          className="card-img-top" 
          alt={dog.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{dog.name}</h5>
          <p className="card-text">
            <strong>Raza:</strong> {dog.breed}<br />
            <strong>Nacimiento:</strong> {formatDate(dog.birthdate)}<br />
            {dog.description && (
              <>
                <strong>Descripción:</strong> {dog.description}
              </>
            )}
          </p>
        </div>
      </div>
      {actions && (
        <div className="card-footer">
          {renderActions()}
        </div>
      )}
    </div>
  );
}
