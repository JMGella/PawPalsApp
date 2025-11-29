const API_URL = import.meta.env.VITE_API_URL;

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
