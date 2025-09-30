import './App.css';
import { useState } from 'react';
import Navbar from './components/navbar';

function App() {
  const [activeTab, setActiveTab] = useState('Favorites'); // Estado en App.

  return (
    <div className="App">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Mostramos la sección según la pestaña activa. */}
      {activeTab === 'Overview' && <div><h2>Overview</h2><p>Contenido de Overview.</p></div>}
      {activeTab === 'Contacts' && <div><h2>Contacts</h2><p>Contenido de Contacts.</p></div>}
      {activeTab === 'Favorites' && <div><h2>Favorites</h2><p>Contenido de Favorites.</p></div>}
    </div>
  );
}

export default App;