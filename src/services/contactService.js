const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5239';

// Build the correct API URL based on environment
function getApiUrl(path) {
  if (import.meta.env.DEV) {
    return `/api${path}`;
  }
  return `${API_URL}${path}`;
}

// Normalize contact data from backend to frontend format
function normalizeContact(contact) {
  if (!contact) return contact;
  const favorite = typeof contact.favorite !== 'undefined' ? contact.favorite : Boolean(contact.isFavorite);
  const imageUrl = contact.imageUrl || contact.imageURL || contact.photoUrl || null;
  return { ...contact, favorite, imageUrl };
}

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
    throw new Error('Error fetching contacts');
  } catch (error) {
    console.error('Error loading contacts:', error);
    throw error;
  }
}

// Upload image to server
export async function uploadImage(imageData) {
  try {
    // Extract mime type and convert base64 to Blob
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
    const extension = mimeType.split('/')[1] || 'jpg';
    formData.append('file', blob, `contact-image.${extension}`);
    
    const response = await fetch(getApiUrl('/contacts/upload-image'), {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      const result = await response.json();
      const url = result.imageUrl || result.url || result.path || result.location;
      if (!url) {
        throw new Error('Response does not contain image URL');
      }
      return url;
    }
    
    const errorText = await response.text();
    console.error('Error uploading image:', errorText);
    throw new Error(`Error uploading image (${response.status}): ${errorText}`);
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function addContact(newContact) {
  try {
    let contactData = { ...newContact };
    
    // If there's a base64 image, upload it first
    if (newContact.imageUrl && newContact.imageUrl.startsWith('data:image/')) {
      try {
        const imageUrl = await uploadImage(newContact.imageUrl);
        contactData.imageUrl = imageUrl;
      } catch (error) {
        console.warn('Error uploading image, continuing without image:', error);
        contactData.imageUrl = null;
      }
    } else if (!newContact.imageUrl) {
      delete contactData.imageUrl;
    }
    
    // Some backends expect 'isFavorite' instead of 'favorite'
    if (typeof contactData.isFavorite === 'undefined' && typeof contactData.favorite !== 'undefined') {
      contactData.isFavorite = Boolean(contactData.favorite);
    }
    
    const response = await fetch(getApiUrl('/contacts'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    
    if (response.ok) {
      const result = await response.json();
      const normalized = normalizeContact(result);
      return normalized;
    }
    
    const errorText = await response.text();
    console.error('Server error:', errorText);
    throw new Error(`Server error (${response.status}): ${errorText}`);
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
}

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
    throw new Error('Error updating contact');
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
}

export async function deleteContact(id) {
  try {
    const response = await fetch(getApiUrl(`/contacts/${id}`), {
      method: 'DELETE'
    });
    if (response.ok) {
      return;
    }
    throw new Error('Error deleting contact');
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
}


