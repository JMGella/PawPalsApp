import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { UserProfileForm } from '../components/UserProfileForm';
import { useAuth } from '../hooks/useAuth';
import { updateUser, deleteUser } from '../api/users';
import defaultUserImage from '../assets/default_user.png';

export function Dashboard() {
  const { user, token, updateUser: updateAuthUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      const updatedUser = await updateUser(user.id, formData, token);
      updateAuthUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      alert(err.message);
      throw err;
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      await deleteUser(user.id, token);
      logout();
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <Navbar />
      
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1>Mi Perfil</h1>
              {!isEditing && (
                <button 
                  className="btn btn-info"
                  onClick={() => setIsEditing(true)}
                >
                  Editar Perfil
                </button>
              )}
            </div>
            
            <div className="card">
              <div className="card-body">
                {isEditing ? (
                  <UserProfileForm 
                    user={user}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsEditing(false)}
                  />
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>

            {/* eliminar cuenta */}
            {!isEditing && (
              <div className="mt-4 text-center">
                <button 
                  className="btn btn-danger"
                  onClick={handleDeleteAccount}
                >
                  Eliminar cuenta
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

