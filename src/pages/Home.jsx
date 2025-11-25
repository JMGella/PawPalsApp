import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <h1>Bienvenido a PawPals</h1>
      <p>La red social para conectar con otros dueños de perros y organizar paseos</p>

      {isAuthenticated ? (
        <Navigate to="/dashboard" />
      ) : (
        <div>
          <Link to="/login">
            <button>Iniciar sesión</button>
          </Link>
          <Link to="/register">
            <button>Registrarse</button>
          </Link>
        </div>
      )}
    </div>
  );
}

