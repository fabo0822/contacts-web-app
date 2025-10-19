// Este es un componente separado para el navbar. En React, dividimos la UI en piezas pequeñas para reutilizarlas.
// Recibimos activeTab, setActiveTab y funciones para el popup como props.

import { useState } from 'react';
import logoImage from '../assets/globant.png';

function Navbar({ activeTab, setActiveTab, isPopupOpen, setPopupOpen }) {
  return (
    <nav className="navbar">
      <img src={logoImage} alt="Globant Logo" className="logo" />
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
      <button
        className="new-button"
        onClick={() => {
          setPopupOpen(!isPopupOpen); // Toggle: abre si está cerrado, cierra si está abierto
        }}
      >
        + NEW
      </button>
    </nav>
  );
}

export default Navbar;