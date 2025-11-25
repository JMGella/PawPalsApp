import { Navbar } from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      
      <div>
        <h1>Dashboard</h1>
        <p>Bienvenido, {user?.displayName || user?.username}!</p>
        
        <div>
          <h2>Tu perfil</h2>
          <p>Usuario: {user?.username}</p>
          <p>Email: {user?.email}</p>
          {user?.displayName && <p>Nombre: {user.displayName}</p>}
        </div>
      </div>
    </div>
  );
}

