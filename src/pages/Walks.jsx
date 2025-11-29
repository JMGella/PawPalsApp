import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { WalkCard } from '../components/WalkCard';
import { WalkForm } from '../components/WalkForm';
import { useAuth } from '../hooks/useAuth';
import { getUpcomingWalks, createWalk, getUserWalks, getJoinedWalks } from '../api/walks';

export function Walks() {
  const { user, token } = useAuth();
  const [upcomingWalks, setUpcomingWalks] = useState([]);
  const [myWalks, setMyWalks] = useState([]);
  const [joinedWalks, setJoinedWalks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    loadWalks();
  }, [activeTab]);

  const loadWalks = async () => {
    try {
      setLoading(true);
      setError('');
      if (activeTab === 'upcoming') {
        const data = await getUpcomingWalks(token);
        setUpcomingWalks(data);
      } else if (activeTab === 'my-walks') {
        const data = await getUserWalks(user.id, token);
        setMyWalks(data);
      } else if (activeTab === 'joined') {
        const data = await getJoinedWalks(user.id, token);
        setJoinedWalks(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setError('');
      await createWalk(user.id, formData, token);
      setShowForm(false);
      loadWalks();
    } catch (err) {
      setError(err.message);
    }
  };

  const getCurrentWalks = () => {
    if (activeTab === 'upcoming') return upcomingWalks;
    if (activeTab === 'my-walks') return myWalks;
    if (activeTab === 'joined') return joinedWalks.map(p => p.walk);
    return [];
  };

  return (
    <div>
      <Navbar />
      
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Paseos</h1>
          <button 
            className="btn btn-info"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancelar' : 'Crear Paseo'}
          </button>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {showForm && (
          <WalkForm 
            onSubmit={handleSubmit} 
            onCancel={() => setShowForm(false)} 
          />
        )}

        {/* tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Próximos Paseos
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'my-walks' ? 'active' : ''}`}
              onClick={() => setActiveTab('my-walks')}
            >
              Mis Paseos Creados
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'joined' ? 'active' : ''}`}
              onClick={() => setActiveTab('joined')}
            >
              Paseos de mis Perros
            </button>
          </li>
        </ul>

        {/* lista paseos */}
        {loading ? (
          <p>Cargando...</p>
        ) : getCurrentWalks().length === 0 ? (
          <div className="alert alert-info">
            {activeTab === 'upcoming' 
              ? 'No hay paseos próximos disponibles.'
              : activeTab === 'my-walks'
              ? 'No has creado ningún paseo todavía.'
              : 'Tus perros no están apuntados a ningún paseo.'}
          </div>
        ) : (
          <div className="row">
            {getCurrentWalks().map((walk) => (
              <div key={walk.id} className="col-12 col-md-6 col-lg-4 mb-3">
                <WalkCard walk={walk} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


