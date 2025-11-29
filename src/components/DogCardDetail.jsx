import defaultDogImage from '../assets/default_dog.png';

export function DogCardDetail({ dog, showFollowButton, isFollowing, onFollowToggle, followLoading }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="card">
      <img 
        src={dog.profileImageUrl || defaultDogImage} 
        className="card-img-top" 
        alt={dog.name}
        style={{ height: '300px', objectFit: 'cover' }}
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
        
        {/* Botón de seguir/dejar de seguir */}
        {showFollowButton && (
          <button 
            className={`btn ${isFollowing ? 'btn-outline-info' : 'btn-info'} w-100`}
            onClick={onFollowToggle}
            disabled={followLoading}
          >
            {followLoading ? 'Cargando...' : isFollowing ? '✓ Siguiendo' : '+ Seguir'}
          </button>
        )}
      </div>
    </div>
  );
}
