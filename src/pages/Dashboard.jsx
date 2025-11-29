import { Navbar } from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';
import defaultUserImage from '../assets/default_user.png';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h1 className="mb-4">Panel de Control</h1>
            
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <img 
                    src={user?.profileImageUrl?.trim() ? user.profileImageUrl : defaultUserImage}
                    alt={user?.displayName || user?.username}
                    className="rounded-circle object-fit-cover me-3"
                    style={{ width: '100px', height: '100px' }}
                  />
                  <div>
                    <h3 className="mb-1">{user?.displayName || user?.username}</h3>
                    <p className="text-muted mb-0">@{user?.username}</p>
                  </div>
                </div>
                <hr />
                <h5 className="card-title">Información del perfil</h5>
                {user?.displayName && <p className="card-text"><strong>Nombre:</strong> {user.displayName}</p>}
                {user?.username && <p className="card-text"><strong>Usuario:</strong> {user.username}</p>}
                <p className="card-text"><strong>Email:</strong> {user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

