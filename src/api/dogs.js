const API_URL = import.meta.env.VITE_API_URL;

/**
 * Create a new dog for a user
 * @param {number} userId - User ID
 * @param {Object} dogData - Dog data
 * @param {string} token - JWT token
 * @returns {Promise<Object>} Created dog
 */
export async function createDog(userId, dogData, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/users/${userId}/dogs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dogData),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al crear perro');
  }

  return res.json();
}

/**
 * Get all dogs for a user
 * @param {number} userId - User ID
 * @param {string} token - JWT token
 * @returns {Promise<Array>} List of dogs
 */
export async function getUserDogs(userId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/users/${userId}/dogs`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al obtener perros del usuario');
  }

  return res.json();
}

/**
 * Get dog by ID
 * @param {number} dogId - Dog ID
 * @param {string} token - JWT token
 * @returns {Promise<Object>} Dog data
 */
export async function getDogById(dogId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/dogs/${dogId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al obtener perro');
  }

  return res.json();
}

/**
 * Update dog data
 * @param {number} dogId - Dog ID
 * @param {Object} dogData - Updated dog data
 * @param {string} token - JWT token
 * @returns {Promise<Object>} Updated dog
 */
export async function updateDog(dogId, dogData, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/dogs/${dogId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dogData),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al actualizar perro');
  }

  return res.json();
}

/**
 * Delete dog
 * @param {number} dogId - Dog ID
 * @param {string} token - JWT token
 * @returns {Promise<void>}
 */
export async function deleteDog(dogId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/dogs/${dogId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al eliminar perro');
  }
}

/**
 * Search dogs by name
 * @param {string} name - Dog name to search
 * @param {string} token - JWT token
 * @returns {Promise<Array>} List of matching dogs
 */
export async function searchDogs(name, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/dogs/search?name=${encodeURIComponent(name)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al buscar perros');
  }

  return res.json();
}

/**
 * Get walks for a specific dog
 * @param {number} dogId - Dog ID
 * @param {string} token - JWT token
 * @returns {Promise<Array>} List of walks
 */
export async function getDogWalks(dogId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/dogs/${dogId}/walks`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al obtener paseos del perro');
  }

  return res.json();
}
