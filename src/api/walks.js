const API_URL = import.meta.env.VITE_API_URL;

/**
 * Create a new walk
 * @param {number} userId - User ID
 * @param {Object} walkData - Walk data
 * @param {string} token - JWT token
 * @returns {Promise<Object>} Created walk
 */
export async function createWalk(userId, walkData, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/users/${userId}/walks`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(walkData),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al crear paseo');
  }

  return res.json();
}

/**
 * Get all walks created by a user
 * @param {number} userId - User ID
 * @param {string} token - JWT token
 * @returns {Promise<Array>} List of walks
 */
export async function getUserWalks(userId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/users/${userId}/walks`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al obtener paseos del usuario');
  }

  return res.json();
}

/**
 * Get all walks
 * @param {string} token - JWT token
 * @returns {Promise<Array>} List of all walks
 */
export async function getAllWalks(token) {
  const res = await fetch(`${API_URL}/pawpalsapi/walks`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al obtener paseos');
  }

  return res.json();
}

/**
 * Get upcoming walks
 * @param {string} token - JWT token
 * @returns {Promise<Array>} List of upcoming walks
 */
export async function getUpcomingWalks(token) {
  const res = await fetch(`${API_URL}/pawpalsapi/walks/upcoming`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al obtener paseos próximos');
  }

  return res.json();
}

/**
 * Get walk by ID
 * @param {number} walkId - Walk ID
 * @param {string} token - JWT token
 * @returns {Promise<Object>} Walk data
 */
export async function getWalkById(walkId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/walks/${walkId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al obtener paseo');
  }

  return res.json();
}

/**
 * Update walk data
 * @param {number} walkId - Walk ID
 * @param {Object} walkData - Updated walk data
 * @param {string} token - JWT token
 * @returns {Promise<Object>} Updated walk
 */
export async function updateWalk(walkId, walkData, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/walks/${walkId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(walkData),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al actualizar paseo');
  }

  return res.json();
}

/**
 * Cancel a walk
 * @param {number} walkId - Walk ID
 * @param {string} token - JWT token
 * @returns {Promise<Object>} Cancelled walk
 */
export async function cancelWalk(walkId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/walks/${walkId}/cancel`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al cancelar paseo');
  }

  return res.json();
}

/**
 * Get walk summary (walk info + participants)
 * @param {number} walkId - Walk ID
 * @param {string} token - JWT token
 * @returns {Promise<Object>} Walk summary
 */
export async function getWalkSummary(walkId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/walks/${walkId}/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al obtener resumen del paseo');
  }

  return res.json();
}

/**
 * Get walks joined by user's dogs
 * @param {number} userId - User ID
 * @param {string} token - JWT token
 * @returns {Promise<Array>} List of walks joined
 */
export async function getJoinedWalks(userId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/users/${userId}/walks/joined`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al obtener paseos unidos');
  }

  return res.json();
}
