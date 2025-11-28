import { Navbar } from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h1 className="mb-4">Dashboard</h1>
            <p className="lead">Bienvenido, {user?.displayName || user?.username}!</p>
            
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Tu perfil</h5>
                <p className="card-text"><strong>Usuario:</strong> {user?.username}</p>
                <p className="card-text"><strong>Email:</strong> {user?.email}</p>
                {user?.displayName && <p className="card-text"><strong>Nombre:</strong> {user.displayName}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

