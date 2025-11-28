export function DogCard({ dog, onDelete, onEdit }) {
  return (
    <div className="card h-100">
      {dog.profileImageUrl && (
        <img 
          src={dog.profileImageUrl} 
          className="card-img-top" 
          alt={dog.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{dog.name}</h5>
        <p className="card-text">
          <strong>Raza:</strong> {dog.breed}<br />
          <strong>Nacimiento:</strong> {dog.birthdate}<br />
          {dog.description && (
            <>
              <strong>Descripción:</strong> {dog.description}
            </>
          )}
        </p>
      </div>
      <div className="card-footer">
        <button 
          className="btn btn-primary btn-sm me-2"
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
      </div>
    </div>
  );
}
