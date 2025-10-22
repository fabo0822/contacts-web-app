import { useState, useEffect } from 'react';
import { getContacts, addContact as svcAdd, updateContact as svcUpdate, deleteContact as svcDelete } from '../services/contactService';

export function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar contactos al inicializar
  useEffect(() => {
    const loadContacts = async () => {
      setLoading(true);
      setError(null);
      try {
        const savedContacts = await getContacts();
        setContacts(savedContacts);
      } catch (error) {
        setError('Error al cargar los contactos. Verifica que el servidor esté funcionando.');
        console.error('Error al cargar contactos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadContacts();
  }, []);

  // Agregar nuevo contacto
  const addContact = async (newContact) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Enviando contacto:', newContact); // Debug
      const created = await svcAdd(newContact);
      console.log('Contacto creado:', created); // Debug
      setContacts(prevContacts => [...prevContacts, created]);
      return created;
    } catch (error) {
      const errorMessage = `Error al crear el contacto: ${error.message}. Verifica que el servidor esté funcionando.`;
      setError(errorMessage);
      console.error('Error detallado:', error); // Debug
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Alternar estado de favorito
  const toggleFavorite = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const contactToUpdate = contacts.find(c => c.id === id);
      if (!contactToUpdate) {
        throw new Error('Contacto no encontrado');
      }
      
      const updatedContact = { ...contactToUpdate, favorite: !contactToUpdate.favorite };
      
      // Actualizar estado local primero (optimistic update)
      setContacts(prevContacts => 
        prevContacts.map(c => c.id === id ? updatedContact : c)
      );
      
      // Actualizar en el servidor
      await svcUpdate(id, updatedContact);
    } catch (error) {
      const errorMessage = 'Error al actualizar el contacto. Intenta nuevamente.';
      setError(errorMessage);
      console.error('Error al actualizar contacto:', error);
      
      // Revertir cambio local en caso de error
      setContacts(prevContacts => 
        prevContacts.map(c => c.id === id ? { ...c, favorite: !c.favorite } : c)
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar contacto
  const removeContact = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const contactToDelete = contacts.find(c => c.id === id);
      if (!contactToDelete) {
        throw new Error('Contacto no encontrado');
      }

      // Actualizar estado local primero (optimistic update)
      setContacts(prevContacts => prevContacts.filter(c => c.id !== id));
      
      // Eliminar del servidor
      await svcDelete(id);
    } catch (error) {
      const errorMessage = 'Error al eliminar el contacto. Intenta nuevamente.';
      setError(errorMessage);
      console.error('Error al eliminar contacto:', error);
      
      // Revertir cambio local en caso de error
      setContacts(prevContacts => [...prevContacts, contacts.find(c => c.id === id)]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Datos derivados
  const favorites = contacts.filter((c) => c.favorite);
  const nonFavorites = contacts.filter((c) => !c.favorite);
  
  // Para Overview: limitar a 4 favoritos y 12 no favoritos
  const favoritesForOverview = favorites.slice(0, 4);
  const contactListForOverview = nonFavorites.slice(0, 12);

  return {
    // Estado
    contacts,
    loading,
    error,
    
    // Acciones
    addContact,
    toggleFavorite,
    removeContact,
    
    // Datos derivados
    favorites,
    nonFavorites,
    favoritesForOverview,
    contactListForOverview
  };
}
