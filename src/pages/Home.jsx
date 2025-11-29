import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { WalkCard } from '../components/WalkCard';
import { DogCard } from '../components/DogCard';
import { PawFriendBadge } from '../components/PawFriendBadge';
import { HomeSection } from '../components/HomeSection';
import { useAuth } from '../hooks/useAuth';
import { getUserDogs } from '../api/dogs';
import { getUserWalks, getUpcomingWalks, getJoinedWalks } from '../api/walks';
import { getFollowedDogs } from '../api/follows';
import defaultUserImage from '../assets/default_user.png';

export function Home() {
  const { user, token } = useAuth();
  const [myDogs, setMyDogs] = useState([]);
  const [joinedWalks, setJoinedWalks] = useState([]);
  const [myWalks, setMyWalks] = useState([]);
  const [upcomingWalks, setUpcomingWalks] = useState([]);
  const [followedDogs, setFollowedDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      loadHomeData();
    } else {
      setLoading(false);
    }
  }, [user, token]);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      const [dogsData, joinedData, myWalksData, upcomingData, followedData] = await Promise.all([
        getUserDogs(user.id, token),
        getJoinedWalks(user.id, token),
        getUserWalks(user.id, token),
        getUpcomingWalks(token),
        getFollowedDogs(user.id, token)
      ]);
      setMyDogs(dogsData);
      setJoinedWalks(joinedData);
      setMyWalks(myWalksData);
      setUpcomingWalks(upcomingData.slice(0, 6));
      setFollowedDogs(followedData);
    } catch (err) {
      alert(err.message);
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

  return (
    <div>
      <Navbar />
      
      <div className="container mt-4">
        {/* header */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <img 
                src={user?.profileImageUrl?.trim() ? user.profileImageUrl : defaultUserImage}
                alt={user?.displayName || user?.username}
                className="rounded-circle object-fit-cover me-3"
                style={{ width: '80px', height: '80px' }}
              />
              <div>
                <h2 className="mb-1">
                  ¡Hola, {user?.displayName || user?.username}! <i className="bi bi-hand-wave"></i>
                </h2>
                <p className="text-muted mb-0">Bienvenido a PawPals</p>
              </div>
            </div>
          </div>
        </div>

        {/* mis perros */}
        <HomeSection
          title="Mis perros"
          icon={<i className="bi bi-house-heart-fill"></i>}
          linkTo="/dogs"
          items={myDogs}
          emptyMessage="No tienes perros registrados."
          emptyAction={{ link: "/dogs", text: "¡Añade tu primer perro!" }}
        >
          <div className="row">
            {myDogs.map((dog) => (
              <div key={dog.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <DogCard dog={dog} actions={null} />
              </div>
            ))}
          </div>
        </HomeSection>

        {/* paseos de mis perros */}
        <HomeSection
          title="Paseos de mis perros"
          icon={<i className="bi bi-signpost-2-fill"></i>}
          linkTo="/walks"
          items={joinedWalks}
          emptyMessage="Tus perros no están apuntados a ningún paseo todavía."
        >
          <div className="row">
            {joinedWalks.map((participation) => (
              <div key={participation.id} className="col-12 col-md-6 col-lg-4 mb-3">
                <WalkCard walk={participation.walk} />
              </div>
            ))}
          </div>
        </HomeSection>

        {/* mis paseos creados */}
        <HomeSection
          title="Mis paseos"
          icon={<i className="bi bi-pencil-square"></i>}
          linkTo="/walks"
          items={myWalks}
          emptyMessage="No has creado ningún paseo todavía."
          emptyAction={{ link: "/walks", text: "¡Crea uno ahora!" }}
        >
          <div className="row">
            {myWalks.map((walk) => (
              <div key={walk.id} className="col-12 col-md-6 col-lg-4 mb-3">
                <WalkCard walk={walk} />
              </div>
            ))}
          </div>
        </HomeSection>

        {/* próximos paseos */}
        <HomeSection
          title="Próximos paseos"
          icon={<i className="bi bi-star-fill"></i>}
          linkTo="/walks"
          items={upcomingWalks}
          emptyMessage="No hay paseos próximos disponibles."
        >
          <div className="row">
            {upcomingWalks.map((walk) => (
              <div key={walk.id} className="col-12 col-md-6 col-lg-4 mb-3">
                <WalkCard walk={walk} />
              </div>
            ))}
          </div>
        </HomeSection>

        {/* pawfriends */}
        <HomeSection
          title="PawFriends"
          icon={<i className="bi bi-heart-fill"></i>}
          linkTo="/pawfriends"
          items={followedDogs}
          emptyMessage="No sigues a ningún perro todavía."
          emptyAction={{ link: "/pawfriends", text: "¡Busca PawFriends!" }}
        >
          <div className="d-flex flex-wrap gap-3">
            {followedDogs.map((dog) => (
              <PawFriendBadge key={dog.id} dog={dog} />
            ))}
          </div>
        </HomeSection>
      </div>
    </div>
  );
}

