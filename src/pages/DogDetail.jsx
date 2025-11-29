import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { DogCardDetail } from '../components/DogCardDetail';
import { DogWalksList } from '../components/DogWalksList';
import { useAuth } from '../hooks/useAuth';
import { getDogById, getDogWalksDetail } from '../api/dogs';
import { followDog, unfollowDog, getFollowedDogs } from '../api/follows';

export function DogDetail() {
  const { dogId } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);
  const [walks, setWalks] = useState([]);
  const [followedDogs, setFollowedDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    loadDogData();
  }, [dogId]);

  const loadDogData = async () => {
    try {
      setLoading(true);
      const [dogData, walksData, followedDogsData] = await Promise.all([
        getDogById(dogId, token),
        getDogWalksDetail(dogId, token),
        getFollowedDogs(user.id, token)
      ]);
      setDog(dogData);
      setWalks(walksData);
      setFollowedDogs(followedDogsData);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isMyDog = () => {
    return dog?.owner?.id === user.id;
  };

  const isFollowing = () => {
    return followedDogs.some(followedDog => followedDog.id === parseInt(dogId));
  };

  const handleFollowToggle = async () => {
    try {
      setFollowLoading(true);
      
      if (isFollowing()) {
        await unfollowDog(user.id, dogId, token);
      } else {
        await followDog(user.id, dogId, token);
      }
      
      // recargar perros seguidos
      const followedDogsData = await getFollowedDogs(user.id, token);
      setFollowedDogs(followedDogsData);
    } catch (err) {
      alert(err.message);
    } finally {
      setFollowLoading(false);
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
          Volver
        </button>

        <div className="row">
          {/* info perro */}
          <div className="col-md-4 mb-4">
            <DogCardDetail 
              dog={dog}
              showFollowButton={!isMyDog()}
              isFollowing={isFollowing()}
              onFollowToggle={handleFollowToggle}
              followLoading={followLoading}
            />
          </div>

          {/* paseos del perro */}
          <div className="col-md-8">
            <DogWalksList walks={walks} />
          </div>
        </div>
      </div>
    </div>
  );
}
