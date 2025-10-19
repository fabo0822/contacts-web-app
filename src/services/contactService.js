// Servicio simple para contactos con backend
const STORAGE_KEY = 'contacts';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5239';

// Verificar si hay API configurada
const hasApi = Boolean(import.meta.env.VITE_API_URL);

// Función para construir la URL correcta
function getApiUrl(path) {
  if (import.meta.env.DEV && hasApi) {
    // En desarrollo, usar proxy de Vite
    return `/api${path}`;
  }
  // En producción o sin proxy, usar URL completa
  return `${API_URL}${path}`;
}

// Obtener todos los contactos
export async function getContacts() {
  if (hasApi) {
    try {
      const response = await fetch(getApiUrl('/contacts'));
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('API no disponible, usando datos locales');
    }
  }
  
  // Fallback a localStorage
  const contacts = localStorage.getItem(STORAGE_KEY);
  return contacts ? JSON.parse(contacts) : [];
}

// Guardar contactos (solo para localStorage)
export function saveContacts(contacts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

// Agregar nuevo contacto
export async function addContact(newContact) {
  if (hasApi) {
    try {
      const response = await fetch(getApiUrl('/contacts'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact)
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Error al crear contacto en API, guardando localmente');
    }
  }
  
  // Fallback a localStorage
  const contacts = await getContacts();
  const nextId = contacts.length === 0 ? 1 : contacts[contacts.length - 1].id + 1;
  const contact = { id: nextId, ...newContact };
  contacts.push(contact);
  saveContacts(contacts);
  return contact;
}

// Actualizar contacto
export async function updateContact(id, changes) {
  if (hasApi) {
    try {
      const response = await fetch(getApiUrl(`/contacts/${id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes)
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Error al actualizar en API, actualizando localmente');
    }
  }
  
  // Fallback a localStorage
  const contacts = await getContacts();
  const index = contacts.findIndex(c => c.id === id);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...changes };
    saveContacts(contacts);
  }
}

// Eliminar contacto
export async function deleteContact(id) {
  if (hasApi) {
    try {
      const response = await fetch(getApiUrl(`/contacts/${id}`), {
        method: 'DELETE'
      });
      if (response.ok) {
        return;
      }
    } catch (error) {
      console.log('Error al eliminar en API, eliminando localmente');
    }
  }
  
  // Fallback a localStorage
  const contacts = await getContacts();
  const filtered = contacts.filter(c => c.id !== id);
  saveContacts(filtered);
}


