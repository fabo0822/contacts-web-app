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
          if (isPopupOpen) {
            setPopupOpen(false);
          } else {
            setPopupOpen(true);
          }
        }}
      >
        + NEW
      </button>
    </nav>
  );
}

export default Navbar;