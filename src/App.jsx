import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Overview from './components/Overview';
import Contacts from './components/Contacts';
import Favorites from './components/Favorites';
import Popup from './components/Popup';

function App() {
  const [activeTab, setActiveTab] = useState('Favorites');
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <div className="App">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} isPopupOpen={isPopupOpen} setPopupOpen={setPopupOpen} />
      {isPopupOpen && <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />}
      {activeTab === 'Overview' && <Overview />}
      {activeTab === 'Contacts' && <Contacts />}
      {activeTab === 'Favorites' && <Favorites />}
    </div>
  );
}

export default App;