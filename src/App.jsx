import './App.css';
import { useEffect, useState } from 'react';
import { listContacts, saveContacts, addContact as svcAdd, updateContact as svcUpdate, deleteContact as svcDelete } from './services/contactService';
import Navbar from './components/Navbar';
import Overview from './components/Overview';
import Contacts from './components/Contacts';
import Favorites from './components/Favorites';
import Popup from './components/Popup';

function App() {
  const STORAGE_KEY = 'contacts';
  // Estado principal de la app: lista de contactos.
  // Mantengo una estructura simple para aprender: id, nombres, email y si es favorito.
  const [contacts, setContacts] = useState(() => {
    const existing = listContacts(); // puede ser sync local; si es API, luego haremos fetch en useEffect
    if (existing && existing.length > 0) return existing;
    return [
      { id: 1, firstName: 'Ada', lastName: 'Lovelace', email: 'ada@example.com', favorite: true },
      { id: 2, firstName: 'Alan', lastName: 'Turing', email: 'alan@example.com', favorite: true },
      { id: 3, firstName: 'Grace', lastName: 'Hopper', email: 'grace@example.com', favorite: false },
      { id: 4, firstName: 'Linus', lastName: 'Torvalds', email: 'linus@example.com', favorite: false },
      { id: 5, firstName: 'Margaret', lastName: 'Hamilton', email: 'margaret@example.com', favorite: false },
      { id: 6, firstName: 'Katherine', lastName: 'Johnson', email: 'katherine@example.com', favorite: false },
      { id: 7, firstName: 'Tim', lastName: 'Berners-Lee', email: 'tim@example.com', favorite: false },
      { id: 8, firstName: 'Barbara', lastName: 'Liskov', email: 'barbara@example.com', favorite: false },
      { id: 9, firstName: 'Edsger', lastName: 'Dijkstra', email: 'edsger@example.com', favorite: false },
      { id: 10, firstName: 'Donald', lastName: 'Knuth', email: 'donald@example.com', favorite: false },
      { id: 11, firstName: 'Radia', lastName: 'Perlman', email: 'radia@example.com', favorite: false },
      { id: 12, firstName: 'Guido', lastName: 'van Rossum', email: 'guido@example.com', favorite: false },
      { id: 13, firstName: 'Brendan', lastName: 'Eich', email: 'brendan@example.com', favorite: false },
      { id: 14, firstName: 'Yukihiro', lastName: 'Matsumoto', email: 'matsumoto@example.com', favorite: false },
      { id: 15, firstName: 'Bjarne', lastName: 'Stroustrup', email: 'bjarne@example.com', favorite: false },
      { id: 16, firstName: 'Ken', lastName: 'Thompson', email: 'ken@example.com', favorite: false },
      { id: 17, firstName: 'Dennis', lastName: 'Ritchie', email: 'dennis@example.com', favorite: false },
      { id: 18, firstName: 'James', lastName: 'Gosling', email: 'james@example.com', favorite: false },
      { id: 19, firstName: 'Adele', lastName: 'Goldberg', email: 'adele@example.com', favorite: false },
      { id: 20, firstName: 'Hedy', lastName: 'Lamarr', email: 'hedy@example.com', favorite: false },
      { id: 21, firstName: 'John', lastName: 'Backus', email: 'johnb@example.com', favorite: false },
      { id: 22, firstName: 'Niklaus', lastName: 'Wirth', email: 'niklaus@example.com', favorite: false },
      { id: 23, firstName: 'Adele', lastName: 'Shamir', email: 'shamir@example.com', favorite: false },
      { id: 24, firstName: 'Whitfield', lastName: 'Diffie', email: 'whitfield@example.com', favorite: false },
      { id: 25, firstName: 'Leslie', lastName: 'Lamport', email: 'leslie@example.com', favorite: false },
    ];
  });
  const [activeTab, setActiveTab] = useState('Overview');
  const [isPopupOpen, setPopupOpen] = useState(false);

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

  const unFavorite = (id) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, favorite: false } : c)));
  };

  // Persistencia temporal cada vez que cambia contacts
  useEffect(() => {
    (async () => {
      // Si hay API, listContacts podría ser async; refrescamos al montar.
      const result = await listContacts();
      if (Array.isArray(result) && result.length > 0) setContacts(result);
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
          onUnfavorite={unFavorite}
        />
      )}

      {activeTab === 'Contacts' && (
        <Contacts contacts={contacts} onToggleFavorite={toggleFavorite} onRemove={removeContact} />
      )}

      {activeTab === 'Favorites' && (
        <Favorites favorites={contacts.filter((c) => c.favorite)} onUnfavorite={unFavorite} />
      )}
    </div>
  );
}

export default App;