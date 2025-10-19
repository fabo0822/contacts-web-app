import './App.css';
import { useEffect, useState } from 'react';
import { listContacts, saveContacts, addContact as svcAdd, updateContact as svcUpdate, deleteContact as svcDelete, testApi } from './services/contactService';
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
  const [loading, setLoading] = useState(false);
  const [offline, setOffline] = useState(false);

  // Handlers sencillos
  const addContact = async (newContact) => {
    const created = await svcAdd(newContact);
    setContacts((prev) => [...prev, created]);
  };

  const toggleFavorite = async (id) => {
    setContacts((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c));
      const changed = updated.find((c) => c.id === id);
      if (changed) svcUpdate(id, { favorite: changed.favorite });
      return updated;
    });
  };

  const removeContact = async (id) => {
    await svcDelete(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  // Persistencia temporal cada vez que cambia contacts
  useEffect(() => {
    (async () => {
      setLoading(true);
      const apiOk = await testApi();
      setOffline(!apiOk);
      const result = await listContacts();
      if (Array.isArray(result) && result.length > 0) setContacts(result);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    saveContacts(contacts);
  }, [contacts]);

  // Datos derivados para Overview.
  const favorites = contacts.filter((c) => c.favorite).slice(0, 4);
  const contactList = contacts.slice(0, 12);

  return (
    <div className="App">
      {offline && (
        <div style={{ background: '#fff3cd', color: '#856404', padding: '6px 12px', borderBottom: '1px solid #ffeeba', textAlign: 'center' }}>
          Trabajando en modo offline (usando almacenamiento local)
        </div>
      )}
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

      {loading ? (
        <div style={{ padding: '24px', textAlign: 'center' }}>Cargando...</div>
      ) : activeTab === 'Overview' && (
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