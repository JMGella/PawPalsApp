const API_URL = import.meta.env.VITE_API_URL;

export async function getCurrentUser(token) {
  const res = await fetch(`${API_URL}/pawpalsapi/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al obtener usuario actual');
  }

  return res.json();
}

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
