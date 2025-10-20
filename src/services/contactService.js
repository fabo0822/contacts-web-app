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

// Normaliza un contacto desde el backend a la forma usada en el frontend
function normalizeContact(contact) {
  if (!contact) return contact;
  const favorite = typeof contact.favorite !== 'undefined' ? contact.favorite : Boolean(contact.isFavorite);
  const imageUrl = contact.imageUrl || contact.imageURL || contact.photoUrl || null;
  return { ...contact, favorite, imageUrl };
}

// Obtener todos los contactos
export async function getContacts() {
  try {
    const response = await fetch(getApiUrl('/contacts'));
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        return data.map(normalizeContact);
      }
      return data;
    }
    throw new Error('Error al obtener contactos');
  } catch (error) {
    console.error('Error al cargar contactos:', error);
    throw error;
  }
}

// Subir imagen al servidor
export async function uploadImage(imageData) {
  try {
    console.log('Subiendo imagen al servidor...'); // Debug
    
    // Extraer mime y convertir base64 a Blob
    const [prefix, b64] = imageData.split(',');
    const mimeMatch = prefix.match(/^data:(.*?);base64$/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const base64Data = b64;
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    
    const formData = new FormData();
    // Muchos backends esperan el campo 'file'
    const extension = mimeType.split('/')[1] || 'jpg';
    formData.append('file', blob, `contact-image.${extension}`);
    
    const response = await fetch(getApiUrl('/contacts/upload-image'), {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('Imagen subida exitosamente:', result); // Debug
      // Aceptar distintas claves que pueda devolver el backend
      const url = result.imageUrl || result.url || result.path || result.location;
      if (!url) {
        throw new Error('La respuesta no contiene URL de imagen');
      }
      return url; // Retornar la URL de la imagen
    }
    
    const errorText = await response.text();
    console.error('Error al subir imagen:', errorText); // Debug
    throw new Error(`Error al subir imagen (${response.status}): ${errorText}`);
  } catch (error) {
    console.error('Error al subir imagen:', error);
    throw error;
  }
}

// Agregar nuevo contacto
export async function addContact(newContact) {
  try {
    console.log('URL de la API:', getApiUrl('/contacts')); // Debug
    console.log('Datos a enviar al servidor:', newContact); // Debug
    console.log('Tipo de favorite:', typeof newContact.favorite, 'Valor:', newContact.favorite); // Debug
    console.log('Tiene imagen:', !!newContact.imageUrl); // Debug
    
    let contactData = { ...newContact };
    
    // Si hay imagen base64, subirla primero
    if (newContact.imageUrl && newContact.imageUrl.startsWith('data:image/')) {
      console.log('Subiendo imagen primero...'); // Debug
      console.log('Longitud de imagen base64:', newContact.imageUrl.length); // Debug
      try {
        const imageUrl = await uploadImage(newContact.imageUrl);
        contactData.imageUrl = imageUrl;
        console.log('Imagen subida, URL obtenida:', imageUrl); // Debug
      } catch (error) {
        console.warn('Error al subir imagen, continuando sin imagen:', error); // Debug
        contactData.imageUrl = null;
      }
    } else if (!newContact.imageUrl) {
      // Si no hay imagen, omitir el campo
      console.log('No hay imagen, omitiendo campo imageUrl'); // Debug
      delete contactData.imageUrl;
    } else {
      console.log('Imagen URL válida detectada:', newContact.imageUrl); // Debug
    }
    
    // Algunos backends esperan 'isFavorite' en vez de 'favorite'
    if (typeof contactData.isFavorite === 'undefined' && typeof contactData.favorite !== 'undefined') {
      contactData.isFavorite = Boolean(contactData.favorite);
    }

    console.log('Enviando contacto con datos finales:', contactData); // Debug
    
    const response = await fetch(getApiUrl('/contacts'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    
    console.log('Respuesta del servidor:', response.status, response.statusText); // Debug
    
    if (response.ok) {
      const result = await response.json();
      const normalized = normalizeContact(result);
      console.log('Contacto creado exitosamente:', normalized); // Debug
      return normalized;
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
      const updated = await response.json();
      return normalizeContact(updated);
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


