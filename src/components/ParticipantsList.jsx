import { ParticipantCard } from './ParticipantCard';

export function ParticipantsList({ 
  participants, 
  walk,
  isCreator, 
  myDogs,
  availableDogs,
  onStatusChange, 
  onRemoveDog, 
  onAddDogClick 
}) {
  const isMyDog = (dogId) => {
    return myDogs.some(dog => dog.id === dogId);
  };

  const isWalkScheduled = walk.status === 'SCHEDULED';

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Perros participantes ({participants.length})</h3>
        {isWalkScheduled && availableDogs.length > 0 && (
          <button 
            className="btn btn-info btn-sm"
            onClick={onAddDogClick}
          >
            + Apuntar perro
          </button>
        )}
      </div>
      
      {participants.length === 0 ? (
        <div className="alert alert-info">
          Todavía no hay perros apuntados a este paseo.
        </div>
      ) : (
        <div className="row">
          {participants.map((participant) => (
            <ParticipantCard
              key={participant.id}
              participant={participant}
              isCreator={isCreator}
              isMyDog={isMyDog(participant.dog?.id)}
              isWalkScheduled={isWalkScheduled}
              onStatusChange={onStatusChange}
              onRemove={onRemoveDog}
            />
          ))}
        </div>
      )}
    </div>
  );
}
