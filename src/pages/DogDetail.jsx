import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';
import { getDogById, getDogWalks } from '../api/dogs';

export function DogDetail() {
  const { dogId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);
  const [walks, setWalks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDogData();
  }, [dogId]);

  const loadDogData = async () => {
    try {
      setLoading(true);
      setError('');
      const [dogData, walksData] = await Promise.all([
        getDogById(dogId, token),
        getDogWalks(dogId, token)
      ]);
      setDog(dogData);
      setWalks(walksData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

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

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
      </div>
    );
  }

  if (!dog) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="alert alert-warning" role="alert">
            Perro no encontrado
          </div>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="container">
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
          ← Volver
        </button>

        <div className="row">
          {/* Información del perro */}
          <div className="col-md-4 mb-4">
            <div className="card">
              {dog.profileImageUrl && (
                <img 
                  src={dog.profileImageUrl} 
                  className="card-img-top" 
                  alt={dog.name}
                  style={{ height: '300px', objectFit: 'cover' }}
                />
              )}
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
              </div>
            </div>
          </div>

          {/* Paseos del perro */}
          <div className="col-md-8">
            <h3 className="mb-3">Paseos ({walks.length})</h3>
            
            {walks.length === 0 ? (
              <div className="alert alert-info">
                Este perro no está apuntado a ningún paseo todavía.
              </div>
            ) : (
              <div className="row">
                {walks.map((walk) => (
                  <div key={walk.id} className="col-12 mb-3">
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
                          <span className={`badge ${
                            walk.status === 'SCHEDULED' ? 'bg-primary' :
                            walk.status === 'COMPLETED' ? 'bg-success' :
                            walk.status === 'CANCELLED' ? 'bg-danger' : 'bg-secondary'
                          }`}>
                            {walk.status === 'SCHEDULED' ? 'Programado' :
                             walk.status === 'COMPLETED' ? 'Completado' :
                             walk.status === 'CANCELLED' ? 'Cancelado' : walk.status}
                          </span>
                        </p>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => navigate(`/walks/${walk.id}`)}
                        >
                          Ver detalles
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
