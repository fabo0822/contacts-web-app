import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Overview from './components/Overview';
import Contacts from './components/Contacts';
import Favorites from './components/Favorites';
import Popup from './components/Popup';

function App() {
  // Estado principal de la app: lista de contactos.
  // Mantengo una estructura simple para aprender: id, nombres, email y si es favorito.
  const [contacts, setContacts] = useState(() => {
    // Carga inicial desde localStorage (persistencia temporal)
    try {
      const raw = localStorage.getItem('contacts');
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      { id: 1, firstName: 'Ada', lastName: 'Lovelace', email: 'ada@example.com', favorite: true },
      { id: 2, firstName: 'Alan', lastName: 'Turing', email: 'alan@example.com', favorite: true },
      { id: 3, firstName: 'Grace', lastName: 'Hopper', email: 'grace@example.com', favorite: false },
      { id: 4, firstName: 'Linus', lastName: 'Torvalds', email: 'linus@example.com', favorite: false },
      { id: 5, firstName: 'Margaret', lastName: 'Hamilton', email: 'margaret@example.com', favorite: false },
    ];
  });
  const [activeTab, setActiveTab] = useState('Overview');
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Handlers sencillos
  const addContact = (newContact) => {
    setContacts((prev) => {
      const nextId = prev.length === 0 ? 1 : Math.max(...prev.map((c) => c.id)) + 1;
      return [...prev, { id: nextId, ...newContact }];
    });
  };

  const toggleFavorite = (id) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)));
  };

  const removeContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  // Persistencia temporal cada vez que cambia contacts
  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch {}
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
          onRemove={removeContact}
        />
      )}

      {activeTab === 'Contacts' && (
        <Contacts contacts={contacts} onToggleFavorite={toggleFavorite} onRemove={removeContact} />
      )}

      {activeTab === 'Favorites' && (
        <Favorites favorites={contacts.filter((c) => c.favorite)} onRemove={removeContact} />
      )}
    </div>
  );
}

export default App;