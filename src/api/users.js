const API_URL = import.meta.env.VITE_API_URL;

/**
 * Create a new user (register)
 * @param {Object} userData - User data
 * @returns {Promise<Object>} Created user
 */
export async function createUser(userData) {
  const res = await fetch(`${API_URL}/pawpalsapi/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al crear usuario');
  }

  return res.json();
}

/**
 * Get user by ID
 * @param {number} userId - User ID
 * @param {string} token - JWT token
 * @returns {Promise<Object>} User data
 */
export async function getUser(userId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al obtener usuario');
  }

  return res.json();
}

/**
 * Get all users
 * @param {string} token - JWT token
 * @returns {Promise<Array>} List of users
 */
export async function getAllUsers(token) {
  const res = await fetch(`${API_URL}/pawpalsapi/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al obtener usuarios');
  }

  return res.json();
}

/**
 * Update user data
 * @param {number} userId - User ID
 * @param {Object} userData - Updated user data
 * @param {string} token - JWT token
 * @returns {Promise<Object>} Updated user
 */
export async function updateUser(userId, userData, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/users/${userId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al actualizar usuario');
  }

  return res.json();
}

/**
 * Delete user
 * @param {number} userId - User ID
 * @param {string} token - JWT token
 * @returns {Promise<void>}
 */
export async function deleteUser(userId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al eliminar usuario');
  }
}
