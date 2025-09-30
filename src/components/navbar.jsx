// Este es un componente separado para el navbar. En React, dividimos la UI en piezas pequeñas para reutilizarlas.
// Recibimos activeTab y setActiveTab como props desde el componente padre.

import { useState } from 'react';
import logoImage from '../assets/logo.png'; // Importamos la imagen del logo.

function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="navbar">
      {/* Logo: Usamos una imagen en lugar de un div gris. */}
      <img src={logoImage} alt="Logo" className="logo" />

      {/* Pestañas: Usamos una lista <ul> con eventos onClick para cambiar la pestaña activa. */}
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

      {/* Botón + NEW: Lo reemplazaremos con la imagen en el siguiente paso. */}
      <button className="new-button">+ NEW</button>
    </nav>
  );
}

export default Navbar;