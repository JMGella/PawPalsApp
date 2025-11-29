import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4">🐾 Bienvenido a PawPals</h1>
          <p className="lead mb-4">
            La red social para conectar con otros dueños de perros y organizar paseos
          </p>

          {isAuthenticated ? (
            <div>
              <Link to="/dashboard">
                <button className="btn btn-info btn-lg">Entrar</button>
              </Link>
            </div>
          ) : (
            <div className="d-flex gap-3 justify-content-center">
              <Link to="/login">
                <button className="btn btn-info btn-lg">Iniciar sesión</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-outline-info btn-lg">Registrarse</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

