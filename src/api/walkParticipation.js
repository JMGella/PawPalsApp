const API_URL = import.meta.env.VITE_API_URL;

/**
 * Add a dog to a walk
 * @param {number} walkId - Walk ID
 * @param {Object} participationData - { dogId, ... }
 * @param {string} token - JWT token
 * @returns {Promise<Object>} Participation data
 */
export async function addDogToWalk(walkId, participationData, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/walks/${walkId}/dogs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(participationData),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al unir perro al paseo');
  }

  return res.json();
}

/**
 * Get all dogs participating in a walk
 * @param {number} walkId - Walk ID
 * @param {string} token - JWT token
 * @returns {Promise<Array>} List of participating dogs
 */
export async function getWalkParticipants(walkId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/walks/${walkId}/dogs`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al obtener participantes del paseo');
  }

  return res.json();
}

/**
 * Update walk participation
 * @param {number} walkDogId - Walk-Dog relationship ID
 * @param {Object} participationData - Updated participation data
 * @param {string} token - JWT token
 * @returns {Promise<Object>} Updated participation
 */
export async function updateParticipation(walkDogId, participationData, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/walks/update-participation/${walkDogId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(participationData),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al actualizar participación');
  }

  return res.json();
}

/**
 * Remove a dog from a walk
 * @param {number} walkDogId - Walk-Dog relationship ID
 * @param {string} token - JWT token
 * @returns {Promise<void>}
 */
export async function removeDogFromWalk(walkDogId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/walks/remove-dog/${walkDogId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al eliminar perro del paseo');
  }
}
