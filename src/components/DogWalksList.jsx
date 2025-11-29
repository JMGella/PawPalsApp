import { WalkCard } from './WalkCard';

export function DogWalksList({ walks }) {
  return (
    <div>
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
  );
}
