// Servicio para contactos con API backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5239';

// Función para construir la URL correcta
function getApiUrl(path) {
  if (import.meta.env.DEV) {
    // En desarrollo, usar proxy de Vite
    return `/api${path}`;
  }
  // En producción, usar URL completa
  return `${API_URL}${path}`;
}

// Obtener todos los contactos
export async function getContacts() {
  try {
    const response = await fetch(getApiUrl('/contacts'));
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Error al obtener contactos');
  } catch (error) {
    console.error('Error al cargar contactos:', error);
    throw error;
  }
}

// Agregar nuevo contacto
export async function addContact(newContact) {
  try {
    console.log('URL de la API:', getApiUrl('/contacts')); // Debug
    const response = await fetch(getApiUrl('/contacts'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContact)
    });
    
    console.log('Respuesta del servidor:', response.status, response.statusText); // Debug
    
    if (response.ok) {
      const result = await response.json();
      console.log('Contacto creado exitosamente:', result); // Debug
      return result;
    }
    
    // Si no es exitosa, obtener el mensaje de error del servidor
    const errorText = await response.text();
    console.error('Error del servidor:', errorText); // Debug
    throw new Error(`Error del servidor (${response.status}): ${errorText}`);
  } catch (error) {
    console.error('Error al crear contacto:', error);
    throw error;
  }
}

// Actualizar contacto
export async function updateContact(id, changes) {
  try {
    const response = await fetch(getApiUrl(`/contacts/${id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes)
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Error al actualizar contacto');
  } catch (error) {
    console.error('Error al actualizar contacto:', error);
    throw error;
  }
}

// Eliminar contacto
export async function deleteContact(id) {
  try {
    const response = await fetch(getApiUrl(`/contacts/${id}`), {
      method: 'DELETE'
    });
    if (response.ok) {
      return;
    }
    throw new Error('Error al eliminar contacto');
  } catch (error) {
    console.error('Error al eliminar contacto:', error);
    throw error;
  }
}


