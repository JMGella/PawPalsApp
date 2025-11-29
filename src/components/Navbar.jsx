import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info mb-4">
      <div className="container">
        <Link className="navbar-brand text-dark fw-bold" to="/dashboard">🐾 PawPals</Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/walks">Paseos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/dogs">Mis Perros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/pawfriends">PawFriends</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/dashboard">Panel de Control</Link>
            </li>
          </ul>
          
          <div className="d-flex align-items-center">
            <span className="text-dark me-3">Hola, {user?.displayName || user?.username}</span>
            <button className="btn btn-outline-dark btn-sm" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
