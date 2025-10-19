// Servicio de datos listo para backend.
// Usa API si VITE_API_BASE está definida; si no, cae en localStorage.
const STORAGE_KEY = 'contacts';
const API_BASE = import.meta.env.VITE_API_BASE;
const USE_API = Boolean(API_BASE);

async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error('API GET failed');
  return await res.json();
}
async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('API POST failed');
  return await res.json();
}
async function apiPut(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('API PUT failed');
  return await res.json();
}
async function apiDelete(path) {
  const res = await fetch(`${API_BASE}${path}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('API DELETE failed');
}

export async function listContacts() {
  if (USE_API) return await apiGet('/contacts');
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
  if (USE_API) return await apiPost('/contacts', partial);
  const all = await listContacts();
  const nextId = all.length === 0 ? 1 : Math.max(...all.map((c) => c.id)) + 1;
  const newContact = { id: nextId, ...partial };
  const updated = [...all, newContact];
  await saveContacts(updated);
  return newContact;
}

export async function updateContact(id, patch) {
  if (USE_API) return await apiPut(`/contacts/${id}`, patch);
  const all = await listContacts();
  const updated = all.map((c) => (c.id === id ? { ...c, ...patch } : c));
  await saveContacts(updated);
  return updated.find((c) => c.id === id) || null;
}

export async function deleteContact(id) {
  if (USE_API) return await apiDelete(`/contacts/${id}`);
  const all = await listContacts();
  const updated = all.filter((c) => c.id !== id);
  await saveContacts(updated);
}


