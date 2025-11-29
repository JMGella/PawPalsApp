import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { DogCard } from '../components/DogCard';
import { DogForm } from '../components/DogForm';
import { useAuth } from '../hooks/useAuth';
import { getUserDogs, createDog, deleteDog, updateDog } from '../api/dogs';

export function Dogs() {
  const { user, token } = useAuth();
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDog, setEditingDog] = useState(null);

  useEffect(() => {
    loadDogs();
  }, []);

  const loadDogs = async () => {
    try {
      setLoading(true);
      const data = await getUserDogs(user.id, token);
      setDogs(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingDog) {
        await updateDog(editingDog.id, {
          ...formData,
          profileImageUrl: formData.profileImageUrl || null,
        }, token);
        setEditingDog(null);
      } else {
        await createDog(user.id, {
          ...formData,
          profileImageUrl: formData.profileImageUrl || null,
        }, token);
      }
      
      setShowForm(false);
      loadDogs();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (dog) => {
    setEditingDog(dog);
    setShowForm(true);
  };

  const handleDelete = async (dogId) => {
    if (!window.confirm('¿Estás seguro de eliminar este perro?')) return;

    try {
      await deleteDog(dogId, token);
      loadDogs();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingDog(null);
  };

  return (
    <div>
      <Navbar />
      
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Mis Perros</h1>
          <button 
            className="btn btn-info"
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) setEditingDog(null);
            }}
          >
            {showForm ? 'Cancelar' : 'Añadir Perro'}
          </button>
        </div>

        {showForm && (
          <DogForm 
            initialData={editingDog}
            onSubmit={handleSubmit} 
            onCancel={handleCancelForm} 
          />
        )}

        {loading ? (
          <p>Cargando...</p>
        ) : dogs.length === 0 ? (
          <div className="alert alert-info">
            No tienes perros registrados. ¡Añade tu primer perro!
          </div>
        ) : ( 
          <div className="row">
            {dogs.map((dog) => (
              <div key={dog.id} className="col-md-6 col-lg-4 mb-4">
                <DogCard 
                  dog={dog} 
                  onEdit={handleEdit}
                  onDelete={handleDelete} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

