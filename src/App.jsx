import './App.css';
import { useEffect, useState } from 'react';
import { getContacts, addContact as svcAdd, updateContact as svcUpdate, deleteContact as svcDelete } from './services/contactService';
import Navbar from './components/Navbar';
import Overview from './components/Overview';
import Contacts from './components/Contacts';
import Favorites from './components/Favorites';
import Popup from './components/Popup';

function App() {
  // Estado principal de la app: lista de contactos.
  // Mantengo una estructura simple para aprender: id, nombres, email y si es favorito.
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isPopupOpen, setPopupOpen] = useState(false);
  // Cargar contactos al iniciar
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const savedContacts = await getContacts();
        setContacts(savedContacts);
      } catch (error) {
        alert('Error al cargar los contactos. Verifica que el servidor esté funcionando.');
      }
    };
    loadContacts();
  }, []);

  // Handlers sencillos
  const addContact = async (newContact) => {
    try {
      console.log('Enviando contacto:', newContact); // Debug
      const created = await svcAdd(newContact);
      console.log('Contacto creado:', created); // Debug
      setContacts([...contacts, created]);
    } catch (error) {
      console.error('Error detallado:', error); // Debug
      alert(`Error al crear el contacto: ${error.message}. Verifica que el servidor esté funcionando.`);
    }
  };

  const toggleFavorite = async (id) => {
    try {
      const contactToUpdate = contacts.find(c => c.id === id);
      const updatedContact = { ...contactToUpdate, favorite: !contactToUpdate.favorite };
      
      const updated = contacts.map(c => 
        c.id === id ? updatedContact : c
      );
      setContacts(updated);
      await svcUpdate(id, updatedContact);
    } catch (error) {
      alert('Error al actualizar el contacto. Intenta nuevamente.');
    }
  };

  const removeContact = async (id) => {
    try {
      const filtered = contacts.filter(c => c.id !== id);
      setContacts(filtered);
      await svcDelete(id);
    } catch (error) {
      alert('Error al eliminar el contacto. Intenta nuevamente.');
    }
  };

  // Datos derivados para Overview.
  const favorites = contacts.filter((c) => c.favorite).slice(0, 4);
  const contactList = contacts.filter((c) => !c.favorite).slice(0, 12);

  return (
    <div className="App">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} isPopupOpen={isPopupOpen} setPopupOpen={setPopupOpen} />

      {isPopupOpen && (
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          onSave={(data) => {
            addContact(data);
            setPopupOpen(false);
          }}
        />
      )}

      {activeTab === 'Overview' && (
        <Overview
          favorites={favorites}
          contactList={contactList}
          onToggleFavorite={toggleFavorite}
          onUnfavorite={toggleFavorite}
        />
      )}

      {activeTab === 'Contacts' && (
        <Contacts contacts={contacts} onToggleFavorite={toggleFavorite} onRemove={removeContact} />
      )}

      {activeTab === 'Favorites' && (
        <Favorites favorites={contacts.filter((c) => c.favorite)} onUnfavorite={toggleFavorite} />
      )}
    </div>
  );
}

export default App;