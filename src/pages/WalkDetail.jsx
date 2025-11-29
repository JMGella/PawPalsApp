import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { WalkForm } from '../components/WalkForm';
import { WalkInfoCard } from '../components/WalkInfoCard';
import { WalkMapCard } from '../components/WalkMapCard';
import { ParticipantsList } from '../components/ParticipantsList';
import { AddDogModal } from '../components/AddDogModal';
import { useAuth } from '../hooks/useAuth';
import { getWalkSummary, updateWalk } from '../api/walks';
import { addDogToWalk, removeDogFromWalk, updateParticipation } from '../api/walkParticipation';
import { getUserDogs } from '../api/dogs';
import { formatToDateTimeLocal } from '../utils/formatters';

export function WalkDetail() {
  const { walkId } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [walk, setWalk] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [myDogs, setMyDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showAddDogModal, setShowAddDogModal] = useState(false);
  const [selectedDogId, setSelectedDogId] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    loadWalkData();
  }, [walkId]);

  const loadWalkData = async () => {
    try {
      setLoading(true);
      // getWalkSummary devuelve walk + participantes en una llamada
      const [summaryData, dogsData] = await Promise.all([
        getWalkSummary(walkId, token),
        getUserDogs(user.id, token)
      ]);
      setWalk(summaryData.walk);
      setParticipants(summaryData.participants);
      setMyDogs(dogsData);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDog = async () => {
    if (!selectedDogId) {
      alert('Por favor selecciona un perro');
      return;
    }

    try {
      setSubmitting(true);
      await addDogToWalk(walkId, { 
        dogId: parseInt(selectedDogId),
        handlerId: user.id
      }, token);
      setShowAddDogModal(false);
      setSelectedDogId('');
      loadWalkData();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveDog = async (walkDogId) => {
    if (!confirm('¿Estás seguro de que quieres desapuntar a tu perro de este paseo?')) {
      return;
    }

    try {
      await removeDogFromWalk(walkDogId, token);
      loadWalkData();
    } catch (err) {
      alert(err.message);
    }
  };

  const isWalkCreator = () => {
    return walk?.creator?.id === user.id;
  };

  const handleStatusChange = async (participantId, newStatus) => {
    try {
      await updateParticipation(participantId, { status: newStatus }, token);
      loadWalkData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleWalkStatusChange = async (newStatus) => {
    try {
      await updateWalk(walkId, { status: newStatus }, token);
      loadWalkData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditWalk = async (formData) => {
    try {
      await updateWalk(walkId, formData, token);
      setShowEditForm(false);
      loadWalkData();
    } catch (err) {
      alert(err.message);
    }
  };

  // preparar datos del paseo para el formulario
  const getWalkFormData = () => {
    if (!walk) return null;

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

  // filtrar perros que ya están apuntados
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

  // añadir el contador de participantes para el componente
  const walkWithCount = { ...walk, participantsCount: participants.length };

  return (
    <div>
      <Navbar />
      
      <div className="container">
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
          Volver
        </button>

        {/* formulario o vista */}
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
            {/* info y mapa */}
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

            {/* participantes */}
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

        {/* modal apuntar perro */}
        <AddDogModal
          show={showAddDogModal}
          availableDogs={availableDogs}
          selectedDogId={selectedDogId}
          submitting={submitting}
          onDogSelect={setSelectedDogId}
          onClose={() => {
            setShowAddDogModal(false);
            setSelectedDogId('');
          }}
          onSubmit={handleAddDog}
        />
      </div>
    </div>
  );
}
