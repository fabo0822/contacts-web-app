import './App.css';
import { useState } from 'react';
import Navbar from './components/navbar';
import Overview from './components/Overview';
import Contacts from './components/Contacts';
import Favorites from './components/Favorites';

function App() {
  const [activeTab, setActiveTab] = useState('Favorites');

  return (
    <div className="App">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'Overview' && <Overview />}
      {activeTab === 'Contacts' && <Contacts />}
      {activeTab === 'Favorites' && <Favorites />}
    </div>
  );
}

export default App;