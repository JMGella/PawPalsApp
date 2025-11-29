import defaultDogImage from '../assets/default_dog.png';
import { formatDate } from '../utils/formatters';

export function DogCardDetail({ dog, showFollowButton, isFollowing, onFollowToggle, followLoading }) {
  return (
    <div className="card">
      <img 
        src={dog.profileImageUrl?.trim() ? dog.profileImageUrl : defaultDogImage} 
        className="card-img-top object-fit-cover" 
        alt={dog.name}
        style={{ height: '300px' }}
      />
      <div className="card-body">
        <h2 className="card-title">{dog.name}</h2>
        <p className="card-text">
          <strong>Raza:</strong> {dog.breed}<br />
          <strong>Fecha de nacimiento:</strong> {formatDate(dog.birthdate)}<br />
          {dog.description && (
            <>
              <br />
              <strong>Descripción:</strong><br />
              {dog.description}
            </>
          )}
        </p>
        
        {/* boton seguir */}
        {showFollowButton && (
          <button 
            className={`btn ${isFollowing ? 'btn-outline-info' : 'btn-info'} w-100`}
            onClick={onFollowToggle}
            disabled={followLoading}
          >
            {followLoading ? 'Cargando...' : isFollowing ? 'Dejar de seguir' : 'Seguir'}
          </button>
        )}
      </div>
    </div>
  );
}
