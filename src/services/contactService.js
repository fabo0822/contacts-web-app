// Servicio de datos listo para backend.
// Usa API si VITE_API_BASE está definida; si no, cae en localStorage.
const STORAGE_KEY = 'contacts';
const API_BASE = import.meta.env.VITE_API_URL;
const PATH_PREFIX = import.meta.env.VITE_API_PATH_PREFIX || '/api';
const USE_API = Boolean(API_BASE);

function withPrefix(path) {
  // En dev con proxy de Vite, usamos solo PATH_PREFIX para evitar CORS
  if (import.meta.env.DEV && PATH_PREFIX) return `${PATH_PREFIX}${path}`;
  // En producción/directo, usamos API_BASE + PATH_PREFIX
  return `${API_BASE || ''}${PATH_PREFIX}${path}`;
}

async function apiGet(path) {
  const res = await fetch(withPrefix(path));
  if (!res.ok) throw new Error('API GET failed');
  return await res.json();
}
async function apiPost(path, body) {
  const res = await fetch(withPrefix(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('API POST failed');
  return await res.json();
}
async function apiPut(path, body) {
  const res = await fetch(withPrefix(path), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('API PUT failed');
  return await res.json();
}
async function apiDelete(path) {
  const res = await fetch(withPrefix(path), { method: 'DELETE' });
  if (!res.ok) throw new Error('API DELETE failed');
}

export async function listContacts() {
  if (USE_API) {
    try {
      return await apiGet('/contacts');
    } catch (e) {
      console.warn('API no disponible, usando almacenamiento local.', e);
    }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveContacts(contacts) {
  if (USE_API) return; // en API, la persistencia es por endpoint
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  } catch {}
}

export async function addContact(partial) {
  if (USE_API) {
    try {
      return await apiPost('/contacts', partial);
    } catch (e) {
      console.warn('POST API falló, guardando localmente.', e);
    }
  }
  const all = await listContacts();
  const nextId = all.length === 0 ? 1 : Math.max(...all.map((c) => c.id)) + 1;
  const newContact = { id: nextId, ...partial };
  const updated = [...all, newContact];
  await saveContacts(updated);
  return newContact;
}

export async function updateContact(id, patch) {
  if (USE_API) {
    try {
      return await apiPut(`/contacts/${id}`, patch);
    } catch (e) {
      console.warn('PUT API falló, actualizando localmente.', e);
    }
  }
  const all = await listContacts();
  const updated = all.map((c) => (c.id === id ? { ...c, ...patch } : c));
  await saveContacts(updated);
  return updated.find((c) => c.id === id) || null;
}

export async function deleteContact(id) {
  if (USE_API) {
    try {
      return await apiDelete(`/contacts/${id}`);
    } catch (e) {
      console.warn('DELETE API falló, eliminando localmente.', e);
    }
  }
  const all = await listContacts();
  const updated = all.filter((c) => c.id !== id);
  await saveContacts(updated);
}

// Permite saber si la API está disponible (para mostrar banner Offline)
export async function testApi() {
  if (!USE_API) return false;
  try {
    await apiGet('/contacts');
    return true;
  } catch {
    return false;
  }
}


