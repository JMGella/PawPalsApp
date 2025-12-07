import { Link } from 'react-router-dom';
import pawpalsLogo from '../assets/pawpalslogo.png';

export function Landing() {
  return (
    <div style={{ backgroundColor: '#a0d3d9', minHeight: '100vh', margin: 0, padding: 0 }}>
      <div className="container" style={{ paddingTop: '3rem' }}>
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          {/* Logo centrado */}
          <div className="mb-4">
            <img 
              src={pawpalsLogo} 
              alt="PawPals Logo" 
              style={{ maxWidth: '400px', width: '100%', height: 'auto' }}
            />
          </div>

          <h1 className="display-4 mb-4">
            <i className="bi bi-paw me-3"></i>Bienvenido a PawPals
          </h1>
          <p className="lead mb-4">
            La red social para conectar con otros dueños de perros y organizar paseos
          </p>

          <div className="d-flex gap-3 justify-content-center">
            <Link to="/login">
              <button className="btn btn-info btn-lg">Iniciar sesión</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-dark btn-lg">Registrarse</button>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
