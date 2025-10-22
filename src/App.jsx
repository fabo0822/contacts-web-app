import './App.css';
import { useContacts } from './hooks/useContacts';
import { useNavigation } from './hooks/useNavigation';
import Navbar from './components/Navbar';
import Overview from './components/Overview';
import Contacts from './components/Contacts';
import Favorites from './components/Favorites';
import Popup from './components/Popup';

function App() {
  // Usar el custom hook para navegación
  const {
    activeTab,
    isPopupOpen,
    navigateToTab,
    openPopup,
    closePopup
  } = useNavigation();
  
  // Usar el custom hook para gestión de contactos
  const {
    contacts,
    loading,
    error,
    addContact,
    toggleFavorite,
    removeContact,
    favoritesForOverview,
    contactListForOverview
  } = useContacts();

  // Manejar errores
  if (error) {
    return (
      <div className="App">
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={navigateToTab} 
        isPopupOpen={isPopupOpen} 
        setPopupOpen={openPopup} 
      />

      {isPopupOpen && (
        <Popup
          isOpen={isPopupOpen}
          onClose={closePopup}
          onSave={async (data) => {
            try {
              await addContact(data);
              closePopup();
            } catch (error) {
              // El error ya se maneja en el hook
              console.error('Error al crear contacto:', error);
            }
          }}
        />
      )}

      {activeTab === 'Overview' && (
        <Overview
          favorites={favoritesForOverview}
          contactList={contactListForOverview}
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

      {loading && (
        <div style={{ 
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '20px',
          borderRadius: '8px'
        }}>
          Cargando...
        </div>
      )}
    </div>
  );
}

export default App;