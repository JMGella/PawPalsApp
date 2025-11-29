import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { DogCardDetail } from '../components/DogCardDetail';
import { WalkCard } from '../components/WalkCard';
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
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
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
            <DogCardDetail dog={dog} />
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
                    <WalkCard walk={walk} />
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
