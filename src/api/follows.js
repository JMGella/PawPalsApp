const API_URL = import.meta.env.VITE_API_URL;

/**
 * Get all dogs followed by a user
 * @param {number} userId - User ID
 * @param {string} token - JWT token
 * @returns {Promise<Array>} List of followed dogs
 */
export async function getFollowedDogs(userId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/users/${userId}/followed`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al obtener perros seguidos');
  }

  return res.json();
}

/**
 * Follow a dog
 * @param {number} userId - User ID
 * @param {number} dogId - Dog ID to follow
 * @param {string} token - JWT token
 * @returns {Promise<Object>} Follow relationship
 */
export async function followDog(userId, dogId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/users/${userId}/follow-dog/${dogId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al seguir perro');
  }

  return res.json();
}

/**
 * Unfollow a dog
 * @param {number} userId - User ID
 * @param {number} dogId - Dog ID to unfollow
 * @param {string} token - JWT token
 * @returns {Promise<void>}
 */
export async function unfollowDog(userId, dogId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/users/${userId}/follow-dog/${dogId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al dejar de seguir perro');
  }
}
