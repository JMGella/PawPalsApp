const API_URL = import.meta.env.VITE_API_URL;

/**
 * Authenticate user and get JWT token
 * @param {Object} credentials - { username, password }
 * @returns {Promise<Object>} Token response
 */
export async function login(credentials) {
  const res = await fetch(`${API_URL}/pawpalsapi/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Error al iniciar sesión');
  }

  return res.json();
}
