const API_URL = import.meta.env.VITE_API_URL;

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
