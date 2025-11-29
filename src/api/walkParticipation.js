const API_URL = import.meta.env.VITE_API_URL;

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
    throw new Error('Error al unir perro al paseo');
  }

  return res.json();
}

export async function getWalkParticipants(walkId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/walks/${walkId}/dogs`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Error al obtener participantes del paseo');
  }

  return res.json();
}

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
    throw new Error('Error al actualizar participación');
  }

  return res.json();
}

export async function removeDogFromWalk(walkDogId, token) {
  const res = await fetch(`${API_URL}/pawpalsapi/walks/remove-dog/${walkDogId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Error al eliminar perro del paseo');
  }
}
