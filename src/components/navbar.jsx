// Este es un componente separado para el navbar. En React, dividimos la UI en piezas pequeñas para reutilizarlas.
// Recibimos activeTab, setActiveTab y funciones para el popup como props.

import { useState } from 'react';
import logoImage from '../assets/logo.png';

function Navbar({ activeTab, setActiveTab, isPopupOpen, setPopupOpen }) {
  return (
    <nav className="navbar">
      <img src={logoImage} alt="Logo" className="logo" />
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
          setPopupOpen(true); // Abre el popup al hacer clic.
          // Eliminamos el desplazamiento, ya que el popup está en el flujo.
        }}
      >
        + NEW
      </button>
    </nav>
  );
}

export default Navbar;