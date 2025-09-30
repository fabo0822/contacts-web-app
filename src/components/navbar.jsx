// Este es un componente separado para el navbar. En React, dividimos la UI en piezas pequeñas para reutilizarlas.
// Recibimos activeTab y setActiveTab como props desde el componente padre.

import { useState } from 'react';

function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
      <ul className="tabs">
        <li
          className={activeTab === 'Overview' ? 'active' : ''}
          onClick={() => setActiveTab('Overview')}
        >
          Overview
        </li>
        <li
          className={activeTab === 'Contacts' ? 'active' : ''}
          onClick={() => setActiveTab('Contacts')}
        >
          Contacts
        </li>
        <li
          className={activeTab === 'Favorites' ? 'active' : ''}
          onClick={() => setActiveTab('Favorites')}
        >
          Favorites
        </li>
      </ul>
      <button className="new-button">+ NEW</button>
    </nav>
  );
}

export default Navbar;