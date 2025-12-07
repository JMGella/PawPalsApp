import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import defaultDogImage from '../assets/default_dog.png';
import { formatDate } from '../utils/formatters';

export function DogCard({ dog, onDelete, onEdit, onFollow, onUnfollow, isFollowing, actions = 'edit' }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isMyDog = () => {
    return dog?.owner?.id === user?.id;
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
      // no mostrar si es mi perro
      if (isMyDog()) {
        return null;
      }
      
      return isFollowing ? (
        <button 
          className="btn btn-outline-info btn-sm"
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
        className="cursor-pointer"
        onClick={() => navigate(`/dogs/${dog.id}`)}
      >
        <img 
          src={dog.profileImageUrl?.trim() ? dog.profileImageUrl : defaultDogImage} 
          className="card-img-top object-fit-cover" 
          alt={dog.name}
          style={{ height: '200px' }}
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
