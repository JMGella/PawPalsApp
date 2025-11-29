import { useNavigate } from 'react-router-dom';
import defaultDogImage from '../assets/default_dog.png';

export function PawFriendBadge({ dog }) {
  const navigate = useNavigate();

  return (
    <div 
      className="text-center cursor-pointer"
      onClick={() => navigate(`/dogs/${dog.id}`)}
      style={{ width: '100px' }}
    >
      <img 
        src={dog.profileImageUrl?.trim() ? dog.profileImageUrl : defaultDogImage}
        alt={dog.name}
        className="rounded-circle object-fit-cover mb-2"
        style={{ width: '80px', height: '80px' }}
      />
      <p className="mb-0 text-truncate small">{dog.name}</p>
    </div>
  );
}
