import { useState } from 'react';

export function UserProfileForm({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    username: user?.username || '',
    email: user?.email || '',
    profileImageUrl: user?.profileImageUrl || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="displayName" className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          id="displayName"
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="username" className="form-label">Usuario</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="profileImageUrl" className="form-label">URL de la imagen de perfil</label>
        <input
          type="url"
          className="form-control"
          id="profileImageUrl"
          name="profileImageUrl"
          value={formData.profileImageUrl}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-info flex-grow-1">
          Guardar Cambios
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
