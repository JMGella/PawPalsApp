import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { WalkForm } from '../components/WalkForm';
import { WalkInfoCard } from '../components/WalkInfoCard';
import { WalkMapCard } from '../components/WalkMapCard';
import { ParticipantsList } from '../components/ParticipantsList';
import { AddDogModal } from '../components/AddDogModal';
import { useAuth } from '../hooks/useAuth';
import { getWalkById, updateWalk } from '../api/walks';
import { getWalkParticipants, addDogToWalk, removeDogFromWalk, updateParticipation } from '../api/walkParticipation';
import { getUserDogs } from '../api/dogs';

export function WalkDetail() {
  const { walkId } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [walk, setWalk] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [myDogs, setMyDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddDogModal, setShowAddDogModal] = useState(false);
  const [selectedDogId, setSelectedDogId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    loadWalkData();
  }, [walkId]);

  const loadWalkData = async () => {
    try {
      setLoading(true);
      setError('');
      const [walkData, participantsData, dogsData] = await Promise.all([
        getWalkById(walkId, token),
        getWalkParticipants(walkId, token),
        getUserDogs(user.id, token)
      ]);
      setWalk(walkData);
      setParticipants(participantsData);
      setMyDogs(dogsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDog = async () => {
    if (!selectedDogId) {
      setError('Por favor selecciona un perro');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await addDogToWalk(walkId, { 
        dogId: parseInt(selectedDogId),
        handlerId: user.id
      }, token);
      setShowAddDogModal(false);
      setSelectedDogId('');
      loadWalkData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveDog = async (walkDogId) => {
    if (!confirm('¿Estás seguro de que quieres desapuntar a tu perro de este paseo?')) {
      return;
    }

    try {
      setError('');
      await removeDogFromWalk(walkDogId, token);
      loadWalkData();
    } catch (err) {
      setError(err.message);
    }
  };

  const isWalkCreator = () => {
    return walk?.creator?.id === user.id;
  };

  const handleStatusChange = async (participantId, newStatus) => {
    try {
      setError('');
      await updateParticipation(participantId, { status: newStatus }, token);
      loadWalkData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleWalkStatusChange = async (newStatus) => {
    try {
      setError('');
      await updateWalk(walkId, { status: newStatus }, token);
      loadWalkData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditWalk = async (formData) => {
    try {
      setError('');
      await updateWalk(walkId, formData, token);
      setShowEditForm(false);
      loadWalkData(); // Recargar datos
    } catch (err) {
      setError(err.message);
    }
  };

  // convertir los datos del walk para el  formulario
  const getWalkFormData = () => {
    if (!walk) return null;
    
    // Convertir offset date a datetime-local format
    const formatToDateTimeLocal = (isoString) => {
      if (!isoString) return '';
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return {
      title: walk.title,
      description: walk.description,
      startTime: formatToDateTimeLocal(walk.startTime),
      endTime: formatToDateTimeLocal(walk.endTime),
      latitude: walk.latitude,
      longitude: walk.longitude,
      maxDogs: walk.maxDogs,
      status: walk.status
    };
  };

  // perros apuntados
  const availableDogs = myDogs.filter(
    dog => !participants.some(p => p.dog?.id === dog.id)
  );

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

  if (!walk) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="alert alert-warning" role="alert">
            Paseo no encontrado
          </div>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
      </div>
    );
  }

  // Añadir contador de participantes al objeto walk para WalkInfoCard
  const walkWithCount = { ...walk, participantsCount: participants.length };

  return (
    <div>
      <Navbar />
      
      <div className="container">
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
          ← Volver
        </button>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}

        {/* Formulario de edición o vista de detalles */}
        {showEditForm ? (
          <div className="mb-4">
            <WalkForm 
              initialData={getWalkFormData()}
              onSubmit={handleEditWalk}
              onCancel={() => setShowEditForm(false)}
            />
          </div>
        ) : (
          <div className="row">
            {/* Columna izquierda: Info del paseo y mapa */}
            <div className="col-md-6 mb-4">
              <WalkInfoCard
                walk={walkWithCount}
                isCreator={isWalkCreator()}
                onStatusChange={handleWalkStatusChange}
                onEdit={() => setShowEditForm(true)}
              />
              <WalkMapCard 
                latitude={walk.latitude} 
                longitude={walk.longitude} 
              />
            </div>

            {/* Columna derecha: Lista de participantes */}
            <div className="col-md-6">
              <ParticipantsList
                participants={participants}
                walk={walk}
                isCreator={isWalkCreator()}
                myDogs={myDogs}
                availableDogs={availableDogs}
                onStatusChange={handleStatusChange}
                onRemoveDog={handleRemoveDog}
                onAddDogClick={() => setShowAddDogModal(true)}
              />
            </div>
          </div>
        )}

        {/* Modal para apuntar perro */}
        <AddDogModal
          show={showAddDogModal}
          availableDogs={availableDogs}
          selectedDogId={selectedDogId}
          submitting={submitting}
          onDogSelect={setSelectedDogId}
          onClose={() => {
            setShowAddDogModal(false);
            setSelectedDogId('');
            setError('');
          }}
          onSubmit={handleAddDog}
        />
      </div>
    </div>
  );
}
