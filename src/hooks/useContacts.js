import { useState, useEffect } from 'react';
import { getContacts, addContact as svcAdd, updateContact as svcUpdate, deleteContact as svcDelete } from '../services/contactService';

export function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load contacts on initialization
  useEffect(() => {
    const loadContacts = async () => {
      setLoading(true);
      setError(null);
      try {
        const savedContacts = await getContacts();
        setContacts(savedContacts);
      } catch (error) {
        setError('Error loading contacts. Check if the server is running.');
        console.error('Error loading contacts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadContacts();
  }, []);

  const addContact = async (newContact) => {
    setLoading(true);
    setError(null);
    try {
      const created = await svcAdd(newContact);
      setContacts(prevContacts => [...prevContacts, created]);
      return created;
    } catch (error) {
      const errorMessage = `Error creating contact: ${error.message}. Check if the server is running.`;
      setError(errorMessage);
      console.error('Detailed error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const contactToUpdate = contacts.find(c => c.id === id);
      if (!contactToUpdate) {
        throw new Error('Contact not found');
      }
      
      const updatedContact = { ...contactToUpdate, favorite: !contactToUpdate.favorite };
      
      // Optimistic update
      setContacts(prevContacts => 
        prevContacts.map(c => c.id === id ? updatedContact : c)
      );
      
      await svcUpdate(id, updatedContact);
    } catch (error) {
      const errorMessage = 'Error updating contact. Try again.';
      setError(errorMessage);
      console.error('Error updating contact:', error);
      
      // Revert local change on error
      setContacts(prevContacts => 
        prevContacts.map(c => c.id === id ? { ...c, favorite: !c.favorite } : c)
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeContact = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const contactToDelete = contacts.find(c => c.id === id);
      if (!contactToDelete) {
        throw new Error('Contact not found');
      }

      // Optimistic update
      setContacts(prevContacts => prevContacts.filter(c => c.id !== id));
      
      await svcDelete(id);
    } catch (error) {
      const errorMessage = 'Error deleting contact. Try again.';
      setError(errorMessage);
      console.error('Error deleting contact:', error);
      
      // Revert local change on error
      setContacts(prevContacts => [...prevContacts, contacts.find(c => c.id === id)]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const favorites = contacts.filter((c) => c.favorite);
  const nonFavorites = contacts.filter((c) => !c.favorite);
  
  // For Overview: limit to 4 favorites and 12 non-favorites
  const favoritesForOverview = favorites.slice(0, 4);
  const contactListForOverview = nonFavorites.slice(0, 12);

  return {
    contacts,
    loading,
    error,
    addContact,
    toggleFavorite,
    removeContact,
    favorites,
    nonFavorites,
    favoritesForOverview,
    contactListForOverview
  };
}
