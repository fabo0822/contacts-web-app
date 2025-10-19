import './App.css';
import { useEffect, useState } from 'react';
import { getContacts, saveContacts, addContact as svcAdd, updateContact as svcUpdate, deleteContact as svcDelete } from './services/contactService';
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
      const savedContacts = await getContacts();
      setContacts(savedContacts);
    };
    loadContacts();
  }, []);

  // Handlers sencillos
  const addContact = async (newContact) => {
    const created = await svcAdd(newContact);
    setContacts([...contacts, created]);
  };

  const toggleFavorite = async (id) => {
    const updated = contacts.map(c => 
      c.id === id ? { ...c, favorite: !c.favorite } : c
    );
    setContacts(updated);
    await svcUpdate(id, { favorite: !contacts.find(c => c.id === id).favorite });
  };

  const removeContact = async (id) => {
    const filtered = contacts.filter(c => c.id !== id);
    setContacts(filtered);
    await svcDelete(id);
  };

  // Datos derivados para Overview.
  const favorites = contacts.filter((c) => c.favorite).slice(0, 4);
  const contactList = contacts.slice(0, 12);

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