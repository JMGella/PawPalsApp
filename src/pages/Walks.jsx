import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { WalkCard } from '../components/WalkCard';
import { WalkForm } from '../components/WalkForm';
import { useAuth } from '../hooks/useAuth';
import { getUpcomingWalks, createWalk, getUserWalks } from '../api/walks';

export function Walks() {
  const { user, token } = useAuth();
  const [upcomingWalks, setUpcomingWalks] = useState([]);
  const [myWalks, setMyWalks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' o 'my-walks'

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
      } else {
        const data = await getUserWalks(user.id, token);
        setMyWalks(data);
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

  const currentWalks = activeTab === 'upcoming' ? upcomingWalks : myWalks;

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

        {/* Tabs */}
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
        </ul>

        {/* Lista de paseos */}
        {loading ? (
          <p>Cargando...</p>
        ) : currentWalks.length === 0 ? (
          <div className="alert alert-info">
            {activeTab === 'upcoming' 
              ? 'No hay paseos próximos disponibles.'
              : 'No has creado ningún paseo todavía.'}
          </div>
        ) : (
          <div className="row">
            {currentWalks.map((walk) => (
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


