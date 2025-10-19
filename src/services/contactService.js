// Servicio de datos local. Mantiene la misma interfaz que tendremos con la API real.
const STORAGE_KEY = 'contacts';

export function listContacts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveContacts(contacts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  } catch {}
}

export function addContact(partial) {
  const all = listContacts();
  const nextId = all.length === 0 ? 1 : Math.max(...all.map((c) => c.id)) + 1;
  const newContact = { id: nextId, ...partial };
  const updated = [...all, newContact];
  saveContacts(updated);
  return newContact;
}

export function updateContact(id, patch) {
  const all = listContacts();
  const updated = all.map((c) => (c.id === id ? { ...c, ...patch } : c));
  saveContacts(updated);
  return updated.find((c) => c.id === id) || null;
}

export function deleteContact(id) {
  const all = listContacts();
  const updated = all.filter((c) => c.id !== id);
  saveContacts(updated);
}


