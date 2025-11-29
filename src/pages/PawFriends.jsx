import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { DogCard } from '../components/DogCard';
import { SearchBox } from '../components/SearchBox';
import { useAuth } from '../hooks/useAuth';
import { getFollowedDogs, followDog, unfollowDog } from '../api/follows';
import { searchDogs } from '../api/dogs';

export function PawFriends() {
  const { user, token } = useAuth();
  const [followedDogs, setFollowedDogs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFollowedDogs();
  }, []);

  const loadFollowedDogs = async () => {
    try {
      setLoading(true);
      const data = await getFollowedDogs(user.id, token);
      setFollowedDogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchName) => {
    try {
      setError('');
      const results = await searchDogs(searchName, token);
      setSearchResults(results);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFollow = async (dogId) => {
    try {
      setError('');
      await followDog(user.id, dogId, token);
      loadFollowedDogs();
      // Actualizar resultados de búsqueda si existen
      if (searchResults.length > 0) {
        setSearchResults(prevResults => 
          prevResults.map(dog => 
            dog.id === dogId ? dog : dog
          )
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUnfollow = async (dogId) => {
    try {
      setError('');
      await unfollowDog(user.id, dogId, token);
      loadFollowedDogs();
    } catch (err) {
      setError(err.message);
    }
  };

  const isFollowing = (dogId) => {
    return followedDogs.some(dog => dog.id === dogId);
  };

  return (
    <div>
      <Navbar />
      
      <div className="container">
        <h1 className="mb-4">PawFriends</h1>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Buscador */}
        <SearchBox 
          onSearch={handleSearch}
          placeholder="Nombre del perro..."
        />

        {/* Resultados de búsqueda */}
        {searchResults.length > 0 && (
          <div className="mb-4">
            <h3>Resultados de búsqueda</h3>
            <div className="row">
              {searchResults.map((dog) => (
                <div key={dog.id} className="col-md-6 col-lg-4 mb-3">
                  <DogCard 
                    dog={dog}
                    actions="follow"
                    isFollowing={isFollowing(dog.id)}
                    onFollow={handleFollow}
                    onUnfollow={handleUnfollow}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Perros seguidos */}
        <div>
          <h3>Perros que sigues ({followedDogs.length})</h3>
          {loading ? (
            <p>Cargando...</p>
          ) : followedDogs.length === 0 ? (
            <div className="alert alert-info">
              No sigues a ningún perro todavía. ¡Busca y sigue a otros perros!
            </div>
          ) : (
            <div className="row">
              {followedDogs.map((dog) => (
                <div key={dog.id} className="col-md-6 col-lg-4 mb-3">
                  <DogCard 
                    dog={dog}
                    actions="follow"
                    isFollowing={true}
                    onUnfollow={handleUnfollow}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
